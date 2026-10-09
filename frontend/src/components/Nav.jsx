import React from "react";
import { useIsMobile } from "../format";

export function Nav({ route, go, hasSession, onViewDemo, onSignIn, onSignUp }) {
  const isMobile = useIsMobile();

  return (
    <header className="fixed top-5 left-0 right-0 z-50 px-4 flex justify-center pointer-events-none" data-purpose="site-header">
      <div className="pointer-events-auto flex items-center justify-between gap-4 md:gap-8 px-4 sm:px-6 py-2 rounded-full backdrop-blur-md bg-white/85 border border-slate-200/80 shadow-md shadow-slate-200/40 max-w-4xl w-full">
        {/* Logo Branding */}
        <button
          onClick={() => go("what")}
          className="flex items-center gap-2.5 group bg-transparent border-0 cursor-pointer p-0 text-left shrink-0"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-rose-600 via-rose-500 to-rose-400 flex items-center justify-center shadow-md shadow-rose-500/30 p-1.5 transition-transform group-hover:scale-105">
            <span className="text-white font-extrabold tracking-tighter text-xs font-mono">fx</span>
          </div>
          <span className="text-slate-900 font-bold text-base tracking-tight">Fluxera</span>
        </button>

        {/* Center Pill Navigation */}
        <nav className="hidden md:flex items-center text-xs font-medium text-slate-600">
          <ul className="flex items-center space-x-1 sm:space-x-2">
            <li>
              <button
                onClick={() => {
                  go("what");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer border-0 ${
                  route === "what" ? "text-slate-900 font-semibold bg-slate-100" : "hover:bg-slate-100 hover:text-rose-600 bg-transparent text-slate-700"
                }`}
              >
                Home
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  go("why");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer border-0 ${
                  route === "why" ? "text-slate-900 font-semibold bg-slate-100" : "hover:bg-slate-100 hover:text-rose-600 bg-transparent text-slate-700 font-medium"
                }`}
              >
                Vision
              </button>
            </li>
          </ul>
        </nav>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onSignIn}
            className="text-xs font-semibold text-slate-700 hover:text-rose-600 px-3.5 py-1.5 rounded-full hover:bg-slate-100 transition-all cursor-pointer border-0 bg-transparent"
          >
            Sign In
          </button>
          <button
            onClick={onViewDemo}
            className="px-5 py-2 text-xs font-bold rounded-full bg-gradient-to-r from-rose-600 via-rose-500 to-rose-600 hover:from-rose-500 hover:to-rose-600 text-white shadow-md shadow-rose-500/30 transition-all duration-200 hover:shadow-rose-500/50 hover:scale-[1.03] cursor-pointer border-0"
          >
            Dashboard
          </button>
        </div>
      </div>
    </header>
  );
}
