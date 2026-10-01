const { query } = require('../../db/pool')
const { executionStatus } = require('./status')
const { tagCascade } = require('./cascade')

function costFromLeaves(leaves) {
  const list = leaves || []
  const total = list.reduce((s, l) => s + (parseFloat(l.price) || 0), 0)
  const failed = list.filter(l => l.status === 'fail').reduce((s, l) => s + (parseFloat(l.price) || 0), 0)
  const retry = list.filter(l => (parseInt(l.attempt) || 1) > 1).reduce((s, l) => s + (parseFloat(l.price) || 0), 0)
  return { total, failed, retry }
}

async function verifyRecovered(executionId) {
  const exec = await query(
    `SELECT id, customer_id, workflow_id, status, started_at
     FROM workflow_executions WHERE id = $1`,
    [executionId]
  )
  const row = exec.rows[0]
  if (!row || row.status !== 'success') return
  await query(
    `UPDATE recovery_actions ra
     SET verified_at = now()
     FROM workflow_executions e
     WHERE ra.execution_id = e.id
       AND e.workflow_id = $1
       AND e.customer_id = $2
       AND ra.kind = 'executed'
       AND ra.verified_at IS NULL
       AND ra.created_at < $3`,
    [row.workflow_id, row.customer_id, row.started_at]
  )
}

async function rollupExecution(executionId) {
  if (!executionId) return null

  const leaves = await query(
    `SELECT status, price, attempt, step_id, latency_ms, logged_at
     FROM request_logs WHERE execution_id = $1`,
    [executionId]
  )
  const steps = await query(
    `SELECT id, name, parent_step_id, depends_on, status, duration_ms
     FROM execution_steps WHERE execution_id = $1`,
    [executionId]
  )

  const byStep = {}
  for (const leaf of leaves.rows) {
    if (!leaf.step_id) continue
    if (!byStep[leaf.step_id]) byStep[leaf.step_id] = []
    byStep[leaf.step_id].push(leaf)
  }

  const withLeafStatus = steps.rows.map(step => {
    const stepLeaves = byStep[step.id] || []
    const leafFail = stepLeaves.some(l => l.status === 'fail')
    return {
      ...step,
      status: leafFail || step.status === 'fail' || step.status === 'cascade' ? 'fail' : 'success',
    }
  })
  const tagged = tagCascade(withLeafStatus)

  for (const step of tagged) {
    const costs = costFromLeaves(byStep[step.id] || [])
    await query(
      `UPDATE execution_steps
       SET total_cost = $2, failed_cost = $3, retry_cost = $4, status = $5
       WHERE id = $1`,
      [step.id, costs.total, costs.failed, costs.retry, step.status]
    )
  }

  const execCosts = costFromLeaves(leaves.rows)
  const status = executionStatus(tagged.map(s => s.status))
  const times = await query(
    `SELECT started_at, ended_at, duration_ms FROM workflow_executions WHERE id = $1`,
    [executionId]
  )
  const row = times.rows[0] || {}
  let duration = row.duration_ms
  if (duration == null && row.started_at && row.ended_at) {
    duration = Math.max(0, new Date(row.ended_at) - new Date(row.started_at))
  }

  await query(
    `UPDATE workflow_executions
     SET total_cost = $2, failed_cost = $3, retry_cost = $4, status = $5,
         duration_ms = COALESCE($6, duration_ms)
     WHERE id = $1`,
    [executionId, execCosts.total, execCosts.failed, execCosts.retry, status, duration]
  )

  await verifyRecovered(executionId)

  return { status, ...execCosts }
}

module.exports = { costFromLeaves, rollupExecution, verifyRecovered }
