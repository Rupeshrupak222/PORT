"use client";

import { useEffect } from "react";

export const SecurityShield: React.FC = () => {
  useEffect(() => {
    // ── 1. CONSOLE WARNING ──────────────────────────────────────────────────
    console.clear();
    console.log(
      "%c⛔ STOP!",
      "color: #ff4444; font-size: 48px; font-weight: 900;"
    );
    console.log(
      "%cThis is the private portfolio of Rupesh Kumar Rupak.\nUnauthorized access, copying, or reproduction of this code is strictly prohibited.\n© 2026 Rupesh Kumar Rupak — All Rights Reserved.",
      "color: #ffffff; background: #0a0a0a; font-size: 14px; padding: 12px 16px; border-left: 4px solid #ff4444;"
    );
    console.log(
      "%c💼 If you are a recruiter or collaborator, reach out at rupeshrupak609@gmail.com",
      "color: #94a3b8; font-size: 12px;"
    );

    // ── 2. RIGHT-CLICK DISABLE ───────────────────────────────────────────────
    const blockContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    // ── 3. KEYBOARD SHORTCUTS BLOCK ─────────────────────────────────────────
    const blockShortcuts = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();

      // Block F12
      if (e.key === "F12") {
        e.preventDefault();
        return false;
      }

      // Block Ctrl+U (view source), Ctrl+S (save), Ctrl+Shift+I/J/C (devtools)
      // Block Ctrl+A (select all), Ctrl+C (copy)
      if (e.ctrlKey || e.metaKey) {
        if (
          ["u", "s", "a", "c", "p"].includes(key) ||
          (e.shiftKey && ["i", "j", "c", "k"].includes(key))
        ) {
          e.preventDefault();
          return false;
        }
      }
    };

    // ── 4. DRAG DISABLE ─────────────────────────────────────────────────────
    const blockDrag = (e: DragEvent) => {
      e.preventDefault();
      return false;
    };

    // ── 5. DEVTOOLS DETECTION ────────────────────────────────────────────────
    // Detect via window size difference (devtools docked = width shrinks)
    let devtoolsOpen = false;

    const detectDevTools = () => {
      const threshold = 160;
      const widthDiff = window.outerWidth - window.innerWidth;
      const heightDiff = window.outerHeight - window.innerHeight;

      if (widthDiff > threshold || heightDiff > threshold) {
        if (!devtoolsOpen) {
          devtoolsOpen = true;
          // Blur the entire page
          document.body.style.filter = "blur(8px)";
          document.body.style.pointerEvents = "none";

          // Show overlay warning
          const overlay = document.getElementById("devtools-overlay");
          if (overlay) overlay.style.display = "flex";
        }
      } else {
        if (devtoolsOpen) {
          devtoolsOpen = false;
          document.body.style.filter = "";
          document.body.style.pointerEvents = "";
          const overlay = document.getElementById("devtools-overlay");
          if (overlay) overlay.style.display = "none";
        }
      }
    };

    // Debugger trap — slows down devtools console usage
    const devtoolsTrap = () => {
      const start = performance.now();
      // eslint-disable-next-line no-debugger
      debugger;
      const end = performance.now();
      // If debugger paused (devtools open), execution time > 100ms
      if (end - start > 100) {
        document.body.style.filter = "blur(8px)";
        document.body.style.pointerEvents = "none";
      }
    };

    // ── 6. PRINT DISABLE ────────────────────────────────────────────────────
    const blockPrint = () => {
      window.print = () => {};
    };
    blockPrint();

    // ── ATTACH ALL LISTENERS ─────────────────────────────────────────────────
    document.addEventListener("contextmenu", blockContextMenu);
    document.addEventListener("keydown", blockShortcuts);
    document.addEventListener("dragstart", blockDrag);

    const devtoolsInterval = setInterval(detectDevTools, 1000);
    const trapInterval = setInterval(devtoolsTrap, 5000);

    return () => {
      document.removeEventListener("contextmenu", blockContextMenu);
      document.removeEventListener("keydown", blockShortcuts);
      document.removeEventListener("dragstart", blockDrag);
      clearInterval(devtoolsInterval);
      clearInterval(trapInterval);
    };
  }, []);

  return (
    // DevTools overlay — shown when devtools detected
    <div
      id="devtools-overlay"
      style={{
        display: "none",
        position: "fixed",
        inset: 0,
        zIndex: 999999,
        background: "rgba(5,5,5,0.97)",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "16px",
        pointerEvents: "all",
      }}
    >
      <span style={{ fontSize: "48px" }}>⛔</span>
      <h2
        style={{
          color: "#ff4444",
          fontSize: "24px",
          fontWeight: 900,
          fontFamily: "monospace",
          letterSpacing: "0.1em",
          textAlign: "center",
        }}
      >
        DEVELOPER TOOLS DETECTED
      </h2>
      <p
        style={{
          color: "#94a3b8",
          fontSize: "13px",
          fontFamily: "monospace",
          textAlign: "center",
          maxWidth: "400px",
          lineHeight: "1.6",
        }}
      >
        This is the private portfolio of{" "}
        <strong style={{ color: "#ffffff" }}>Rupesh Kumar Rupak</strong>.
        <br />
        Unauthorized inspection is not permitted.
        <br />
        Please close Developer Tools to continue.
      </p>
      <p
        style={{
          color: "#475569",
          fontSize: "11px",
          fontFamily: "monospace",
          marginTop: "8px",
        }}
      >
        © 2026 Rupesh Kumar Rupak • All Rights Reserved
      </p>
    </div>
  );
};
