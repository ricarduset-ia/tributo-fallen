"use client";
import { useTranslations } from "next-intl";
import type { StatsSidesJSON } from "@/lib/types";

const ROWS = [
  { key: "Rating 1.0",           label: "Rating 1.0",        fmt: (v: number) => v.toFixed(2) },
  { key: "Kills per round",      label: "Kills / round",     fmt: (v: number) => v.toFixed(2) },
  { key: "Damage per round",     label: "Damage / round",    fmt: (v: number) => v.toFixed(1) },
  { key: "Opening success",      label: "Opening success",   fmt: (v: number) => v.toFixed(1) + "%" },
  { key: "Sniper kills percentage", label: "Sniper kills",   fmt: (v: number) => v.toFixed(1) + "%" },
  { key: "1on1 win percentage",  label: "1v1 win rate",      fmt: (v: number) => v.toFixed(1) + "%" },
  { key: "Flashes thrown per round", label: "Flashes / round", fmt: (v: number) => v.toFixed(2) },
];

export function SidesRadar({ data }: { data: StatsSidesJSON }) {
  const t = useTranslations("stats");

  return (
    <section className="py-20 border-t border-fallen-bone/5">
      <div className="mx-auto max-w-4xl px-6">
        <p className="text-mono text-xs uppercase tracking-[0.35em] text-fallen-gold mb-2">{t("sidesTitle")}</p>
        <p className="text-fallen-muted mb-10">{t("sidesSubtitle")}</p>

        {/* Header */}
        <div className="grid grid-cols-[1fr_auto_1fr] items-center mb-4 px-2">
          <span className="text-mono text-xs uppercase tracking-widest text-fallen-gold">{t("sideT")}</span>
          <span className="w-40 md:w-56" />
          <span className="text-mono text-xs uppercase tracking-widest text-fallen-awp text-right">{t("sideCT")}</span>
        </div>

        <div className="space-y-2">
          {ROWS.map(({ key, label, fmt }) => {
            const entry = data.metrics[key];
            if (!entry) return null;
            const tVal = entry.t_side as number;
            const ctVal = entry.ct_side as number;
            const tWins = tVal > ctVal;
            const ctWins = ctVal > tVal;
            const max = Math.max(tVal, ctVal);
            const tPct = (tVal / max) * 100;
            const ctPct = (ctVal / max) * 100;

            return (
              <div key={key} className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                {/* T-side */}
                <div className="flex items-center gap-3 justify-end">
                  <span className={`text-mono text-sm tabular-nums font-medium ${tWins ? "text-fallen-gold" : "text-fallen-muted/60"}`}>
                    {fmt(tVal)}
                  </span>
                  <div className="w-20 md:w-32 h-px bg-fallen-bone/10 relative overflow-hidden rounded-full">
                    <div
                      className="absolute right-0 top-0 h-full rounded-full"
                      style={{
                        width: `${tPct}%`,
                        background: tWins ? "#F2A900" : "#6B6A6440",
                      }}
                    />
                  </div>
                </div>

                {/* Label */}
                <span className="text-mono text-[10px] uppercase tracking-widest text-fallen-muted/70 text-center w-36 md:w-48">
                  {label}
                </span>

                {/* CT-side */}
                <div className="flex items-center gap-3">
                  <div className="w-20 md:w-32 h-px bg-fallen-bone/10 relative overflow-hidden rounded-full">
                    <div
                      className="absolute left-0 top-0 h-full rounded-full"
                      style={{
                        width: `${ctPct}%`,
                        background: ctWins ? "#4CE0D2" : "#6B6A6440",
                      }}
                    />
                  </div>
                  <span className={`text-mono text-sm tabular-nums font-medium ${ctWins ? "text-fallen-awp" : "text-fallen-muted/60"}`}>
                    {fmt(ctVal)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-10 text-mono text-[10px] text-fallen-muted/40 uppercase tracking-widest">
          Era CS:GO/CS2 — dados agregados do HLTV
        </p>
      </div>
    </section>
  );
}
