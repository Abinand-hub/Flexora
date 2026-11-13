/**
 * Fluxera — Interactive Editorial, Orbital Logo & 4-Palette Preview System
 */

const PALETTES = {
  'emerald-diamond': {
    route: './index.html',
    label: 'Emerald + White + Diamond',
    identity: 'Evolution • Growth • Sophistication',
    bestFor: 'Continuous evolution, autonomous operations and premium branding.',
    hex: '#10B981 · #087A55 · #FFFFFF · #E8F1EF · #B8F0D5 · #123D32',
    themeColor: '#E8F1EF',
  },
  'midnight-electric': {
    route: './palette-8.html',
    label: 'Midnight Black & Electric Blue',
    identity: 'Cybernetic • High-Voltage • Vector Dark',
    bestFor: 'Next-gen autonomous runtimes and neural infrastructure.',
    hex: '#02070A · #0297DE',
    themeColor: '#02070A',
  },
};

const PARTNER_EMAIL = 'ceo@getfluxera.com';

/* --------------------------------------------------------------------------
   1. ORBITAL LOGO ANIMATION (#fluxera-intro)
   -------------------------------------------------------------------------- */
function initLogoIntro() {
  const overlay = document.getElementById('fluxera-intro');
  if (!overlay) return;

  const orb = document.getElementById('li-orb');
  const glow = document.getElementById('li-glow');
  const orbit = document.getElementById('li-orbit');
  const sphere = document.getElementById('li-sphere');
  const emblemImg = document.getElementById('li-emblem-img') || overlay.querySelector('.li-emblem-img');
  const sheen = document.getElementById('li-sheen-bar');
  const halo = document.getElementById('li-ping-halo');
  const ring = document.getElementById('li-ping-ring');
  const sub = document.getElementById('li-sub');
  const letters = Array.from(overlay.querySelectorAll('.li-l > span'));
  const skipBtn = document.getElementById('li-skip-btn');

  let activeAnims = [];
  let dismissTimer = null;
  let isClosing = false;

  const clearScheduled = () => {
    if (dismissTimer) {
      clearTimeout(dismissTimer);
      dismissTimer = null;
    }
    activeAnims.forEach((anim) => {
      try {
        anim.cancel();
      } catch (_) {}
    });
    activeAnims = [];
  };

  const finishIntro = () => {
    if (isClosing) return;
    isClosing = true;
    clearScheduled();
    overlay.classList.add('is-done');
    document.body.style.overflow = '';
  };

  const waitForLogoDecode = () => {
    if (!emblemImg) return Promise.resolve();
    const readyPromise =
      emblemImg.complete && emblemImg.naturalWidth > 0
        ? typeof emblemImg.decode === 'function'
          ? emblemImg.decode().catch(() => {})
          : Promise.resolve()
        : new Promise((resolve) => {
            emblemImg.addEventListener('load', resolve, { once: true });
            emblemImg.addEventListener('error', resolve, { once: true });
          });

    return Promise.race([
      readyPromise,
      new Promise((resolve) => setTimeout(resolve, 650)),
    ]);
  };

  const runTimeline = () => {
    clearScheduled();
    if (isClosing) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      if (sphere) sphere.style.opacity = '1';
      dismissTimer = setTimeout(finishIntro, 450);
      return;
    }

    const easeOut = 'cubic-bezier(0.22, 1, 0.36, 1)';
    const track = (el, keyframes, options) => {
      if (!el || typeof el.animate !== 'function') return;
      activeAnims.push(el.animate(keyframes, { fill: 'forwards', ...options }));
    };

    track(
      orb,
      [
        { transform: 'scale(0.86)' },
        { transform: 'scale(1)' },
      ],
      { duration: 900, easing: easeOut }
    );

    track(
      glow,
      [
        { opacity: 0, transform: 'scale(0.8)' },
        { opacity: 1, transform: 'scale(1.06)', offset: 0.55 },
        { opacity: 0.72, transform: 'scale(1)' },
      ],
      { duration: 1100, easing: easeOut }
    );

    track(
      orbit,
      [
        { opacity: 0, transform: 'rotate(-240deg)' },
        { opacity: 1, offset: 0.14 },
        { opacity: 1, transform: 'rotate(70deg)', offset: 0.75 },
        { opacity: 0.25, transform: 'rotate(135deg)' },
      ],
      { duration: 1200, easing: easeOut }
    );

    track(
      sphere,
      [
        { opacity: 0, transform: 'scale(0.88)' },
        { opacity: 1, transform: 'scale(1)' },
      ],
      { duration: 680, delay: 140, easing: easeOut }
    );

    track(
      sheen,
      [
        { opacity: 0, left: '-65%' },
        { opacity: 0.9, offset: 0.22 },
        { opacity: 0.85, left: '135%', offset: 0.85 },
        { opacity: 0, left: '145%' },
      ],
      { duration: 750, delay: 420, easing: 'ease-in-out' }
    );

    track(
      halo,
      [
        { opacity: 0, transform: 'scale(0.9)' },
        { opacity: 0.75, transform: 'scale(1.55)', offset: 0.35 },
        { opacity: 0, transform: 'scale(2.4)' },
      ],
      { duration: 950, delay: 560, easing: easeOut }
    );

    track(
      ring,
      [
        { opacity: 0.85, transform: 'scale(0.9)' },
        { opacity: 0, transform: 'scale(3.4)' },
      ],
      { duration: 950, delay: 560, easing: easeOut }
    );

    letters.forEach((span, idx) => {
      track(
        span,
        [
          { transform: 'translateY(110%)' },
          { transform: 'translateY(0%)' },
        ],
        { duration: 420, delay: 420 + idx * 36, easing: easeOut }
      );
    });

    track(
      sub,
      [
        { opacity: 0, transform: 'translateY(8px)' },
        { opacity: 1, transform: 'translateY(0)' },
      ],
      { duration: 450, delay: 720, easing: easeOut }
    );

    dismissTimer = setTimeout(finishIntro, 2150);
  };

  const playIntro = () => {
    clearScheduled();
    isClosing = false;
    overlay.classList.remove('is-done');
    waitForLogoDecode().then(runTimeline);
  };

  if (skipBtn) skipBtn.addEventListener('click', finishIntro);
  overlay.addEventListener('click', finishIntro);
  window.addEventListener('keydown', () => {
    if (!overlay.classList.contains('is-done')) finishIntro();
  });

  ['header-replay-btn', 'hero-logo-crest', 'hero-replay-btn', 'drawer-replay-btn'].forEach((id) => {
    const btn = document.getElementById(id);
    if (btn) {
      btn.addEventListener('click', () => {
        const drawer = document.getElementById('sevol-mobile-drawer');
        if (drawer) drawer.classList.add('hidden');
        playIntro();
      });
    }
  });

  playIntro();
}

