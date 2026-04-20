import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n.ts");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "img-cdn.hltv.org" },
      { protocol: "https", hostname: "liquipedia.net" },
    ],
  },
};

export default withNextIntl(nextConfig);
