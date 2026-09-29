const express = require('express')
const { v4: uuid } = require('uuid')
const { query } = require('../../db/pool')
const { requireAuth } = require('./auth')
const { upsertWorkflow, upsertTool, upsertExecution, upsertStep } = require('../intelligence/upsert')
const { rollupExecution } = require('../intelligence/rollup')

const router = express.Router()
const LEAF_KINDS = new Set(['api_call', 'tool_call'])
const TREE_KINDS = new Set(['workflow_start', 'workflow_end', 'step_end'])

router.post('/', async (req, res) => {
  const customer = await requireAuth(req, res)
  if (!customer) return

  const { logs } = req.body

  if (!logs || !Array.isArray(logs) || logs.length === 0) {
    return res.status(400).json({
      error: 'Body must contain a non-empty logs array',
      example: {
        logs: [{
          endpoint:   '/v1/generate',
          status:     'fail',
          latency_ms: 920,
          price:      0.02,
          error_type: 'timeout'
        }]
      }
    })
  }

  if (logs.length > 500) {
    return res.status(400).json({ error: 'Max 500 logs per batch. Send multiple batches for larger volumes.' })
  }

  const valid = []
  const invalid = []

  for (const log of logs) {
    const kind = log.kind || 'api_call'
    const status = log.status
    if (status && !['success', 'fail'].includes(status)) {
      invalid.push({ log, reason: 'status must be "success" or "fail"' })
      continue
    }

    const isLeaf = LEAF_KINDS.has(kind) || !TREE_KINDS.has(kind)
    const endpoint = (log.endpoint || log.tool || '').toString()

    if (isLeaf && !TREE_KINDS.has(kind) && !endpoint) {
      invalid.push({ log, reason: 'endpoint required (string)' })
      continue
    }
    if (TREE_KINDS.has(kind) && !log.workflow && !log.step && kind !== 'workflow_end') {
      invalid.push({ log, reason: 'workflow or step name required' })
      continue
    }

    valid.push({
      kind,
      isLeaf: isLeaf && !TREE_KINDS.has(kind),
      request_id: log.request_id || uuid(),
      endpoint: endpoint ? endpoint.slice(0, 255) : (log.step || log.workflow || 'unknown').toString().slice(0, 255),
      status: status || 'success',
      latency_ms: Number.isInteger(log.latency_ms) ? log.latency_ms : null,
      price: parseFloat(log.price) || customer.price_default,
      error_type: log.error_type ? String(log.error_type).slice(0, 100) : null,
      workflow: log.workflow ? String(log.workflow).slice(0, 255) : null,
      step: log.step ? String(log.step).slice(0, 255) : null,
      tool: log.tool ? String(log.tool).slice(0, 255) : null,
      execution_id: log.execution_id || null,
      step_id: log.step_id || null,
      parent_step_id: log.parent_step_id || null,
      depends_on: Array.isArray(log.depends_on) ? log.depends_on : [],
      attempt: parseInt(log.attempt) > 0 ? parseInt(log.attempt) : 1,
      started_at: log.started_at ? new Date(log.started_at) : null,
      ended_at: log.ended_at || log.timestamp ? new Date(log.ended_at || log.timestamp) : null,
    })
  }

  if (valid.length === 0) {
    return res.status(400).json({ error: 'No valid log entries', invalid })
  }

  const executionIds = new Set()
  const leaves = []

  try {
    for (const ev of valid) {
      let workflowId = null
      let toolId = null
      let executionId = ev.execution_id
      let stepId = ev.step_id

      if (ev.workflow) {
        workflowId = await upsertWorkflow(customer.id, ev.workflow)
        if (!executionId) executionId = uuid()
        const ended = ev.kind === 'workflow_end' ? (ev.ended_at || new Date()) : null
        await upsertExecution(customer.id, {
          id: executionId,
          workflowId,
          startedAt: ev.started_at || new Date(),
          endedAt: ended,
          status: ev.status === 'fail' ? 'failed' : 'success',
          durationMs: ev.kind === 'workflow_end' ? ev.latency_ms : null,
        })
        executionIds.add(executionId)
      }

      if (ev.step && executionId) {
        if (!stepId) stepId = uuid()
        await upsertStep(customer.id, {
          id: stepId,
          executionId,
          parentStepId: ev.parent_step_id,
          name: ev.step,
          status: ev.status,
          startedAt: ev.started_at || new Date(),
          endedAt: ev.ended_at || new Date(),
          durationMs: ev.latency_ms,
          dependsOn: ev.depends_on,
        })
        executionIds.add(executionId)
      }

      if (ev.tool) {
        toolId = await upsertTool(customer.id, ev.tool, parseFloat(ev.price) || null)
      }

      if (executionId) executionIds.add(executionId)

      if (ev.isLeaf) {
        leaves.push({
          ...ev,
          execution_id: executionId,
          step_id: stepId,
          tool_id: toolId,
        })
      }
    }

    if (leaves.length) {
      const placeholders = leaves.map((_, i) => {
        const b = i * 11
        return `($${b+1},$${b+2},$${b+3},$${b+4},$${b+5},$${b+6},$${b+7},$${b+8},$${b+9},$${b+10},$${b+11})`
      }).join(',')
      const params = leaves.flatMap(l => [
        customer.id,
        l.request_id,
        l.endpoint,
        l.status,
        l.latency_ms,
        l.price,
        l.error_type,
        l.execution_id,
        l.step_id,
        l.tool_id,
        l.attempt,
      ])
      await query(
        `INSERT INTO request_logs
           (customer_id, request_id, endpoint, status, latency_ms, price, error_type,
            execution_id, step_id, tool_id, attempt)
         VALUES ${placeholders}
         ON CONFLICT (customer_id, request_id) WHERE request_id IS NOT NULL DO NOTHING`,
        params
      )
    }

    for (const id of executionIds) {
      await rollupExecution(id)
    }

    return res.status(200).json({
      ok:       true,
      accepted: valid.length,
      rejected: invalid.length,
      ...(invalid.length > 0 ? { invalid } : {})
    })
  } catch (err) {
    console.error('[ingest] DB insert failed:', err.message)
    return res.status(500).json({ error: 'Failed to store logs. Try again.' })
  }
})

module.exports = router
