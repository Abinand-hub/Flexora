# Fluxera Frontend Dashboard & Landing Suite

The client-side interface for **Fluxera — The Reliability & Recovery Engine**. Built with **React 19**, **Vite**, **Tailwind CSS**, and modern glassmorphism 3D spatial design tokens.

---

## 📂 Directory Structure

```
frontend/
├── public/
│   ├── favicon.svg               # Official Fluxera 'fx' vector brand favicon
│   ├── icons.svg                 # Shared SVG symbol sprite definitions
│   └── standalone/               # Zero-dependency, pure HTML/CSS/JS deployable pages
│       ├── index.html            # Standalone Hero & Landing Page
│       ├── vision.html           # Standalone How Fluxera Works (Vision & 3D Table)
│       ├── dashboard.html        # Standalone Live Telemetry & Revenue Dashboard
│       ├── style.css             # Standalone 3D effects & animation tokens
│       └── script.js             # Standalone interactive terminal & audio simulator
├── src/
│   ├── components/               # Reusable UI component library
│   │   ├── Navigation.jsx        # Floating glass pill navigation bar
│   │   ├── ProductShell.jsx      # Workspace wrapper & telemetry bar
│   │   ├── RecoveryCard.jsx      # Automated recovery & fallback card
│   │   ├── Tree.jsx              # Interactive execution call tree visualizer
│   │   └── ui.jsx                # Metric cards, status badges, and buttons
│   ├── pages/                    # Main application views
│   │   ├── Landing.jsx           # Interactive Web Landing & Vision views
│   │   ├── Workflows.jsx         # Registered workflow pipelines & heal rates
│   │   ├── Tools.jsx             # Third-party dependency health & fallbacks
│   │   ├── Executions.jsx        # Execution audit log & trace inspector
│   │   ├── Logs.jsx              # Live streaming telemetry logs feed
│   │   └── Settings.jsx          # Revenue risk model & SLA thresholds
│   ├── index.css                 # Global cybernetic styles, animations, & aurora gradients
│   ├── App.jsx                   # Root application state, auth, & router
│   └── main.jsx                  # React DOM entrypoint
├── index.html                    # Vite application root HTML
├── package.json                  # Frontend dependencies & build scripts
└── vite.config.js                # Vite build configuration
```

---

## 🛠️ Development & Build

```bash
# Install dependencies
npm install

# Start local Vite development server
npm run dev

# Build production bundle to dist/
npm run build

# Preview production build locally
npm run preview
```

---

## 🎨 Design System & Visual Highlights

- **Aurora Cosmic Gradients**: High-tech glow rings, horizon arc domes, and glassmorphism cards.
- **Continuous Marquee Carousels**: Floating infinite auto-scrolling tech stacks with pause-on-hover physics.
- **Multi-Tab Telemetry Explorer**: Interactive master-detail terminal with step-by-step code payloads and formula breakdowns.
- **Pure Standalone Distribution**: Contains full zero-dependency standalone HTML files in `public/standalone/` for instant static hosting.
