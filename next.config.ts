// next.config.ts
import type { NextConfig } from 'next';

// webpack-obfuscator is a CommonJS plugin — require it at runtime to avoid TS import issues.
// Install first: npm i -D webpack-obfuscator
// eslint-disable-next-line @typescript-eslint/no-var-requires
const WebpackObfuscator = require('webpack-obfuscator');

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,

  // Keep output file tracing root if you need it
  outputFileTracingRoot: __dirname,

  // Remove console.* in production builds (compiler is Next's turbopack/swctype option)
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Do not explicitly set swcMinify here (some Next versions don't accept it in TS config)
  // Next will minify for production according to its default behavior / build system.

  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },

  // Explicitly disable production browser source maps (harder to reverse engineer)
  productionBrowserSourceMaps: false,

  // turbopack placeholder (keep if you intentionally use / acknowledge turbopack)
  turbopack: {},

  // Webpack customization: add obfuscator only for client & production builds
  webpack: (config, { isServer, dev }) => {
    // only when building client production bundles (not server, not dev)
    if (!isServer && !dev && process.env.NODE_ENV === 'production') {
      const obfuscatorOptions = {
        compact: true,
        controlFlowFlattening: false,
        deadCodeInjection: false,
        disableConsoleOutput: true,
        rotateStringArray: true,
        stringArray: true,
        stringArrayEncoding: ['rc4'],
        stringArrayThreshold: 0.75,
      };

      // Exclude vendor/framework chunks to reduce risk
      const excludePatterns = ['vendors*', 'react*', 'framework*'];

      config.plugins?.push(new WebpackObfuscator(obfuscatorOptions, excludePatterns));
    }

    return config;
  },
};

export default nextConfig;
