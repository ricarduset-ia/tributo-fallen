"use client";
import { useMemo, useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import type { YearMapJSON } from "@/lib/types";
import { MAPS, YEARS } from "@/lib/constants";

function useAnimatedNumber(target: number) {
  const mv = useMotionValue(0);
  useEffect(() => {
    const controls = animate(mv, target, { duration: 0.7, ease: [0.22, 1, 0.36, 1] });
    return controls.stop;
  }, [target, mv]);
  return useTransform(mv, (v) => (Number.isFinite(v) ? v.toFixed(2) : "—"));
}

type Cell = Record<string, number | string | null>;

function pickNumber(cell: Cell | undefined, key: string): number | null {
  if (!cell) return null;
  const v = cell[key];
  return typeof v === "number" ? v : null;
}

export function YearMapFilter({ data }: { data: YearMapJSON }) {
  const t = useTranslations("stats");
  const [year, setYear] = useState("2016");
  const [map, setMap] = useState<typeof MAPS[number]>("de_dust2");

  const cell = data.years[year]?.[map];
  const rating = pickNumber(cell, "Impact rating") ?? 0;
  const maps = pickNumber(cell, "Maps played") ?? 0;
  const kd = pickNumber(cell, "K/D Ratio") ?? 0;
  const kpr = pickNumber(cell, "Kills / round") ?? 0;
  const hs = pickNumber(cell, "Headshot %") ?? 0;

  const ratingTxt = useAnimatedNumber(rating);
  const hasData = rating > 0;

  const heatRows = useMemo(() =>
    YEARS.map((y) => ({
      year: y,
      cells: MAPS.map((m) => {
        const c = data.years[y]?.[m];
        const r = pickNumber(c, "Impact rating");
        return { map: m, rating: r };
      }),
    })), [data]);

  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-mono text-xs uppercase tracking-[0.35em] text-fallen-gold mb-6">{t("filterTitle")}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <label className="block">
            <span className="text-mono text-xs uppercase tracking-widest text-fallen-muted">{t("yearLabel")}</span>
            <select
              value={year} onChange={(e) => setYear(e.target.value)}
              className="mt-2 w-full bg-fallen-ink border border-fallen-bone/15 py-3 px-4 text-display text-2xl text-fallen-bone focus:outline-none focus:border-fallen-gold"
            >
              {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
            </select>
          </label>
          <label className="block">
            <span className="text-mono text-xs uppercase tracking-widest text-fallen-muted">{t("mapLabel")}</span>
            <select
              value={map} onChange={(e) => setMap(e.target.value as typeof MAPS[number])}
              className="mt-2 w-full bg-fallen-ink border border-fallen-bone/15 py-3 px-4 text-display text-2xl text-fallen-bone focus:outline-none focus:border-fallen-gold"
            >
              {MAPS.map((m) => <option key={m} value={m}>{m.replace("de_", "").toUpperCase()}</option>)}
            </select>
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-10 items-center">
          <div className="bg-fallen-ink/40 border border-fallen-bone/10 p-10 text-center">
            <span className="text-mono text-xs uppercase tracking-[0.35em] text-fallen-gold">{t("ratingLabel")}</span>
            {hasData ? (
              <div className="text-display text-[10rem] md:text-[12rem] leading-none text-fallen-awp tabular-nums">
                <motion.span>{ratingTxt}</motion.span>
              </div>
            ) : (
              <p className="mt-8 text-xl text-fallen-muted">{t("noData")}</p>
            )}
          </div>
          <dl className="space-y-4">
            <Row label={t("mapsPlayed")} value={maps.toString()} />
            <Row label={t("kdRatio")} value={kd.toFixed(2)} />
            <Row label={t("kpr")} value={kpr.toFixed(2)} />
            <Row label={t("hsPercent")} value={hs.toFixed(1) + "%"} />
          </dl>
        </div>

        <div className="mt-16 overflow-x-auto">
          <table className="text-mono text-[10px] uppercase tracking-widest">
            <thead>
              <tr>
                <th className="text-fallen-muted text-left pr-3 py-1">Year \ Map</th>
                {MAPS.map((m) => (
                  <th key={m} className="text-fallen-muted font-normal px-1 py-1">{m.replace("de_", "")}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {heatRows.map((row) => (
                <tr key={row.year}>
                  <td className="text-fallen-muted pr-3 py-1">{row.year}</td>
                  {row.cells.map((c) => {
                    const r = c.rating ?? 0;
                    const intensity = r > 0 ? Math.min(1, r / 1.5) : 0;
                    return (
                      <td key={c.map}>
                        <button
                          onClick={() => { setYear(row.year); setMap(c.map as typeof MAPS[number]); }}
                          aria-label={`${row.year} ${c.map} ${r || "no data"}`}
                          style={{ background: `rgba(212,175,55,${intensity * 0.9})` }}
                          className={`block w-6 h-6 m-0.5 border ${row.year === year && c.map === map ? "border-fallen-awp" : "border-transparent"} hover:border-fallen-bone`}
                        />
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-fallen-bone/5 pb-3">
      <dt className="text-mono text-xs uppercase tracking-widest text-fallen-muted">{label}</dt>
      <dd className="text-mono text-xl tabular-nums text-fallen-bone">{value}</dd>
    </div>
  );
}
