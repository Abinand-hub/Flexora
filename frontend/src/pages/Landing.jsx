import React, { useState, useEffect } from "react";
import { ShaderBackground } from "../components/ShaderBackground";
import { useIsMobile } from "../format";
import { mock } from "../mock";
import { apiGet } from "../api";

export function WhatPage({ go, onDemo, onSignUp }) {
  const [heroView, setHeroView] = useState("dashboard");
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [gaugeValue, setGaugeValue] = useState(0);
  const [emailInput, setEmailInput] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [pipelineIndex, setPipelineIndex] = useState(0);
  const [pipelinePaused, setPipelinePaused] = useState(false);
  const [sdkStep, setSdkStep] = useState(1);
  const isMobile = useIsMobile();

  const pipelineStages = [
    {
      num: "01",
      badge: "Trigger",
      title: "Technical Failure",
      desc: "API timeouts, 502 bad gateways, rate limit exhaustion, or broken database queries.",
      badgeBg: "bg-rose-100 text-rose-700",
      numBg: "bg-rose-100 text-rose-600",
      isSpecial: false,
      isVerified: false,
    },
    {
      num: "02",
      badge: "Cascade",
      title: "System Impact",
      desc: "In-flight agent runtime halts, token context is dropped, and background worker jobs stall.",
      badgeBg: "bg-amber-100 text-amber-800",
      numBg: "bg-amber-100 text-amber-600",
      isSpecial: false,
      isVerified: false,
    },
    {
      num: "03",
      badge: "Progress",
      title: "Work Impact",
      desc: "Multi-step AI reasoning loops and active customer workflows lose critical execution state.",
      badgeBg: "bg-rose-100 text-rose-700",
      numBg: "bg-rose-100 text-rose-500",
      isSpecial: false,
      isVerified: false,
    },
    {
      num: "04",
      badge: "Customer",
      title: "User Impact",
      desc: "End users experience spinning loading states, failed checkouts, and disruptive error alerts.",
      badgeBg: "bg-amber-100 text-amber-800",
      numBg: "bg-amber-100 text-amber-700",
      isSpecial: false,
      isVerified: false,
    },
    {
      num: "05",
      badge: "Financial",
      title: "Business Impact",
      desc: "High cart abandonment, SLA penalty breaches, and silent repetitive token cost waste.",
      badgeBg: "bg-rose-100 text-rose-700",
      numBg: "bg-rose-100 text-rose-700",
      isSpecial: false,
      isVerified: false,
    },
    {
      num: "fx",
      badge: "Deterministic",
      title: "Deterministic Recovery",
      desc: "Fluxera Engine triggers sub-12ms failover models, state compression, and idempotency recovery.",
      badgeBg: "bg-white/20 text-white font-mono",
      numBg: "bg-white/20 text-white font-black",
      isSpecial: true,
      isVerified: false,
    },
    {
      num: "✓",
      badge: "Closed-Loop",
      title: "Verified Outcome",
      desc: "100% verified state restoration with full dollarized revenue protection audit telemetry.",
      badgeBg: "bg-emerald-100 text-emerald-800",
      numBg: "bg-emerald-500 text-white",
      isSpecial: false,
      isVerified: true,
    },
  ];

  // Mobile Auto-Play Interval for Cybernetic Pipeline Carousel
  useEffect(() => {
    if (pipelinePaused) return;
    const interval = setInterval(() => {
      setPipelineIndex((prev) => (prev + 1) % 7);
    }, 3200);
    return () => clearInterval(interval);
  }, [pipelinePaused]);

  // Smooth counter animation for the 94% Work Preserved Gauge
  useEffect(() => {
    let start = 0;
    const target = 94;
    const duration = 1400;
    const startTime = performance.now();
    let frameId;

    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setGaugeValue(Math.floor(easeOut * target));
      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };
    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, []);

  const handleEarlyAccessSubmit = (e) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setEmailSubmitted(true);
      setTimeout(() => {
        onSignUp();
      }, 1200);
    }
  };

  return (
    <div className="relative min-h-screen text-slate-900 overflow-hidden font-sans selection:bg-rose-500 selection:text-white">
      {/* Full-Bleed Ambient WebGL Shader Background */}
      <ShaderBackground />

      {/* Ambient Cosmic Arc Background Top */}
      <div className="cosmic-arc-top"></div>
      <div className="cosmic-arc-rim"></div>
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[720px] h-[360px] bg-rose-400/20 blur-[130px] pointer-events-none rounded-full"></div>

      <main className="relative z-10">
        {/* HERO SECTION — CLEAN, REFINED PROPORTIONS */}
        <section className="relative pt-24 md:pt-28 pb-8 px-4 text-center overflow-visible" id="overview">
          <div className="max-w-3xl mx-auto flex flex-col items-center">
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-rose-100/90 text-rose-700 border border-rose-200/90 shadow-sm mb-3.5 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
              THE RELIABILITY &amp; RECOVERY ENGINE
            </div>

            {/* Main Refined Headline (Scaled down for balance) */}
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-[36px] font-extrabold tracking-tight text-slate-950 leading-[1.28] mb-6">
              <span className="block">EVERY MODERN SAAS WILL HAVE A</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-600 via-rose-500 to-rose-400 drop-shadow-sm block">
                RELIABILITY PROBLEM.
              </span>
            </h1>

            {/* Action Buttons with Dashboard as Primary */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-3">
              <button
                onClick={onDemo}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-rose-600 via-rose-500 to-rose-600 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-rose-500/30 hover:shadow-rose-500/45 hover:scale-[1.03] transition-all cursor-pointer border-0"
              >
                <span>Open Dashboard</span>
                <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2"></path>
                </svg>
              </button>
              <button
                onClick={onDemo}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-slate-50 text-slate-800 hover:text-slate-950 border border-slate-200/90 text-xs sm:text-sm font-semibold transition-all shadow-xs hover:shadow-sm cursor-pointer"
              >
                <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping"></span>
                <span>Live Telemetry Demo</span>
              </button>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* HERO CENTERPIECE: VIEWPORT PEEKING 3D INTERACTIVE DASHBOARD CONSOLE       */}
          {/* ========================================================================= */}
          <div className="relative w-full max-w-5xl mx-auto px-2 sm:px-4 mt-6 md:mt-8 hero-perspective-stage z-20 overflow-visible" id="hero-console">
            <div
              onClick={onDemo}
              className="dashboard-viewport-peek rounded-[26px] p-[1.5px] bg-gradient-to-b from-rose-400/60 via-slate-200/90 to-sky-300/40 relative cursor-pointer group"
            >
              {/* Floating "Click to Open Full Dashboard" Hover Badge */}
              <div className="absolute top-5 right-6 z-30 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-y-1 group-hover:translate-y-0">
                <span className="bg-gradient-to-r from-rose-600 to-rose-500 text-white text-xs font-semibold px-4 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                  <span>Open Full Console</span>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"></path>
                  </svg>
                </span>
              </div>

              <div className="rounded-[24px] bg-white/95 backdrop-blur-2xl border border-slate-200 overflow-hidden shadow-2xl text-left">
                {/* Window Title Bar with View Toggles */}
                <div className="flex items-center justify-between px-4 py-2.5 bg-slate-50/90 border-b border-slate-200 text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-400"></span>
                    <span className="w-3 h-3 rounded-full bg-amber-400"></span>
                    <span className="w-3 h-3 rounded-full bg-emerald-400"></span>
                    <div className="ml-3 hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-[11px] text-slate-600 shadow-xs">
                      <svg className="w-3 h-3 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                      </svg>
                      <span className="font-mono">fluxera.network/recovery-console</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                    <button
                      type="button"
                      onClick={() => setHeroView("dashboard")}
                      className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer border-0 ${
                        heroView === "dashboard"
                          ? "bg-rose-50 text-rose-600 border border-rose-200 shadow-sm"
                          : "bg-transparent text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      📊 Telemetry
                    </button>
                    <button
                      type="button"
                      onClick={() => setHeroView("3d")}
                      className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer border-0 ${
                        heroView === "3d"
                          ? "bg-rose-50 text-rose-600 border border-rose-200 shadow-sm"
                          : "bg-transparent text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      🔮 3D Neural Matrix
                    </button>
                  </div>
                </div>

                {/* Conditional View: 3D Visualizer vs Authentic Fluxera Dashboard */}
                {heroView === "3d" ? (
                  <div className="relative overflow-hidden bg-slate-950 min-h-[480px] group/img">
                    <img
                      src="/assets/hero-graphic.jpg"
                      alt="Fluxera 3D Neural Telemetry Visualizer"
                      className="w-full h-[480px] object-cover transform group-hover/img:scale-102 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent flex items-end justify-between p-6 sm:p-8">
                      <div className="text-left text-white">
                        <span className="text-xs font-mono font-bold text-rose-400 uppercase tracking-wider">
                          3D Telemetry Matrix &amp; Failure Protection
                        </span>
                        <h3 className="text-lg sm:text-2xl font-bold mt-1">Autonomous Revenue Leak Interception</h3>
                        <p className="text-xs text-slate-300 mt-1 max-w-lg">
                          Real-time stream isolation, error attribution, and zero-trust recovery dispatched in 12ms.
                        </p>
                      </div>
                      <button
                        onClick={onDemo}
                        className="px-5 py-2.5 rounded-full bg-gradient-to-r from-rose-600 to-rose-500 text-white text-xs font-semibold inline-flex items-center gap-1.5 shadow-lg shadow-rose-500/30 cursor-pointer border-0 flex-shrink-0"
                      >
                        <span>Open Live App →</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Original Authentic Fluxera Dashboard Layout */
                  <div className="grid grid-cols-12 min-h-[500px] bg-[#fafbfd]">
                    {/* Original Left Sidebar */}
                    <aside className="hidden md:flex col-span-12 md:col-span-3 border-r border-slate-200 bg-white/95 p-4 flex-col justify-between">
                      <div>
                        <div className="pb-3 mb-3 border-b border-slate-100 text-left">
                          <p className="text-[10px] font-semibold text-slate-400 tracking-wider uppercase mb-0.5">
                            WORKSPACE
                          </p>
                          <p className="text-xs font-bold text-slate-900">Demo</p>
                          <span className="inline-block mt-1 text-[10px] font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                            DEMO MODE
                          </span>
                        </div>

                        <ul className="space-y-1 text-xs font-medium text-left">
                          <li>
                            <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-rose-50 text-rose-700 font-semibold border border-rose-200/80">
                              <span>Overview</span>
                            </div>
                          </li>
                          <li>
                            <div className="flex items-center px-3 py-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors">
                              <span>Workflows</span>
                            </div>
                          </li>
                          <li>
                            <div className="flex items-center px-3 py-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors">
                              <span>Tools</span>
                            </div>
                          </li>
                          <li>
                            <div className="flex items-center px-3 py-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors">
                              <span>Executions</span>
                            </div>
                          </li>
                          <li>
                            <div className="flex items-center px-3 py-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors">
                              <span>Logs</span>
                            </div>
                          </li>
                          <li>
                            <div className="flex items-center px-3 py-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors">
                              <span>Settings</span>
                            </div>
                          </li>
                        </ul>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
                        <div className="flex items-center justify-center gap-2 p-2 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 font-mono text-[11px] font-semibold">
                          <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                          <span>STATIC DEMO</span>
                        </div>
                      </div>
                    </aside>

                    {/* Original Main Overview Area */}
                    <main className="col-span-12 md:col-span-9 p-5 flex flex-col justify-between bg-[#fafbfd] text-left">
                      <div>
                        {/* Top Bar inside dashboard */}
                        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200/80">
                          <h4 className="text-base font-bold text-slate-900">Overview</h4>
                          <div className="flex items-center gap-2">
                            <span className="hidden sm:inline-block text-xs font-medium text-slate-700 px-3 py-1 rounded-lg border border-slate-200 bg-white">
                              History
                            </span>
                            <div className="flex items-center bg-slate-100 p-0.5 rounded-lg text-xs font-medium text-slate-600">
                              <span className="px-2.5 py-0.5 rounded bg-white text-rose-600 font-semibold shadow-sm">
                                24h
                              </span>
                              <span className="px-2 py-0.5">7d</span>
                              <span className="px-2 py-0.5">30d</span>
                            </div>
                          </div>
                        </div>

                        {/* 2 Primary KPI Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-4">
                          {/* FAILED API COST */}
                          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-rose-200/80 shadow-sm relative">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-[10px] font-mono font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200 tracking-wider uppercase">
                                FAILED API COST · LAST 24H
                              </span>
                              <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                            </div>
                            <div className="text-3xl sm:text-4xl font-extrabold text-rose-600 tracking-tight mb-1">
                              $7.13
                            </div>
                            <p className="text-[11px] text-slate-500">
                              <strong className="font-mono text-slate-800">152</strong> failed API calls across all workflows
                            </p>
                          </div>

                          {/* EST. REVENUE AT RISK */}
                          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-amber-200/80 shadow-sm relative">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-[10px] font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 tracking-wider uppercase">
                                EST. REVENUE AT RISK · LAST 24H
                              </span>
                              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                            </div>
                            <div className="text-3xl sm:text-4xl font-extrabold text-amber-600 tracking-tight mb-1">
                              $5,185.00
                            </div>
                            <p className="text-[11px] text-slate-500">
                              ~<strong className="font-mono text-slate-800">61</strong> users impacted · <strong className="font-mono text-slate-800">40%</strong> cart abandonment
                            </p>
                          </div>
                        </div>

                        {/* 4 Secondary Telemetry Metrics */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-4">
                          <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-sm">
                            <span className="text-[10px] font-mono font-semibold text-slate-400 uppercase block mb-1">
                              Failure Rate
                            </span>
                            <div className="text-base sm:text-lg font-bold text-rose-600">19.0%</div>
                          </div>

                          <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-sm">
                            <span className="text-[10px] font-mono font-semibold text-slate-400 uppercase block mb-1">
                              Avg Fail Latency
                            </span>
                            <div className="text-base sm:text-lg font-bold text-slate-900">859ms</div>
                          </div>

                          <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-sm">
                            <span className="text-[10px] font-mono font-semibold text-slate-400 uppercase block mb-1">
                              Total Requests
                            </span>
                            <div className="text-base sm:text-lg font-bold text-slate-900">800</div>
                          </div>

                          <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-sm">
                            <span className="text-[10px] font-mono font-semibold text-slate-400 uppercase block mb-1">
                              Monthly Run-Rate
                            </span>
                            <div className="text-base sm:text-lg font-bold text-rose-600">$213.95</div>
                          </div>
                        </div>

                        {/* Leaking Endpoints Table */}
                        <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
                          <div className="px-4 py-2.5 bg-slate-50/80 border-b border-slate-200 flex items-center justify-between">
                            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                              <span>Leaking Endpoints &amp; Services</span>
                            </div>
                            <span className="text-[10px] font-mono text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                              LAST 24H
                            </span>
                          </div>

                          <div className="divide-y divide-slate-100 text-xs">
                            {[
                              { name: "/v1/chat/completions", failed: "67 failed", rate: "21.5%", cost: "$3.98", isTop: true, pct: 100 },
                              { name: "/v1/completions", failed: "41 failed", rate: "19.1%", cost: "$1.63", pct: 45 },
                              { name: "/v1/images/generate", failed: "12 failed", rate: "12.8%", cost: "$0.98", pct: 28 },
                              { name: "/v1/audio/transcribe", failed: "10 failed", rate: "21.3%", cost: "$0.32", pct: 12 },
                              { name: "/v1/embeddings", failed: "22 failed", rate: "16.7%", cost: "$0.22", pct: 8 },
                            ].map((ep) => (
                              <div key={ep.name} className="px-4 py-2.5 grid grid-cols-12 gap-2 items-center hover:bg-rose-50/30 transition-colors">
                                <div className="col-span-6">
                                  <div className="flex items-center gap-1.5 font-mono text-[11px] font-bold text-slate-800">
                                    {ep.isTop && <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>}
                                    <span>{ep.name}</span>
                                  </div>
                                  <div className="w-full h-1 bg-slate-100 rounded-full mt-1 overflow-hidden">
                                    <div
                                      className={`h-full rounded-full ${ep.isTop ? "bg-rose-600" : "bg-rose-400"}`}
                                      style={{ width: `${ep.pct}%` }}
                                    ></div>
                                  </div>
                                </div>
                                <div className="col-span-2 text-center text-slate-500 font-mono text-[11px]">
                                  {ep.failed}
                                </div>
                                <div className="col-span-2 text-center">
                                  <span className="bg-rose-50 text-rose-600 font-mono text-[10px] font-bold px-1.5 py-0.5 rounded border border-rose-100">
                                    {ep.rate}
                                  </span>
                                </div>
                                <div className="col-span-2 text-right font-mono font-bold text-rose-600 text-xs sm:text-sm">
                                  {ep.cost}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </main>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* FLOATING CONTINUOUS CAROUSEL OF CONNECTED APIS / SERVICES / TOOLS (BELOW DASHBOARD) */}
          <div className="relative w-full max-w-6xl mx-auto px-4 mt-10 md:mt-14 overflow-hidden z-20" data-purpose="connected-integrations-carousel">
            <div className="text-center mb-4">
              <p className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest flex items-center justify-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping"></span>
                <span>Automatic Telemetry &amp; Failover Across Your Entire Stack</span>
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span>
              </p>
            </div>

            {/* Infinite Floating Auto-Carousel Track with Edge Masking */}
            <div className="relative w-full overflow-hidden py-3 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
              <div className="tool-marquee-track flex items-center gap-3">
                {[
                  { name: "OpenAI", type: "AI Models", color: "emerald", icon: "openai" },
                  { name: "Claude", type: "LLM APIs", color: "amber", icon: "claude" },
                  { name: "Stripe", type: "Payments", color: "indigo", icon: "stripe" },
                  { name: "PostgreSQL", type: "Databases", color: "sky", icon: "postgres" },
                  { name: "AWS Cloud", type: "Infrastructure", color: "amber", icon: "aws" },
                  { name: "LangChain", type: "AI Agents", color: "emerald", icon: "langchain" },
                  { name: "Supabase", type: "Database / Auth", color: "emerald", icon: "supabase" },
                  { name: "Pinecone", type: "Vector DB / RAG", color: "cyan", icon: "pinecone" },
                  { name: "Redis", type: "Cache & Memory", color: "rose", icon: "redis" },
                  { name: "Vercel", type: "Edge & Workflows", color: "slate", icon: "vercel" },
                  { name: "GitHub", type: "Webhooks", color: "slate", icon: "github" },
                  { name: "Resend", type: "Email APIs", color: "slate", icon: "resend" },
                ].concat([
                  { name: "OpenAI", type: "AI Models", color: "emerald", icon: "openai" },
                  { name: "Claude", type: "LLM APIs", color: "amber", icon: "claude" },
                  { name: "Stripe", type: "Payments", color: "indigo", icon: "stripe" },
                  { name: "PostgreSQL", type: "Databases", color: "sky", icon: "postgres" },
                  { name: "AWS Cloud", type: "Infrastructure", color: "amber", icon: "aws" },
                  { name: "LangChain", type: "AI Agents", color: "emerald", icon: "langchain" },
                  { name: "Supabase", type: "Database / Auth", color: "emerald", icon: "supabase" },
                  { name: "Pinecone", type: "Vector DB / RAG", color: "cyan", icon: "pinecone" },
                  { name: "Redis", type: "Cache & Memory", color: "rose", icon: "redis" },
                  { name: "Vercel", type: "Edge & Workflows", color: "slate", icon: "vercel" },
                  { name: "GitHub", type: "Webhooks", color: "slate", icon: "github" },
                  { name: "Resend", type: "Email APIs", color: "slate", icon: "resend" },
                ]).map((tool, idx) => (
                  <div
                    key={`${tool.name}-${idx}`}
                    className="floating-pill group px-3.5 py-2 rounded-2xl bg-white/90 backdrop-blur-xl border border-slate-200/90 shadow-sm hover:border-rose-400 hover:shadow-[0_8px_20px_-4px_rgba(244,63,94,0.25)] hover:-translate-y-1 transition-all duration-200 flex items-center gap-2.5 shrink-0 cursor-default"
                  >
                    <div className="w-6 h-6 rounded-lg bg-slate-50 border border-slate-200/70 flex items-center justify-center text-xs font-bold">
                      {tool.icon === "openai" && (
                        <svg className="w-3.5 h-3.5 text-emerald-600" viewBox="0 0 24 24" fill="currentColor"><path d="M22.28 9.82a5.98 5.98 0 0 0-.51-4.91 6.05 6.05 0 0 0-6.51-2.9 6.07 6.07 0 0 0-4.28 2.17 5.98 5.98 0 0 0-4 2.9 6.05 6.05 0 0 0 .74 7.1 5.98 5.98 0 0 0 .51 4.91 6.05 6.05 0 0 0 6.51 2.9 5.98 5.98 0 0 0 3.74 1.91 6.06 6.06 0 0 0 5.77-4.2 5.99 5.99 0 0 0 4-2.9 6.06 6.06 0 0 0-.75-7.08zm-9.02 12.61a4.48 4.48 0 0 1-2.88-1.04l.14-.08 4.78-2.76a.8.8 0 0 0 .39-.68v-6.74l2.02 1.17c.02.01.04.03.04.05v5.58a4.5 4.5 0 0 1-4.49 4.5zM3.6 17.91a4.47 4.47 0 0 1-.53-3.01l.14.08 4.78 2.76a.77.77 0 0 0 .78 0l5.85-3.37v2.33c0 .03-.02.05-.04.06L9.74 19.95a4.5 4.5 0 0 1-6.14-2.04zm-1.88-8.84a4.47 4.47 0 0 1 2.34-1.97l-.01.16v5.52a.78.78 0 0 0 .39.68l5.84 3.37-2.02 1.17a.08.08 0 0 1-.07 0l-4.83-2.8a4.5 4.5 0 0 1-1.64-6.13zm16.6 3.86-5.85-3.37 2.02-1.17a.08.08 0 0 1 .07 0l4.83 2.8a4.5 4.5 0 0 1-.68 8.1v-5.68a.79.79 0 0 0-.39-.68zm2.01-3.02-.14-.09-4.78-2.78a.78.78 0 0 0-.78 0L8.81 10.4V8.07c0-.02.01-.05.03-.06l4.88-2.82a4.5 4.5 0 0 1 6.68 4.2zM12 13.5l-2.6-1.5L12 10.5l2.6 1.5-2.6 1.5z"/></svg>
                      )}
                      {tool.icon === "claude" && <span className="text-[#D97757] font-serif font-black">C</span>}
                      {tool.icon === "stripe" && <span className="text-[#635BFF] font-mono font-bold">S</span>}
                      {tool.icon === "postgres" && (
                        <svg className="w-3.5 h-3.5 text-[#336791]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"/></svg>
                      )}
                      {tool.icon === "aws" && (
                        <svg className="w-3.5 h-3.5 text-[#FF9900]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>
                      )}
                      {tool.icon === "langchain" && <span>🦜</span>}
                      {tool.icon === "supabase" && (
                        <svg className="w-3.5 h-3.5 text-[#3ECF8E]" viewBox="0 0 24 24" fill="currentColor"><path d="M21.36 9.87a1.44 1.44 0 0 0-1.2-.64H13.5V1.44A1.44 1.44 0 0 0 11.04.42l-9.6 12.24a1.44 1.44 0 0 0 1.13 2.32h6.67v7.79a1.44 1.44 0 0 0 2.46 1.02l9.6-12.24a1.44 1.44 0 0 0 .06-1.68z"/></svg>
                      )}
                      {tool.icon === "pinecone" && (
                        <svg className="w-3.5 h-3.5 text-cyan-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                      )}
                      {tool.icon === "redis" && (
                        <svg className="w-3.5 h-3.5 text-[#DC382D]" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7.5v9L12 22l10-5.5v-9L12 2zm0 3.3l7 3.85-7 3.85-7-3.85 7-3.85zM4.5 9.8l6.5 3.58v6.82L4.5 16.62V9.8zm15 6.82l-6.5 3.58v-6.82l6.5-3.58v6.82z"/></svg>
                      )}
                      {tool.icon === "vercel" && (
                        <svg className="w-3 h-3 text-slate-900" viewBox="0 0 24 24" fill="currentColor"><path d="m12 1 12 21H0z"/></svg>
                      )}
                      {tool.icon === "github" && (
                        <svg className="w-3.5 h-3.5 text-slate-900" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
                      )}
                      {tool.icon === "resend" && <span className="text-slate-900 font-mono">✉</span>}
                    </div>
                    <span className="text-xs font-bold text-slate-800">{tool.name}</span>
                    <span className="text-[10px] font-mono text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded font-semibold border border-slate-200/80">
                      {tool.type}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION: HOW IT WORKS (3-STEP DEVELOPER INTEGRATION WALKTHROUGH)          */}
        {/* ========================================================================= */}
        <section className="relative pt-16 pb-12 px-4 max-w-6xl mx-auto" id="how-it-works" data-purpose="developer-sdk-steps">
          <div className="text-center mb-8 sm:mb-10">
            <span className="px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-rose-100 text-rose-700 border border-rose-200">
              INTEGRATION IN 2 MINUTES
            </span>
            <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-950 tracking-tight">
              HOW FLUXERA WORKS
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
              Click each step below to inspect the code, payload, and financial formula in the live terminal.
            </p>
          </div>

          {/* MOBILE-ONLY SEGMENTED TABS (Visible on < lg screens) */}
          <div className="lg:hidden mb-4">
            <div className="flex items-center justify-between p-1 bg-slate-100 rounded-2xl border border-slate-200">
              <button
                type="button"
                onClick={() => setSdkStep(1)}
                className={`flex-1 py-2 px-2 text-center rounded-xl font-mono text-xs font-bold transition-all ${
                  sdkStep === 1
                    ? "bg-white text-rose-600 shadow-sm border border-rose-200/80"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                01 Wrap API
              </button>
              <button
                type="button"
                onClick={() => setSdkStep(2)}
                className={`flex-1 py-2 px-2 text-center rounded-xl font-mono text-xs font-semibold transition-all ${
                  sdkStep === 2
                    ? "bg-white text-rose-600 shadow-sm border border-rose-200/80"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                02 Telemetry
              </button>
              <button
                type="button"
                onClick={() => setSdkStep(3)}
                className={`flex-1 py-2 px-2 text-center rounded-xl font-mono text-xs font-semibold transition-all ${
                  sdkStep === 3
                    ? "bg-white text-rose-600 shadow-sm border border-rose-200/80"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                03 Dollars
              </button>
            </div>

            {/* Mobile Active Step Info Banner */}
            <div className="mt-3 p-4 rounded-2xl bg-white border border-slate-200 shadow-xs text-left">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-mono font-bold tracking-widest text-rose-600 uppercase">
                  STEP {sdkStep}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
              </div>
              <h4 className="text-base font-bold text-slate-900">
                {sdkStep === 1 ? "Wrap your API calls" : sdkStep === 2 ? "Every call is logged" : "Failures become dollars"}
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                {sdkStep === 1 && "Install the SDK. Wrap the API calls you want tracked with a small function call."}
                {sdkStep === 2 && "Success, failure, latency, and cost are recorded automatically. Nothing changes about how your API behaves."}
                {sdkStep === 3 && (
                  <span>
                    <code className="font-mono text-xs bg-rose-50 text-rose-700 px-1 py-0.5 rounded border border-rose-100">failed_requests × avg_price</code> is the failed API cost — always shown.
                  </span>
                )}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* DESKTOP LEFT COLUMN: 3 CLICKABLE STEP BUTTONS/CARDS (Hidden on < lg) */}
            <div className="hidden lg:flex lg:col-span-5 flex-col justify-between gap-3.5">
              {/* Step 1 Button */}
              <button
                type="button"
                onClick={() => setSdkStep(1)}
                className={`text-left p-5 sm:p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer w-full ${
                  sdkStep === 1
                    ? "bg-white shadow-md border-rose-500 ring-2 ring-rose-500/20"
                    : "bg-white/70 hover:bg-white border-slate-200 shadow-sm hover:border-slate-300"
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`text-[11px] font-mono font-bold tracking-widest uppercase ${sdkStep === 1 ? "text-rose-600" : "text-slate-400"}`}>
                    STEP 1
                  </span>
                  <span className={`w-2.5 h-2.5 rounded-full ${sdkStep === 1 ? "bg-rose-500" : "bg-transparent"}`}></span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight mb-1.5">Wrap your API calls</h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  Install the SDK. Wrap the API calls you want tracked with a small function call.
                </p>
              </button>

              {/* Step 2 Button */}
              <button
                type="button"
                onClick={() => setSdkStep(2)}
                className={`text-left p-5 sm:p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer w-full ${
                  sdkStep === 2
                    ? "bg-white shadow-md border-rose-500 ring-2 ring-rose-500/20"
                    : "bg-white/70 hover:bg-white border-slate-200 shadow-sm hover:border-slate-300"
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`text-[11px] font-mono font-bold tracking-widest uppercase ${sdkStep === 2 ? "text-rose-600" : "text-slate-400"}`}>
                    STEP 2
                  </span>
                  <span className={`w-2.5 h-2.5 rounded-full ${sdkStep === 2 ? "bg-rose-500" : "bg-transparent"}`}></span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight mb-1.5">Every call is logged</h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  Success, failure, latency, and cost are recorded automatically. Nothing changes about how your API behaves.
                </p>
              </button>

              {/* Step 3 Button */}
              <button
                type="button"
                onClick={() => setSdkStep(3)}
                className={`text-left p-5 sm:p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer w-full ${
                  sdkStep === 3
                    ? "bg-white shadow-md border-rose-500 ring-2 ring-rose-500/20"
                    : "bg-white/70 hover:bg-white border-slate-200 shadow-sm hover:border-slate-300"
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`text-[11px] font-mono font-bold tracking-widest uppercase ${sdkStep === 3 ? "text-rose-600" : "text-slate-400"}`}>
                    STEP 3
                  </span>
                  <span className={`w-2.5 h-2.5 rounded-full ${sdkStep === 3 ? "bg-rose-500" : "bg-transparent"}`}></span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight mb-1.5">Failures become dollars</h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  <code className="font-mono text-xs bg-rose-50 text-rose-700 px-1.5 py-0.5 rounded border border-rose-100">failed_requests × avg_price</code> is the failed API cost — always shown.
                </p>
              </button>
            </div>

            {/* RIGHT COLUMN: DYNAMIC LIVE TERMINAL WINDOW */}
            <div className="lg:col-span-7 flex flex-col">
              <div className="bg-[#070b14] rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl border border-slate-800/90 flex flex-col justify-between h-full min-h-[320px] sm:min-h-[360px] relative overflow-hidden text-left">
                {/* Terminal Header */}
                <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-slate-800/80 mb-3 sm:mb-5">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-rose-500/90"></span>
                    <span className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-amber-400/90"></span>
                    <span className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-emerald-400/90"></span>
                    <span className="ml-2 sm:ml-3 font-mono text-[11px] sm:text-xs text-slate-400 font-medium">
                      {sdkStep === 1 ? "fluxera-sdk.js" : sdkStep === 2 ? "telemetry-event.json" : "cost-analytics.ts"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-[10px] sm:text-[11px] text-slate-500">
                    <span className={`px-2 sm:px-2.5 py-0.5 rounded-md font-semibold border ${
                      sdkStep === 1
                        ? "bg-rose-950/60 border-rose-800/70 text-rose-400"
                        : sdkStep === 2
                        ? "bg-cyan-950/60 border-cyan-800/70 text-cyan-400"
                        : "bg-amber-950/60 border-amber-800/70 text-amber-400"
                    }`}>
                      Step {sdkStep} of 3
                    </span>
                  </div>
                </div>

                {/* Dynamic Terminal Body */}
                <div className="flex-1 flex flex-col justify-center overflow-x-auto py-2">
                  {sdkStep === 1 && (
                    <pre className="font-mono text-[11px] sm:text-xs md:text-sm text-slate-200 leading-relaxed overflow-x-auto"><code><span className="text-[#ff5c8a]">const</span> fluxera = <span className="text-[#38bdf8]">require</span>(<span className="text-[#34d399]">'@fluxera/sdk'</span>)(<span className="text-[#fbbf24]">'fx_your_key'</span>){'\n\n'}<span className="text-[#ff5c8a]">const</span> result = <span className="text-[#ff5c8a]">await</span> fluxera.<span className="text-[#38bdf8]">track</span>({'\n'}  () =&gt; <span className="text-[#fbbf24]">your_api_call</span>(),{'\n'}  {`{ endpoint: `}<span className="text-[#34d399]">'/v1/chat'</span>{`, price: `}<span className="text-[#facc15]">0.04</span>{` }`}{'\n'})</code></pre>
                  )}
                  {sdkStep === 2 && (
                    <pre className="font-mono text-[11px] sm:text-xs md:text-sm text-slate-200 leading-relaxed overflow-x-auto"><code>{`{\n  `}<span className="text-[#38bdf8]">"endpoint"</span>: <span className="text-[#34d399]">"/v1/chat"</span>,{`\n  `}<span className="text-[#38bdf8]">"status"</span>: <span className="text-[#ff5c8a]">"fail"</span>,{`\n  `}<span className="text-[#38bdf8]">"latency_ms"</span>: <span className="text-[#facc15]">4200</span>,{`\n  `}<span className="text-[#38bdf8]">"price"</span>: <span className="text-[#facc15]">0.04</span>,{`\n  `}<span className="text-[#38bdf8]">"error_type"</span>: <span className="text-[#ff5c8a]">"timeout"</span>{`\n}`}</code></pre>
                  )}
                  {sdkStep === 3 && (
                    <pre className="font-mono text-[11px] sm:text-xs md:text-sm text-slate-200 leading-relaxed overflow-x-auto"><code><span className="text-[#38bdf8]">failed_api_cost</span> = <span className="text-slate-300">failed_requests</span> × <span className="text-slate-300">avg_price</span>{`\n\n`}<span className="text-[#64748b]">// Only if you've set these in Settings:</span>{`\n`}<span className="text-[#fbbf24]">revenue_at_risk</span> = (<span className="text-slate-300">failed_requests</span> × <span className="text-slate-300">abandonment_rate</span>){`\n                  `}× <span className="text-slate-300">avg_order_value</span>{`\n\n`}<span className="text-slate-400">Example:</span>{`\n`}<span className="text-[#34d399]">140 failures</span> × <span className="text-[#facc15]">$0.05</span> = <span className="text-[#fb7185] font-bold">$7.00 failed API cost</span></code></pre>
                  )}
                </div>

                {/* Terminal Footer Status */}
                <div className="pt-3 sm:pt-4 mt-3 sm:mt-4 border-t border-slate-800/80 flex items-center justify-between text-[10px] sm:text-xs font-mono text-slate-500">
                  <span className="flex items-center gap-1.5 truncate">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
                    <span className="truncate">
                      {sdkStep === 1
                        ? "Ready to execute in Node.js / Python"
                        : sdkStep === 2
                        ? "Auto-logged telemetry packet emitted"
                        : "Financial impact formula evaluated"}
                    </span>
                  </span>
                  <span className="text-slate-600 shrink-0 ml-2">UTF-8</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 1: VERBATIM EXPANSION & FAILURE CASCADE                          */}
        {/* ========================================================================= */}
        <section className="relative pt-12 pb-16 px-4 max-w-5xl mx-auto" data-purpose="cascade-deepdive">
          <div className="futuristic-card p-8 sm:p-12 text-center border-slate-200/90 shadow-xl bg-white/95">
            {/* Verbatim Intro Copy */}
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
              Software is becoming more connected.
            </h3>
            <p className="mt-4 text-base sm:text-lg text-slate-600 font-medium max-w-2xl mx-auto">
              Every dependency creates another possible point of failure.
            </p>
            <p className="text-xs sm:text-sm uppercase tracking-wider font-extrabold text-slate-500 pt-5">
              And when one fails, the impact can spread:
            </p>

            {/* Verbatim Flow Chain */}
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm font-bold">
              <div className="px-4 py-2 rounded-2xl bg-rose-50 text-rose-700 border border-rose-200 shadow-sm flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                <span>Failure</span>
              </div>
              <span className="text-slate-400 font-black">→</span>
              <div className="px-4 py-2 rounded-2xl bg-amber-50 text-amber-800 border border-amber-200 shadow-sm flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                <span>Interrupted Work</span>
              </div>
              <span className="text-slate-400 font-black">→</span>
              <div className="px-4 py-2 rounded-2xl bg-rose-50 text-rose-700 border border-rose-200 shadow-sm flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                <span>User Impact</span>
              </div>
              <span className="text-slate-400 font-black">→</span>
              <div className="px-4 py-2 rounded-2xl bg-amber-50 text-amber-800 border border-amber-200 shadow-sm flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                <span>Wasted Cost</span>
              </div>
              <span className="text-slate-400 font-black">→</span>
              <div className="px-4 py-2 rounded-2xl bg-rose-100 text-rose-950 border border-rose-300 shadow-md flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse"></span>
                <span>Business Impact</span>
              </div>
            </div>

            {/* Verbatim Punchline */}
            <div className="mt-8 p-4 rounded-2xl bg-gradient-to-r from-rose-50 via-white to-sky-50 border border-rose-200/80 max-w-2xl mx-auto shadow-sm">
              <p className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                The problem isn't simply that software breaks. It's what happens after it breaks.
              </p>
            </div>
          </div>
        </section>

        {/* CONNECTOR LINE: Cascade to Why SaaS Grid */}
        <div aria-hidden="true" className="relative w-full flex flex-col items-center justify-center my-1 pointer-events-none z-10">
          <div className="h-20 circuit-line-stem rounded-full">
            <div className="pulse-dot-vertical"></div>
          </div>
          <div className="w-4 h-4 rounded-full border-2 border-rose-500 bg-white flex items-center justify-center shadow-md shadow-rose-500/30">
            <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping"></div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SECTION A: WHY SAAS COMPANIES NEED FLUXERA (BENTO 3D GRID + WHITE iPHONE) */}
        {/* ========================================================================= */}
        <section className="relative py-16 px-4 max-w-6xl mx-auto" id="why-fluxera">
          <div className="text-center mb-12 relative z-10">
            <span className="px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-rose-100 text-rose-700 border border-rose-200">
              THE PROBLEM SPACE
            </span>
            <h2 className="mt-4 text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight">
              WHY SAAS COMPANIES NEED FLUXERA
            </h2>
            <div className="mt-4 max-w-2xl mx-auto space-y-2">
              <p className="text-base text-slate-700 font-medium">
                A workflow can be mostly complete when one dependency fails.
              </p>
              <p className="text-sm text-slate-600">
                Without recovery, software may repeat work, waste compute and API spend, lose progress, frustrate users, and create business losses.
              </p>
              <p className="text-base sm:text-lg text-rose-600 font-bold pt-1">
                Your software can be running while your work is failing.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-7 relative z-10">
            {/* Card 1: Traditional Observability vs Modern SaaS Needs */}
            <div className="md:col-span-12 futuristic-card p-8 relative overflow-hidden border border-slate-200/90">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Traditional side */}
                <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-slate-200/80 pb-6 lg:pb-0 lg:pr-8 text-left">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-3">
                    Traditional Observability
                  </div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Traditional observability tells you:</p>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight mt-1">
                    “Something failed.”
                  </h3>
                  <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                    Pages engineers with empty alerts. Fails to save in-flight tokens, state, or user sessions.
                  </p>
                  <div className="mt-5 p-3.5 rounded-2xl bg-slate-100/80 border border-slate-200 text-xs font-mono text-slate-700">
                    <span className="text-amber-600 font-bold">⚠️ HTTP 502 at Step 8/9</span><br />
                    <span className="text-rose-600 font-semibold">State dropped. Customer forced to restart.</span>
                  </div>
                </div>

                {/* Modern SaaS Needs side (Verbatim 6 Questions) */}
                <div className="lg:col-span-7 bg-white/90 border border-rose-200/80 rounded-3xl p-6 shadow-xl shadow-rose-500/5 relative text-left">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                    <div>
                      <h4 className="text-sm font-extrabold text-slate-900">But modern SaaS needs to know:</h4>
                      <p className="text-[11px] text-slate-500">Autonomous recovery answers what traditional alerts ignore</p>
                    </div>
                    <span className="text-[10px] font-bold text-rose-700 bg-rose-100 px-2.5 py-1 rounded-full border border-rose-200">
                      Closed-Loop Answers
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    {[
                      { q: "Why did it fail?", d: "Pinpoint upstream dependencies & root cause.", color: "bg-rose-50/70 border-rose-200/70 text-rose-950" },
                      { q: "What did it affect?", d: "Trace downstream tasks & blast radius.", color: "bg-rose-50/70 border-rose-200/70 text-rose-950" },
                      { q: "What work was lost?", d: "Audit in-flight progress & interrupted state.", color: "bg-amber-50/70 border-amber-200/70 text-amber-950" },
                      { q: "What did it cost?", d: "Measure wasted compute, tokens & API fees.", color: "bg-sky-50/70 border-sky-200/70 text-sky-950" },
                      { q: "What can be recovered?", d: "Resume deterministically from point of halt.", color: "bg-emerald-50/80 border-emerald-200/80 text-emerald-950" },
                      { q: "Did recovery actually work?", d: "Verify expected end-state completion.", color: "bg-indigo-50/80 border-indigo-200/80 text-indigo-950" },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        onClick={() => setActiveQuestion(idx)}
                        className={`p-3 rounded-2xl border transition-all cursor-pointer ${item.color} ${activeQuestion === idx ? "ring-2 ring-rose-400 shadow-md scale-[1.02]" : "hover:shadow-sm"}`}
                      >
                        <span className="font-bold block text-[13px]">{item.q}</span>
                        <span className="text-slate-600 text-[11px] mt-0.5 block">{item.d}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: 3D Holographic circular gauge pod for "94% Work Preserved" */}
            <div className="md:col-span-6 futuristic-card p-8 relative overflow-hidden flex flex-col justify-between text-left">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span> Work Recovery Pod
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 mt-3">Prevent Cascading State Restarts</h3>
                <p className="text-xs text-slate-600 mt-1">
                  Why restart multi-step runs from scratch when one API drops? Fluxera preserves in-flight states.
                </p>
              </div>

              {/* 3D Circular Gauge */}
              <div className="my-6 flex flex-col items-center justify-center relative">
                <div className="relative w-44 h-44 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border border-dashed border-rose-300/60 gauge-glow-ring"></div>
                  <div className="absolute inset-2 rounded-full border border-sky-200/50"></div>
                  <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" fill="transparent" r="40" stroke="#f1f5f9" strokeLinecap="round" strokeWidth="7"></circle>
                    <circle
                      className="filter drop-shadow-[0_0_8px_rgba(244,63,94,0.45)]"
                      cx="50"
                      cy="50"
                      fill="transparent"
                      r="40"
                      stroke="url(#roseHoloGauge)"
                      strokeDasharray="251"
                      strokeDashoffset="15"
                      strokeLinecap="round"
                      strokeWidth="8"
                    ></circle>
                    <defs>
                      <linearGradient id="roseHoloGauge" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#f43f5e"></stop>
                        <stop offset="60%" stopColor="#fb7185"></stop>
                        <stop offset="100%" stopColor="#38bdf8"></stop>
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-4xl font-black text-slate-900 tracking-tight">{gaugeValue}%</span>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Work Preserved</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-600 mt-3 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Zero Cold Reruns on Mid-Flight Failures
                </span>
              </div>
            </div>

            {/* Card 3: 3D Glass Graph Pod for "Zero Compute Drain" */}
            <div className="md:col-span-6 futuristic-card p-8 relative overflow-hidden flex flex-col justify-between text-left">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-800 border border-sky-200 text-xs font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500"></span> Zero Compute Drain
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 mt-3">Slashes Unnecessary Retries</h3>
                <p className="text-xs text-slate-600 mt-1">
                  Eliminate silent token expenditure and cloud run churn by replaying only the severed node.
                </p>
              </div>

              {/* Futuristic Graph Pod */}
              <div className="my-4 relative pt-4">
                <div className="flex items-center justify-between mb-3 bg-white/80 p-2.5 rounded-2xl border border-slate-200 shadow-sm">
                  <div>
                    <span className="text-[10px] text-slate-500 font-medium">Token Waste Prevented</span>
                    <div className="text-sm font-extrabold text-slate-900">$18,450 / mo avg</div>
                  </div>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-xl border border-emerald-200">
                    -88% Spend Waste
                  </span>
                </div>
                <svg className="w-full h-32" fill="none" viewBox="0 0 320 110">
                  <defs>
                    <linearGradient id="glowCurveGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.3"></stop>
                      <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.0"></stop>
                    </linearGradient>
                  </defs>
                  <path d="M5 95 Q 40 90, 80 85 T 160 75 T 240 68 T 315 62" stroke="#94a3b8" strokeDasharray="3,3" strokeWidth="2"></path>
                  <path d="M5 75 Q 40 50, 80 32 T 160 20 T 240 12 T 315 10 L 315 110 L 5 110 Z" fill="url(#glowCurveGrad)"></path>
                  <path className="filter drop-shadow-[0_0_6px_rgba(244,63,94,0.45)]" d="M5 75 Q 40 50, 80 32 T 160 20 T 240 12 T 315 10" stroke="#f43f5e" strokeLinecap="round" strokeWidth="3"></path>
                  <circle cx="240" cy="12" fill="#FFFFFF" r="4.5" stroke="#f43f5e" strokeWidth="3"></circle>
                </svg>
                <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2">
                  <span className="flex items-center gap-1.5 font-semibold text-rose-600">
                    <span className="w-2 h-2 rounded-full bg-rose-500"></span> Fluxera Resumption
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-slate-400"></span> Silent Compute Drain
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* INTEGRATED SHOWCASE: MOBILE ON-CALL WITH PURE WHITE 3D iPHONE             */}
          {/* ========================================================================= */}
          <div className="mt-8 futuristic-card p-8 sm:p-10 relative overflow-hidden border border-slate-200/90 bg-gradient-to-br from-white via-rose-50/20 to-sky-50/20 text-left">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Feature Explanation */}
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-rose-100 text-rose-700 border border-rose-200">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
                  REAL-TIME TELEMETRY ON ANY DEVICE
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight leading-tight">
                  Live Autonomous Recovery in the Palm of Your Hand
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                  Whether managing complex agent workflows, database deadlocks, or third-party webhooks, Fluxera automatically checkpoints state in-flight and broadcasts instant recovery confirmations to your on-call engineers.
                </p>
                <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-2xl bg-white/90 border border-slate-200 shadow-sm">
                    <span className="font-bold text-slate-900 block text-xs">Dynamic Island Alerts</span>
                    <span className="text-slate-500 text-[11px] mt-0.5 block">Sub-15ms push notices for intercepted cascades</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white/90 border border-slate-200 shadow-sm">
                    <span className="font-bold text-slate-900 block text-xs">Zero-Cold-Rerun SLA</span>
                    <span className="text-slate-500 text-[11px] mt-0.5 block">Instant confirmation of preserved runtime state</span>
                  </div>
                </div>
                <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-bold text-slate-700">
                  <span className="flex items-center gap-1.5 text-emerald-600">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span> 99.98% Checkpoint Fidelity
                  </span>
                  <span className="text-slate-300 hidden sm:inline">•</span>
                  <span className="flex items-center gap-1.5 text-rose-600">
                    <span className="w-2 h-2 rounded-full bg-rose-500"></span> Real-time Deterministic Replay
                  </span>
                </div>
              </div>

              {/* Right Column: 3D HALF-CROPPED / HALF-FLOATING PURE WHITE iPHONE */}
              <div className="lg:col-span-5 relative flex justify-center lg:justify-end overflow-hidden pt-4 pb-0 h-[390px] lg:h-[410px]">
                <div className="iphone-integrated-stage w-72 relative">
                  {/* The iPhone chassis with Pure White background & Silver/White Bezel */}
                  <div className="iphone-half-peek rounded-t-[44px] rounded-b-none p-3 pb-16 bg-white border-t-2 border-x-2 border-slate-200 shadow-2xl relative w-full h-[520px]">
                    {/* Titanium Silver Rim Highlight */}
                    <div className="absolute inset-0 rounded-t-[44px] border-t-2 border-x-2 border-white pointer-events-none"></div>

                    {/* Inner Pure White OLED Display Container */}
                    <div className="rounded-t-[36px] bg-white overflow-hidden text-slate-900 p-3.5 border-t border-x border-slate-200 shadow-sm relative h-full">
                      {/* Dynamic Island with Real-Time Pill Alert (Clean White / Light Metallic) */}
                      <div className="w-52 h-6 mx-auto bg-slate-900 text-white rounded-full flex items-center justify-between px-3 mb-3 shadow-md border border-slate-800">
                        <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                        <span className="text-[8px] text-rose-200 font-mono font-bold tracking-tight">⚠️ Stripe 502 • Resumed 12ms</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      </div>

                      {/* Status Bar */}
                      <div className="flex items-center justify-between text-[10px] text-slate-500 font-semibold px-1 mb-2.5">
                        <span>9:41</span>
                        <span className="text-rose-600 text-[9px] font-bold">FLUXERA ON-CALL</span>
                        <div className="flex items-center gap-1">
                          <span className="text-slate-600">5G</span>
                          <div className="w-4 h-2 border border-slate-400 rounded-xs p-0.5">
                            <div className="h-full w-full bg-emerald-500"></div>
                          </div>
                        </div>
                      </div>

                      {/* Push Notification Alert (Crisp Pure White Surface) */}
                      <div className="p-3 rounded-2xl bg-rose-50/90 border border-rose-200 shadow-sm mb-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="flex items-center gap-1 text-[10px] font-bold text-rose-700">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping"></span>
                            INCIDENT INTERCEPTED
                          </span>
                          <span className="text-[9px] text-slate-500 font-mono">12ms ago</span>
                        </div>
                        <p className="text-[11px] font-bold text-slate-900 leading-tight">Stripe Auth 502 Gateway Dropped</p>
                        <p className="text-[10px] text-emerald-700 font-mono font-semibold mt-0.5">$14,783 in-flight state saved</p>
                      </div>

                      {/* Live Mobile Telemetry Metric Tile */}
                      <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 mb-2.5">
                        <div className="flex items-center justify-between text-[10px] text-slate-600 mb-1">
                          <span className="font-medium">Deterministic Replay Engine</span>
                          <span className="text-emerald-600 font-bold">94.2%</span>
                        </div>
                        <div className="h-10 w-full">
                          <svg className="w-full h-full" viewBox="0 0 100 40">
                            <path d="M0,30 Q25,35 50,15 T100,8" fill="none" stroke="#f43f5e" strokeWidth="2.2"></path>
                            <path d="M0,30 Q25,35 50,15 T100,8 L100,40 L0,40 Z" fill="rgba(244,63,94,0.12)"></path>
                            <circle cx="50" cy="15" fill="#38bdf8" r="2.5"></circle>
                          </svg>
                        </div>
                      </div>

                      {/* Verified Chip */}
                      <div className="p-2 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                        <span className="text-[10px] font-semibold text-emerald-800">Auto-Checkpoint Verified</span>
                        <span className="text-[10px] bg-emerald-600 text-white font-bold px-2 py-0.5 rounded-full shadow-xs">
                          RECOVERED
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Gradient Mask Fading Bottom */}
                  <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none z-20"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONNECTOR LINE: Why SaaS Grid to The 4 Pillars */}
        <div aria-hidden="true" className="relative w-full flex flex-col items-center justify-center my-1 pointer-events-none z-10">
          <div className="h-20 circuit-line-stem rounded-full">
            <div className="pulse-dot-vertical"></div>
          </div>
          <div className="w-4 h-4 rounded-full border-2 border-rose-500 bg-white flex items-center justify-center shadow-md shadow-rose-500/30">
            <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping"></div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SECTION B: THE 4 PILLARS AS 3D FLOATING HOLOGRAPHIC TILES                */}
        {/* ========================================================================= */}
        <section className="relative py-16 px-4 max-w-6xl mx-auto" id="recovery-engine">
          <div className="text-center mb-14">
            <span className="px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-rose-100 text-rose-700 border border-rose-200">
              FLUXERA
            </span>
            <h2 className="mt-4 text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight">
              THE RELIABILITY INTELLIGENCE &amp; RECOVERY LAYER
            </h2>
            <p className="mt-3 text-base text-slate-600 max-w-2xl mx-auto font-medium">
              Fluxera connects failures across your software and turns them into actionable recovery.
            </p>
          </div>

          {/* 4 Floating 3D Tiles with Circuit Connector Branching */}
          <div className="relative">
            <div className="hidden lg:block absolute top-12 left-10 right-10 h-0.5 bg-gradient-to-r from-rose-300 via-amber-300 to-sky-300 opacity-60 z-0"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10 text-left">
              {/* Pillar 01: UNDERSTAND */}
              <div className="pillar-tile-3d p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black text-rose-600 font-mono tracking-tight">01</span>
                    <span className="w-8 h-8 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center font-bold text-xs shadow-sm">
                      🔍
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-slate-900 tracking-tight uppercase">UNDERSTAND</h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed font-medium">
                    Find the root cause and failure chain.
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-100 text-[11px] font-bold text-rose-600 flex items-center justify-between">
                  <span>Root Cause Isolation</span>
                  <span>→</span>
                </div>
              </div>

              {/* Pillar 02: QUANTIFY */}
              <div className="pillar-tile-3d p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black text-amber-500 font-mono tracking-tight">02</span>
                    <span className="w-8 h-8 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold text-xs shadow-sm">
                      💰
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-slate-900 tracking-tight uppercase">QUANTIFY</h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed font-medium">
                    Measure affected work, users, costs, and business impact.
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-100 text-[11px] font-bold text-amber-600 flex items-center justify-between">
                  <span>Dollarized Impact</span>
                  <span>→</span>
                </div>
              </div>

              {/* Pillar 03: RECOVER */}
              <div className="pillar-tile-3d p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black text-emerald-500 font-mono tracking-tight">03</span>
                    <span className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-xs shadow-sm">
                      ⚡
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-slate-900 tracking-tight uppercase">RECOVER</h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed font-medium">
                    Retry, resume, restore, replay, or rerun supported failures.
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-100 text-[11px] font-bold text-emerald-600 flex items-center justify-between">
                  <span>Deterministic Replay</span>
                  <span>→</span>
                </div>
              </div>

              {/* Pillar 04: VERIFY */}
              <div className="pillar-tile-3d p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black text-sky-500 font-mono tracking-tight">04</span>
                    <span className="w-8 h-8 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center font-bold text-xs shadow-sm">
                      🛡️
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-slate-900 tracking-tight uppercase">VERIFY</h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed font-medium">
                    Confirm the intended outcome was actually restored.
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-100 text-[11px] font-bold text-sky-600 flex items-center justify-between">
                  <span>Closed-Loop Verification</span>
                  <span>→</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONNECTOR LINE: Pillars to Cybernetic Pipeline */}
        <div aria-hidden="true" className="relative w-full flex flex-col items-center justify-center my-1 pointer-events-none z-10">
          <div className="h-20 circuit-line-stem rounded-full">
            <div className="pulse-dot-vertical"></div>
          </div>
          <div className="w-4 h-4 rounded-full border-2 border-rose-500 bg-white flex items-center justify-center shadow-md shadow-rose-500/30">
            <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping"></div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SECTION C: FROM FAILURE TO VALUE CYBERNETIC PIPELINE (7 STEPS VERBATIM)   */}
        {/* ========================================================================= */}
        <section className="relative py-16 px-4 overflow-hidden" id="impact-chain">
          <div className="max-w-4xl mx-auto text-center relative z-10 mb-14">
            <span className="px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-rose-100 text-rose-700 border border-rose-200">
              CYBERNETIC PIPELINE
            </span>
            <h2 className="mt-4 text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight">
              FROM FAILURE TO VALUE
            </h2>
            <p className="mt-3 text-base sm:text-lg text-slate-700 font-semibold max-w-xl mx-auto">
              Fluxera connects the entire chain.
            </p>
          </div>

          {/* DESKTOP PIPELINE CHAIN (md: and above) */}
          <div className="hidden md:block relative max-w-6xl mx-auto my-6 px-4">
            {/* Fiber-optic laser rail running behind nodes */}
            <div className="hidden xl:block absolute top-1/2 left-8 right-8 h-1.5 -translate-y-1/2 fiber-laser-line rounded-full z-0">
              <div className="laser-beam-pulse"></div>
            </div>

            {/* 7 Stages Grid */}
            <div className="grid grid-cols-4 xl:grid-cols-7 gap-3.5 relative z-10">
              {/* Step 1: Technical Failure */}
              <div className="p-3.5 rounded-2xl bg-white border border-slate-200 text-center shadow-lg hover:border-rose-400 transition-all hover:-translate-y-1.5 cursor-pointer backdrop-blur-md">
                <div className="w-6 h-6 mx-auto rounded-full bg-rose-100 text-rose-600 font-bold text-xs flex items-center justify-center mb-1.5">01</div>
                <div className="text-[9px] font-bold text-rose-600 uppercase">Trigger</div>
                <div className="text-xs font-extrabold text-slate-900 mt-0.5">Technical Failure</div>
                <span className="text-[9px] text-slate-400 block mt-1">↓</span>
              </div>

              {/* Step 2: System Impact */}
              <div className="p-3.5 rounded-2xl bg-white border border-slate-200 text-center shadow-lg hover:border-amber-400 transition-all hover:-translate-y-1.5 cursor-pointer backdrop-blur-md">
                <div className="w-6 h-6 mx-auto rounded-full bg-amber-100 text-amber-600 font-bold text-xs flex items-center justify-center mb-1.5">02</div>
                <div className="text-[9px] font-bold text-amber-500 uppercase">Cascade</div>
                <div className="text-xs font-extrabold text-slate-900 mt-0.5">System Impact</div>
                <span className="text-[9px] text-slate-400 block mt-1">↓</span>
              </div>

              {/* Step 3: Work Impact */}
              <div className="p-3.5 rounded-2xl bg-white border border-slate-200 text-center shadow-lg hover:border-rose-400 transition-all hover:-translate-y-1.5 cursor-pointer backdrop-blur-md">
                <div className="w-6 h-6 mx-auto rounded-full bg-rose-100 text-rose-600 font-bold text-xs flex items-center justify-center mb-1.5">03</div>
                <div className="text-[9px] font-bold text-rose-500 uppercase">Progress</div>
                <div className="text-xs font-extrabold text-slate-900 mt-0.5">Work Impact</div>
                <span className="text-[9px] text-slate-400 block mt-1">↓</span>
              </div>

              {/* Step 4: User Impact */}
              <div className="p-3.5 rounded-2xl bg-white border border-slate-200 text-center shadow-lg hover:border-amber-400 transition-all hover:-translate-y-1.5 cursor-pointer backdrop-blur-md">
                <div className="w-6 h-6 mx-auto rounded-full bg-amber-100 text-amber-700 font-bold text-xs flex items-center justify-center mb-1.5">04</div>
                <div className="text-[9px] font-bold text-amber-600 uppercase">Customer</div>
                <div className="text-xs font-extrabold text-slate-900 mt-0.5">User Impact</div>
                <span className="text-[9px] text-slate-400 block mt-1">↓</span>
              </div>

              {/* Step 5: Business Impact */}
              <div className="p-3.5 rounded-2xl bg-white border border-slate-200 text-center shadow-lg hover:border-rose-400 transition-all hover:-translate-y-1.5 cursor-pointer backdrop-blur-md">
                <div className="w-6 h-6 mx-auto rounded-full bg-rose-100 text-rose-700 font-bold text-xs flex items-center justify-center mb-1.5">05</div>
                <div className="text-[9px] font-bold text-rose-600 uppercase">Financial</div>
                <div className="text-xs font-extrabold text-slate-900 mt-0.5">Business Impact</div>
                <span className="text-[9px] text-slate-400 block mt-1">↓</span>
              </div>

              {/* Step 6: Recovery (Fluxera Engine Highlight) */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-tr from-rose-600 via-rose-500 to-rose-400 border-2 border-white text-white text-center shadow-xl shadow-rose-500/40 hover:-translate-y-2 transition-all cursor-pointer ring-4 ring-rose-200 scale-105">
                <div className="w-6 h-6 mx-auto rounded-full bg-white/20 text-white font-black text-xs flex items-center justify-center mb-1.5">fx</div>
                <div className="text-[9px] font-mono uppercase font-black tracking-wider text-rose-100">Deterministic</div>
                <div className="text-xs font-black mt-0.5">Recovery</div>
                <span className="text-[9px] text-white/90 block mt-1">↓</span>
              </div>

              {/* Step 7: Verified Outcome */}
              <div className="p-3.5 rounded-2xl bg-emerald-50/90 border border-emerald-300 text-center shadow-lg hover:border-emerald-500 transition-all hover:-translate-y-1.5 cursor-pointer backdrop-blur-md">
                <div className="w-6 h-6 mx-auto rounded-full bg-emerald-500 text-white font-bold text-xs flex items-center justify-center mb-1.5">✓</div>
                <div className="text-[9px] font-bold text-emerald-700 uppercase">Closed-Loop</div>
                <div className="text-xs font-extrabold text-slate-900 mt-0.5">Verified Outcome</div>
                <span className="text-[9px] text-emerald-600 font-bold block mt-1">Restored</span>
              </div>
            </div>
          </div>

          {/* MOBILE AUTOMATIC INTERACTIVE CAROUSEL (md:hidden) */}
          <div
            className="md:hidden relative max-w-sm mx-auto px-2"
            onMouseEnter={() => setPipelinePaused(true)}
            onMouseLeave={() => setPipelinePaused(false)}
            onTouchStart={() => setPipelinePaused(true)}
            onTouchEnd={() => setPipelinePaused(false)}
          >
            {/* Carousel Active Card */}
            <div className="relative overflow-hidden rounded-3xl p-1 bg-gradient-to-b from-rose-300/60 via-slate-200 to-sky-300/60 shadow-xl">
              {(() => {
                const stage = pipelineStages[pipelineIndex];
                if (stage.isSpecial) {
                  return (
                    <div className="rounded-[22px] bg-gradient-to-tr from-rose-600 via-rose-500 to-rose-400 p-6 text-center min-h-[220px] flex flex-col justify-between text-white shadow-lg transition-all duration-300">
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[10px] font-mono uppercase font-black px-2.5 py-1 rounded-full bg-white/20 border border-white/30 text-rose-100">
                            STAGE 06 OF 07 • RECOVERY ENGINE
                          </span>
                          <div className="w-8 h-8 rounded-full bg-white/25 text-white font-black text-sm flex items-center justify-center font-mono shadow-sm">
                            {stage.num}
                          </div>
                        </div>
                        <h4 className="text-xl font-black tracking-tight text-white mb-2">{stage.title}</h4>
                        <p className="text-xs text-rose-100 leading-relaxed font-medium">{stage.desc}</p>
                      </div>
                      <div className="pt-3 mt-3 border-t border-white/20 flex items-center justify-between text-[11px] font-bold text-white">
                        <span>Autonomous Failover &amp; Replay</span>
                        <span>⚡ 12ms SLA</span>
                      </div>
                    </div>
                  );
                }
                return (
                  <div className={`rounded-[22px] bg-white p-6 text-center min-h-[220px] flex flex-col justify-between text-slate-900 shadow-md transition-all duration-300 ${stage.isVerified ? 'border-2 border-emerald-300 bg-emerald-50/40' : ''}`}>
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${stage.badgeBg}`}>
                          STAGE {String(pipelineIndex + 1).padStart(2, '0')} OF 07 • {stage.badge}
                        </span>
                        <div className={`w-8 h-8 rounded-full ${stage.numBg} font-extrabold text-sm flex items-center justify-center shadow-sm`}>
                          {stage.num}
                        </div>
                      </div>
                      <h4 className="text-xl font-extrabold tracking-tight text-slate-900 mb-2">{stage.title}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed font-medium">{stage.desc}</p>
                    </div>
                    <div className={`pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold ${stage.isVerified ? 'text-emerald-700' : 'text-slate-500'}`}>
                      <span>{stage.isVerified ? 'Closed-Loop Restored' : 'Chain Impact'}</span>
                      <span>↓ Next Stage</span>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Carousel Navigation Buttons & Pagination Dots */}
            <div className="flex items-center justify-between mt-5 px-3">
              <button
                type="button"
                onClick={() => setPipelineIndex((prev) => (prev - 1 + 7) % 7)}
                aria-label="Previous pipeline stage"
                className="w-10 h-10 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center text-slate-700 hover:text-rose-600 hover:border-rose-300 active:scale-95 transition-all cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M15 19l-7-7 7-7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {/* 7 Indicator Dots */}
              <div className="flex items-center gap-1.5">
                {pipelineStages.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setPipelineIndex(idx)}
                    aria-label={`Jump to stage ${idx + 1}`}
                    className={`transition-all duration-300 cursor-pointer border-0 ${
                      idx === pipelineIndex ? "w-6 h-2 rounded-full bg-rose-600" : "w-2 h-2 rounded-full bg-slate-200 hover:bg-slate-300"
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={() => setPipelineIndex((prev) => (prev + 1) % 7)}
                aria-label="Next pipeline stage"
                className="w-10 h-10 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center text-slate-700 hover:text-rose-600 hover:border-rose-300 active:scale-95 transition-all cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M9 5l7 7-7 7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            <div className="text-center mt-3">
              <span className="text-[11px] font-mono text-slate-400">Auto-playing · Click arrows or tap dots</span>
            </div>
          </div>
        </section>

        {/* CONNECTOR LINE: Pipeline to Bottom Callout */}
        <div aria-hidden="true" className="relative w-full flex flex-col items-center justify-center my-1 pointer-events-none z-10">
          <div className="h-20 circuit-line-stem rounded-full">
            <div className="pulse-dot-vertical"></div>
          </div>
          <div className="w-4 h-4 rounded-full border-2 border-rose-500 bg-white flex items-center justify-center shadow-md shadow-rose-500/30">
            <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping"></div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SECTION D: BOTTOM CALLOUT (VERBATIM HEADLINE & COPY)                      */}
        {/* ========================================================================= */}
        <section className="relative py-16 px-4 max-w-5xl mx-auto" data-purpose="ai-native-callout">
          <div className="futuristic-card p-8 sm:p-14 text-center border-rose-200/90 relative overflow-hidden bg-gradient-to-b from-white via-rose-50/30 to-white shadow-2xl">
            <div className="absolute -left-12 -bottom-12 w-48 h-48 bg-rose-400/25 rounded-full blur-[65px] pointer-events-none"></div>
            <div className="absolute -right-12 -top-12 w-48 h-48 bg-sky-400/20 rounded-full blur-[65px] pointer-events-none"></div>
            <span className="px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-rose-100 text-rose-700 border border-rose-200">
              RELIABILITY FOR THE AI-NATIVE ERA
            </span>
            <h2 className="mt-6 text-2xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight leading-tight">
              IF YOUR SAAS DEPENDS ON SOFTWARE, <br className="hidden sm:inline" />
              IT DEPENDS ON RELIABILITY.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-700 max-w-2xl mx-auto font-medium leading-relaxed">
              And as software becomes more AI-native, the reliability problem only gets more complex.
            </p>
            <p className="mt-2 text-base sm:text-lg text-rose-600 max-w-2xl mx-auto font-extrabold">
              Fluxera is built to solve it.
            </p>
            <div className="mt-8 flex justify-center">
              <div className="inline-flex flex-wrap items-center justify-center gap-4 text-xs font-bold text-slate-600">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Agent Resumption
                </span>
                <span className="text-slate-300 hidden sm:inline">•</span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500"></span> State Checkpoints
                </span>
                <span className="text-slate-300 hidden sm:inline">•</span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-sky-500"></span> Spend Protection
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* FOOTER CONVERSION SECTION (HORIZON ARCH DOME - GET EARLY ACCESS)          */}
        {/* ========================================================================= */}
        <section className="relative pt-20 pb-0 overflow-hidden text-center flex flex-col justify-end items-center" id="early-access">
          <div className="relative w-full max-w-6xl mx-auto px-4 flex flex-col items-center justify-end">
            <div
              className="relative w-full pt-16 pb-20 px-6 sm:px-12 flex flex-col items-center justify-center overflow-hidden border-t-2 border-x border-b-0 border-rose-400/80 shadow-[0_-25px_80px_-15px_rgba(244,63,94,0.35)]"
              style={{
                borderRadius: "50% 50% 0 0 / 100% 100% 0 0",
                background: "radial-gradient(ellipse at bottom, rgba(255, 255, 255, 0.98) 0%, rgba(255, 241, 242, 0.75) 45%, rgba(254, 205, 211, 0.35) 80%, rgba(244, 63, 94, 0.15) 100%)",
              }}
            >
              {/* Horizon Ambient Radiance */}
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[720px] h-[360px] bg-rose-400/25 blur-[100px] pointer-events-none rounded-full"></div>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[85%] h-1 bg-gradient-to-r from-transparent via-rose-400 to-transparent blur-[1px] pointer-events-none"></div>

              <div className="max-w-2xl mx-auto relative z-10">
                <div className="w-12 h-12 mx-auto mb-5 rounded-2xl bg-white border border-rose-200 flex items-center justify-center shadow-lg shadow-rose-500/25">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-600 to-rose-400 flex items-center justify-center text-white font-mono font-bold text-xs shadow-inner">
                    fx
                  </div>
                </div>
                <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
                  Stop Losing Work When <br />
                  Dependencies Fail
                </h2>
                <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-xl mx-auto font-medium">
                  Deploy the intelligence and recovery layer built for mission-critical modern SaaS architectures.
                </p>

                <div className="mt-8 max-w-md mx-auto">
                  <form
                    onSubmit={handleEarlyAccessSubmit}
                    className="flex flex-col sm:flex-row items-center gap-2 p-1.5 rounded-full bg-white/95 border border-slate-200 shadow-xl shadow-rose-500/15 backdrop-blur-md"
                  >
                    <input
                      type="email"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      placeholder="Enter your work email address"
                      required
                      className="w-full sm:flex-1 px-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 bg-transparent rounded-full focus:outline-none focus:ring-0 border-0"
                    />
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-gradient-to-r from-rose-600 via-rose-500 to-rose-600 text-white font-bold text-xs tracking-wide shadow-md shadow-rose-500/35 hover:shadow-rose-500/50 hover:scale-[1.02] transition-all whitespace-nowrap cursor-pointer border-0"
                    >
                      {emailSubmitted ? "Access Requested ✓" : "Get Early Access"}
                    </button>
                  </form>
                  <p className="text-[11px] text-slate-400 mt-3 font-medium">
                    Limited onboarding cohorts for early SaaS design partners.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SITE FOOTER */}
        <footer className="border-t border-slate-200/60 py-6 px-6 text-xs text-slate-500 relative z-10 bg-white/50 backdrop-blur-md" data-purpose="site-footer">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 order-1">
              <div className="w-5 h-5 rounded bg-rose-600 flex items-center justify-center text-white text-[10px] font-mono font-bold">
                fx
              </div>
              <span className="font-bold text-slate-800">Fluxera</span>
              <span className="text-slate-400">© 2026 Fluxera Inc. All Rights Reserved.</span>
            </div>
            <div className="flex items-center gap-6 order-2">
              <a href="#overview" className="hover:text-rose-600 transition-colors font-semibold">Home</a>
              <button onClick={() => go("how")} className="hover:text-rose-600 transition-colors bg-transparent border-0 cursor-pointer p-0 text-xs text-slate-500">
                Vision
              </button>
              <button onClick={() => go("overview")} className="hover:text-rose-600 transition-colors bg-transparent border-0 cursor-pointer p-0 text-xs text-slate-500">
                Dashboard
              </button>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

export function HowPage({ go }) {
  return (
    <div className="relative min-h-screen text-slate-900 font-sans selection:bg-rose-500 selection:text-white pt-24 pb-20">
      <ShaderBackground />
      <div className="fixed inset-0 cyber-grid pointer-events-none -z-10"></div>
      <div className="fixed top-10 left-1/2 -translate-x-1/2 w-[900px] h-[550px] spatial-orb-rose pointer-events-none -z-10"></div>
      <div className="fixed top-48 right-[-10%] w-[650px] h-[650px] spatial-orb-cyan pointer-events-none -z-10"></div>
      <div className="fixed bottom-36 left-[-10%] w-[600px] h-[600px] spatial-orb-rose pointer-events-none -z-10"></div>

      <main className="relative z-10">
        {/* HERO */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 text-center pt-8 md:pt-14">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-rose-50 via-white to-sky-50 border border-rose-200/90 text-rose-600 text-[11px] font-semibold tracking-widest uppercase mb-6 shadow-sm backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mr-0.5"></span>
            <span>HOW FLUXERA WORKS · VISION</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-950 leading-[1.1] mb-5">
            ONE RELIABILITY LAYER
          </h1>

          <p className="text-xs md:text-sm font-bold text-slate-500 tracking-wider mb-6 uppercase font-mono">
            Connect the systems your software depends on:
          </p>

          <div className="max-w-3xl mx-auto flex flex-wrap items-center justify-center gap-2 md:gap-2.5 mb-7">
            {["APIs", "Agents", "Models", "Tools", "Memory", "RAG", "Workflows", "Databases", "Infrastructure", "Third-Party Services"].map((chip) => (
              <span key={chip} className="px-3 py-1.5 text-xs font-mono font-medium rounded-xl bg-white/90 backdrop-blur-xl border border-slate-200/90 text-slate-800 shadow-xs flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                {chip}
              </span>
            ))}
          </div>

          <div className="inline-block px-6 py-2.5 rounded-2xl bg-gradient-to-r from-rose-50/90 via-white to-sky-50/90 border border-rose-200/80 shadow-sm text-xs md:text-sm font-semibold text-rose-950 tracking-tight backdrop-blur-md">
            Fluxera connects their failures, dependencies, execution state, and impact.
          </div>
        </section>

        {/* 3D ISOMETRIC ARCHITECTURE ENGINE */}
        <section className="max-w-6xl mx-auto px-4 mt-12">
          <div className="perspective-container">
            <div className="isometric-board-3d rounded-3xl bg-white/95 backdrop-blur-2xl border border-slate-200 p-5 md:p-8 relative overflow-hidden shadow-2xl">
              <div className="flex flex-wrap items-center justify-between pb-4 border-b border-slate-200/70 gap-2 relative z-10">
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500"></span>
                  <span className="w-3 h-3 rounded-full bg-amber-400"></span>
                  <span className="w-3 h-3 rounded-full bg-emerald-400"></span>
                  <span className="ml-3 text-[11px] font-mono text-slate-500 font-medium">fluxera.runtime / checkpoint-fabric.sys</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse mr-1.5"></span> Checkpoint Shield: 99.98%
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] font-mono font-semibold bg-rose-50 text-rose-700 border border-rose-200/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mr-1.5"></span> In-Flight Interceptor Active
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6 relative z-10 text-left">
                <div className="lg:col-span-3 space-y-3 font-mono text-xs">
                  <div className="text-[10px] font-bold tracking-widest text-slate-400 uppercase flex items-center justify-between">
                    <span>Monitored Nodes</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white/80 border border-slate-200 shadow-sm">
                    <div className="flex items-center justify-between text-slate-800 font-semibold mb-1">
                      <span>OpenAI GPT-4o</span>
                      <span className="text-rose-500 text-[10px] font-bold px-1.5 py-0.5 rounded bg-rose-50 border border-rose-200">429 RateLimit</span>
                    </div>
                    <div className="text-[10px] text-slate-500">Auto-intercepted in 11ms</div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white/80 border border-slate-200 shadow-sm">
                    <div className="flex items-center justify-between text-slate-800 font-semibold mb-1">
                      <span>Pinecone RAG Vector</span>
                      <span className="text-emerald-600 text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 border border-emerald-200">Preserved</span>
                    </div>
                    <div className="text-[10px] text-slate-500">Context cache retained</div>
                  </div>
                </div>

                <div className="lg:col-span-6 flex flex-col justify-between p-6 rounded-2xl bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white shadow-2xl border border-slate-700/60">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center space-x-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                      <span className="text-xs font-semibold text-slate-200 tracking-wider uppercase font-mono">AUTONOMOUS CHECKPOINT CORE</span>
                    </div>
                    <span className="text-[10px] font-mono text-rose-400 bg-rose-950/60 px-2 py-0.5 rounded-md border border-rose-800">Deterministic v2.4</span>
                  </div>

                  <div className="my-6 space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-300">Step 4/7: Agent Execution Chain</span>
                      <span className="text-emerald-400 font-bold">STATE FROZEN &amp; RECOVERED</span>
                    </div>
                    <div className="relative w-full h-3 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700">
                      <div className="h-full bg-gradient-to-r from-rose-500 via-rose-400 to-cyan-400 rounded-full w-4/5"></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-800 text-center font-mono">
                    <div className="p-2 rounded-xl bg-slate-800/50">
                      <div className="text-[10px] text-slate-400">Token Spend Saved</div>
                      <div className="text-sm font-bold text-white">$4,891.20</div>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-800/50">
                      <div className="text-[10px] text-slate-400">Work Preserved</div>
                      <div className="text-sm font-bold text-rose-400">94.2%</div>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-800/50">
                      <div className="text-[10px] text-slate-400">Cold Restart Run</div>
                      <div className="text-sm font-bold text-cyan-400">0 ms</div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-3 space-y-3 font-mono text-xs">
                  <div className="text-[10px] font-bold tracking-widest text-slate-400 uppercase flex items-center justify-between">
                    <span>RESILIENCE POLICY</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white/80 border border-slate-200 shadow-sm">
                    <div className="text-[11px] font-bold text-slate-800 mb-0.5">Closed-Loop Recovery</div>
                    <p className="text-[10px] text-slate-500">Autonomous resolution without human fatigue.</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-gradient-to-br from-rose-50/90 to-rose-100/40 border border-rose-200 text-rose-950 shadow-sm">
                    <div className="text-[11px] font-bold mb-0.5 text-rose-900">Deterministic Replay</div>
                    <p className="text-[10px] text-rose-700/90">Resume exactly at interrupted node without duplicate side-effects.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* THE RELIABILITY LOOP */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 mt-20">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-rose-100 text-rose-700 border border-rose-200">
              THE RELIABILITY LOOP
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950 mt-3">
              Continuous Closed-Loop Resilience
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              { num: "01", title: "DETECT", desc: "Find failures across software before users report them.", icon: "🔍", color: "rose" },
              { num: "02", title: "UNDERSTAND", desc: "Identify root cause and downstream failure propagation chains.", icon: "⚡", color: "amber" },
              { num: "03", title: "QUANTIFY", desc: "Measure wasted compute, impacted users, and dollar loss.", icon: "📊", color: "cyan" },
              { num: "04", title: "RECOVER", desc: "Retry, Resume, Restore, Replay, Rerun without cold restart.", icon: "⚙️", color: "rose", special: true },
              { num: "05", title: "VERIFY", desc: "Confirm recovery restored intended outcome and SLA.", icon: "🛡️", color: "emerald" },
            ].map((step) => (
              <div key={step.num} className={`p-5 rounded-3xl border ${step.special ? 'bg-gradient-to-b from-rose-50 via-white to-white border-rose-300 shadow-lg' : 'bg-white/90 border-slate-200 shadow-sm'} text-left flex flex-col justify-between`}>
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xl font-bold text-rose-600">{step.num}</span>
                    <span className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-xs shadow-xs">{step.icon}</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm tracking-wide mb-2 uppercase">{step.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* THREE CORE PILLARS */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 mt-20 text-left">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-rose-100 text-rose-700 border border-rose-200">
              CORE ARCHITECTURE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950 mt-3">
              THREE CORE PILLARS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-3xl bg-white/90 border border-slate-200 p-7 shadow-sm">
              <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center font-bold text-base mb-4">01</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">AI RELIABILITY</h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">Captures deep execution states across LLMs, tools, memory, and agents.</p>
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs font-mono">
                <span className="text-slate-600">Model Fallback: </span>
                <span className="text-emerald-600 font-bold">&lt; 14ms</span>
              </div>
            </div>

            <div className="rounded-3xl bg-white/90 border border-slate-200 p-7 shadow-sm">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold text-base mb-4">02</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">WORK RECOVERY</h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">Stops full restarts when step 8 of 10 fails. Resumes deterministically.</p>
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs font-mono">
                <span className="text-slate-600">Work Preserved: </span>
                <span className="text-rose-600 font-bold">94%</span>
              </div>
            </div>

            <div className="rounded-3xl bg-white/90 border border-slate-200 p-7 shadow-sm">
              <div className="w-10 h-10 rounded-2xl bg-cyan-100 text-cyan-600 flex items-center justify-center font-bold text-base mb-4">03</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">VALUE RECOVERY</h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">Protects token spend, cloud compute, user trust, and on-call sleep.</p>
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs font-mono">
                <span className="text-slate-600">Monthly Saved: </span>
                <span className="text-cyan-700 font-bold">$18,450 / avg</span>
              </div>
            </div>
          </div>
        </section>

        {/* BOTTOM CTA DOME */}
        <section className="relative mt-24 pt-20 pb-20 px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-5xl font-black text-slate-950 mb-4">
              RELIABILITY INTELLIGENCE &amp; RECOVERY
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto mb-8">
              For AI-native software today. For increasingly autonomous systems tomorrow.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => go("overview")}
                className="px-7 py-3 rounded-full text-xs font-bold text-white bg-gradient-to-r from-rose-600 via-rose-500 to-rose-600 hover:from-rose-500 hover:to-rose-600 shadow-lg shadow-rose-500/35 transition-all hover:scale-[1.03] cursor-pointer border-0"
              >
                Open Live Dashboard →
              </button>
              <button
                onClick={() => go("what")}
                className="px-6 py-3 rounded-full border border-slate-300 bg-white/90 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-all cursor-pointer"
              >
                Back to Home
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export function WhyPage({ go, onSignUp }) {
  return (
    <div className="relative min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 text-slate-900 font-sans">
      <ShaderBackground />
      <div className="cosmic-arc-top"></div>

      <main className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-rose-100 text-rose-700 text-xs font-semibold tracking-wider uppercase mb-4 border border-rose-200 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
            <span>ONE RELIABILITY LAYER · VISION &amp; ARCHITECTURE</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight mb-4">
            HOW FLUXERA WORKS
          </h1>
          <p className="text-base sm:text-lg text-slate-600 font-medium max-w-2xl mx-auto">
            Fluxera connects failures, dependencies, execution state, and financial impact into one deterministic recovery engine.
          </p>
        </div>

        {/* 3 Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {/* Pillar 1 */}
          <div className="rounded-3xl bg-white/95 backdrop-blur-xl border border-slate-200/90 p-7 shadow-xl hover:shadow-2xl hover:border-rose-300 transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-600 font-bold flex items-center justify-center mb-5 text-sm font-mono border border-rose-200">
                01
              </div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-rose-600 block mb-1">Pillar One</span>
              <h3 className="text-xl font-bold text-slate-950 mb-2">AI RELIABILITY</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Understand what failed and why. Captures execution state across LLM generations, database reads, tool calls, and agent steps.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 text-[11px] font-mono text-slate-600 flex justify-between">
              <span>Model Failover:</span>
              <span className="text-emerald-600 font-bold">&lt; 12ms</span>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="rounded-3xl bg-white/95 backdrop-blur-xl border border-slate-200/90 p-7 shadow-xl hover:shadow-2xl hover:border-amber-300 transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 font-bold flex items-center justify-center mb-5 text-sm font-mono border border-amber-200">
                02
              </div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-700 block mb-1">Pillar Two</span>
              <h3 className="text-xl font-bold text-slate-950 mb-2">WORK RECOVERY</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Recover what has already been done. Stops full pipeline restarts when step 8 out of 10 fails by resuming deterministically.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 text-[11px] font-mono text-slate-600 flex justify-between">
              <span>Work Preserved:</span>
              <span className="text-rose-600 font-bold">94%</span>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="rounded-3xl bg-white/95 backdrop-blur-xl border border-slate-200/90 p-7 shadow-xl hover:shadow-2xl hover:border-cyan-300 transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-cyan-100 text-cyan-700 font-bold flex items-center justify-center mb-5 text-sm font-mono border border-cyan-200">
                03
              </div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-cyan-700 block mb-1">Pillar Three</span>
              <h3 className="text-xl font-bold text-slate-950 mb-2">VALUE RECOVERY</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Recover what failure wastes. Protects token expenditure, cloud compute spend, customer trust, and engineer sleep.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 text-[11px] font-mono text-slate-600 flex justify-between">
              <span>Silent Churn Cut:</span>
              <span className="text-cyan-700 font-bold">-86%</span>
            </div>
          </div>
        </div>

        {/* 5-Phase Reliability Loop */}
        <div className="rounded-3xl bg-white/95 backdrop-blur-2xl border border-slate-200 p-8 shadow-2xl mb-12">
          <div className="text-center mb-8">
            <span className="text-xs font-mono font-bold uppercase text-rose-600 tracking-widest block mb-1">THE RELIABILITY LOOP</span>
            <h2 className="text-2xl font-extrabold text-slate-950">Continuous Closed-Loop Resilience</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-left">
            {[
              { num: "01", name: "DETECT", desc: "Intercept failures before users report them.", color: "rose" },
              { num: "02", name: "UNDERSTAND", desc: "Pinpoint root cause and state mutation points.", color: "amber" },
              { num: "03", name: "QUANTIFY", desc: "Measure affected users and direct dollar impact.", color: "cyan" },
              { num: "04", name: "RECOVER", desc: "Resume from in-flight memory boundaries.", color: "rose" },
              { num: "05", name: "VERIFY", desc: "Confirm outcome met SLA constraints.", color: "emerald" },
            ].map((step) => (
              <div key={step.num} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <div className="font-mono text-xs font-bold text-rose-600 mb-1">{step.num}</div>
                <div className="text-xs font-bold text-slate-900 mb-1">{step.name}</div>
                <p className="text-[11px] text-slate-500 leading-normal">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to action */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => go("what")}
            className="px-6 py-3 rounded-full bg-white border border-slate-200 text-slate-800 font-semibold text-xs shadow-xs hover:bg-slate-50 cursor-pointer"
          >
            ← Back to Home
          </button>
          <button
            onClick={() => go("overview")}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-rose-600 to-rose-500 text-white font-semibold text-xs shadow-lg shadow-rose-500/30 hover:scale-[1.03] transition-all cursor-pointer border-0"
          >
            Open Dashboard →
          </button>
        </div>
      </main>
    </div>
  );
}

export function Login({ onLogin }) {
  const [key, setKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  async function submit(e) {
    e.preventDefault();
    setErr("");
    const k = key.trim();
    if (!k) {
      setErr("Please paste your fx_ API key.");
      return;
    }
    if (!k.startsWith("fx_")) {
      setErr("API key must start with fx_");
      return;
    }
    setLoading(true);
    try {
      const r = await apiGet("/api/customers/me", k);
      if (!r.ok) {
        if (r.status === 401 || r.status === 403) throw new Error("Invalid API key. Check it and try again.");
        throw new Error("Sign in failed. Is the local API running?");
      }
      const c = await r.json();
      onLogin({ email: c.email, company: c.company || c.email, apiKey: k, isDemo: false });
    } catch (e) {
      setErr(e instanceof TypeError ? "Couldn't reach /api" : e.message);
    }
    setLoading(false);
  }

  return (
    <div className="relative min-h-[calc(100vh-80px)] flex items-center justify-center p-4 sm:p-6">
      <ShaderBackground />
      <div className="cosmic-arc-top"></div>
      <div className="relative z-10 w-full max-w-md futuristic-card p-8 sm:p-10 shadow-2xl border border-rose-200/80 bg-white/95">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-600 to-rose-400 flex items-center justify-center text-white shadow-md mb-6 font-mono font-bold">
          fx
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Sign in to Fluxera</h1>
        <p className="text-xs text-slate-500 mb-6 leading-relaxed">
          Paste your institution’s <code className="text-rose-600 bg-rose-50 px-1 py-0.5 rounded">fx_</code> API key to unlock full telemetry.
        </p>

        <form onSubmit={submit} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">API Key</label>
            <input
              type="text"
              placeholder="fx_live_..."
              value={key}
              spellCheck={false}
              autoComplete="off"
              onChange={(e) => setKey(e.target.value)}
              className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-sm font-mono focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-100 bg-white"
            />
          </div>
          {err && (
            <p className="text-xs text-rose-700 bg-rose-50 p-3 rounded-2xl border border-rose-200">
              {err}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="shimmer-btn text-white text-sm font-semibold py-3 rounded-full mt-2 cursor-pointer border-0 shadow-glow-rose hover:scale-[1.02]"
          >
            {loading ? "Verifying..." : "Sign In with API Key →"}
          </button>
        </form>
      </div>
    </div>
  );
}
