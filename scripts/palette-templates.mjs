export function renderHead({ palette, layout, title, themeColor }) {
  return `<!DOCTYPE html>
<html lang="en" data-palette="${palette}" data-layout="${layout}" data-preview-lock="true">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
  <meta name="theme-color" content="${themeColor}" id="meta-theme-color" />
  <title>${title}</title>
  <meta name="description" content="Fluxera: Building autonomous intelligence that enables systems to think, understand, learn, adapt, and evolve." />
  <link rel="icon" type="image/png" sizes="64x64" href="./favicon-64.png" />
  <link rel="icon" type="image/png" sizes="192x192" href="./favicon-192.png" />
  <link rel="icon" type="image/svg+xml" href="./favicon.svg" />
  <link rel="apple-touch-icon" sizes="180x180" href="./apple-touch-icon.png" />
  <link rel="preload" as="image" href="./assets/fluxera-logo.jpg" fetchpriority="high" />
  <link rel="stylesheet" href="./sevol.css" />
  <link rel="stylesheet" href="./formats.css" />
</head>`;
}

export const INTRO_OVERLAY = `  <div class="ambient-backdrop" aria-hidden="true"></div>

  <!-- #fluxera-intro — ORBITAL LOGO ANIMATION -->
  <div id="fluxera-intro" aria-label="Fluxera logo intro animation">
    <div class="li-ground"></div>
    <div class="li-grain"></div>

    <div class="li-stage" id="li-stage">
      <div class="li-orb" id="li-orb">
        <div class="li-glow" id="li-glow"></div>
        <div class="li-orbit-wrap">
          <div class="li-orbit" id="li-orbit">
            <span class="li-head"></span>
          </div>
        </div>
        <div class="li-ping-halo" id="li-ping-halo"></div>
        <div class="li-ping-ring" id="li-ping-ring"></div>

        <div class="li-sphere" id="li-sphere">
          <img
            src="./assets/fluxera-logo.jpg"
            alt=""
            class="li-emblem-img"
            id="li-emblem-img"
            loading="eager"
            decoding="sync"
            fetchpriority="high"
          />
          <div class="li-sheen"><i id="li-sheen-bar"></i></div>
        </div>
      </div>

      <div class="li-wordmark">
        <div class="li-title-row" aria-label="FLUXERA">
          <span class="li-l"><span>F</span></span>
          <span class="li-l"><span>L</span></span>
          <span class="li-l"><span>U</span></span>
          <span class="li-l"><span>X</span></span>
          <span class="li-l is-cyan"><span>E</span></span>
          <span class="li-l"><span>R</span></span>
          <span class="li-l"><span>A</span></span>
        </div>
        <div class="li-sub" id="li-sub">Technology Initiative · Autonomous Intelligence</div>
      </div>
    </div>

    <button type="button" class="li-skip-hint" id="li-skip-btn">Click or press any key to enter →</button>
  </div>`;

export const MOBILE_DRAWER = `  <!-- MOBILE DRAWER MENU -->
  <div id="sevol-mobile-drawer" class="mobile-drawer hidden" role="dialog" aria-label="Mobile navigation">
    <a href="#hero"><span>01 · Fluxera</span><span>→</span></a>
    <a href="#vision"><span>02 · Our Vision</span><span>→</span></a>
    <a href="#changing"><span>03 · What We're Changing</span><span>→</span></a>
    <a href="#global-need"><span>04 · Global Need</span><span>→</span></a>
    <a href="#systems"><span>05 · Future of Systems</span><span>→</span></a>
    <a href="#contact"><span>06 · Help Build What Comes Next</span><span>→</span></a>
    <a href="./vision.html"><span>Technical Architecture</span><span>↗</span></a>
    <a href="./dashboard.html"><span>Platform Dashboard</span><span>↗</span></a>
    <button type="button" class="drawer-action" id="drawer-replay-btn">
      <span>Replay Fluxera Logo Animation</span><span>↻</span>
    </button>
  </div>`;

export const DOMAIN_BUTTONS = `            <div class="domain-tiles-grid" id="domain-chips">
              <button type="button" class="domain-tile is-active tactile-card" data-domain="software">
                <span class="domain-tile-ic" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
                </span>
                <span style="font-size: 13px; font-weight: 600;">Software</span>
              </button>

              <button type="button" class="domain-tile tactile-card" data-domain="agents">
                <span class="domain-tile-ic" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="14" rx="4"/><path d="M9 10h.01M15 10h.01M8 20h8"/></svg>
                </span>
                <span style="font-size: 13px; font-weight: 600;">AI Agents</span>
              </button>

              <button type="button" class="domain-tile tactile-card" data-domain="robotics">
                <span class="domain-tile-ic" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="6" r="3"/><path d="M5 20l4-8h6l4 8"/></svg>
                </span>
                <span style="font-size: 13px; font-weight: 600;">Robotics</span>
              </button>

              <button type="button" class="domain-tile tactile-card" data-domain="factories">
                <span class="domain-tile-ic" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21V10l6 4V10l6 4V6h6v15H3z"/></svg>
                </span>
                <span style="font-size: 13px; font-weight: 600;">Factories</span>
              </button>

              <button type="button" class="domain-tile tactile-card" data-domain="vehicles">
                <span class="domain-tile-ic" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="10" width="18" height="7" rx="2"/><circle cx="7.5" cy="17" r="2"/><circle cx="16.5" cy="17" r="2"/></svg>
                </span>
                <span style="font-size: 13px; font-weight: 600;">Vehicles</span>
              </button>

              <button type="button" class="domain-tile tactile-card" data-domain="energy">
                <span class="domain-tile-ic" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                </span>
                <span style="font-size: 13px; font-weight: 600;">Energy Networks</span>
              </button>

              <button type="button" class="domain-tile tactile-card" data-domain="infrastructure">
                <span class="domain-tile-ic" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>
                </span>
                <span style="font-size: 13px; font-weight: 600;">Infrastructure</span>
              </button>
            </div>`;

export const CONTACT_SECTION = `    <!-- 06. VERIFIED PRODUCT PROOF & DESIGN PARTNER CTA -->
    <section class="band" id="contact" data-section="contact">
      <div class="container">
        <div class="section-header">
          <div class="eyebrow">
            <span class="eyebrow-dot"></span>
            <span>06 · BUILDING THE FUTURE</span>
          </div>
          <h2 class="section-h2">Help Build What Comes Next.</h2>
          <p class="section-lead">
            We're working with forward-thinking companies to build the next generation of self-evolving systems.
          </p>
        </div>

        <div class="proof-grid">
          <article class="card" style="display: flex; flex-direction: column; justify-content: space-between; gap: 12px;">
            <span class="mini-pill-tag" style="width: fit-content;">Verified Product Proof</span>
            <div>
              <h3 style="font-size: 19px; margin-bottom: 6px;">Interactive Platform Preview</h3>
              <p style="font-size: 14px; color: var(--ink-muted);">
                Explore Fluxera's live runtime control surface, operational state inspection, and recovery workflows directly in your browser.
              </p>
            </div>
            <a href="./dashboard.html" style="font-size: 13.5px; font-weight: 700; color: var(--accent-solid);">
              Open Platform Dashboard →
            </a>
          </article>

          <article class="card" style="display: flex; flex-direction: column; justify-content: space-between; gap: 12px;">
            <span class="mini-pill-tag" style="width: fit-content;">System Architecture</span>
            <div>
              <h3 style="font-size: 19px; margin-bottom: 6px;">Self-Evolving Architecture</h3>
              <p style="font-size: 14px; color: var(--ink-muted);">
                Inspect the execution mechanics across software stacks, automated recovery paths, and measurable resource efficiency.
              </p>
            </div>
            <a href="./vision.html" style="font-size: 13.5px; font-weight: 700; color: var(--accent-solid);">
              Read System Architecture →
            </a>
          </article>

          <article class="card" style="display: flex; flex-direction: column; justify-content: space-between; gap: 12px;">
            <span class="mini-pill-tag" style="width: fit-content;">Design Partner Program</span>
            <div>
              <h3 style="font-size: 19px; margin-bottom: 6px;">Direct Founder Collaboration</h3>
              <p style="font-size: 14px; color: var(--ink-muted);">
                Collaborate directly on autonomous software systems, AI agents, robotics, factories, and adaptive infrastructure.
              </p>
            </div>
            <a href="mailto:shubhamchansoriya13@gmail.com?subject=Fluxera%20%E2%80%94%20Design%20Partner%20Inquiry" style="font-size: 13.5px; font-weight: 700; color: var(--accent-solid);">
              Email Fluxera Team →
            </a>
          </article>
        </div>

        <div class="card partner-cta-card">
          <div>
            <div class="eyebrow" style="margin-bottom: 10px;">
              <span class="eyebrow-dot"></span>
              <span>Partner With Fluxera</span>
            </div>
            <h3 style="font-size: clamp(24px, 3vw, 34px); margin-bottom: 10px;">
              Ready to test Fluxera on real-world systems?
            </h3>
            <p style="font-size: 15px; color: var(--ink-muted); margin-bottom: 20px;">
              Connect directly with the Fluxera team to build the next generation of self-evolving systems.
            </p>
            <div class="hero-ctas" style="justify-content: flex-start;">
              <a
                href="mailto:shubhamchansoriya13@gmail.com?subject=Fluxera%20%E2%80%94%20Become%20a%20Design%20Partner"
                class="btn-pill-solid tactile-btn"
              >
                <span>Become a Design Partner</span>
                <span aria-hidden="true">→</span>
              </a>
              <button type="button" class="btn-pill-secondary tactile-btn" id="copy-partner-btn">
                <span id="copy-partner-label">Contact Fluxera →</span>
              </button>
            </div>
          </div>

          <form class="partner-form-box" id="partner-inquiry-form">
            <div style="font-size: 13.5px; font-weight: 700; color: var(--ink-primary);">Start a Direct Conversation</div>
            <input type="email" id="partner-email-input" class="input-pill" placeholder="name@company.com" required />
            <select id="partner-domain-select" class="input-pill" aria-label="Primary system domain">
              <option value="Software & API Systems">Domain: Software &amp; API Systems</option>
              <option value="AI Agents & Workflows">Domain: AI Agents &amp; Workflows</option>
              <option value="Robotics & Factories">Domain: Robotics &amp; Factories</option>
              <option value="Vehicles, Energy & Infrastructure">Domain: Vehicles, Energy &amp; Infrastructure</option>
            </select>
            <button type="submit" class="btn-pill-primary" style="width: 100%;">
              Send Design Partner Inquiry →
            </button>
            <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 8px; padding: 10px 12px; border-radius: 14px; background: var(--bg-surface); border: 1px solid var(--border-hairline); font-size: 12.5px;">
              <span class="mono" style="color: var(--ink-body);">shubhamchansoriya13@gmail.com</span>
              <span id="form-feedback-msg" style="font-size: 11.5px; font-weight: 600; color: var(--accent-solid);">Direct channel</span>
            </div>
          </form>
        </div>
      </div>
    </section>`;

