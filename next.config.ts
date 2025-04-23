import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@prisma/client", "@auth/prisma-adapter"],
  transpilePackages: ["next-auth"],
};

export default nextConfig;
