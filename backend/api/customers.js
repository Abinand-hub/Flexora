// backend/api/customers.js
// POST /api/customers      — create new customer (internal use)
// GET  /api/customers/me   — get own account info

const express       = require('express')
const crypto        = require('crypto')
const { query }     = require('../../db/pool')
const { requireAuth, requireCronSecret } = require('./auth')

const router = express.Router()

// POST /api/customers — create a new customer account
// This is called when someone signs up for Fluxera
// In V1: you run this manually or from your waitlist flow
router.post('/', async (req, res) => {
  // Only internal calls can create customers (protect with API_SECRET)
  const secret = req.headers['x-api-secret']
  if (!secret || secret !== process.env.API_SECRET) {
    return res.status(403).json({ error: 'Forbidden' })
  }

  const { email, company, price_default, plan } = req.body

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid email required' })
  }

  // Generate unique API key: fx_<32 random hex chars>
  const apiKey = 'fx_' + crypto.randomBytes(20).toString('hex')

  try {
    const result = await query(
      `INSERT INTO customers (email, company, api_key, plan, price_default)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (email) DO NOTHING
       RETURNING id, email, company, api_key, plan, price_default, created_at`,
      [
        email.toLowerCase().trim(),
        company || null,
        apiKey,
        plan || 'free',
        parseFloat(price_default) || 0.04
      ]
    )

    if (!result.rows.length) {
      return res.status(409).json({ error: 'Customer with this email already exists' })
    }

    const customer = result.rows[0]
    console.log(`[customers] Created: ${customer.email} (${customer.id})`)

    return res.status(201).json({
      ok: true,
      customer: {
        id:            customer.id,
        email:         customer.email,
        company:       customer.company,
        api_key:       customer.api_key,
        plan:          customer.plan,
        price_default: customer.price_default,
        created_at:    customer.created_at,
      },
      // Ready-to-use SDK config for the customer
      sdk_config: {
        node:   `const fluxera = require('@fluxera/sdk')('${customer.api_key}')`,
        python: `import fluxera\nfluxera.init('${customer.api_key}')`,
      }
    })
  } catch (err) {
    console.error('[customers] Create error:', err.message)
    return res.status(500).json({ error: 'Failed to create customer' })
  }
})

// GET /api/customers/me — authenticated customer sees their own info
router.get('/me', async (req, res) => {
  const customer = await requireAuth(req, res)
  if (!customer) return

  try {
    const result = await query(
      `SELECT
         id, email, company, plan, price_default, abandonment_rate, avg_order_value, created_at,
         (SELECT COUNT(*) FROM request_logs WHERE customer_id = $1) AS total_events,
         (SELECT logged_at FROM request_logs WHERE customer_id = $1 ORDER BY logged_at DESC LIMIT 1) AS last_event_at
       FROM customers WHERE id = $1`,
      [customer.id]
    )

    const c = result.rows[0]
    return res.status(200).json({
      id:               c.id,
      email:            c.email,
      company:          c.company,
      plan:             c.plan,
      price_default:    c.price_default,
      abandonment_rate: c.abandonment_rate,
      avg_order_value:  c.avg_order_value,
      created_at:       c.created_at,
      stats: {
        total_events: parseInt(c.total_events) || 0,
        last_event_at: c.last_event_at,
      }
    })
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch account' })
  }
})

// PATCH /api/customers/me — update self-service settings
// Body: { price_default?, abandonment_rate?, avg_order_value? }
router.patch('/me', async (req, res) => {
  const customer = await requireAuth(req, res)
  if (!customer) return

  const { price_default, abandonment_rate, avg_order_value } = req.body

  // Validate everything server-side — never trust the frontend's checks alone.
  const updates = {}
  if (price_default !== undefined) {
    const p = Number(price_default)
    if (!Number.isFinite(p) || p <= 0) return res.status(400).json({ error: 'price_default must be a positive number' })
    updates.price_default = p
  }
  if (abandonment_rate !== undefined) {
    const a = Number(abandonment_rate)
    if (!Number.isFinite(a) || a < 0 || a > 100) return res.status(400).json({ error: 'abandonment_rate must be between 0 and 100' })
    updates.abandonment_rate = a
  }
  if (avg_order_value !== undefined) {
    const v = Number(avg_order_value)
    if (!Number.isFinite(v) || v < 0) return res.status(400).json({ error: 'avg_order_value must be a non-negative number' })
    updates.avg_order_value = v
  }

  if (!Object.keys(updates).length) {
    return res.status(400).json({ error: 'No valid fields to update' })
  }

  const setClauses = Object.keys(updates).map((key, i) => `${key} = $${i + 2}`)
  const values = Object.values(updates)

  try {
    const result = await query(
      `UPDATE customers SET ${setClauses.join(', ')} WHERE id = $1
       RETURNING id, email, company, price_default, abandonment_rate, avg_order_value`,
      [customer.id, ...values]
    )
    return res.status(200).json({ ok: true, customer: result.rows[0] })
  } catch (err) {
    console.error('[customers] Update error:', err.message)
    return res.status(500).json({ error: 'Failed to update account' })
  }
})

module.exports = router