export const SITE_FOOTER = `  <footer class="site-footer">
    <div class="footer-inner">
      <div class="footer-cta-row">
        <div class="footer-cta-heading">
          Systems that think.<br />
          <span class="heading-muted">Intelligence that evolves.</span>
        </div>
        <div class="footer-cta-actions">
          <a
            href="mailto:shubhamchansoriya13@gmail.com?subject=Fluxera%20%E2%80%94%20Become%20a%20Design%20Partner"
            class="btn-pill-solid tactile-btn"
          >
            <span>Become a Design Partner</span>
            <span aria-hidden="true">→</span>
          </a>
          <a href="#contact" class="btn-pill-secondary tactile-btn">
            <span>Get in Touch</span>
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>

      <div class="footer-nav-grid">
        <div>
          <div style="display: inline-flex; align-items: center; gap: 11px; margin-bottom: 14px;">
            <span class="flux-logo-lens brand-emblem-sm">
              <span class="flux-logo-clip">
                <img src="./assets/fluxera-logo.jpg" alt="Fluxera" loading="eager" decoding="sync" />
              </span>
            </span>
            <div class="brand-text-wrap">
              <span class="brand-name">FLUXERA</span>
              <span class="brand-initiative">Autonomous Intelligence Initiative</span>
            </div>
          </div>
          <p class="footer-brand-desc">
            Building intelligence that enables systems to think, understand, learn, adapt, and evolve.
          </p>
        </div>

        <div>
          <div class="footer-col-title">Explore</div>
          <div class="footer-links">
            <a href="#hero">01 · Overview →</a>
            <a href="#vision">02 · Our Vision →</a>
            <a href="#changing">03 · What We're Changing →</a>
            <a href="#global-need">04 · Global Need →</a>
            <a href="#systems">05 · Future of Systems →</a>
          </div>
        </div>

        <div>
          <div class="footer-col-title">Capabilities</div>
          <div class="footer-links">
            <a href="#vision">Understand Context</a>
            <a href="#vision">Reason Independently</a>
            <a href="#vision">Create Solutions</a>
            <a href="#systems">Adapt in Motion</a>
            <a href="#systems">Continuously Evolve</a>
          </div>
        </div>

        <div>
          <div class="footer-col-title">Connect</div>
          <div class="footer-links">
            <a href="#global-need">Software &amp; AI Agents</a>
            <a href="#global-need">Robotics &amp; Factories</a>
            <a href="#global-need">Energy &amp; Infrastructure</a>
            <a href="#contact">Partner Inquiry →</a>
            <a href="mailto:shubhamchansoriya13@gmail.com">shubhamchansoriya13@gmail.com</a>
          </div>
        </div>
      </div>

      <div class="footer-meta-bar">
        <span>© 2026 Fluxera · Autonomous Intelligence Initiative</span>
        <a href="#hero" class="footer-top-btn tactile-btn">
          <span>Back to top</span>
          <span aria-hidden="true">↑</span>
        </a>
      </div>
    </div>

    <div class="footer-wordmark-wrap" aria-hidden="true">
      <div class="footer-wordmark">FLUXERA</div>
    </div>
  </footer>

  <script type="module" src="./sevol.js"></script>
</body>
</html>`;

/* ==========================================================================
   FORMAT 2: ELECTRIC CYAN + DEEP TEAL — TELEMETRY HUD & SPLIT COMMAND
   ========================================================================== */
