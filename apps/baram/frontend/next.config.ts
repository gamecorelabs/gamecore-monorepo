import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ["@gamecoregg/web-ui"],
  async rewrites() {
    return [
      {
        source: "/user/auth/:path*",
        destination: "http://localhost:4400/auth/:path*",
      },
    ];
  },
};

export default nextConfig;
