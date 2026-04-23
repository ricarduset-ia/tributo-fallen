"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useTranslations } from "next-intl";
import type { YearMapJSON, PerYearJSON } from "@/lib/types";
import { MAPS, YEARS } from "@/lib/constants";

function useAnimatedNumber(target: number, decimals = 2) {
  const mv = useMotionValue(0);
  useEffect(() => {
    const controls = animate(mv, target, { duration: 0.6, ease: [0.22, 1, 0.36, 1] });
    return controls.stop;
  }, [target, mv]);
  return useTransform(mv, (v) => (Number.isFinite(v) ? v.toFixed(decimals) : "—"));
}

function pick(obj: Record<string, number | string | null> | undefined, key: string): number | null {
  if (!obj) return null;
  const v = obj[key];
  return typeof v === "number" ? v : null;
}

export function YearNav({ yearMap, perYear }: { yearMap: YearMapJSON; perYear: PerYearJSON }) {
  const t = useTranslations("stats");
  const CS_YEARS = YEARS.filter((y) => parseInt(y) >= 2016);
  const [year, setYear] = useState("2016");
  const tabsRef = useRef<HTMLDivElement>(null);
  const activeTabRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    activeTabRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [year]);

  const yearData = perYear.years[year];
  const rating = pick(yearData, "Impact rating") ?? 0;
  const kd = pick(yearData, "K/D Ratio") ?? 0;
  const hs = pick(yearData, "Headshot %") ?? 0;
  const dmg = pick(yearData, "Damage / Round") ?? 0;
  const mapsPlayed = pick(yearData, "Maps played") ?? 0;
  const hasData = rating > 0;

  const ratingTxt = useAnimatedNumber(rating, 2);
  const kdTxt = useAnimatedNumber(kd, 2);
  const hsTxt = useAnimatedNumber(hs, 1);
  const dmgTxt = useAnimatedNumber(dmg, 1);

  const mapCards = MAPS
    .map((m) => {
      const cell = yearMap.years[year]?.[m];
      const r = pick(cell, "Impact rating");
      const k = pick(cell, "K/D Ratio");
      const mp = pick(cell, "Maps played");
      return { map: m, rating: r, kd: k, mapsPlayed: mp };
    })
    .filter((c) => c.rating !== null && c.rating > 0)
    .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));

  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mb-6">
          <p className="text-mono text-xs uppercase tracking-[0.35em] text-fallen-gold">
            {t("filterTitle")}
          </p>
          <p className="text-mono text-xs text-fallen-muted">{t("statsEraNote")}</p>
        </div>

        {/* Year tabs */}
        <div ref={tabsRef} className="flex gap-1 overflow-x-auto pb-2 mb-10 scrollbar-none">
          {CS_YEARS.map((y) => (
            <button
              key={y}
              ref={y === year ? activeTabRef : undefined}
              onClick={() => setYear(y)}
              className={`flex-shrink-0 text-mono text-xs uppercase tracking-widest px-4 py-2 border transition ${
                y === year
                  ? "border-fallen-gold text-fallen-gold bg-fallen-gold/5"
                  : "border-fallen-bone/10 text-fallen-muted hover:border-fallen-bone/30 hover:text-fallen-bone"
              }`}
            >
              {y}
            </button>
          ))}
        </div>

        {hasData ? (
          <>
            {/* Year stats panel */}
            <div className="border border-fallen-bone/10 bg-fallen-ink/40 p-8 mb-8">
              <div className="flex flex-col md:flex-row md:items-center gap-8">
                <div className="text-center md:text-left">
                  <span className="text-mono text-xs uppercase tracking-[0.35em] text-fallen-gold">{t("ratingLabel")}</span>
                  <div className="text-display text-[6rem] md:text-[8rem] leading-none text-fallen-awp tabular-nums">
                    <motion.span>{ratingTxt}</motion.span>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 flex-1">
                  <Stat label={t("kdRatio")} value={<motion.span>{kdTxt}</motion.span>} />
                  <Stat label={t("hsPercent")} value={<><motion.span>{hsTxt}</motion.span>%</>} />
                  <Stat label={t("dmgRound")} value={<motion.span>{dmgTxt}</motion.span>} />
                  <Stat label={t("mapsPlayed")} value={mapsPlayed.toString()} />
                </div>
              </div>
            </div>

            {/* Map cards */}
            {mapCards.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {mapCards.map((c) => (
                  <div key={c.map} className="border border-fallen-bone/10 p-4 hover:border-fallen-gold/30 transition">
                    <p className="text-mono text-xs uppercase tracking-widest text-fallen-gold mb-2">
                      {c.map.replace("de_", "")}
                    </p>
                    <p className="text-display text-3xl text-fallen-bone tabular-nums leading-none mb-3">
                      {c.rating?.toFixed(2)}
                    </p>
                    <div className="space-y-1">
                      <p className="text-mono text-xs text-fallen-muted">
                        {t("kdRatio")} <span className="text-fallen-bone">{c.kd?.toFixed(2)}</span>
                      </p>
                      <p className="text-mono text-xs text-fallen-muted">
                        {t("mapsPlayed")} <span className="text-fallen-bone">{c.mapsPlayed}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="border border-fallen-bone/10 p-16 text-center">
            <p className="text-fallen-muted text-mono text-xs uppercase tracking-widest">{t("noData")}</p>
          </div>
        )}
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="border-l border-fallen-bone/10 pl-4">
      <p className="text-mono text-xs uppercase tracking-widest text-fallen-muted mb-1">{label}</p>
      <p className="text-display text-2xl tabular-nums text-fallen-bone">{value}</p>
    </div>
  );
}
