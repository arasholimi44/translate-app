import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: 'export',
  // distDir: 'dist',
  output: 'standalone',
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },

};

export default nextConfig;
