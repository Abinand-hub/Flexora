/**
 * Fluxera — Standalone Script (script.js)
 * High-performance WebGL Fluid Shader & Interactive Telemetry
 */

(function initFluxeraApp() {
  // ==========================================
  // 1. FULL-BLEED AMBIENT WEBGL FLUID SHADER
  // ==========================================
  const canvas = document.getElementById('shader-canvas');
  if (canvas) {
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (gl) {
      const vsSource = `
        attribute vec2 a_position;
        varying vec2 v_texCoord;
        void main() {
          v_texCoord = a_position * 0.5 + 0.5;
          gl_Position = vec4(a_position, 0.0, 1.0);
        }
      `;

      const fsSource = `
        precision highp float;
        uniform float u_time;
        uniform vec2 u_resolution;
        uniform vec2 u_mouse;
        varying vec2 v_texCoord;

        vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

        float snoise(vec2 v) {
          const vec4 C = vec4(0.211324865405187,
                              0.366025403784439,
                              -0.577350269189626,
                              0.024390243902439);
          vec2 i  = floor(v + dot(v, C.yy));
          vec2 x0 = v - i + dot(i, C.xx);
          vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
          vec4 x12 = x0.xyxy + C.xxzz;
          x12.xy -= i1;
          i = mod289(i);
          vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
          vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
          m = m * m;
          m = m * m;
          vec3 x = 2.0 * fract(p * C.www) - 1.0;
          vec3 h = abs(x) - 0.5;
          vec3 ox = floor(x + 0.5);
          vec3 a0 = x - ox;
          m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
          vec3 g;
          g.x  = a0.x  * x0.x  + h.x  * x0.y;
          g.yz = a0.yz * x12.xz + h.yz * x12.yw;
          return 130.0 * dot(m, g);
        }

        void main() {
          vec2 uv = gl_FragCoord.xy / u_resolution.xy;
          float aspect = u_resolution.x / u_resolution.y;
          vec2 p = uv;
          p.x *= aspect;

          float t = u_time * 0.16;

          float n1 = snoise(p * 1.2 + vec2(t * 0.35, t * 0.2));
          float n2 = snoise(p * 2.0 - vec2(t * 0.25, -t * 0.3) + vec2(n1 * 0.5));
          float n3 = snoise(p * 0.7 + vec2(-t * 0.15, t * 0.25) + vec2(n2 * 0.4));

          // Matte Black + Silver Liquid Titanium Palette
          vec3 colMatteBlack = vec3(0.035, 0.035, 0.042);
          vec3 colCharcoal   = vec3(0.08, 0.08, 0.098);
          vec3 colMutedSilver = vec3(0.24, 0.26, 0.30);
          vec3 colSilver     = vec3(0.62, 0.66, 0.72);
          vec3 colPlatinum   = vec3(0.92, 0.94, 0.98);

          float wave1 = smoothstep(-0.25, 0.85, n1 * 0.7 + n2 * 0.5);
          float wave2 = smoothstep(-0.2, 0.9, n3 * 0.8 - n1 * 0.3);

          vec3 color = colMatteBlack;
          color = mix(color, colCharcoal, wave1 * 0.65);
          color = mix(color, colMutedSilver, pow(wave1, 2.2) * 0.32);
          color = mix(color, colSilver, pow(wave2, 2.6) * 0.28);
          color = mix(color, colPlatinum, pow(wave1 * wave2, 3.0) * 0.22);

          vec2 center = vec2(0.5 * aspect, 0.5);
          float d = length(p - center);
          color += vec3(0.015) * (1.0 - smoothstep(0.0, 1.2, d));

          float grain = fract(sin(dot(uv.xy, vec2(12.9898,78.233))) * 43758.5453) * 0.009;
          color += grain;

          gl_FragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
        }
      `;

      function compileShader(glContext, type, source) {
        const shader = glContext.createShader(type);
        glContext.shaderSource(shader, source);
        glContext.compileShader(shader);
        return shader;
      }

      const vs = compileShader(gl, gl.VERTEX_SHADER, vsSource);
      const fs = compileShader(gl, gl.FRAGMENT_SHADER, fsSource);
      const program = gl.createProgram();
      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program);
      gl.useProgram(program);

      const buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);

      const pos = gl.getAttribLocation(program, 'a_position');
      gl.enableVertexAttribArray(pos);
      gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

      const uTime = gl.getUniformLocation(program, 'u_time');
      const uRes = gl.getUniformLocation(program, 'u_resolution');
      const uMouse = gl.getUniformLocation(program, 'u_mouse');

      let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
      window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = window.innerHeight - e.clientY;
      });

      function syncSize() {
        const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
        const w = window.innerWidth;
        const h = window.innerHeight;
        if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
          canvas.width = w * dpr;
          canvas.height = h * dpr;
          gl.viewport(0, 0, canvas.width, canvas.height);
        }
      }
      window.addEventListener('resize', syncSize);
      syncSize();

      let start = performance.now();
      function renderLoop(t) {
        syncSize();
        if (uTime) gl.uniform1f(uTime, (t - start) * 0.001);
        if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height);
        if (uMouse) gl.uniform2f(uMouse, mouse.x, mouse.y);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        requestAnimationFrame(renderLoop);
      }
      requestAnimationFrame(renderLoop);
    }
  }

  // =========================================================================
  // INTERACTIVE CONSTELLATION MESH & GEOMETRIC NODE NETWORK (PORTFOLIO STYLE)
  // =========================================================================
  const constCanvas = document.getElementById('constellation-canvas');
  if (constCanvas) {
    const ctx = constCanvas.getContext('2d');
    if (ctx) {
      let width = 0;
      let height = 0;
      let dpr = 1;
      let nodes = [];

      class Node {
        constructor(w, h) {
          this.reset(w, h);
        }

        reset(w, h) {
          this.x = Math.random() * (w || window.innerWidth);
          this.y = Math.random() * (h || window.innerHeight);
          this.vx = (Math.random() - 0.5) * 0.45;
          this.vy = (Math.random() - 0.5) * 0.45;
          this.radius = Math.random() * 1.8 + 1.2;
          this.pulsePhase = Math.random() * Math.PI * 2;
          
          const rnd = Math.random();
          if (rnd < 0.60) {
            this.color = 'rgba(148, 163, 184, 0.55)'; // muted silver
            this.accent = false;
            this.type = 'silver-muted';
          } else if (rnd < 0.88) {
            this.color = 'rgba(226, 232, 240, 0.85)'; // bright silver
            this.accent = true;
            this.type = 'silver';
          } else {
            this.color = 'rgba(255, 255, 255, 0.98)'; // platinum white
            this.accent = true;
            this.type = 'platinum';
          }
        }

        update(w, h) {
          this.x += this.vx;
          this.y += this.vy;
          this.pulsePhase += 0.025;

          if (this.x < -20) this.x = w + 20;
          if (this.x > w + 20) this.x = -20;
          if (this.y < -20) this.y = h + 20;
          if (this.y > h + 20) this.y = -20;
        }

        draw(c) {
          c.beginPath();
          const r = this.accent ? this.radius + Math.sin(this.pulsePhase) * 0.7 : this.radius;
          c.arc(this.x, this.y, Math.max(r, 0.8), 0, Math.PI * 2);
          c.fillStyle = this.color;
          c.fill();

          if (this.type === 'platinum') {
            c.beginPath();
            c.arc(this.x, this.y, r * 2.8, 0, Math.PI * 2);
            c.fillStyle = 'rgba(255, 255, 255, 0.15)';
            c.fill();
          } else if (this.type === 'silver') {
            c.beginPath();
            c.arc(this.x, this.y, r * 2.5, 0, Math.PI * 2);
            c.fillStyle = 'rgba(226, 232, 240, 0.10)';
            c.fill();
          }
        }
      }

      function resize() {
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        width = window.innerWidth;
        height = window.innerHeight;
        constCanvas.width = width * dpr;
        constCanvas.height = height * dpr;
        ctx.scale(dpr, dpr);

        const targetCount = Math.floor((width * height) / 18000);
        const count = Math.max(45, Math.min(targetCount, 95));

        nodes = [];
        for (let i = 0; i < count; i++) {
          nodes.push(new Node(width, height));
        }
      }

      window.addEventListener('resize', resize);
      resize();

      function animate() {
        ctx.clearRect(0, 0, width, height);

        // 1. Update Floating Nodes
        for (let i = 0; i < nodes.length; i++) {
          nodes[i].update(width, height);
        }

        // 2. Draw Subtle Floating Constellation Stars (Pure Stars, No Connecting Lines)
        for (let i = 0; i < nodes.length; i++) {
          nodes[i].draw(ctx);
        }

        requestAnimationFrame(animate);
      }

      requestAnimationFrame(animate);
    }
  }

  // ==========================================
  // 2. INTERSECTION OBSERVER SCROLL REVEALS
  // ==========================================
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
    observer.observe(el);
  });

  // ==========================================
  // 4. MOBILE PIPELINE AUTOMATIC CAROUSEL
  // ==========================================
  const pipelineStages = [
    {
      num: "01",
      badge: "Trigger",
      title: "Technical Failure",
      desc: "API timeouts, 502 bad gateways, rate limit exhaustion, or broken database queries.",
      badgeBg: "bg-white/10 text-slate-300 border border-white/15",
      numBg: "bg-white/10 text-slate-200 border border-white/20",
      isSpecial: false,
      isVerified: false
    },
    {
      num: "02",
      badge: "Cascade",
      title: "System Impact",
      desc: "In-flight agent runtime halts, token context is dropped, and background worker jobs stall.",
      badgeBg: "bg-white/10 text-slate-300 border border-white/15",
      numBg: "bg-white/10 text-slate-200 border border-white/20",
      isSpecial: false,
      isVerified: false
    },
    {
      num: "03",
      badge: "Progress",
      title: "Work Impact",
      desc: "Multi-step AI reasoning loops and active customer workflows lose critical execution state.",
      badgeBg: "bg-white/10 text-slate-300 border border-white/15",
      numBg: "bg-white/10 text-slate-200 border border-white/20",
      isSpecial: false,
      isVerified: false
    },
    {
      num: "04",
      badge: "Customer",
      title: "User Impact",
      desc: "End users experience spinning loading states, failed checkouts, and disruptive service errors.",
      badgeBg: "bg-white/10 text-slate-300 border border-white/15",
      numBg: "bg-white/10 text-slate-200 border border-white/20",
      isSpecial: false,
      isVerified: false
    },
    {
      num: "05",
      badge: "Financial",
      title: "Business Impact",
      desc: "High cart abandonment, SLA penalty breaches, and silent repetitive token cost waste.",
      badgeBg: "bg-white/10 text-slate-300 border border-white/15",
      numBg: "bg-white/10 text-slate-200 border border-white/20",
      isSpecial: false,
      isVerified: false
    },
    {
      num: "fx",
      badge: "Deterministic",
      title: "Deterministic Recovery",
      desc: "Fluxera Engine triggers sub-12ms failover models, state compression, and idempotency recovery.",
      badgeBg: "bg-slate-900 text-white font-mono",
      numBg: "bg-slate-900 text-white font-black",
      isSpecial: true,
      isVerified: false
    },
    {
      num: "✓",
      badge: "Closed-Loop",
      title: "Verified Outcome",
      desc: "100% verified state restoration with full dollarized revenue protection audit telemetry.",
      badgeBg: "bg-white/15 text-white border border-white/25",
      numBg: "bg-white text-slate-950 font-bold",
      isSpecial: false,
      isVerified: true
    }
  ];

  let currentStageIndex = 0;
  let autoPlayTimer = null;
  const cardInner = document.getElementById('carousel-card-inner');
  const dotsContainer = document.getElementById('carousel-dots');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');
  const carouselWrapper = document.getElementById('pipeline-mobile-carousel');

  function renderMobileCarousel() {
    if (!cardInner || !dotsContainer) return;
    const stage = pipelineStages[currentStageIndex];

    if (stage.isSpecial) {
      cardInner.className = "rounded-[22px] bg-gradient-to-tr from-white via-slate-100 to-slate-300 p-6 text-center min-h-[220px] flex flex-col justify-between text-slate-950 shadow-xl border border-white transition-all duration-300";
      cardInner.innerHTML = `
        <div>
          <div class="flex items-center justify-between mb-3">
            <span class="text-[10px] font-mono uppercase font-black px-2.5 py-1 rounded-full bg-slate-900/10 border border-slate-900/20 text-slate-900">
              STAGE 06 OF 07 • RECOVERY ENGINE
            </span>
            <div class="w-8 h-8 rounded-full bg-slate-950 text-white font-black text-sm flex items-center justify-center font-mono shadow-sm">
              ${stage.num}
            </div>
          </div>
          <h4 class="text-xl font-black tracking-tight text-slate-950 mb-2">${stage.title}</h4>
          <p class="text-xs text-slate-700 leading-relaxed font-semibold">${stage.desc}</p>
        </div>
        <div class="pt-3 mt-3 border-t border-slate-900/15 flex items-center justify-between text-[11px] font-bold text-slate-900">
          <span>Autonomous Failover &amp; Replay</span>
          <span>⚡ 12ms SLA</span>
        </div>
      `;
    } else {
      cardInner.className = `rounded-[22px] bg-[#121217] p-6 text-center min-h-[220px] flex flex-col justify-between text-white border border-white/15 shadow-lg transition-all duration-300 ${stage.isVerified ? 'border-2 border-white/40 bg-[#161a24]' : ''}`;
      cardInner.innerHTML = `
        <div>
          <div class="flex items-center justify-between mb-3">
            <span class="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${stage.badgeBg}">
              STAGE ${String(currentStageIndex + 1).padStart(2, '0')} OF 07 • ${stage.badge}
            </span>
            <div class="w-8 h-8 rounded-full ${stage.numBg} font-extrabold text-sm flex items-center justify-center shadow-sm">
              ${stage.num}
            </div>
          </div>
          <h4 class="text-xl font-extrabold tracking-tight text-white mb-2">${stage.title}</h4>
          <p class="text-xs text-slate-400 leading-relaxed font-medium">${stage.desc}</p>
        </div>
        <div class="pt-3 mt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-bold ${stage.isVerified ? 'text-white' : 'text-slate-400'}">
          <span>${stage.isVerified ? 'Closed-Loop Restored' : 'Chain Impact'}</span>
          <span>↓ Next Stage</span>
        </div>
      `;
    }

    // Render Dots
    dotsContainer.innerHTML = '';
    pipelineStages.forEach((_, idx) => {
      const dot = document.createElement('button');
      dot.setAttribute('aria-label', `Go to stage ${idx + 1}`);
      dot.className = idx === currentStageIndex
        ? 'w-6 h-2 rounded-full bg-white shadow-[0_0_8px_#ffffff] transition-all duration-300 cursor-pointer border-0'
        : 'w-2 h-2 rounded-full bg-white/20 hover:bg-white/40 transition-all duration-300 cursor-pointer border-0';
      dot.addEventListener('click', () => {
        currentStageIndex = idx;
        renderMobileCarousel();
        resetAutoPlay();
      });
      dotsContainer.appendChild(dot);
    });
  }

  function nextSlide() {
    currentStageIndex = (currentStageIndex + 1) % pipelineStages.length;
    renderMobileCarousel();
  }

  function prevSlide() {
    currentStageIndex = (currentStageIndex - 1 + pipelineStages.length) % pipelineStages.length;
    renderMobileCarousel();
  }

  function startAutoPlay() {
    if (autoPlayTimer) clearInterval(autoPlayTimer);
    autoPlayTimer = setInterval(nextSlide, 3200);
  }

  function resetAutoPlay() {
    clearInterval(autoPlayTimer);
    startAutoPlay();
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      resetAutoPlay();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      resetAutoPlay();
    });
  }

  // Swipe support for mobile
  let touchStartX = 0;
  let touchEndX = 0;
  if (carouselWrapper) {
    carouselWrapper.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      clearInterval(autoPlayTimer);
    }, { passive: true });

    carouselWrapper.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      if (touchStartX - touchEndX > 45) {
        nextSlide();
      } else if (touchEndX - touchStartX > 45) {
        prevSlide();
      }
      startAutoPlay();
    }, { passive: true });

    carouselWrapper.addEventListener('mouseenter', () => clearInterval(autoPlayTimer));
    carouselWrapper.addEventListener('mouseleave', () => startAutoPlay());
  }

  // Init Carousel
  renderMobileCarousel();
  startAutoPlay();
})();

