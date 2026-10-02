"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { skillsData, SkillNode } from "@/data/skillsData";
import { audio } from "@/lib/audio";

interface SkillsGalaxy3DProps {
  filterCategory: string;
  onSkillSelect: (skill: SkillNode | null) => void;
  selectedSkill: SkillNode | null;
}

export const SkillsGalaxy3D: React.FC<SkillsGalaxy3DProps> = ({
  filterCategory,
  onSkillSelect,
  selectedSkill,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef(filterCategory);
  filterRef.current = filterCategory;

  const selectedSkillRef = useRef(selectedSkill);
  selectedSkillRef.current = selectedSkill;

  useEffect(() => {
    if (!mountRef.current || typeof window === "undefined") return;

    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 4.2, 11.5);
    camera.lookAt(0, 0, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x050507, 0);
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 2.5, 25);
    pointLight.position.set(0, 0, 0);
    scene.add(pointLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.4);
    dirLight.position.set(6, 12, 8);
    scene.add(dirLight);

    // Central Futuristic Tesseract/Dodecahedron Core
    const coreGeo = new THREE.DodecahedronGeometry(1.0, 0);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x08080c,
      emissive: 0xffffff,
      emissiveIntensity: 0.35,
      roughness: 0.1,
      metalness: 0.95,
      wireframe: true,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    scene.add(coreMesh);

    // Solid inner diamond
    const innerGeo = new THREE.OctahedronGeometry(0.5, 0);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xe2e8f0,
      emissiveIntensity: 0.8,
      roughness: 0.2,
      metalness: 0.9,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    scene.add(innerMesh);

    // Holographic Cyber Rings
    const orbitRadii = [3.2, 4.8, 6.4];
    orbitRadii.forEach((r, idx) => {
      const ringGeo = new THREE.RingGeometry(r - 0.03, r + 0.03, 80);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.12 - idx * 0.02,
        side: THREE.DoubleSide,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = -Math.PI / 2.6;
      scene.add(ringMesh);
    });

    // Particle Swarm Dust
    const swarmCount = 300;
    const swarmPositions = new Float32Array(swarmCount * 3);
    for (let i = 0; i < swarmCount; i++) {
      const r = 2.5 + Math.random() * 5.0;
      const angle = Math.random() * Math.PI * 2;
      swarmPositions[i * 3] = Math.cos(angle) * r;
      swarmPositions[i * 3 + 1] = (Math.random() - 0.5) * 2;
      swarmPositions[i * 3 + 2] = Math.sin(angle) * (r * 0.8);
    }
    const swarmGeo = new THREE.BufferGeometry();
    swarmGeo.setAttribute("position", new THREE.BufferAttribute(swarmPositions, 3));
    const swarmMat = new THREE.PointsMaterial({
      size: 0.04,
      color: 0xffffff,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
    });
    const swarmMesh = new THREE.Points(swarmGeo, swarmMat);
    scene.add(swarmMesh);

    // Create Skill Meshes
    const nodeMeshes: {
      mesh: THREE.Mesh;
      haloMesh: THREE.Mesh;
      skill: SkillNode;
    }[] = [];

    skillsData.forEach((skill) => {
      // Node Sphere
      const nodeGeo = new THREE.SphereGeometry(0.25 * skill.size, 24, 24);
      const nodeMat = new THREE.MeshStandardMaterial({
        color: 0xe2e8f0,
        emissive: 0x475569,
        emissiveIntensity: 0.4,
        metalness: 0.85,
        roughness: 0.15,
      });
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nodeMesh.userData = { skill };
      scene.add(nodeMesh);

      // Outer Glow Halo Ring
      const haloGeo = new THREE.RingGeometry(0.35, 0.42, 32);
      const haloMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide,
      });
      const haloMesh = new THREE.Mesh(haloGeo, haloMat);
      haloMesh.rotation.x = Math.PI / 2;
      nodeMesh.add(haloMesh);

      // Text Sprite Label
      const canvas = document.createElement("canvas");
      canvas.width = 256;
      canvas.height = 64;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "rgba(10, 10, 16, 0.85)";
        ctx.roundRect(10, 10, 236, 44, 10);
        ctx.fill();
        ctx.strokeStyle = "rgba(255, 255, 255, 0.35)";
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.font = "bold 20px -apple-system, BlinkMacSystemFont, 'Inter', sans-serif";
        ctx.fillStyle = "#FFFFFF";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(skill.name, 128, 32);
      }

      const texture = new THREE.CanvasTexture(canvas);
      const spriteMat = new THREE.SpriteMaterial({ map: texture, transparent: true });
      const sprite = new THREE.Sprite(spriteMat);
      sprite.scale.set(1.4, 0.35, 1);
      sprite.position.set(0, 0.48, 0);
      nodeMesh.add(sprite);

      nodeMeshes.push({ mesh: nodeMesh, haloMesh, skill });
    });

    // Raycasting for interactive hover
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-100, -100);

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };

    container.addEventListener("mousemove", handlePointerMove, { passive: true });

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();
    let hoveredMesh: THREE.Mesh | null = null;

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Rotate core
      coreMesh.rotation.y = elapsedTime * 0.35;
      coreMesh.rotation.x = elapsedTime * 0.2;
      innerMesh.rotation.y = -elapsedTime * 0.5;
      innerMesh.rotation.z = elapsedTime * 0.3;

      swarmMesh.rotation.y = elapsedTime * 0.05;

      // Update positions along inclined orbital planes
      nodeMeshes.forEach(({ mesh, haloMesh, skill }) => {
        const currentAngle = skill.initialAngle + elapsedTime * skill.orbitSpeed * 0.45;
        const x = Math.cos(currentAngle) * skill.orbitRadius;
        const z = Math.sin(currentAngle) * (skill.orbitRadius * 0.85);
        const y = Math.sin(currentAngle) * (skill.orbitRadius * 0.25);

        mesh.position.set(x, y, z);

        const isMatch =
          filterRef.current === "All Systems" || skill.category === filterRef.current;
        const isSelected = selectedSkillRef.current?.id === skill.id;
        const isHovered = mesh === hoveredMesh;

        const mat = mesh.material as THREE.MeshStandardMaterial;
        const haloMat = haloMesh.material as THREE.MeshBasicMaterial;

        if (isSelected || isHovered) {
          mesh.scale.setScalar(1.4);
          mat.color.setHex(0xffffff);
          mat.emissive.setHex(0xffffff);
          mat.emissiveIntensity = 0.95;
          haloMat.opacity = 0.8;
        } else if (isMatch) {
          mesh.scale.setScalar(1.0);
          mat.color.setHex(0xe2e8f0);
          mat.emissive.setHex(0x475569);
          mat.emissiveIntensity = 0.4;
          haloMat.opacity = 0;
        } else {
          mesh.scale.setScalar(0.45);
          mat.color.setHex(0x334155);
          mat.emissive.setHex(0x0f172a);
          mat.emissiveIntensity = 0.1;
          haloMat.opacity = 0;
        }
      });

      // Raycasting check
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(nodeMeshes.map((n) => n.mesh));

      if (intersects.length > 0) {
        const target = intersects[0].object as THREE.Mesh;
        if (hoveredMesh !== target) {
          hoveredMesh = target;
          const skill = target.userData.skill as SkillNode;
          audio.playHover();
          onSkillSelect(skill);
        }
      } else {
        if (hoveredMesh) {
          hoveredMesh = null;
        }
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      container.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      scene.clear();
    };
  }, [onSkillSelect]);

  return (
    <div
      ref={mountRef}
      className="w-full h-[480px] sm:h-[580px] relative rounded-2xl overflow-hidden border border-white/10 bg-[#050507]/60 backdrop-blur-xl cursor-crosshair"
    />
  );
};
