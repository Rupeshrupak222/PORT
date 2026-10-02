"use client";

import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { useTheme } from "@/components/providers/ThemeProvider";

export const CyberBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const themeRef = useRef(theme);

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // --- 1. SCENE, CAMERA & RENDERER SETUP ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 30);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const isCurrentLight = () => themeRef.current === "light";

    // --- 2. SOFT GLOW CIRCULAR PARTICLE TEXTURE GENERATION ---
    const createGlowTexture = () => {
      const size = 64;
      const c = document.createElement("canvas");
      c.width = size;
      c.height = size;
      const ctx = c.getContext("2d");
      if (!ctx) return null;

      const gradient = ctx.createRadialGradient(
        size / 2,
        size / 2,
        0,
        size / 2,
        size / 2,
        size / 2
      );
      gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
      gradient.addColorStop(0.2, "rgba(255, 255, 255, 0.8)");
      gradient.addColorStop(0.5, "rgba(255, 255, 255, 0.2)");
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, size, size);

      const texture = new THREE.CanvasTexture(c);
      texture.needsUpdate = true;
      return texture;
    };

    const particleTexture = createGlowTexture();

    // --- 3. COSMIC DYNAMIC FLOW FIELD PARTICLES (ONLY PARTICLES) ---
    const particleCount = 2800;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    const colorPaletteDark = [
      new THREE.Color(0x38bdf8), // Cyan / Sky blue
      new THREE.Color(0x818cf8), // Indigo / Violet
      new THREE.Color(0x3b82f6), // Royal Blue
      new THREE.Color(0xa855f7), // Purple
      new THREE.Color(0xffffff), // Pure Starlight White
    ];

    const colorPaletteLight = [
      new THREE.Color(0x2563eb), // Royal Blue
      new THREE.Color(0x0284c7), // Deep Sky
      new THREE.Color(0x6366f1), // Indigo
      new THREE.Color(0x475569), // Slate
      new THREE.Color(0x7c3aed), // Violet
    ];

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      // 3D volumetric cloud distribution
      const radius = 6 + Math.random() * 50;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = (Math.random() - 0.5) * 60;
      const z = (Math.random() - 0.5) * 55 - 5;

      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;

      originalPositions[i3] = x;
      originalPositions[i3 + 1] = y;
      originalPositions[i3 + 2] = z;

      velocities[i3] = (Math.random() - 0.5) * 0.02;
      velocities[i3 + 1] = 0.02 + Math.random() * 0.03;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.02;

      // Color assignment
      const palette = isCurrentLight() ? colorPaletteLight : colorPaletteDark;
      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i3] = c.r;
      colors[i3 + 1] = c.g;
      colors[i3 + 2] = c.b;

      sizes[i] = 1.2 + Math.random() * 2.8;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    particleGeo.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    const particleMat = new THREE.PointsMaterial({
      size: 0.65,
      map: particleTexture || undefined,
      vertexColors: true,
      transparent: true,
      opacity: isCurrentLight() ? 0.65 : 0.85,
      blending: isCurrentLight() ? THREE.NormalBlending : THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // --- 4. INTERACTIVITY & FLUID MOTION CALCULATIONS ---
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    let lastScrollY = 0;
    let scrollVelocity = 0;
    let targetScrollVelocity = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY || window.pageYOffset || 0;
      const diff = currentScrollY - lastScrollY;
      targetScrollVelocity = diff * 0.05;
      lastScrollY = currentScrollY;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    // --- 5. SMOOTH RENDER LOOP ---
    let animationId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      const isLight = isCurrentLight();

      // Smooth mouse & scroll physics damping
      mouseX += (targetMouseX - mouseX) * 0.06;
      mouseY += (targetMouseY - mouseY) * 0.06;
      scrollVelocity += (targetScrollVelocity - scrollVelocity) * 0.1;
      targetScrollVelocity *= 0.92; // smooth decay

      // Dynamic theme adaptation
      if (isLight) {
        particleMat.opacity = 0.65;
        particleMat.blending = THREE.NormalBlending;
      } else {
        particleMat.opacity = 0.85;
        particleMat.blending = THREE.AdditiveBlending;
      }

      // --- ANIMATE PARTICLES (COSMIC STREAM & MOUSE VORTEX) ---
      const posAttr = particleGeo.attributes.position;
      const posArray = posAttr.array as Float32Array;

      // Mouse in 3D world space approximation
      const mouseWorldX = mouseX * 22;
      const mouseWorldY = mouseY * 14;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;

        // Upward/swirling continuous ambient drift
        posArray[i3 + 1] += velocities[i3 + 1] + scrollVelocity * 0.08;

        // Reset if looped out of bounds
        if (posArray[i3 + 1] > 32) {
          posArray[i3 + 1] = -32;
        } else if (posArray[i3 + 1] < -32) {
          posArray[i3 + 1] = 32;
        }

        // Gentle sinusoidal natural flow wave
        posArray[i3] += Math.sin(elapsedTime * 0.6 + posArray[i3 + 1] * 0.1) * 0.015;
        posArray[i3 + 2] += Math.cos(elapsedTime * 0.5 + posArray[i3] * 0.1) * 0.012;

        // Interactive mouse proximity vortex force
        const dx = posArray[i3] - mouseWorldX;
        const dy = posArray[i3 + 1] - mouseWorldY;
        const distSq = dx * dx + dy * dy;

        if (distSq < 100 && distSq > 0.01) {
          const dist = Math.sqrt(distSq);
          const force = (1 - dist / 10) * 0.25;
          // Fluid tangential swirl + slight repulsion
          posArray[i3] += (-dy / dist) * force * 1.5 + (dx / dist) * force * 0.5;
          posArray[i3 + 1] += (dx / dist) * force * 1.5 + (dy / dist) * force * 0.5;
        }
      }
      posAttr.needsUpdate = true;

      // Camera spatial parallax
      const targetCamX = mouseX * 3.5;
      const targetCamY = mouseY * 2.5;
      const targetCamZ = 30 + Math.abs(scrollVelocity) * 0.4;

      camera.position.x += (targetCamX - camera.position.x) * 0.05;
      camera.position.y += (targetCamY - camera.position.y) * 0.05;
      camera.position.z += (targetCamZ - camera.position.z) * 0.05;
      camera.lookAt(0, 0, -5);

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };

    animate();

    // --- 6. RESIZE LISTENER ---
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // --- 7. CLEANUP ON UNMOUNT ---
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);

      renderer.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      if (particleTexture) particleTexture.dispose();
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-0 overflow-hidden transition-colors duration-500 ${
        theme === "light" ? "bg-[#F8F9FA]" : "bg-[#030308]"
      }`}
    >
      {/* Main 3D WebGL Canvas for Pure Particles */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-100"
      />

      {/* Subtle Spatial Vignette Gradient */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
          theme === "light"
            ? "bg-gradient-to-t from-[#F8F9FA]/70 via-transparent to-[#F8F9FA]/30"
            : "bg-gradient-to-t from-[#030308]/60 via-transparent to-[#030308]/30"
        }`}
      />
    </div>
  );
};
