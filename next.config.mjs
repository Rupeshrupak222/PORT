/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  devIndicators: false,

  // Disable source maps in production — bundle becomes unreadable
  productionBrowserSourceMaps: false,

  // Webpack: strip source maps completely
  webpack: (config, { dev }) => {
    if (!dev) {
      config.devtool = false;
    }
    return config;
  },

  images: {
    // Locked to specific trusted hostnames only — no wildcard to prevent SSRF
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'adyapan.com' },
      { protocol: 'https', hostname: 'adyapanschool.com' },
      { protocol: 'https', hostname: 'my.adyapan.com' },
      { protocol: 'https', hostname: 'ai.adyapan.com' },
      { protocol: 'https', hostname: 'adyapancrm.in' },
      { protocol: 'https', hostname: 'sharego1.netlify.app' },
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
          // Prevent caching of pages (forces fresh load, no cached source)
          { key: 'Cache-Control', value: 'no-store, no-cache, must-revalidate' },
        ],
      },
    ];
  },
};

export default nextConfig;
