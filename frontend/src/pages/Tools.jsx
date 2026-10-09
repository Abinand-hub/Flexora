import React, { useEffect, useState } from "react";
import { apiGet } from "../api";
import { f$, fPct, fNum } from "../format";
import { Dot, Pill } from "../components/ui";

export function Tools({ apiKey, isDemo, go }) {
  const [rows, setRows] = useState([]);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(!isDemo && !!apiKey);

  useEffect(() => {
    if (isDemo || !apiKey) {
      setRows([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    apiGet("/api/tools", apiKey)
      .then(async (r) => {
        if (!r.ok) throw new Error("Couldn't load tools");
        const j = await r.json();
        setRows(j.tools || []);
      })
      .catch((e) => setErr(e.message))
      .finally(() => setLoading(false));
  }, [apiKey, isDemo]);

  if (isDemo) {
    return (
      <div className="glass-card p-8 rounded-3xl border border-rosebrand-100 max-w-2xl mx-auto text-center">
        <div className="w-12 h-12 rounded-2xl bg-rosebrand-50 border border-rosebrand-100 text-rosebrand-600 flex items-center justify-center mx-auto mb-4 font-mono font-bold">
          fx
        </div>
        <h3 className="text-lg font-bold text-slate-900 mb-2">Tool Intelligence & Latency Tracking</h3>
        <p className="text-xs text-slate-500 mb-6 leading-relaxed">
          Sign in with an API key to inspect granular third-party vendor tool performance, retry costs, and error rates.
        </p>
        <button
          onClick={() => go && go("settings")}
          className="shimmer-btn text-white text-xs font-semibold px-6 py-2.5 rounded-full inline-flex items-center gap-2 cursor-pointer border-0 shadow-glow-rose"
        >
          <span>Configure API Key →</span>
        </button>
      </div>
    );
  }

  if (err) return <p className="text-xs text-rosebrand-600 p-4 bg-rosebrand-50 rounded-xl border border-rosebrand-200">{err}</p>;
  if (loading) return <div className="p-8 text-center text-slate-400 font-mono text-xs">Loading tools...</div>;
  if (!rows.length) {
    return (
      <div className="glass-card p-8 rounded-3xl border border-slate-200 text-center max-w-xl mx-auto">
        <h4 className="text-sm font-bold text-slate-800 mb-2">No tools registered yet</h4>
        <p className="text-xs text-slate-500">Wrap vendor integrations with <code className="bg-slate-100 px-1 py-0.5 rounded font-mono">fluxera.tool()</code>.</p>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-3xl border border-slate-200/90 shadow-card-glass overflow-hidden max-w-6xl mx-auto">
      <div className="px-6 py-4 bg-slate-50/80 border-b border-slate-200/80 flex items-center justify-between">
        <h4 className="text-sm font-bold text-slate-900">Registered Tools & Integrations</h4>
        <Pill color="#e11d48" bg="#fff1f2" border="#fecdd3">
          {rows.length} Monitored
        </Pill>
      </div>

      <div className="hidden sm:grid grid-cols-12 gap-3 px-6 py-3 bg-slate-50/50 border-b border-slate-200/60 text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-400">
        <span className="col-span-3">Tool</span>
        <span className="col-span-2 text-center">Calls</span>
        <span className="col-span-2 text-center">Failure Rate</span>
        <span className="col-span-2 text-right">Failed Cost</span>
        <span className="col-span-2 text-right">Retry Waste</span>
        <span className="col-span-1 text-right">Status</span>
      </div>

      <div className="divide-y divide-slate-100">
        {rows.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => go && go("tool", t.id)}
            className="w-full text-left px-6 py-4 grid grid-cols-1 sm:grid-cols-12 gap-3 items-center hover:bg-rosebrand-50/30 transition-colors cursor-pointer border-0 bg-transparent"
          >
            <div className="sm:col-span-3 flex items-center gap-2">
              <Dot
                active={t.availability === "down" || t.still_failing}
                color={t.availability === "down" ? "#e11d48" : t.still_failing ? "#f59e0b" : "#10b981"}
              />
              <span className="font-mono text-xs font-bold text-slate-800">{t.name}</span>
            </div>

            <div className="sm:col-span-2 text-left sm:text-center text-xs font-mono text-slate-600">
              {fNum(t.calls)}
            </div>

            <div className="sm:col-span-2 text-left sm:text-center">
              <span
                className={`font-mono text-xs font-bold px-2 py-0.5 rounded ${
                  parseFloat(t.failure_rate) > 10
                    ? "bg-rosebrand-50 text-rosebrand-600 border border-rosebrand-200"
                    : "bg-emerald-50 text-emerald-600 border border-emerald-200"
                }`}
              >
                {fPct(t.failure_rate)}
              </span>
            </div>

            <div className="sm:col-span-2 text-left sm:text-right font-bold text-xs sm:text-sm text-rosebrand-600 font-mono">
              {f$(t.failed_cost)}
            </div>

            <div className="sm:col-span-2 text-left sm:text-right text-xs text-amber-600 font-mono">
              {f$(t.retry_cost)}
            </div>

            <div className="sm:col-span-1 text-left sm:text-right">
              <span
                className={`text-[11px] font-semibold uppercase px-2 py-0.5 rounded-full ${
                  t.availability === "down"
                    ? "bg-rosebrand-50 text-rosebrand-600"
                    : t.still_failing
                    ? "bg-amber-50 text-amber-600"
                    : "bg-emerald-50 text-emerald-600"
                }`}
              >
                {t.availability === "down" ? "Down" : t.still_failing ? "Degraded" : "Healthy"}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
