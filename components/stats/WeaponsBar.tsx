"use client";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import type { WeaponsJSON } from "@/lib/types";

export function WeaponsBar({ data }: { data: WeaponsJSON }) {
  const t = useTranslations("stats");
  const top = data.weapons.slice(0, 10);
  const max = top[0].kills;

  return (
    <section className="py-20">
      <div className="mx-auto max-w-4xl px-6">
        <p className="text-mono text-xs uppercase tracking-[0.35em] text-fallen-awp mb-2">{t("weaponsTitle")}</p>
        <p className="text-fallen-muted mb-10">{t("weaponsSubtitle")}</p>
        <ul className="space-y-3">
          {top.map((w, i) => {
            const pct = (w.kills / max) * 100;
            const isAwp = w.weapon === "awp";
            return (
              <li key={w.weapon}>
                <div className="flex justify-between text-mono text-xs uppercase tracking-widest mb-1">
                  <span className={isAwp ? "text-fallen-awp" : "text-fallen-bone/70"}>
                    {String(i + 1).padStart(2, "0")} · {w.weapon}
                  </span>
                  <span className="tabular-nums text-fallen-bone/80">{w.kills.toLocaleString("pt-BR")}</span>
                </div>
                <div className="h-2 w-full bg-fallen-bone/5">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: pct / 100 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 1.1, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                    style={{ originX: 0 }}
                    className={`h-full ${isAwp ? "bg-fallen-awp" : "bg-fallen-gold/60"}`}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