export function buildTelemetryHtml(meta) {
  return `${renderHead({ palette: meta.key, layout: 'telemetry', title: meta.title, themeColor: meta.themeColor })}
<body>
  <div class="top-read-track" aria-hidden="true"><div class="top-read-fill" id="top-read-progress"></div></div>
${INTRO_OVERLAY}

  <header class="site-header" data-purpose="site-header">
    <div class="header-bar">
      <button type="button" class="brand-btn tactile-btn" id="header-replay-btn" title="Replay Fluxera logo animation">
        <span class="flux-logo-lens brand-emblem-sm">
          <span class="flux-logo-clip">
            <img src="./assets/fluxera-logo.jpg" alt="Fluxera" loading="eager" decoding="sync" />
          </span>
        </span>
        <span class="brand-text-wrap">
          <span class="brand-name">FLUXERA</span>
          <span class="brand-initiative">Autonomous Systems</span>
        </span>
      </button>

      <nav class="nav-links" aria-label="Primary sections">
        <a href="#hero" class="is-active">Overview</a>
        <a href="#vision">Vision</a>
        <a href="#changing">Efficiency</a>
        <a href="#global-need">Domains</a>
        <a href="#systems">Loop</a>
        <a href="#contact">Partner</a>
      </nav>

      <div class="nav-actions">
        <span class="telemetry-status-chip mono">
          <span class="pulse-dot"></span>
          <span>SYS // AUTONOMOUS</span>
        </span>
        <a href="./dashboard.html" class="nav-signin tactile-btn">Console ↗</a>
        <a href="#contact" class="btn-header-solid tactile-btn">Partner →</a>
        <button type="button" class="compact-menu-btn tactile-btn" id="sevol-menu-toggle" aria-label="Open menu" aria-expanded="false">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
      </div>
    </div>
  </header>

${MOBILE_DRAWER}

  <main class="page-main">
    <!-- 01. SPLIT ASYMMETRIC TELEMETRY HERO -->
    <section class="band band-hero" id="hero" data-section="hero">
      <div class="telemetry-hero-grid">
        <div class="telemetry-hero-copy">
          <div class="eyebrow">
            <span class="eyebrow-dot"></span>
            <span>AUTONOMOUS SYSTEMS INITIATIVE · FLUXERA</span>
          </div>

          <h1 class="hero-h1">
            Intelligence That Builds,
            <span class="heading-muted">Think and Evolve.</span>
          </h1>

          <p class="hero-sub">
            Building autonomous intelligence for the next generation of software and systems — enabling technology to understand context, adapt in motion, and evolve continuously.
          </p>

          <div class="hero-ctas">
            <a href="#vision" class="btn-pill-primary tactile-btn">
              <span>Explore Vision</span>
              <span aria-hidden="true">→</span>
            </a>
            <a href="#contact" class="btn-pill-solid tactile-btn">
              <span>Become a Design Partner</span>
            </a>
            <a href="./dashboard.html" class="btn-pill-secondary tactile-btn">
              <span>Platform Console ↗</span>
            </a>
          </div>

          <div style="display: flex; flex-direction: column; gap: 8px; width: 100%; margin-top: 6px;">
            <span class="mono" style="font-size: 11px; font-weight: 700; letter-spacing: 0.12em; color: var(--ink-subtle);">
              STAGE_INSPECTOR // SELECT COGNITIVE LAYER
            </span>
            <div class="cog-tabs telemetry-tabs-wrap" id="hero-cog-tabs" role="tablist">
              <button type="button" class="cog-tab is-active" data-cog="think" role="tab" aria-selected="true">01 · Think</button>
              <button type="button" class="cog-tab" data-cog="understand" role="tab" aria-selected="false">02 · Understand</button>
              <button type="button" class="cog-tab" data-cog="learn" role="tab" aria-selected="false">03 · Learn</button>
              <button type="button" class="cog-tab" data-cog="adapt" role="tab" aria-selected="false">04 · Adapt</button>
              <button type="button" class="cog-tab" data-cog="evolve" role="tab" aria-selected="false">05 · Evolve</button>
            </div>
          </div>
        </div>

        <div class="telemetry-stage-card">
          <div class="telemetry-stage-head mono">
            <span>FLUXERA_CORE // HUD_v2</span>
            <button type="button" class="loop-toggle-btn" id="hero-replay-btn">Replay Intro ↻</button>
          </div>

          <div class="telemetry-crest-chamber">
            <span class="telemetry-radar-ring" aria-hidden="true"></span>
            <button type="button" class="hero-crest-orb tactile-btn" id="hero-logo-crest" title="Click to play Fluxera orbital intro" aria-label="Fluxera circular emblem — click to replay orbital intro">
              <span class="hero-crest-orbit" aria-hidden="true"><span class="hero-crest-comet"></span></span>
              <span class="flux-logo-lens" style="width: 100%; height: 100%;">
                <span class="flux-logo-clip">
                  <img src="./assets/fluxera-logo.jpg" alt="Fluxera" loading="eager" decoding="sync" fetchpriority="high" />
                  <span class="crest-sheen" aria-hidden="true"></span>
                </span>
              </span>
            </button>
            <div class="mono" style="font-size: 11px; letter-spacing: 0.14em; color: #B8F1F5; margin-top: 12px;">
              AUTONOMOUS INTELLIGENCE LAYER
            </div>
          </div>

          <div class="telemetry-readout-panel">
            <div style="display: flex; align-items: center; justify-content: space-between; gap: 10px;">
              <span class="row-badge" id="cog-badge">THINK</span>
              <span class="mono" style="font-size: 11px; color: #B8F1F5;">LIVE LAYER SPEC</span>
            </div>
            <div style="font-size: 17px; font-weight: 700; color: #FFFFFF;" id="cog-title">01 · Systems That Think</div>
            <p style="margin: 0; font-size: 13.5px; color: #B8F1F5; line-height: 1.55;" id="cog-desc">
              Evaluates live operational state rather than blindly running fixed scripts when unexpected conditions occur.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 02. HORIZONTAL CONSOLE VISION -->
    <section class="band" id="vision" data-section="vision">
      <div class="container">
        <div class="section-header">
          <div class="eyebrow">
            <span class="eyebrow-dot"></span>
            <span>02 · What We're Building · SELF-EVOLVING FUTURE</span>
          </div>
          <h2 class="section-h2">
            Self-Thinking, Self-Learning,
            <span class="heading-muted">and Continuously Evolving.</span>
          </h2>
          <p class="section-lead">
            A future where intelligence doesn't just follow instructions. It understands, reasons, creates, adapts, and continuously evolves.
          </p>
        </div>

        <div class="telemetry-console-tabs" id="vision-capability-list">
          <button type="button" class="tier-btn is-active tactile-card" data-cap="understand">
            <span class="mono" style="font-size: 11px; opacity: 0.78;">01 · PERCEPTION</span>
            <span style="font-size: 15px; font-weight: 700;">Understands Context</span>
          </button>
          <button type="button" class="tier-btn tactile-card" data-cap="reasons">
            <span class="mono" style="font-size: 11px; opacity: 0.78;">02 · JUDGMENT</span>
            <span style="font-size: 15px; font-weight: 700;">Reasons Independently</span>
          </button>
          <button type="button" class="tier-btn tactile-card" data-cap="creates">
            <span class="mono" style="font-size: 11px; opacity: 0.78;">03 · SYNTHESIS</span>
            <span style="font-size: 15px; font-weight: 700;">Creates Solutions</span>
          </button>
          <button type="button" class="tier-btn tactile-card" data-cap="adapts">
            <span class="mono" style="font-size: 11px; opacity: 0.78;">04 · RESILIENCE</span>
            <span style="font-size: 15px; font-weight: 700;">Adapts in Motion</span>
          </button>
          <button type="button" class="tier-btn tactile-card" data-cap="evolves">
            <span class="mono" style="font-size: 11px; opacity: 0.78;">05 · COMPOUNDING</span>
            <span style="font-size: 15px; font-weight: 700;">Continuously Evolves</span>
          </button>
        </div>

        <div class="card">
          <div style="display: flex; flex-wrap: wrap; justify-content: space-between; gap: 12px; align-items: center; margin-bottom: 10px;">
            <h3 id="vision-cap-heading" style="font-size: 24px;">Environmental &amp; System Understanding</h3>
            <span class="mini-pill-tag mono">DIAGNOSTIC CONTRAST</span>
          </div>
          <p id="vision-cap-summary" style="color: var(--ink-muted); font-size: 15px; margin: 0 0 18px;">
            Instead of breaking whenever inputs stray from pre-programmed assumptions, intelligence reads real environment signals before acting.
          </p>

          <div class="vision-contrast-cards">
            <div class="contrast-col">
              <div class="mono" style="font-size: 11px; font-weight: 700; letter-spacing: 0.12em; color: var(--ink-muted); margin-bottom: 6px;">LEGACY // FIXED INSTRUCTIONS</div>
              <p id="vision-legacy-text" style="font-size: 14px; color: var(--ink-body); margin: 0;">
                Halts or throws unhandled errors when an environment variable, dependency, or edge case shifts.
              </p>
            </div>
            <div class="contrast-col is-sevol">
              <div class="mono" style="font-size: 11px; font-weight: 700; letter-spacing: 0.12em; color: var(--accent-solid); margin-bottom: 6px;">FLUXERA // AUTONOMOUS CORE</div>
              <p id="vision-sevol-text" style="font-size: 14px; color: var(--ink-primary); font-weight: 600; margin: 0;">
                Continuously interprets system context, identifies root shifts, and restructures execution paths autonomously.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 03. TOP 4-COLUMN RESOURCE STRIP + FULL-WIDTH TELEMETRY METER DECK -->
    <section class="band" id="changing" data-section="changing">
      <div class="container">
        <div class="section-header">
          <div class="eyebrow">
            <span class="eyebrow-dot"></span>
            <span>03 · What We're Changing · RESOURCE MULTIPLIER</span>
          </div>
          <h2 class="section-h2">
            Reducing the resources required to
            <span class="heading-muted">build, operate, and evolve systems.</span>
          </h2>
        </div>

        <div class="telemetry-4strip">
          <article class="card resource-card">
            <div class="resource-icon-chip mono">01</div>
            <div>
              <h3 style="font-size: 18px; margin-bottom: 6px;">Engineering &amp; Labor</h3>
              <p style="font-size: 13.5px; color: var(--ink-muted); margin: 0;">Less repetitive human work. More autonomous execution.</p>
            </div>
          </article>
          <article class="card resource-card">
            <div class="resource-icon-chip mono">02</div>
            <div>
              <h3 style="font-size: 18px; margin-bottom: 6px;">Capital</h3>
              <p style="font-size: 13.5px; color: var(--ink-muted); margin: 0;">Less operational overhead. More productive investment.</p>
            </div>
          </article>
          <article class="card resource-card">
            <div class="resource-icon-chip mono">03</div>
            <div>
              <h3 style="font-size: 18px; margin-bottom: 6px;">Time</h3>
              <p style="font-size: 13.5px; color: var(--ink-muted); margin: 0;">Faster creation, execution, and improvement.</p>
            </div>
          </article>
          <article class="card resource-card" style="background: var(--accent-primary-grad); color: var(--ink-on-accent); border-color: transparent;">
            <div class="resource-icon-chip mono" style="background: rgba(255,255,255,0.22); color: #fff;">04</div>
            <div>
              <h3 style="font-size: 18px; margin-bottom: 6px; color: inherit;">Compute</h3>
              <p style="font-size: 13.5px; opacity: 0.92; margin: 0;">More intelligent utilization of AI and computing resources.</p>
            </div>
          </article>
        </div>

        <div class="card telemetry-meter-deck">
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <div class="mono" style="font-size: 11px; font-weight: 700; letter-spacing: 0.14em; color: var(--accent-solid);" id="horizon-stage-label">
              STAGE 3 · SELF-EVOLVING
            </div>
            <h3 style="font-size: 24px;">Interactive System Maturity Gauge</h3>
            <p style="font-size: 14px; color: var(--ink-muted); margin: 0;">
              Switch operational maturity stages to inspect how Fluxera shifts execution away from manual intervention toward autonomous optimization.
            </p>
            <div class="stage-pills" role="group" aria-label="Select maturity stage">
              <button type="button" class="stage-pill-btn" data-stage-jump="1" aria-pressed="false">1. Predefined</button>
              <button type="button" class="stage-pill-btn" data-stage-jump="2" aria-pressed="false">2. Assisted</button>
              <button type="button" class="stage-pill-btn is-active" data-stage-jump="3" aria-pressed="true">3. Self-Evolving</button>
            </div>
            <input type="range" id="horizon-slider" class="scrubber-range" min="1" max="3" step="1" value="3" aria-label="System maturity stage" />
          </div>

          <div>
            <div class="meter-row-with-bar">
              <div class="meter-row-head">
                <span style="font-size: 13.5px; font-weight: 600;">Autonomous execution share</span>
                <span class="metric-list-num mono" style="font-size: 20px; min-width: auto;" id="meter-val-labor">92%</span>
              </div>
              <div class="meter-track"><div class="meter-fill" id="meter-bar-labor" style="width: 92%;"></div></div>
            </div>
            <div class="meter-row-with-bar">
              <div class="meter-row-head">
                <span style="font-size: 13.5px; font-weight: 600;">Productive capital shift</span>
                <span class="metric-list-num mono" style="font-size: 20px; min-width: auto;" id="meter-val-capital">88%</span>
              </div>
              <div class="meter-track"><div class="meter-fill" id="meter-bar-capital" style="width: 88%;"></div></div>
            </div>
            <div class="meter-row-with-bar">
              <div class="meter-row-head">
                <span style="font-size: 13.5px; font-weight: 600;">Creation &amp; improvement velocity</span>
                <span class="metric-list-num mono" style="font-size: 20px; min-width: auto;" id="meter-val-time">95%</span>
              </div>
              <div class="meter-track"><div class="meter-fill" id="meter-bar-time" style="width: 95%;"></div></div>
            </div>
            <div class="meter-row-with-bar">
              <div class="meter-row-head">
                <span style="font-size: 13.5px; font-weight: 600;">Intelligent compute utilization</span>
                <span class="metric-list-num mono" style="font-size: 20px; min-width: auto;" id="meter-val-compute">90%</span>
              </div>
              <div class="meter-track"><div class="meter-fill" id="meter-bar-compute" style="width: 90%;"></div></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 04. DEEP TEAL FULL-BLEED GLOBAL NEED MATRIX -->
    <section class="band band-dark-teal" id="global-need" data-section="global-need">
      <div class="container">
        <div class="section-header">
          <div class="eyebrow">
            <span class="eyebrow-dot"></span>
            <span>04 · Why the World Needs This · GLOBAL NEED</span>
          </div>
          <h2 class="section-h2">
            The Next Generation of Technology
            <span style="color: #B8F1F5;">Needs a New Kind of Intelligence.</span>
          </h2>
        </div>

        <div class="need-split">
          <div class="editorial-stack">
            <p>As the world becomes increasingly connected and automated, digital and physical systems are becoming more complex.</p>
            <p>Software, AI agents, robotics, factories, vehicles, energy networks, and infrastructure will need more than predefined instructions and constant human intervention.</p>
            <p>They will need intelligence that can understand their environment, make decisions, adapt to change, and continuously improve.</p>
            <div class="editorial-highlight">
              Self-evolving intelligence will become a foundational capability of the future.
            </div>
          </div>

          <div class="telemetry-domain-panel">
            <div class="mono" style="font-size: 11px; color: #00C6D7; font-weight: 700; letter-spacing: 0.14em; margin-bottom: 10px;">
              CONNECTED_DOMAINS // SELECT NODE
            </div>
${DOMAIN_BUTTONS}
            <div class="domain-output">
              <div class="mono" style="font-size: 11px; color: #00C6D7; font-weight: 700; letter-spacing: 0.12em;" id="domain-tag">DOMAIN · SOFTWARE</div>
              <h4 id="domain-title" style="font-size: 18px; margin-top: 4px; margin-bottom: 12px; color: #FFFFFF;">Adaptive Software Ecosystems</h4>
              <div style="display: flex; flex-direction: column; gap: 10px;">
                <div style="padding: 12px 14px; border-radius: 10px; background: rgba(255,255,255,0.06); border: 1px solid rgba(184,241,245,0.16);">
                  <div style="font-size: 11px; font-weight: 700; color: #B8F1F5; text-transform: uppercase;">Where Predefined Rules Break</div>
                  <div id="domain-break" style="font-size: 13.5px; color: #E9F8F9; margin-top: 4px;">
                    Static exception handlers fail under cascading API drift, dependency latency, and unmodeled edge states.
                  </div>
                </div>
                <div style="padding: 12px 14px; border-radius: 10px; background: rgba(0,198,215,0.12); border: 1px solid #00C6D7;">
                  <div style="font-size: 11px; font-weight: 700; color: #00C6D7; text-transform: uppercase;">Fluxera Capability</div>
                  <div id="domain-sevol" style="font-size: 13.5px; color: #FFFFFF; font-weight: 500; margin-top: 4px;">
                    Understands runtime context, adapts execution paths on the fly, and hardens future decisions automatically.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 05. 4-NODE CONNECTED SYSTEMS LOOP -->
    <section class="band" id="systems" data-section="systems">
      <div class="container">
        <div class="section-header">
          <div class="eyebrow">
            <span class="eyebrow-dot"></span>
            <span>05 · The Future of Systems</span>
          </div>
          <h2 class="section-h2">
            Systems That Think. Understand.
            <span class="heading-muted">Learn. Adapt. Evolve.</span>
          </h2>
          <p class="section-lead">
            From software and AI agents to robotics, factories, vehicles, energy networks, and intelligent infrastructure — we're building systems capable of understanding and improving themselves.
          </p>
        </div>

        <div class="card-dark" style="border-radius: 22px;">
          <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 12px;">
            <div style="display: inline-flex; align-items: center; gap: 8px; font-size: 12.5px; font-weight: 600;">
              <span class="pulse-dot"></span>
              <span id="loop-status-text">Fluxera · Continuous Loop Active</span>
            </div>
            <button type="button" class="loop-toggle-btn" id="loop-toggle-btn">Pause Cycle</button>
          </div>

          <div class="telemetry-loop-grid" id="loop-steps">
            <button type="button" class="loop-step is-active" data-step="0">
              <div class="mono" style="font-size: 11px; color: #00C6D7; margin-bottom: 6px;">01 · THINK</div>
              <div style="font-size: 15px; font-weight: 600;">Evaluate Intent &amp; State</div>
            </button>
            <button type="button" class="loop-step" data-step="1">
              <div class="mono" style="font-size: 11px; color: #00C6D7; margin-bottom: 6px;">02 · UNDERSTAND</div>
              <div style="font-size: 15px; font-weight: 600;">Map Surroundings</div>
            </button>
            <button type="button" class="loop-step" data-step="2">
              <div class="mono" style="font-size: 11px; color: #00C6D7; margin-bottom: 6px;">03 · ADAPT</div>
              <div style="font-size: 15px; font-weight: 600;">Re-Route &amp; Execute</div>
            </button>
            <button type="button" class="loop-step" data-step="3">
              <div class="mono" style="font-size: 11px; color: #00C6D7; margin-bottom: 6px;">04 · EVOLVE</div>
              <div style="font-size: 15px; font-weight: 600;">Retain Verified Learning</div>
            </button>
          </div>

          <div style="padding: 18px 20px; border-radius: 14px; background: rgba(255,255,255,0.06); border: 1px solid rgba(184,241,245,0.2);">
            <div class="mono" style="font-size: 11px; color: #00C6D7; margin-bottom: 6px;" id="loop-readout-code">
              CYCLE_STATE // 01 · THINK
            </div>
            <div style="font-size: 15px; color: #FFFFFF; line-height: 1.55;" id="loop-readout-desc">
              Evaluates objectives against current environment constraints before committing compute or physical actuation.
            </div>
          </div>
        </div>
      </div>
    </section>

${CONTACT_SECTION}
  </main>

${SITE_FOOTER}`;
}