// ==========================================
// 6. INTERACTIVE 3-STEP TERMINAL CONTROLLER
// ==========================================
window.selectSdkStep = function(stepNum) {
  // 1. Update Desktop Step Buttons & Code Snippets
  for (let i = 1; i <= 3; i++) {
    const btn = document.getElementById('sdk-step-btn-' + i);
    const tab = document.getElementById('sdk-tab-btn-' + i);
    const code = document.getElementById('terminal-code-' + i);
    
    if (btn) {
      const indicator = btn.querySelector('.sdk-step-indicator');
      const label = btn.querySelector('span');
      if (i === stepNum) {
        btn.className = 'sdk-step-card text-left p-5 sm:p-6 rounded-2xl border transition-all duration-300 cursor-pointer w-full bg-[#18181f] shadow-[0_0_25px_rgba(255,255,255,0.08)] border-white/40 ring-1 ring-white/20';
        if (indicator) indicator.className = 'sdk-step-indicator w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_8px_#ffffff]';
        if (label) label.className = 'text-[11px] font-mono font-bold tracking-widest text-slate-200 uppercase';
      } else {
        btn.className = 'sdk-step-card text-left p-5 sm:p-6 rounded-2xl border transition-all duration-300 cursor-pointer w-full bg-[#111115]/90 hover:bg-[#16161b] border-white/10 shadow-sm hover:border-white/20';
        if (indicator) indicator.className = 'sdk-step-indicator w-2.5 h-2.5 rounded-full bg-transparent';
        if (label) label.className = 'text-[11px] font-mono font-bold tracking-widest text-slate-500 uppercase';
      }
    }

    if (tab) {
      if (i === stepNum) {
        tab.className = 'flex-1 py-2 px-2 text-center rounded-xl font-mono text-xs font-bold transition-all bg-white text-slate-950 shadow-sm border border-white';
      } else {
        tab.className = 'flex-1 py-2 px-2 text-center rounded-xl font-mono text-xs font-semibold transition-all text-slate-400 hover:text-white';
      }
    }

    if (code) {
      if (i === stepNum) {
        code.classList.remove('hidden');
        code.classList.add('block');
      } else {
        code.classList.add('hidden');
        code.classList.remove('block');
      }
    }
  }

  // 2. Update Mobile Description Header
  const tagEl = document.getElementById('sdk-mobile-step-tag');
  const titleEl = document.getElementById('sdk-mobile-step-title');
  const textEl = document.getElementById('sdk-mobile-step-text');
  
  if (tagEl && titleEl && textEl) {
    if (stepNum === 1) {
      tagEl.textContent = 'STEP 1';
      titleEl.textContent = 'Understand Work';
      textEl.textContent = 'Connect and understand the services, models, and workflows your software runs.';
    } else if (stepNum === 2) {
      tagEl.textContent = 'STEP 2';
      titleEl.textContent = 'Detect Failures';
      textEl.textContent = 'Identify timeouts, rate limits, 502s, and broken queries across your tech stack in real time.';
    } else if (stepNum === 3) {
      tagEl.textContent = 'STEP 3';
      titleEl.textContent = 'Recover Work';
      textEl.textContent = 'Preserve state, resume interrupted operations, avoid cold reruns, and recover wasted costs.';
    }
  }

  // 3. Update Terminal Window Info Bar
  const filenameEl = document.getElementById('terminal-filename');
  const badgeEl = document.getElementById('terminal-badge');
  const statusEl = document.getElementById('terminal-status-text');

  if (stepNum === 1) {
    if (filenameEl) filenameEl.textContent = 'fluxera-sdk.js';
    if (badgeEl) { badgeEl.textContent = 'Step 1 of 3'; badgeEl.className = 'px-2 sm:px-2.5 py-0.5 rounded-md bg-white/10 border border-white/20 text-slate-200 font-semibold'; }
    if (statusEl) statusEl.textContent = 'Ready to execute in Node.js / Python';
  } else if (stepNum === 2) {
    if (filenameEl) filenameEl.textContent = 'telemetry-event.json';
    if (badgeEl) { badgeEl.textContent = 'Step 2 of 3'; badgeEl.className = 'px-2 sm:px-2.5 py-0.5 rounded-md bg-white/10 border border-white/20 text-slate-200 font-semibold'; }
    if (statusEl) statusEl.textContent = 'Auto-logged telemetry packet emitted';
  } else if (stepNum === 3) {
    if (filenameEl) filenameEl.textContent = 'cost-analytics.ts';
    if (badgeEl) { badgeEl.textContent = 'Step 3 of 3'; badgeEl.className = 'px-2 sm:px-2.5 py-0.5 rounded-md bg-white/10 border border-white/20 text-slate-200 font-semibold'; }
    if (statusEl) statusEl.textContent = 'Financial impact formula evaluated';
  }
};

