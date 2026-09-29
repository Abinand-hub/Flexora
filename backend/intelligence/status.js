// success | failed | partial from step (or leaf) statuses.
// Leaf/step rows use success|fail. Execution rows use success|failed|partial.

function isFail(status) {
  return status === 'fail' || status === 'failed' || status === 'cascade'
}

function executionStatus(statuses) {
  const list = (statuses || []).filter(Boolean)
  if (list.length === 0) return 'success'
  const failed = list.some(isFail)
  const succeeded = list.some(s => s === 'success')
  if (failed && succeeded) return 'partial'
  if (failed) return 'failed'
  return 'success'
}

module.exports = { executionStatus, isFail }
