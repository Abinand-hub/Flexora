import {
  renderHead,
  INTRO_OVERLAY,
  MOBILE_DRAWER,
  DOMAIN_BUTTONS,
  CONTACT_SECTION,
  SITE_FOOTER,
} from './palette-templates.mjs';

/* ==========================================================================
   FORMAT 5: GRAY + SILVER + YELLOW — STUDIO INDUSTRIAL HARDWARE
   ========================================================================== */
export function buildIndustrialHtml(meta) {
  return `${renderHead({ palette: meta.key, layout: 'industrial', title: meta.title, themeColor: meta.themeColor })}
<body>
  <div class="top-read-track" aria-hidden="true"><div class="top-read-fill" id="top-read-progress"></div></div>
${INTRO_OVERLAY}

  <!-- 2-TIER MACHINED HARDWARE BEZEL HEADER -->
  <header class="site-header" data-purpose="site-header">
    <div class="ind-header-wrap">
      <div class="ind-header-top">
        <button type="button" class="brand-btn tactile-btn" id="header-replay-btn" title="Replay Fluxera logo animation">
          <span class="flux-logo-lens brand-emblem-sm">
            <span class="flux-logo-clip">
              <img src="./assets/fluxera-logo.jpg" alt="Fluxera" loading="eager" decoding="sync" />
            </span>
          </span>
          <span class="brand-text-wrap">
            <span class="brand-name">FLUXERA</span>
            <span class="brand-initiative">Autonomous Systems Hardware</span>
          </span>
        </button>

        <div class="nav-actions">
          <a href="./dashboard.html" class="nav-signin tactile-btn">Console ↗</a>
          <a href="#contact" class="btn-header-solid tactile-btn">Design Partner →</a>
          <button type="button" class="compact-menu-btn tactile-btn" id="sevol-menu-toggle" aria-label="Open menu" aria-expanded="false">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>
      </div>

      <nav class="ind-header-rail nav-links" aria-label="Primary hardware bays" style="border: 0; border-radius: 0; background: #1C1E21;">
        <a href="#hero" class="is-active">01 · CORE</a>
        <a href="#vision">02 · VISION</a>
        <a href="#changing">03 · METRICS</a>
        <a href="#global-need">04 · DOMAINS</a>
        <a href="#systems">05 · SEQUENCER</a>
        <a href="#contact">06 · PARTNER</a>
      </nav>
    </div>
  </header>

${MOBILE_DRAWER}

  <main class="page-main">
    <!-- 01. INDUSTRIAL BENTO HERO WITH RIGHT CREST PEDESTAL -->
    <section class="band band-hero" id="hero" data-section="hero">
      <div class="ind-hero-bento">
        <div class="ind-hero-main">
          <div class="eyebrow">
            <span class="eyebrow-dot"></span>
            <span>FLUXERA TECHNOLOGY INITIATIVE · SERIES 01</span>
          </div>

          <h1 class="hero-h1" style="max-width: 13ch; font-size: clamp(36px, 5.5vw, 72px);">
            Intelligence That Builds,
            <span style="color: #FFC93C;">Think and Evolve.</span>
          </h1>

          <p class="hero-sub">
            Building autonomous intelligence for the next generation of software and physical systems — built to think, understand context, adapt in motion, and compound capability.
          </p>

          <div class="hero-ctas" style="justify-content: flex-start;">
            <a href="#vision" class="btn-pill-solid tactile-btn">
              <span>Explore Our Vision</span>
              <span aria-hidden="true">→</span>
            </a>
            <a href="#contact" class="btn-pill-secondary tactile-btn">
              <span>Become a Design Partner</span>
            </a>
            <a href="./dashboard.html" class="btn-pill-secondary tactile-btn">
              <span>Platform Console ↗</span>
            </a>
          </div>
        </div>

        <aside class="ind-hero-pedestal">
          <div style="display: flex; align-items: center; justify-content: space-between; width: 100%; font-size: 11px;" class="mono">
            <span style="color: #FFC93C; font-weight: 700;">EMBLEM // UNIT_01</span>
            <button type="button" class="loop-toggle-btn" id="hero-replay-btn">Replay ↻</button>
          </div>

          <button type="button" class="hero-crest-orb tactile-btn" id="hero-logo-crest" title="Click to play Fluxera orbital intro" aria-label="Fluxera circular emblem — click to replay orbital intro">
            <span class="hero-crest-orbit" aria-hidden="true"><span class="hero-crest-comet"></span></span>
            <span class="flux-logo-lens" style="width: 100%; height: 100%;">
              <span class="flux-logo-clip">
                <img src="./assets/fluxera-logo.jpg" alt="Fluxera" loading="eager" decoding="sync" fetchpriority="high" />
                <span class="crest-sheen" aria-hidden="true"></span>
              </span>
            </span>
          </button>

          <div class="cog-tabs ind-led-stack" id="hero-cog-tabs" role="tablist">
            <button type="button" class="cog-tab is-active" data-cog="think" role="tab" aria-selected="true">
              <span>01 · Think</span><span class="mono">ACTIVE</span>
            </button>
            <button type="button" class="cog-tab" data-cog="understand" role="tab" aria-selected="false">
              <span>02 · Understand</span><span class="mono">STAGE</span>
            </button>
            <button type="button" class="cog-tab" data-cog="learn" role="tab" aria-selected="false">
              <span>03 · Learn</span><span class="mono">STAGE</span>
            </button>
            <button type="button" class="cog-tab" data-cog="adapt" role="tab" aria-selected="false">
              <span>04 · Adapt</span><span class="mono">STAGE</span>
            </button>
            <button type="button" class="cog-tab" data-cog="evolve" role="tab" aria-selected="false">
              <span>05 · Evolve</span><span class="mono">STAGE</span>
            </button>
          </div>
        </aside>
      </div>

      <div class="ind-ticker-bar">
        <span class="row-badge" id="cog-badge">THINK</span>
        <span style="font-size: 15px; font-weight: 700; color: #FFFFFF;" id="cog-title">01 · Systems That Think</span>
        <span style="font-size: 13.5px; color: #D9DADC; flex: 1; min-width: 240px;" id="cog-desc">
          Evaluates live operational state rather than blindly running fixed scripts when unexpected conditions occur.
        </span>
      </div>
    </section>

    <!-- 02. VISION INSTRUMENT SWITCHES -->
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

        <div class="vision-grid">
          <div class="tier-stack" id="vision-capability-list">
            <button type="button" class="tier-btn is-active tactile-card" data-cap="understand">
              <span class="tier-dot"></span>
              <span style="font-size: 16px; font-weight: 600; flex: 1;">01 · Understands Context</span>
              <span class="mono" style="font-size: 11px;">Perception</span>
            </button>
            <button type="button" class="tier-btn tactile-card" data-cap="reasons">
              <span class="tier-dot"></span>
              <span style="font-size: 16px; font-weight: 600; flex: 1;">02 · Reasons Independently</span>
              <span class="mono" style="font-size: 11px;">Judgment</span>
            </button>
            <button type="button" class="tier-btn tactile-card" data-cap="creates">
              <span class="tier-dot"></span>
              <span style="font-size: 16px; font-weight: 600; flex: 1;">03 · Creates Solutions</span>
              <span class="mono" style="font-size: 11px;">Synthesis</span>
            </button>
            <button type="button" class="tier-btn tactile-card" data-cap="adapts">
              <span class="tier-dot"></span>
              <span style="font-size: 16px; font-weight: 600; flex: 1;">04 · Adapts in Motion</span>
              <span class="mono" style="font-size: 11px;">Resilience</span>
            </button>
            <button type="button" class="tier-btn tactile-card" data-cap="evolves">
              <span class="tier-dot"></span>
              <span style="font-size: 16px; font-weight: 600; flex: 1;">05 · Continuously Evolves</span>
              <span class="mono" style="font-size: 11px;">Compounding</span>
            </button>
          </div>

          <div class="card">
            <div class="eyebrow" style="margin-bottom: 10px;">
              <span class="eyebrow-dot"></span>
              <span>Instruction-Based vs. Self-Evolving</span>
            </div>
            <h3 id="vision-cap-heading" style="font-size: 24px; margin-bottom: 10px;">Environmental &amp; System Understanding</h3>
            <p id="vision-cap-summary" style="color: var(--ink-muted); font-size: 15px;">
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
                <div class="mono" style="font-size: 10.5px; font-weight: 700; letter-spacing: 0.12em; color: #FFC93C; margin-bottom: 6px;">FLUXERA</div>
                <p id="vision-sevol-text" style="font-size: 13.5px; color: #FFFFFF; font-weight: 500; margin: 0;">
                  Continuously interprets system context, identifies root shifts, and restructures execution paths autonomously.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 03. STAGE HEADER + 4 VERTICAL GAUGE PILLAR CARDS -->
    <section class="band" id="changing" data-section="changing">
      <div class="container">
        <div class="section-header">
          <div class="eyebrow">
            <span class="eyebrow-dot"></span>
            <span>03 · What We're Changing</span>
          </div>
          <h2 class="section-h2">
            Reducing the resources required to
            <span class="heading-muted">build, operate, and evolve systems.</span>
          </h2>
        </div>

        <div class="card" style="border-color: rgba(255, 201, 60, 0.42);">
          <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 16px;">
            <div>
              <div class="mono" style="font-size: 11px; color: #FFC93C; font-weight: 700; letter-spacing: 0.14em;" id="horizon-stage-label">
                STAGE 3 · SELF-EVOLVING
              </div>
              <div style="font-size: 14px; color: #D9DADC; margin-top: 4px;">
                Adjust operational maturity stage to inspect telemetry gains per resource pillar.
              </div>
            </div>
            <div style="min-width: 260px; flex: 1; max-width: 420px; display: flex; flex-direction: column; gap: 10px;">
              <div class="stage-pills">
                <button type="button" class="stage-pill-btn" data-stage-jump="1" aria-pressed="false">1. Predefined</button>
                <button type="button" class="stage-pill-btn" data-stage-jump="2" aria-pressed="false">2. Assisted</button>
                <button type="button" class="stage-pill-btn is-active" data-stage-jump="3" aria-pressed="true">3. Self-Evolving</button>
              </div>
              <input type="range" id="horizon-slider" class="scrubber-range" min="1" max="3" step="1" value="3" aria-label="System maturity stage" />
            </div>
          </div>
        </div>

        <div class="ind-pillars-grid">
          <article class="card resource-card">
            <div style="display: flex; justify-content: space-between; align-items: baseline;">
              <div class="resource-icon-chip mono">01</div>
              <span class="metric-list-num mono" style="font-size: 28px; min-width: auto;" id="meter-val-labor">92%</span>
            </div>
            <div>
              <h3 style="font-size: 19px; margin-bottom: 6px;">Engineering &amp; Labor</h3>
              <p style="font-size: 13.5px; color: var(--ink-muted); margin: 0 0 12px;">Less repetitive human work. More autonomous execution.</p>
              <div class="meter-track"><div class="meter-fill" id="meter-bar-labor" style="width: 92%;"></div></div>
            </div>
          </article>

          <article class="card resource-card">
            <div style="display: flex; justify-content: space-between; align-items: baseline;">
              <div class="resource-icon-chip mono">02</div>
              <span class="metric-list-num mono" style="font-size: 28px; min-width: auto;" id="meter-val-capital">88%</span>
            </div>
            <div>
              <h3 style="font-size: 19px; margin-bottom: 6px;">Capital</h3>
              <p style="font-size: 13.5px; color: var(--ink-muted); margin: 0 0 12px;">Less operational overhead. More productive investment.</p>
              <div class="meter-track"><div class="meter-fill" id="meter-bar-capital" style="width: 88%;"></div></div>
            </div>
          </article>

          <article class="card resource-card">
            <div style="display: flex; justify-content: space-between; align-items: baseline;">
              <div class="resource-icon-chip mono">03</div>
              <span class="metric-list-num mono" style="font-size: 28px; min-width: auto;" id="meter-val-time">95%</span>
            </div>
            <div>
              <h3 style="font-size: 19px; margin-bottom: 6px;">Time</h3>
              <p style="font-size: 13.5px; color: var(--ink-muted); margin: 0 0 12px;">Faster creation, execution, and improvement.</p>
              <div class="meter-track"><div class="meter-fill" id="meter-bar-time" style="width: 95%;"></div></div>
            </div>
          </article>

          <article class="card resource-card" style="border-color: #FFC93C;">
            <div style="display: flex; justify-content: space-between; align-items: baseline;">
              <div class="resource-icon-chip mono">04</div>
              <span class="metric-list-num mono" style="font-size: 28px; min-width: auto;" id="meter-val-compute">90%</span>
            </div>
            <div>
              <h3 style="font-size: 19px; margin-bottom: 6px;">Compute</h3>
              <p style="font-size: 13.5px; color: var(--ink-muted); margin: 0 0 12px;">More intelligent utilization of AI and computing resources.</p>
              <div class="meter-track"><div class="meter-fill" id="meter-bar-compute" style="width: 90%;"></div></div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- 04. HIGH-CONTRAST MACHINED SILVER PLATE BAND -->
    <section class="band band-silver-plate" id="global-need" data-section="global-need">
      <div class="container">
        <div class="section-header">
          <div class="eyebrow">
            <span class="eyebrow-dot"></span>
            <span>04 · Why the World Needs This · GLOBAL NEED</span>
          </div>
          <h2 class="section-h2">
            The Next Generation of Technology
            <span class="heading-muted">Needs a New Kind of Intelligence.</span>
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

          <div class="card">
            <div class="eyebrow" style="margin-bottom: 12px;">
              <span class="eyebrow-dot"></span>
              <span>Connected Domains</span>
            </div>
${DOMAIN_BUTTONS}
            <div class="domain-output">
              <div class="mono" style="font-size: 11px; font-weight: 700; letter-spacing: 0.12em;" id="domain-tag">DOMAIN · SOFTWARE</div>
              <h4 id="domain-title" style="font-size: 18px; margin-top: 4px; margin-bottom: 12px;">Adaptive Software Ecosystems</h4>
              <div style="display: flex; flex-direction: column; gap: 10px;">
                <div style="padding: 12px 14px; border-radius: 10px; background: #FFFFFF; border: 1px solid rgba(43,45,49,0.16);">
                  <div style="font-size: 11px; font-weight: 700; color: #555961; text-transform: uppercase;">Where Predefined Rules Break</div>
                  <div id="domain-break" style="font-size: 13.5px; margin-top: 4px;">
                    Static exception handlers fail under cascading API drift, dependency latency, and unmodeled edge states.
                  </div>
                </div>
                <div style="padding: 12px 14px; border-radius: 10px; background: #FFF8E1; border: 1px solid #E5AB1B;">
                  <div style="font-size: 11px; font-weight: 700; color: #8A6100; text-transform: uppercase;">Fluxera Capability</div>
                  <div id="domain-sevol" style="font-size: 13.5px; font-weight: 600; margin-top: 4px;">
                    Understands runtime context, adapts execution paths on the fly, and hardens future decisions automatically.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 05. HARDWARE SEQUENCER STRIP -->
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
        </div>

        <div class="card-dark">
          <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 12px;">
            <div style="display: inline-flex; align-items: center; gap: 8px; font-size: 12.5px; font-weight: 600;">
              <span class="pulse-dot"></span>
              <span id="loop-status-text">Fluxera · Continuous Loop Active</span>
            </div>
            <button type="button" class="loop-toggle-btn" id="loop-toggle-btn">Pause Cycle</button>
          </div>

          <div class="telemetry-loop-grid" id="loop-steps">
            <button type="button" class="loop-step is-active" data-step="0">
              <div class="mono" style="font-size: 11px; color: #FFC93C; margin-bottom: 6px;">PAD_01 // THINK</div>
              <div style="font-size: 15px; font-weight: 600;">Evaluate Intent &amp; State</div>
            </button>
            <button type="button" class="loop-step" data-step="1">
              <div class="mono" style="font-size: 11px; color: #FFC93C; margin-bottom: 6px;">PAD_02 // UNDERSTAND</div>
              <div style="font-size: 15px; font-weight: 600;">Map Surroundings</div>
            </button>
            <button type="button" class="loop-step" data-step="2">
              <div class="mono" style="font-size: 11px; color: #FFC93C; margin-bottom: 6px;">PAD_03 // ADAPT</div>
              <div style="font-size: 15px; font-weight: 600;">Re-Route &amp; Execute</div>
            </button>
            <button type="button" class="loop-step" data-step="3">
              <div class="mono" style="font-size: 11px; color: #FFC93C; margin-bottom: 6px;">PAD_04 // EVOLVE</div>
              <div style="font-size: 15px; font-weight: 600;">Retain Verified Learning</div>
            </button>
          </div>

          <div style="padding: 16px 20px; border-radius: 10px; background: #1B1D20; border: 1px solid rgba(255, 201, 60, 0.3);">
            <div class="mono" style="font-size: 11px; color: #FFC93C; margin-bottom: 6px;" id="loop-readout-code">
              CYCLE_STATE // 01 · THINK
            </div>
            <div style="font-size: 14.5px; color: #F4F5F6; line-height: 1.55;" id="loop-readout-desc">
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
   FORMAT 6: CREAM + INK BLACK + BURNT ORANGE — SWISS BROADSHEET POSTER
   ========================================================================== */
export function buildManifestoHtml(meta) {
  return `${renderHead({ palette: meta.key, layout: 'manifesto', title: meta.title, themeColor: meta.themeColor })}
<body>
${INTRO_OVERLAY}

  <header class="site-header" data-purpose="site-header">
    <div class="man-header-rule">
      <button type="button" class="brand-btn tactile-btn" id="header-replay-btn" title="Replay Fluxera logo animation">
        <span class="flux-logo-lens brand-emblem-sm">
          <span class="flux-logo-clip">
            <img src="./assets/fluxera-logo.jpg" alt="Fluxera" loading="eager" decoding="sync" />
          </span>
        </span>
        <span class="brand-text-wrap">
          <span class="brand-name">FLUXERA</span>
          <span class="brand-initiative">Autonomous Intelligence Press</span>
        </span>
      </button>

      <nav class="nav-links" aria-label="Primary sections" style="border-radius: 4px;">
        <a href="#vision">Vision</a>
        <a href="#changing">Resources</a>
        <a href="#global-need">Global Need</a>
        <a href="#systems">Systems</a>
        <a href="#contact">Partner</a>
      </nav>

      <div class="nav-actions">
        <a href="./dashboard.html" class="nav-signin tactile-btn" style="border-radius: 4px;">Platform ↗</a>
        <a href="#contact" class="btn-header-solid tactile-btn" style="background: #D9541E; color: #FFFFFF;">Get in Touch</a>
        <button type="button" class="compact-menu-btn tactile-btn" id="sevol-menu-toggle" aria-label="Open menu" aria-expanded="false" style="border-radius: 4px;">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
      </div>
    </div>
  </header>

${MOBILE_DRAWER}

  <main class="page-main">
    <!-- 01. BROADSHEET FRONT-PAGE SPREAD -->
    <section class="band band-hero" id="hero" data-section="hero">
      <div class="man-banner-bar">
        <span>FLUXERA MANIFESTO · AUTONOMOUS SYSTEMS EDITION</span>
        <span style="background: #D9541E; color: #FFFFFF; padding: 3px 9px; border-radius: 2px;">THINK · UNDERSTAND · LEARN · ADAPT · EVOLVE</span>
      </div>

      <h1 class="man-headline">
        Intelligence That Builds,
        <span style="color: #D9541E;">Think and Evolve.</span>
      </h1>

      <div class="man-frontpage-grid">
        <div class="man-front-col" style="display: flex; flex-direction: column; gap: 18px;">
          <p class="hero-sub" style="margin: 0; font-size: 17px; color: #111111;">
            Building autonomous intelligence for the next generation of software and systems — enabling systems to think, understand, learn, adapt, and evolve without constant human intervention.
          </p>
          <div class="hero-ctas" style="justify-content: flex-start;">
            <a href="#vision" class="btn-pill-primary tactile-btn">
              <span>Explore Vision →</span>
            </a>
            <a href="#contact" class="btn-pill-solid tactile-btn">
              <span>Become a Design Partner</span>
            </a>
          </div>
          <div style="padding-top: 12px; border-top: 1.5px solid #111111; font-size: 12.5px; color: #4A463F;">
            A Fluxera technology initiative · Direct Founder Program
          </div>
        </div>

        <div class="man-front-col">
          <div class="man-crest-frame">
            <button type="button" class="hero-crest-orb tactile-btn" id="hero-logo-crest" title="Click to play Fluxera orbital intro" aria-label="Fluxera circular emblem — click to replay orbital intro">
              <span class="hero-crest-orbit" aria-hidden="true"><span class="hero-crest-comet"></span></span>
              <span class="flux-logo-lens" style="width: 100%; height: 100%;">
                <span class="flux-logo-clip">
                  <img src="./assets/fluxera-logo.jpg" alt="Fluxera" loading="eager" decoding="sync" fetchpriority="high" />
                  <span class="crest-sheen" aria-hidden="true"></span>
                </span>
              </span>
            </button>
            <button type="button" class="hero-crest-caption tactile-btn" id="hero-replay-btn" style="border-radius: 4px; border: 1.5px solid #111111;">
              <span>Replay Fluxera Orbital Intro ↻</span>
            </button>
          </div>
        </div>

        <div class="man-front-col" style="display: flex; flex-direction: column; gap: 12px;">
          <div class="mono" style="font-size: 11px; font-weight: 700; letter-spacing: 0.14em; color: #D9541E;">
            COGNITIVE DISPATCH // SELECT STAGE
          </div>
          <div class="cog-tabs" id="hero-cog-tabs" role="tablist" style="border-radius: 4px; border: 1.5px solid #111111; background: #FAF7F0;">
            <button type="button" class="cog-tab is-active" data-cog="think" role="tab" aria-selected="true" style="border-radius: 2px;">Think</button>
            <button type="button" class="cog-tab" data-cog="understand" role="tab" aria-selected="false" style="border-radius: 2px;">Understand</button>
            <button type="button" class="cog-tab" data-cog="learn" role="tab" aria-selected="false" style="border-radius: 2px;">Learn</button>
            <button type="button" class="cog-tab" data-cog="adapt" role="tab" aria-selected="false" style="border-radius: 2px;">Adapt</button>
            <button type="button" class="cog-tab" data-cog="evolve" role="tab" aria-selected="false" style="border-radius: 2px;">Evolve</button>
          </div>

          <div class="card" style="padding: 18px;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
              <span class="row-badge" id="cog-badge" style="border-radius: 2px;">THINK</span>
              <span class="mono" style="font-size: 11px; color: #4A463F;">ACTIVE BRIEF</span>
            </div>
            <div style="font-size: 17px; font-weight: 700; color: #111111; margin-bottom: 6px;" id="cog-title">01 · Systems That Think</div>
            <p style="margin: 0; font-size: 14px; color: #242424; line-height: 1.55;" id="cog-desc">
              Evaluates live operational state rather than blindly running fixed scripts when unexpected conditions occur.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 02. RULED TABULAR VISION LEDGER -->
    <section class="band" id="vision" data-section="vision">
      <div class="container">
        <div class="section-header">
          <div class="eyebrow">
            <span class="eyebrow-dot"></span>
            <span>02 · What We're Building · OUR VISION</span>
          </div>
          <h2 class="section-h2">
            We're Building the Self-Thinking,
            <span style="color: #D9541E;">Self-Learning, and Evolving Future.</span>
          </h2>
          <p class="section-lead">
            A future where intelligence doesn't just follow instructions. It understands, reasons, creates, adapts, and continuously evolves.
          </p>
        </div>

        <div class="vision-grid">
          <div class="tier-stack" id="vision-capability-list">
            <button type="button" class="tier-btn is-active tactile-card" data-cap="understand">
              <span class="tier-dot"></span>
              <span style="font-size: 16px; font-weight: 600; flex: 1;">01 · Understands Context</span>
              <span class="mono" style="font-size: 11px;">Perception</span>
            </button>
            <button type="button" class="tier-btn tactile-card" data-cap="reasons">
              <span class="tier-dot"></span>
              <span style="font-size: 16px; font-weight: 600; flex: 1;">02 · Reasons Independently</span>
              <span class="mono" style="font-size: 11px;">Judgment</span>
            </button>
            <button type="button" class="tier-btn tactile-card" data-cap="creates">
              <span class="tier-dot"></span>
              <span style="font-size: 16px; font-weight: 600; flex: 1;">03 · Creates Solutions</span>
              <span class="mono" style="font-size: 11px;">Synthesis</span>
            </button>
            <button type="button" class="tier-btn tactile-card" data-cap="adapts">
              <span class="tier-dot"></span>
              <span style="font-size: 16px; font-weight: 600; flex: 1;">04 · Adapts in Motion</span>
              <span class="mono" style="font-size: 11px;">Resilience</span>
            </button>
            <button type="button" class="tier-btn tactile-card" data-cap="evolves">
              <span class="tier-dot"></span>
              <span style="font-size: 16px; font-weight: 600; flex: 1;">05 · Continuously Evolves</span>
              <span class="mono" style="font-size: 11px;">Compounding</span>
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
              <div class="contrast-col is-sevol" style="border-width: 1.5px;">
                <div class="mono" style="font-size: 10.5px; font-weight: 700; letter-spacing: 0.12em; color: #D9541E; margin-bottom: 6px;">FLUXERA</div>
                <p id="vision-sevol-text" style="font-size: 13.5px; color: #111111; font-weight: 600; margin: 0;">
                  Continuously interprets system context, identifies root shifts, and restructures execution paths autonomously.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 03. INVERTED INK-BLACK MONOLITH RESOURCE BAND -->
    <section class="band band-ink-monolith" id="changing" data-section="changing">
      <div class="container">
        <div class="section-header">
          <div class="eyebrow">
            <span class="eyebrow-dot"></span>
            <span>03 · What We're Changing</span>
          </div>
          <h2 class="section-h2">
            Reducing the resources required to
            <span class="heading-muted">build, operate, and evolve systems.</span>
          </h2>
        </div>

        <div class="changing-split">
          <div class="bento-4">
            <article class="card resource-card">
              <div class="resource-icon-chip mono">01</div>
              <div>
                <h3 style="font-size: 19px; margin-bottom: 6px;">Engineering &amp; Labor</h3>
                <p style="font-size: 14px; color: rgba(243,238,227,0.76); margin: 0;">Less repetitive human work. More autonomous execution.</p>
              </div>
            </article>
            <article class="card resource-card">
              <div class="resource-icon-chip mono">02</div>
              <div>
                <h3 style="font-size: 19px; margin-bottom: 6px;">Capital</h3>
                <p style="font-size: 14px; color: rgba(243,238,227,0.76); margin: 0;">Less operational overhead. More productive investment.</p>
              </div>
            </article>
            <article class="card resource-card">
              <div class="resource-icon-chip mono">03</div>
              <div>
                <h3 style="font-size: 19px; margin-bottom: 6px;">Time</h3>
                <p style="font-size: 14px; color: rgba(243,238,227,0.76); margin: 0;">Faster creation, execution, and improvement.</p>
              </div>
            </article>
            <article class="card resource-card" style="background: #D9541E; border-color: #D9541E;">
              <div class="resource-icon-chip mono" style="background: #111111; color: #F3EEE3;">04</div>
              <div>
                <h3 style="font-size: 19px; margin-bottom: 6px; color: #FFFFFF;">Compute</h3>
                <p style="font-size: 14px; color: rgba(255,255,255,0.92); margin: 0;">More intelligent utilization of AI and computing resources.</p>
              </div>
            </article>
          </div>

          <div class="card" style="display: flex; flex-direction: column; justify-content: space-between; gap: 16px;">
            <div class="mono" style="font-size: 11px; color: #D9541E; font-weight: 700; letter-spacing: 0.14em;" id="horizon-stage-label">
              STAGE 3 · SELF-EVOLVING
            </div>
            <div class="stage-pills">
              <button type="button" class="stage-pill-btn" data-stage-jump="1" aria-pressed="false">1. Predefined</button>
              <button type="button" class="stage-pill-btn" data-stage-jump="2" aria-pressed="false">2. Assisted</button>
              <button type="button" class="stage-pill-btn is-active" data-stage-jump="3" aria-pressed="true">3. Self-Evolving</button>
            </div>
            <input type="range" id="horizon-slider" class="scrubber-range" min="1" max="3" step="1" value="3" aria-label="System maturity stage" />

            <div>
              <div class="metric-list-row" style="border-color: rgba(243,238,227,0.16);">
                <span class="metric-list-num" id="meter-val-labor">92%</span>
                <span style="font-size: 13.5px; color: rgba(243,238,227,0.82);">Autonomous execution share</span>
              </div>
              <div class="metric-list-row" style="border-color: rgba(243,238,227,0.16);">
                <span class="metric-list-num" id="meter-val-capital">88%</span>
                <span style="font-size: 13.5px; color: rgba(243,238,227,0.82);">Productive capital shift</span>
              </div>
              <div class="metric-list-row" style="border-color: rgba(243,238,227,0.16);">
                <span class="metric-list-num" id="meter-val-time">95%</span>
                <span style="font-size: 13.5px; color: rgba(243,238,227,0.82);">Creation &amp; improvement velocity</span>
              </div>
              <div class="metric-list-row" style="border-bottom: 0; padding-bottom: 0;">
                <span class="metric-list-num" id="meter-val-compute">90%</span>
                <span style="font-size: 13.5px; color: rgba(243,238,227,0.82);">Intelligent compute utilization</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 04. GLOBAL NEED SPREAD -->
    <section class="band" id="global-need" data-section="global-need">
      <div class="container">
        <div class="section-header">
          <div class="eyebrow">
            <span class="eyebrow-dot"></span>
            <span>04 · Why the World Needs This · GLOBAL NEED</span>
          </div>
          <h2 class="section-h2">
            The Next Generation of Technology
            <span style="color: #D9541E;">Needs a New Kind of Intelligence.</span>
          </h2>
        </div>

        <div class="need-split">
          <div class="editorial-stack">
            <p>As the world becomes increasingly connected and automated, digital and physical systems are becoming more complex.</p>
            <p>Software, AI agents, robotics, factories, vehicles, energy networks, and infrastructure will need more than predefined instructions and constant human intervention.</p>
            <p>They will need intelligence that can understand their environment, make decisions, adapt to change, and continuously improve.</p>
            <div class="editorial-highlight" style="border: 1.5px solid #111111; box-shadow: 4px 4px 0 #D9541E;">
              Self-evolving intelligence will become a foundational capability of the future.
            </div>
          </div>

          <div class="card">
            <div class="eyebrow" style="margin-bottom: 12px;">
              <span class="eyebrow-dot"></span>
              <span>Connected Domains</span>
            </div>
${DOMAIN_BUTTONS}
            <div class="domain-output" style="border: 1.5px solid #111111;">
              <div class="mono" style="font-size: 11px; color: #D9541E; font-weight: 700; letter-spacing: 0.12em;" id="domain-tag">DOMAIN · SOFTWARE</div>
              <h4 id="domain-title" style="font-size: 18px; margin-top: 4px; margin-bottom: 12px;">Adaptive Software Ecosystems</h4>
              <div style="display: flex; flex-direction: column; gap: 10px;">
                <div style="padding: 12px 14px; border-radius: 4px; background: #FAF7F0; border: 1px solid rgba(17,17,17,0.2);">
                  <div style="font-size: 11px; font-weight: 700; color: #4A463F; text-transform: uppercase;">Where Predefined Rules Break</div>
                  <div id="domain-break" style="font-size: 13.5px; color: #111111; margin-top: 4px;">
                    Static exception handlers fail under cascading API drift, dependency latency, and unmodeled edge states.
                  </div>
                </div>
                <div style="padding: 12px 14px; border-radius: 4px; background: #FAF7F0; border: 1.5px solid #D9541E;">
                  <div style="font-size: 11px; font-weight: 700; color: #D9541E; text-transform: uppercase;">Fluxera Capability</div>
                  <div id="domain-sevol" style="font-size: 13.5px; color: #111111; font-weight: 600; margin-top: 4px;">
                    Understands runtime context, adapts execution paths on the fly, and hardens future decisions automatically.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 05. 4-COLUMN SWISS GRID SYSTEMS LOOP -->
    <section class="band" id="systems" data-section="systems">
      <div class="container">
        <div class="section-header">
          <div class="eyebrow">
            <span class="eyebrow-dot"></span>
            <span>05 · The Future of Systems</span>
          </div>
          <h2 class="section-h2">
            Systems That Think. Understand.
            <span style="color: #D9541E;">Learn. Adapt. Evolve.</span>
          </h2>
        </div>

        <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 12px;">
          <div style="display: inline-flex; align-items: center; gap: 8px; font-size: 12.5px; font-weight: 700; color: #111111;">
            <span class="pulse-dot" style="background: #D9541E; box-shadow: 0 0 10px rgba(217,84,30,0.45);"></span>
            <span id="loop-status-text">Fluxera · Continuous Loop Active</span>
          </div>
          <button type="button" class="loop-toggle-btn" id="loop-toggle-btn" style="background: #111111; color: #F3EEE3; border-color: #111111;">Pause Cycle</button>
        </div>

        <div class="man-swiss-4grid" id="loop-steps">
          <button type="button" class="loop-step is-active" data-step="0">
            <div class="mono" style="font-size: 11px; opacity: 0.82; margin-bottom: 6px;">01 · THINK</div>
            <div style="font-size: 15px; font-weight: 700;">Evaluate Intent &amp; State</div>
          </button>
          <button type="button" class="loop-step" data-step="1">
            <div class="mono" style="font-size: 11px; opacity: 0.82; margin-bottom: 6px;">02 · UNDERSTAND</div>
            <div style="font-size: 15px; font-weight: 700;">Map Surroundings</div>
          </button>
          <button type="button" class="loop-step" data-step="2">
            <div class="mono" style="font-size: 11px; opacity: 0.82; margin-bottom: 6px;">03 · ADAPT</div>
            <div style="font-size: 15px; font-weight: 700;">Re-Route &amp; Execute</div>
          </button>
          <button type="button" class="loop-step" data-step="3">
            <div class="mono" style="font-size: 11px; opacity: 0.82; margin-bottom: 6px;">04 · EVOLVE</div>
            <div style="font-size: 15px; font-weight: 700;">Retain Verified Learning</div>
          </button>
        </div>

        <div style="margin-top: 12px; padding: 18px 20px; border-radius: 4px; background: #111111; color: #F3EEE3; border: 1.5px solid #111111;">
          <div class="mono" style="font-size: 11px; color: #D9541E; margin-bottom: 6px;" id="loop-readout-code">
            CYCLE_STATE // 01 · THINK
          </div>
          <div style="font-size: 15px; color: #F3EEE3; line-height: 1.55;" id="loop-readout-desc">
            Evaluates objectives against current environment constraints before committing compute or physical actuation.
          </div>
        </div>
      </div>
    </section>

${CONTACT_SECTION}
  </main>

${SITE_FOOTER}`;
}

/* ==========================================================================
   FORMAT 7: DEEP BLUE + PURE WHITE — ARCHITECTURAL KEYNOTE BANDS
   ========================================================================== */
export function buildKeynoteHtml(meta) {
  return `${renderHead({ palette: meta.key, layout: 'keynote', title: meta.title, themeColor: meta.themeColor })}
<body>
${INTRO_OVERLAY}

  <header class="site-header" data-purpose="site-header">
    <div class="header-bar" style="border-color: rgba(9, 49, 141, 0.2);">
      <button type="button" class="brand-btn tactile-btn" id="header-replay-btn" title="Replay Fluxera logo animation">
        <span class="flux-logo-lens brand-emblem-sm">
          <span class="flux-logo-clip">
            <img src="./assets/fluxera-logo.jpg" alt="Fluxera" loading="eager" decoding="sync" />
          </span>
        </span>
        <span class="brand-text-wrap">
          <span class="brand-name">FLUXERA</span>
          <span class="brand-initiative">Autonomous Intelligence</span>
        </span>
      </button>

      <nav class="nav-links" aria-label="Primary sections">
        <a href="#vision">Vision</a>
        <a href="#changing">Changing</a>
        <a href="#global-need">Global Need</a>
        <a href="#systems">Systems</a>
        <a href="#contact">Partner</a>
      </nav>

      <div class="nav-actions">
        <a href="./dashboard.html" class="nav-signin tactile-btn">Platform ↗</a>
        <a href="#contact" class="btn-header-solid tactile-btn">Get in Touch</a>
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
    <!-- 01. FULL-BLEED DEEP BLUE KEYNOTE HERO + OVERLAPPING WHITE SPEC DECK -->
    <section class="band band-cobalt-hero" id="hero" data-section="hero">
      <div class="hero-centered">
        <button type="button" class="hero-crest-orb tactile-btn" id="hero-logo-crest" title="Click to play Fluxera orbital intro" aria-label="Fluxera circular emblem — click to replay orbital intro">
          <span class="hero-crest-orbit" aria-hidden="true"><span class="hero-crest-comet"></span></span>
          <span class="flux-logo-lens" style="width: 100%; height: 100%;">
            <span class="flux-logo-clip">
              <img src="./assets/fluxera-logo.jpg" alt="Fluxera" loading="eager" decoding="sync" fetchpriority="high" />
              <span class="crest-sheen" aria-hidden="true"></span>
            </span>
          </span>
        </button>

        <button type="button" class="hero-crest-caption tactile-btn" id="hero-replay-btn">
          <span>FLUXERA · Replay Intro Animation ↻</span>
        </button>

        <div class="hero-kicker-tag">TECHNOLOGY INITIATIVE · FLUXERA</div>

        <h1 class="hero-h1">
          Intelligence That Builds,
          <span style="opacity: 0.78;">Think and Evolve.</span>
        </h1>

        <p class="hero-sub" style="opacity: 0.92;">
          Building autonomous intelligence for the next generation of software and systems — enabling systems to think, understand, learn, adapt, and evolve.
        </p>

        <div class="hero-ctas">
          <a href="#vision" class="btn-pill-solid tactile-btn">
            <span>Explore Our Vision</span>
            <span aria-hidden="true">→</span>
          </a>
          <a href="#contact" class="btn-pill-secondary tactile-btn">
            <span>Become a Design Partner →</span>
          </a>
          <a href="./dashboard.html" class="btn-pill-secondary tactile-btn">
            <span>View Platform</span>
          </a>
        </div>
      </div>

      <div class="keynote-overlap-card">
        <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 14px;">
          <span class="row-badge" id="cog-badge">THINK</span>
          <div class="cog-tabs" id="hero-cog-tabs" role="tablist">
            <button type="button" class="cog-tab is-active" data-cog="think" role="tab" aria-selected="true">Think</button>
            <button type="button" class="cog-tab" data-cog="understand" role="tab" aria-selected="false">Understand</button>
            <button type="button" class="cog-tab" data-cog="learn" role="tab" aria-selected="false">Learn</button>
            <button type="button" class="cog-tab" data-cog="adapt" role="tab" aria-selected="false">Adapt</button>
            <button type="button" class="cog-tab" data-cog="evolve" role="tab" aria-selected="false">Evolve</button>
          </div>
        </div>
        <div style="padding: 16px 18px; border-radius: 16px; background: #F3F6FC; border: 1px solid rgba(9, 49, 141, 0.14);">
          <div style="font-size: 16px; font-weight: 700; color: #09318D; margin-bottom: 4px;" id="cog-title">01 · Systems That Think</div>
          <div style="font-size: 14px; color: #14377F;" id="cog-desc">
            Evaluates live operational state rather than blindly running fixed scripts when unexpected conditions occur.
          </div>
        </div>
      </div>
    </section>

    <!-- 02. PURE WHITE HORIZONTAL CONSOLE VISION -->
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

        <div class="telemetry-console-tabs" id="vision-capability-list">
          <button type="button" class="tier-btn is-active tactile-card" data-cap="understand">
            <span style="font-size: 11px; opacity: 0.8;" class="mono">01 · PERCEPTION</span>
            <span style="font-size: 15px; font-weight: 700;">Understands Context</span>
          </button>
          <button type="button" class="tier-btn tactile-card" data-cap="reasons">
            <span style="font-size: 11px; opacity: 0.8;" class="mono">02 · JUDGMENT</span>
            <span style="font-size: 15px; font-weight: 700;">Reasons Independently</span>
          </button>
          <button type="button" class="tier-btn tactile-card" data-cap="creates">
            <span style="font-size: 11px; opacity: 0.8;" class="mono">03 · SYNTHESIS</span>
            <span style="font-size: 15px; font-weight: 700;">Creates Solutions</span>
          </button>
          <button type="button" class="tier-btn tactile-card" data-cap="adapts">
            <span style="font-size: 11px; opacity: 0.8;" class="mono">04 · RESILIENCE</span>
            <span style="font-size: 15px; font-weight: 700;">Adapts in Motion</span>
          </button>
          <button type="button" class="tier-btn tactile-card" data-cap="evolves">
            <span style="font-size: 11px; opacity: 0.8;" class="mono">05 · COMPOUNDING</span>
            <span style="font-size: 15px; font-weight: 700;">Continuously Evolves</span>
          </button>
        </div>

        <div class="card">
          <h3 id="vision-cap-heading" style="font-size: 24px; margin-bottom: 10px;">Environmental &amp; System Understanding</h3>
          <p id="vision-cap-summary" style="color: var(--ink-muted); font-size: 15px; margin-bottom: 18px;">
            Instead of breaking whenever inputs stray from pre-programmed assumptions, intelligence reads real environment signals before acting.
          </p>
          <div class="vision-contrast-cards">
            <div class="contrast-col">
              <div class="mono" style="font-size: 10.5px; font-weight: 700; letter-spacing: 0.12em; color: var(--ink-muted); margin-bottom: 6px;">FIXED INSTRUCTIONS</div>
              <p id="vision-legacy-text" style="font-size: 14px; color: var(--ink-body); margin: 0;">
                Halts or throws unhandled errors when an environment variable, dependency, or edge case shifts.
              </p>
            </div>
            <div class="contrast-col is-sevol" style="background: #09318D; border-color: #09318D;">
              <div class="mono" style="font-size: 10.5px; font-weight: 700; letter-spacing: 0.12em; color: #FFFFFF; opacity: 0.82; margin-bottom: 6px;">FLUXERA</div>
              <p id="vision-sevol-text" style="font-size: 14px; color: #FFFFFF; font-weight: 500; margin: 0;">
                Continuously interprets system context, identifies root shifts, and restructures execution paths autonomously.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 03. COBALT CONTROLLER LEFT + 4 WIDE STACKED PURE WHITE ROWS RIGHT -->
    <section class="band" id="changing" data-section="changing" style="background: #F3F6FC;">
      <div class="container">
        <div class="section-header">
          <div class="eyebrow">
            <span class="eyebrow-dot"></span>
            <span>03 · What We're Changing</span>
          </div>
          <h2 class="section-h2">
            Reducing the resources required to
            <span class="heading-muted">build, operate, and evolve systems.</span>
          </h2>
        </div>

        <div class="changing-split">
          <div class="card-dark" style="background: #09318D; display: flex; flex-direction: column; justify-content: space-between; gap: 16px;">
            <div class="mono" style="font-size: 11px; letter-spacing: 0.14em; color: rgba(255,255,255,0.85);" id="horizon-stage-label">
              STAGE 3 · SELF-EVOLVING
            </div>
            <div class="stage-pills" style="background: rgba(255,255,255,0.12); border-color: rgba(255,255,255,0.22);">
              <button type="button" class="stage-pill-btn" data-stage-jump="1" aria-pressed="false" style="color: #fff;">Predefined</button>
              <button type="button" class="stage-pill-btn" data-stage-jump="2" aria-pressed="false" style="color: #fff;">Assisted</button>
              <button type="button" class="stage-pill-btn is-active" data-stage-jump="3" aria-pressed="true" style="background: #FFFFFF; color: #09318D;">Self-Evolving</button>
            </div>
            <input type="range" id="horizon-slider" class="scrubber-range" min="1" max="3" step="1" value="3" aria-label="System maturity stage" style="accent-color: #FFFFFF;" />

            <div>
              <div class="metric-list-row" style="border-color: rgba(255,255,255,0.18);">
                <span class="metric-list-num" style="color: #FFFFFF;" id="meter-val-labor">92%</span>
                <span style="font-size: 13.5px; color: rgba(255,255,255,0.84);">Autonomous execution share</span>
              </div>
              <div class="metric-list-row" style="border-color: rgba(255,255,255,0.18);">
                <span class="metric-list-num" style="color: #FFFFFF;" id="meter-val-capital">88%</span>
                <span style="font-size: 13.5px; color: rgba(255,255,255,0.84);">Productive capital shift</span>
              </div>
              <div class="metric-list-row" style="border-color: rgba(255,255,255,0.18);">
                <span class="metric-list-num" style="color: #FFFFFF;" id="meter-val-time">95%</span>
                <span style="font-size: 13.5px; color: rgba(255,255,255,0.84);">Creation &amp; improvement velocity</span>
              </div>
              <div class="metric-list-row" style="border-bottom: 0; padding-bottom: 0;">
                <span class="metric-list-num" style="color: #FFFFFF;" id="meter-val-compute">90%</span>
                <span style="font-size: 13.5px; color: rgba(255,255,255,0.84);">Intelligent compute utilization</span>
              </div>
            </div>
          </div>

          <div class="keynote-wide-stack">
            <div class="keynote-wide-row">
              <div class="resource-icon-chip mono" style="background: #09318D; color: #FFFFFF;">01</div>
              <div>
                <h3 style="font-size: 19px; margin-bottom: 4px;">Engineering &amp; Labor</h3>
                <p style="font-size: 14px; color: var(--ink-muted); margin: 0;">Less repetitive human work. More autonomous execution.</p>
              </div>
            </div>
            <div class="keynote-wide-row">
              <div class="resource-icon-chip mono" style="background: #09318D; color: #FFFFFF;">02</div>
              <div>
                <h3 style="font-size: 19px; margin-bottom: 4px;">Capital</h3>
                <p style="font-size: 14px; color: var(--ink-muted); margin: 0;">Less operational overhead. More productive investment.</p>
              </div>
            </div>
            <div class="keynote-wide-row">
              <div class="resource-icon-chip mono" style="background: #09318D; color: #FFFFFF;">03</div>
              <div>
                <h3 style="font-size: 19px; margin-bottom: 4px;">Time</h3>
                <p style="font-size: 14px; color: var(--ink-muted); margin: 0;">Faster creation, execution, and improvement.</p>
              </div>
            </div>
            <div class="keynote-wide-row">
              <div class="resource-icon-chip mono" style="background: #09318D; color: #FFFFFF;">04</div>
              <div>
                <h3 style="font-size: 19px; margin-bottom: 4px;">Compute</h3>
                <p style="font-size: 14px; color: var(--ink-muted); margin: 0;">More intelligent utilization of AI and computing resources.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 04. FULL-BLEED DEEP BLUE GLOBAL NEED BAND -->
    <section class="band band-cobalt-section" id="global-need" data-section="global-need">
      <div class="container">
        <div class="section-header">
          <div class="eyebrow">
            <span class="eyebrow-dot"></span>
            <span>04 · Why the World Needs This · GLOBAL NEED</span>
          </div>
          <h2 class="section-h2">
            The Next Generation of Technology
            <span class="heading-muted">Needs a New Kind of Intelligence.</span>
          </h2>
        </div>

        <div class="need-split">
          <div class="card">
            <div class="eyebrow" style="margin-bottom: 12px; background: rgba(9,49,141,0.1); color: #09318D;">
              <span class="eyebrow-dot"></span>
              <span>Connected Domains</span>
            </div>
${DOMAIN_BUTTONS}
            <div class="domain-output" style="background: #F3F6FC;">
              <div class="mono" style="font-size: 11px; color: #09318D; font-weight: 700; letter-spacing: 0.12em;" id="domain-tag">DOMAIN · SOFTWARE</div>
              <h4 id="domain-title" style="font-size: 18px; color: #09318D; margin-top: 4px; margin-bottom: 12px;">Adaptive Software Ecosystems</h4>
              <div style="display: flex; flex-direction: column; gap: 10px;">
                <div style="padding: 12px 14px; border-radius: 14px; background: #FFFFFF; border: 1px solid rgba(9,49,141,0.15);">
                  <div style="font-size: 11px; font-weight: 700; color: #456099; text-transform: uppercase;">Where Predefined Rules Break</div>
                  <div id="domain-break" style="font-size: 13.5px; color: #14377F; margin-top: 4px;">
                    Static exception handlers fail under cascading API drift, dependency latency, and unmodeled edge states.
                  </div>
                </div>
                <div style="padding: 12px 14px; border-radius: 14px; background: #09318D; color: #FFFFFF;">
                  <div style="font-size: 11px; font-weight: 700; color: rgba(255,255,255,0.82); text-transform: uppercase;">Fluxera Capability</div>
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
            <div class="editorial-highlight">
              Self-evolving intelligence will become a foundational capability of the future.
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 05. PURE WHITE SYSTEMS BAND WITH DEEP BLUE LOOP ENGINE -->
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
        </div>

        <div class="card-dark" style="background: #09318D;">
          <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 12px;">
            <div style="display: inline-flex; align-items: center; gap: 8px; font-size: 12.5px; font-weight: 600;">
              <span class="pulse-dot"></span>
              <span id="loop-status-text">Fluxera · Continuous Loop Active</span>
            </div>
            <button type="button" class="loop-toggle-btn" id="loop-toggle-btn">Pause Cycle</button>
          </div>

          <div class="telemetry-loop-grid" id="loop-steps">
            <button type="button" class="loop-step is-active" data-step="0">
              <div class="mono" style="font-size: 11px; opacity: 0.84; margin-bottom: 6px;">01 · THINK</div>
              <div style="font-size: 15px; font-weight: 600;">Evaluate Intent &amp; State</div>
            </button>
            <button type="button" class="loop-step" data-step="1">
              <div class="mono" style="font-size: 11px; opacity: 0.84; margin-bottom: 6px;">02 · UNDERSTAND</div>
              <div style="font-size: 15px; font-weight: 600;">Map Surroundings</div>
            </button>
            <button type="button" class="loop-step" data-step="2">
              <div class="mono" style="font-size: 11px; opacity: 0.84; margin-bottom: 6px;">03 · ADAPT</div>
              <div style="font-size: 15px; font-weight: 600;">Re-Route &amp; Execute</div>
            </button>
            <button type="button" class="loop-step" data-step="3">
              <div class="mono" style="font-size: 11px; opacity: 0.84; margin-bottom: 6px;">04 · EVOLVE</div>
              <div style="font-size: 15px; font-weight: 600;">Retain Verified Learning</div>
            </button>
          </div>

          <div style="padding: 16px 20px; border-radius: 16px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.22);">
            <div class="mono" style="font-size: 11px; opacity: 0.9; margin-bottom: 6px;" id="loop-readout-code">
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
   FORMAT 8: MIDNIGHT BLACK + ELECTRIC BLUE — CYBERNETIC VOID & CONDUIT
   ========================================================================== */
export function buildCyberneticHtml(meta) {
  return `${renderHead({ palette: meta.key, layout: 'cybernetic', title: meta.title, themeColor: meta.themeColor })}
<body>
  <div class="top-read-track" aria-hidden="true"><div class="top-read-fill" id="top-read-progress"></div></div>
${INTRO_OVERLAY}

  <header class="site-header" data-purpose="site-header">
    <div class="header-bar" style="border-color: rgba(2, 151, 222, 0.36); background: rgba(2, 7, 10, 0.84);">
      <button type="button" class="brand-btn tactile-btn" id="header-replay-btn" title="Replay Fluxera logo animation">
        <span class="flux-logo-lens brand-emblem-sm">
          <span class="flux-logo-clip">
            <img src="./assets/fluxera-logo.jpg" alt="Fluxera" loading="eager" decoding="sync" />
          </span>
        </span>
        <span class="brand-text-wrap">
          <span class="brand-name">FLUXERA</span>
          <span class="brand-initiative">Autonomous Runtime</span>
        </span>
      </button>

      <nav class="nav-links" aria-label="Primary sections">
        <a href="#vision">Vision</a>
        <a href="#changing">Resources</a>
        <a href="#global-need">Domains</a>
        <a href="#systems">Loop</a>
        <a href="#contact">Partner</a>
      </nav>

      <div class="nav-actions">
        <a href="./dashboard.html" class="nav-signin tactile-btn">Platform ↗</a>
        <a href="#contact" class="btn-header-solid tactile-btn">Get in Touch</a>
        <button type="button" class="compact-menu-btn tactile-btn" id="sevol-menu-toggle" aria-label="Open menu" aria-expanded="false">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
      </div>
    </div>
  </header>

${MOBILE_DRAWER}

  <!-- RIGHT-EDGE DOT SPINE NAVIGATION -->
  <nav class="right-dot-spine" aria-label="Section telemetry dots">
    <a href="#hero" data-chapter="hero" data-index="1" class="is-active"><span>01 CORE</span><span class="dot-pip"></span></a>
    <a href="#vision" data-chapter="vision" data-index="2"><span>02 VISION</span><span class="dot-pip"></span></a>
    <a href="#changing" data-chapter="changing" data-index="3"><span>03 IMPACT</span><span class="dot-pip"></span></a>
    <a href="#global-need" data-chapter="global-need" data-index="4"><span>04 NEED</span><span class="dot-pip"></span></a>
    <a href="#systems" data-chapter="systems" data-index="5"><span>05 LOOP</span><span class="dot-pip"></span></a>
    <a href="#contact" data-chapter="contact" data-index="6"><span>06 PARTNER</span><span class="dot-pip"></span></a>
  </nav>

  <main class="page-main">
    <!-- 01. CYBERNETIC SPLIT HORIZON HERO + VERTICAL TIMELINE CONDUIT -->
    <section class="band band-hero" id="hero" data-section="hero">
      <div class="cyber-hero-split">
        <div style="display: flex; flex-direction: column; align-items: flex-start; gap: 20px;">
          <div class="eyebrow">
            <span class="eyebrow-dot"></span>
            <span>FLUXERA TECHNOLOGY INITIATIVE</span>
          </div>

          <h1 class="hero-h1" style="text-align: left; font-size: clamp(36px, 5.6vw, 74px); max-width: 13ch;">
            Intelligence That Builds,
            <span style="color: #0297DE;">Think and Evolve.</span>
          </h1>

          <p class="hero-sub" style="text-align: left;">
            Building autonomous intelligence for the next generation of software and systems — intelligence that understands, adapts, and evolves without depending on fixed scripts.
          </p>

          <div class="hero-ctas" style="justify-content: flex-start;">
            <a href="#vision" class="btn-pill-solid tactile-btn">
              <span>Explore Our Vision</span>
              <span aria-hidden="true">→</span>
            </a>
            <a href="#contact" class="btn-pill-secondary tactile-btn">
              <span>Become a Design Partner</span>
            </a>
            <a href="./vision.html" class="btn-pill-secondary tactile-btn">
              <span>Architecture ↗</span>
            </a>
          </div>
        </div>

        <div class="cyber-void-panel">
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 10px;">
            <span class="mono" style="font-size: 11px; color: #3CC3FF;">FLUXERA // VOID_CHAMBER</span>
            <button type="button" class="loop-toggle-btn" id="hero-replay-btn">Replay Intro ↻</button>
          </div>

          <div style="display: flex; justify-content: center;">
            <button type="button" class="hero-crest-orb tactile-btn" id="hero-logo-crest" title="Click to play Fluxera orbital intro" aria-label="Fluxera circular emblem — click to replay orbital intro">
              <span class="hero-crest-orbit" aria-hidden="true"><span class="hero-crest-comet"></span></span>
              <span class="flux-logo-lens" style="width: 100%; height: 100%;">
                <span class="flux-logo-clip">
                  <img src="./assets/fluxera-logo.jpg" alt="Fluxera" loading="eager" decoding="sync" fetchpriority="high" />
                  <span class="crest-sheen" aria-hidden="true"></span>
                </span>
              </span>
            </button>
          </div>

          <div class="cog-tabs cyber-conduit-list" id="hero-cog-tabs" role="tablist" style="background: transparent; border-radius: 0; padding: 0 0 0 14px;">
            <button type="button" class="cog-tab is-active" data-cog="think" role="tab" aria-selected="true">01 · Think</button>
            <button type="button" class="cog-tab" data-cog="understand" role="tab" aria-selected="false">02 · Understand</button>
            <button type="button" class="cog-tab" data-cog="learn" role="tab" aria-selected="false">03 · Learn</button>
            <button type="button" class="cog-tab" data-cog="adapt" role="tab" aria-selected="false">04 · Adapt</button>
            <button type="button" class="cog-tab" data-cog="evolve" role="tab" aria-selected="false">05 · Evolve</button>
          </div>

          <div style="padding: 14px 16px; border-radius: 12px; background: rgba(2, 7, 10, 0.85); border: 1px solid rgba(2, 151, 222, 0.34);">
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 6px;">
              <span class="row-badge" id="cog-badge">THINK</span>
              <span style="font-size: 14.5px; font-weight: 700; color: #FFFFFF;" id="cog-title">01 · Systems That Think</span>
            </div>
            <p style="margin: 0; font-size: 13px; color: #CDE9F7; line-height: 1.5;" id="cog-desc">
              Evaluates live operational state rather than blindly running fixed scripts when unexpected conditions occur.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 02. VISION CAPABILITY DECK -->
    <section class="band" id="vision" data-section="vision">
      <div class="container">
        <div class="section-header">
          <div class="eyebrow">
            <span class="eyebrow-dot"></span>
            <span>02 · What We're Building · OUR VISION</span>
          </div>
          <h2 class="section-h2">
            We're Building the Self-Thinking,
            <span style="color: #0297DE;">Self-Learning, and Evolving Future.</span>
          </h2>
          <p class="section-lead">
            A future where intelligence doesn't just follow instructions. It understands, reasons, creates, adapts, and continuously evolves.
          </p>
        </div>

        <div class="vision-grid">
          <div class="tier-stack" id="vision-capability-list">
            <button type="button" class="tier-btn is-active tactile-card" data-cap="understand">
              <span class="tier-dot"></span>
              <span style="font-size: 16px; font-weight: 600; flex: 1;">01 · Understands Context</span>
              <span class="mono" style="font-size: 11px;">Perception</span>
            </button>
            <button type="button" class="tier-btn tactile-card" data-cap="reasons">
              <span class="tier-dot"></span>
              <span style="font-size: 16px; font-weight: 600; flex: 1;">02 · Reasons Independently</span>
              <span class="mono" style="font-size: 11px;">Judgment</span>
            </button>
            <button type="button" class="tier-btn tactile-card" data-cap="creates">
              <span class="tier-dot"></span>
              <span style="font-size: 16px; font-weight: 600; flex: 1;">03 · Creates Solutions</span>
              <span class="mono" style="font-size: 11px;">Synthesis</span>
            </button>
            <button type="button" class="tier-btn tactile-card" data-cap="adapts">
              <span class="tier-dot"></span>
              <span style="font-size: 16px; font-weight: 600; flex: 1;">04 · Adapts in Motion</span>
              <span class="mono" style="font-size: 11px;">Resilience</span>
            </button>
            <button type="button" class="tier-btn tactile-card" data-cap="evolves">
              <span class="tier-dot"></span>
              <span style="font-size: 16px; font-weight: 600; flex: 1;">05 · Continuously Evolves</span>
              <span class="mono" style="font-size: 11px;">Compounding</span>
            </button>
          </div>

          <div class="card">
            <h3 id="vision-cap-heading" style="font-size: 24px; margin-bottom: 10px;">Environmental &amp; System Understanding</h3>
            <p id="vision-cap-summary" style="color: var(--ink-muted); font-size: 15px; margin-bottom: 18px;">
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
                <div class="mono" style="font-size: 10.5px; font-weight: 700; letter-spacing: 0.12em; color: #3CC3FF; margin-bottom: 6px;">FLUXERA</div>
                <p id="vision-sevol-text" style="font-size: 13.5px; color: #FFFFFF; font-weight: 500; margin: 0;">
                  Continuously interprets system context, identifies root shifts, and restructures execution paths autonomously.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 03. TELEMETRY GAUGES TOP + 1PX HAIRLINE SEAM-GRID BELOW -->
    <section class="band" id="changing" data-section="changing">
      <div class="container">
        <div class="section-header">
          <div class="eyebrow">
            <span class="eyebrow-dot"></span>
            <span>03 · What We're Changing</span>
          </div>
          <h2 class="section-h2">
            Reducing the resources required to
            <span style="color: #0297DE;">build, operate, and evolve systems.</span>
          </h2>
        </div>

        <div class="card telemetry-meter-deck">
          <div style="display: flex; flex-direction: column; gap: 14px;">
            <div class="mono" style="font-size: 11px; color: #3CC3FF; font-weight: 700; letter-spacing: 0.14em;" id="horizon-stage-label">
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
                <span style="font-size: 13.5px; color: #CDE9F7;">Autonomous execution share</span>
                <span class="metric-list-num mono" style="font-size: 20px; min-width: auto;" id="meter-val-labor">92%</span>
              </div>
              <div class="meter-track"><div class="meter-fill" id="meter-bar-labor" style="width: 92%;"></div></div>
            </div>
            <div class="meter-row-with-bar">
              <div class="meter-row-head">
                <span style="font-size: 13.5px; color: #CDE9F7;">Productive capital shift</span>
                <span class="metric-list-num mono" style="font-size: 20px; min-width: auto;" id="meter-val-capital">88%</span>
              </div>
              <div class="meter-track"><div class="meter-fill" id="meter-bar-capital" style="width: 88%;"></div></div>
            </div>
            <div class="meter-row-with-bar">
              <div class="meter-row-head">
                <span style="font-size: 13.5px; color: #CDE9F7;">Creation &amp; improvement velocity</span>
                <span class="metric-list-num mono" style="font-size: 20px; min-width: auto;" id="meter-val-time">95%</span>
              </div>
              <div class="meter-track"><div class="meter-fill" id="meter-bar-time" style="width: 95%;"></div></div>
            </div>
            <div class="meter-row-with-bar">
              <div class="meter-row-head">
                <span style="font-size: 13.5px; color: #CDE9F7;">Intelligent compute utilization</span>
                <span class="metric-list-num mono" style="font-size: 20px; min-width: auto;" id="meter-val-compute">90%</span>
              </div>
              <div class="meter-track"><div class="meter-fill" id="meter-bar-compute" style="width: 90%;"></div></div>
            </div>
          </div>
        </div>

        <div class="cyber-seam-grid">
          <article class="cyber-seam-cell">
            <div class="resource-icon-chip mono">01</div>
            <div>
              <h3 style="font-size: 18px; margin-bottom: 6px;">Engineering &amp; Labor</h3>
              <p style="font-size: 13.5px; color: var(--ink-muted); margin: 0;">Less repetitive human work. More autonomous execution.</p>
            </div>
          </article>
          <article class="cyber-seam-cell">
            <div class="resource-icon-chip mono">02</div>
            <div>
              <h3 style="font-size: 18px; margin-bottom: 6px;">Capital</h3>
              <p style="font-size: 13.5px; color: var(--ink-muted); margin: 0;">Less operational overhead. More productive investment.</p>
            </div>
          </article>
          <article class="cyber-seam-cell">
            <div class="resource-icon-chip mono">03</div>
            <div>
              <h3 style="font-size: 18px; margin-bottom: 6px;">Time</h3>
              <p style="font-size: 13.5px; color: var(--ink-muted); margin: 0;">Faster creation, execution, and improvement.</p>
            </div>
          </article>
          <article class="cyber-seam-cell" style="background: rgba(2, 151, 222, 0.12);">
            <div class="resource-icon-chip mono" style="background: #0297DE; color: #FFFFFF;">04</div>
            <div>
              <h3 style="font-size: 18px; margin-bottom: 6px;">Compute</h3>
              <p style="font-size: 13.5px; color: #CDE9F7; margin: 0;">More intelligent utilization of AI and computing resources.</p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- 04. GLOBAL NEED TERMINAL SPLIT -->
    <section class="band" id="global-need" data-section="global-need">
      <div class="container">
        <div class="section-header">
          <div class="eyebrow">
            <span class="eyebrow-dot"></span>
            <span>04 · Why the World Needs This · GLOBAL NEED</span>
          </div>
          <h2 class="section-h2">
            The Next Generation of Technology
            <span style="color: #0297DE;">Needs a New Kind of Intelligence.</span>
          </h2>
        </div>

        <div class="need-split">
          <div class="editorial-stack">
            <p>As the world becomes increasingly connected and automated, digital and physical systems are becoming more complex.</p>
            <p>Software, AI agents, robotics, factories, vehicles, energy networks, and infrastructure will need more than predefined instructions and constant human intervention.</p>
            <p>They will need intelligence that can understand their environment, make decisions, adapt to change, and continuously improve.</p>
            <div class="editorial-highlight" style="border-color: #0297DE;">
              Self-evolving intelligence will become a foundational capability of the future.
            </div>
          </div>

          <div class="card">
            <div class="eyebrow" style="margin-bottom: 12px;">
              <span class="eyebrow-dot"></span>
              <span>Connected Domains</span>
            </div>
${DOMAIN_BUTTONS}
            <div class="domain-output">
              <div class="mono" style="font-size: 11px; color: #3CC3FF; font-weight: 700; letter-spacing: 0.12em;" id="domain-tag">DOMAIN · SOFTWARE</div>
              <h4 id="domain-title" style="font-size: 18px; margin-top: 4px; margin-bottom: 12px;">Adaptive Software Ecosystems</h4>
              <div style="display: flex; flex-direction: column; gap: 10px;">
                <div style="padding: 12px 14px; border-radius: 12px; background: #02070A; border: 1px solid rgba(2,151,222,0.2);">
                  <div style="font-size: 11px; font-weight: 700; color: #8DBAD2; text-transform: uppercase;">Where Predefined Rules Break</div>
                  <div id="domain-break" style="font-size: 13.5px; color: #CDE9F7; margin-top: 4px;">
                    Static exception handlers fail under cascading API drift, dependency latency, and unmodeled edge states.
                  </div>
                </div>
                <div style="padding: 12px 14px; border-radius: 12px; background: rgba(2,151,222,0.14); border: 1px solid #0297DE;">
                  <div style="font-size: 11px; font-weight: 700; color: #3CC3FF; text-transform: uppercase;">Fluxera Capability</div>
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

    <!-- 05. NEON LOOP DECK -->
    <section class="band" id="systems" data-section="systems">
      <div class="container">
        <div class="section-header">
          <div class="eyebrow">
            <span class="eyebrow-dot"></span>
            <span>05 · The Future of Systems</span>
          </div>
          <h2 class="section-h2">
            Systems That Think. Understand.
            <span style="color: #0297DE;">Learn. Adapt. Evolve.</span>
          </h2>
        </div>

        <div class="card-dark" style="border-color: rgba(2, 151, 222, 0.42);">
          <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 12px;">
            <div style="display: inline-flex; align-items: center; gap: 8px; font-size: 12.5px; font-weight: 600;">
              <span class="pulse-dot"></span>
              <span id="loop-status-text">Fluxera · Continuous Loop Active</span>
            </div>
            <button type="button" class="loop-toggle-btn" id="loop-toggle-btn">Pause Cycle</button>
          </div>

          <div class="loop-steps" id="loop-steps">
            <button type="button" class="loop-step is-active" data-step="0">
              <div class="mono" style="font-size: 11px; color: #3CC3FF; margin-bottom: 4px;">01 · THINK</div>
              <div style="font-size: 14px; font-weight: 600;">Evaluate Intent &amp; State</div>
            </button>
            <button type="button" class="loop-step" data-step="1">
              <div class="mono" style="font-size: 11px; color: #3CC3FF; margin-bottom: 4px;">02 · UNDERSTAND</div>
              <div style="font-size: 14px; font-weight: 600;">Map Surroundings</div>
            </button>
            <button type="button" class="loop-step" data-step="2">
              <div class="mono" style="font-size: 11px; color: #3CC3FF; margin-bottom: 4px;">03 · ADAPT</div>
              <div style="font-size: 14px; font-weight: 600;">Re-Route &amp; Execute</div>
            </button>
            <button type="button" class="loop-step" data-step="3">
              <div class="mono" style="font-size: 11px; color: #3CC3FF; margin-bottom: 4px;">04 · EVOLVE</div>
              <div style="font-size: 14px; font-weight: 600;">Retain Verified Learning</div>
            </button>
          </div>

          <div style="padding: 16px 18px; border-radius: 14px; background: #02070A; border: 1px solid rgba(2, 151, 222, 0.34);">
            <div class="mono" style="font-size: 11px; color: #3CC3FF; margin-bottom: 6px;" id="loop-readout-code">
              CYCLE_STATE // 01 · THINK
            </div>
            <div style="font-size: 14px; color: #F2FAFF; line-height: 1.5;" id="loop-readout-desc">
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