/* ==========================================================================
   FORMAT 3: EMERALD + WHITE + DIAMOND — LUXURY EDITORIAL MAGAZINE
   ========================================================================== */
export function buildEditorialHtml(meta) {
  return `${renderHead({ palette: meta.key, layout: 'editorial', title: meta.title, themeColor: meta.themeColor })}
<body>
${INTRO_OVERLAY}

  <!-- CENTERED EDITORIAL MASTHEAD -->
  <header class="site-header" data-purpose="site-header">
    <div class="editorial-masthead">
      <nav class="editorial-mast-links" aria-label="Editorial chapters">
        <a href="#vision">Vision</a>
        <a href="#changing">Impact</a>
        <a href="#global-need">Domains</a>
        <a href="#systems">Evolution</a>
      </nav>

      <button type="button" class="editorial-mast-center" id="header-replay-btn" title="Replay Fluxera logo animation">
        <span class="flux-logo-lens brand-emblem-sm">
          <span class="flux-logo-clip">
            <img src="./assets/fluxera-logo.jpg" alt="Fluxera" loading="eager" decoding="sync" />
          </span>
        </span>
        <span class="brand-text-wrap" style="text-align: left;">
          <span class="brand-name">FLUXERA</span>
          <span class="brand-initiative">Autonomous Intelligence</span>
        </span>
      </button>

      <div class="nav-actions" style="justify-self: end;">
        <a href="./dashboard.html" class="nav-signin tactile-btn">Platform ↗</a>
        <a href="#contact" class="btn-header-solid tactile-btn">Design Partner</a>
        <button type="button" class="compact-menu-btn tactile-btn" id="sevol-menu-toggle" aria-label="Open menu" aria-expanded="false">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
      </div>
    </div>
  </header>

${MOBILE_DRAWER}

  <!-- FLOATING BOTTOM CAPSULE CHAPTER DOCK -->
  <nav class="pill-dock-nav" aria-label="Floating chapter navigation">
    <a href="#hero" data-chapter="hero" data-index="1" class="is-active">01 · Overview</a>
    <a href="#vision" data-chapter="vision" data-index="2">02 · Vision</a>
    <a href="#changing" data-chapter="changing" data-index="3">03 · Changing</a>
    <a href="#global-need" data-chapter="global-need" data-index="4">04 · Global Need</a>
    <a href="#systems" data-chapter="systems" data-index="5">05 · Systems</a>
    <a href="#contact" data-chapter="contact" data-index="6">06 · Partner</a>
  </nav>

  <main class="page-main">
    <!-- 01. FRAMED EDITORIAL COVER HERO -->
    <section class="band band-hero" id="hero" data-section="hero">
      <div class="editorial-cover-card">
        <div class="editorial-edition-bar">
          <span>FLUXERA INITIATIVE · EDITION 01</span>
          <span>AUTONOMOUS &amp; SELF-EVOLVING INTELLIGENCE</span>
        </div>

        <div class="editorial-cover-grid">
          <div>
            <h1 class="editorial-cover-title">
              Intelligence That Builds,<br />
              <span class="heading-serif-italic">Think and Evolve.</span>
            </h1>

            <p class="hero-sub" style="margin-bottom: 24px;">
              Building autonomous intelligence for the next generation of software and systems — enabling technology that doesn't merely execute fixed rules, but understands, learns, adapts, and continuously evolves.
            </p>

            <div class="hero-ctas" style="justify-content: flex-start;">
              <a href="#vision" class="btn-pill-solid tactile-btn">
                <span>Read Our Vision</span>
                <span aria-hidden="true">→</span>
              </a>
              <a href="#contact" class="btn-pill-secondary tactile-btn">
                <span>Become a Design Partner →</span>
              </a>
            </div>
          </div>

          <div class="editorial-medallion-card">
            <button type="button" class="hero-crest-orb tactile-btn" id="hero-logo-crest" title="Click to play Fluxera orbital intro" aria-label="Fluxera circular emblem — click to replay orbital intro">
              <span class="hero-crest-orbit" aria-hidden="true"><span class="hero-crest-comet"></span></span>
              <span class="flux-logo-lens" style="width: 100%; height: 100%;">
                <span class="flux-logo-clip">
                  <img src="./assets/fluxera-logo.jpg" alt="Fluxera" loading="eager" decoding="sync" fetchpriority="high" />
                  <span class="crest-sheen" aria-hidden="true"></span>
                </span>
              </span>
            </button>

            <button type="button" class="loop-toggle-btn" id="hero-replay-btn">
              Replay Fluxera Orbital Intro ↻
            </button>

            <div class="editorial-pillar-list">
              <div class="editorial-pillar-row">
                <span style="color: #B8F0D5; font-weight: 600;">01 · Self-Thinking</span>
                <span style="opacity: 0.78;">Contextual reasoning</span>
              </div>
              <div class="editorial-pillar-row">
                <span style="color: #B8F0D5; font-weight: 600;">02 · Adaptive Core</span>
                <span style="opacity: 0.78;">Real-time resilience</span>
              </div>
              <div class="editorial-pillar-row">
                <span style="color: #B8F0D5; font-weight: 600;">03 · Evolution Cycle</span>
                <span style="opacity: 0.78;">Compounding capability</span>
              </div>
            </div>

            <div class="editorial-stage-box">
              <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 6px;">
                <span class="row-badge" id="cog-badge" style="background: #B8F0D5; color: #123D32;">THINK</span>
                <span style="font-size: 11px; color: #B8F0D5;" id="cog-title">01 · Systems That Think</span>
              </div>
              <p style="margin: 0 0 10px; font-size: 12.5px; color: #E8F1EF; line-height: 1.5;" id="cog-desc">
                Evaluates live operational state rather than blindly running fixed scripts when unexpected conditions occur.
              </p>
              <div class="cog-tabs" id="hero-cog-tabs" role="tablist" style="background: rgba(255,255,255,0.1);">
                <button type="button" class="cog-tab is-active" data-cog="think" role="tab" aria-selected="true" style="color: #fff;">Think</button>
                <button type="button" class="cog-tab" data-cog="understand" role="tab" aria-selected="false" style="color: #B8F0D5;">Understand</button>
                <button type="button" class="cog-tab" data-cog="learn" role="tab" aria-selected="false" style="color: #B8F0D5;">Learn</button>
                <button type="button" class="cog-tab" data-cog="adapt" role="tab" aria-selected="false" style="color: #B8F0D5;">Adapt</button>
                <button type="button" class="cog-tab" data-cog="evolve" role="tab" aria-selected="false" style="color: #B8F0D5;">Evolve</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 02. STICKY LEFT NARRATIVE + EDITORIAL DOSSIER -->
    <section class="band" id="vision" data-section="vision">
      <div class="container">
        <div class="vision-grid" style="align-items: start;">
          <div class="editorial-sticky-col">
            <div class="eyebrow">
              <span class="eyebrow-dot"></span>
              <span>02 · OUR VISION</span>
            </div>
            <h2 class="section-h2" style="margin-bottom: 14px;">
              Building the Self-Thinking,<br />
              <span class="heading-serif-italic">Evolving Future.</span>
            </h2>
            <p class="section-lead">
              A future where intelligence doesn't just follow instructions. It understands, reasons, creates, adapts, and continuously evolves.
            </p>
          </div>

          <div style="display: flex; flex-direction: column; gap: 18px;">
            <div class="tier-stack" id="vision-capability-list">
              <button type="button" class="tier-btn is-active tactile-card" data-cap="understand">
                <span class="tier-dot"></span>
                <span style="font-size: 16px; font-weight: 600; flex: 1;">01 · Understands Context</span>
                <span style="font-size: 11px; font-weight: 600; opacity: 0.78;">Perception</span>
              </button>
              <button type="button" class="tier-btn tactile-card" data-cap="reasons">
                <span class="tier-dot"></span>
                <span style="font-size: 16px; font-weight: 600; flex: 1;">02 · Reasons Independently</span>
                <span style="font-size: 11px; font-weight: 600; opacity: 0.78;">Judgment</span>
              </button>
              <button type="button" class="tier-btn tactile-card" data-cap="creates">
                <span class="tier-dot"></span>
                <span style="font-size: 16px; font-weight: 600; flex: 1;">03 · Creates Solutions</span>
                <span style="font-size: 11px; font-weight: 600; opacity: 0.78;">Synthesis</span>
              </button>
              <button type="button" class="tier-btn tactile-card" data-cap="adapts">
                <span class="tier-dot"></span>
                <span style="font-size: 16px; font-weight: 600; flex: 1;">04 · Adapts in Motion</span>
                <span style="font-size: 11px; font-weight: 600; opacity: 0.78;">Resilience</span>
              </button>
              <button type="button" class="tier-btn tactile-card" data-cap="evolves">
                <span class="tier-dot"></span>
                <span style="font-size: 16px; font-weight: 600; flex: 1;">05 · Continuously Evolves</span>
                <span style="font-size: 11px; font-weight: 600; opacity: 0.78;">Compounding</span>
              </button>
            </div>

            <div class="card">
              <h3 id="vision-cap-heading" style="font-size: 24px; margin-bottom: 10px;">Environmental &amp; System Understanding</h3>
              <p id="vision-cap-summary" style="color: var(--ink-muted); font-size: 15px; margin-bottom: 16px;">
                Instead of breaking whenever inputs stray from pre-programmed assumptions, intelligence reads real environment signals before acting.
              </p>
              <div class="vision-contrast-cards">
                <div class="contrast-col">
                  <div class="mono" style="font-size: 10.5px; font-weight: 700; letter-spacing: 0.12em; color: var(--ink-muted); margin-bottom: 6px;">FIXED INSTRUCTIONS</div>
                  <p id="vision-legacy-text" style="font-size: 13.5px; color: var(--ink-body); margin: 0;">
                    Halts or throws unhandled errors when an environment variable, dependency, or edge case shifts.
                  </p>
                </div>
                <div class="contrast-col is-sevol">
                  <div class="mono" style="font-size: 10.5px; font-weight: 700; letter-spacing: 0.12em; color: var(--accent-solid); margin-bottom: 6px;">FLUXERA</div>
                  <p id="vision-sevol-text" style="font-size: 13.5px; color: var(--ink-primary); font-weight: 500; margin: 0;">
                    Continuously interprets system context, identifies root shifts, and restructures execution paths autonomously.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 03. ASYMMETRIC FOREST MULTIPLIER + SWISS TYPOGRAPHIC INDEX -->
    <section class="band" id="changing" data-section="changing">
      <div class="container">
        <div class="section-header">
          <div class="eyebrow">
            <span class="eyebrow-dot"></span>
            <span>03 · What We're Changing</span>
          </div>
          <h2 class="section-h2">
            Reducing the resources required to
            <span class="heading-serif-italic">build, operate, and evolve.</span>
          </h2>
        </div>

        <div class="changing-split" style="align-items: start;">
          <div class="card-dark" style="display: flex; flex-direction: column; gap: 18px;">
            <div class="mono" style="font-size: 11px; letter-spacing: 0.14em; color: #B8F0D5;" id="horizon-stage-label">
              STAGE 3 · SELF-EVOLVING
            </div>
            <div class="stage-pills" style="background: rgba(255,255,255,0.08); border-color: rgba(184,240,213,0.2);">
              <button type="button" class="stage-pill-btn" data-stage-jump="1" aria-pressed="false" style="color: #E8F1EF;">Predefined</button>
              <button type="button" class="stage-pill-btn" data-stage-jump="2" aria-pressed="false" style="color: #E8F1EF;">Assisted</button>
              <button type="button" class="stage-pill-btn is-active" data-stage-jump="3" aria-pressed="true">Self-Evolving</button>
            </div>
            <input type="range" id="horizon-slider" class="scrubber-range" min="1" max="3" step="1" value="3" aria-label="System maturity stage" />

            <div>
              <div class="metric-list-row" style="border-color: rgba(184,240,213,0.16);">
                <span class="metric-list-num" style="color: #B8F0D5;" id="meter-val-labor">92%</span>
                <span style="font-size: 13.5px; color: #E8F1EF;">Autonomous execution share</span>
              </div>
              <div class="metric-list-row" style="border-color: rgba(184,240,213,0.16);">
                <span class="metric-list-num" style="color: #B8F0D5;" id="meter-val-capital">88%</span>
                <span style="font-size: 13.5px; color: #E8F1EF;">Productive capital shift</span>
              </div>
              <div class="metric-list-row" style="border-color: rgba(184,240,213,0.16);">
                <span class="metric-list-num" style="color: #B8F0D5;" id="meter-val-time">95%</span>
                <span style="font-size: 13.5px; color: #E8F1EF;">Creation &amp; improvement velocity</span>
              </div>
              <div class="metric-list-row" style="border-bottom: 0; padding-bottom: 0;">
                <span class="metric-list-num" style="color: #B8F0D5;" id="meter-val-compute">90%</span>
                <span style="font-size: 13.5px; color: #E8F1EF;">Intelligent compute utilization</span>
              </div>
            </div>
          </div>

          <div class="editorial-index-list">
            <div class="editorial-index-row">
              <div class="editorial-index-num heading-serif-italic">01</div>
              <div>
                <h3 style="font-size: 22px; margin-bottom: 6px;">Engineering &amp; Labor</h3>
                <p style="font-size: 15px; color: var(--ink-muted); margin: 0;">Less repetitive human work. More autonomous execution across living production workflows.</p>
              </div>
            </div>
            <div class="editorial-index-row">
              <div class="editorial-index-num heading-serif-italic">02</div>
              <div>
                <h3 style="font-size: 22px; margin-bottom: 6px;">Capital</h3>
                <p style="font-size: 15px; color: var(--ink-muted); margin: 0;">Less operational overhead. More productive investment compounding into core innovation.</p>
              </div>
            </div>
            <div class="editorial-index-row">
              <div class="editorial-index-num heading-serif-italic">03</div>
              <div>
                <h3 style="font-size: 22px; margin-bottom: 6px;">Time</h3>
                <p style="font-size: 15px; color: var(--ink-muted); margin: 0;">Faster creation, execution, and self-directed system improvement without bottlenecks.</p>
              </div>
            </div>
            <div class="editorial-index-row">
              <div class="editorial-index-num heading-serif-italic">04</div>
              <div>
                <h3 style="font-size: 22px; margin-bottom: 6px;">Compute</h3>
                <p style="font-size: 15px; color: var(--ink-muted); margin: 0;">More intelligent utilization of AI and computing resources directed where judgment actually matters.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 04. EDITORIAL PULL-QUOTE & DOMAIN ANALYTICAL SPLIT -->
    <section class="band" id="global-need" data-section="global-need">
      <div class="container">
        <div class="editorial-pullquote-banner">
          <div class="eyebrow" style="margin: 0 auto 16px;">
            <span class="eyebrow-dot"></span>
            <span>04 · GLOBAL NEED</span>
          </div>
          <p class="editorial-pullquote-text">
            “Self-evolving intelligence will become a <span class="heading-serif-italic">foundational capability</span> of the future.”
          </p>
        </div>

        <div class="need-split">
          <div class="editorial-stack">
            <p>As the world becomes increasingly connected and automated, digital and physical systems are becoming more complex.</p>
            <p>Software, AI agents, robotics, factories, vehicles, energy networks, and infrastructure will need more than predefined instructions and constant human intervention.</p>
            <p>They will need intelligence that can understand their environment, make decisions, adapt to change, and continuously improve.</p>
          </div>

          <div class="card">
            <div class="eyebrow" style="margin-bottom: 12px;">
              <span class="eyebrow-dot"></span>
              <span>Inspect Real-World Domain</span>
            </div>
${DOMAIN_BUTTONS}
            <div class="domain-output">
              <div class="mono" style="font-size: 11px; color: var(--accent-solid); font-weight: 700; letter-spacing: 0.12em;" id="domain-tag">DOMAIN · SOFTWARE</div>
              <h4 id="domain-title" style="font-size: 18px; margin-top: 4px; margin-bottom: 12px;">Adaptive Software Ecosystems</h4>
              <div style="display: flex; flex-direction: column; gap: 10px;">
                <div style="padding: 12px 14px; border-radius: 14px; background: var(--bg-surface); border: 1px solid var(--border-hairline);">
                  <div style="font-size: 11px; font-weight: 700; color: var(--ink-muted); text-transform: uppercase;">Where Predefined Rules Break</div>
                  <div id="domain-break" style="font-size: 13.5px; color: var(--ink-body); margin-top: 4px;">
                    Static exception handlers fail under cascading API drift, dependency latency, and unmodeled edge states.
                  </div>
                </div>
                <div style="padding: 12px 14px; border-radius: 14px; background: var(--bg-surface); border: 1px solid var(--accent-solid);">
                  <div style="font-size: 11px; font-weight: 700; color: var(--accent-solid); text-transform: uppercase;">Fluxera Capability</div>
                  <div id="domain-sevol" style="font-size: 13.5px; color: var(--ink-primary); font-weight: 500; margin-top: 4px;">
                    Understands runtime context, adapts execution paths on the fly, and hardens future decisions automatically.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 05. PANORAMIC DEEP FOREST RIBBON -->
    <section class="band" id="systems" data-section="systems">
      <div class="container">
        <div class="section-header">
          <div class="eyebrow">
            <span class="eyebrow-dot"></span>
            <span>05 · The Future of Systems</span>
          </div>
          <h2 class="section-h2">
            Systems That Think. Understand.
            <span class="heading-serif-italic">Learn. Adapt. Evolve.</span>
          </h2>
          <p class="section-lead">
            From software and AI agents to robotics, factories, vehicles, energy networks, and intelligent infrastructure — we're building toward systems capable of understanding and improving themselves.
          </p>
        </div>

        <div class="editorial-forest-ribbon">
          <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 12px;">
            <div style="display: inline-flex; align-items: center; gap: 8px; font-size: 12.5px; font-weight: 600;">
              <span class="pulse-dot"></span>
              <span id="loop-status-text">Fluxera · Continuous Loop Active</span>
            </div>
            <button type="button" class="loop-toggle-btn" id="loop-toggle-btn">Pause Cycle</button>
          </div>

          <div class="editorial-step-ribbon" id="loop-steps">
            <button type="button" class="loop-step is-active" data-step="0">
              <div class="mono" style="font-size: 11px; color: #B8F0D5; margin-bottom: 6px;">01 · THINK</div>
              <div style="font-size: 15px; font-weight: 600;">Evaluate Intent &amp; State</div>
            </button>
            <button type="button" class="loop-step" data-step="1">
              <div class="mono" style="font-size: 11px; color: #B8F0D5; margin-bottom: 6px;">02 · UNDERSTAND</div>
              <div style="font-size: 15px; font-weight: 600;">Map Surroundings</div>
            </button>
            <button type="button" class="loop-step" data-step="2">
              <div class="mono" style="font-size: 11px; color: #B8F0D5; margin-bottom: 6px;">03 · ADAPT</div>
              <div style="font-size: 15px; font-weight: 600;">Re-Route &amp; Execute</div>
            </button>
            <button type="button" class="loop-step" data-step="3">
              <div class="mono" style="font-size: 11px; color: #B8F0D5; margin-bottom: 6px;">04 · EVOLVE</div>
              <div style="font-size: 15px; font-weight: 600;">Retain Verified Learning</div>
            </button>
          </div>

          <div style="padding: 16px 20px; border-radius: 16px; background: rgba(255,255,255,0.08); border: 1px solid rgba(184,240,213,0.2);">
            <div class="mono" style="font-size: 11px; color: #B8F0D5; margin-bottom: 6px;" id="loop-readout-code">
              CYCLE_STATE // 01 · THINK
            </div>
            <div style="font-size: 15px; color: #FFFFFF; line-height: 1.55;" id="loop-readout-desc">
              Evaluates objectives against current environment constraints before committing compute or physical actuation.
            </div>
          </div>
        </div>
      </div>
    </section>

${CONTACT_SECTION}
  </main>

${SITE_FOOTER}`;
}

