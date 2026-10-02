"use client";

import React, { useState } from "react";
import {
  Code2,
  Layers,
  Cpu,
  Sparkles,
  Flame,
  Shield,
  GraduationCap,
  Award,
  CheckCircle,
  ExternalLink,
} from "lucide-react";
import { audio } from "@/lib/audio";

import { useTheme } from "@/components/providers/ThemeProvider";

export const AboutStory: React.FC = () => {
  const [activeKeyword, setActiveKeyword] = useState<string>("Developer");
  const { theme } = useTheme();
  const isLight = theme === "light";

  const keywords = [
    {
      word: "Full Stack",
      icon: Code2,
      subtitle: "Next.js 14, React, Node.js, Express, MongoDB & PostgreSQL",
      detail: "Building production EdTech platforms with Next.js 14, React.js, Node.js, Express.js, MongoDB, and PostgreSQL powering 10K+ users."
    },
    {
      word: "Mobile App",
      icon: Layers,
      subtitle: "React Native & Capacitor — iOS & Android",
      detail: "Built the Adyapan mobile app from scratch using React Native and Capacitor for cross-platform iOS and Android distribution."
    },
    {
      word: "Backend & APIs",
      icon: Cpu,
      subtitle: "REST APIs, JWT Auth & Razorpay",
      detail: "Designing secure JWT authentication systems, Razorpay payment integrations, Prisma ORM data modeling, and optimized database queries."
    },
    {
      word: "DevOps & Cloud",
      icon: Shield,
      subtitle: "Docker, Linux, AWS & Vercel",
      detail: "Trained at LinuxWorld under Vimal Daga Sir. Deploying to Vercel, AWS (EC2, S3, CloudFront), Docker containers, and CI/CD pipelines."
    },
    {
      word: "UI/UX Design",
      icon: Sparkles,
      subtitle: "Tailwind CSS & Responsive Design",
      detail: "Crafting clean, responsive interfaces with Tailwind CSS — from EdTech dashboards to e-commerce storefronts and CRM systems."
    },
    {
      word: "Team Leadership",
      icon: Flame,
      subtitle: "Tech Team Head at Adyapan Edutech",
      detail: "Leading the entire tech team at SR's Adyapan Edutech — managing architecture, code reviews, sprint planning, and end-to-end product delivery."
    },
  ];

  return (
    <section
      id="about"
      className="relative pt-8 md:pt-16 pb-6 md:pb-10 px-6 sm:px-12 lg:px-20 w-full max-w-[1700px] mx-auto z-10 select-none flex flex-col justify-center"
    >
      {/* Main Section Header */}
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-5 sm:gap-8 lg:gap-16 mb-6 sm:mb-8">
        <div>
          <h2 className={`text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight uppercase whitespace-nowrap transition-colors ${isLight ? "text-zinc-950" : "text-white"
            }`}>
            About
          </h2>
        </div>
      </div>

      {/* Main Grid: Biography + Education/Honors */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8 md:mb-10">
        {/* Left Column: Simple Biography */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
            <span className="text-white">Tech Team Head & Full Stack Developer</span>
            <br />
            <span className="about-gradient-text bg-gradient-to-r from-cyan-200 via-blue-300 to-purple-300 bg-clip-text text-transparent">
              building EdTech platforms that
            </span>
            <br />
            <span className="text-white">
              power 10,000+ real users.
            </span>
          </h3>

          <p className="text-base sm:text-lg text-white font-normal leading-relaxed">
            I build end-to-end web platforms and mobile apps that solve real problems at scale. Currently leading the entire tech team at <strong>SR's Adyapan Edutech Pvt. Ltd.</strong> — where I built adyapan.com, adyapanschool.com, adyapancrm.in, and the Adyapan mobile app from scratch. Trained in full-stack development, DevOps, and cloud at <strong>LinuxWorld Informatics</strong> under Vimal Daga Sir.
          </p>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
              <span className="text-2xl sm:text-3xl font-bold text-white block mb-1">4+</span>
              <span className="text-xs text-white font-mono">Live Platforms</span>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
              <span className="text-2xl sm:text-3xl font-bold text-white block mb-1">10K+</span>
              <span className="text-xs text-white font-mono">Users Impacted</span>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
              <span className="text-2xl sm:text-3xl font-bold text-white block mb-2">8.0 <sub>CGPA</sub> </span>
              <span className="text-xs text-white font-mono">B.Tech (CSE)</span>
            </div>
          </div>
        </div>

        {/* Right Column: Education & Certifications */}
        <div className="lg:col-span-5 flex flex-col gap-4 p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/10">
          <span className="text-xs font-mono tracking-wider text-white uppercase">
            Education & Certifications
          </span>

          {/* Degree */}
          <div className="flex items-start gap-4 pb-4 border-b border-white/10">
            <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-white shrink-0 mt-0.5">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                Vivekananda Global University
              </h3>
              <p className="text-xs text-white mt-0.5">
                B.Tech in Computer Science & Engineering (2022 — 2026)
              </p>
              <span className="inline-block mt-2 px-2.5 py-0.5 rounded bg-white/10 text-[11px] font-mono text-white">
                CGPA: 8.0 / 10.00 (Jaipur, India)
              </span>
            </div>
          </div>

          {/* Certifications List */}
          <div className="flex flex-col gap-3 pt-1">
            <div className="flex items-start gap-3">
              <Award className="w-4 h-4 text-white mt-0.5 shrink-0" />
              <div>
                <span className="text-xs font-semibold text-white block">
                  Tech Team Head — SR's Adyapan Edutech Pvt. Ltd.
                </span>
                <span className="text-[11px] font-mono text-white">
                  Built 4+ live platforms · 10K+ users · March 2026 – Present
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle className="w-4 h-4 text-white mt-0.5 shrink-0" />
              <div>
                <span className="text-xs font-semibold text-white block">
                  Full Stack Trainee — LinuxWorld Informatics (Vimal Daga Sir)
                </span>
                <span className="text-[11px] font-mono text-white">
                  Linux · Docker · DevOps · AWS · Cloud · May 2025 – Feb 2026
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle className="w-4 h-4 text-white mt-0.5 shrink-0" />
              <div>
                <span className="text-xs font-semibold text-white block">
                  SQL Certification (HackerRank)
                </span>
                <span className="text-[11px] font-mono text-white">
                  Relational Queries & Database Optimization
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Core Competencies Matrix */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <span className="text-xs font-mono tracking-wider text-white uppercase">
            Core Skill Pillars
          </span>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {keywords.map((item) => {
            const Icon = item.icon;
            const isCurrent = activeKeyword === item.word;

            return (
              <div
                key={item.word}
                onMouseEnter={() => {
                  audio.playHover();
                  setActiveKeyword(item.word);
                }}
                className={`p-5 rounded-xl transition-all duration-300 border ${isCurrent
                  ? "bg-white/[0.06] border-white/30 shadow-lg scale-[1.01]"
                  : "bg-white/[0.02] hover:bg-white/[0.04] border-white/10"
                  }`}
                data-cursor="PILLAR"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2 rounded-lg border ${isCurrent ? "bg-white text-black border-white" : "bg-white/5 text-white border-white/10"
                    }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono text-white uppercase">
                    {item.word}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-1">
                  {item.word}
                </h3>
                <p className="text-xs text-white font-medium mb-2">
                  {item.subtitle}
                </p>
                <p className="text-xs text-white leading-relaxed">
                  {item.detail}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
