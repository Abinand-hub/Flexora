// Creates a checkout workflow tree: mixed success / partial / fail + retries.
// Run: node db/seed-intelligence.js  (after node db/seed.js)

require('dotenv').config()
const { randomUUID } = require('crypto')
const { query, pool } = require('./pool')
const { upsertWorkflow, upsertTool, upsertExecution, upsertStep } = require('../backend/intelligence/upsert')
const { rollupExecution } = require('../backend/intelligence/rollup')
const { diagnoseExecution } = require('../backend/intelligence/diagnose')

async function insertLeaf(customerId, { executionId, stepId, toolId, endpoint, status, latency, price, error, attempt, at }) {
  await query(
    `INSERT INTO request_logs
       (customer_id, request_id, endpoint, status, latency_ms, price, error_type,
        execution_id, step_id, tool_id, attempt, logged_at)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)`,
    [customerId, 'req_' + randomUUID().slice(0, 16), endpoint, status, latency, price, error || null,
     executionId, stepId, toolId, attempt || 1, at || new Date()]
  )
}

async function seed() {
  const cust = await query(`SELECT id, email, api_key, abandonment_rate, avg_order_value FROM customers WHERE email = 'test@example.com'`)
  if (!cust.rows.length) {
    console.error('Run node db/seed.js first (needs test@example.com)')
    process.exit(1)
  }
  const customer = cust.rows[0]
  const customerId = customer.id

  const workflowId = await upsertWorkflow(customerId, 'checkout')
  const inventory = await upsertTool(customerId, 'inventory', 0.01)
  const stripe = await upsertTool(customerId, 'stripe', 0.02)
  const notify = await upsertTool(customerId, 'notify', 0.005)

  const scenarios = [
    {
      label: 'success', agoMs: 3600000, durationMs: 420,
      steps: [
        { name: 'reserve', status: 'success', duration: 80, leaves: [{ tool: inventory, endpoint: 'inventory', status: 'success', price: 0.01, latency: 70 }] },
        { name: 'charge', status: 'success', duration: 200, leaves: [{ tool: stripe, endpoint: 'stripe', status: 'success', price: 0.02, latency: 180 }] },
        { name: 'notify', status: 'success', duration: 40, leaves: [{ tool: notify, endpoint: 'notify', status: 'success', price: 0.005, latency: 30 }] },
      ],
    },
    {
      label: 'partial', agoMs: 1800000, durationMs: 3100,
      steps: [
        { name: 'reserve', status: 'success', duration: 90, leaves: [{ tool: inventory, endpoint: 'inventory', status: 'success', price: 0.01, latency: 80 }] },
        { name: 'charge', status: 'fail', duration: 2800, leaves: [
          { tool: stripe, endpoint: 'stripe', status: 'fail', price: 0.02, latency: 1200, error: 'timeout', attempt: 1 },
          { tool: stripe, endpoint: 'stripe', status: 'fail', price: 0.02, latency: 1400, error: 'timeout', attempt: 2 },
        ]},
        { name: 'authorize', parent: 'charge', status: 'fail', duration: 200, leaves: [
          { tool: stripe, endpoint: 'stripe_auth', status: 'fail', price: 0.02, latency: 180, error: 'timeout' },
        ]},
        { name: 'notify', status: 'success', duration: 50, leaves: [{ tool: notify, endpoint: 'notify', status: 'success', price: 0.005, latency: 40 }] },
      ],
    },
    {
      label: 'failed', agoMs: 600000, durationMs: 900,
      steps: [
        { name: 'reserve', status: 'fail', duration: 800, leaves: [{ tool: inventory, endpoint: 'inventory', status: 'fail', price: 0.01, latency: 780, error: 'rate_limit' }] },
        { name: 'charge', depends_on: ['reserve'], status: 'fail', duration: 200, leaves: [{ tool: stripe, endpoint: 'stripe', status: 'fail', price: 0.02, latency: 180, error: 'timeout' }] },
      ],
    },
  ]

  for (const sc of scenarios) {
    const executionId = randomUUID()
    const started = new Date(Date.now() - sc.agoMs)
    await upsertExecution(customerId, {
      id: executionId,
      workflowId,
      startedAt: started,
      endedAt: new Date(started.getTime() + sc.durationMs),
      status: 'success',
      durationMs: sc.durationMs,
    })
    let t = started.getTime()
    const stepIds = {}
    for (const st of sc.steps) {
      const stepId = randomUUID()
      stepIds[st.name] = stepId
      const stepStart = new Date(t)
      await upsertStep(customerId, {
        id: stepId,
        executionId,
        parentStepId: st.parent ? stepIds[st.parent] : null,
        name: st.name,
        status: st.status,
        startedAt: stepStart,
        endedAt: new Date(t + st.duration),
        durationMs: st.duration,
        dependsOn: st.depends_on,
      })
      for (const leaf of st.leaves) {
        await insertLeaf(customerId, {
          executionId, stepId, toolId: leaf.tool, endpoint: leaf.endpoint,
          status: leaf.status, latency: leaf.latency, price: leaf.price,
          error: leaf.error, attempt: leaf.attempt || 1, at: stepStart,
        })
      }
      t += st.duration
    }
    await rollupExecution(executionId)
    await diagnoseExecution(
      { id: customerId, abandonment_rate: customer.abandonment_rate, avg_order_value: customer.avg_order_value },
      executionId
    )
    console.log(`✓ checkout execution (${sc.label}) ${executionId}`)
  }

  console.log('\nWorkflow: checkout')
  console.log(`API key: ${customer.api_key}`)
  await pool.end()
}

seed().catch(err => {
  console.error('Seed intelligence failed:', err)
  process.exit(1)
})
