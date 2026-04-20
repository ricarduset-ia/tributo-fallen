"use client";
import { useTranslations } from "next-intl";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceDot,
} from "recharts";
import type { PerYearJSON } from "@/lib/types";

export function RatingTrendChart({ data }: { data: PerYearJSON }) {
  const t = useTranslations("stats");

  const series = Object.entries(data.years)
    .map(([year, stats]) => ({
      year: Number(year),
      rating: typeof stats["Impact rating"] === "number" ? (stats["Impact rating"] as number) : null,
    }))
    .filter((d) => d.rating !== null && d.year >= 2014);

  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-mono text-xs uppercase tracking-[0.35em] text-fallen-gold mb-2">{t("trendTitle")}</p>
        <p className="text-fallen-muted mb-8">{t("trendSubtitle")}</p>
        <div className="h-80 w-full">
          <ResponsiveContainer>
            <LineChart data={series} margin={{ left: 0, right: 20, top: 20, bottom: 10 }}>
              <XAxis dataKey="year" stroke="#6B6A64" tick={{ fontFamily: "var(--font-jetbrains)", fontSize: 11 }} />
              <YAxis domain={[0.7, 1.3]} stroke="#6B6A64" tick={{ fontFamily: "var(--font-jetbrains)", fontSize: 11 }} />
              <Tooltip
                contentStyle={{ background: "#111113", border: "1px solid rgba(212,175,55,0.3)", color: "#E8E6DE", fontFamily: "var(--font-jetbrains)" }}
                labelStyle={{ color: "#D4AF37" }}
              />
              <Line type="monotone" dataKey="rating" stroke="#D4AF37" strokeWidth={2.5} dot={{ r: 4, fill: "#D4AF37" }} activeDot={{ r: 7 }} isAnimationActive animationDuration={1800} />
              <ReferenceDot x={2016} y={1.18} r={9} fill="#4CE0D2" stroke="#0A0A0B" label={{ value: t("trendAnnotationPeak"), position: "top", fill: "#4CE0D2", fontSize: 11, fontFamily: "var(--font-jetbrains)" }} />
              <ReferenceDot x={2023} y={0.97} r={9} fill="#F2A900" stroke="#0A0A0B" label={{ value: t("trendAnnotationFuria"), position: "bottom", fill: "#F2A900", fontSize: 11, fontFamily: "var(--font-jetbrains)" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}
