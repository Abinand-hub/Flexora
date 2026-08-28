// backend/api/auth.js
// Validates SDK API keys from Authorization header
// Usage: const customer = await requireAuth(req, res)

const { query } = require('../../db/pool')

async function requireAuth(req, res) {
  const header = req.headers['authorization'] || ''
  const apiKey = header.replace('Bearer ', '').trim()

  if (!apiKey || !apiKey.startsWith('fx_')) {
    res.status(401).json({
      error: 'Missing or invalid API key',
      hint:  'Pass your Fluxera API key as: Authorization: Bearer fx_...'
    })
    return null
  }

  try {
    const result = await query(
      'SELECT id, email, company, price_default, abandonment_rate, avg_order_value FROM customers WHERE api_key = $1 AND active = true',
      [apiKey]
    )
    if (!result.rows.length) {
      res.status(401).json({ error: 'API key not found or account inactive' })
      return null
    }
    return result.rows[0]
  } catch (err) {
    console.error('[auth] DB error:', err.message)
    res.status(500).json({ error: 'Auth failed' })
    return null
  }
}

// For cron-triggered internal endpoints
function requireCronSecret(req, res) {
  const secret = req.headers['x-fluxera-secret'] || req.query.secret
  if (!secret || secret !== process.env.CRON_SECRET) {
    res.status(403).json({ error: 'Forbidden' })
    return false
  }
  return true
}

module.exports = { requireAuth, requireCronSecret }
