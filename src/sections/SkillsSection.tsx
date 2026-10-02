"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";
import { skillsData, skillCategories, SkillNode } from "@/data/skillsData";
import {
  Sparkles,
  Code2,
  Layers,
  Cpu,
  Database,
  Cloud,
  X,
  FolderGit2
} from "lucide-react";
import { audio } from "@/lib/audio";
import { useTheme } from "@/components/providers/ThemeProvider";

export const SkillsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All Systems");
  const [hoveredSkill, setHoveredSkill] = useState<SkillNode | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<SkillNode | null>(null);
  const [pulseIndex, setPulseIndex] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const boostRef = useRef<number>(0);
  const { theme } = useTheme();
  const themeRef = useRef(theme);

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  // Mobile / Touch detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || window.matchMedia("(pointer: coarse)").matches);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Filtered skills list
  const filteredSkills = useMemo(() => {
    if (activeCategory === "All Systems") return skillsData;
    return skillsData.filter((s) => s.category === activeCategory);
  }, [activeCategory]);

  // Auto-cycling pulse wave animation for mobile devices (living cyber neural grid)
  useEffect(() => {
    if (!isMobile) return;
    const interval = setInterval(() => {
      setPulseIndex((prev) => (prev + 1) % (filteredSkills.length || 1));
    }, 1800);
    return () => clearInterval(interval);
  }, [isMobile, filteredSkills.length]);

  const triggerVortex = () => {
    boostRef.current = 1.8;
  };

  // Luxury 3D Kinetic Canvas Background using Three.js with dynamic vortex speed
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 10;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const isLight = themeRef.current === "light";

    // Dynamic Orbital Floating Constellation Rings
    const ringGeo = new THREE.RingGeometry(5.2, 5.25, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: isLight ? 0x2563eb : 0xffffff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: isLight ? 0.2 : 0.12,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2.5;
    scene.add(ring);

    // Floating 3D Star / Particle Dust
    const particleCount = 320;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 26;
      positions[i + 1] = (Math.random() - 0.5) * 18;
      positions[i + 2] = (Math.random() - 0.5) * 20;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: isLight ? 0x3b82f6 : 0xffffff,
      size: 0.05,
      transparent: true,
      opacity: isLight ? 0.6 : 0.45,
      blending: isLight ? THREE.NormalBlending : THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("mousemove", handleMouseMove);

    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();

      // Dynamically update theme colors
      const currentIsLight = themeRef.current === "light";
      if (currentIsLight) {
        ringMat.color.setHex(0x2563eb);
        ringMat.opacity = 0.2;
        particleMat.color.setHex(0x3b82f6);
        particleMat.opacity = 0.6;
        particleMat.blending = THREE.NormalBlending;
      } else {
        ringMat.color.setHex(0xffffff);
        ringMat.opacity = 0.12;
        particleMat.color.setHex(0xffffff);
        particleMat.opacity = 0.45;
        particleMat.blending = THREE.AdditiveBlending;
      }

      // Smooth decay of vortex boost
      boostRef.current = Math.max(0, boostRef.current * 0.94);
      const currentSpeed = 1 + boostRef.current;

      ring.rotation.z = elapsed * 0.06 * currentSpeed;

      particles.rotation.y = elapsed * 0.05 * currentSpeed;
      particles.rotation.x = elapsed * 0.02 * currentSpeed;

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
      ringGeo.dispose();
      ringMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, []);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Core Languages":
        return <Code2 className="w-3.5 h-3.5 text-amber-400" />;
      case "Frontend & WebGL":
        return <Layers className="w-3.5 h-3.5 text-cyan-400" />;
      case "Backend & APIs":
        return <Cpu className="w-3.5 h-3.5 text-emerald-400" />;
      case "Databases & ORM":
        return <Database className="w-3.5 h-3.5 text-purple-400" />;
      case "Cloud & DevOps":
        return <Cloud className="w-3.5 h-3.5 text-blue-400" />;
      default:
        return <Sparkles className="w-3.5 h-3.5 text-white" />;
    }
  };

  const getCategoryDetails = (category: string) => {
    switch (category) {
      case "Core Languages":
        return {
          color: "#f59e0b",
          glow: "rgba(245, 158, 11, 0.4)",
          bgSoft: "bg-amber-500/10",
          borderSoft: "border-amber-500/30",
          text: "text-amber-400",
        };
      case "Frontend & WebGL":
        return {
          color: "#06b6d4",
          glow: "rgba(6, 182, 212, 0.4)",
          bgSoft: "bg-cyan-500/10",
          borderSoft: "border-cyan-500/30",
          text: "text-cyan-400",
        };
      case "Backend & APIs":
        return {
          color: "#10b981",
          glow: "rgba(16, 185, 129, 0.4)",
          bgSoft: "bg-emerald-500/10",
          borderSoft: "border-emerald-500/30",
          text: "text-emerald-400",
        };
      case "Databases & ORM":
        return {
          color: "#a855f7",
          glow: "rgba(168, 85, 247, 0.4)",
          bgSoft: "bg-purple-500/10",
          borderSoft: "border-purple-500/30",
          text: "text-purple-400",
        };
      case "Cloud & DevOps":
        return {
          color: "#3b82f6",
          glow: "rgba(59, 130, 246, 0.4)",
          bgSoft: "bg-blue-500/10",
          borderSoft: "border-blue-500/30",
          text: "text-blue-400",
        };
      default:
        return {
          color: "#ffffff",
          glow: "rgba(255, 255, 255, 0.4)",
          bgSoft: "bg-white/10",
          borderSoft: "border-white/30",
          text: "text-white",
        };
    }
  };

  const handleSkillClick = (skill: SkillNode) => {
    audio.playChime();
    if (selectedSkill?.id === skill.id) {
      setSelectedSkill(null);
    } else {
      setSelectedSkill(skill);
    }
    triggerVortex();
  };

  const isLight = theme === "light";

  return (
    <section
      id="skills"
      className="relative pt-6 md:pt-10 pb-12 md:pb-16 px-4 sm:px-12 lg:px-20 w-full max-w-[1720px] mx-auto z-10 select-none flex flex-col justify-center overflow-hidden"
    >
      {/* 3D WebGL Ambient Morphing Sphere Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-60 z-0"
      />

      {/* Header & Category Switcher */}
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-8 lg:gap-16 mb-6 sm:mb-12 md:mb-16">
        <div>
          <h2 className={`text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight uppercase whitespace-nowrap transition-colors ${
            isLight ? "text-zinc-950" : "text-white"
          }`}>
            Technical Skills
          </h2>
        </div>

        {/* Category Filter Pills with mobile-friendly horizontal scroll */}
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar scrollbar-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {skillCategories.map((category) => {
            const isSelected = activeCategory === category;
            return (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category);
                  triggerVortex();
                }}
                className={`px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-[11px] sm:text-xs font-mono tracking-wide transition-all duration-300 border shrink-0 flex items-center gap-2 sm:gap-2.5 cursor-pointer backdrop-blur-md ${isSelected
                    ? isLight
                      ? "skill-tab-active bg-[#09090B] !text-white border-[#09090B] font-bold shadow-md scale-105"
                      : "bg-white text-black border-white font-bold shadow-[0_0_30px_rgba(255,255,255,0.35)] scale-105"
                    : isLight
                      ? "bg-white text-zinc-700 border-zinc-200 hover:border-zinc-400 hover:bg-zinc-50 hover:text-zinc-950 shadow-sm"
                      : "bg-white/[0.03] text-white/70 border-white/10 hover:border-white/30 hover:bg-white/[0.08] hover:text-white"
                  }`}
                data-cursor="FILTER"
              >
                {getCategoryIcon(category)}
                <span className={isSelected && isLight ? "!text-white font-bold" : undefined}>{category}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Luxury Interactive Floating Skills Cloud */}
      <div className="relative z-10 w-full">
        <motion.div
          layout
          className="flex flex-wrap gap-2.5 sm:gap-4 md:gap-5 items-center justify-center py-2 sm:py-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, idx) => {
              const isHovered = hoveredSkill?.id === skill.id;
              const isSelected = selectedSkill?.id === skill.id;
              const isPulsed = isMobile && !selectedSkill && (idx === pulseIndex || (idx === (pulseIndex + 4) % filteredSkills.length));
              const hasAnyHover = hoveredSkill !== null;
              const catDetails = getCategoryDetails(skill.category);

              const staggerDelay = (idx % 8) * 0.03;
              const floatDuration = 2.4 + (idx % 5) * 0.4;
              const floatDelay = (idx % 6) * 0.25;
              const floatDirection = idx % 2 === 0 ? 1 : -1;

              return (
                <motion.div
                  key={skill.id}
                  layout
                  initial={{ opacity: 0, y: 15, scale: 0.92 }}
                  animate={
                    isHovered || isSelected
                      ? {
                        opacity: 1,
                        y: -8,
                        x: 0,
                        rotate: 0,
                        scale: 1.05,
                      }
                      : isPulsed
                        ? {
                          opacity: 1,
                          y: [-2, -7, -2],
                          x: [0, 1.5 * floatDirection, 0],
                          rotate: [0, 0.6 * floatDirection, 0],
                          scale: [1, 1.04, 1],
                        }
                        : {
                          opacity: hasAnyHover ? 0.45 : 1,
                          y: [0, -6 * floatDirection, 1 * floatDirection, 5 * floatDirection, 0],
                          x: [0, 2.5 * floatDirection, -1.5 * floatDirection, 0],
                          rotate: [0, 0.8 * floatDirection, -0.6 * floatDirection, 0],
                          scale: 1,
                        }
                  }
                  exit={{
                    opacity: 0,
                    scale: 0.85,
                    transition: { duration: 0.2 },
                  }}
                  transition={
                    isHovered || isSelected
                      ? {
                        type: "spring",
                        stiffness: 400,
                        damping: 25,
                        opacity: { duration: 0.2 },
                      }
                      : isPulsed
                        ? {
                          y: { repeat: Infinity, duration: 1.8, ease: "easeInOut" },
                          x: { repeat: Infinity, duration: 2.2, ease: "easeInOut" },
                          scale: { repeat: Infinity, duration: 1.8, ease: "easeInOut" },
                          rotate: { repeat: Infinity, duration: 2.0, ease: "easeInOut" },
                          opacity: { duration: 0.3 },
                        }
                        : {
                          y: {
                            repeat: Infinity,
                            duration: floatDuration,
                            delay: floatDelay,
                            ease: "easeInOut",
                          },
                          x: {
                            repeat: Infinity,
                            duration: floatDuration * 1.2,
                            delay: floatDelay,
                            ease: "easeInOut",
                          },
                          rotate: {
                            repeat: Infinity,
                            duration: floatDuration * 1.4,
                            delay: floatDelay,
                            ease: "easeInOut",
                          },
                          scale: {
                            type: "spring",
                            stiffness: 350,
                            damping: 25,
                          },
                          opacity: {
                            duration: 0.25,
                            delay: staggerDelay,
                          },
                        }
                  }
                  whileHover={{
                    y: -8,
                    x: 0,
                    rotate: 0,
                    scale: 1.05,
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{ scale: 0.94 }}
                  onClick={() => handleSkillClick(skill)}
                  onMouseEnter={() => {
                    if (!isMobile) {
                      audio.playHover();
                      setHoveredSkill(skill);
                    }
                  }}
                  onMouseLeave={() => {
                    if (!isMobile) {
                      setHoveredSkill(null);
                    }
                  }}
                  className={`group relative px-3.5 sm:px-6 md:px-7 py-2.5 sm:py-3.5 md:py-4 rounded-xl sm:rounded-2xl border transition-all duration-300 cursor-pointer flex items-center gap-2 sm:gap-3.5 shadow-md sm:shadow-lg select-none will-change-transform overflow-hidden ${
                    isSelected
                      ? isLight
                        ? "bg-zinc-950 text-white border-zinc-950 shadow-xl z-30"
                        : "bg-white text-black border-white shadow-[0_0_35px_rgba(255,255,255,0.5)] z-30"
                      : isHovered
                        ? isLight
                          ? "bg-zinc-100 text-zinc-950 border-zinc-400 shadow-md z-20"
                          : "bg-gradient-to-r from-white/[0.18] via-white/[0.12] to-white/[0.18] border-white/60 text-white shadow-[0_0_30px_rgba(255,255,255,0.25)] backdrop-blur-2xl z-20"
                        : isPulsed
                          ? isLight
                            ? "bg-zinc-50 border-zinc-400 text-zinc-950 shadow-md z-20"
                            : "bg-[#161622] border-white/40 text-white shadow-[0_0_20px_rgba(6,182,212,0.3)] backdrop-blur-2xl z-20"
                          : isLight
                            ? "bg-white border-zinc-200 text-zinc-900 hover:border-zinc-300 hover:bg-zinc-50 shadow-sm z-10"
                            : "bg-[#0c0c12]/80 border-white/10 text-white/90 hover:border-white/30 hover:bg-[#151520]/90 backdrop-blur-xl z-10"
                  }`}
                  style={{
                    boxShadow: isPulsed && !isLight ? `0 0 22px ${catDetails.glow}` : undefined,
                    borderColor: isPulsed && !isLight ? catDetails.color : undefined,
                  }}
                  data-cursor="SKILL"
                >
                  {/* Continuous mobile cyber shine beam */}
                  {isMobile && (
                    <div
                      className="mobile-skill-shine"
                      style={{ animationDelay: `${(idx % 6) * 0.5}s` }}
                    />
                  )}

                  {/* Subtle luxurious top shimmer highlight */}
                  <div
                    className={`absolute top-0 left-3 right-3 h-[1px] bg-gradient-to-r from-transparent ${
                      isHovered || isPulsed
                        ? isLight ? "via-zinc-400/50" : "via-white/80"
                        : isLight ? "via-zinc-200/50" : "via-white/20"
                    } to-transparent transition-opacity`}
                  />

                  {/* Subtle bottom glowing accent line in category color on mobile */}
                  {isMobile && (
                    <div
                      className="absolute bottom-0 left-4 right-4 h-[1.5px] rounded-full opacity-60"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${catDetails.color}, transparent)`,
                      }}
                    />
                  )}

                  {/* Category Icon with dynamic glow */}
                  <div
                    className={`p-1.5 sm:p-2 rounded-lg sm:rounded-xl transition-all duration-300 ${
                      isSelected
                        ? isLight
                          ? "bg-white/10 text-white"
                          : "bg-black/10 text-black"
                        : isHovered || isPulsed
                          ? isLight
                            ? "bg-zinc-200/80 text-zinc-900"
                            : "bg-white/15 text-white shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                          : isLight
                            ? "bg-zinc-100 text-zinc-800 border border-zinc-200"
                            : "bg-white/[0.05] text-white/70"
                    }`}
                  >
                    {getCategoryIcon(skill.category)}
                  </div>

                  {/* Skill Name */}
                  <span
                    className={`text-xs sm:text-sm md:text-base font-bold tracking-tight transition-colors ${
                      isSelected
                        ? isLight
                          ? "text-white font-extrabold"
                          : "text-black font-extrabold"
                        : isHovered || isPulsed
                          ? isLight
                            ? "text-zinc-950 font-extrabold"
                            : "text-white font-extrabold"
                          : isLight
                            ? "text-zinc-900 group-hover:text-zinc-950"
                            : "text-white/90 group-hover:text-white"
                    }`}
                  >
                    {skill.name}
                  </span>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Interactive Mobile & Desktop Skill Inspection Matrix HUD Card */}
      <AnimatePresence>
        {selectedSkill && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className={`relative z-20 mt-6 sm:mt-8 p-4 sm:p-6 rounded-2xl border backdrop-blur-2xl shadow-2xl max-w-2xl mx-auto w-full transition-colors ${
              isLight
                ? "bg-white/95 border-zinc-300 shadow-[0_20px_50px_rgba(0,0,0,0.1)] text-zinc-900"
                : "bg-[#0c0c14]/90 border-white/20 shadow-[0_0_50px_rgba(0,0,0,0.8)] text-white"
            }`}
          >
            {/* Top Close Button & Category Bar */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10 dark:border-white/10 border-zinc-200">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-white/10 dark:bg-white/10 border border-white/10">
                  {getCategoryIcon(selectedSkill.category)}
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-extrabold tracking-tight">
                    {selectedSkill.name}
                  </h3>
                  <p className="text-[10px] sm:text-xs font-mono text-zinc-500 dark:text-zinc-400">
                    {selectedSkill.category} • {selectedSkill.tier}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedSkill(null)}
                className="p-1.5 rounded-full hover:bg-white/10 dark:hover:bg-white/10 bg-zinc-100 dark:bg-zinc-800 transition-colors cursor-pointer"
                aria-label="Close Inspector"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed my-2">
              {selectedSkill.description}
            </p>

            {/* Projects Used Badge Chips */}
            {selectedSkill.projectsUsed && selectedSkill.projectsUsed.length > 0 && (
              <div className="mt-3 pt-3 border-t border-white/10 border-zinc-200">
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-400 mb-2">
                  <FolderGit2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Production Deployments:</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedSkill.projectsUsed.map((proj, pIdx) => (
                    <span
                      key={pIdx}
                      className={`text-[10px] sm:text-[11px] font-mono font-medium px-2.5 py-1 rounded-md border ${
                        isLight
                          ? "bg-zinc-100 border-zinc-300 text-zinc-800"
                          : "bg-white/[0.06] border-white/15 text-white/90"
                      }`}
                    >
                      {proj}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
