import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/trend-sniper",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
