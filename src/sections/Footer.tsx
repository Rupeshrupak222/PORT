"use client";

import React from "react";
import { ArrowUp, Mail, Github, Linkedin } from "lucide-react";
import { audio } from "@/lib/audio";
import { useTheme } from "@/components/providers/ThemeProvider";

export const Footer: React.FC = () => {
  const { theme } = useTheme();
  const isLight = theme === "light";

  const scrollToTop = () => {
    audio.playClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="footer"
      className={`footer-section relative w-full border-t pt-12 md:pt-16 pb-8 px-4 sm:px-8 md:px-14 overflow-hidden select-none z-10 transition-colors duration-300 ${
        isLight ? "bg-[#F8F9FA] border-black/10" : "bg-[#050505] border-white/10"
      }`}
    >
      {/* Subtle radial ambient glow */}
      <div
        className="footer-ambient-glow absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] opacity-20 filter blur-[140px] pointer-events-none"
        style={{
          background: isLight
            ? "radial-gradient(circle, #000000 0%, transparent 70%)"
            : "radial-gradient(circle, #ffffff 0%, transparent 70%)",
        }}
      />

      <div className="max-w-[1720px] mx-auto relative z-10">
        {/* Quick Social & Direct Contact Chips */}
        <div className="flex flex-wrap items-center justify-end gap-4 pb-8">
          <div className="flex flex-wrap items-end gap-2.5">
            <a
              href="https://www.linkedin.com/in/rupesh-kumar-rupak-bb4b44265"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => audio.playClick()}
              className={`footer-chip flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full border transition-all text-xs font-mono ${
                isLight
                  ? "bg-black/[0.04] border-black/10 text-zinc-700 hover:text-black hover:border-black/30"
                  : "bg-white/[0.04] border-white/10 text-zinc-300 hover:text-white hover:border-white/40"
              }`}
            >
              <Linkedin className="w-3.5 h-3.5 text-[#0A66C2]" />
              <span>LinkedIn</span>
            </a>

            <a
              href="https://github.com/Rupeshrupak222"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => audio.playClick()}
              className={`footer-chip flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full border transition-all text-xs font-mono ${
                isLight
                  ? "bg-black/[0.04] border-black/10 text-zinc-700 hover:text-black hover:border-black/30"
                  : "bg-white/[0.04] border-white/10 text-zinc-300 hover:text-white hover:border-white/40"
              }`}
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>

            <a
              href="mailto:rupeshrupak609@gmail.com"
              onClick={() => audio.playClick()}
              className={`footer-chip flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full border transition-all text-xs font-mono ${
                isLight
                  ? "bg-black/[0.04] border-black/10 text-zinc-700 hover:text-black hover:border-black/30"
                  : "bg-white/[0.04] border-white/10 text-zinc-300 hover:text-white hover:border-white/40"
              }`}
            >
              <Mail className="w-3.5 h-3.5 text-emerald-500" />
              <span>rupeshrupak609@gmail.com</span>
            </a>
          </div>
        </div>

        {/* Monumental Giant Cinematic Typography */}
        <div className="py-6 md:py-10 text-center overflow-hidden">
          <h2
            className={`footer-monumental-name text-[13vw] leading-none font-black tracking-tight select-none uppercase transition-all duration-700 ${
              isLight
                ? "text-black tracking-tighter md:text-[#09090B] md:hover:text-black"
                : "text-transparent bg-clip-text bg-gradient-to-b from-white via-white/85 to-white/45 drop-shadow-[0_4px_35px_rgba(255,255,255,0.25)] md:from-white/80 md:via-white/35 md:to-white/10 md:drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)] md:hover:from-white md:hover:via-white/85 md:hover:to-white/45 md:hover:drop-shadow-[0_4px_35px_rgba(255,255,255,0.25)]"
            }`}
          >
            RUPESH KUMAR RUPAK
          </h2>
        </div>

        {/* Bottom Legal & Back To Top Bar */}
        <div className={`footer-bottom-bar flex flex-col sm:flex-row items-center justify-between pt-6 text-xs uppercase font-mono gap-4 border-t ${
          isLight ? "border-black/10 text-zinc-600" : "border-white/10 text-zinc-400"
        }`}>
          <div className="flex items-center space-x-3 sm:space-x-4">
            <span className={`font-medium ${isLight ? "text-zinc-700" : "text-zinc-300"}`}>
              &copy; {new Date().getFullYear()} RUPESH KUMAR RUPAK &bull; ALL RIGHTS RESERVED
            </span>
          </div>

          <div className="hidden sm:flex items-center space-x-6">
            <button
              onClick={scrollToTop}
              data-cursor="TOP"
              className={`footer-top-btn flex items-center space-x-1.5 transition-colors font-semibold cursor-pointer ${
                isLight ? "text-zinc-700 hover:text-black" : "text-zinc-300 hover:text-white"
              }`}
            >
              <span>BACK TO TOP</span>
              <ArrowUp className={`w-3.5 h-3.5 ${isLight ? "text-zinc-900" : "text-white"}`} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
