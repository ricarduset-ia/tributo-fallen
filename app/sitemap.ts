import type { MetadataRoute } from "next";
import { locales } from "@/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
  const paths = ["", "/stats", "/conquistas", "/trajetoria"];
  return locales.flatMap((l) =>
    paths.map((p) => ({
      url: `${base}/${l}${p}`,
      changeFrequency: "weekly" as const,
      priority: p === "" ? 1 : 0.8,
    }))
  );
}
