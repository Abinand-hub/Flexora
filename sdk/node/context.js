const { AsyncLocalStorage } = require('async_hooks')

const storage = new AsyncLocalStorage()

function current() {
  return storage.getStore() || {}
}

function runWith(ctx, fn) {
  const parent = current()
  return storage.run({ ...parent, ...ctx }, fn)
}

module.exports = { current, runWith }
