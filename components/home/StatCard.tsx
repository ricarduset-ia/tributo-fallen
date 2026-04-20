"use client";
import { animate, useInView, useMotionValue, useTransform, motion } from "framer-motion";
import { useEffect, useRef } from "react";

export function StatCard({
  value, label, note, accent = "gold",
}: { value: string; label: string; note?: string; accent?: "gold" | "ct" | "awp" }) {
  const hasDollar = value.startsWith("$");
  const numeric = Number(value.replace(/[^\d.]/g, ""));
  const isNumeric = !Number.isNaN(numeric) && numeric > 0;
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => {
    const fmt = new Intl.NumberFormat("pt-BR").format(Math.round(v));
    return (hasDollar ? "$" : "") + fmt;
  });

  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!inView || !isNumeric) return;
    const controls = animate(mv, numeric, { duration: 1.8, ease: [0.22, 1, 0.36, 1] });
    return controls.stop;
  }, [inView, numeric, isNumeric, mv]);

  const accentColor = accent === "gold" ? "text-fallen-gold" : accent === "ct" ? "text-fallen-ct" : "text-fallen-awp";

  return (
    <div ref={ref} className="border border-fallen-bone/10 bg-fallen-ink/40 p-8 md:p-10 text-center">
      <div className={`text-display text-5xl md:text-7xl leading-none ${accentColor} tabular-nums`}>
        {isNumeric ? <motion.span>{rounded}</motion.span> : value}
      </div>
      <p className="mt-4 text-mono text-[11px] uppercase tracking-[0.3em] text-fallen-bone">{label}</p>
      {note && <p className="mt-3 text-sm text-fallen-muted">{note}</p>}
    </div>
  );
}