// ==========================================
// MOBILE NAVIGATION DROPDOWN MENU INITIALIZATION
// ==========================================
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  if (toggleBtn && mobileMenu) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      mobileMenu.classList.toggle('hidden');
    });

    document.addEventListener('click', (e) => {
      if (!mobileMenu.contains(e.target) && !toggleBtn.contains(e.target)) {
        mobileMenu.classList.add('hidden');
      }
    });

    const links = mobileMenu.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }
}

// ==========================================
// AMBIENT PARTICLES (DISABLED: PURE CLEAN GRID ONLY)
// ==========================================
function initAmbientParticles() {
  // Ambient particle dots removed for clean architectural grid aesthetic
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
  });
} else {
  initMobileMenu();
}

// ==========================================
// 7. COPY PARTNER EMAIL HELPER
// ==========================================
window.copyPartnerEmail = function() {
  const email = 'shubhamchansoriya13@gmail.com';
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(email).then(() => {
      const textEl = document.getElementById('copy-btn-text');
      const iconEl = document.getElementById('copy-btn-icon');
      if (textEl) textEl.textContent = 'Copied!';
      if (iconEl) iconEl.textContent = '✓';
      setTimeout(() => {
        if (textEl) textEl.textContent = 'Copy Email';
        if (iconEl) iconEl.textContent = '📋';
      }, 2500);
    }).catch(() => {
      prompt('Copy email:', email);
    });
  } else {
    prompt('Copy email:', email);
  }
};


