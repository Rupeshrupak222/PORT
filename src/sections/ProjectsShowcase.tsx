"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { projectsData } from "@/data/projectsData";
import {
  ArrowRight,
  ExternalLink,
  Search,
  LayoutGrid,
  Layers,
  Sparkles,
  Globe,
} from "lucide-react";

// Category accent colors
const categoryColors: Record<string, string> = {
  EdTech: "#6366F1",
  "AI & ML": "#8B5CF6",
  "Full Stack": "#10B981",
  "E-Commerce": "#F59E0B",
  "Mobile & Desktop": "#0EA5E9",
  "Cloud & Microservices": "#38BDF8",
  "WebGL & 3D": "#F472B6",
};

// Live website preview card with iframe
const ProjectCard: React.FC<{
  project: (typeof projectsData)[0];
}> = ({ project }) => {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [iframeError, setIframeError] = useState(false);
  const accent = categoryColors[project.category] || "#FFFFFF";

  return (
    <div
      className="w-[85vw] sm:w-[500px] md:w-[430px] lg:w-[460px] xl:w-[500px] h-[68vh] sm:h-[70vh] max-h-[660px] min-h-[520px] rounded-3xl bg-[#09090E]/94 border border-white/15 backdrop-blur-2xl flex flex-col justify-between shadow-[0_25px_60px_rgba(0,0,0,0.85)] group hover:border-white/35 transition-all relative overflow-hidden shrink-0"
      data-cursor="VIEW"
      style={{ "--accent": accent } as React.CSSProperties}
    >
      {/* Subtle accent glow top */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] opacity-70 rounded-t-3xl"
        style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
      />

      {/* 1. TOP: LIVE WEBSITE PREVIEW */}
      <a
        href={project.links?.live || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="relative w-full h-[240px] sm:h-[260px] rounded-t-3xl overflow-hidden border-b border-white/10 shrink-0 block bg-[#050508] group/preview"
        data-cursor="VIEW"
      >
        {/* Live iframe preview */}
        {!iframeError ? (
          <>
            <iframe
              src={project.livePreviewUrl || project.links?.live}
              title={`${project.title} live preview`}
              className={`w-[200%] h-[200%] origin-top-left scale-50 border-0 pointer-events-none transition-opacity duration-700 ${iframeLoaded ? "opacity-100" : "opacity-0"}`}
              style={{ transformOrigin: "0 0" }}
              onLoad={() => setIframeLoaded(true)}
              onError={() => setIframeError(true)}
              sandbox="allow-scripts allow-same-origin"
              loading="lazy"
            />
            {/* Fallback placeholder while iframe loads */}
            {!iframeLoaded && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center border border-white/20"
                  style={{ background: `${accent}22` }}
                >
                  <Globe className="w-5 h-5" style={{ color: accent }} />
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-20 h-1.5 rounded-full bg-white/10 animate-pulse" />
                  <div className="w-32 h-1.5 rounded-full bg-white/10 animate-pulse" />
                  <div className="w-24 h-1.5 rounded-full bg-white/10 animate-pulse" />
                </div>
                <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">
                  Loading Preview...
                </span>
              </div>
            )}
          </>
        ) : (
          // Error fallback — show accent block with domain
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-3"
            style={{ background: `linear-gradient(135deg, ${accent}18, #09090E)` }}
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center border border-white/20"
              style={{ background: `${accent}22` }}
            >
              <Globe className="w-6 h-6 text-white/70" />
            </div>
            <span className="text-sm font-bold text-white/80 font-mono">
              {project.links?.live?.replace("https://", "")}
            </span>
            <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
              Live Website
            </span>
          </div>
        )}

        {/* Hover overlay: "Open Live Site" */}
        <div className="absolute inset-0 bg-black/0 group-hover/preview:bg-black/50 transition-all duration-300 flex items-center justify-center opacity-0 group-hover/preview:opacity-100">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black text-xs font-bold uppercase tracking-wider shadow-xl">
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Open Live Site</span>
          </div>
        </div>

        {/* Domain badge top-left */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 border border-white/10 backdrop-blur-md">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] font-mono text-white/80">
            {project.links?.live?.replace("https://", "").replace("http://", "")}
          </span>
        </div>
      </a>

      {/* 2. BODY */}
      <div className="flex flex-col flex-1 px-5 pt-3 pb-4 gap-2 min-h-0">
        {/* Category + Year */}
        <div className="flex items-center justify-between shrink-0">
          <span
            className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider border"
            style={{
              color: accent,
              borderColor: `${accent}40`,
              background: `${accent}12`,
            }}
          >
            {project.category}
          </span>
          <span className="text-[10px] font-mono text-white/40">{project.year}</span>
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-tight group-hover:text-white transition-colors leading-tight shrink-0">
          {project.title}
        </h3>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1.5 shrink-0">
          {project.techStack.slice(0, 5).map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/10 text-[10px] font-mono text-white/80"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 5 && (
            <span className="px-2 py-0.5 rounded-full bg-white/[0.03] border border-white/8 text-[10px] font-mono text-white/40">
              +{project.techStack.length - 5}
            </span>
          )}
        </div>

        {/* Brief */}
        <p className="text-xs text-white/60 leading-relaxed line-clamp-2 flex-1 min-h-0">
          {project.brief}
        </p>

        {/* Bottom action */}
        <div className="flex items-center justify-between pt-2.5 border-t border-white/10 shrink-0 mt-auto">
          <div className="flex gap-1.5">
            {project.metrics.slice(0, 1).map((m) => (
              <div key={m.label} className="flex items-center gap-1">
                <span className="text-xs font-bold text-white">{m.value}</span>
                <span className="text-[10px] text-white/40 font-mono">{m.label}</span>
              </div>
            ))}
          </div>

          {project.links?.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-1.5 rounded-full font-bold text-xs uppercase tracking-wider hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 shadow-md cursor-pointer"
              style={{
                background: accent,
                color: "#000",
              }}
              data-cursor="VIEW"
            >
              <span>Visit</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export const ProjectsShowcase: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [viewMode, setViewMode] = useState<"horizontal" | "grid">("horizontal");
  const [trackWidth, setTrackWidth] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(900);

  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const filteredProjects = useMemo(() => {
    return projectsData.filter((p) => {
      const matchSearch =
        searchQuery === "" ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.techStack.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchSearch;
    });
  }, [searchQuery]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.25,
    restDelta: 0.0005,
  });

  useEffect(() => {
    const updateDimensions = () => {
      setViewportHeight(window.innerHeight);
      if (trackRef.current) {
        const fullTrackWidth = trackRef.current.scrollWidth;
        const viewportWidth = window.innerWidth;
        const paddingOffset = window.innerWidth < 768 ? 60 : 160;
        const totalDistance = Math.max(0, fullTrackWidth - viewportWidth + paddingOffset);
        setTrackWidth(totalDistance);
      }
    };

    updateDimensions();

    let observer: ResizeObserver | null = null;
    if (trackRef.current && typeof ResizeObserver !== "undefined") {
      observer = new ResizeObserver(updateDimensions);
      observer.observe(trackRef.current);
    }

    window.addEventListener("resize", updateDimensions);
    const timeout = setTimeout(updateDimensions, 100);

    return () => {
      window.removeEventListener("resize", updateDimensions);
      clearTimeout(timeout);
      if (observer) observer.disconnect();
    };
  }, [filteredProjects, viewMode]);

  const xTransform = useTransform(smoothProgress, [0, 0.92, 1], [0, -trackWidth, -trackWidth]);

  const containerHeightStyle = useMemo(() => {
    if (viewMode === "grid") return "auto";
    const baseDistance = trackWidth > 0 ? trackWidth : filteredProjects.length * 520;
    const totalHeight = baseDistance + viewportHeight * 1.5;
    return `${Math.round(totalHeight)}px`;
  }, [viewMode, trackWidth, filteredProjects.length, viewportHeight]);

  return (
    <>
      <section
        id="projects"
        ref={containerRef}
        style={{ height: containerHeightStyle }}
        className={`relative w-full select-none ${
          viewMode === "grid"
            ? "min-h-screen py-24 px-6 sm:px-12 lg:px-20 max-w-[1700px] mx-auto"
            : ""
        }`}
      >
        {viewMode === "horizontal" ? (
          <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between pt-20 sm:pt-24 pb-4 sm:pb-6 px-4 sm:px-8 lg:px-12 z-20">
            {/* Background ambient glows */}
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[550px] h-[550px] bg-indigo-500/[0.025] rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-10 right-1/4 w-[450px] h-[450px] bg-purple-500/[0.02] rounded-full blur-3xl pointer-events-none" />

            {/* --- TOP HUD BAR --- */}
            <div className="relative z-10 w-full flex items-center justify-between gap-2 sm:gap-4 shrink-0 mb-2 sm:mb-4">
              <div className="flex items-center gap-2 sm:gap-4 shrink-0">
                <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white flex items-center gap-2">
                  <span>Projects</span>
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white/60 hidden sm:inline" />
                </h2>
                <span className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[11px] font-mono text-indigo-300">
                  <Globe className="w-3 h-3" />
                  Live Websites
                </span>
              </div>

              {/* Search & Mode Switcher */}
              <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
                <div className="relative flex items-center min-w-0">
                  <Search className="absolute left-2.5 sm:left-3 w-3.5 h-3.5 text-white/50 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-7 sm:pl-8 pr-2.5 sm:pr-3 py-1 sm:py-1.5 rounded-full bg-white/[0.04] border border-white/15 focus:border-white text-[11px] sm:text-xs font-mono text-white placeholder:text-white/40 outline-none w-24 xs:w-32 sm:w-44 transition-all"
                  />
                </div>

                <div className="flex items-center p-0.5 rounded-full bg-white/[0.03] border border-white/10 shrink-0">
                  <button
                    onClick={() => setViewMode("horizontal")}
                    className="p-1.5 sm:px-3 sm:py-1 rounded-full text-xs font-mono flex items-center gap-1.5 bg-white text-black font-semibold shadow-sm transition-all cursor-pointer"
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Stream</span>
                  </button>
                  <button
                    onClick={() => setViewMode("grid")}
                    className="p-1.5 sm:px-3 sm:py-1 rounded-full text-xs font-mono flex items-center gap-1.5 text-white/60 hover:text-white transition-all cursor-pointer"
                  >
                    <LayoutGrid className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Grid</span>
                  </button>
                </div>
              </div>
            </div>

            {/* --- HORIZONTAL LIVE-PREVIEW PROJECT CARDS --- */}
            <div className="relative w-full my-auto overflow-hidden py-1">
              <motion.div
                ref={trackRef}
                style={{ x: xTransform }}
                className="flex gap-6 sm:gap-7 items-stretch w-max pr-24 lg:pr-36 will-change-transform"
              >
                {filteredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}

                {/* "And Many More..." end card */}
                <div className="w-[85vw] sm:w-[500px] md:w-[430px] lg:w-[460px] xl:w-[500px] h-[68vh] sm:h-[70vh] max-h-[660px] min-h-[520px] rounded-3xl bg-gradient-to-br from-[#0c0c14]/95 via-[#09090e]/95 to-[#151524]/95 border border-white/15 backdrop-blur-2xl p-6 sm:p-8 flex flex-col justify-between shadow-[0_25px_60px_rgba(0,0,0,0.85)] relative overflow-hidden shrink-0 group hover:border-white/35 transition-all">
                  <div className="absolute -top-16 -right-16 w-44 h-44 bg-indigo-500/[0.06] rounded-full blur-3xl pointer-events-none" />
                  <div className="absolute -bottom-16 -left-16 w-44 h-44 bg-purple-500/[0.05] rounded-full blur-3xl pointer-events-none" />

                  <div className="flex flex-col justify-center my-auto">
                    <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest mb-3">
                      More Coming Soon
                    </span>
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4">
                      And Many More Projects...
                    </h3>
                    <p className="text-xs sm:text-sm text-white/50 leading-relaxed max-w-md">
                      A growing portfolio of EdTech platforms, AI tools, CRM systems, and web applications — built for real users and real impact at SR's Adyapan Edutech.
                    </p>
                  </div>

                  <div className="flex items-center justify-end pt-4 border-t border-white/10 shrink-0">
                    <a
                      href="#contact"
                      className="px-5 py-2.5 rounded-full bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-white/90 transition-all flex items-center gap-2 shadow-md hover:scale-105 active:scale-95 cursor-pointer"
                    >
                      <span>Let&apos;s Connect</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        ) : (
          /* GRID MODE */
          <div className="w-full">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
              <div>
                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                  Projects
                </h2>
                <p className="mt-2 text-white/50 text-sm sm:text-base max-w-xl">
                  Live EdTech platforms, AI tools, and web applications built for real users.
                </p>
              </div>

              <div className="flex items-center gap-2 sm:gap-3 flex-wrap sm:flex-nowrap">
                <div className="relative flex items-center min-w-0">
                  <Search className="absolute left-2.5 sm:left-3 w-3.5 h-3.5 text-white/50 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Search tech..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-7 sm:pl-8 pr-2.5 sm:pr-3 py-1.5 rounded-full bg-white/[0.04] border border-white/15 focus:border-white text-xs font-mono text-white placeholder:text-white/40 outline-none w-32 xs:w-44 sm:w-52 transition-all"
                  />
                </div>

                <div className="flex items-center p-0.5 sm:p-1 rounded-full bg-white/[0.03] border border-white/10 shrink-0">
                  <button
                    onClick={() => setViewMode("horizontal")}
                    className="px-2.5 sm:px-3 py-1 rounded-full text-xs font-mono flex items-center gap-1.5 text-white/60 hover:text-white transition-all cursor-pointer"
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Stream</span>
                  </button>
                  <button
                    onClick={() => setViewMode("grid")}
                    className="px-2.5 sm:px-3 py-1 rounded-full text-xs font-mono flex items-center gap-1.5 bg-white text-black font-semibold shadow-sm transition-all cursor-pointer"
                  >
                    <LayoutGrid className="w-3.5 h-3.5" />
                    <span>Grid ({filteredProjects.length})</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredProjects.map((proj) => {
                const accent = categoryColors[proj.category] || "#FFFFFF";
                return (
                  <div
                    key={proj.id}
                    className="rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/30 hover:bg-white/[0.03] transition-all flex flex-col overflow-hidden group"
                  >
                    {/* Live iframe preview */}
                    <a
                      href={proj.links?.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative w-full h-44 overflow-hidden bg-[#050508] shrink-0 block group/prev"
                    >
                      <iframe
                        src={proj.livePreviewUrl || proj.links?.live}
                        title={`${proj.title} preview`}
                        className="w-[200%] h-[200%] origin-top-left scale-50 border-0 pointer-events-none"
                        style={{ transformOrigin: "0 0" }}
                        sandbox="allow-scripts allow-same-origin"
                        loading="lazy"
                      />
                      {/* Top accent line */}
                      <div
                        className="absolute top-0 left-0 right-0 h-[2px]"
                        style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
                      />
                      {/* Domain badge */}
                      <div className="absolute top-2 left-2 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/60 border border-white/10 backdrop-blur-md">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-[9px] font-mono text-white/70">
                          {proj.links?.live?.replace("https://", "")}
                        </span>
                      </div>
                      <div className="absolute inset-0 bg-black/0 group-hover/prev:bg-black/50 transition-all flex items-center justify-center opacity-0 group-hover/prev:opacity-100">
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-black text-xs font-bold">
                          <ExternalLink className="w-3 h-3" />
                          <span>Open</span>
                        </div>
                      </div>
                    </a>

                    <div className="p-5 flex flex-col gap-2 flex-1">
                      <div className="flex items-center justify-between">
                        <span
                          className="px-2 py-0.5 rounded-full text-[10px] font-mono border"
                          style={{ color: accent, borderColor: `${accent}40`, background: `${accent}12` }}
                        >
                          {proj.category}
                        </span>
                        <span className="text-[10px] font-mono text-white/40">{proj.year}</span>
                      </div>

                      <h3 className="text-lg font-bold text-white group-hover:text-white/90 transition-colors">
                        {proj.title}
                      </h3>

                      <div className="flex flex-wrap gap-1">
                        {proj.techStack.slice(0, 4).map((t) => (
                          <span key={t} className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/5 text-[10px] font-mono text-white/60">
                            {t}
                          </span>
                        ))}
                      </div>

                      <p className="text-xs text-white/50 leading-relaxed line-clamp-2 flex-1">
                        {proj.brief}
                      </p>

                      <div className="flex items-center justify-end pt-3 border-t border-white/10 mt-auto">
                        {proj.links?.live && (
                          <a
                            href={proj.links.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3.5 py-1.5 rounded-full font-bold text-[11px] uppercase tracking-wider flex items-center gap-1 transition-all hover:scale-105"
                            style={{ background: accent, color: "#000" }}
                          >
                            <span>Visit</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* End card */}
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/30 transition-all flex flex-col justify-between group">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">And Many More...</h3>
                  <p className="text-xs text-white/50 leading-relaxed">
                    A growing portfolio of EdTech platforms, AI tools, CRM systems, and web applications — all built for real users at Adyapan Edutech.
                  </p>
                </div>
                <div className="flex items-center justify-end pt-4 border-t border-white/10 mt-6">
                  <a
                    href="#contact"
                    className="px-3.5 py-1.5 rounded-full bg-white text-black font-bold text-[11px] uppercase tracking-wider flex items-center gap-1 hover:scale-105 transition-all"
                  >
                    <span>Let&apos;s Connect</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};
