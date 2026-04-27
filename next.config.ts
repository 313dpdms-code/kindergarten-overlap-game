import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/kindergarten-overlap-game",
  assetPrefix: "/kindergarten-overlap-game/",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
