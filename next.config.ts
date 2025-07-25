import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  poweredByHeader: false,
  distDir: 'dist',
  images: {
    domains: ['backend.insurancesally.com'],
  },
};

export default nextConfig;
