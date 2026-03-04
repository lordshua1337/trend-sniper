import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        destination: "https://cashcow-v3.vercel.app/dashboard/heatmap",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
