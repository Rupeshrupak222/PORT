"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#050505] text-white p-6 text-center">
      <h2 className="text-4xl font-extrabold mb-3">404 - Page Not Found</h2>
      <p className="text-zinc-400 text-sm mb-6 max-w-sm">
        The requested resource or document does not exist in this system.
      </p>
      <Link
        href="/"
        className="px-6 py-2.5 rounded-full bg-white text-black font-semibold text-xs tracking-wider uppercase hover:bg-zinc-200 transition-all"
      >
        Return Home
      </Link>
    </div>
  );
}
