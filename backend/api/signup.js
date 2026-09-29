const express = require('express')
const crypto = require('crypto')
const { query } = require('../../db/pool')

const router = express.Router()

router.post('/', async (req, res) => {
  const email = String(req.body?.email || '').toLowerCase().trim()
  const company = String(req.body?.company || '').trim()

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid email required' })
  }
  if (!company) {
    return res.status(400).json({ error: 'Institute name required' })
  }

  const apiKey = 'fx_' + crypto.randomBytes(20).toString('hex')

  try {
    const result = await query(
      `INSERT INTO customers (email, company, api_key, plan, price_default)
       VALUES ($1, $2, $3, 'free', 0.04)
       ON CONFLICT (email) DO NOTHING
       RETURNING id, email, company, api_key, plan, price_default, created_at`,
      [email, company.slice(0, 255), apiKey]
    )

    if (!result.rows.length) {
      return res.status(409).json({
        error: 'This email already has an institute. Sign in with your fx_ key.',
      })
    }

    const customer = result.rows[0]
    return res.status(201).json({
      ok: true,
      customer: {
        id: customer.id,
        email: customer.email,
        company: customer.company,
        api_key: customer.api_key,
        plan: customer.plan,
        price_default: customer.price_default,
        created_at: customer.created_at,
      },
      sdk_config: {
        node: `const fluxera = require('@fluxera/sdk')('${customer.api_key}')`,
        python: `import fluxera\nfluxera.init('${customer.api_key}')`,
      },
    })
  } catch (err) {
    console.error('[signup]', err.message)
    return res.status(500).json({ error: 'Failed to create institute' })
  }
})

module.exports = router
