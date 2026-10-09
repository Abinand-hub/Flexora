import React from "react";
import { f$, fPct, fNum, fMs, useIsMobile } from "../format";
import { Pill, Dot, BarLine } from "../components/ui";

const PERIOD_LABELS = { "24h": "LAST 24H", "7d": "LAST 7D", "30d": "LAST 30D" };
const PERIOD_DAYS = { "24h": 1, "7d": 7, "30d": 30 };

export function Overview({ data, period, go }) {
  const { totalLost, totalFailed, totalRequests, failRate, avgLatency, endpoints, spark, impact } = data;
  const periodLabel = PERIOD_LABELS[period] || "LAST 24H";
  const periodDays = PERIOD_DAYS[period] || 1;
  const dailyRate = totalLost / periodDays;
  const maxLost = endpoints[0]?.lost || 1;
  const isMobile = useIsMobile();

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto">
      {/* Top 2 Primary Impact KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Failed API Cost */}
        <div className="glass-card p-7 sm:p-8 rounded-3xl border border-rosebrand-200/80 shadow-glow-soft bg-gradient-to-br from-white via-rosebrand-50/30 to-white relative overflow-hidden group">
          <div className="flex items-center justify-between mb-4">
            <span className="badge-soft-rose text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md">
              Failed API Cost · {periodLabel}
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-rosebrand-500 animate-pulse"></span>
          </div>
          <div className="text-4xl sm:text-6xl font-extrabold text-rosebrand-600 tracking-tight leading-none mb-3">
            {f$(totalLost)}
          </div>
          <p className="text-xs sm:text-sm text-slate-500 flex items-center gap-1.5">
            <span className="font-mono font-bold text-slate-800 bg-rosebrand-50 px-2 py-0.5 rounded border border-rosebrand-100">
              {fNum(totalFailed)}
            </span>{" "}
            failed API calls across all workflows
          </p>
        </div>

        {/* Est Revenue At Risk */}
        <div className="glass-card p-7 sm:p-8 rounded-3xl border border-amber-200/80 shadow-sm bg-gradient-to-br from-white via-amber-50/20 to-white relative overflow-hidden group">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md text-amber-700 bg-amber-50 border border-amber-200">
              Est. Revenue At Risk · {periodLabel}
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
          </div>
          {impact.configured ? (
            <>
              <div className="text-4xl sm:text-6xl font-extrabold text-amber-600 tracking-tight leading-none mb-3">
                {f$(impact.revenueAtRisk)}
              </div>
              <p className="text-xs sm:text-sm text-slate-500">
                ~<span className="font-mono font-bold text-slate-800">{fNum(impact.usersAffected)}</span> users impacted ·{" "}
                <span className="font-mono font-bold text-slate-800">{impact.abandonmentRate}%</span> cart abandonment
              </p>
            </>
          ) : (
            <div className="py-2">
              <div className="text-lg font-bold text-slate-700 mb-2">Formula Not Configured Yet</div>
              <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                Connect your abandonment rate and average order value to estimate revenue risks.
              </p>
              <button
                onClick={() => go && go("settings")}
                className="glass-pill px-4 py-2 rounded-xl text-xs font-semibold text-rosebrand-600 hover:bg-rosebrand-50 border border-rosebrand-200 transition-all cursor-pointer"
              >
                Configure in Settings →
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 4 Secondary Telemetry Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        {[
          {
            label: "Failure Rate",
            value: fPct(failRate),
            badge: failRate > 10 ? "Elevated" : "Normal",
            color: failRate > 10 ? "text-rosebrand-600" : "text-slate-900",
            icon: (
              <svg className="w-4 h-4 text-rosebrand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
              </svg>
            ),
          },
          {
            label: "Avg Fail Latency",
            value: fMs(avgLatency),
            badge: "Telemetry",
            color: "text-slate-900",
            icon: (
              <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
              </svg>
            ),
          },
          {
            label: "Total Requests",
            value: fNum(totalRequests),
            badge: "24h Volume",
            color: "text-slate-900",
            icon: (
              <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
              </svg>
            ),
          },
          {
            label: "Monthly Run-Rate Leak",
            value: f$(dailyRate * 30),
            badge: "Projected",
            color: "text-rosebrand-600",
            icon: (
              <svg className="w-4 h-4 text-rosebrand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
              </svg>
            ),
          },
        ].map((s) => (
          <div
            key={s.label}
            className="glass-card p-4 sm:p-5 rounded-2xl border border-slate-200/80 hover:border-rosebrand-200 shadow-sm flex flex-col justify-between transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-400">
                {s.label}
              </span>
              {s.icon}
            </div>
            <div className={`text-xl sm:text-2xl font-extrabold tracking-tight ${s.color}`}>
              {s.value}
            </div>
          </div>
        ))}
      </div>

      {/* Leaking Endpoints Table */}
      <div className="glass-card rounded-3xl border border-slate-200/90 shadow-card-glass overflow-hidden">
        <div className="px-6 py-4 bg-slate-50/80 border-b border-slate-200/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rosebrand-500 animate-pulse"></span>
            <h4 className="text-sm font-bold text-slate-900">Leaking Endpoints & Services</h4>
          </div>
          <Pill color="#e11d48" bg="#fff1f2" border="#fecdd3">
            {periodLabel}
          </Pill>
        </div>

        <div className="divide-y divide-slate-100">
          {endpoints.slice(0, 5).map((ep, i) => (
            <div
              key={ep.name}
              className="px-6 py-4 grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-4 items-center hover:bg-rosebrand-50/30 transition-colors"
            >
              {/* Endpoint name & bar */}
              <div className="sm:col-span-6">
                <div className="flex items-center gap-2 mb-1">
                  {i === 0 && <Dot active color="#e11d48" />}
                  <span className="font-mono text-xs font-bold text-slate-800 tracking-tight">
                    {ep.name}
                  </span>
                </div>
                <BarLine value={ep.lost} max={maxLost} color={i === 0 ? "#e11d48" : "#fb7185"} />
              </div>

              {/* Failed Count */}
              <div className="sm:col-span-2 text-left sm:text-center">
                <span className="text-[11px] text-slate-400 block sm:hidden font-semibold uppercase">Failed</span>
                <span className="font-mono text-xs text-slate-600 font-semibold">{fNum(ep.failed)} failed</span>
              </div>

              {/* Failure Rate */}
              <div className="sm:col-span-2 text-left sm:text-center">
                <span className="text-[11px] text-slate-400 block sm:hidden font-semibold uppercase">Rate</span>
                <span
                  className={`font-mono text-xs font-bold px-2 py-0.5 rounded ${
                    ep.rate > 20
                      ? "bg-rosebrand-50 text-rosebrand-600 border border-rosebrand-200"
                      : "bg-amber-50 text-amber-700 border border-amber-200"
                  }`}
                >
                  {fPct(ep.rate)}
                </span>
              </div>

              {/* Total Revenue Lost */}
              <div className="sm:col-span-2 text-left sm:text-right">
                <span className="text-[11px] text-slate-400 block sm:hidden font-semibold uppercase">Revenue Lost</span>
                <span className="text-base font-extrabold text-rosebrand-600">{f$(ep.lost)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
