const { query } = require('../../db/pool')

async function recommendRecover(customerId, executionId, { action, stepId, toolId, reason }) {
  const result = await query(
    `INSERT INTO recovery_actions
       (customer_id, execution_id, step_id, tool_id, kind, action, result)
     VALUES ($1, $2, $3, $4, 'recommended', $5, $6)
     RETURNING *`,
    [customerId, executionId, stepId || null, toolId || null, action, reason || null]
  )
  return result.rows[0]
}

function webhookUrlFor(customer, tool) {
  const override = tool?.recovery_json?.webhook_url
  if (typeof override === 'string' && /^https?:\/\//i.test(override)) return override
  if (typeof customer.webhook_url === 'string' && /^https?:\/\//i.test(customer.webhook_url)) return customer.webhook_url
  return null
}

async function executeRecover(customer, packed, action) {
  const stepId = packed.diagnosis.what_failed?.type === 'step' ? packed.diagnosis.what_failed.id : null
  let tool = null
  if (stepId) {
    const leaf = (packed.leaves || []).find(l => l.step_id === stepId && l.tool_id)
    if (leaf?.tool_id) {
      const t = await query(`SELECT id, name, recovery_json FROM tools WHERE id = $1 AND customer_id = $2`, [leaf.tool_id, customer.id])
      tool = t.rows[0] || null
    }
  }
  const url = webhookUrlFor(customer, tool)
  if (!url) {
    const err = new Error('Configure a recovery webhook in Settings (or on the tool).')
    err.status = 400
    throw err
  }

  const payload = {
    execution_id: packed.execution.id,
    workflow: packed.execution.workflow_name,
    action,
    step: packed.diagnosis.what_failed?.name || null,
    tool: tool?.name || null,
    reason: packed.diagnosis.recover?.reason || null,
  }

  const ac = new AbortController()
  const timer = setTimeout(() => ac.abort(), 5000)
  let resultText
  try {
    const r = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: ac.signal,
    })
    resultText = String(r.status)
  } catch (err) {
    resultText = err.name === 'AbortError' ? 'timeout' : (err.message || 'request_failed')
  } finally {
    clearTimeout(timer)
  }

  const row = await query(
    `INSERT INTO recovery_actions
       (customer_id, execution_id, step_id, tool_id, kind, action, executed, result)
     VALUES ($1, $2, $3, $4, 'executed', $5, 'webhook', $6)
     RETURNING *`,
    [customer.id, packed.execution.id, stepId, tool?.id || null, action, resultText]
  )
  return row.rows[0]
}

module.exports = { recommendRecover, executeRecover, webhookUrlFor }
