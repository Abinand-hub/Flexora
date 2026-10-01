const { query } = require('../../db/pool')
const { isFail } = require('./status')
const { costFromLeaves } = require('./rollup')

function mostCommon(values) {
  const counts = {}
  for (const v of values) {
    if (!v) continue
    counts[v] = (counts[v] || 0) + 1
  }
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || null
}

function recommendFrom({ failedStep, leaves, retried, timedOut }) {
  if (!failedStep) return { action: 'none', reason: 'No failed step' }
  if (timedOut && retried) {
    return { action: 'tool_down', reason: 'Child tool timed out after retries — treat as unavailable, use fallback' }
  }
  if (timedOut) {
    return { action: 'retry', reason: 'Timeout on failed step — retry with backoff' }
  }
  if (retried) {
    return { action: 'fallback', reason: 'Retries already fired — switch to a fallback tool' }
  }
  const err = mostCommon(leaves.filter(l => l.status === 'fail').map(l => l.error_type))
  if (err === 'rate_limit') return { action: 'retry', reason: 'Rate limited — retry with backoff' }
  return { action: 'retry', reason: err ? `Failed with ${err} — retry the step` : 'Retry the failed step' }
}

function diagnosePayload({ execution, steps, leaves, customer, workflowName }) {
  const ordered = [...(steps || [])].sort((a, b) => new Date(a.started_at) - new Date(b.started_at))
  const failedStep = ordered.find(s => s.status === 'fail') || ordered.find(s => isFail(s.status)) || null
  const stepLeaves = failedStep
    ? (leaves || []).filter(l => l.step_id === failedStep.id)
    : (leaves || []).filter(l => l.status === 'fail')
  const retried = stepLeaves.some(l => (parseInt(l.attempt) || 1) > 1)
  const timedOut = stepLeaves.some(l => l.error_type === 'timeout')
  const rec = recommendFrom({ failedStep, leaves: stepLeaves, retried, timedOut })
  const costs = costFromLeaves(leaves)
  const failedLeaves = (leaves || []).filter(l => l.status === 'fail')

  const abandonment = parseFloat(customer?.abandonment_rate) || 0
  const aov = parseFloat(customer?.avg_order_value) || 0
  const impactConfigured = abandonment > 0 && aov > 0
  // Phase 1: same formula as the leak report, scoped to this execution's failed leaves.
  const usersAffected = impactConfigured ? Math.round(failedLeaves.length * (abandonment / 100)) : null

  return {
    what_failed: failedStep
      ? { type: 'step', id: failedStep.id, name: failedStep.name, status: failedStep.status }
      : failedLeaves[0]
        ? { type: 'leaf', id: failedLeaves[0].id, name: failedLeaves[0].endpoint, status: 'fail' }
        : null,
    why: {
      error_type: mostCommon(stepLeaves.filter(l => l.status === 'fail').map(l => l.error_type)),
      retries_fired: retried,
      child_tool_timeout: timedOut,
    },
    affected: {
      execution_id: execution?.id || null,
      workflow: workflowName || null,
      executions: 1,
      workflows: workflowName ? 1 : 0,
      users_affected: usersAffected,
      revenue_at_risk: impactConfigured ? Math.round(usersAffected * aov * 100) / 100 : null,
    },
    cost: {
      total: costs.total,
      failed: costs.failed,
      retry_wasted: costs.retry,
    },
    recover: rec,
    bottleneck: bottleneckStep(ordered),
  }
}

function bottleneckStep(steps) {
  const ranked = [...(steps || [])].filter(s => s.duration_ms != null).sort((a, b) => (b.duration_ms || 0) - (a.duration_ms || 0))
  const top = ranked[0]
  return top ? { id: top.id, name: top.name, duration_ms: top.duration_ms } : null
}

async function persistRecommendation(customerId, executionId, diagnosis) {
  if (!diagnosis?.recover || diagnosis.recover.action === 'none') return null
  const existing = await query(
    `SELECT id FROM recovery_actions WHERE execution_id = $1 ORDER BY created_at DESC LIMIT 1`,
    [executionId]
  )
  if (existing.rows.length) return existing.rows[0]
  const stepId = diagnosis.what_failed?.type === 'step' ? diagnosis.what_failed.id : null
  const result = await query(
    `INSERT INTO recovery_actions
       (customer_id, execution_id, step_id, kind, action, result)
     VALUES ($1, $2, $3, 'recommended', $4, $5)
     RETURNING *`,
    [customerId, executionId, stepId, diagnosis.recover.action, diagnosis.recover.reason]
  )
  return result.rows[0]
}

async function diagnoseExecution(customer, executionId) {
  const exec = await query(
    `SELECT e.*, w.name AS workflow_name
     FROM workflow_executions e
     JOIN workflows w ON w.id = e.workflow_id
     WHERE e.id = $1 AND e.customer_id = $2`,
    [executionId, customer.id]
  )
  if (!exec.rows.length) return null
  const execution = exec.rows[0]
  const steps = await query(
    `SELECT * FROM execution_steps WHERE execution_id = $1 ORDER BY started_at ASC`,
    [executionId]
  )
  const leaves = await query(
    `SELECT * FROM request_logs WHERE execution_id = $1 ORDER BY logged_at ASC`,
    [executionId]
  )
  const diagnosis = diagnosePayload({
    execution,
    steps: steps.rows,
    leaves: leaves.rows,
    customer,
    workflowName: execution.workflow_name,
  })
  await persistRecommendation(customer.id, executionId, diagnosis)
  const recovery = await query(
    `SELECT * FROM recovery_actions WHERE execution_id = $1 ORDER BY created_at DESC LIMIT 1`,
    [executionId]
  )
  return { execution, steps: steps.rows, leaves: leaves.rows, diagnosis, recovery: recovery.rows[0] || null }
}

module.exports = { mostCommon, recommendFrom, diagnosePayload, diagnoseExecution, persistRecommendation }
