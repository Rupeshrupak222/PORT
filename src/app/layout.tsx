import type { Metadata, Viewport } from "next";
import "./globals.css";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { SmoothScrollProvider } from "@/components/providers/SmoothScroll";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

export const metadata: Metadata = {
  title: "RUPESH KUMAR RUPAK — Full Stack Engineer & Creative WebGL Architect",
  description:
    "Production-grade personal portfolio & luxury digital experience of Rupesh Kumar Rupak. Specializing in high-performance distributed systems, WebGL shaders, Three.js 3D web, and haute couture digital craft.",
  keywords: [
    "Rupesh Kumar Rupak",
    "Creative Technologist",
    "Full Stack Developer",
    "Three.js Engineer",
    "WebGL Artist",
    "Next.js 15",
    "Awwwards Portfolio",
    "Luxury Digital Experience",
  ],
  authors: [{ name: "Rupesh Kumar Rupak" }],
  creator: "Rupesh Kumar Rupak",
  openGraph: {
    title: "RUPESH KUMAR RUPAK — Full Stack Engineer & Creative WebGL Architect",
    description: "Luxury digital universe and production portfolio of Rupesh Kumar Rupak.",
    type: "website",
    locale: "en_US",
  },
  robots: "index, follow",
};

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className="antialiased selection:bg-white selection:text-black min-h-screen relative transition-colors duration-300"
        suppressHydrationWarning
      >
        <ThemeProvider>
          <SmoothScrollProvider>
            {/* Subtle Film Grain Noise Texture */}
            <div className="noise-overlay" />

            {/* Precision Magnetic Custom Cursor */}
            <CustomCursor />

            {/* Main Viewport Content */}

            {/* Main Viewport Content */}
            <main className="relative z-10">{children}</main>
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
