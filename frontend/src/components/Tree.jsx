import React from "react";
import { fMs, f$ } from "../format";
import { Dot } from "./ui";

export function Tree({ steps = [], leaves = [], failedId, bottleneckId }) {
  const byStep = {};
  for (const l of leaves) {
    const k = l.step_id || "_";
    if (!byStep[k]) byStep[k] = [];
    byStep[k].push(l);
  }

  const ordered = [...steps].sort(
    (a, b) => new Date(a.started_at || 0) - new Date(b.started_at || 0)
  );
  const ids = new Set(ordered.map((s) => s.id));
  const children = new Map();
  const roots = [];
  for (const st of ordered) {
    if (st.parent_step_id && ids.has(st.parent_step_id)) {
      if (!children.has(st.parent_step_id)) children.set(st.parent_step_id, []);
      children.get(st.parent_step_id).push(st);
    } else {
      roots.push(st);
    }
  }

  function Node({ st, depth }) {
    const cascade = st.status === "cascade";
    const failed = st.status === "fail" || st.id === failedId;
    const bottleneck = st.id === bottleneckId;

    return (
      <>
        <div
          style={{ marginLeft: depth ? depth * 20 : 0 }}
          className={`glass-card p-4 rounded-2xl mb-2 transition-all ${
            failed
              ? "border-rosebrand-300 bg-rosebrand-50/40 shadow-glow-rose"
              : cascade
              ? "border-amber-300 bg-amber-50/40"
              : bottleneck
              ? "border-indigo-300 bg-indigo-50/40"
              : "border-slate-200/80 bg-white/90"
          }`}
        >
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <Dot
                active={failed}
                color={failed ? "#e11d48" : cascade ? "#f59e0b" : "#10b981"}
              />
              <span className="font-mono text-xs font-bold text-slate-900">{st.name}</span>
              {cascade && (
                <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                  Cascade Failure
                </span>
              )}
              {bottleneck && (
                <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-indigo-100 text-indigo-800">
                  Bottleneck
                </span>
              )}
            </div>
            <span
              className={`font-mono text-xs font-semibold ${
                failed ? "text-rosebrand-600" : "text-slate-500"
              }`}
            >
              {fMs(st.duration_ms)} · {f$(st.failed_cost || 0)}
            </span>
          </div>

          {(byStep[st.id] || []).map((l) => (
            <div
              key={l.id}
              className={`font-mono text-xs pl-4 py-1.5 border-l-2 my-1 rounded-r ${
                l.status === "fail"
                  ? "border-rosebrand-400 text-rosebrand-700 bg-rosebrand-50/50"
                  : "border-slate-300 text-slate-600 bg-slate-50/50"
              }`}
            >
              {l.endpoint} · <strong className="uppercase">{l.status}</strong>
              {l.attempt > 1 ? ` · attempt ${l.attempt}` : ""}
              {l.error_type ? ` · ${l.error_type}` : ""} · {f$(l.price)}
            </div>
          ))}
        </div>
        {(children.get(st.id) || []).map((ch) => (
          <Node key={ch.id} st={ch} depth={depth + 1} />
        ))}
      </>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      {roots.map((st) => (
        <Node key={st.id} st={st} depth={0} />
      ))}
    </div>
  );
}
