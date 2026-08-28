// backend/server.js
// Main entry point for Fluxera V1 backend
// Runs the API server + cron jobs in one process

require('dotenv').config()
const express    = require('express')
const helmet     = require('helmet')
const cors       = require('cors')
const rateLimit  = require('express-rate-limit')
const cron       = require('node-cron')

const ingestRoute    = require('./api/ingest')
const reportRoute    = require('./api/report')
const customerRoute  = require('./api/customers')
const waitlistRoute  = require('./api/waitlist')
const healthRoute    = require('./api/health')
const migrateRoute   = require('./api/migrate')

const { runProcessor } = require('./processor/run')
const { sendDailyReports } = require('./email/send-report')

const app  = express()
const PORT = process.env.PORT || 3000

// Railway (and most PaaS hosts) run behind a reverse proxy — without this,
// express-rate-limit can't safely read X-Forwarded-For and throws on every
// request. `1` trusts exactly one hop, which matches Railway's setup.
app.set('trust proxy', 1)

// ─── MIDDLEWARE ───────────────────────────────────────────────
app.use(helmet())
app.use(cors())
app.use(express.json({ limit: '1mb' }))

// Rate limit on ingest — 1000 req/15min per IP
app.use('/api/ingest', rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  message: { error: 'Too many requests' }
}))

// ─── ROUTES ───────────────────────────────────────────────────
app.use('/api/ingest',    ingestRoute)
app.use('/api/report',    reportRoute)
app.use('/api/customers', customerRoute)
app.use('/api/waitlist',  waitlistRoute)
app.use('/health',        healthRoute)
app.use('/api/migrate',   migrateRoute)

// 404 catch-all
app.use((req, res) => res.status(404).json({ error: 'Not found' }))

// Error handler
app.use((err, req, res, next) => {
  console.error('[server] Unhandled error:', err.message)
  res.status(500).json({ error: 'Internal server error' })
})

// ─── CRON JOBS ────────────────────────────────────────────────
// Processor: aggregate logs and write revenue_reports
// Default: every hour
const processorSchedule = process.env.PROCESSOR_SCHEDULE || '0 * * * *'
cron.schedule(processorSchedule, async () => {
  console.log('[cron] Running processor...')
  try {
    await runProcessor()
    console.log('[cron] Processor complete')
  } catch (err) {
    console.error('[cron] Processor failed:', err.message)
  }
})

// Report: send daily email alerts
// Default: 8am UTC daily
const reportSchedule = process.env.REPORT_SCHEDULE || '0 8 * * *'
cron.schedule(reportSchedule, async () => {
  console.log('[cron] Sending daily reports...')
  try {
    await sendDailyReports()
    console.log('[cron] Reports sent')
  } catch (err) {
    console.error('[cron] Report send failed:', err.message)
  }
})

// ─── START ────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 Fluxera V1 running on port ${PORT}`)
  console.log(`   Processor: ${processorSchedule}`)
  console.log(`   Reports:   ${reportSchedule}`)
  console.log(`   Env:       ${process.env.NODE_ENV}\n`)
})

module.exports = app
