const express = require('express')
const { query } = require('../../db/pool')
const { requireAuth } = require('./auth')
const { diagnoseExecution } = require('../intelligence/diagnose')
const { executeRecover } = require('./recover')

const router = express.Router()

router.get('/', async (req, res) => {
  const customer = await requireAuth(req, res)
  if (!customer) return

  const status = req.query.status
  const workflow = req.query.workflow
  const params = [customer.id]
  const where = ['e.customer_id = $1']

  if (status && ['success', 'failed', 'partial'].includes(status)) {
    params.push(status)
    where.push(`e.status = $${params.length}`)
  }
  if (workflow) {
    params.push(workflow)
    where.push(`w.name = $${params.length}`)
  }

  try {
    const result = await query(
      `SELECT e.*, w.name AS workflow_name,
         (
           SELECT s.name FROM execution_steps s
           WHERE s.execution_id = e.id AND s.status IN ('fail','cascade')
           ORDER BY CASE s.status WHEN 'fail' THEN 0 ELSE 1 END, s.started_at ASC LIMIT 1
         ) AS failed_step,
         (
           SELECT l.error_type FROM request_logs l
           WHERE l.execution_id = e.id AND l.status = 'fail' AND l.error_type IS NOT NULL
           ORDER BY l.logged_at ASC LIMIT 1
         ) AS error_type,
         (
           SELECT r.action FROM recovery_actions r
           WHERE r.execution_id = e.id
           ORDER BY r.created_at DESC LIMIT 1
         ) AS recovery_action
       FROM workflow_executions e
       JOIN workflows w ON w.id = e.workflow_id
       WHERE ${where.join(' AND ')}
       ORDER BY e.started_at DESC
       LIMIT 100`,
      params
    )
    return res.json({ executions: result.rows })
  } catch (err) {
    console.error('[executions]', err.message)
    return res.status(500).json({ error: 'Failed to list executions' })
  }
})

router.get('/:id', async (req, res) => {
  const customer = await requireAuth(req, res)
  if (!customer) return

  try {
    const packed = await diagnoseExecution(customer, req.params.id)
    if (!packed) return res.status(404).json({ error: 'Not found' })
    return res.json({
      execution: packed.execution,
      steps: packed.steps,
      leaves: packed.leaves,
      diagnosis: packed.diagnosis,
      recovery: packed.recovery,
    })
  } catch (err) {
    console.error('[executions/:id]', err.message)
    return res.status(500).json({ error: 'Failed to load execution' })
  }
})

router.post('/:id/recover', async (req, res) => {
  const customer = await requireAuth(req, res)
  if (!customer) return

  try {
    const packed = await diagnoseExecution(customer, req.params.id)
    if (!packed) return res.status(404).json({ error: 'Not found' })

    const action = req.body?.action || packed.diagnosis.recover.action
    if (!action || action === 'none') {
      return res.status(400).json({ error: 'Nothing to recover' })
    }

    const row = await executeRecover(customer, packed, action)

    return res.status(200).json({
      ok: true,
      executed: true,
      recovery: row,
    })
  } catch (err) {
    console.error('[recover]', err.message)
    return res.status(err.status || 500).json({ error: err.status ? err.message : 'Failed to recover' })
  }
})

module.exports = router
