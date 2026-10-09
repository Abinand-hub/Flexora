import React, { useEffect, useState } from "react";
import { apiGet, apiPost } from "../api";
import { f$, fMs } from "../format";
import { RecoveryCard } from "../components/RecoveryCard";
import { Dot } from "../components/ui";

export function ToolDetail({ apiKey, toolId, go }) {
  const [pack, setPack] = useState(null);
  const [err, setErr] = useState("");
  const [saving, setSaving] = useState(false);

  function load() {
    if (!apiKey || !toolId) return;
    apiGet("/api/tools/" + toolId, apiKey)
      .then(async (r) => {
        if (!r.ok) throw new Error("Couldn't load tool details");
        setPack(await r.json());
      })
      .catch((e) => setErr(e.message));
  }

  useEffect(() => {
    load();
  }, [apiKey, toolId]);

  async function recover() {
    const execId = pack?.execution?.id;
    if (!execId) {
      setErr("No failed execution to recover.");
      return;
    }
    setSaving(true);
    setErr("");
    try {
      const r = await apiPost("/api/executions/" + execId + "/recover", apiKey, {});
      const j = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(j.error || "Couldn't recover");
      await load();
    } catch (e) {
      setErr(e.message);
    }
    setSaving(false);
  }

  if (err && !pack)
    return <p className="text-xs text-rosebrand-600 p-4 bg-rosebrand-50 rounded-xl border border-rosebrand-200">{err}</p>;
  if (!pack) return <div className="p-8 text-center text-slate-400 font-mono text-xs">Loading tool diagnostics...</div>;

  const t = pack.tool || {};
  const d = pack.diagnosis || {};
  const e = pack.execution || {};

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto">
      <button
        onClick={() => go("tools")}
        className="self-start text-xs font-semibold text-slate-500 hover:text-rosebrand-600 flex items-center gap-1 cursor-pointer border-0 bg-transparent"
      >
        ← Back to Tools
      </button>

      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-rosebrand-100/80 shadow-card-glass flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-xl sm:text-2xl font-extrabold text-slate-900">{t.name}</span>
          </div>
          <p className="text-xs text-slate-500 font-medium">Detailed Vendor Telemetry & Failure Classification</p>
        </div>
        <div className="flex items-center gap-2">
          <Dot
            active={pack.availability === "down"}
            color={pack.availability === "down" ? "#e11d48" : "#10b981"}
          />
          <span
            className={`text-xs font-bold uppercase px-3 py-1 rounded-full ${
              pack.availability === "down"
                ? "bg-rosebrand-50 text-rosebrand-600 border border-rosebrand-200"
                : "bg-emerald-50 text-emerald-600 border border-emerald-200"
            }`}
          >
            {pack.availability || "Healthy"}
          </span>
        </div>
      </div>

      {err && <p className="text-xs text-rosebrand-600 p-3 bg-rosebrand-50 rounded-xl border border-rosebrand-200">{err}</p>}

      {/* 4 Diagnostic Questions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <DiagCard
          k="What failed?"
          v={d.what_failed ? `${d.what_failed.type}: ${d.what_failed.name}` : "No recent errors"}
          red={!!d.what_failed}
        />
        <DiagCard
          k="Why?"
          v={
            d.why?.error_type
              ? `${d.why.error_type}${d.why.retries_fired ? " · retries fired" : ""}${
                  d.why.child_tool_timeout ? " · tool timeout" : ""
                }`
              : "Clean execution"
          }
        />
        <DiagCard
          k="What did it affect?"
          v={(pack.workflows || []).map((w) => w.name).join(", ") || "No workflows mapped"}
        />
        <DiagCard
          k="How much did it cost?"
          v={`${f$(pack.stats?.failed_cost)} direct loss · ${f$(pack.stats?.retry_cost)} retry waste`}
          red
        />
      </div>

      {e.id && (
        <div className="glass-card p-5 rounded-2xl border border-slate-200 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 font-semibold mb-0.5">Latest Failed Execution</p>
            <p className="font-mono text-xs text-slate-800">
              {e.workflow_name} · <strong className="uppercase text-rosebrand-600">{e.status}</strong> · {fMs(e.duration_ms)}
            </p>
          </div>
          <button
            onClick={() => go("execution", e.id)}
            className="glass-pill px-4 py-2 rounded-xl text-xs font-semibold text-rosebrand-600 hover:bg-rosebrand-50 border border-rosebrand-200 transition-all cursor-pointer"
          >
            Open Execution Run →
          </button>
        </div>
      )}

      <RecoveryCard
        diagnosis={d}
        recovery={pack.recovery}
        onRecover={e.id ? recover : null}
        recovering={saving}
      />
    </div>
  );
}

function DiagCard({ k, v, red }) {
  return (
    <div
      className={`glass-card p-5 rounded-2xl border transition-all ${
        red ? "border-rosebrand-200 bg-rosebrand-50/30" : "border-slate-200/80 bg-white/90"
      }`}
    >
      <p className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-400 mb-1.5">{k}</p>
      <p className={`text-sm font-bold leading-relaxed ${red ? "text-rosebrand-600" : "text-slate-900"}`}>{v}</p>
    </div>
  );
}
