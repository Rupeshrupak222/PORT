/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  images: {
    // Locked to specific trusted hostnames only — no wildcard to prevent SSRF
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'adyapan.com',
      },
      {
        protocol: 'https',
        hostname: 'adyapanschool.com',
      },
      {
        protocol: 'https',
        hostname: 'my.adyapan.com',
      },
      {
        protocol: 'https',
        hostname: 'ai.adyapan.com',
      },
      {
        protocol: 'https',
        hostname: 'adyapancrm.in',
      },
      {
        protocol: 'https',
        hostname: 'sharego1.netlify.app',
      },
    ],
  },
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },
};

export default nextConfig;
