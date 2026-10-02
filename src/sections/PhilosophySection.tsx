"use client";

import React from "react";

export const PhilosophySection: React.FC = () => {
  const pillars = [
    {
      num: "01",
      title: "Performance First",
      desc: "Optimized server responses, GPU-accelerated rendering, and minimal memory overhead.",
    },
    {
      num: "02",
      title: "Clean Modern Design",
      desc: "Pixel-perfect layouts, responsive typography, and tactile micro-interactions.",
    },
    {
      num: "03",
      title: "Resilient Architecture",
      desc: "Type-safe codebases, robust database schemas, and dependable deployment pipelines.",
    },
  ];

  return (
    <section className="relative md:py-20 py-6 px-6 sm:px-12 lg:px-20 w-full max-w-[1700px] mx-auto z-10 select-none">
      {/* Editorial Statement */}
      <div className=" py-14">

        <h2 className="text-xl sm:text-4xl md:text-5xl text-white max-w-5xl">
          &ldquo;Engineering software that combines computational speed, rock-solid reliability, and minimalist elegance.&rdquo;
        </h2>

        <div className="mt-6 flex items-center justify-between">
          <span className="text-sm font-semibold text-white">
            — RUPESH KUMAR RUPAK
          </span>
          <span className="text-xs font-mono text-white">
            FULL STACK DEVELOPER
          </span>
        </div>
      </div>
    </section>
  );
};
