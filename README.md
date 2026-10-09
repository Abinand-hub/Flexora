# Fluxera — The Reliability & Recovery Engine

<p align="center">
  <img src="frontend/public/favicon.svg" width="72" height="72" alt="Fluxera Logo" />
</p>

<p align="center">
  <strong>Mission-critical intelligence, automated failover, and revenue loss prevention for modern SaaS and AI systems.</strong>
</p>

<p align="center">
  <a href="#key-features">Key Features</a> •
  <a href="#architecture">Architecture</a> •
  <a href="#quickstart">Quickstart</a> •
  <a href="#sdk-integration">SDK Integration</a> •
  <a href="#api-reference">API Reference</a> •
  <a href="#deployment">Deployment</a>
</p>

---

## 🎯 What is Fluxera?

Modern software architectures depend on a brittle web of third-party APIs, AI models, vector stores, and microservices. When upstream dependencies degrade, timeout, or rate-limit:
- **Traditional APMs** flood operators with millions of noisy, un-actionable log lines.
- **Fluxera** actively heals the execution chain, calculates exact financial leakage, dispatches autonomous fallbacks, and surfaces clear recovery telemetry.

---

## ✨ Key Features

- ⚡ **Autonomous Recovery & Fallbacks**: In-flight failover routing across backup models and secondary API endpoints when upstream providers fail.
- 💰 **Financial Leakage Attribution**: Directly computes failed API execution cost and estimated customer revenue at risk ($/min) in real time.
- 🔌 **2-Minute Drop-in SDKs**: Zero-friction SDKs for Node.js (`@fluxera/sdk`) and Python (`fluxera-sdk`).
- 📊 **Real-time Telemetry Dashboard**: Live transaction feed, endpoint leakage breakdowns, and execution trace inspection.
- 🛡️ **Self-Healing Safeguards**: Circuit breaking, jittered exponential backoff, and blast-radius isolation.
- 📧 **Automated Intelligence Reports**: Daily automated digest emails summarizing reliability metrics, recovered revenue, and recurring degradation patterns.

---

## 🏗️ Architecture

```
                                  ┌────────────────────────┐
                                  │   Upstream Services    │
                                  │ (OpenAI, Claude, AWS)  │
                                  └───────────▲────────────┘
                                              │
    ┌─────────────────────────┐               │ Fallback & Recovery
    │ Customer Application    ├───────────────┤
    │ (Node.js / Python App)  │               │
    └───────────┬─────────────┘               │
                │ Wrapped by SDK              │
                ▼                             │
    ┌─────────────────────────┐               │
    │  Fluxera Ingest Engine  │───────────────┘
    │   (POST /api/ingest)    │
    └───────────┬─────────────┘
                │ Async Event Stream
                ▼
    ┌─────────────────────────┐      ┌─────────────────────────┐
    │   PostgreSQL Database   │◄────►│  Intelligence Processor │
    │  (Telemetry & Traces)   │      │ (Leak Detection & Cron) │
    └───────────┬─────────────┘      └────────────┬────────────┘
                │                                 │
                ▼                                 ▼
    ┌─────────────────────────┐      ┌─────────────────────────┐
    │   Frontend Dashboard    │      │  Email Alert Dispatcher │
    │ (React / Standalone UI) │      │  (Daily Revenue Digest) │
    └─────────────────────────┘      └─────────────────────────┘
```

---

## 🚀 Quickstart

### 1. Prerequisites
- **Node.js** >= 18.0.0
- **PostgreSQL** >= 14 (or Supabase / Neon / RDS instance)

### 2. Clone & Install Dependencies
```bash
# Clone the repository
git clone https://github.com/fluxera-technologies/fluxera.git
cd fluxera

# Install root & backend dependencies
npm install

# Install frontend dependencies
cd frontend && npm install && cd ..
```

### 3. Configure Environment Variables
Copy `.env.example` to `.env` and configure your credentials:
```bash
cp .env.example .env
```

Key variables:
```ini
PORT=3000
DATABASE_URL=postgresql://postgres:password@localhost:5432/fluxera
FLUXERA_SECRET_KEY=fx_master_secret_key
EMAIL_HOST=smtp.resend.com
EMAIL_USER=resend
EMAIL_PASS=re_your_api_key
```

### 4. Database Setup & Seed
```bash
# Run database schema migrations
npm run migrate

# Seed demo customer accounts & initial telemetry data
npm run seed
npm run seed:intel
```

### 5. Launch the Application
```bash
# Terminal 1: Run Backend API & Ingestion Server
npm run dev

# Terminal 2: Run Frontend UI
cd frontend && npm run dev
```

Visit the application:
- **Interactive Web App**: [http://localhost:5173/](http://localhost:5173/)
- **Standalone Landing**: [http://localhost:5173/standalone/index.html](http://localhost:5173/standalone/index.html)
- **Standalone Vision**: [http://localhost:5173/standalone/vision.html](http://localhost:5173/standalone/vision.html)
- **Standalone Dashboard**: [http://localhost:5173/standalone/dashboard.html](http://localhost:5173/standalone/dashboard.html)
- **Backend Health Check**: [http://localhost:3000/api/health](http://localhost:3000/api/health)

---

## 📦 SDK Integration

### Node.js Integration
```bash
npm install @fluxera/sdk
```

```javascript
const fluxera = require('@fluxera/sdk')({
  apiKey: process.env.FLUXERA_API_KEY, // e.g. "fx_live_..."
  fallbackProvider: 'anthropic'
});

// Wrap critical upstream API calls with automated tracking & healing
const response = await fluxera.track(
  () => openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [{ role: 'user', content: 'Process order payload' }]
  }),
  {
    endpoint: '/v1/chat/completions',
    workflow: 'checkout_orchestrator',
    pricePerCall: 0.04
  }
);
```

### Python Integration
```bash
pip install fluxera-sdk
```

```python
import fluxera

fluxera.init(api_key="fx_live_your_key")

@fluxera.track(endpoint="/v1/chat/completions", workflow="rag_synthesizer", price=0.04)
def generate_summary(prompt: str):
    return openai.chat.completions.create(
        model="gpt-4o",
        messages=[{"role": "user", "content": prompt}]
    )
```

---

## 📡 API Reference

| Method | Endpoint | Description | Auth |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/health` | Service health check | None |
| `POST` | `/api/ingest` | Ingest raw API telemetry events | `x-api-key` |
| `GET` | `/api/customers/me` | Fetch authenticated workspace profile | `x-api-key` |
| `GET` | `/api/analysis/:customerId` | Financial leak calculations & metrics | `x-api-key` |
| `GET` | `/api/workflows` | List registered workflows & heal rates | `x-api-key` |
| `GET` | `/api/tools/status` | Real-time dependency health statuses | `x-api-key` |
| `GET` | `/api/executions` | Execution audit log with trace data | `x-api-key` |

---

## 🧪 Testing

```bash
# Run unit & integration test suites
npm test
```

---

## 🚀 Deployment

For production deployment instructions on Vercel, Railway, Render, or AWS, refer to the [DEPLOY.md](DEPLOY.md) guide.

---

## 📄 License

Proprietary © 2026 Fluxera Inc. All Rights Reserved.
