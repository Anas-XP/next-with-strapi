import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { getEnv } from "./lib/env.utils";

const nextConfig: NextConfig = {
  cacheComponents: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/auth-proxy/:path*",
        destination: `${getEnv("STRAPI_API_URL", { defaultValue: "http://localhost:1338/api" })}/:path*`,
      },
    ];
  },
  /* config options here */
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
