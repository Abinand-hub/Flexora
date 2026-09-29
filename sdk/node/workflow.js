const { randomUUID } = require('crypto')
const { runWith } = require('./context')
const { wrap } = require('./wrap')

async function workflow(client, name, fn, opts = {}) {
  if (typeof fn !== 'function') throw new Error('[Fluxera] workflow() requires a function')
  const executionId = opts.execution_id || randomUUID()
  const startedAt = new Date().toISOString()
  client._enqueue({
    kind: 'workflow_start',
    workflow: name,
    execution_id: executionId,
    status: 'success',
    started_at: startedAt,
    request_id: randomUUID(),
    endpoint: name,
  })
  try {
    return await runWith({ executionId, workflow: name }, () =>
      wrap(client, fn, {
        kind: 'workflow_end',
        workflow: name,
        execution_id: executionId,
        endpoint: name,
        started_at: startedAt,
      })
    )
  } catch (err) {
    throw err
  }
}

module.exports = { workflow }
