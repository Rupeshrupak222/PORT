"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { ArrowDown, Sparkles, ChevronDown, Check } from "lucide-react";
import { audio } from "@/lib/audio";

interface ScrollPreloaderProps {
  onUnlock?: () => void;
}

export const ScrollPreloader: React.FC<ScrollPreloaderProps> = ({ onUnlock }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const statuses = [
    "SCROLL TO INITIALIZE SPATIAL MATRIX",
    "HYDRATING 3D GLSL SHADER PIPELINE",
    "SYNCHRONIZING FULL STACK REPOSITORIES",
    "CALIBRATING LUXURY INTERACTION KERNEL",
    "MATRIX UNLOCKED // ENTERING SUMMIT",
  ];

  const getStatusIndex = (prog: number) => {
    if (prog < 25) return 0;
    if (prog < 50) return 1;
    if (prog < 75) return 2;
    if (prog < 99) return 3;
    return 4;
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowH = window.innerHeight;
      // The intro scroll distance is 1.5 viewport heights (150vh)
      const introScrollDistance = windowH * 1.5;

      const progress = Math.min(100, Math.max(0, (scrollY / introScrollDistance) * 100));
      setScrollProgress(Math.round(progress));

      if (progress >= 100 && !isUnlocked) {
        setIsUnlocked(true);
        audio.playChime();
        if (onUnlock) onUnlock();
      } else if (progress < 95 && isUnlocked) {
        setIsUnlocked(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isUnlocked, onUnlock]);

  const handleSkip = () => {
    audio.playChime();
    const heroEl = document.getElementById("hero");
    if (heroEl) {
      heroEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[220vh] z-30 select-none pointer-events-none"
    >
      {/* Sticky Fixed Fullscreen Viewport during Intro Scroll */}
      <div className="sticky top-0 left-0 w-full h-screen flex flex-col justify-between p-6 sm:p-12 overflow-hidden bg-[#050505]">
        {/* Top Header Bar */}
        <div className="flex justify-between items-center w-full z-10">
          <div className="flex items-center gap-2.5">
            <span
              className={`w-2 h-2 rounded-full transition-colors ${scrollProgress >= 100 ? "bg-emerald-400" : "bg-white animate-ping"
                }`}
            />
            <span className="font-mono text-[10px] sm:text-xs tracking-widest text-white/60 uppercase">
              RUPESH KUMAR RUPAK // SCROLL-DRIVEN INITIALIZATION
            </span>
          </div>

          {/* Skip Button */}
          <button
            onClick={handleSkip}
            className="pointer-events-auto px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/15 hover:bg-white hover:text-black hover:border-white transition-all text-xs font-mono text-white/80 flex items-center gap-1.5"
            data-cursor="SKIP"
          >
            <span>Skip to Hero</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Center Holographic Portrait & Progress Ring (Tied to Scroll) */}
        <div className="flex flex-col items-center justify-center text-center my-auto z-10">
          <div className="relative mb-6 w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center">
            {/* Outer SVG Holographic Progress Ring */}
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
                strokeDashoffset={289 - (289 * scrollProgress) / 100}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>

            {/* Glowing Ambient Halo */}
            <div
              className="absolute inset-2 rounded-full bg-white/10 blur-xl transition-all duration-300"
              style={{
                opacity: 0.2 + (scrollProgress / 100) * 0.6,
                transform: `scale(${1 + (scrollProgress / 100) * 0.2})`,
              }}
            />

            {/* User Portrait */}
            <div
              className="w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border-2 border-white/40 relative shadow-[0_0_35px_rgba(255,255,255,0.3)] transition-transform duration-100 ease-out"
              style={{
                transform: `scale(${0.95 + (scrollProgress / 100) * 0.15})`,
              }}
            >
              <Image
                src="/rupesh-profile.jpg"
                alt="Rupesh Kumar Rupak"
                fill
                priority
                className="object-cover object-top scale-105"
              />
            </div>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-2 uppercase">
            Rupesh Kumar Rupak
          </h1>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-white/70" />
            <span className="font-mono text-xs text-silver-300 uppercase tracking-wider">
              {statuses[getStatusIndex(scrollProgress)]}
            </span>
          </div>

          {/* Scroll Cue Animation */}
          <div
            className={`flex items-center gap-2 text-xs font-mono transition-opacity duration-300 ${scrollProgress >= 100 ? "text-emerald-400 opacity-100" : "text-white/50 opacity-80"
              }`}
          >
            {scrollProgress >= 100 ? (
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4" />
                <span>100% REACHED • SCROLL DOWN TO ENTER PORTFOLIO</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 animate-bounce">
                <ArrowDown className="w-3.5 h-3.5" />
                <span>Scroll down to increase percentage ({scrollProgress}%)</span>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Percentage Display & Progress Bar */}
        <div className="flex justify-between items-end w-full z-10">
          <div className="max-w-xs hidden sm:block">
            <p className="font-mono text-[10px] tracking-wider text-white/40 uppercase leading-relaxed">
              Full Stack Developer • Next.js 15 • Three.js • PostgreSQL • Cloud Architecture
            </p>
          </div>

          <div className="flex flex-col items-end">
            <div className="flex items-baseline font-mono text-5xl sm:text-7xl font-light text-white tracking-tighter">
              <span>{String(scrollProgress).padStart(2, "0")}</span>
              <span className="text-xl sm:text-2xl text-white/40 ml-1 font-sans">%</span>
            </div>
            <div className="w-36 sm:w-48 h-[2px] bg-white/10 mt-2 overflow-hidden">
              <div
                className="h-full bg-white transition-all duration-75 ease-out"
                style={{ width: `${scrollProgress}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
