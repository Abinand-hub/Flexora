// backend/api/migrate.js
// POST /api/migrate — applies db/schema.sql from inside the running service
// (has network access to the internal DB host, unlike an outside machine).
// Protected by CRON_SECRET — same secret used for other internal-only routes.

const express   = require('express')
const fs        = require('fs')
const path      = require('path')
const { pool }  = require('../../db/pool')
const { requireCronSecret } = require('./auth')

const router = express.Router()

router.post('/', async (req, res) => {
  if (!requireCronSecret(req, res)) return

  try {
    const sql = fs.readFileSync(path.join(__dirname, '../../db/schema.sql'), 'utf8')
    await pool.query(sql)
    return res.status(200).json({ ok: true, message: 'Migration applied' })
  } catch (err) {
    console.error('[migrate] Error:', err.message)
    return res.status(500).json({ ok: false, error: err.message })
  }
})

module.exports = router
