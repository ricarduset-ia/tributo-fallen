"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { diffToParts, type DurationParts } from "@/lib/dates";

const TOURNAMENTS = [
  { name: "BLAST Rivals 2026 Season 1",         dates: "29 abr — 3 mai",   start: new Date("2026-04-29T00:00:00-03:00") },
  { name: "PGL Astana",                          dates: "9 — 17 mai",       start: new Date("2026-05-09T00:00:00-03:00") },
  { name: "IEM Cologne Major 2026",              dates: "11 — 21 jun",      start: new Date("2026-06-11T00:00:00-03:00") },
  { name: "BLAST Bounty Season 2",               dates: "20 jun — 2 ago",   start: new Date("2026-06-20T00:00:00-03:00") },
  { name: "Esports World Cup 2026",              dates: "12 — 23 ago",      start: new Date("2026-08-12T00:00:00-03:00") },
  { name: "BLAST Open Porto",                    dates: "24 ago — 6 set",   start: new Date("2026-08-24T00:00:00-03:00") },
  { name: "FISSURE Playground 3",                dates: "7 — 13 set",       start: new Date("2026-09-07T00:00:00-03:00") },
  { name: "StarLadder StarSeries",               dates: "17 — 20 set",      start: new Date("2026-09-17T00:00:00-03:00") },
  { name: "ESL Pro League Season 24",            dates: "13 out — 11 nov",  start: new Date("2026-10-13T00:00:00-03:00") },
  { name: "Thunderpick World Championship 2026", dates: "14 — 18 out",      start: new Date("2026-10-14T00:00:00-03:00") },
  { name: "PGL Masters Bucharest 2026",          dates: "24 — 31 out",      start: new Date("2026-10-24T00:00:00-03:00") },
  { name: "IEM China 2026",                      dates: "2 — 8 nov",        start: new Date("2026-11-02T00:00:00-03:00") },
  { name: "BLAST Rivals 2026 Season 2",          dates: "9 — 15 nov",       start: new Date("2026-11-09T00:00:00-03:00") },
  { name: "PGL Singapore Major 2026",            dates: "24 nov — 13 dez",  start: new Date("2026-11-24T00:00:00-03:00") },
];

function getNext() {
  const now = Date.now();
  return TOURNAMENTS.find((t) => t.start.getTime() > now) ?? null;
}

const INITIAL: DurationParts = { days: 6, hours: 0, minutes: 0, seconds: 0 };

export function NextCountdown() {
  const t = useTranslations("campeonatos");
  const [parts, setParts] = useState<DurationParts>(INITIAL);
  const [next, setNext] = useState<typeof TOURNAMENTS[0] | null>(null);

  useEffect(() => {
    const found = getNext();
    setNext(found);
    if (!found) return;

    const target = diffToParts(found.start);
    const animMs = 1800;
    const start = performance.now();
    let raf = 0;

    const step = (now: number) => {
      const p = Math.min(1, (now - start) / animMs);
      const eased = 1 - Math.pow(1 - p, 3);
      const subP = p < 0.65 ? 0 : (p - 0.65) / 0.35;
      const subEased = 1 - Math.pow(1 - subP, 2);

      setParts({
        days: Math.round(INITIAL.days + (target.days - INITIAL.days) * eased),
        hours: Math.round(target.hours * subEased),
        minutes: Math.round(target.minutes * subEased),
        seconds: Math.round(target.seconds * subEased),
      });

      if (p < 1) {
        raf = requestAnimationFrame(step);
      } else {
        const id = setInterval(() => {
          const n = getNext();
          setNext(n);
          if (n) setParts(diffToParts(n.start));
        }, 1000);
        cleanup = () => clearInterval(id);
      }
    };

    raf = requestAnimationFrame(step);
    let cleanup = () => cancelAnimationFrame(raf);
    return () => cleanup();
  }, []);

  if (!next) return null;

  const cells = [
    { v: parts.days,    label: t("daysLabel") },
    { v: parts.hours,   label: t("hoursLabel") },
    { v: parts.minutes, label: t("minutesLabel") },
    { v: parts.seconds, label: t("secondsLabel") },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center py-20"
    >
      <p className="text-mono text-xs uppercase tracking-[0.35em] text-fallen-gold mb-2">
        {t("nextLabel")}
      </p>
      <p className="text-mono text-sm text-fallen-bone/70 mb-10">{next.name}</p>
      <div className="grid grid-cols-4 gap-4 md:gap-10 max-w-3xl mx-auto">
        {cells.map((c, i) => (
          <div key={i} className="flex flex-col items-center">
            <span className="text-mono text-5xl md:text-7xl font-light text-fallen-bone tabular-nums">
              {String(c.v).padStart(2, "0")}
            </span>
            <span className="mt-3 text-mono text-[10px] md:text-xs uppercase tracking-[0.3em] text-fallen-gold">
              {c.label}
            </span>
          </div>
        ))}
      </div>
      <p className="mt-8 text-mono text-xs text-fallen-muted/70 tracking-widest uppercase">
        {next.dates}
      </p>
    </motion.div>
  );
}
