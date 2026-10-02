"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { ProjectCaseStudy } from "@/data/projectsData";
import { X, ExternalLink, Github, CheckCircle2, ArrowRight, Eye, Sparkles } from "lucide-react";
import { audio } from "@/lib/audio";

interface ProjectModalProps {
  project: ProjectCaseStudy | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        audio.playClick();
        onClose();
      }
    };

    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="project-modal-backdrop fixed inset-0 bg-[#050505]/85 backdrop-blur-2xl"
        onClick={() => {
          audio.playClick();
          onClose();
        }}
      />

      {/* Modal Container */}
      <div className="project-modal-container relative w-full max-w-4xl bg-[#09090D] border border-white/15 rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.9)] z-10 max-h-[90vh] overflow-y-auto p-6 sm:p-8 md:p-10">
        {/* Close Button */}
        <button
          onClick={() => {
            audio.playClick();
            onClose();
          }}
          className="absolute top-5 right-5 p-2.5 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/15 transition-all cursor-pointer z-20"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Metadata Bar */}
        <div className="flex flex-wrap items-center gap-2 mb-3 text-xs font-mono text-white/50 uppercase">
          <span className="px-2.5 py-0.5 rounded bg-white/10 text-[10px] font-mono text-white font-semibold">
            {project.category}
          </span>
          <span>•</span>
          <span>PROJECT {project.number}</span>
          <span>•</span>
          <span>{project.year}</span>
          <span>•</span>
          <span>{project.client}</span>
        </div>

        {/* Title & Tagline */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-2">
          {project.title}
        </h2>
        <p className="text-base sm:text-lg text-silver-300 font-medium max-w-2xl mb-6">
          {project.tagline}
        </p>

        {/* Optional Project Hero Image / Banner */}
        {project.image && (
          <div className="relative w-full h-[220px] sm:h-[300px] md:h-[360px] rounded-2xl overflow-hidden border border-white/15 mb-8 group bg-white/[0.02]">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#09090D] via-transparent to-transparent opacity-80" />
            <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 border border-white/15 backdrop-blur-md text-[10px] font-mono text-white">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>LIVE REPO // {project.slug}</span>
            </div>
          </div>
        )}

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
          {project.metrics.map((metric, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-white/[0.03] border border-white/10"
            >
              <span className="text-[10px] font-mono uppercase text-white/40 block mb-1">
                {metric.label}
              </span>
              <span className="text-2xl sm:text-3xl font-bold text-white block mb-0.5">
                {metric.value}
              </span>
              <span className="text-xs text-silver-400">
                {metric.description}
              </span>
            </div>
          ))}
        </div>

        {/* Details Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 flex flex-col gap-5">
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-white/40 mb-1.5">
                The Engineering Challenge
              </h3>
              <p className="text-xs sm:text-sm text-silver-300 leading-relaxed font-normal">
                {project.challenge}
              </p>
            </div>

            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-white/40 mb-2">
                Engineering Process & Architecture
              </h3>
              <ul className="space-y-2">
                {project.process.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-silver-300 font-normal">
                    <span className="text-white/40 font-mono text-[10px] mt-0.5">0{idx + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-white/40 mb-1.5">
                Architectural Solution
              </h3>
              <p className="text-xs sm:text-sm text-silver-300 leading-relaxed font-normal">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Right Info Column */}
          <div className="flex flex-col gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/10">
            <div>
              <span className="text-[10px] font-mono uppercase text-white/40 block mb-0.5">Client / Context</span>
              <span className="text-xs font-bold text-white">{project.client}</span>
            </div>

            <div>
              <span className="text-[10px] font-mono uppercase text-white/40 block mb-0.5">Role</span>
              <span className="text-xs text-silver-300">{project.role}</span>
            </div>

            <div>
              <span className="text-[10px] font-mono uppercase text-white/40 block mb-1.5">Tech Stack</span>
              <div className="flex flex-wrap gap-1">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded bg-white/[0.05] border border-white/10 text-[10px] font-mono text-white/80"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="text-[10px] font-mono uppercase text-white/40 block mb-1.5">Key Deliverables</span>
              <ul className="space-y-1.5">
                {project.results.map((res, i) => (
                  <li key={i} className="flex items-start gap-1.5 text-xs text-silver-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-white/70 mt-0.5 shrink-0" />
                    <span>{res}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-5 border-t border-white/10">
          <div className="flex items-center gap-3">
            {project.links?.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-white text-black text-xs font-bold uppercase tracking-wider hover:bg-silver-200 transition-all shadow-md cursor-pointer"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            {project.links?.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white/[0.05] border border-white/15 text-white font-mono text-xs hover:bg-white/10 transition-all cursor-pointer"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
            )}
          </div>

          <button
            onClick={() => {
              audio.playClick();
              onClose();
            }}
            className="text-xs font-mono text-white/50 hover:text-white transition-colors cursor-pointer"
          >
            Close Case Study
          </button>
        </div>
      </div>
    </div>
  );
};
