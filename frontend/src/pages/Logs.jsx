import React, { useState } from "react";
import { f$, fNum, fMs } from "../format";
import { Dot, Pill } from "../components/ui";

export function Logs({ data }) {
  const [filter, setFilter] = useState("all");
  const [wf, setWf] = useState("");
  const all = data.logs || [];
  const workflows = [...new Set(all.map((l) => l.workflow).filter(Boolean))];
  const rows = all
    .filter((l) => {
      if (filter !== "all" && l.status !== filter) return false;
      if (wf && l.workflow !== wf && l.endpoint !== wf) return false;
      return true;
    })
    .slice(0, 200);

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto">
      {/* Control bar */}
      <div className="flex gap-3 items-center flex-wrap">
        <div className="flex gap-1 bg-slate-100 p-1 rounded-xl">
          {["all", "fail", "success"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3.5 py-1 rounded-lg text-xs font-semibold capitalize transition-all cursor-pointer border-0 ${
                filter === f
                  ? "bg-white text-rosebrand-600 shadow-sm"
                  : "bg-transparent text-slate-600 hover:text-slate-900"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {workflows.length > 0 && (
          <select
            value={wf}
            onChange={(e) => setWf(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-mono bg-white text-slate-700 focus:outline-none focus:border-rosebrand-400"
          >
            <option value="">All workflows & tools</option>
            {workflows.map((w) => (
              <option key={w} value={w}>
                {w}
              </option>
            ))}
          </select>
        )}

        <div className="ml-auto">
          <Pill color="#64748b">{fNum(rows.length)} Transactions</Pill>
        </div>
      </div>

      {/* Logs Table Card */}
      <div className="glass-card rounded-3xl border border-slate-200/90 shadow-card-glass overflow-hidden">
        <div className="hidden sm:grid grid-cols-12 gap-3 px-6 py-3 bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-400">
          <span className="col-span-3">Request ID</span>
          <span className="col-span-4">Endpoint</span>
          <span className="col-span-2 text-center">Status</span>
          <span className="col-span-1 text-center">Latency</span>
          <span className="col-span-2 text-right">Cost Impact</span>
        </div>

        <div className="divide-y divide-slate-100 max-h-[550px] overflow-y-auto">
          {rows.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-400 font-mono">No logs recorded yet.</div>
          ) : (
            rows.map((log, i) => (
              <div
                key={log.id + i}
                className="px-6 py-3.5 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-3 items-center hover:bg-rosebrand-50/30 transition-colors"
              >
                <div className="sm:col-span-3 font-mono text-xs text-slate-400 truncate">
                  {log.id}
                </div>

                <div className="sm:col-span-4 font-mono text-xs font-bold text-slate-800 truncate">
                  {log.endpoint}
                </div>

                <div className="sm:col-span-2 flex items-center sm:justify-center gap-1.5">
                  <Dot active={log.status === "fail"} color={log.status === "fail" ? "#e11d48" : "#10b981"} />
                  <span
                    className={`font-mono text-xs font-bold capitalize ${
                      log.status === "fail" ? "text-rosebrand-600" : "text-emerald-600"
                    }`}
                  >
                    {log.status}
                  </span>
                </div>

                <div className="sm:col-span-1 text-left sm:text-center font-mono text-xs text-slate-500">
                  {fMs(log.latency)}
                </div>

                <div
                  className={`sm:col-span-2 text-left sm:text-right font-mono text-xs sm:text-sm font-bold ${
                    log.status === "fail" ? "text-rosebrand-600" : "text-slate-400"
                  }`}
                >
                  {log.status === "fail" ? `-${f$(log.price)}` : "—"}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
