"use client";

import React from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  Sparkles,
  Code2,
  Cpu,
  Layers,
  Award,
  Zap,
} from "lucide-react";
import { audio } from "@/lib/audio";

export const HeroSection: React.FC = () => {
  const handleScrollTo = (id: string) => {
    audio.playClick();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center md:py-20 pt-20 pb-4 px-6 sm:px-12 lg:px-20 w-full max-w-[1700px] mx-auto z-10 select-none"
    >
      {/* Main Full-Width Monumental Typography & Hero Presence */}
      <div className="py-4 flex flex-col items-start max-w-5xl">
        {/* Monumental Headline */}
        <h1 className="text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] font-extrabold tracking-tighter text-white leading-[0.88] uppercase mb-8">
          Rupesh <br />
          <span className="text-[#94A3B8] hero-name-kumar font-bold">Kumar Rupak</span>
        </h1>

        {/* Simple, Punchy Subtitle */}
        <p className="max-w-3xl text-lg sm:text-xl text-silver-300 font-normal leading-relaxed mb-10">
          Tech Team Head at Adyapan Edutech — building scalable web platforms &amp; mobile apps that power 10,000+ users. Full-stack engineer specializing in Next.js, React, Node.js, and impactful EdTech products.
        </p>

        {/* Verified Credential Highlights */}
        <div className="flex flex-wrap gap-3 mb-10">
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-xs font-mono text-white/80">
            <span className="text-white font-bold text-sm">4+</span>
            <span className="text-white/50 uppercase">Live Platforms</span>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-xs font-mono text-white/80">
            <span className="text-white font-bold text-sm">10K+</span>
            <span className="text-white/50 uppercase">Users Impacted</span>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-xs font-mono text-white/80">
            <span className="text-white font-bold text-sm">8.0 CGPA</span>
            <span className="text-white/50 uppercase">B.Tech CSE VGU</span>
          </div>
        </div>

        {/* Action Buttons & Social Channels */}
        <div className="flex flex-wrap items-center gap-4">
          <button
            onClick={() => handleScrollTo("projects")}
            className="px-8 py-4 rounded-full bg-white text-black text-xs font-bold uppercase tracking-wider hover:bg-silver-200 transition-all hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.25)] cursor-pointer"
            data-cursor="PROJECTS"
          >
            Explore Projects
          </button>

          <button
            onClick={() => handleScrollTo("contact")}
            className="hidden sm:inline-flex px-7 py-4 rounded-full bg-white/[0.04] border border-white/15 text-white text-xs font-medium uppercase tracking-wider hover:bg-white/10 hover:border-white/30 transition-all cursor-pointer"
            data-cursor="CONTACT"
          >
            Initiate Contact
          </button>

          {/* Social Links (Desktop Only) */}
          <div className="hidden sm:flex items-center gap-2 ml-0 sm:ml-2 mt-2 sm:mt-0">
            <a
              href="https://github.com/Rupeshrupak222"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-full bg-white/[0.03] border border-white/10 hover:border-white/30 text-white/70 hover:text-white transition-all"
              data-cursor="GITHUB"
              aria-label="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com/in/rupesh-kumar-rupak-bb4b44265"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-full bg-white/[0.03] border border-white/10 hover:border-white/30 text-white/70 hover:text-white transition-all"
              data-cursor="LINKEDIN"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="mailto:rupeshrupak609@gmail.com"
              className="p-3.5 rounded-full bg-white/[0.03] border border-white/10 hover:border-white/30 text-white/70 hover:text-white transition-all"
              data-cursor="EMAIL"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
