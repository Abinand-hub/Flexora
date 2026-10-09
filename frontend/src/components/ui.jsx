import React from "react";

export function Dot({ active = false, color = "#e11d48" }) {
  return (
    <span
      className="inline-block w-2 h-2 rounded-full flex-shrink-0"
      style={{
        backgroundColor: color,
        boxShadow: active ? `0 0 8px ${color}` : "none",
        animation: active ? "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" : "none",
      }}
    />
  );
}

export function Pill({ children, color = "#64748b", bg = "rgba(255, 255, 255, 0.85)", border = "rgba(226, 232, 240, 0.8)" }) {
  return (
    <span
      className="inline-flex items-center text-[10px] font-mono font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-full shadow-sm"
      style={{
        color,
        background: bg,
        border: `1px solid ${border}`,
      }}
    >
      {children}
    </span>
  );
}

export function BarLine({ value, max, color = "#e11d48" }) {
  const w = Math.min((value / (max || 1)) * 100, 100);
  return (
    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mt-1.5 border border-slate-200/50">
      <div
        className="h-full rounded-full transition-all duration-700"
        style={{
          width: `${w}%`,
          background: color.startsWith("#") || color.startsWith("rgb") || color.startsWith("var")
            ? color
            : `linear-gradient(90deg, #fb7185, #e11d48)`,
        }}
      />
    </div>
  );
}
