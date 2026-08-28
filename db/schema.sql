-- ================================================================
-- FLUXERA V1 — DATABASE SCHEMA
-- Run: node db/migrate.js
-- ================================================================

-- CUSTOMERS
-- Each customer gets a unique API key to authenticate SDK calls
CREATE TABLE IF NOT EXISTS customers (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email         TEXT UNIQUE NOT NULL,
  company       TEXT,
  api_key       TEXT UNIQUE NOT NULL,
  plan          TEXT NOT NULL DEFAULT 'free',     -- free | paid
  price_default NUMERIC(10,4) NOT NULL DEFAULT 0.04,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  active        BOOLEAN NOT NULL DEFAULT true
);

-- Business-impact inputs, customer-configured (used to compute estimated
-- revenue at risk separately from the technical API cost — see report.js).
-- Both default to 0, meaning "not configured" — the dashboard only shows
-- an estimated revenue-at-risk number once the customer sets these.
ALTER TABLE customers ADD COLUMN IF NOT EXISTS abandonment_rate NUMERIC(5,2) NOT NULL DEFAULT 0;
ALTER TABLE customers ADD COLUMN IF NOT EXISTS avg_order_value  NUMERIC(10,2) NOT NULL DEFAULT 0;

-- REQUEST LOGS
-- One row per API call tracked by the SDK
-- This is the core table. Everything else is derived from it.
CREATE TABLE IF NOT EXISTS request_logs (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id     UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  request_id      TEXT,                            -- SDK-generated, idempotency
  endpoint        TEXT NOT NULL,                   -- e.g. "/v1/generate"
  status          TEXT NOT NULL CHECK (status IN ('success', 'fail')),
  latency_ms      INTEGER,                         -- response time in ms
  price           NUMERIC(10,6) NOT NULL,          -- cost of this single call
  error_type      TEXT,                            -- timeout | rate_limit | server_error | etc
  logged_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Prevent duplicate events from SDK retries
CREATE UNIQUE INDEX IF NOT EXISTS idx_logs_dedup
  ON request_logs(customer_id, request_id)
  WHERE request_id IS NOT NULL;

-- Fast lookups for processor
CREATE INDEX IF NOT EXISTS idx_logs_customer_time
  ON request_logs(customer_id, logged_at DESC);

CREATE INDEX IF NOT EXISTS idx_logs_status
  ON request_logs(customer_id, status, logged_at DESC);

-- REVENUE REPORTS
-- Pre-computed hourly snapshots written by the processor
-- This is what gets emailed to customers
CREATE TABLE IF NOT EXISTS revenue_reports (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id       UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  period_start      TIMESTAMPTZ NOT NULL,
  period_end        TIMESTAMPTZ NOT NULL,
  total_requests    INTEGER NOT NULL DEFAULT 0,
  failed_requests   INTEGER NOT NULL DEFAULT 0,
  failure_rate      NUMERIC(5,2) NOT NULL DEFAULT 0,  -- percentage
  revenue_lost      NUMERIC(12,4) NOT NULL DEFAULT 0, -- dollars
  top_endpoint      TEXT,
  top_endpoint_loss NUMERIC(12,4),
  breakdown         JSONB,                             -- per-endpoint detail
  computed_at       TIMESTAMPTZ NOT NULL DEFAULT now(),

  -- One report per customer per period
  UNIQUE(customer_id, period_start)
);

CREATE INDEX IF NOT EXISTS idx_reports_customer
  ON revenue_reports(customer_id, period_start DESC);

-- ALERT LOG
-- Tracks which emails were sent so we never double-send
CREATE TABLE IF NOT EXISTS alerts_sent (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  report_id   UUID REFERENCES revenue_reports(id),
  alert_type  TEXT NOT NULL DEFAULT 'daily_report',
  sent_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- WAITLIST
CREATE TABLE IF NOT EXISTS waitlist (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email       TEXT UNIQUE NOT NULL,
  company     TEXT,
  joined_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ================================================================
-- VIEWS — for fast reporting queries
-- ================================================================

-- 24h loss per customer (used in dashboard + email)
CREATE OR REPLACE VIEW v_customer_daily_loss AS
SELECT
  c.id,
  c.email,
  c.company,
  c.price_default,
  COUNT(r.id)                                                     AS total_requests,
  COUNT(r.id) FILTER (WHERE r.status = 'fail')                   AS failed_requests,
  ROUND(
    COUNT(r.id) FILTER (WHERE r.status = 'fail')::NUMERIC
    / NULLIF(COUNT(r.id), 0) * 100, 2
  )                                                               AS failure_rate,
  COALESCE(SUM(r.price) FILTER (WHERE r.status = 'fail'), 0)     AS revenue_lost_24h
FROM customers c
LEFT JOIN request_logs r
  ON r.customer_id = c.id
  AND r.logged_at  > now() - INTERVAL '24 hours'
WHERE c.active = true
GROUP BY c.id, c.email, c.company, c.price_default;

-- Top leaking endpoints across all customers (last 24h)
CREATE OR REPLACE VIEW v_top_endpoints AS
SELECT
  r.customer_id,
  r.endpoint,
  COUNT(*)                                                         AS total,
  COUNT(*) FILTER (WHERE r.status = 'fail')                       AS failures,
  ROUND(
    COUNT(*) FILTER (WHERE r.status = 'fail')::NUMERIC
    / COUNT(*) * 100, 2
  )                                                                AS failure_rate_pct,
  ROUND(SUM(r.price) FILTER (WHERE r.status = 'fail'), 4)         AS revenue_lost,
  ROUND(AVG(r.latency_ms) FILTER (WHERE r.status = 'fail'), 0)    AS avg_fail_latency_ms
FROM request_logs r
WHERE r.logged_at > now() - INTERVAL '24 hours'
GROUP BY r.customer_id, r.endpoint
ORDER BY revenue_lost DESC;
