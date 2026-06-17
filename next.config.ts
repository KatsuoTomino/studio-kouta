import type { NextConfig } from "next";

function getR2ImagePattern() {
  const publicUrl = process.env.R2_PUBLIC_URL;
  if (!publicUrl) return null;

  try {
    const hostname = new URL(publicUrl).hostname;
    return {
      protocol: "https" as const,
      hostname,
    };
  } catch {
    return null;
  }
}

const r2ImagePattern = getR2ImagePattern();

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      // R2 アップロード上限（10MB）に合わせる。デフォルトは 1MB。
      bodySizeLimit: "10mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.dicebear.com",
      },
      ...(r2ImagePattern ? [r2ImagePattern] : []),
    ],
  },
};

export default nextConfig;
