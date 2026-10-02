"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { useTheme } from "@/components/providers/ThemeProvider";

export const GlobalCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const themeRef = useRef(theme);
  themeRef.current = theme;

  useEffect(() => {
    if (!mountRef.current || typeof window === "undefined") return;

    const container = mountRef.current;
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Scene & Camera
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 10);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0); // transparent so CSS background shows
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.4);
    dirLight1.position.set(10, 20, 15);
    scene.add(dirLight1);

    const pointLight = new THREE.PointLight(0xe2e8f0, 1.2, 30);
    pointLight.position.set(-5, 5, 2);
    scene.add(pointLight);

    // Particles Constellation
    const particleCount = 1800;
    const posArray = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const radius = 6 + Math.random() * 28;
      const theta = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 40;

      posArray[i * 3] = Math.cos(theta) * radius;
      posArray[i * 3 + 1] = y;
      posArray[i * 3 + 2] = Math.sin(theta) * radius - 12;
    }

    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute("position", new THREE.BufferAttribute(posArray, 3));

    const particlesMat = new THREE.PointsMaterial({
      size: 0.045,
      color: 0xffffff,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particlesMesh = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particlesMesh);

    // Central Obsidian Sculpture
    const coreGeo = new THREE.IcosahedronGeometry(1.8, 0);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x181824,
      emissive: 0x222230,
      emissiveIntensity: 0.4,
      roughness: 0.2,
      metalness: 0.8,
      flatShading: true,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreMesh.position.set(0, 0, -4);
    scene.add(coreMesh);

    // Wireframe Outer Cage
    const cageGeo = new THREE.IcosahedronGeometry(2.8, 1);
    const cageMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.08,
    });
    const cageMesh = new THREE.Mesh(cageGeo, cageMat);
    cageMesh.position.set(0, 0, -4);
    scene.add(cageMesh);

    // Outer Celestial Ring
    const torusGeo = new THREE.TorusGeometry(12, 0.05, 16, 100);
    const torusMat = new THREE.MeshBasicMaterial({
      color: 0xe2e8f0,
      transparent: true,
      opacity: 0.18,
    });
    const torusMesh = new THREE.Mesh(torusGeo, torusMat);
    torusMesh.position.set(0, -2, -15);
    torusMesh.rotation.x = Math.PI / 3;
    scene.add(torusMesh);

    // Mouse & Scroll coordinates
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Window Resize Handler
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      const isLight = themeRef.current === "light";

      // Dynamically adjust materials for theme
      if (isLight) {
        particlesMat.color.setHex(0x334155);
        particlesMat.opacity = 0.35;
        cageMat.color.setHex(0x000000);
        cageMat.opacity = 0.06;
        coreMat.color.setHex(0xe2e8f0);
        coreMat.emissive.setHex(0xcfd8dc);
        coreMat.emissiveIntensity = 0.2;
      } else {
        particlesMat.color.setHex(0xffffff);
        particlesMat.opacity = 0.5;
        cageMat.color.setHex(0xffffff);
        cageMat.opacity = 0.08;
        coreMat.color.setHex(0x181824);
        coreMat.emissive.setHex(0x222230);
        coreMat.emissiveIntensity = 0.4;
      }

      // Smooth mouse interpolation
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Scroll interpolation
      const scrollY = window.scrollY;
      const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      const scrollProgress = scrollY / maxScroll;

      // Rotate objects
      particlesMesh.rotation.y = elapsedTime * 0.02 + scrollProgress * Math.PI;
      particlesMesh.position.y = -scrollProgress * 10;

      coreMesh.rotation.x = elapsedTime * 0.15 + scrollProgress * 2;
      coreMesh.rotation.y = elapsedTime * 0.2 + mouseX * 0.5;
      coreMesh.position.x = Math.sin(elapsedTime * 0.3) * 1.2 + mouseX * 1.5;
      coreMesh.position.y = Math.cos(elapsedTime * 0.25) * 0.8 - scrollProgress * 8;

      cageMesh.rotation.x = -elapsedTime * 0.08;
      cageMesh.rotation.y = elapsedTime * 0.1;
      cageMesh.position.copy(coreMesh.position);

      torusMesh.rotation.z = elapsedTime * 0.05;

      // Camera parallax
      camera.position.x = mouseX * 0.6;
      camera.position.y = -scrollProgress * 10 + mouseY * 0.4;
      camera.lookAt(0, -scrollProgress * 10, -5);

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      scene.clear();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    />
  );
};