/* --------------------------------------------------------------------------
   2. DEDICATED PALETTE RESOLUTION (4 PREVIEW ROUTES & ?palette= PARAM)
   -------------------------------------------------------------------------- */
function initPaletteSwitcher() {
  const storageKey = 'fluxera_sevol_palette';
  const metaTheme = document.getElementById('meta-theme-color');

  const applyPalette = (key, persist = true) => {
    const resolved = PALETTES[key] ? key : 'arctic-blue';
    const meta = PALETTES[resolved];
    document.documentElement.setAttribute('data-palette', resolved);
    if (persist) {
      localStorage.setItem(storageKey, resolved);
    }
    if (metaTheme) metaTheme.setAttribute('content', meta.themeColor);
  };

  const urlPalette = new URLSearchParams(window.location.search).get('palette');
  const attrPalette = document.documentElement.getAttribute('data-palette');

  let initialPalette = 'emerald-diamond';
  if (urlPalette && PALETTES[urlPalette]) {
    initialPalette = urlPalette;
  } else if (attrPalette && PALETTES[attrPalette]) {
    initialPalette = attrPalette;
  }

  applyPalette(initialPalette, false);
}

/* --------------------------------------------------------------------------
   3. CHAPTER SPINE + NAVIGATION + MOBILE DRAWER
   -------------------------------------------------------------------------- */
