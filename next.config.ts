import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow local /public directory images (default behavior)
    // Add external domains here if needed in the future
    remotePatterns: [],
  },
  devIndicators: false,
};

export default nextConfig;
