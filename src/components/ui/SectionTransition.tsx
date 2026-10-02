"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface SectionTransitionProps {
  children: React.ReactNode;
  className?: string;
  isFirstSection?: boolean;
  isLastSection?: boolean;
  noExitFade?: boolean;
}

export const SectionTransition: React.FC<SectionTransitionProps> = ({
  children,
  className = "",
  isFirstSection = false,
  isLastSection = false,
  noExitFade = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: isFirstSection
      ? ["start start", "end start"]
      : isLastSection || noExitFade
      ? ["start end", "start center"]
      : ["start end", "end start"],
  });

  // Dissolve Opacity Transition
  const opacity = useTransform(
    scrollYProgress,
    isFirstSection
      ? [0, 0.4, 0.75]
      : isLastSection || noExitFade
      ? [0, 1]
      : [0, 0.16, 0.56, 0.86],
    isFirstSection
      ? [1, 0.6, 0]
      : isLastSection || noExitFade
      ? [0.15, 1]
      : [0.15, 1, 1, 0]
  );

  // Dissolve Scale Transition
  const scale = useTransform(
    scrollYProgress,
    isFirstSection
      ? [0, 0.75]
      : isLastSection || noExitFade
      ? [0, 1]
      : [0, 0.16, 0.56, 0.86],
    isFirstSection
      ? [1, 0.94]
      : isLastSection || noExitFade
      ? [0.98, 1]
      : [0.97, 1, 1, 0.94]
  );

  // Dissolve Lift Transition
  const y = useTransform(
    scrollYProgress,
    isFirstSection
      ? [0, 0.75]
      : isLastSection || noExitFade
      ? [0, 1]
      : [0, 0.16, 0.56, 0.86],
    isFirstSection
      ? [0, -45]
      : isLastSection || noExitFade
      ? [25, 0]
      : [30, 0, 0, -45]
  );

  // Cinematic Blur Dissolve
  const filter = useTransform(
    scrollYProgress,
    isFirstSection
      ? [0, 0.4, 0.75]
      : isLastSection || noExitFade
      ? [0, 1]
      : [0, 0.16, 0.56, 0.86],
    isFirstSection
      ? ["blur(0px)", "blur(0px)", "blur(4px)"]
      : isLastSection || noExitFade
      ? ["blur(0px)", "blur(0px)"]
      : ["blur(0px)", "blur(0px)", "blur(0px)", "blur(4px)"]
  );

  return (
    <motion.div
      ref={containerRef}
      style={{ opacity, scale, y, filter }}
      className={`w-full will-change-[transform,opacity,filter] ${className}`}
    >
      {children}
    </motion.div>
  );
};