function initNavigation() {
  const toggleBtn = document.getElementById('sevol-menu-toggle');
  const drawer = document.getElementById('sevol-mobile-drawer');

  if (toggleBtn && drawer) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const hidden = drawer.classList.toggle('hidden');
      toggleBtn.setAttribute('aria-expanded', String(!hidden));
    });

    drawer.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        drawer.classList.add('hidden');
        toggleBtn.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('click', (e) => {
      if (!drawer.contains(e.target) && !toggleBtn.contains(e.target)) {
        drawer.classList.add('hidden');
        toggleBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  const spineLinks = Array.from(document.querySelectorAll('[data-spine] a[data-chapter]'));
  const dockLinks = Array.from(document.querySelectorAll('.pill-dock-nav a[data-chapter], .right-dot-spine a[data-chapter]'));
  const spineProgress = document.getElementById('spine-progress');
  const topProgress = document.getElementById('top-read-progress');
  const navLinks = Array.from(document.querySelectorAll('.nav-links a[href^="#"]'));
  const sections = Array.from(document.querySelectorAll('section[data-section]'));

  if (!sections.length || typeof IntersectionObserver === 'undefined') return;

  const setActiveChapter = (id) => {
    let activeIdx = 1;
    spineLinks.forEach((link) => {
      const active = link.getAttribute('data-chapter') === id;
      link.classList.toggle('is-active', active);
      if (active) activeIdx = Number(link.getAttribute('data-index')) || 1;
    });
    dockLinks.forEach((link) => {
      const active = link.getAttribute('data-chapter') === id;
      link.classList.toggle('is-active', active);
      if (active) activeIdx = Number(link.getAttribute('data-index')) || activeIdx;
    });
    const ratio = Math.min(1, activeIdx / 6);
    if (spineProgress) {
      spineProgress.style.transform = `scaleY(${ratio.toFixed(3)})`;
    }
    if (topProgress) {
      topProgress.style.width = `${Math.round(ratio * 100)}%`;
    }
    navLinks.forEach((link) => {
      link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveChapter(entry.target.getAttribute('data-section'));
        }
      });
    },
    { rootMargin: '-32% 0px -48% 0px', threshold: 0.01 }
  );

  sections.forEach((sec) => observer.observe(sec));
}

/* --------------------------------------------------------------------------
   4. INTERACTIVE COGNITIVE & DOMAIN WIDGETS (SECTIONS 01 – 05)
   -------------------------------------------------------------------------- */
