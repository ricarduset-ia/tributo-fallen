"use client";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import type { TeamsTimelineJSON } from "@/lib/types";

function parseStart(s: string): number {
  const m = s.match(/^(\d{4})/);
  return m ? Number(m[1]) : 0;
}

function eraColor(year: number) {
  if (year < 2012) return { color: "#C9A97A", name: "CS 1.6" };
  if (year < 2013) return { color: "#B0AFA8", name: "CS:Source" };
  if (year < 2023) return { color: "#F2A900", name: "CS:GO" };
  return { color: "#4CE0D2", name: "CS2" };
}

export function TeamsTimeline({ data }: { data: TeamsTimelineJSON }) {
  const t = useTranslations("trajetoria");
  const entries = data.timeline.filter((e, i, arr) => {
    if (i === 0) return true;
    const prev = arr[i - 1];
    return !(prev.team === e.team && prev.start === e.start);
  });

  return (
    <section className="py-20">
      <div className="mx-auto max-w-5xl px-6">
        <div className="relative pl-12 md:pl-20">
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 2.5, ease: "linear" }}
            style={{ originY: 0 }}
            className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-fallen-gold/40"
          />
          <ul className="space-y-10">
            {entries.map((e, i) => {
              const y = parseStart(e.start);
              const era = eraColor(y);
              return (
                <motion.li
                  key={`${e.start}-${e.team}`}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: Math.min(i * 0.03, 0.6), ease: [0.22, 1, 0.36, 1] }}
                  className="relative"
                >
                  <span
                    className="absolute -left-8 md:-left-14 top-3 w-3 h-3 rounded-full"
                    style={{ background: era.color, boxShadow: `0 0 12px ${era.color}` }}
                  />
                  <div className="flex flex-col md:flex-row md:items-baseline md:gap-6">
                    <time className="text-mono text-xs uppercase tracking-widest text-fallen-muted tabular-nums">
                      {e.start} — {e.end ?? t("present")}
                    </time>
                    <span className="text-mono text-[10px] uppercase tracking-widest" style={{ color: era.color }}>{era.name}</span>
                  </div>
                  <h3 className="mt-1 text-display text-2xl md:text-4xl text-fallen-bone">{e.team}</h3>
                  {e.role_note && (
                    <p className="mt-1 text-mono text-xs uppercase tracking-widest text-fallen-muted">{e.role_note}</p>
                  )}
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
