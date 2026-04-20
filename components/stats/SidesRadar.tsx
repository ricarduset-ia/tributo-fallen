"use client";
import { useTranslations } from "next-intl";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer, Legend } from "recharts";
import type { StatsSidesJSON } from "@/lib/types";

const METRICS = [
  "Kills per round",
  "Damage per round",
  "Rating 1.0",
  "Opening success",
  "Clutch points per round",
  "Sniper kills percentage",
];

export function SidesRadar({ data }: { data: StatsSidesJSON }) {
  const t = useTranslations("stats");

  const rows = METRICS.map((m) => {
    const e = data.metrics[m];
    const t_val = (e?.t_side as number) ?? 0;
    const ct_val = (e?.ct_side as number) ?? 0;
    const max = Math.max(t_val, ct_val, 0.0001);
    return {
      metric: m.replace(" per round", "/rd").replace(" percentage", " %"),
      T: (t_val / max) * 100,
      CT: (ct_val / max) * 100,
    };
  });

  return (
    <section className="py-20">
      <div className="mx-auto max-w-4xl px-6">
        <p className="text-mono text-xs uppercase tracking-[0.35em] text-fallen-gold mb-2">{t("sidesTitle")}</p>
        <p className="text-fallen-muted mb-10">{t("sidesSubtitle")}</p>
        <div className="h-[440px]">
          <ResponsiveContainer>
            <RadarChart data={rows} outerRadius="75%">
              <PolarGrid stroke="#333333" />
              <PolarAngleAxis dataKey="metric" stroke="#6B6A64" tick={{ fontFamily: "var(--font-jetbrains)", fontSize: 10, fill: "#6B6A64" }} />
              <Radar name={t("sideT")} dataKey="T" stroke="#F2A900" fill="#F2A900" fillOpacity={0.35} isAnimationActive animationDuration={1400} />
              <Radar name={t("sideCT")} dataKey="CT" stroke="#4CE0D2" fill="#4CE0D2" fillOpacity={0.25} isAnimationActive animationDuration={1400} />
              <Legend wrapperStyle={{ fontFamily: "var(--font-jetbrains)", fontSize: 11, color: "#E8E6DE" }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}