function initSectionWidgets() {
  // Section 01: Hero Showcase Feed Row Tabs
  const cogData = {
    think: {
      badge: 'THINK',
      title: '01 · Systems That Think',
      desc: 'Evaluates live operational state rather than blindly running fixed scripts when unexpected conditions occur.',
    },
    understand: {
      badge: 'UNDERSTAND',
      title: '02 · Deep Contextual Understanding',
      desc: 'Reads dependencies, inputs, environmental shifts, and upstream constraints as a unified system picture.',
    },
    learn: {
      badge: 'LEARN',
      title: '03 · Experience Retention',
      desc: 'Records verified resolution outcomes and bottlenecks so every run strengthens future operational judgment.',
    },
    adapt: {
      badge: 'ADAPT',
      title: '04 · Real-Time Adaptation',
      desc: 'Re-routes execution autonomously across changing conditions without waiting for constant human intervention.',
    },
    evolve: {
      badge: 'EVOLVE',
      title: '05 · Continuous Evolution',
      desc: 'Compounds intelligence over time, reducing compute waste, human repetition, and execution latency.',
    },
  };

  const cogBadge = document.getElementById('cog-badge');
  const cogTitle = document.getElementById('cog-title');
  const cogDesc = document.getElementById('cog-desc');
  const cogTabs = Array.from(document.querySelectorAll('#hero-cog-tabs .cog-tab'));

  cogTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const item = cogData[tab.getAttribute('data-cog')];
      if (!item) return;
      cogTabs.forEach((t) => {
        const active = t === tab;
        t.classList.toggle('is-active', active);
        t.setAttribute('aria-selected', String(active));
      });
      if (cogBadge) cogBadge.textContent = item.badge;
      if (cogTitle) cogTitle.textContent = item.title;
      if (cogDesc) cogDesc.textContent = item.desc;
    });
  });

  // Section 02: Vision Tier Contrast Explorer
  const visionData = {
    understand: {
      heading: 'Environmental & System Understanding',
      summary: 'Instead of breaking whenever inputs stray from pre-programmed assumptions, intelligence reads real environment signals before acting.',
      legacy: 'Halts or throws unhandled errors when an environment variable, dependency, or edge case shifts.',
      sevol: 'Continuously interprets system context, identifies root shifts, and restructures execution paths autonomously.',
    },
    reasons: {
      heading: 'Contextual Reasoning Under Uncertainty',
      summary: 'Balances system goals against live constraints, cost, and safety rather than executing blind sequential steps.',
      legacy: 'Follows hard-coded if/else branches regardless of downstream impact or resource pressure.',
      sevol: 'Evaluates tradeoffs dynamically to preserve service continuity and verified task outcomes.',
    },
    creates: {
      heading: 'Generative Problem Solving',
      summary: 'Synthesizes new remediation workflows and system adjustments when standard playbooks fall short.',
      legacy: 'Requires manual engineering hours to author every patch, integration mapping, and fallback path.',
      sevol: 'Generates and validates corrective execution paths directly from runtime evidence.',
    },
    adapts: {
      heading: 'Live Adaptation to Changing Conditions',
      summary: 'Adjusts seamlessly across software pipelines, robotic cells, fleets, and energy grids as real-world states evolve.',
      legacy: 'Static configurations drift out of alignment until operations teams intervene manually.',
      sevol: 'Detects environmental variance immediately and recalibrates runtime behavior in motion.',
    },
    evolves: {
      heading: 'Compounding Continuous Evolution',
      summary: 'Every execution cycle informs future intelligence — creating systems that grow more capable over time.',
      legacy: 'Fixed capabilities age quickly; yesterday’s incidents repeat tomorrow with zero memory.',
      sevol: 'Transforms operational outcomes into lasting system intelligence that compounds across workloads.',
    },
  };

  const capBtns = Array.from(document.querySelectorAll('#vision-capability-list .tier-btn'));
  const capHeading = document.getElementById('vision-cap-heading');
  const capSummary = document.getElementById('vision-cap-summary');
  const capLegacy = document.getElementById('vision-legacy-text');
  const capSevol = document.getElementById('vision-sevol-text');

  capBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const item = visionData[btn.getAttribute('data-cap')];
      if (!item) return;
      capBtns.forEach((b) => b.classList.toggle('is-active', b === btn));
      if (capHeading) capHeading.textContent = item.heading;
      if (capSummary) capSummary.textContent = item.summary;
      if (capLegacy) capLegacy.textContent = item.legacy;
      if (capSevol) capSevol.textContent = item.sevol;
    });
  });

  // Section 03: Resource Scrubber + Optional Stage Pills
  const horizonStages = {
    '1': { label: 'STAGE 1 · PREDEFINED SCRIPTS', labor: '24%', capital: '32%', time: '28%', compute: '35%' },
    '2': { label: 'STAGE 2 · ASSISTED WORKFLOWS', labor: '58%', capital: '62%', time: '64%', compute: '66%' },
    '3': { label: 'STAGE 3 · SELF-EVOLVING', labor: '92%', capital: '88%', time: '95%', compute: '90%' },
  };
  const slider = document.getElementById('horizon-slider');
  const stageBadge = document.getElementById('horizon-stage-label');
  const stageJumpBtns = Array.from(document.querySelectorAll('[data-stage-jump]'));

  const applyHorizonStage = (val) => {
    const key = String(val || '3');
    const state = horizonStages[key] || horizonStages['3'];
    if (slider && slider.value !== key) slider.value = key;
    if (stageBadge) stageBadge.textContent = state.label;
    stageJumpBtns.forEach((btn) => {
      const active = btn.getAttribute('data-stage-jump') === key;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', String(active));
    });
    ['labor', 'capital', 'time', 'compute'].forEach((k) => {
      const valEl = document.getElementById(`meter-val-${k}`);
      const barEl = document.getElementById(`meter-bar-${k}`);
      if (valEl) valEl.textContent = state[k];
      if (barEl) barEl.style.width = state[k];
    });
  };

  if (slider) {
    slider.addEventListener('input', () => applyHorizonStage(slider.value));
  }
  stageJumpBtns.forEach((btn) => {
    btn.addEventListener('click', () => applyHorizonStage(btn.getAttribute('data-stage-jump')));
  });

  // Section 04: Global Complexity Matrix
  const domainData = {
    software: {
      tag: 'DOMAIN · SOFTWARE',
      title: 'Adaptive Software Ecosystems',
      brk: 'Static exception handlers fail under cascading API drift, dependency latency, and unmodeled edge states.',
      sevol: 'Understands runtime context, adapts execution paths on the fly, and hardens future decisions automatically.',
    },
    agents: {
      tag: 'DOMAIN · AI AGENTS',
      title: 'Autonomous Multi-Step Agent Execution',
      brk: 'Predefined prompt chains loop, stall on tool schema changes, or burn excessive tokens on retries.',
      sevol: 'Evaluates objective progress, switches strategies intelligently, and learns reliable tool recovery behavior.',
    },
    robotics: {
      tag: 'DOMAIN · ROBOTICS',
      title: 'Embodied Physical Intelligence',
      brk: 'Fixed kinematics and brittle vision rules halt whenever object alignment or terrain varies slightly.',
      sevol: 'Reads physical surroundings continuously, adjusts trajectories safely, and retains motion refinements.',
    },
    factories: {
      tag: 'DOMAIN · FACTORIES',
      title: 'Resilient Industrial Operations',
      brk: 'Static PLC lines cascade single-station anomalies into facility-wide downtime.',
      sevol: 'Coordinates across cells, balances throughput around equipment drift, and reduces manual maintenance overhead.',
    },
    vehicles: {
      tag: 'DOMAIN · VEHICLES',
      title: 'Adaptive Mobility & Fleet Systems',
      brk: 'Pre-scripted heuristics struggle with rare environmental edge cases and dynamic routing shifts.',
      sevol: 'Combines real-time situational perception with evolving decision models for safer autonomous navigation.',
    },
    energy: {
      tag: 'DOMAIN · ENERGY NETWORKS',
      title: 'Dynamic Grid & Load Intelligence',
      brk: 'Static dispatch tables underperform under volatile distributed renewables and sudden demand spikes.',
      sevol: 'Predicts load fluctuations, balances multi-source generation in real time, and learns grid efficiency patterns.',
    },
    infrastructure: {
      tag: 'DOMAIN · INFRASTRUCTURE',
      title: 'Self-Maintaining Critical Infrastructure',
      brk: 'Connected civic and cloud networks require heavy reactive human intervention as scale compounds.',
      sevol: 'Continuously monitors system health, isolates anomalies early, and evolves resilience autonomously.',
    },
  };

  const domainBtns = Array.from(document.querySelectorAll('#domain-chips .domain-tile'));
  const dTag = document.getElementById('domain-tag');
  const dTitle = document.getElementById('domain-title');
  const dBreak = document.getElementById('domain-break');
  const dSevol = document.getElementById('domain-sevol');

  domainBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const item = domainData[btn.getAttribute('data-domain')];
      if (!item) return;
      domainBtns.forEach((b) => b.classList.toggle('is-active', b === btn));
      if (dTag) dTag.textContent = item.tag;
      if (dTitle) dTitle.textContent = item.title;
      if (dBreak) dBreak.textContent = item.brk;
      if (dSevol) dSevol.textContent = item.sevol;
    });
  });

  // Section 05: Dark Evolution Loop Simulator
  const loopStates = [
    {
      code: 'CYCLE_STATE // 01 · THINK',
      desc: 'Evaluates objectives against current environment constraints before committing compute or physical actuation.',
    },
    {
      code: 'CYCLE_STATE // 02 · UNDERSTAND',
      desc: 'Synthesizes signals from APIs, sensors, workloads, and surroundings into an actionable world model.',
    },
    {
      code: 'CYCLE_STATE // 03 · ADAPT',
      desc: 'Selects resilient recovery or optimization routes dynamically without halting operations for human intervention.',
    },
    {
      code: 'CYCLE_STATE // 04 · EVOLVE',
      desc: 'Measures execution outcomes and retains verified learning so subsequent cycles run faster and smarter.',
    },
  ];

  const loopBtns = Array.from(document.querySelectorAll('#loop-steps .loop-step'));
  const loopCode = document.getElementById('loop-readout-code');
  const loopDesc = document.getElementById('loop-readout-desc');
  const loopToggle = document.getElementById('loop-toggle-btn');
  const loopStatus = document.getElementById('loop-status-text');
  let activeLoopIdx = 0;
  let loopRunning = true;

  const setLoopStep = (idx) => {
    activeLoopIdx = idx % loopStates.length;
    const item = loopStates[activeLoopIdx];
    loopBtns.forEach((b, i) => b.classList.toggle('is-active', i === activeLoopIdx));
    if (loopCode) loopCode.textContent = item.code;
    if (loopDesc) loopDesc.textContent = item.desc;
  };

  loopBtns.forEach((btn, idx) => {
    btn.addEventListener('click', () => setLoopStep(idx));
  });

  const loopTimer = setInterval(() => {
    if (loopRunning) setLoopStep(activeLoopIdx + 1);
  }, 2800);

  if (loopToggle) {
    loopToggle.addEventListener('click', () => {
      loopRunning = !loopRunning;
      loopToggle.textContent = loopRunning ? 'Pause Cycle' : 'Resume Cycle';
      if (loopStatus) {
        loopStatus.textContent = loopRunning
          ? 'Fluxera · Continuous Loop Active'
          : 'Fluxera · Cycle Paused';
      }
    });
  }

  window.addEventListener('beforeunload', () => clearInterval(loopTimer));
}

