import React, { useEffect, useState } from "react";
import { apiGet, apiPost } from "../api";
import { f$, fMs } from "../format";
import { Tree } from "../components/Tree";
import { RecoveryCard } from "../components/RecoveryCard";

export function ExecutionDetail({ apiKey, executionId, go }) {
  const [pack, setPack] = useState(null);
  const [err, setErr] = useState("");
  const [saving, setSaving] = useState(false);

  function load() {
    if (!apiKey || !executionId) return;
    apiGet("/api/executions/" + executionId, apiKey)
      .then(async (r) => {
        if (!r.ok) throw new Error("Couldn't load execution details");
        setPack(await r.json());
      })
      .catch((e) => setErr(e.message));
  }

  useEffect(() => {
    load();
  }, [apiKey, executionId]);

  async function recover() {
    setSaving(true);
    setErr("");
    try {
      const r = await apiPost("/api/executions/" + executionId + "/recover", apiKey, {});
      const j = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(j.error || "Couldn't execute recovery");
      await load();
    } catch (e) {
      setErr(e.message);
    }
    setSaving(false);
  }

  if (!pack && err)
    return <p className="text-xs text-rosebrand-600 p-4 bg-rosebrand-50 rounded-xl border border-rosebrand-200">{err}</p>;
  if (!pack) return <div className="p-8 text-center text-slate-400 font-mono text-xs">Loading execution trace...</div>;

  const d = pack.diagnosis || {};
  const e = pack.execution || {};

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto">
      <button
        onClick={() => go("executions")}
        className="self-start text-xs font-semibold text-slate-500 hover:text-rosebrand-600 flex items-center gap-1 cursor-pointer border-0 bg-transparent"
      >
        ← Back to Executions
      </button>

      {/* 4 Diagnostic Questions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <DiagCard
          k="What failed?"
          v={d.what_failed ? `${d.what_failed.type}: ${d.what_failed.name}` : "No errors detected"}
          red={!!d.what_failed}
        />
        <DiagCard
          k="Why?"
          v={
            d.why?.error_type
              ? `${d.why.error_type}${d.why.retries_fired ? " · retries fired" : ""}${
                  d.why.child_tool_timeout ? " · tool timeout" : ""
                }`
              : "Execution succeeded"
          }
        />
        <DiagCard k="What did it affect?" v={affectLine(d.affected, e)} />
        <DiagCard
          k="How much did it cost?"
          v={`${f$(d.cost?.failed)} direct loss · ${f$(d.cost?.retry_wasted)} retry waste`}
          red
        />
      </div>

      {err && <p className="text-xs text-rosebrand-600 p-3 bg-rosebrand-50 rounded-xl border border-rosebrand-200">{err}</p>}

      <div className="glass-card p-4 rounded-2xl border border-slate-200/80 flex items-center justify-between text-xs text-slate-600 font-mono">
        <span>
          Status: <strong className="uppercase text-slate-900">{e.status}</strong> · Duration: {fMs(e.duration_ms)} · Started:{" "}
          {e.started_at ? new Date(e.started_at).toLocaleString() : "—"}
        </span>
        {d.bottleneck && (
          <span className="text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
            Bottleneck: {d.bottleneck.name}
          </span>
        )}
      </div>

      {/* Workflow Trace Tree */}
      <div className="flex flex-col gap-2">
        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
          Execution Step Tree & Tool Calls
        </h4>
        <Tree
          steps={pack.steps || []}
          leaves={pack.leaves || []}
          failedId={d.what_failed?.id}
          bottleneckId={d.bottleneck?.id}
        />
      </div>

      <RecoveryCard
        diagnosis={d}
        recovery={pack.recovery}
        onRecover={recover}
        recovering={saving}
      />
    </div>
  );
}

function affectLine(affected, execution) {
  const a = affected || {};
  const bits = [`${a.workflow || execution.workflow_name || "—"} · ${a.executions || 1} execution`];
  if (a.users_affected != null) bits.push(`~${a.users_affected} users est.`);
  if (a.revenue_at_risk != null) bits.push(`${f$(a.revenue_at_risk)} at risk`);
  return bits.join(" · ");
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
