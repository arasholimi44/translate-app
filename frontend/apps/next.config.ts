import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: 'export',
  // distDir: 'dist',
  output: 'standalone',
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

};

export default nextConfig;
