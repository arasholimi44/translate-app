import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: 'export',
  // distDir: 'dist',
  output: 'standalone',
  reactStrictMode: false,
};

export default nextConfig;
