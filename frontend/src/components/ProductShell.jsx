import React from "react";
import { useIsMobile } from "../format";
import { Pill, Dot } from "./ui";

export function ProductShell({
  children,
  page,
  go,
  company,
  isDemo,
  live,
  setLive,
  period,
  setPeriod,
  onLogout,
}) {
  const nav = [
    { id: "overview", label: "Overview" },
    { id: "workflows", label: "Workflows" },
    { id: "tools", label: "Tools" },
    { id: "executions", label: "Executions" },
    { id: "logs", label: "Logs" },
    { id: "settings", label: "Settings" },
  ];
  const isMobile = useIsMobile();
  const title =
    nav.find((n) => n.id === page)?.label ||
    (page === "execution"
      ? "Execution"
      : page === "history"
      ? "History"
      : page === "tool"
      ? "Tool"
      : page);
  const showHistory = page !== "settings";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        minHeight: "calc(100vh - 57px)",
        background: "#fafbfd",
      }}
    >
      <aside
        style={
          isMobile
            ? {
                width: "100%",
                background: "rgba(255, 255, 255, 0.9)",
                borderBottom: "1px solid rgba(226, 232, 240, 0.8)",
                display: "flex",
                flexDirection: "column",
                backdropFilter: "blur(10px)",
              }
            : {
                width: 210,
                background: "rgba(255, 255, 255, 0.9)",
                borderRight: "1px solid rgba(226, 232, 240, 0.8)",
                display: "flex",
                flexDirection: "column",
                flexShrink: 0,
                backdropFilter: "blur(10px)",
              }
        }
      >
        {!isMobile && (
          <div
            style={{
              padding: "18px 20px 14px",
              borderBottom: "1px solid rgba(226, 232, 240, 0.8)",
            }}
          >
            <p
              style={{
                fontSize: 10,
                fontWeight: 600,
                color: "var(--gray4)",
                letterSpacing: ".08em",
                marginBottom: 3,
              }}
            >
              WORKSPACE
            </p>
            <p
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: "var(--ink)",
                textTransform: "capitalize",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {company}
            </p>
            {isDemo && (
              <span
                style={{
                  display: "inline-block",
                  marginTop: 6,
                  fontSize: 10,
                  fontWeight: 600,
                  color: "#e11d48",
                  background: "#fff1f2",
                  padding: "2px 8px",
                  borderRadius: 12,
                  border: "1px solid #fecdd3",
                }}
              >
                DEMO MODE
              </span>
            )}
          </div>
        )}
        <nav
          style={
            isMobile
              ? { padding: "8px 10px", display: "flex", gap: 4, overflowX: "auto" }
              : { padding: "12px 10px", flex: 1 }
          }
        >
          {nav.map((n) => {
            const on =
              page === n.id ||
              (page === "execution" && n.id === "executions") ||
              (page === "tool" && n.id === "tools");
            return (
              <button
                key={n.id}
                onClick={() => go(n.id)}
                style={{
                  width: isMobile ? "auto" : "100%",
                  whiteSpace: "nowrap",
                  display: "flex",
                  alignItems: "center",
                  padding: "8px 12px",
                  background: on ? "#fff1f2" : "transparent",
                  border: on ? "1px solid #fecdd3" : "1px solid transparent",
                  borderRadius: 8,
                  color: on ? "#e11d48" : "var(--gray4)",
                  fontSize: 12,
                  fontWeight: on ? 600 : 500,
                  cursor: "pointer",
                  marginBottom: isMobile ? 0 : 3,
                  textAlign: "left",
                  transition: "all 0.15s ease",
                }}
              >
                {n.label}
              </button>
            );
          })}
        </nav>
        <div
          style={
            isMobile
              ? {
                  padding: "8px 10px",
                  borderTop: "1px solid rgba(226, 232, 240, 0.8)",
                  display: "flex",
                  gap: 8,
                  overflowX: "auto",
                }
              : {
                  padding: "14px 16px",
                  borderTop: "1px solid rgba(226, 232, 240, 0.8)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }
          }
        >
          {isDemo && (
            <button
              onClick={() => setLive(!live)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 7,
                padding: "8px 10px",
                background: live ? "#fff1f2" : "#f1f5f9",
                border: "1px solid " + (live ? "#fda4af" : "#e2e8f0"),
                borderRadius: 8,
                fontSize: 11,
                fontWeight: 600,
                color: live ? "#e11d48" : "#64748b",
                cursor: "pointer",
                fontFamily: "JetBrains Mono, monospace",
                letterSpacing: ".05em",
                whiteSpace: "nowrap",
              }}
            >
              <Dot active={live} color={live ? "#e11d48" : "#94a3b8"} />
              {live ? "SIMULATING" : "STATIC"}
            </button>
          )}
          <button
            onClick={onLogout}
            style={{
              padding: "7px 10px",
              background: "transparent",
              border: "1px solid #e2e8f0",
              borderRadius: 8,
              color: "#64748b",
              fontSize: 11,
              fontWeight: 500,
              cursor: "pointer",
              textAlign: "center",
              whiteSpace: "nowrap",
            }}
          >
            Sign out
          </button>
        </div>
      </aside>
      <main style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <div
          style={{
            padding: isMobile ? "10px 14px" : "14px 28px",
            borderBottom: "1px solid rgba(226, 232, 240, 0.8)",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: isMobile ? 8 : 0,
            alignItems: isMobile ? "stretch" : "center",
            justifyContent: "space-between",
            background: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(10px)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 15, fontWeight: 700, letterSpacing: "-.01em", color: "#0f172a" }}>
              {title}
            </span>
            {live && isDemo && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  fontSize: 10,
                  fontFamily: "JetBrains Mono, monospace",
                  color: "#e11d48",
                  padding: "2px 8px",
                  background: "#fff1f2",
                  border: "1px solid #fecdd3",
                  borderRadius: 20,
                  fontWeight: 600,
                }}
              >
                <Dot active color="#e11d48" />
                LIVE STREAM
              </div>
            )}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            {showHistory && (
              <button
                onClick={() => go("history")}
                style={{
                  padding: "6px 14px",
                  border: "1px solid " + (page === "history" ? "#e11d48" : "#e2e8f0"),
                  borderRadius: 8,
                  background: page === "history" ? "#fff1f2" : "#ffffff",
                  color: page === "history" ? "#e11d48" : "#0f172a",
                  fontSize: 12,
                  fontWeight: page === "history" ? 600 : 500,
                  cursor: "pointer",
                }}
              >
                History
              </button>
            )}
            {["overview", "logs"].includes(page) && (
              <div
                style={{
                  display: "flex",
                  border: "1px solid #e2e8f0",
                  borderRadius: 8,
                  overflow: "hidden",
                  background: "#ffffff",
                  alignSelf: isMobile ? "flex-start" : "auto",
                }}
              >
                {["24h", "7d", "30d"].map((p) => (
                  <button
                    key={p}
                    onClick={() => setPeriod(p)}
                    style={{
                      padding: "6px 14px",
                      background: period === p ? "#fff1f2" : "#ffffff",
                      border: "none",
                      borderRight: p !== "30d" ? "1px solid #e2e8f0" : "none",
                      color: period === p ? "#e11d48" : "#64748b",
                      fontSize: 12,
                      fontWeight: period === p ? 600 : 500,
                      cursor: "pointer",
                    }}
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        <div style={{ flex: 1, padding: isMobile ? "16px 14px 24px" : "28px 28px 40px", overflowX: "auto" }}>
          {children}
        </div>
      </main>
    </div>
  );
}