/* --------------------------------------------------------------------------
   5. DESIGN PARTNER CONTACT & FORM HANDLER
   -------------------------------------------------------------------------- */
function initPartnerChannel() {
  const copyBtn = document.getElementById('copy-partner-btn');
  const copyLabel = document.getElementById('copy-partner-label');
  const form = document.getElementById('partner-inquiry-form');
  const emailInput = document.getElementById('partner-email-input');
  const domainSelect = document.getElementById('partner-domain-select');
  const feedbackMsg = document.getElementById('form-feedback-msg');

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(PARTNER_EMAIL).then(() => {
          if (copyLabel) {
            copyLabel.textContent = `Copied: ${PARTNER_EMAIL} ✓`;
            setTimeout(() => {
              copyLabel.textContent = 'Contact Fluxera →';
            }, 2600);
          }
        }).catch(() => {
          window.location.href = `mailto:${PARTNER_EMAIL}`;
        });
      } else {
        window.location.href = `mailto:${PARTNER_EMAIL}`;
      }
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const sender = emailInput ? emailInput.value.trim() : '';
      const domain = domainSelect ? domainSelect.value : 'Self-Evolving Systems';
      const subject = encodeURIComponent(`Fluxera Design Partner Inquiry (${domain})`);
      const body = encodeURIComponent(
        `Hello Fluxera team,\n\nWe would like to collaborate as a design partner with Fluxera.\n\nWork Email: ${sender}\nPrimary Domain: ${domain}\n`
      );

      if (feedbackMsg) {
        feedbackMsg.textContent = 'Opening email draft to Fluxera team ✓';
      }
      window.location.href = `mailto:${PARTNER_EMAIL}?subject=${subject}&body=${body}`;
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initPaletteSwitcher();
  initLogoIntro();
  initNavigation();
  initSectionWidgets();
  initPartnerChannel();
});
