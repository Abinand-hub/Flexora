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

          vec3 colWhite = vec3(0.99, 0.99, 1.0);
          vec3 colRed = vec3(1.0, 0.26, 0.42);
          vec3 colSoftRose = vec3(1.0, 0.84, 0.88);
          vec3 colBlue = vec3(0.22, 0.68, 0.98);
          vec3 colDeepBlue = vec3(0.35, 0.48, 0.96);

          float redWeight = smoothstep(-0.25, 0.8, n1 * 0.7 + n2 * 0.5);
          float blueWeight = smoothstep(-0.2, 0.85, n3 * 0.8 - n1 * 0.3);

          vec3 color = colWhite;
          color = mix(color, colSoftRose, redWeight * 0.42);
          color = mix(color, colRed, pow(redWeight, 2.2) * 0.28);
          color = mix(color, colBlue, pow(blueWeight, 1.8) * 0.24);
          color = mix(color, colDeepBlue, pow(blueWeight * redWeight, 2.0) * 0.15);

          vec2 center = vec2(0.5 * aspect, 0.5);
          float d = length(p - center);
          color += vec3(0.04) * (1.0 - smoothstep(0.0, 1.2, d));

          float grain = fract(sin(dot(uv.xy, vec2(12.9898,78.233))) * 43758.5453) * 0.012;
          color -= grain;

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
      badgeBg: "bg-rose-100 text-rose-700",
      numBg: "bg-rose-100 text-rose-600",
      isSpecial: false,
      isVerified: false
    },
    {
      num: "02",
      badge: "Cascade",
      title: "System Impact",
      desc: "In-flight agent runtime halts, token context is dropped, and background worker jobs stall.",
      badgeBg: "bg-amber-100 text-amber-800",
      numBg: "bg-amber-100 text-amber-600",
      isSpecial: false,
      isVerified: false
    },
    {
      num: "03",
      badge: "Progress",
      title: "Work Impact",
      desc: "Multi-step AI reasoning loops and active customer workflows lose critical execution state.",
      badgeBg: "bg-rose-100 text-rose-700",
      numBg: "bg-rose-100 text-rose-500",
      isSpecial: false,
      isVerified: false
    },
    {
      num: "04",
      badge: "Customer",
      title: "User Impact",
      desc: "End users experience spinning loading states, failed checkouts, and disruptive error alerts.",
      badgeBg: "bg-amber-100 text-amber-800",
      numBg: "bg-amber-100 text-amber-700",
      isSpecial: false,
      isVerified: false
    },
    {
      num: "05",
      badge: "Financial",
      title: "Business Impact",
      desc: "High cart abandonment, SLA penalty breaches, and silent repetitive token cost waste.",
      badgeBg: "bg-rose-100 text-rose-700",
      numBg: "bg-rose-100 text-rose-700",
      isSpecial: false,
      isVerified: false
    },
    {
      num: "fx",
      badge: "Deterministic",
      title: "Deterministic Recovery",
      desc: "Fluxera Engine triggers sub-12ms failover models, state compression, and idempotency recovery.",
      badgeBg: "bg-white/20 text-white font-mono",
      numBg: "bg-white/20 text-white font-black",
      isSpecial: true,
      isVerified: false
    },
    {
      num: "✓",
      badge: "Closed-Loop",
      title: "Verified Outcome",
      desc: "100% verified state restoration with full dollarized revenue protection audit telemetry.",
      badgeBg: "bg-emerald-100 text-emerald-800",
      numBg: "bg-emerald-500 text-white",
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
      cardInner.className = "rounded-[22px] bg-gradient-to-tr from-rose-600 via-rose-500 to-rose-400 p-6 text-center min-h-[220px] flex flex-col justify-between text-white shadow-lg transition-all duration-300";
      cardInner.innerHTML = `
        <div>
          <div class="flex items-center justify-between mb-3">
            <span class="text-[10px] font-mono uppercase font-black px-2.5 py-1 rounded-full bg-white/20 border border-white/30 text-rose-100">
              STAGE 06 OF 07 • RECOVERY ENGINE
            </span>
            <div class="w-8 h-8 rounded-full bg-white/25 text-white font-black text-sm flex items-center justify-center font-mono shadow-sm">
              ${stage.num}
            </div>
          </div>
          <h4 class="text-xl font-black tracking-tight text-white mb-2">${stage.title}</h4>
          <p class="text-xs text-rose-100 leading-relaxed font-medium">${stage.desc}</p>
        </div>
        <div class="pt-3 mt-3 border-t border-white/20 flex items-center justify-between text-[11px] font-bold text-white">
          <span>Autonomous Failover &amp; Replay</span>
          <span>⚡ 12ms SLA</span>
        </div>
      `;
    } else {
      cardInner.className = `rounded-[22px] bg-white p-6 text-center min-h-[220px] flex flex-col justify-between text-slate-900 shadow-md transition-all duration-300 ${stage.isVerified ? 'border-2 border-emerald-300 bg-emerald-50/40' : ''}`;
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
          <h4 class="text-xl font-extrabold tracking-tight text-slate-900 mb-2">${stage.title}</h4>
          <p class="text-xs text-slate-600 leading-relaxed font-medium">${stage.desc}</p>
        </div>
        <div class="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold ${stage.isVerified ? 'text-emerald-700' : 'text-slate-500'}">
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
        ? 'w-6 h-2 rounded-full bg-rose-600 transition-all duration-300 cursor-pointer border-0'
        : 'w-2 h-2 rounded-full bg-slate-200 hover:bg-slate-300 transition-all duration-300 cursor-pointer border-0';
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
        btn.className = 'sdk-step-card text-left p-5 sm:p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer w-full bg-white shadow-md border-rose-500 ring-2 ring-rose-500/20';
        if (indicator) indicator.className = 'sdk-step-indicator w-2.5 h-2.5 rounded-full bg-rose-500';
        if (label) label.className = 'text-[11px] font-mono font-bold tracking-widest text-rose-600 uppercase';
      } else {
        btn.className = 'sdk-step-card text-left p-5 sm:p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer w-full bg-white/70 hover:bg-white border-slate-200 shadow-sm hover:border-slate-300';
        if (indicator) indicator.className = 'sdk-step-indicator w-2.5 h-2.5 rounded-full bg-transparent';
        if (label) label.className = 'text-[11px] font-mono font-bold tracking-widest text-slate-400 uppercase';
      }
    }

    if (tab) {
      if (i === stepNum) {
        tab.className = 'flex-1 py-2 px-2 text-center rounded-xl font-mono text-xs font-bold transition-all bg-white text-rose-600 shadow-sm border border-rose-200/80';
      } else {
        tab.className = 'flex-1 py-2 px-2 text-center rounded-xl font-mono text-xs font-semibold transition-all text-slate-600 hover:text-slate-900';
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
      titleEl.textContent = 'Wrap your API calls';
      textEl.textContent = 'Install the SDK. Wrap the API calls you want tracked with a small function call.';
    } else if (stepNum === 2) {
      tagEl.textContent = 'STEP 2';
      titleEl.textContent = 'Every call is logged';
      textEl.textContent = 'Success, failure, latency, and cost are recorded automatically. Nothing changes about how your API behaves.';
    } else if (stepNum === 3) {
      tagEl.textContent = 'STEP 3';
      titleEl.textContent = 'Failures become dollars';
      textEl.innerHTML = '<code class="font-mono text-xs bg-rose-50 text-rose-700 px-1 py-0.5 rounded border border-rose-100">failed_requests × avg_price</code> is the failed API cost — always shown.';
    }
  }

  // 3. Update Terminal Window Info Bar
  const filenameEl = document.getElementById('terminal-filename');
  const badgeEl = document.getElementById('terminal-badge');
  const statusEl = document.getElementById('terminal-status-text');

  if (stepNum === 1) {
    if (filenameEl) filenameEl.textContent = 'fluxera-sdk.js';
    if (badgeEl) { badgeEl.textContent = 'Step 1 of 3'; badgeEl.className = 'px-2 sm:px-2.5 py-0.5 rounded-md bg-rose-950/60 border border-rose-800/70 text-rose-400 font-semibold'; }
    if (statusEl) statusEl.textContent = 'Ready to execute in Node.js / Python';
  } else if (stepNum === 2) {
    if (filenameEl) filenameEl.textContent = 'telemetry-event.json';
    if (badgeEl) { badgeEl.textContent = 'Step 2 of 3'; badgeEl.className = 'px-2 sm:px-2.5 py-0.5 rounded-md bg-cyan-950/60 border border-cyan-800/70 text-cyan-400 font-semibold'; }
    if (statusEl) statusEl.textContent = 'Auto-logged telemetry packet emitted';
  } else if (stepNum === 3) {
    if (filenameEl) filenameEl.textContent = 'cost-analytics.ts';
    if (badgeEl) { badgeEl.textContent = 'Step 3 of 3'; badgeEl.className = 'px-2 sm:px-2.5 py-0.5 rounded-md bg-amber-950/60 border border-amber-800/70 text-amber-400 font-semibold'; }
    if (statusEl) statusEl.textContent = 'Financial impact formula evaluated';
  }
};


