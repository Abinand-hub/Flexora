const express = require('express')
const { query } = require('../../db/pool')
const { requireAuth } = require('./auth')
const { windowInterval, toolAvailability } = require('../intelligence/availability')
const { diagnoseExecution } = require('../intelligence/diagnose')

const router = express.Router()

router.get('/', async (req, res) => {
  const customer = await requireAuth(req, res)
  if (!customer) return

  const interval = windowInterval(req.query.window)

  try {
    const result = await query(
      `SELECT
         t.id, t.name, t.price_default, t.recovery_json, t.created_at,
         COUNT(r.id) AS calls,
         COUNT(r.id) FILTER (WHERE r.status = 'fail') AS failed,
         ROUND(
           COUNT(r.id) FILTER (WHERE r.status = 'fail')::NUMERIC
           / NULLIF(COUNT(r.id), 0) * 100, 2
         ) AS failure_rate,
         COALESCE(SUM(r.price), 0) AS total_cost,
         COALESCE(SUM(r.price) FILTER (WHERE r.status = 'fail'), 0) AS failed_cost,
         COALESCE(SUM(r.price) FILTER (WHERE r.attempt > 1), 0) AS retry_cost,
         COUNT(DISTINCT r.execution_id) AS executions_affected,
         COUNT(r.id) FILTER (WHERE r.logged_at > now() - INTERVAL '${interval}') AS window_calls,
         COUNT(r.id) FILTER (WHERE r.status = 'fail' AND r.logged_at > now() - INTERVAL '${interval}') AS window_failed,
         MAX(r.logged_at) FILTER (WHERE r.status = 'fail') AS last_failed_at,
         BOOL_OR(r.status = 'fail' AND r.logged_at > now() - INTERVAL '1 hour') AS still_failing,
         ROUND((PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY r.latency_ms)
           FILTER (WHERE r.logged_at > now() - INTERVAL '${interval}'))::numeric) AS p50_ms,
         ROUND((PERCENTILE_CONT(0.95) WITHIN GROUP (ORDER BY r.latency_ms)
           FILTER (WHERE r.logged_at > now() - INTERVAL '${interval}'))::numeric) AS p95_ms
       FROM tools t
       LEFT JOIN request_logs r ON r.tool_id = t.id
       WHERE t.customer_id = $1
       GROUP BY t.id
       ORDER BY failed_cost DESC, t.name ASC`,
      [customer.id]
    )
    const tools = result.rows.map(row => ({
      ...row,
      availability: toolAvailability({ calls: row.window_calls, failed: row.window_failed }),
      recurring_failed: parseInt(row.window_failed, 10) || 0,
    }))
    return res.json({ tools, window: interval === '7 days' ? '7d' : '24h' })
  } catch (err) {
    console.error('[tools]', err.message)
    return res.status(500).json({ error: 'Failed to list tools' })
  }
})

router.patch('/:id', async (req, res) => {
  const customer = await requireAuth(req, res)
  if (!customer) return

  const patch = req.body?.recovery_json
  if (!patch || typeof patch !== 'object' || Array.isArray(patch)) {
    return res.status(400).json({ error: 'recovery_json object required' })
  }

  const next = {}
  if (patch.retry !== undefined) {
    const n = parseInt(patch.retry, 10)
    if (!Number.isInteger(n) || n < 1 || n > 20) return res.status(400).json({ error: 'retry must be 1–20' })
    next.retry = n
  }
  if (patch.fallback !== undefined) {
    next.fallback = patch.fallback == null ? null : String(patch.fallback).slice(0, 255)
  }
  if (patch.webhook_url !== undefined) {
    if (patch.webhook_url == null || patch.webhook_url === '') {
      next.webhook_url = null
    } else {
      const url = String(patch.webhook_url)
      if (!/^https?:\/\//i.test(url)) return res.status(400).json({ error: 'webhook_url must be http or https' })
      next.webhook_url = url.slice(0, 2048)
    }
  }
  if (!Object.keys(next).length) return res.status(400).json({ error: 'No valid recovery_json fields' })

  try {
    const result = await query(
      `UPDATE tools
       SET recovery_json = COALESCE(recovery_json, '{}'::jsonb) || $3::jsonb
       WHERE id = $1 AND customer_id = $2
       RETURNING *`,
      [req.params.id, customer.id, JSON.stringify(next)]
    )
    if (!result.rows.length) return res.status(404).json({ error: 'Not found' })
    return res.json({ ok: true, tool: result.rows[0] })
  } catch (err) {
    console.error('[tools patch]', err.message)
    return res.status(500).json({ error: 'Failed to update tool' })
  }
})

router.get('/:id', async (req, res) => {
  const customer = await requireAuth(req, res)
  if (!customer) return

  try {
    const t = await query(
      `SELECT * FROM tools WHERE id = $1 AND customer_id = $2`,
      [req.params.id, customer.id]
    )
    if (!t.rows.length) return res.status(404).json({ error: 'Not found' })

    const stats = await query(
      `SELECT
         COUNT(*) AS calls,
         COUNT(*) FILTER (WHERE status = 'fail') AS failed,
         COALESCE(SUM(price), 0) AS total_cost,
         COALESCE(SUM(price) FILTER (WHERE status = 'fail'), 0) AS failed_cost,
         COALESCE(SUM(price) FILTER (WHERE attempt > 1), 0) AS retry_cost,
         MODE() WITHIN GROUP (ORDER BY error_type) AS common_error
       FROM request_logs WHERE tool_id = $1`,
      [req.params.id]
    )

    const workflows = await query(
      `SELECT DISTINCT w.id, w.name
       FROM request_logs r
       JOIN workflow_executions e ON e.id = r.execution_id
       JOIN workflows w ON w.id = e.workflow_id
       WHERE r.tool_id = $1`,
      [req.params.id]
    )

    const latestFail = await query(
      `SELECT execution_id FROM request_logs
       WHERE tool_id = $1 AND customer_id = $2 AND status = 'fail' AND execution_id IS NOT NULL
       ORDER BY logged_at DESC LIMIT 1`,
      [req.params.id, customer.id]
    )
    let diagnosis = null
    let recovery = null
    let execution = null
    if (latestFail.rows[0]?.execution_id) {
      const packed = await diagnoseExecution(customer, latestFail.rows[0].execution_id)
      if (packed) {
        diagnosis = packed.diagnosis
        recovery = packed.recovery
        execution = packed.execution
      }
    }

    const windowStats = await query(
      `SELECT COUNT(*) AS calls, COUNT(*) FILTER (WHERE status = 'fail') AS failed
       FROM request_logs WHERE tool_id = $1 AND logged_at > now() - INTERVAL '24 hours'`,
      [req.params.id]
    )

    return res.json({
      tool: t.rows[0],
      stats: stats.rows[0],
      workflows: workflows.rows,
      availability: toolAvailability({
        calls: windowStats.rows[0]?.calls,
        failed: windowStats.rows[0]?.failed,
      }),
      diagnosis,
      recovery,
      execution,
    })
  } catch (err) {
    return res.status(500).json({ error: 'Failed to load tool' })
  }
})

module.exports = router
