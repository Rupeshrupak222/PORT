"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { skillsData, SkillNode } from "@/data/skillsData";
import { audio } from "@/lib/audio";

interface SkillsNeuralMatrix3DProps {
  filterCategory: string;
  onSkillSelect: (skill: SkillNode | null) => void;
  selectedSkill: SkillNode | null;
}

export const SkillsNeuralMatrix3D: React.FC<SkillsNeuralMatrix3DProps> = ({
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
    camera.position.set(0, 2.5, 12);
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
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 2.5, 30);
    pointLight.position.set(0, 2, 4);
    scene.add(pointLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(5, 10, 7);
    scene.add(dirLight);

    // Central Floating Obsidian Geometric Core (Faceted Icosahedron)
    const coreGeo = new THREE.IcosahedronGeometry(0.85, 0);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x0a0a0f,
      emissive: 0xffffff,
      emissiveIntensity: 0.35,
      roughness: 0.15,
      metalness: 0.9,
      wireframe: true,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    scene.add(coreMesh);

    // Inner Glowing Core
    const innerGeo = new THREE.OctahedronGeometry(0.45, 0);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: false,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    scene.add(innerMesh);

    // Particle Constellation Dust
    const particleCount = 280;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 16;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.035,
      color: 0xffffff,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
    });
    const particlePoints = new THREE.Points(particleGeo, particleMat);
    scene.add(particlePoints);

    // Calculate 3D spatial node positions in a dynamic 3D neural constellation lattice
    const nodeCount = skillsData.length;
    const nodeMeshes: {
      mesh: THREE.Mesh;
      haloMesh: THREE.Mesh;
      skill: SkillNode;
      targetPos: THREE.Vector3;
      basePos: THREE.Vector3;
    }[] = [];

    // Spherical Golden Spiral / Neural Lattice Distribution
    const phi = Math.PI * (3 - Math.sqrt(5)); // golden angle
    skillsData.forEach((skill, i) => {
      const y = 1 - (i / (nodeCount - 1)) * 2; // y goes from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y); // radius at y
      const theta = phi * i; // golden angle increment

      const spreadRadiusX = 5.6;
      const spreadRadiusY = 3.2;
      const spreadRadiusZ = 4.8;

      const posX = Math.cos(theta) * radiusAtY * spreadRadiusX;
      const posY = y * spreadRadiusY;
      const posZ = Math.sin(theta) * radiusAtY * spreadRadiusZ;

      const basePos = new THREE.Vector3(posX, posY, posZ);

      // Node Geometry
      const nodeGeo = new THREE.SphereGeometry(0.24 * skill.size, 20, 20);
      const nodeMat = new THREE.MeshStandardMaterial({
        color: 0xe2e8f0,
        emissive: 0x334155,
        emissiveIntensity: 0.35,
        metalness: 0.85,
        roughness: 0.2,
      });
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nodeMesh.position.copy(basePos);
      nodeMesh.userData = { skill, index: i };
      scene.add(nodeMesh);

      // Outer Halo Ring
      const haloGeo = new THREE.RingGeometry(0.35, 0.42, 28);
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
        ctx.fillStyle = "rgba(8, 8, 12, 0.88)";
        ctx.roundRect(10, 10, 236, 44, 10);
        ctx.fill();
        ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
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
      sprite.position.set(0, 0.45, 0);
      nodeMesh.add(sprite);

      nodeMeshes.push({
        mesh: nodeMesh,
        haloMesh,
        skill,
        targetPos: basePos.clone(),
        basePos,
      });
    });

    // Dynamic Connecting Laser Energy Lines between related nodes
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.12,
    });

    const linePositions: number[] = [];
    for (let i = 0; i < nodeMeshes.length; i++) {
      for (let j = i + 1; j < nodeMeshes.length; j++) {
        const dist = nodeMeshes[i].basePos.distanceTo(nodeMeshes[j].basePos);
        const sameCategory = nodeMeshes[i].skill.category === nodeMeshes[j].skill.category;

        // Connect if close in 3D space or in the same core category
        if (dist < 4.2 || (sameCategory && dist < 5.8)) {
          linePositions.push(
            nodeMeshes[i].basePos.x,
            nodeMeshes[i].basePos.y,
            nodeMeshes[i].basePos.z,
            nodeMeshes[j].basePos.x,
            nodeMeshes[j].basePos.y,
            nodeMeshes[j].basePos.z
          );
        }
      }
    }

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(linePositions, 3)
    );
    const lineSegments = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineSegments);

    // Active Highlight Lines for selected/hovered node
    const highlightLineMaterial = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.85,
    });
    const highlightLineGeo = new THREE.BufferGeometry();
    const highlightLines = new THREE.LineSegments(highlightLineGeo, highlightLineMaterial);
    scene.add(highlightLines);

    // Mouse Interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-100, -100);
    const targetRotation = { x: 0, y: 0 };
    const currentRotation = { x: 0, y: 0 };

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      targetRotation.y = mouse.x * 0.45;
      targetRotation.x = -mouse.y * 0.35;
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

      // Smooth camera / scene tilt parallax
      currentRotation.x += (targetRotation.x - currentRotation.x) * 0.05;
      currentRotation.y += (targetRotation.y - currentRotation.y) * 0.05;

      scene.rotation.y = currentRotation.y + elapsedTime * 0.04;
      scene.rotation.x = currentRotation.x;

      // Animate Center Core
      coreMesh.rotation.y = elapsedTime * 0.4;
      coreMesh.rotation.x = elapsedTime * 0.25;
      innerMesh.rotation.y = -elapsedTime * 0.6;
      innerMesh.rotation.z = elapsedTime * 0.35;

      particlePoints.rotation.y = -elapsedTime * 0.02;

      // Pulse connecting lines
      lineMaterial.opacity = 0.1 + Math.sin(elapsedTime * 1.5) * 0.04;

      // Animate Nodes with subtle organic floating
      nodeMeshes.forEach(({ mesh, haloMesh, skill, basePos }, idx) => {
        const floatY = Math.sin(elapsedTime * 1.2 + idx * 0.4) * 0.12;
        const floatX = Math.cos(elapsedTime * 0.9 + idx * 0.3) * 0.08;
        mesh.position.set(basePos.x + floatX, basePos.y + floatY, basePos.z);

        const isMatch =
          filterRef.current === "All Systems" || skill.category === filterRef.current;
        const isSelected = selectedSkillRef.current?.id === skill.id;
        const isHovered = mesh === hoveredMesh;

        const mat = mesh.material as THREE.MeshStandardMaterial;
        const haloMat = haloMesh.material as THREE.MeshBasicMaterial;

        if (isSelected || isHovered) {
          mesh.scale.setScalar(1.35);
          mat.color.setHex(0xffffff);
          mat.emissive.setHex(0xffffff);
          mat.emissiveIntensity = 0.95;
          haloMat.opacity = 0.85;
        } else if (isMatch) {
          mesh.scale.setScalar(1.0);
          mat.color.setHex(0xe2e8f0);
          mat.emissive.setHex(0x334155);
          mat.emissiveIntensity = 0.35;
          haloMat.opacity = 0;
        } else {
          mesh.scale.setScalar(0.4);
          mat.color.setHex(0x1e293b);
          mat.emissive.setHex(0x0a0f1d);
          mat.emissiveIntensity = 0.05;
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

          // Update Highlight Laser Connections to related technologies
          const activePos = target.position;
          const activeSkill = skill;
          const activeConnections: number[] = [];

          nodeMeshes.forEach((other) => {
            if (other.mesh !== target) {
              const isConnected =
                other.skill.category === activeSkill.category ||
                other.skill.projectsUsed.some((p) =>
                  activeSkill.projectsUsed.includes(p)
                );

              if (isConnected) {
                activeConnections.push(
                  activePos.x,
                  activePos.y,
                  activePos.z,
                  other.mesh.position.x,
                  other.mesh.position.y,
                  other.mesh.position.z
                );
              }
            }
          });

          highlightLineGeo.setAttribute(
            "position",
            new THREE.Float32BufferAttribute(activeConnections, 3)
          );
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
      className="w-full h-[540px] sm:h-[640px] relative rounded-3xl overflow-hidden border border-white/10 bg-[#050508]/80 backdrop-blur-2xl cursor-crosshair shadow-[0_25px_60px_rgba(0,0,0,0.8)]"
    />
  );
};
