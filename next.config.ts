/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  
  // Fix multiple lockfiles warning
  outputFileTracingRoot: __dirname,
  
  // Performance optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },

  // Empty turbopack config to acknowledge we're using it
  turbopack: {},
};

module.exports = nextConfig;