/* ==========================================================================
   FORMAT 4: MIDNIGHT BLUE + DEEP OCEAN / CARBON — DARK ARCHITECTURE GRID
   ========================================================================== */
export function buildArchitectureHtml(meta) {
  return `${renderHead({ palette: meta.key, layout: 'architecture', title: meta.title, themeColor: meta.themeColor })}
<body>
  <div class="top-read-track" aria-hidden="true"><div class="top-read-fill" id="top-read-progress"></div></div>
${INTRO_OVERLAY}

  <!-- TOP MONOSPACE COMPUTE DOCK HEADER -->
  <header class="site-header" data-purpose="site-header">
    <div class="header-bar">
      <button type="button" class="brand-btn tactile-btn" id="header-replay-btn" title="Replay Fluxera logo animation">
        <span class="flux-logo-lens brand-emblem-sm">
          <span class="flux-logo-clip">
            <img src="./assets/fluxera-logo.jpg" alt="Fluxera" loading="eager" decoding="sync" />
          </span>
        </span>
        <span class="brand-text-wrap">
          <span class="brand-name">FLUXERA</span>
          <span class="brand-initiative">Autonomous Architecture</span>
        </span>
      </button>

      <nav class="nav-links" aria-label="Architecture modules">
        <a href="#hero" class="is-active">01/CORE</a>
        <a href="#vision">02/VISION</a>
        <a href="#changing">03/COMPUTE</a>
        <a href="#global-need">04/NETWORKS</a>
        <a href="#systems">05/LOOP</a>
        <a href="#contact">06/PARTNER</a>
      </nav>

      <div class="nav-actions">
        <a href="./dashboard.html" class="nav-signin tactile-btn">Platform ↗</a>
        <a href="#contact" class="btn-header-solid tactile-btn">Deploy With Us</a>
        <button type="button" class="compact-menu-btn tactile-btn" id="sevol-menu-toggle" aria-label="Open menu" aria-expanded="false">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
      </div>
    </div>
  </header>

${MOBILE_DRAWER}

  <main class="page-main">
    <!-- 01. DEEP-TECH ORBITAL CHAMBER + 5-NODE ARCHITECTURE PIPELINE -->
    <section class="band band-hero" id="hero" data-section="hero">
      <div class="arch-orbital-chamber">
        <div class="hero-kicker-tag mono">DISTRIBUTED SYSTEMS &amp; AUTONOMOUS COMPUTING · FLUXERA</div>

        <div class="arch-crest-stage">
          <span class="arch-spec-tag">[MODE: AUTONOMOUS]</span>

          <button type="button" class="hero-crest-orb tactile-btn" id="hero-logo-crest" title="Click to play Fluxera orbital intro" aria-label="Fluxera circular emblem — click to replay orbital intro">
            <span class="hero-crest-orbit" aria-hidden="true"><span class="hero-crest-comet"></span></span>
            <span class="flux-logo-lens" style="width: 100%; height: 100%;">
              <span class="flux-logo-clip">
                <img src="./assets/fluxera-logo.jpg" alt="Fluxera" loading="eager" decoding="sync" fetchpriority="high" />
                <span class="crest-sheen" aria-hidden="true"></span>
              </span>
            </span>
          </button>

          <span class="arch-spec-tag">[STATE: SELF_EVOLVING]</span>
        </div>

        <button type="button" class="hero-crest-caption tactile-btn" id="hero-replay-btn">
          <span class="eyebrow-dot"></span>
          <span>FLUXERA // Replay Orbital Animation</span>
          <span aria-hidden="true">↻</span>
        </button>

        <h1 class="hero-h1" style="max-width: 14ch;">
          Intelligence That Builds,
          <span style="color: #9DB1C4;">Think and Evolve.</span>
        </h1>

        <p class="hero-sub">
          Autonomous infrastructure intelligence for software, AI agents, robotics, factories, vehicles, energy grids, and distributed compute systems.
        </p>

        <div class="hero-ctas">
          <a href="#vision" class="btn-pill-solid tactile-btn">
            <span>Inspect Architecture</span>
            <span aria-hidden="true">→</span>
          </a>
          <a href="#contact" class="btn-pill-primary tactile-btn">
            <span>Become a Design Partner</span>
            <span aria-hidden="true">→</span>
          </a>
          <a href="./vision.html" class="btn-pill-secondary tactile-btn">
            <span>System Blueprint ↗</span>
          </a>
        </div>

        <div class="arch-pipeline-box">
          <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 8px;">
            <span class="mono" style="font-size: 11px; color: #9DB1C4; letter-spacing: 0.12em;">PIPELINE_TOPOLOGY // 5 COGNITIVE STAGES</span>
            <span class="row-badge" id="cog-badge">THINK</span>
          </div>

          <div class="cog-tabs arch-pipeline-nodes" id="hero-cog-tabs" role="tablist">
            <button type="button" class="cog-tab is-active" data-cog="think" role="tab" aria-selected="true">01 · Think</button>
            <button type="button" class="cog-tab" data-cog="understand" role="tab" aria-selected="false">02 · Understand</button>
            <button type="button" class="cog-tab" data-cog="learn" role="tab" aria-selected="false">03 · Learn</button>
            <button type="button" class="cog-tab" data-cog="adapt" role="tab" aria-selected="false">04 · Adapt</button>
            <button type="button" class="cog-tab" data-cog="evolve" role="tab" aria-selected="false">05 · Evolve</button>
          </div>

          <div style="padding: 14px 16px; border-radius: 12px; background: rgba(11, 31, 51, 0.55); border: 1px solid rgba(71, 122, 158, 0.3);">
            <div style="font-size: 15px; font-weight: 700; color: #FFFFFF; margin-bottom: 4px;" id="cog-title">01 · Systems That Think</div>
            <div style="font-size: 13.5px; color: #C7D3DF;" id="cog-desc">
              Evaluates live operational state rather than blindly running fixed scripts when unexpected conditions occur.
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 02. MODULAR 2-ROW BENTO DIFF MATRIX -->
    <section class="band" id="vision" data-section="vision">
      <div class="container">
        <div class="section-header">
          <div class="eyebrow">
            <span class="eyebrow-dot"></span>
            <span>02 · What We're Building · OUR VISION</span>
          </div>
          <h2 class="section-h2">
            We're Building the Self-Thinking,
            <span class="heading-muted">Self-Learning, and Evolving Future.</span>
          </h2>
          <p class="section-lead">
            A future where intelligence doesn't just follow instructions. It understands, reasons, creates, adapts, and continuously evolves.
          </p>
        </div>

        <div class="arch-vision-bar" id="vision-capability-list">
          <button type="button" class="tier-btn is-active tactile-card" data-cap="understand">
            <span class="tier-dot"></span>
            <span style="font-size: 14px; font-weight: 600;">01 · Understands Context</span>
          </button>
          <button type="button" class="tier-btn tactile-card" data-cap="reasons">
            <span class="tier-dot"></span>
            <span style="font-size: 14px; font-weight: 600;">02 · Reasons Independently</span>
          </button>
          <button type="button" class="tier-btn tactile-card" data-cap="creates">
            <span class="tier-dot"></span>
            <span style="font-size: 14px; font-weight: 600;">03 · Creates Solutions</span>
          </button>
          <button type="button" class="tier-btn tactile-card" data-cap="adapts">
            <span class="tier-dot"></span>
            <span style="font-size: 14px; font-weight: 600;">04 · Adapts in Motion</span>
          </button>
          <button type="button" class="tier-btn tactile-card" data-cap="evolves">
            <span class="tier-dot"></span>
            <span style="font-size: 14px; font-weight: 600;">05 · Continuously Evolves</span>
          </button>
        </div>

        <div class="card">
          <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: 10px;">
            <h3 id="vision-cap-heading" style="font-size: 24px;">Environmental &amp; System Understanding</h3>
            <span class="mini-pill-tag mono">SPEC COMPARISON</span>
          </div>
          <p id="vision-cap-summary" style="color: var(--ink-muted); font-size: 15px; margin: 0 0 18px;">
            Instead of breaking whenever inputs stray from pre-programmed assumptions, intelligence reads real environment signals before acting.
          </p>
          <div class="vision-contrast-cards">
            <div class="contrast-col">
              <div class="mono" style="font-size: 11px; font-weight: 700; letter-spacing: 0.12em; color: var(--ink-muted); margin-bottom: 6px;">LEGACY // FIXED_INSTRUCTIONS</div>
              <p id="vision-legacy-text" style="font-size: 14px; color: var(--ink-body); margin: 0;">
                Halts or throws unhandled errors when an environment variable, dependency, or edge case shifts.
              </p>
            </div>
            <div class="contrast-col is-sevol">
              <div class="mono" style="font-size: 11px; font-weight: 700; letter-spacing: 0.12em; color: #C7D3DF; margin-bottom: 6px;">FLUXERA // SELF_EVOLVING</div>
              <p id="vision-sevol-text" style="font-size: 14px; color: #FFFFFF; font-weight: 500; margin: 0;">
                Continuously interprets system context, identifies root shifts, and restructures execution paths autonomously.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 03. COMPUTE ALLOCATION MATRIX (TILES LEFT + ANIMATED BAR CONTROLLER RIGHT) -->
    <section class="band" id="changing" data-section="changing">
      <div class="container">
        <div class="section-header">
          <div class="eyebrow">
            <span class="eyebrow-dot"></span>
            <span>03 · What We're Changing · COMPUTE &amp; RESOURCE EFFICIENCY</span>
          </div>
          <h2 class="section-h2">
            Reducing the resources required to
            <span class="heading-muted">build, operate, and evolve systems.</span>
          </h2>
        </div>

        <div class="arch-changing-grid">
          <div class="bento-4">
            <article class="card resource-card">
              <div class="resource-icon-chip mono">01</div>
              <div>
                <h3 style="font-size: 19px; margin-bottom: 6px;">Engineering &amp; Labor</h3>
                <p style="font-size: 14px; color: var(--ink-muted); margin: 0;">Less repetitive human work. More autonomous execution.</p>
              </div>
            </article>
            <article class="card resource-card">
              <div class="resource-icon-chip mono">02</div>
              <div>
                <h3 style="font-size: 19px; margin-bottom: 6px;">Capital</h3>
                <p style="font-size: 14px; color: var(--ink-muted); margin: 0;">Less operational overhead. More productive investment.</p>
              </div>
            </article>
            <article class="card resource-card">
              <div class="resource-icon-chip mono">03</div>
              <div>
                <h3 style="font-size: 19px; margin-bottom: 6px;">Time</h3>
                <p style="font-size: 14px; color: var(--ink-muted); margin: 0;">Faster creation, execution, and improvement.</p>
              </div>
            </article>
            <article class="card resource-card" style="background: var(--accent-primary-grad); border-color: #477A9E;">
              <div class="resource-icon-chip mono" style="background: rgba(255,255,255,0.16); color: #fff;">04</div>
              <div>
                <h3 style="font-size: 19px; margin-bottom: 6px; color: #fff;">Compute</h3>
                <p style="font-size: 14px; color: #C7D3DF; margin: 0;">More intelligent utilization of AI and computing resources.</p>
              </div>
            </article>
          </div>

          <div class="card" style="background: linear-gradient(160deg, #0B1F33 0%, #101318 100%); display: flex; flex-direction: column; justify-content: space-between; gap: 16px;">
            <div style="display: flex; flex-direction: column; gap: 12px;">
              <div class="mono" style="font-size: 11px; letter-spacing: 0.14em; color: #C7D3DF;" id="horizon-stage-label">
                STAGE 3 · SELF-EVOLVING
              </div>
              <div class="stage-pills">
                <button type="button" class="stage-pill-btn" data-stage-jump="1" aria-pressed="false">1. Predefined</button>
                <button type="button" class="stage-pill-btn" data-stage-jump="2" aria-pressed="false">2. Assisted</button>
                <button type="button" class="stage-pill-btn is-active" data-stage-jump="3" aria-pressed="true">3. Self-Evolving</button>
              </div>
              <input type="range" id="horizon-slider" class="scrubber-range" min="1" max="3" step="1" value="3" aria-label="System maturity stage" />
            </div>

            <div>
              <div class="meter-row-with-bar">
                <div class="meter-row-head">
                  <span style="font-size: 13.5px; color: #C7D3DF;">Autonomous execution share</span>
                  <span class="metric-list-num mono" style="font-size: 20px; min-width: auto; color: #FFFFFF;" id="meter-val-labor">92%</span>
                </div>
                <div class="meter-track"><div class="meter-fill" id="meter-bar-labor" style="width: 92%;"></div></div>
              </div>
              <div class="meter-row-with-bar">
                <div class="meter-row-head">
                  <span style="font-size: 13.5px; color: #C7D3DF;">Productive capital shift</span>
                  <span class="metric-list-num mono" style="font-size: 20px; min-width: auto; color: #FFFFFF;" id="meter-val-capital">88%</span>
                </div>
                <div class="meter-track"><div class="meter-fill" id="meter-bar-capital" style="width: 88%;"></div></div>
              </div>
              <div class="meter-row-with-bar">
                <div class="meter-row-head">
                  <span style="font-size: 13.5px; color: #C7D3DF;">Creation &amp; improvement velocity</span>
                  <span class="metric-list-num mono" style="font-size: 20px; min-width: auto; color: #FFFFFF;" id="meter-val-time">95%</span>
                </div>
                <div class="meter-track"><div class="meter-fill" id="meter-bar-time" style="width: 95%;"></div></div>
              </div>
              <div class="meter-row-with-bar">
                <div class="meter-row-head">
                  <span style="font-size: 13.5px; color: #C7D3DF;">Intelligent compute utilization</span>
                  <span class="metric-list-num mono" style="font-size: 20px; min-width: auto; color: #FFFFFF;" id="meter-val-compute">90%</span>
                </div>
                <div class="meter-track"><div class="meter-fill" id="meter-bar-compute" style="width: 90%;"></div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 04. REVERSED DOMAIN NODE SWITCH RACK LEFT + MANIFESTO RIGHT -->
    <section class="band" id="global-need" data-section="global-need">
      <div class="container">
        <div class="section-header">
          <div class="eyebrow">
            <span class="eyebrow-dot"></span>
            <span>04 · Why the World Needs This · DISTRIBUTED NEED</span>
          </div>
          <h2 class="section-h2">
            The Next Generation of Technology
            <span class="heading-muted">Needs a New Kind of Intelligence.</span>
          </h2>
        </div>

        <div class="arch-need-grid">
          <div class="card">
            <div class="mono" style="font-size: 11px; color: #9DB1C4; letter-spacing: 0.14em; margin-bottom: 12px;">
              CONNECTED INFRASTRUCTURE DOMAINS
            </div>
${DOMAIN_BUTTONS}
            <div class="domain-output">
              <div class="mono" style="font-size: 11px; color: #C7D3DF; font-weight: 700; letter-spacing: 0.12em;" id="domain-tag">DOMAIN · SOFTWARE</div>
              <h4 id="domain-title" style="font-size: 18px; margin-top: 4px; margin-bottom: 12px;">Adaptive Software Ecosystems</h4>
              <div style="display: flex; flex-direction: column; gap: 10px;">
                <div style="padding: 12px 14px; border-radius: 12px; background: var(--bg-surface); border: 1px solid var(--border-hairline);">
                  <div style="font-size: 11px; font-weight: 700; color: var(--ink-muted); text-transform: uppercase;">Where Predefined Rules Break</div>
                  <div id="domain-break" style="font-size: 13.5px; color: var(--ink-body); margin-top: 4px;">
                    Static exception handlers fail under cascading API drift, dependency latency, and unmodeled edge states.
                  </div>
                </div>
                <div style="padding: 12px 14px; border-radius: 12px; background: rgba(22,78,117,0.35); border: 1px solid #477A9E;">
                  <div style="font-size: 11px; font-weight: 700; color: #C7D3DF; text-transform: uppercase;">Fluxera Capability</div>
                  <div id="domain-sevol" style="font-size: 13.5px; color: #FFFFFF; font-weight: 500; margin-top: 4px;">
                    Understands runtime context, adapts execution paths on the fly, and hardens future decisions automatically.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="editorial-stack">
            <p>As the world becomes increasingly connected and automated, digital and physical systems are becoming more complex.</p>
            <p>Software, AI agents, robotics, factories, vehicles, energy networks, and infrastructure will need more than predefined instructions and constant human intervention.</p>
            <p>They will need intelligence that can understand their environment, make decisions, adapt to change, and continuously improve.</p>
            <div class="editorial-highlight" style="background: #0B1F33; border-color: #477A9E;">
              Self-evolving intelligence will become a foundational capability of the future.
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 05. CONNECTED HORIZONTAL NODE-GRAPH TOPOLOGY -->
    <section class="band" id="systems" data-section="systems">
      <div class="container">
        <div class="section-header">
          <div class="eyebrow">
            <span class="eyebrow-dot"></span>
            <span>05 · The Future of Systems</span>
          </div>
          <h2 class="section-h2">
            Systems That Think. Understand.
            <span class="heading-muted">Learn. Adapt. Evolve.</span>
          </h2>
          <p class="section-lead">
            From software and AI agents to robotics, factories, vehicles, energy networks, and intelligent infrastructure — we're building toward autonomous, continuously improving systems.
          </p>
        </div>

        <div class="arch-topology-panel">
          <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 12px;">
            <div style="display: inline-flex; align-items: center; gap: 8px; font-size: 12.5px; font-weight: 600; color: #FFFFFF;">
              <span class="pulse-dot"></span>
              <span id="loop-status-text">Fluxera · Continuous Loop Active</span>
            </div>
            <button type="button" class="loop-toggle-btn" id="loop-toggle-btn">Pause Cycle</button>
          </div>

          <div class="arch-topology-steps" id="loop-steps">
            <button type="button" class="loop-step is-active" data-step="0">
              <div class="mono" style="font-size: 11px; color: #C7D3DF; margin-bottom: 6px;">NODE_01 // THINK</div>
              <div style="font-size: 15px; font-weight: 600;">Evaluate Intent &amp; State</div>
            </button>
            <button type="button" class="loop-step" data-step="1">
              <div class="mono" style="font-size: 11px; color: #C7D3DF; margin-bottom: 6px;">NODE_02 // UNDERSTAND</div>
              <div style="font-size: 15px; font-weight: 600;">Map Surroundings</div>
            </button>
            <button type="button" class="loop-step" data-step="2">
              <div class="mono" style="font-size: 11px; color: #C7D3DF; margin-bottom: 6px;">NODE_03 // ADAPT</div>
              <div style="font-size: 15px; font-weight: 600;">Re-Route &amp; Execute</div>
            </button>
            <button type="button" class="loop-step" data-step="3">
              <div class="mono" style="font-size: 11px; color: #C7D3DF; margin-bottom: 6px;">NODE_04 // EVOLVE</div>
              <div style="font-size: 15px; font-weight: 600;">Retain Verified Learning</div>
            </button>
          </div>

          <div style="padding: 16px 20px; border-radius: 14px; background: #101318; border: 1px solid rgba(71, 122, 158, 0.34);">
            <div class="mono" style="font-size: 11px; color: #C7D3DF; margin-bottom: 6px;" id="loop-readout-code">
              CYCLE_STATE // 01 · THINK
            </div>
            <div style="font-size: 14.5px; color: #F2F6FA; line-height: 1.55;" id="loop-readout-desc">
              Evaluates objectives against current environment constraints before committing compute or physical actuation.
            </div>
          </div>
        </div>
      </div>
    </section>

${CONTACT_SECTION}
  </main>

${SITE_FOOTER}`;
}

