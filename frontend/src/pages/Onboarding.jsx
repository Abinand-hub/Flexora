import React, { useState } from "react";
import { API_BASE, apiPost } from "../api";

export function Onboarding({ onLogin, go }) {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [minted, setMinted] = useState(null);
  const [copied, setCopied] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setErr("");
    if (!email.includes("@")) {
      setErr("Enter a valid email address.");
      return;
    }
    if (!company.trim()) {
      setErr("Enter an institute or organization name.");
      return;
    }
    setLoading(true);
    try {
      const r = await apiPost("/api/signup", null, { email, company: company.trim() });
      const j = await r.json().catch(() => ({}));
      if (r.status === 409) throw new Error(j.error || "This email already has an institute. Sign in with your fx_ key.");
      if (!r.ok) throw new Error(j.error || "Couldn't create the institute.");
      const key = j.customer.api_key;
      const session = { email: j.customer.email, company: j.customer.company, apiKey: key, isDemo: false };
      onLogin(session);
      setMinted({ key, node: j.sdk_config?.node, python: j.sdk_config?.python, company: j.customer.company });
    } catch (e) {
      setErr(e instanceof TypeError ? "Couldn't reach " + API_BASE : e.message);
    }
    setLoading(false);
  }

  async function copy() {
    if (!minted?.key) return;
    try {
      await navigator.clipboard.writeText(minted.key);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  }

  if (minted) {
    return (
      <div className="relative min-h-[calc(100vh-80px)] flex items-center justify-center p-4 sm:p-8">
        <div className="fixed inset-0 bg-grid-pattern pointer-events-none opacity-60 z-0"></div>
        <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] halo-rainbow-rose pointer-events-none z-0"></div>

        <div className="relative z-10 max-w-xl w-full glass-card p-8 sm:p-10 rounded-3xl shadow-card-glass border border-rosebrand-100 text-left">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
              Institute Activated
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-coolice-900 tracking-tight mb-2">
            Your Fluxera Workspace is Ready
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mb-6 leading-relaxed">
            <strong>{minted.company}</strong> has been provisioned with your master telemetry key. Keep this key safe for SDK integration and dashboard sign-in.
          </p>

          <label className="block text-xs font-semibold text-slate-700 mb-2">Master API Key</label>
          <div className="flex gap-2 mb-6 flex-wrap sm:flex-nowrap">
            <input
              readOnly
              value={minted.key}
              className="flex-1 min-w-[200px] px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-mono bg-white select-all focus:outline-none"
            />
            <button
              type="button"
              onClick={copy}
              className="glass-pill px-5 py-2.5 rounded-xl font-semibold text-xs text-slate-700 hover:bg-white border border-slate-200 transition-all cursor-pointer"
            >
              {copied ? "Copied!" : "Copy Key"}
            </button>
          </div>

          <p className="text-xs font-semibold text-slate-700 mb-2">Wrap Your APIs (2-Line Integration)</p>
          <div className="space-y-3 mb-8">
            <pre className="bg-coolice-900 text-coolice-50 p-4 rounded-xl text-xs font-mono overflow-x-auto shadow-inner border border-coolice-800">
              {minted.node}
            </pre>
            <pre className="bg-coolice-900 text-coolice-50 p-4 rounded-xl text-xs font-mono overflow-x-auto shadow-inner border border-coolice-800">
              {minted.python}
            </pre>
          </div>

          <button
            type="button"
            onClick={() => go("overview")}
            className="shimmer-btn text-white text-sm font-semibold px-7 py-3 rounded-full inline-flex items-center gap-2 group shadow-glow-rose cursor-pointer border-0 w-full justify-center"
          >
            <span>Open Dashboard →</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-[calc(100vh-80px)] flex items-center justify-center p-4 sm:p-8">
      <div className="fixed inset-0 bg-grid-pattern pointer-events-none opacity-60 z-0"></div>
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] halo-rainbow-rose pointer-events-none z-0"></div>

      <div className="relative z-10 w-full max-w-md glass-card p-8 sm:p-10 rounded-3xl shadow-card-glass border border-rosebrand-100 text-left">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rosebrand-600 to-rosebrand-400 flex items-center justify-center text-white shadow-md mb-6 font-mono font-bold">
          fx
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Create an Institute</h1>
        <p className="text-xs text-slate-500 mb-6 leading-relaxed">
          Start monitoring API revenue leaks in minutes with unified telemetry and automatic failure classification.
        </p>

        <form onSubmit={submit} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">Work Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-rosebrand-400 focus:outline-none focus:ring-2 focus:ring-rosebrand-100 bg-white/90"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">Company / Institute Name</label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Acme Inc."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-rosebrand-400 focus:outline-none focus:ring-2 focus:ring-rosebrand-100 bg-white/90"
            />
          </div>

          {err && (
            <p className="text-xs text-rosebrand-700 bg-rosebrand-50 p-3 rounded-xl border border-rosebrand-200">
              {err}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="shimmer-btn text-white text-sm font-semibold py-3 rounded-full mt-2 cursor-pointer border-0 shadow-glow-rose hover:scale-[1.02]"
          >
            {loading ? "Creating..." : "Create Institute & Get Key →"}
          </button>
        </form>
      </div>
    </div>
  );
}
