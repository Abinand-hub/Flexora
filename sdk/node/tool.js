const { current } = require('./context')
const { wrap } = require('./wrap')

async function tool(client, name, fn, opts = {}) {
  if (typeof fn !== 'function') throw new Error('[Fluxera] tool() requires a function')
  const ctx = current()
  const retries = Number.isInteger(opts.retry) && opts.retry > 1 ? opts.retry : 1
  const price = typeof opts.price === 'number' ? opts.price : null
  let lastErr
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await wrap(client, fn, {
        kind: 'tool_call',
        tool: name,
        workflow: ctx.workflow || null,
        execution_id: ctx.executionId,
        step_id: ctx.stepId,
        parent_step_id: ctx.parentStepId,
        endpoint: opts.endpoint || name,
        price,
        attempt,
      })
    } catch (err) {
      lastErr = err
      if (attempt === retries) throw err
    }
  }
  throw lastErr
}

module.exports = { tool }
