"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import * as THREE from "three";
import { audio } from "@/lib/audio";
import { useTheme } from "@/components/providers/ThemeProvider";

interface ScrollIntroSplashProps {
  onComplete: () => void;
}

export const ScrollIntroSplash: React.FC<ScrollIntroSplashProps> = ({ onComplete }) => {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [isFinishing, setIsFinishing] = useState(false);
  const { theme } = useTheme();
  const themeRef = useRef(theme);

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const isCompletingRef = useRef(false);
  const touchStartRef = useRef<number | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // 3D Developer Background Canvas using Three.js
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const isLight = themeRef.current === "light";

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(isLight ? 0xF8F9FA : 0x050505, 0.015);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 1.2, 9);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 1. Undulating Dynamic Cyber Wave Terrain Grid (Blue Cyber Net)
    const gridSegments = 48;
    const gridGeometry = new THREE.PlaneGeometry(65, 65, gridSegments, gridSegments);
    const initialPositions = gridGeometry.attributes.position.clone();

    const gridMaterial = new THREE.MeshBasicMaterial({
      color: isLight ? 0x94a3b8 : 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: isLight ? 0.35 : 0.45,
    });
    const gridMesh = new THREE.Mesh(gridGeometry, gridMaterial);
    gridMesh.rotation.x = -Math.PI / 2.2;
    gridMesh.position.y = -3.2;
    scene.add(gridMesh);

    // 2. Luxury Orbital Horizon Rings (Celestial Kinetic Halos)
    const ringGeo1 = new THREE.RingGeometry(6.8, 6.84, 80);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: isLight ? 0x2563eb : 0x60a5fa,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: isLight ? 0.16 : 0.26,
    });
    const ringMesh1 = new THREE.Mesh(ringGeo1, ringMat1);
    ringMesh1.rotation.x = Math.PI / 2.8;
    ringMesh1.position.set(0, 0.5, -4);
    scene.add(ringMesh1);

    const ringGeo2 = new THREE.RingGeometry(9.2, 9.25, 90);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: isLight ? 0x6366f1 : 0x818cf8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: isLight ? 0.14 : 0.22,
    });
    const ringMesh2 = new THREE.Mesh(ringGeo2, ringMat2);
    ringMesh2.rotation.x = Math.PI / 3.2;
    ringMesh2.rotation.y = Math.PI / 8;
    ringMesh2.position.set(0, 0.5, -6);
    scene.add(ringMesh2);

    // 3. 3D Floating Particle Constellation
    const particleCount = 600;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 36;
      positions[i + 1] = (Math.random() - 0.5) * 26;
      positions[i + 2] = (Math.random() - 0.5) * 36;
      scales[i / 3] = Math.random() * 2 + 1;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute("scale", new THREE.BufferAttribute(scales, 1));

    const particleMat = new THREE.PointsMaterial({
      color: isLight ? 0x3b82f6 : 0x93c5fd,
      size: 0.1,
      transparent: true,
      opacity: isLight ? 0.6 : 0.8,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 1.2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 1.2;
    };

    window.addEventListener("mousemove", handleMouseMove);

    let animationId: number;
    let clock = new THREE.Clock();

    const renderLoop = () => {
      const elapsedTime = clock.getElapsedTime();

      // 1. Undulate the cyber grid vertices with graceful organic sine waves (Blue Net Flow)
      const posAttr = gridGeometry.attributes.position;
      const initialPos = initialPositions.array as Float32Array;

      for (let i = 0; i < posAttr.count; i++) {
        const u = initialPos[i * 3];
        const v = initialPos[i * 3 + 1];
        const wave =
          Math.sin(u * 0.18 + elapsedTime * 1.1) * 0.35 +
          Math.cos(v * 0.18 + elapsedTime * 0.9) * 0.28;
        posAttr.setZ(i, wave);
      }
      posAttr.needsUpdate = true;

      // 2. Kinetic Orbital Celestial Ring Rotations
      ringMesh1.rotation.z = elapsedTime * 0.08 + mouseX * 0.2;
      ringMesh1.rotation.y = elapsedTime * 0.04;

      ringMesh2.rotation.z = -elapsedTime * 0.05 + mouseX * 0.15;
      ringMesh2.rotation.x = Math.PI / 3.2 + Math.sin(elapsedTime * 0.4) * 0.05;

      // 3. Ambient Stardust Rotation & Parallax
      particles.rotation.y = elapsedTime * 0.02 + mouseX * 0.1;
      particles.rotation.x = elapsedTime * 0.01 + mouseY * 0.1;

      // 4. Smooth 3D Camera flight matching scroll progress + subtle parallax tilt
      const targetZ = 9 - (currentProgressRef.current / 100) * 3.5;
      camera.position.z += (targetZ - camera.position.z) * 0.08;
      camera.position.x += (mouseX * 0.6 - camera.position.x) * 0.05;
      camera.position.y += (1.2 - mouseY * 0.4 - camera.position.y) * 0.05;

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(renderLoop);
    };

    renderLoop();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      gridGeometry.dispose();
      gridMaterial.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, []);

  const finishIntro = useCallback(() => {
    if (isCompletingRef.current) return;
    isCompletingRef.current = true;
    setIsFinishing(true);
    setScrollPercent(100);

    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    try {
      audio.playChime();
    } catch { }

    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      onComplete();
    }, 600);
  }, [onComplete]);

  const processWheelDelta = useCallback((deltaY: number) => {
    if (isCompletingRef.current) return;
    const dy = deltaY;
    // Extra slow, gentle cinematic progressive steps
    const step =
      Math.abs(dy) < 10
        ? dy * 0.05
        : Math.sign(dy) * Math.max(0.6, Math.min(Math.abs(dy) * 0.016, 2.0));

    targetProgressRef.current = Math.max(
      0,
      Math.min(100, targetProgressRef.current + step)
    );
  }, []);

  // Smooth lerp animation loop for physical scroll inertia
  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    window.scrollTo(0, 0);
    let active = true;

    const animate = () => {
      if (!active) return;

      const diff = targetProgressRef.current - currentProgressRef.current;
      currentProgressRef.current += diff * 0.06;

      if (currentProgressRef.current < 0) currentProgressRef.current = 0;
      if (currentProgressRef.current > 100) currentProgressRef.current = 100;

      const rounded = Math.min(100, Math.round(currentProgressRef.current));
      setScrollPercent(rounded);

      if (currentProgressRef.current >= 99.5 && !isCompletingRef.current) {
        finishIntro();
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    // Multi-layer window & document wheel listeners
    const handleNativeWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
      processWheelDelta(e.deltaY);
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        touchStartRef.current = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (touchStartRef.current === null || e.touches.length === 0 || isCompletingRef.current) return;
      e.preventDefault();
      e.stopPropagation();
      const currentY = e.touches[0].clientY;
      const delta = (touchStartRef.current - currentY) * 0.08;
      touchStartRef.current = currentY;

      targetProgressRef.current = Math.max(0, Math.min(100, targetProgressRef.current + delta));
    };

    const handleTouchEnd = () => {
      touchStartRef.current = null;
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isCompletingRef.current) return;
      if (["ArrowDown", "PageDown", " ", "Enter"].includes(e.key)) {
        e.preventDefault();
        e.stopPropagation();
        targetProgressRef.current = Math.min(100, targetProgressRef.current + 2.5);
      } else if (["ArrowUp", "PageUp"].includes(e.key)) {
        e.preventDefault();
        e.stopPropagation();
        targetProgressRef.current = Math.max(0, targetProgressRef.current - 2.5);
      } else if (e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        finishIntro();
      }
    };

    window.addEventListener("wheel", handleNativeWheel, { passive: false });
    document.addEventListener("wheel", handleNativeWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      active = false;
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("wheel", handleNativeWheel);
      document.removeEventListener("wheel", handleNativeWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [finishIntro, processWheelDelta]);

  // Phase 1 (0% - 15%): "Welcome to my portfolio journey"
  let p1Scale = 0.75;
  let p1Opacity = 0;
  let p1Pointer = false;
  if (scrollPercent <= 10) {
    p1Scale = 0.78 + (scrollPercent / 10) * 0.36;
    p1Opacity = 1;
    p1Pointer = true;
  } else if (scrollPercent <= 16) {
    const t = (scrollPercent - 10) / 6;
    p1Scale = 1.14 + t * 0.55;
    p1Opacity = Math.max(0, 1 - t * 1.1);
    p1Pointer = p1Opacity > 0.2;
  }

  // Phase 2 (12% - 28%): "A Collection of Ideas Brought to Life Through Design & Development"
  let p2Scale = 0.6;
  let p2Opacity = 0;
  let p2Pointer = false;
  if (scrollPercent >= 12 && scrollPercent <= 20) {
    const t = (scrollPercent - 12) / 8;
    p2Scale = 0.65 + t * 0.35;
    p2Opacity = t;
    p2Pointer = true;
  } else if (scrollPercent > 20 && scrollPercent <= 29) {
    const t = (scrollPercent - 20) / 9;
    p2Scale = 1.0 + t * 0.55;
    p2Opacity = Math.max(0, 1 - t * 1.15);
    p2Pointer = p2Opacity > 0.2;
  }

  // Phase 3 (25% - 100%): Avatar + "Rupesh Kumar Rupak" + "Full Stack Developer"
  let p3Scale = 0.65;
  let p3Opacity = 0;
  let p3Pointer = false;
  if (scrollPercent >= 25 && scrollPercent <= 32) {
    const t = (scrollPercent - 25) / 7;
    p3Scale = 0.68 + t * 0.14;
    p3Opacity = t;
    p3Pointer = true;
  } else if (scrollPercent > 32) {
    const t = (scrollPercent - 32) / 68;
    p3Scale = 0.82 + t * 0.3;
    p3Opacity = 1;
    p3Pointer = true;
  }

  const isLight = theme === "light";

  return (
    <div
      data-lenis-prevent
      onWheel={(e) => {
        e.preventDefault();
        e.stopPropagation();
        processWheelDelta(e.deltaY);
      }}
      className={`fixed inset-0 z-[9999] flex flex-col justify-between transition-all duration-700 ease-out select-none overflow-hidden ${
        isLight ? "bg-[#F8F9FA]" : "bg-[#050508]"
      } ${
        isFinishing
          ? "opacity-0 scale-105 pointer-events-none filter blur-lg"
          : "opacity-100 scale-100"
      }`}
    >
      {/* Ambient Glowing Nebula Lights in Dark Mode */}
      {!isLight && (
        <>
          <div className="absolute top-[-10%] left-[10%] w-[650px] h-[650px] rounded-full bg-blue-600/[0.14] blur-[140px] pointer-events-none z-0" />
          <div className="absolute top-[35%] right-[5%] w-[750px] h-[750px] rounded-full bg-indigo-600/[0.12] blur-[160px] pointer-events-none z-0" />
          <div className="absolute bottom-[-10%] left-[25%] w-[850px] h-[850px] rounded-full bg-cyan-600/[0.10] blur-[180px] pointer-events-none z-0" />
        </>
      )}

      {/* 3D Animated Developer WebGL Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-100"
      />

      {/* Subtle Ambient Radial Lighting */}
      <div
        className={`absolute inset-0 pointer-events-none z-0 ${isLight
          ? "bg-[radial-gradient(ellipse_75%_75%_at_50%_50%,rgba(0,0,0,0.04),transparent_100%)]"
          : "bg-[radial-gradient(ellipse_75%_75%_at_50%_50%,rgba(56,189,248,0.06),transparent_100%)]"
          }`}
        style={{
          opacity: 0.5 + (scrollPercent / 100) * 0.5,
        }}
      />

      {/* =========================================================================
          STAGE 1 (0% -> 15%): "Welcome to my portfolio journey"
          ========================================================================= */}
      {p1Opacity > 0 && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center text-center my-auto z-10 will-change-transform px-6 pointer-events-none"
          style={{
            transform: `scale(${p1Scale})`,
            opacity: p1Opacity,
          }}
        >
          <h1
            className={`text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight max-w-3xl leading-tight ${isLight
              ? "text-zinc-950 drop-shadow-sm"
              : "text-white drop-shadow-[0_10px_35px_rgba(0,0,0,0.8)]"
              }`}
          >
            Welcome to my portfolio journey
          </h1>

          {/* Interactive Scroll Down / Swipe Up Indicator Badge */}
          <div
            className={`mt-7 inline-flex items-center gap-2.5 px-4 py-2 rounded-full border backdrop-blur-md transition-all duration-300 ${isLight
              ? "bg-black/[0.04] border-black/10 text-zinc-700 shadow-sm"
              : "bg-white/[0.06] border-white/15 text-zinc-200 shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
              }`}
          >
            <ChevronDown className="w-4 h-4 text-cyan-500 animate-bounce" />
            <span className="text-[11px] sm:text-xs font-mono tracking-[0.2em] uppercase font-semibold">
              Scroll to explore
            </span>
            <ChevronDown className="w-4 h-4 text-cyan-500 animate-bounce" />
          </div>
        </div>
      )}

      {/* =========================================================================
          STAGE 2 (12% -> 29%): "A Collection of Ideas Brought to Life Through Design & Development"
          ========================================================================= */}
      {p2Opacity > 0 && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center text-center my-auto z-10 will-change-transform px-6 pointer-events-none"
          style={{
            transform: `scale(${p2Scale})`,
            opacity: p2Opacity,
          }}
        >
          <h2
            className={`text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text max-w-4xl leading-tight ${isLight
              ? "bg-gradient-to-r from-zinc-950 via-zinc-800 to-zinc-600"
              : "bg-gradient-to-r from-white via-zinc-200 to-silver-300 drop-shadow-[0_10px_35px_rgba(0,0,0,0.8)]"
              }`}
            style={
              isLight
                ? {
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundImage: "linear-gradient(to right, #09090b 0%, #27272a 50%, #52525b 100%)",
                }
                : undefined
            }
          >
            A Collection of Ideas Brought to Life Through Design &amp; Development
          </h2>
        </div>
      )}

      {/* =========================================================================
          STAGE 3 (25% -> 100%): Avatar + "Rupesh Kumar Rupak" + "Full Stack Developer"
          ========================================================================= */}
      {p3Opacity > 0 && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center text-center my-auto z-10 will-change-transform px-6"
          style={{
            transform: `scale(${p3Scale})`,
            opacity: p3Opacity,
            pointerEvents: p3Pointer ? "auto" : "none",
          }}
        >
          {/* Holographic Arc & Avatar Ring */}
          <div className="relative mb-6 w-40 h-40 sm:w-48 sm:h-48 flex items-center justify-center">
            {/* Outer SVG Holographic Progress Arc */}
            <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none z-10" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="46"
                className={isLight ? "stroke-black/10" : "stroke-white/15"}
                strokeWidth="2.5"
                fill="transparent"
              />
              <circle
                cx="50"
                cy="50"
                r="46"
                className={`transition-all duration-75 ease-out ${isLight ? "stroke-zinc-950" : "stroke-white"
                  }`}
                strokeWidth="3.5"
                strokeDasharray={289}
                strokeDashoffset={289 - (289 * scrollPercent) / 100}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>

            {/* User Portrait (Fully Fills Circle Perfectly Inside the Ring) */}
            <div
              className={`w-[88%] h-[88%] rounded-full overflow-hidden relative z-0 ${isLight
                ? "bg-zinc-200 shadow-[0_10px_35px_rgba(0,0,0,0.12)] ring-2 ring-black/10"
                : "bg-black/60 shadow-[0_0_50px_rgba(255,255,255,0.2)]"
                }`}
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

          {/* Name */}
          <h1
            className={`text-4xl sm:text-6xl font-black tracking-tight mb-2 uppercase ${isLight ? "text-zinc-950" : "text-white"
              }`}
          >
            Rupesh Kumar Rupak
          </h1>

          {/* Subtitle: ONLY FULL STACK DEVELOPER */}
          <p
            className={`font-mono text-xs sm:text-sm tracking-[0.28em] uppercase ${isLight ? "text-zinc-600 font-semibold" : "text-white/70"
              }`}
          >
            Full Stack Developer
          </p>
        </div>
      )}

      {/* Bottom Left Corner Scroll / Swipe Hint */}


      {/* Bottom Right Percentage Number & Dynamic Progress Indicator */}
      <div className="absolute bottom-4 right-6 sm:bottom-6 sm:right-10 z-20 flex flex-col items-end pointer-events-none">
        {/* Scroll to Explore above Percentage */}
        <span
          className={`font-mono text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase mb-0.5 ${
            isLight ? "text-zinc-600" : "text-white/60"
          }`}
        >
          Scroll to explore
        </span>

        <div
          className={`flex items-baseline font-mono text-5xl sm:text-7xl font-light tracking-tighter ${
            isLight ? "text-zinc-950" : "text-white"
          }`}
        >
          <span>{String(scrollPercent).padStart(2, "0")}</span>
          <span
            className={`text-xl sm:text-2xl ml-1 font-sans ${
              isLight ? "text-zinc-500 font-medium" : "text-white/40"
            }`}
          >
            %
          </span>
        </div>
      </div>

      {/* Full-Width Bottom Edge Progress Line (Starts from far-left 0% to 100%) */}
      <div className={`fixed bottom-0 left-0 right-0 w-full h-1 z-30 ${isLight ? "bg-black/10" : "bg-white/10"
        }`}>
        <div
          className={`h-full transition-all duration-75 ease-out ${isLight
            ? "bg-gradient-to-r from-cyan-600 via-blue-600 to-emerald-600 shadow-[0_0_10px_rgba(37,99,235,0.4)]"
            : "bg-gradient-to-r from-cyan-400 via-white to-emerald-400 shadow-[0_0_15px_rgba(255,255,255,0.9)]"
            }`}
          style={{ width: `${scrollPercent}%` }}
        />
      </div>
    </div>
  );
};
