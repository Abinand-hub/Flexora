const { randomUUID } = require('crypto')
const { current } = require('./context')

function classifyError(err) {
  const msg = (err.message || '').toLowerCase()
  const code = err.status || err.statusCode || err.code || 0
  if (msg.includes('timeout') || code === 408 || code === 504) return 'timeout'
  if (msg.includes('rate') || code === 429) return 'rate_limit'
  if (code >= 500) return 'server_error'
  if (code === 401 || code === 403) return 'auth_error'
  if (msg.includes('context') || msg.includes('token')) return 'context_length'
  if (code >= 400) return 'invalid_request'
  return 'unknown'
}

async function wrap(client, fn, extra) {
  const startedAt = Date.now()
  const ctx = current()
  let status = 'success'
  let errorType = null
  let result
  try {
    result = await fn()
  } catch (err) {
    status = 'fail'
    errorType = classifyError(err)
    throw err
  } finally {
    const event = {
      request_id: extra.request_id || randomUUID(),
      status,
      latency_ms: Date.now() - startedAt,
      error_type: errorType,
      timestamp: new Date().toISOString(),
      started_at: new Date(startedAt).toISOString(),
      ended_at: new Date().toISOString(),
      execution_id: ctx.executionId || extra.execution_id || null,
      step_id: extra.step_id || ctx.stepId || null,
      parent_step_id: extra.parent_step_id || ctx.parentStepId || null,
      attempt: extra.attempt || 1,
      ...extra,
    }
    client._enqueue(event)
  }
  return result
}

module.exports = { wrap, classifyError }
