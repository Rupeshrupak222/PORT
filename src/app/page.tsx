"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/ui/Header";
import { ScrollIntroSplash } from "@/components/ui/ScrollIntroSplash";
import { ScrollProgressHUD } from "@/components/ui/ScrollProgressHUD";
import { CyberBackground } from "@/components/ui/CyberBackground";
import { useSmoothScroll } from "@/components/providers/SmoothScroll";
import { SectionTransition } from "@/components/ui/SectionTransition";
import { HeroSection } from "@/sections/HeroSection";
import { AboutStory } from "@/sections/AboutStory";
import { SkillsSection } from "@/sections/SkillsSection";
import { ExperiencePath } from "@/sections/ExperiencePath";
import { ProjectsShowcase } from "@/sections/ProjectsShowcase";
import { PhilosophySection } from "@/sections/PhilosophySection";
import { ContactSection } from "@/sections/ContactSection";
import { Footer } from "@/sections/Footer";

export default function Home() {
  const [splashActive, setSplashActive] = useState(true);
  const { stop, start, scrollToTop } = useSmoothScroll();

  useEffect(() => {
    if (splashActive) {
      stop();
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      }
    }
  }, [splashActive, stop]);

  const handleSplashComplete = () => {
    scrollToTop();
    start();
    setSplashActive(false);
  };

  return (
    <>
      {/* Pinned In-Place Scroll-Driven Spatial Zoom Splash Screen */}
      {splashActive && (
        <ScrollIntroSplash onComplete={handleSplashComplete} />
      )}

      {/* Persistent Animated 3D Cyber Wave Grid & Celestial Stardust Background */}
      {!splashActive && <CyberBackground />}

      {/* Floating Luxury Navigation Header (Only visible once splash completes) */}
      {!splashActive && <Header />}

      {/* Floating Real-Time Scroll Progress Percentage HUD (Only visible once splash completes) */}
      {!splashActive && <ScrollProgressHUD />}

      <div
        className={`relative z-10 w-full min-h-screen text-white bg-transparent ${
          splashActive
            ? "max-h-screen overflow-hidden pointer-events-none select-none invisible fixed inset-0"
            : ""
        }`}
        aria-hidden={splashActive}
      >
        {/* Full-Screen Immersive Hero with 3D Holographic Portrait */}
        <SectionTransition isFirstSection>
          <HeroSection />
        </SectionTransition>

        {/* Narrative Biography & Credentials */}
        <SectionTransition>
          <AboutStory />
        </SectionTransition>

        {/* 3D Interactive Cyber Skills Matrix */}
        <SectionTransition>
          <SkillsSection />
        </SectionTransition>

        {/* 3D Experience Milestone Trajectory */}
        <SectionTransition>
          <ExperiencePath />
        </SectionTransition>

        {/* Featured Projects Showcase */}
        <ProjectsShowcase />

        {/* Engineering Philosophy */}
        <SectionTransition>
          <PhilosophySection />
        </SectionTransition>

        {/* Direct Contact Terminal (Right above Footer, stays solid and proper) */}
        <SectionTransition noExitFade>
          <ContactSection />
        </SectionTransition>

        {/* Minimalist Timeless Footer */}
        <SectionTransition isLastSection>
          <Footer />
        </SectionTransition>
      </div>
    </>
  );
}
