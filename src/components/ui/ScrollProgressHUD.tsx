"use client";

import React, { useEffect, useState } from "react";
import { ArrowUp, Compass } from "lucide-react";
import { audio } from "@/lib/audio";

export const ScrollProgressHUD: React.FC = () => {
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (scrollY / totalHeight) * 100 : 0;
      setScrollPercent(Math.min(100, Math.max(0, Math.round(progress))));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    audio.playClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 hidden sm:flex items-center gap-3 select-none">
      {/* Circular Progress & Percentage HUD Button */}
      <button
        onClick={scrollToTop}
        className="hud-button group relative w-12 h-12 rounded-full bg-[#0A0A0E]/90 border border-white/20 backdrop-blur-xl flex items-center justify-center text-white shadow-[0_0_30px_rgba(0,0,0,0.8)] hover:scale-105 hover:border-white transition-all cursor-pointer"
        title="Scroll Progress / Click for Summit"
        data-cursor="TOP"
      >
        {/* SVG Circular Progress Track */}
        <svg className="absolute inset-0 w-full h-full -rotate-90 p-1" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="42"
            className="hud-track stroke-white/10"
            strokeWidth="4"
            fill="transparent"
          />
          <circle
            cx="50"
            cy="50"
            r="42"
            className="hud-progress stroke-white transition-all duration-150 ease-out"
            strokeWidth="4"
            strokeDasharray={263.89}
            strokeDashoffset={263.89 - (263.89 * scrollPercent) / 100}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>

        {/* Center Percentage or Arrow on Hover */}
        <div className="hud-text relative flex items-center justify-center font-mono text-[10px] font-bold tracking-tighter">
          <span className="group-hover:hidden">{scrollPercent}%</span>
          <ArrowUp className="w-3.5 h-3.5 hidden group-hover:block transition-transform group-hover:-translate-y-0.5" />
        </div>
      </button>
    </div>
  );
};
