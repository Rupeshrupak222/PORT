"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import { Sparkles, ChevronDown, Check, MousePointer, ArrowRight } from "lucide-react";
import { audio } from "@/lib/audio";

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [statusText, setStatusText] = useState("INITIALIZING SPATIAL MATRIX");

  const isCompletedRef = useRef(false);
  const animRef = useRef<number | null>(null);

  const statuses = [
    "INITIALIZING SPATIAL MATRIX",
    "HYDRATING 3D GLSL SHADERS",
    "SYNCHRONIZING REPOSITORIES",
    "CALIBRATING LUXURY INTERACTION KERNEL",
    "SYSTEM MATRIX READY // WELCOME",
  ];

  const finishPreloader = useCallback(() => {
    if (isCompletedRef.current) return;
    isCompletedRef.current = true;
    setProgress(100);
    setStatusText(statuses[4]);
    setIsDone(true);
    
    try {
      audio.playChime();
    } catch {
      // Audio autoplay policy fallback
    }

    // Smooth exit reveal
    setTimeout(() => {
      document.body.style.overflow = "";
      onComplete();
    }, 700);
  }, [onComplete]);

  // Automated Smooth Progress Loop (0 to 100 in ~1.8 seconds)
  useEffect(() => {
    document.body.style.overflow = "hidden";
    let currentVal = 0;
    const startTime = performance.now();
    const duration = 1800; // ms

    const step = (now: number) => {
      if (isCompletedRef.current) return;

      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / duration);
      // Easing curve (smooth acceleration then soft finish)
      const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      currentVal = Math.min(100, Math.round(eased * 100));

      setProgress(currentVal);

      // Update status string
      if (currentVal < 25) setStatusText(statuses[0]);
      else if (currentVal < 50) setStatusText(statuses[1]);
      else if (currentVal < 75) setStatusText(statuses[2]);
      else if (currentVal < 99) setStatusText(statuses[3]);
      else setStatusText(statuses[4]);

      if (t >= 1) {
        finishPreloader();
      } else {
        animRef.current = requestAnimationFrame(step);
      }
    };

    animRef.current = requestAnimationFrame(step);

    // Global listener for fast unlock on any user interaction (scroll, click, key)
    const handleFastUnlock = () => {
      if (!isCompletedRef.current) {
        finishPreloader();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (["Enter", " ", "ArrowDown", "Escape"].includes(e.key)) {
        e.preventDefault();
        handleFastUnlock();
      }
    };

    window.addEventListener("wheel", handleFastUnlock, { passive: true });
    window.addEventListener("touchstart", handleFastUnlock, { passive: true });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      if (animRef.current) cancelAnimationFrame(animRef.current);
      window.removeEventListener("wheel", handleFastUnlock);
      window.removeEventListener("touchstart", handleFastUnlock);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [finishPreloader]);

  return (
    <div
      onClick={finishPreloader}
      className={`fixed inset-0 z-[9999] bg-[#050505] flex flex-col justify-between p-6 sm:p-12 transition-all duration-700 ease-out select-none cursor-pointer ${
        isDone
          ? "-translate-y-full opacity-0 pointer-events-none filter blur-md"
          : "translate-y-0 opacity-100"
      }`}
    >
      {/* Background Subtle Cyber Matrix */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,rgba(255,255,255,0.04),transparent_100%)] pointer-events-none" />

      {/* Top Header Bar */}
      <div className="relative flex justify-between items-center w-full z-10">
        <div className="flex items-center gap-2.5">
          <span
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              progress >= 100 ? "bg-emerald-400" : "bg-white animate-ping"
            }`}
          />
          <span className="font-mono text-[10px] sm:text-xs tracking-widest text-white/60 uppercase">
              RUPESH KUMAR RUPAK // SPATIAL MATRIX INITIALIZER
          </span>
        </div>

        {/* Skip Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            finishPreloader();
          }}
          className="px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/15 hover:bg-white hover:text-black hover:border-white transition-all text-xs font-mono text-white/80 flex items-center gap-1.5 cursor-pointer shadow-sm active:scale-95"
          data-cursor="ENTER"
        >
          <span>Skip to Portfolio</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Center RK Monogram / Holographic Progress Ring */}
      <div className="relative flex flex-col items-center justify-center text-center my-auto z-10">
        <div className="relative mb-6 w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center">
          {/* Outer SVG Holographic Progress Arc */}
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="46"
              className="stroke-white/10"
              strokeWidth="2"
              fill="transparent"
            />
            <circle
              cx="50"
              cy="50"
              r="46"
              className="stroke-white transition-all duration-75 ease-out"
              strokeWidth="3"
              strokeDasharray={289}
              strokeDashoffset={289 - (289 * progress) / 100}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>

          {/* Ambient Glow Halo */}
          <div
            className="absolute inset-2 rounded-full bg-white/10 blur-2xl transition-all duration-300 pointer-events-none"
            style={{
              opacity: 0.2 + (progress / 100) * 0.7,
              transform: `scale(${1 + (progress / 100) * 0.25})`,
            }}
          />

          {/* User Portrait with Glowing Monogram Badge */}
          <div
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-gradient-to-br from-white/[0.15] to-black/90 border border-white/30 backdrop-blur-xl flex flex-col items-center justify-center shadow-[0_0_40px_rgba(255,255,255,0.18)] transition-transform duration-200 ease-out relative"
            style={{
              transform: `scale(${0.95 + (progress / 100) * 0.1})`,
            }}
          >
            <div className="relative w-full h-full">
              <Image
                src="/rupesh-profile.jpg"
                alt="Rupesh Kumar Rupak"
                fill
                priority
                className="object-cover object-top opacity-85 hover:opacity-100 transition-opacity"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <span className="absolute bottom-1.5 left-0 right-0 text-center font-serif text-sm font-bold tracking-tight text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">
                RK
              </span>
            </div>
          </div>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-2 uppercase">
          Rupesh Kumar Rupak
        </h1>

        {/* Dynamic Status Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 mb-4 transition-all duration-300">
          <Sparkles className="w-3.5 h-3.5 text-white/70" />
          <span className="font-mono text-xs text-silver-300 uppercase tracking-wider">
            {statusText}
          </span>
        </div>

        {/* Interaction Hint */}
        <div className="flex flex-col items-center gap-2 mt-2">
          {progress >= 100 ? (
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 animate-pulse">
              <Check className="w-4 h-4" />
              <span>100% LOADED • ENTERING PORTFOLIO...</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-xs font-mono text-white/60">
              <MousePointer className="w-3.5 h-3.5 animate-bounce" />
              <span>Click or scroll anywhere to enter immediately</span>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Percentage Display & Progress Bar */}
      <div className="relative flex justify-between items-end w-full z-10">
        <div className="max-w-xs hidden sm:block">
          <p className="font-mono text-[10px] tracking-wider text-white/40 uppercase leading-relaxed">
            Full Stack Developer • Next.js 15 • Three.js • Cloud Architecture
          </p>
        </div>

        <div className="flex flex-col items-end">
          <div className="flex items-baseline font-mono text-5xl sm:text-7xl font-light text-white tracking-tighter">
            <span>{String(progress).padStart(2, "0")}</span>
            <span className="text-xl sm:text-2xl text-white/40 ml-1 font-sans">%</span>
          </div>
          <div className="w-36 sm:w-56 h-[3px] bg-white/10 mt-2 overflow-hidden rounded-full">
            <div
              className="h-full bg-white transition-all duration-75 ease-out rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
