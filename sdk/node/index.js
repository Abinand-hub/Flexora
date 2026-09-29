// sdk/node/index.js
// @fluxera/sdk — Node.js
//
// Installation:  npm install @fluxera/sdk
// Usage:
//   const fluxera = require('@fluxera/sdk')('fx_your_api_key')
//   const result  = await fluxera.track(() => yourApiCall(), { endpoint: '/v1/generate', price: 0.04 })
//
// That's the whole SDK. Wrap calls. We handle the rest.

const https = require('https')
const http  = require('http')
const { randomUUID } = require('crypto')
const { current } = require('./context')
const { classifyError } = require('./wrap')
const { workflow } = require('./workflow')
const { step } = require('./step')
const { tool } = require('./tool')

const DEFAULT_HOST    = 'api.fluxeratechnologies.ai'
const DEFAULT_TIMEOUT = 5000  // 5s — never block your app
const BATCH_SIZE      = 50    // flush every N events
const FLUSH_INTERVAL  = 30000 // or every 30 seconds

class FluxeraClient {
  constructor(apiKey, options = {}) {
    if (!apiKey || !apiKey.startsWith('fx_')) {
      throw new Error('[Fluxera] Invalid API key. Keys must start with fx_')
    }
    this.apiKey    = apiKey
    this.host      = options.host    || DEFAULT_HOST
    this.timeout   = options.timeout || DEFAULT_TIMEOUT
    this.debug     = options.debug   || false
    this.port      = options.port
    this.protocol  = options.protocol
    this.queue     = []
    this.flushTimer = null

    this._startFlushTimer()
    this._log('Fluxera SDK initialized')

    this.workflow = (name, fn, opts) => workflow(this, name, fn, opts)
    this.step     = (name, fn, opts) => step(this, name, fn, opts)
    this.tool     = (name, fn, opts) => tool(this, name, fn, opts)
  }

  // ──────────────────────────────────────────────────────────────
  // fluxera.track(fn, opts)
  // The primary method. Wraps any async function.
  //
  // @param {Function} fn       - async function to wrap
  // @param {Object}   opts
  //   @param {string}  opts.endpoint - your API endpoint name
  //   @param {number}  opts.price    - cost of this call in USD
  //   @param {string}  opts.request_id - optional, for deduplication
  // ──────────────────────────────────────────────────────────────
  async track(fn, opts = {}) {
    if (typeof fn !== 'function') throw new Error('[Fluxera] track() requires a function')

    const requestId = opts.request_id || randomUUID()
    const endpoint  = opts.endpoint   || 'unknown'
    const price     = typeof opts.price === 'number' ? opts.price : null
    const startedAt = Date.now()

    let status     = 'success'
    let errorType  = null
    let result

    try {
      result = await fn()
    } catch (err) {
      status    = 'fail'
      errorType = classifyError(err)
      throw err  // ALWAYS re-throw — never swallow the customer's error
    } finally {
      const latency = Date.now() - startedAt

      const ctx = current()
      this._enqueue({
        kind:       ctx.executionId ? 'api_call' : undefined,
        request_id: requestId,
        endpoint,
        status,
        latency_ms: latency,
        price:      price,
        error_type: errorType,
        timestamp:  new Date().toISOString(),
        execution_id: ctx.executionId || null,
        step_id:      ctx.stepId || null,
        workflow:     ctx.workflow || null,
      })
    }

    return result
  }

  // ──────────────────────────────────────────────────────────────
  // fluxera.batch(logs)
  // Send pre-collected logs directly (server-side ingestion)
  // ──────────────────────────────────────────────────────────────
  async batch(logs) {
    if (!Array.isArray(logs) || !logs.length) return
    await this._send(logs)
  }

  // ──────────────────────────────────────────────────────────────
  // Internal: queue + flush
  // ──────────────────────────────────────────────────────────────
  _enqueue(event) {
    this.queue.push(event)
    this._log(`Queued: ${event.endpoint} → ${event.status} (${event.latency_ms}ms)`)
    if (this.queue.length >= BATCH_SIZE) {
      this._flush()
    }
  }

  _startFlushTimer() {
    this.flushTimer = setInterval(() => {
      if (this.queue.length > 0) this._flush()
    }, FLUSH_INTERVAL)

    // Don't keep Node.js process alive just for Fluxera
    if (this.flushTimer.unref) this.flushTimer.unref()
  }

  _flush() {
    if (!this.queue.length) return
    const batch = this.queue.splice(0, this.queue.length)
    this._send(batch).catch(err => {
      this._log('Flush failed (non-fatal):', err.message)
    })
  }

  async _send(logs) {
    const body = JSON.stringify({ logs })
    const local = this.host === 'localhost' || this.host === '127.0.0.1'
    const proto = this.protocol === 'http' || (!this.protocol && local) ? http : https
    const port  = this.port || (local ? 3000 : 443)

    return new Promise((resolve, reject) => {
      const options = {
        hostname: this.host,
        port,
        path:     '/api/ingest',
        method:   'POST',
        headers: {
          'Content-Type':   'application/json',
          'Content-Length': Buffer.byteLength(body),
          'Authorization':  `Bearer ${this.apiKey}`,
          'User-Agent':     'fluxera-node-sdk/1.0.0',
        },
        timeout: this.timeout,
      }

      const req = proto.request(options, (res) => {
        let data = ''
        res.on('data', chunk => data += chunk)
        res.on('end', () => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            this._log(`Sent ${logs.length} events → ${res.statusCode}`)
            resolve(JSON.parse(data))
          } else {
            reject(new Error(`Fluxera ingest failed: ${res.statusCode} ${data}`))
          }
        })
      })

      req.on('timeout', () => {
        req.destroy()
        reject(new Error('Fluxera ingest timed out'))
      })

      req.on('error', reject)
      req.write(body)
      req.end()
    })
  }

  _log(...args) {
    if (this.debug) console.log('[Fluxera]', ...args)
  }

  // Flush on process exit
  destroy() {
    clearInterval(this.flushTimer)
    return this._flush()
  }
}

function createClient(apiKey, options) {
  return new FluxeraClient(apiKey, options)
}

createClient.FluxeraClient = FluxeraClient
module.exports = createClient
