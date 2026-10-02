"use client";

import React, { useEffect, useRef, useState } from "react";
import { audio } from "@/lib/audio";

export const CustomCursor: React.FC = () => {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const cursorTextRef = useRef<HTMLSpanElement>(null);

  const mouse = useRef({ x: -100, y: -100 });
  const dotPos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  
  const [cursorText, setCursorText] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on desktop pointer devices
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    document.body.classList.add("custom-cursor-active");

    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      if (!isVisible) setIsVisible(true);
    };

    const onMouseDown = () => {
      setIsClicked(true);
      audio.playClick();
    };

    const onMouseUp = () => {
      setIsClicked(false);
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const onMouseEnter = () => {
      setIsVisible(true);
    };

    // Global listener for interactive hover detection
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest(
        'a, button, [role="button"], input, textarea, select, [data-cursor], .interactive'
      );

      if (interactive) {
        setIsHovered(true);
        const cursorData = interactive.getAttribute("data-cursor");
        if (cursorData) {
          setCursorText(cursorData);
        } else if (interactive.tagName === "A") {
          setCursorText("VISIT");
        } else if (interactive.tagName === "BUTTON") {
          setCursorText("");
        }
        audio.playHover();
      } else {
        setIsHovered(false);
        setCursorText("");
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.documentElement.addEventListener("mouseleave", onMouseLeave);
    document.documentElement.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseover", handleMouseOver, { passive: true });

    let animationFrameId: number;

    const render = () => {
      // Direct dot interpolation
      dotPos.current.x += (mouse.current.x - dotPos.current.x) * 0.75;
      dotPos.current.y += (mouse.current.y - dotPos.current.y) * 0.75;

      // Smooth lag ring interpolation
      ringPos.current.x += (mouse.current.x - ringPos.current.x) * 0.16;
      ringPos.current.y += (mouse.current.y - ringPos.current.y) * 0.16;

      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${dotPos.current.x}px, ${dotPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
      document.documentElement.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible]);

  if (typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0)) {
    return null;
  }

  return (
    <div className={`pointer-events-none fixed inset-0 z-[9999] transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"}`}>
      {/* Precision center dot */}
      <div
        ref={cursorDotRef}
        className={`cursor-dot fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-white transition-transform duration-100 ease-out will-change-transform ${
          isClicked ? "scale-50" : isHovered ? "scale-0 opacity-0" : "scale-100 opacity-100"
        }`}
      />

      {/* Fluid luxury ring */}
      <div
        ref={cursorRingRef}
        className={`cursor-ring fixed top-0 left-0 flex items-center justify-center rounded-full border border-white/40 transition-all duration-300 ease-out will-change-transform ${
          cursorText
            ? "cursor-active w-20 h-20 bg-white/10 backdrop-blur-md border-white/60 text-white"
            : isHovered
            ? "w-14 h-14 bg-white/15 backdrop-blur-sm border-white/80"
            : isClicked
            ? "w-8 h-8 border-white/90 bg-white/20"
            : "w-9 h-9 border-white/25 bg-transparent"
        }`}
      >
        {cursorText && (
          <span
            ref={cursorTextRef}
            className="cursor-text text-[9px] font-mono tracking-[0.2em] font-semibold uppercase text-white animate-fade-in"
          >
            {cursorText}
          </span>
        )}
      </div>
    </div>
  );
};
