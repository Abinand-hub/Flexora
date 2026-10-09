import React, { useEffect, useState } from "react";
import { apiGet } from "../api";
import { f$, fMs } from "../format";
import { Dot, Pill } from "../components/ui";

export function groupByWorkflow(rows) {
  const map = new Map();
  for (const r of rows || []) {
    const k = r.workflow_name || "unknown";
    if (!map.has(k)) map.set(k, []);
    map.get(k).push(r);
  }
  return [...map.entries()];
}

function checkupLine(e) {
  if (e.status === "success") return "Clean execution run";
  const step = e.failed_step || "unknown step";
  const err = e.error_type ? ` · ${e.error_type}` : "";
  const rec = e.recovery_action ? ` → ${String(e.recovery_action).replace(/_/g, " ")}` : "";
  return `${step}${err}${rec}`;
}

export function Executions({ apiKey, isDemo, go, workflow = "", grouped = false }) {
  const [rows, setRows] = useState([]);
  const [err, setErr] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(!isDemo && !!apiKey);

  useEffect(() => {
    if (isDemo || !apiKey) {
      setRows([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    setErr("");
    const p = new URLSearchParams();
    if (status) p.set("status", status);
    if (workflow) p.set("workflow", workflow);
    const q = p.toString() ? `?${p}` : "";
    apiGet("/api/executions" + q, apiKey)
      .then(async (r) => {
        if (!r.ok) throw new Error("Couldn't load executions");
        const j = await r.json();
        setRows(j.executions || []);
      })
      .catch((e) => setErr(e.message))
      .finally(() => setLoading(false));
  }, [apiKey, isDemo, status, workflow]);

  if (isDemo) {
    return (
      <div className="glass-card p-8 rounded-3xl border border-rosebrand-100 max-w-2xl mx-auto text-center">
        <div className="w-12 h-12 rounded-2xl bg-rosebrand-50 border border-rosebrand-100 text-rosebrand-600 flex items-center justify-center mx-auto mb-4 font-mono font-bold">
          fx
        </div>
        <h3 className="text-lg font-bold text-slate-900 mb-2">Execution Telemetry</h3>
        <p className="text-xs text-slate-500 mb-6 leading-relaxed">
          {grouped
            ? "Sign in with an API key to view workflow checkup history and diagnostic trees."
            : "Sign in with an API key to inspect real workflow execution runs."}
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
  if (loading) return <div className="p-8 text-center text-slate-400 font-mono text-xs">Loading execution runs...</div>;

  const groups = grouped ? groupByWorkflow(rows) : [["", rows]];

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto">
      {/* Filters Bar */}
      <div className="flex gap-2 flex-wrap items-center">
        {["", "success", "partial", "failed"].map((s) => (
          <button
            key={s || "all"}
            onClick={() => setStatus(s)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer border ${
              status === s
                ? "bg-rosebrand-600 text-white border-rosebrand-600 shadow-sm"
                : "bg-white text-slate-600 border-slate-200 hover:border-rosebrand-200"
            }`}
          >
            {s ? s.toUpperCase() : "ALL STATUSES"}
          </button>
        ))}
        {workflow && (
          <button
            onClick={() => go("history")}
            className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white text-rosebrand-600 border border-rosebrand-200 hover:bg-rosebrand-50 transition-all cursor-pointer"
          >
            Clear Filter ({workflow})
          </button>
        )}
      </div>

      {!rows.length ? (
        <div className="glass-card p-8 rounded-3xl border border-slate-200 text-center max-w-xl mx-auto">
          <p className="text-xs text-slate-500">
            {grouped
              ? "No checkups recorded yet for this workflow."
              : "No executions recorded yet."}
          </p>
        </div>
      ) : (
        groups.map(([name, list]) => (
          <div key={name || "flat"} className="flex flex-col gap-2">
            {grouped && (
              <div className="flex items-center justify-between px-1">
                <span className="font-mono text-xs font-bold text-slate-800">{name}</span>
                <span className="text-xs text-slate-400 font-medium">
                  {list.length} {list.length === 1 ? "run" : "runs"}
                </span>
              </div>
            )}
            <div className="glass-card rounded-3xl border border-slate-200/90 shadow-card-glass overflow-hidden">
              <div className="divide-y divide-slate-100">
                {list.map((e) => (
                  <button
                    key={e.id}
                    onClick={() => go("execution", e.id)}
                    className="w-full text-left px-6 py-4 flex flex-col sm:flex-row justify-between sm:items-center gap-3 hover:bg-rosebrand-50/30 transition-colors cursor-pointer border-0 bg-transparent"
                  >
                    <div className="min-w-0">
                      {!grouped && (
                        <p className="font-mono text-xs font-bold text-slate-800 mb-0.5">{e.workflow_name}</p>
                      )}
                      <p className="text-xs font-medium text-slate-600">{new Date(e.started_at).toLocaleString()}</p>
                      {grouped && <p className="text-xs text-slate-500 mt-1 font-mono">{checkupLine(e)}</p>}
                    </div>

                    <div className="flex items-center gap-4 flex-shrink-0">
                      <span className="flex items-center gap-1.5 text-xs font-semibold capitalize text-slate-700">
                        <Dot
                          color={
                            e.status === "success"
                              ? "#10b981"
                              : e.status === "partial"
                              ? "#f59e0b"
                              : "#e11d48"
                          }
                        />
                        {e.status}
                      </span>
                      {!grouped && (
                        <span className="font-mono text-xs text-slate-500">{fMs(e.duration_ms)}</span>
                      )}
                      <span
                        className={`font-mono text-xs sm:text-sm font-bold min-w-[60px] text-right ${
                          parseFloat(e.failed_cost) > 0 ? "text-rosebrand-600" : "text-slate-400"
                        }`}
                      >
                        {f$(e.failed_cost)}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
