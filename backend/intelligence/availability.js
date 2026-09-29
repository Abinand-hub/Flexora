const DOWN_MIN_CALLS = 5
const DOWN_FAIL_RATE = 50

function windowInterval(period) {
  return period === '7d' ? '7 days' : '24 hours'
}

function toolAvailability({ calls, failed }) {
  const n = parseInt(calls, 10) || 0
  const f = parseInt(failed, 10) || 0
  const rate = n > 0 ? (f / n) * 100 : 0
  if (n >= DOWN_MIN_CALLS && rate >= DOWN_FAIL_RATE) return 'down'
  return 'ok'
}

module.exports = { DOWN_MIN_CALLS, DOWN_FAIL_RATE, windowInterval, toolAvailability }
