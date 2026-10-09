import React, { useState, useEffect } from "react";
import { API_BASE, apiGet, apiPatch } from "../api";
import { useIsMobile } from "../format";

export function Settings({
  apiKey,
  company,
  isDemo,
  pricePerReq,
  setPricePerReq,
  impact,
  regen,
  onApplyKey,
}) {
  const isMobile = useIsMobile();
  const [keyDraft, setKeyDraft] = useState(apiKey || "");
  const [copied, setCopied] = useState(false);
  const [keyErr, setKeyErr] = useState("");
  const [keySaved, setKeySaved] = useState(false);
  const [price, setPrice] = useState(pricePerReq);
  const [saved, setSaved] = useState(false);
  const [priceErr, setPriceErr] = useState(false);
  const [abandonment, setAbandonment] = useState(impact?.abandonmentRate || 0);
  const [aov, setAov] = useState(impact?.avgOrderValue || 0);
  const [impactSaved, setImpactSaved] = useState(false);
  const [impactErr, setImpactErr] = useState("");
  const [saving, setSaving] = useState(false);
  const [webhook, setWebhook] = useState("");
  const [hookSaved, setHookSaved] = useState(false);
  const [hookErr, setHookErr] = useState("");

  useEffect(() => {
    setKeyDraft(apiKey || "");
  }, [apiKey]);

  useEffect(() => {
    if (!apiKey || isDemo) return;
    apiGet("/api/customers/me", apiKey)
      .then(async (r) => {
        if (!r.ok) return;
        const c = await r.json();
        setWebhook(c.webhook_url || "");
      })
      .catch(() => {});
  }, [apiKey, isDemo]);

  async function copy() {
    const v = keyDraft.trim() || apiKey;
    if (!v) {
      setKeyErr("Nothing to copy — paste an fx_ key first.");
      return;
    }
    try {
      await navigator.clipboard.writeText(v);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setKeyErr("Couldn't copy to clipboard.");
    }
  }

  async function applyKey() {
    const key = keyDraft.trim();
    setKeyErr("");
    if (!key) {
      setKeyErr("Paste an API key that starts with fx_.");
      return;
    }
    if (!key.startsWith("fx_")) {
      setKeyErr("API key must start with fx_");
      return;
    }
    setSaving(true);
    try {
      const r = await apiGet("/api/customers/me", key);
      if (!r.ok) {
        if (r.status === 401 || r.status === 403)
          throw new Error("Invalid API key. Check it and try again.");
        throw new Error("Couldn't reach the API server.");
      }
      const c = await r.json();
      onApplyKey({
        email: c.email,
        company: c.company || company || c.email,
        apiKey: key,
        isDemo: false,
      });
      setKeySaved(true);
      setTimeout(() => setKeySaved(false), 2000);
    } catch (e) {
      setKeyErr(e instanceof TypeError ? "Couldn't reach " + API_BASE : e.message);
    }
    setSaving(false);
  }

  async function savePrice() {
    const p = Number(price);
    if (!Number.isFinite(p) || p <= 0) {
      setPriceErr(true);
      setTimeout(() => setPriceErr(false), 2000);
      return;
    }
    setPricePerReq(p);
    if (isDemo) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
      return;
    }
    setSaving(true);
    try {
      const r = await apiPatch("/api/customers/me", apiKey, { price_default: p });
      if (!r.ok) throw 0;
      regen();
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch {
      setPriceErr(true);
      setTimeout(() => setPriceErr(false), 2000);
    }
    setSaving(false);
  }

  async function saveImpact() {
    const a = Number(abandonment),
      v = Number(aov);
    if (!Number.isFinite(a) || a < 0 || a > 100) {
      setImpactErr("Abandonment rate must be between 0–100%.");
      return;
    }
    if (!Number.isFinite(v) || v < 0) {
      setImpactErr("Average order value must be 0 or more.");
      return;
    }
    setSaving(true);
    setImpactErr("");
    try {
      const r = await apiPatch("/api/customers/me", apiKey, {
        abandonment_rate: a,
        avg_order_value: v,
      });
      if (!r.ok) throw 0;
      regen();
      setImpactSaved(true);
      setTimeout(() => setImpactSaved(false), 2000);
    } catch {
      setImpactErr("Couldn't save formula settings.");
    }
    setSaving(false);
  }

  async function saveWebhook() {
    setHookErr("");
    if (isDemo) return;
    setSaving(true);
    try {
      const r = await apiPatch("/api/customers/me", apiKey, { webhook_url: webhook.trim() });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(j.error || "Couldn't save webhook");
      setHookSaved(true);
      setTimeout(() => setHookSaved(false), 2000);
    } catch (e) {
      setHookErr(e.message);
    }
    setSaving(false);
  }

  const dirty = keyDraft.trim() !== (apiKey || "");
  const canApply = keyDraft.trim().startsWith("fx_") && (dirty || isDemo);

  return (
    <div className="flex flex-col gap-6 max-w-2xl mx-auto">
      {/* API Key Panel */}
      <section className="glass-card p-6 sm:p-8 rounded-3xl border border-rosebrand-100 shadow-card-glass">
        <h3 className="text-base font-bold text-slate-900 mb-1">Master Telemetry Key</h3>
        <p className="text-xs text-slate-500 mb-4 leading-relaxed">
          {isDemo
            ? "Paste your institute's fx_ key to stream live telemetry. Leave blank to stay in demo mode."
            : "This key authenticates your dashboard and SDK telemetry ingestion."}
        </p>

        <div className="flex gap-2 flex-wrap sm:flex-nowrap mb-2">
          <input
            type="text"
            value={keyDraft}
            placeholder="fx_live_..."
            spellCheck={false}
            autoComplete="off"
            onChange={(e) => {
              setKeyDraft(e.target.value);
              setKeyErr("");
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") applyKey();
            }}
            className="flex-1 min-w-[200px] px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-mono bg-white focus:outline-none focus:border-rosebrand-400"
          />
          <button
            type="button"
            onClick={applyKey}
            disabled={saving || !canApply}
            className="shimmer-btn text-white text-xs font-semibold px-5 py-2.5 rounded-xl cursor-pointer border-0 shadow-sm disabled:opacity-50"
          >
            {keySaved ? "Applied ✓" : saving ? "Checking..." : "Apply Key"}
          </button>
          <button
            type="button"
            onClick={copy}
            className="glass-pill text-xs font-semibold text-slate-700 hover:bg-white px-4 py-2.5 rounded-xl border border-slate-200 cursor-pointer"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        {keyErr && <p className="text-xs text-rosebrand-600 mt-2 font-medium">{keyErr}</p>}
      </section>

      {/* Cost per Request */}
      <section className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-card-glass">
        <h3 className="text-base font-bold text-slate-900 mb-1">Default Cost Per Request</h3>
        <p className="text-xs text-slate-500 mb-4 leading-relaxed">
          Used to calculate direct failed API cost when not explicitly tagged on tools or workflows.
        </p>
        <div className="flex gap-2 items-center">
          <input
            type="number"
            value={price}
            step={0.001}
            min={0.001}
            onChange={(e) => setPrice(e.target.value)}
            className="w-40 px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-mono bg-white focus:outline-none focus:border-rosebrand-400"
          />
          <button
            type="button"
            onClick={savePrice}
            disabled={saving}
            className="shimmer-btn text-white text-xs font-semibold px-5 py-2.5 rounded-xl cursor-pointer border-0 shadow-sm"
          >
            {saved ? "Saved ✓" : "Save Price"}
          </button>
        </div>
        {priceErr && <p className="text-xs text-rosebrand-600 mt-2">Please enter a valid price amount.</p>}
      </section>

      {/* Revenue-at-Risk Formula */}
      <section className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-card-glass">
        <h3 className="text-base font-bold text-slate-900 mb-1">Revenue-at-Risk Business Model</h3>
        <p className="text-xs text-slate-500 mb-4 leading-relaxed">
          Quantifies customer impact by projecting abandonment during checkout or mission-critical API errors.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Cart Abandonment Rate (%)
            </label>
            <input
              type="number"
              value={abandonment}
              disabled={isDemo}
              onChange={(e) => setAbandonment(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-mono bg-white focus:outline-none focus:border-rosebrand-400 disabled:opacity-50"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Average Order Value ($)
            </label>
            <input
              type="number"
              value={aov}
              disabled={isDemo}
              onChange={(e) => setAov(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-mono bg-white focus:outline-none focus:border-rosebrand-400 disabled:opacity-50"
            />
          </div>
        </div>
        {impactErr && <p className="text-xs text-rosebrand-600 mb-3">{impactErr}</p>}
        {!isDemo && (
          <button
            type="button"
            onClick={saveImpact}
            disabled={saving}
            className="shimmer-btn text-white text-xs font-semibold px-5 py-2.5 rounded-xl cursor-pointer border-0 shadow-sm"
          >
            {impactSaved ? "Model Saved ✓" : "Save Model"}
          </button>
        )}
      </section>

      {/* Recovery Webhook */}
      <section className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-card-glass">
        <h3 className="text-base font-bold text-slate-900 mb-1">Automated Recovery Webhook</h3>
        <p className="text-xs text-slate-500 mb-4 leading-relaxed">
          Fluxera automatically POSTs diagnostic payloads and suggested recovery playbooks to this endpoint upon critical failures.
        </p>
        <div className="flex gap-2 flex-wrap sm:flex-nowrap">
          <input
            type="url"
            value={webhook}
            placeholder="https://api.yourcompany.com/fluxera/recover"
            disabled={isDemo}
            onChange={(e) => {
              setWebhook(e.target.value);
              setHookErr("");
            }}
            className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-mono bg-white focus:outline-none focus:border-rosebrand-400 disabled:opacity-50"
          />
          {!isDemo && (
            <button
              type="button"
              onClick={saveWebhook}
              disabled={saving}
              className="shimmer-btn text-white text-xs font-semibold px-5 py-2.5 rounded-xl cursor-pointer border-0 shadow-sm"
            >
              {hookSaved ? "Saved ✓" : "Save Webhook"}
            </button>
          )}
        </div>
        {hookErr && <p className="text-xs text-rosebrand-600 mt-2">{hookErr}</p>}
      </section>
    </div>
  );
}
