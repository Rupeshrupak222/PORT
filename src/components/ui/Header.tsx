"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useTheme } from "@/components/providers/ThemeProvider";
import { Menu, X, ArrowUpRight, Sun, Moon } from "lucide-react";

export const Header: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === "light";

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleThemeToggle = () => {
    toggleTheme();
  };

  const navLinks = [
    { name: "About", href: "#about", id: "about", isConnect: false },
    { name: "Skills", href: "#skills", id: "skills", isConnect: false },
    { name: "Experience", href: "#experience", id: "experience", isConnect: false },
    { name: "Projects", href: "#projects", id: "projects", isConnect: false },
    { name: "Connect", href: "#contact", id: "contact", isConnect: true },
  ];

  // Header is immediately visible in the hero section and throughout the portfolio.
  // When scrolled down (scrollY > 20px), it smoothly transitions into a luxury frosted glass bar.
  const isScrolled = scrollY > 20;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ease-out ${
          isScrolled
            ? "opacity-100 translate-y-0 pointer-events-auto py-3.5 px-6 sm:px-10 lg:px-16 header-scrolled-bg backdrop-blur-xl border-b header-scrolled-border shadow-lg"
            : "opacity-100 translate-y-0 pointer-events-auto py-5 sm:py-6 px-6 sm:px-10 lg:px-16 bg-transparent border-b border-transparent"
        }`}
      >
        <div className="w-full flex items-center justify-between">
          {/* Logo with Rounded Profile Picture (enlarged by ~4px) */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, "hero")}
            className="flex items-center gap-3 group cursor-pointer"
            data-cursor="HOME"
          >
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border border-white/20 shadow-sm transition-transform group-hover:scale-105 shrink-0 bg-white/10">
              <Image
                src="/rupesh-profile.jpg"
                alt="Rupesh Kumar Rupak"
                fill
                priority
                className="object-cover object-top"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold tracking-tight text-white header-brand-text transition-colors">
                RUPESH KUMAR RUPAK
              </span>
              <span className="text-[10px] font-mono text-white header-subbrand-text tracking-wider uppercase">
                Full Stack Developer
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => {
              if (link.isConnect) {
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.id)}
                    className={`text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border ${
                      isLight
                        ? "bg-black/[0.06] hover:bg-black/10 border-black/20 text-black shadow-sm"
                        : "bg-white/[0.08] hover:bg-white/[0.16] border-white/25 text-white shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                    } hover:scale-105`}
                    data-cursor="CONNECT"
                  >
                    <span className={isLight ? "text-black font-bold" : "text-white font-bold"}>
                      {link.name}
                    </span>
                    <ArrowUpRight className={`w-3.5 h-3.5 ${isLight ? "text-black" : "text-white"}`} />
                  </a>
                );
              }

              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className={`text-xs font-medium uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                    isLight
                      ? "text-zinc-800 hover:text-black"
                      : "text-white header-nav-link hover:opacity-80"
                  }`}
                  data-cursor="VIEW"
                >
                  <span className={isLight ? "text-zinc-900" : "text-white"}>{link.name}</span>
                </a>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Theme Toggle Button (Light / Dark Mode) */}
            <button
              onClick={handleThemeToggle}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full header-pill-btn transition-all text-xs font-mono cursor-pointer text-white"
              title={theme === "dark" ? "Switch to Light Theme" : "Switch to Dark Theme"}
              data-cursor="THEME"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-white animate-spin-slow" />
                  <span className="hidden sm:inline text-[10px] font-bold text-white">LIGHT</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-white" />
                  <span className="hidden sm:inline text-[10px] font-bold text-white">DARK</span>
                </>
              )}
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="md:hidden p-2 rounded-lg header-pill-btn cursor-pointer text-white"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-40 mobile-drawer-bg backdrop-blur-2xl md:hidden transition-all duration-300 flex flex-col justify-center px-8 ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between border-b mobile-drawer-border pb-3">
            <span className="text-[10px] font-mono tracking-widest text-white header-subbrand-text uppercase">
              Menu Navigation
            </span>
            <button
              onClick={handleThemeToggle}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full header-pill-btn text-xs font-mono text-white"
            >
              {theme === "dark" ? <Sun className="w-3 h-3 text-white" /> : <Moon className="w-3 h-3 text-white" />}
              <span className="text-white">{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
            </button>
          </div>

          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.id)}
              className="text-3xl font-semibold text-white header-brand-text transition-colors border-b mobile-drawer-border pb-3"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, "contact")}
            className="mt-4 w-full py-3.5 rounded-full header-primary-btn text-center text-xs font-semibold uppercase tracking-wider"
          >
            Get In Touch
          </a>
        </div>
      </div>
    </>
  );
};
