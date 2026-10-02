"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";
import { experienceMilestones, Milestone } from "@/data/experienceData";
import { Building2, MapPin, Calendar, CheckCircle2, Award, ChevronRight } from "lucide-react";
import { audio } from "@/lib/audio";
import { useTheme } from "@/components/providers/ThemeProvider";

export const ExperiencePath: React.FC = () => {
  const [activeStage, setActiveStage] = useState<number>(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const themeRef = useRef(theme);

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  // Three.js 3D Kinetic Helix & Timeline Constellation Background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const isLight = themeRef.current === "light";

    // Timeline Star Dust Particles
    const particleCount = 200;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 20;
      positions[i + 1] = (Math.random() - 0.5) * 14;
      positions[i + 2] = (Math.random() - 0.5) * 12;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: isLight ? 0x3b82f6 : 0xffffff,
      size: 0.04,
      transparent: true,
      opacity: isLight ? 0.5 : 0.35,
      blending: isLight ? THREE.NormalBlending : THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 1.5;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 1.5;
    };

    window.addEventListener("mousemove", handleMouseMove);

    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();

      const currentIsLight = themeRef.current === "light";
      if (currentIsLight) {
        particleMat.color.setHex(0x3b82f6);
        particleMat.opacity = 0.5;
        particleMat.blending = THREE.NormalBlending;
      } else {
        particleMat.color.setHex(0xffffff);
        particleMat.opacity = 0.35;
        particleMat.blending = THREE.AdditiveBlending;
      }

      particles.rotation.y = elapsed * 0.03;
      particles.rotation.x = elapsed * 0.015;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      if (!canvas) return;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, []);

  const currentMilestone: Milestone = experienceMilestones[activeStage] || experienceMilestones[0];

  return (
    <section
      id="experience"
      className="relative min-h-screen md:py-24 py-4 px-6 sm:px-12 lg:px-20 w-full max-w-[1720px] mx-auto z-10 select-none flex flex-col justify-center overflow-hidden"
    >
      {/* 3D WebGL Ambient Timeline Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-50 z-0"
      />

      {/* Main Title & Navigation Tabs */}
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-14">
        <div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight uppercase">
            Experience Journey
          </h2>
        </div>

        {/* Milestone Navigation Tabs */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-2 no-scrollbar scrollbar-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {experienceMilestones.map((m, idx) => {
            const isSelected = activeStage === idx;
            return (
              <button
                key={m.company}
                onClick={() => {
                  audio.playClick();
                  setActiveStage(idx);
                }}
                className={`px-4 py-2 rounded-full text-xs font-mono tracking-wide transition-all border shrink-0 flex items-center gap-2 cursor-pointer ${isSelected
                  ? "bg-white text-black border-white font-bold shadow-[0_0_25px_rgba(255,255,255,0.3)] scale-105"
                  : "bg-white/[0.03] text-white/60 border-white/10 hover:border-white/30 hover:text-white"
                  }`}
                data-cursor="STAGE"
              >
                <span className="font-semibold">{m.company}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Interactive Timeline & Spotlight Showcase Grid */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Timeline Stage Rail & List (Desktop Only) */}
        <div className="hidden lg:flex lg:col-span-4 relative flex-col gap-4">
          {/* Vertical Connecting Neon Laser Rail */}
          <div className="absolute left-6 top-8 bottom-8 w-[2px] bg-gradient-to-b from-white/30 via-white/10 to-transparent pointer-events-none hidden sm:block">
            <motion.div
              animate={{ y: ["0%", "100%"], opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}
              className="w-full h-14 bg-gradient-to-b from-transparent via-emerald-400 to-transparent shadow-[0_0_8px_#34d399]"
            />
          </div>

          {experienceMilestones.map((m, idx) => {
            const isSelected = activeStage === idx;
            return (
              <motion.div
                key={m.company}
                onClick={() => {
                  audio.playClick();
                  setActiveStage(idx);
                }}
                onMouseEnter={() => {
                  if (!isSelected) {
                    audio.playHover();
                  }
                }}
                initial={{ opacity: 0, x: -25 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  y: isSelected ? [0, -3, 0] : 0,
                }}
                transition={{
                  opacity: { duration: 0.4, delay: idx * 0.1 },
                  x: { duration: 0.4, delay: idx * 0.1 },
                  y: isSelected
                    ? { repeat: Infinity, duration: 3, ease: "easeInOut" }
                    : { duration: 0.2 },
                }}
                whileHover={{ x: 6, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className={`group relative p-5 sm:p-6 rounded-2xl border cursor-pointer transition-all duration-300 backdrop-blur-xl ${isSelected
                  ? "bg-white/[0.08] border-white/40 shadow-[0_0_35px_rgba(255,255,255,0.12)] scale-[1.02] z-10"
                  : "bg-[#0A0A0E]/70 border-white/10 hover:border-white/25 hover:bg-[#121218]/90"
                  }`}
                data-cursor="STAGE"
              >
                {/* Active Indicator Node & Year */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2.5 h-2.5 rounded-full transition-all ${isSelected ? "bg-emerald-400 animate-pulse shadow-[0_0_10px_#34d399]" : "bg-white/30"
                        }`}
                    />
                    <span className="text-xs font-semibold text-white">
                      {m.company}
                    </span>
                  </div>
                  <span
                    className={`px-2.5 py-0.5 rounded text-[10px] font-mono tracking-wider font-bold ${isSelected
                      ? "bg-white text-black"
                      : "bg-white/10 text-white"
                      }`}
                  >
                    {m.year}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-white transition-colors flex items-center justify-between">
                  <span>{m.role}</span>
                  <ChevronRight
                    className={`w-4 h-4 transition-transform duration-300 ${isSelected
                      ? "text-white translate-x-1"
                      : "text-white/40 group-hover:text-white"
                      }`}
                  />
                </h3>

                <div className="flex items-center gap-1.5 mt-2 text-xs font-mono text-white">
                  <MapPin className="w-3.5 h-3.5 text-white shrink-0" />
                  <span>{m.location}</span>
                  <span className="mx-1 text-white">•</span>
                  <span>{m.period}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Right Column: Dynamic Kinetic Active Milestone Detail Card */}
        <div className="w-full lg:col-span-8 min-h-[380px] sm:min-h-[460px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStage}
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{
                duration: 0.25,
                ease: "easeOut",
              }}
              className="relative p-6 sm:p-10 lg:p-12 rounded-3xl bg-gradient-to-b from-[#0e0e14] via-[#09090d] to-[#050508] border border-white/20 shadow-2xl backdrop-blur-2xl overflow-hidden"
            >
              {/* Subtle top laser glow bar with moving shimmer */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
              <motion.div
                animate={{ x: ["-100%", "100%"] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
                className="absolute top-0 left-0 w-1/3 h-[2px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent"
              />

              {/* Top Meta Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div>
                  <motion.h3
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight"
                  >
                    {currentMilestone.role}
                  </motion.h3>
                  <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-white">
                    <div className="flex items-center gap-1.5 font-medium text-white">
                      <Building2 className="w-4 h-4 text-white" />
                      <span>{currentMilestone.company}</span>
                    </div>
                    <span className="text-white">•</span>
                    <div className="flex items-center gap-1.5 font-mono text-xs text-white">
                      <MapPin className="w-3.5 h-3.5 text-white" />
                      <span>{currentMilestone.location}</span>
                    </div>
                  </div>
                </div>

                {/* Period Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.15 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/[0.04] border border-white/10 text-xs font-mono text-white"
                >
                  <Calendar className="w-4 h-4 text-white" />
                  <span>{currentMilestone.period}</span>
                </motion.div>
              </div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="py-6"
              >
                <p className="text-sm sm:text-base text-white font-normal leading-relaxed">
                  {currentMilestone.description}
                </p>
              </motion.div>

              {/* Deliverables / Architectural Achievements */}
              <div className="pt-2 pb-6 border-t border-white/10">
                <h4 className="text-xs font-mono uppercase tracking-widest text-white mb-4 flex items-center gap-2">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  <span>Key Engineering Deliverables</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {currentMilestone.deliverables.map((item, dIdx) => (
                    <motion.div
                      key={dIdx}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 + dIdx * 0.08 }}
                      whileHover={{ scale: 1.02, x: 4 }}
                      className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.025] border border-white/8 text-xs sm:text-sm text-white hover:border-white/20 transition-colors"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                      <span className="leading-snug">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Technologies Applied */}
              <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-mono text-white uppercase mr-1">Stack:</span>
                  {currentMilestone.technologies.map((tech, tIdx) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.35 + tIdx * 0.04 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      className="px-3 py-1 rounded-lg bg-white/[0.04] border border-white/10 text-xs font-mono text-white hover:border-white/30 transition-colors"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
