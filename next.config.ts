import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@mastra/core", "@mastra/memory", "@mastra/pg"],
};

export default nextConfig;
