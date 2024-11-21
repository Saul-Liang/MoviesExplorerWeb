import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@darkbluetechnologies/ui"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        port: "",
        pathname: "/t/p/w500/**",
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["@darkbluetechnologies/ui"],
  },
};

export default nextConfig;
