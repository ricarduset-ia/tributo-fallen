"use client";
import { useEffect, useRef, useState } from "react";
import { animate, useInView, useMotionValue, useTransform, motion } from "framer-motion";
import { CAREER_START_DATE, daysBetween } from "@/lib/dates";

type Accent = "gold" | "ct" | "awp";

const accentClass = (a: Accent) =>
  a === "gold" ? "text-fallen-gold" : a === "ct" ? "text-fallen-ct" : "text-fallen-awp";

function formatNumber(n: number, currency?: "usd") {
  if (currency === "usd") {
    return "$" + new Intl.NumberFormat("en-US").format(Math.round(n));
  }
  return new Intl.NumberFormat("pt-BR").format(Math.round(n));
}

/** Generic counter card: animates 0 → numeric value (or shows value as-is if non-numeric). */
export function StatCard({
  value, label, note, accent = "gold",
}: { value: string; label: string; note?: string; accent?: Accent }) {
  const hasDollar = value.startsWith("$");
  const numeric = Number(value.replace(/[^\d.]/g, ""));
  const isNumeric = !Number.isNaN(numeric) && numeric > 0;
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => formatNumber(v, hasDollar ? "usd" : undefined));

  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    if (!inView || !isNumeric) return;
    const controls = animate(mv, numeric, { duration: 1.8, ease: [0.22, 1, 0.36, 1] });
    return controls.stop;
  }, [inView, numeric, isNumeric, mv]);

  return (
    <Card ref={ref} className={accentClass(accent)}>
      <div className="text-display text-4xl md:text-6xl leading-[0.95] tabular-nums break-all md:break-normal">
        {isNumeric ? <motion.span>{rounded}</motion.span> : value}
      </div>
      <p className="mt-5 text-mono text-[11px] uppercase tracking-[0.3em] text-fallen-bone">{label}</p>
      {note && <p className="mt-3 text-sm text-fallen-muted">{note}</p>}
    </Card>
  );
}

/**
 * Specialized card: animates from a fixed baseline (e.g. 8508 on 2026-04-17)
 * up to the CURRENT days played, computed live against CAREER_START_DATE.
 */
export function DaysPlayingCard({
  baselineValue, label, note, accent = "gold",
}: { baselineValue: number; label: string; note?: string; accent?: Accent }) {
  const [displayed, setDisplayed] = useState(baselineValue);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    if (!inView) return;
    const target = daysBetween(new Date(), CAREER_START_DATE);
    const holdMs = 700;
    const animMs = 1800;

    const holdTimer = setTimeout(() => {
      const t0 = performance.now();
      let raf = 0;
      const step = (t: number) => {
        const p = Math.min(1, (t - t0) / animMs);
        const eased = 1 - Math.pow(1 - p, 3);
        const v = Math.round(baselineValue + (target - baselineValue) * eased);
        setDisplayed(v);
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
      cleanup = () => cancelAnimationFrame(raf);
    }, holdMs);

    let cleanup = () => {};
    return () => { clearTimeout(holdTimer); cleanup(); };
  }, [inView, baselineValue]);

  return (
    <Card ref={ref} className={accentClass(accent)}>
      <div className="text-display text-4xl md:text-6xl leading-[0.95] tabular-nums">
        {formatNumber(displayed)}
      </div>
      <p className="mt-5 text-mono text-[11px] uppercase tracking-[0.3em] text-fallen-bone">{label}</p>
      {note && <p className="mt-3 text-sm text-fallen-muted">{note}</p>}
    </Card>
  );
}

function Card({
  ref, children, className = "",
}: { ref?: React.Ref<HTMLDivElement>; children: React.ReactNode; className?: string }) {
  return (
    <div
      ref={ref}
      className={`h-full min-h-[260px] flex flex-col justify-center items-center text-center border border-fallen-bone/10 bg-fallen-ink/40 px-6 md:px-8 py-10 ${className}`}
    >
      {children}
    </div>
  );
}
