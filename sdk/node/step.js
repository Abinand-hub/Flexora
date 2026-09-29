const { randomUUID } = require('crypto')
const { current, runWith } = require('./context')
const { wrap } = require('./wrap')

async function step(client, name, fn, opts = {}) {
  if (typeof fn !== 'function') throw new Error('[Fluxera] step() requires a function')
  const ctx = current()
  const stepId = opts.step_id || randomUUID()
  return runWith({ stepId, parentStepId: ctx.stepId || null }, () =>
    wrap(client, fn, {
      kind: 'step_end',
      step: name,
      workflow: ctx.workflow || opts.workflow || null,
      execution_id: ctx.executionId,
      step_id: stepId,
      parent_step_id: ctx.stepId || null,
      endpoint: name,
      depends_on: Array.isArray(opts.depends_on) ? opts.depends_on : [],
    })
  )
}

module.exports = { step }
