const { query } = require('../../db/pool')
const { normalizeDependsOn } = require('./cascade')

async function upsertWorkflow(customerId, name) {
  const result = await query(
    `INSERT INTO workflows (customer_id, name)
     VALUES ($1, $2)
     ON CONFLICT (customer_id, name) DO UPDATE SET name = EXCLUDED.name
     RETURNING id`,
    [customerId, String(name).slice(0, 255)]
  )
  return result.rows[0].id
}

async function upsertTool(customerId, name, price) {
  const result = await query(
    `INSERT INTO tools (customer_id, name, price_default)
     VALUES ($1, $2, $3)
     ON CONFLICT (customer_id, name) DO UPDATE
       SET price_default = COALESCE(EXCLUDED.price_default, tools.price_default)
     RETURNING id`,
    [customerId, String(name).slice(0, 255), Number.isFinite(price) ? price : null]
  )
  return result.rows[0].id
}

async function upsertExecution(customerId, { id, workflowId, startedAt, endedAt, status, durationMs }) {
  const result = await query(
    `INSERT INTO workflow_executions
       (id, customer_id, workflow_id, status, started_at, ended_at, duration_ms)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
       ON CONFLICT (id) DO UPDATE SET
         ended_at    = COALESCE(EXCLUDED.ended_at, workflow_executions.ended_at),
         duration_ms = COALESCE(EXCLUDED.duration_ms, workflow_executions.duration_ms)
     RETURNING id`,
    [
      id,
      customerId,
      workflowId,
      status || 'success',
      startedAt || new Date(),
      endedAt || null,
      durationMs == null ? null : durationMs,
    ]
  )
  return result.rows[0].id
}

async function upsertStep(customerId, { id, executionId, parentStepId, name, status, startedAt, endedAt, durationMs, dependsOn }) {
  const depends = normalizeDependsOn(dependsOn)
  const result = await query(
    `INSERT INTO execution_steps
       (id, customer_id, execution_id, parent_step_id, name, status, started_at, ended_at, duration_ms, depends_on)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
     ON CONFLICT (id) DO UPDATE SET
       status      = COALESCE(EXCLUDED.status, execution_steps.status),
       ended_at    = COALESCE(EXCLUDED.ended_at, execution_steps.ended_at),
       duration_ms = COALESCE(EXCLUDED.duration_ms, execution_steps.duration_ms),
       depends_on  = CASE WHEN EXCLUDED.depends_on <> '{}' THEN EXCLUDED.depends_on ELSE execution_steps.depends_on END
     RETURNING id`,
    [
      id,
      customerId,
      executionId,
      parentStepId || null,
      String(name).slice(0, 255),
      status === 'fail' ? 'fail' : 'success',
      startedAt || new Date(),
      endedAt || null,
      durationMs == null ? null : durationMs,
      depends,
    ]
  )
  return result.rows[0].id
}

module.exports = { upsertWorkflow, upsertTool, upsertExecution, upsertStep }
