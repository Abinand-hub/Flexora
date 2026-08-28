// backend/api/ingest.js
// POST /api/ingest
//
// This is the most critical endpoint in V1.
// Every API call tracked by the SDK hits this route.
// Must be fast, reliable, and never lose data.
//
// Auth: Bearer fx_api_key
// Body: { logs: [...] }  — array of event objects

const express       = require('express')
const { v4: uuid }  = require('uuid')
const { query }     = require('../../db/pool')
const { requireAuth } = require('./auth')

const router = express.Router()

// POST /api/ingest
router.post('/', async (req, res) => {
  // Authenticate
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

  // Validate and sanitize each log entry
  const valid   = []
  const invalid = []

  for (const log of logs) {
    if (!log.endpoint || typeof log.endpoint !== 'string') {
      invalid.push({ log, reason: 'endpoint required (string)' }); continue
    }
    if (!['success', 'fail'].includes(log.status)) {
      invalid.push({ log, reason: 'status must be "success" or "fail"' }); continue
    }

    valid.push({
      request_id: log.request_id || uuid(),
      endpoint:   log.endpoint.slice(0, 255),
      status:     log.status,
      latency_ms: Number.isInteger(log.latency_ms) ? log.latency_ms : null,
      price:      parseFloat(log.price) || customer.price_default,
      error_type: log.error_type ? String(log.error_type).slice(0, 100) : null,
    })
  }

  if (valid.length === 0) {
    return res.status(400).json({ error: 'No valid log entries', invalid })
  }

  // Batch insert — single round-trip to DB regardless of batch size
  // Uses ON CONFLICT DO NOTHING to handle SDK retries safely
  const placeholders = valid.map((_, i) => {
    const b = i * 7
    return `($${b+1},$${b+2},$${b+3},$${b+4},$${b+5},$${b+6},$${b+7})`
  }).join(',')

  const params = valid.flatMap(l => [
    customer.id,
    l.request_id,
    l.endpoint,
    l.status,
    l.latency_ms,
    l.price,
    l.error_type,
  ])

  try {
    await query(
      `INSERT INTO request_logs
         (customer_id, request_id, endpoint, status, latency_ms, price, error_type)
       VALUES ${placeholders}
       ON CONFLICT (customer_id, request_id) WHERE request_id IS NOT NULL DO NOTHING`,
      params
    )

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
