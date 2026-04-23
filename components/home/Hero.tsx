"use client";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import dynamic from "next/dynamic";
import { RETIREMENT_DATE, diffToParts, type DurationParts } from "@/lib/dates";

// Client-only — WebGL requires browser APIs
const LightRays = dynamic(() => import("@/components/effects/LightRays"), { ssr: false });

const INITIAL: DurationParts = { days: 247, hours: 0, minutes: 0, seconds: 0 };

function BigCountdown() {
  const t = useTranslations("home");
  // Start with a stable, SSR-safe value. Hydration matches. Animation happens in effect.
  const [parts, setParts] = useState<DurationParts>(INITIAL);

  useEffect(() => {
    // Stage 1: hold the initial "247 00 00 00" for a beat so the user sees it.
    // Stage 2: animate smoothly down to the real remaining time over ~2.4s.
    // Stage 3: hand off to a 1Hz ticker.
    const target = diffToParts(RETIREMENT_DATE);
    const holdMs = 700;
    const animMs = 2400;

    const holdTimer = setTimeout(() => {
      const start = performance.now();
      let raf = 0;
      const step = (now: number) => {
        const p = Math.min(1, (now - start) / animMs);
        const eased = 1 - Math.pow(1 - p, 3); // ease-out cubic

        // Days: interpolate 247 → target.days
        const days = Math.round(INITIAL.days + (target.days - INITIAL.days) * eased);

        // Hours/min/sec: only start revealing in the last 35% so the days ticker reads clearly first
        const subP = p < 0.65 ? 0 : (p - 0.65) / 0.35;
        const subEased = 1 - Math.pow(1 - subP, 2);

        setParts({
          days,
          hours: Math.round(target.hours * subEased),
          minutes: Math.round(target.minutes * subEased),
          seconds: Math.round(target.seconds * subEased),
        });

        if (p < 1) {
          raf = requestAnimationFrame(step);
        } else {
          // Hand off to the live ticker
          const id = setInterval(() => setParts(diffToParts(RETIREMENT_DATE)), 1000);
          cleanup = () => clearInterval(id);
        }
      };
      raf = requestAnimationFrame(step);
      cleanup = () => cancelAnimationFrame(raf);
    }, holdMs);

    let cleanup = () => {};
    return () => {
      clearTimeout(holdTimer);
      cleanup();
    };
  }, []);

  const cells = [
    { v: parts.days, label: t("daysLabel") },
    { v: parts.hours, label: t("hoursLabel") },
    { v: parts.minutes, label: t("minutesLabel") },
    { v: parts.seconds, label: t("secondsLabel") },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center"
    >
      <p className="text-mono text-xs uppercase tracking-[0.35em] text-fallen-gold mb-8">
        {t("countdownLabel")}
      </p>
      <div className="grid grid-cols-4 gap-4 md:gap-10 max-w-4xl mx-auto">
        {cells.map((c, i) => (
          <div key={i} className="flex flex-col items-center">
            <span className="text-mono text-5xl md:text-8xl font-light text-fallen-bone tabular-nums">
              {String(c.v).padStart(2, "0")}
            </span>
            <span className="mt-3 text-mono text-[10px] md:text-xs uppercase tracking-[0.3em] text-fallen-gold">
              {c.label}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export function Hero({ imageUrl }: { imageUrl: string }) {
  const t = useTranslations("home");
  const name = t("displayName");

  return (
    <section className="relative min-h-screen overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 1.08 }}
        animate={{ opacity: 0.55, scale: 1 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
      >
        <Image src={imageUrl} alt="FalleN" fill priority className="object-cover object-top" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-b from-fallen-void/50 via-fallen-void/50 to-fallen-void" />
      </motion.div>

      {/* Golden light rays pouring over FalleN */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.2, delay: 0.6 }}
        className="absolute inset-0 z-[5] pointer-events-none"
        style={{ mixBlendMode: "screen" }}
      >
        <LightRays
          raysOrigin="top-center"
          raysColor="#F2C14E"
          raysSpeed={0.9}
          lightSpread={0.75}
          rayLength={1.5}
          pulsating
          fadeDistance={1.3}
          saturation={1.1}
          followMouse
          mouseInfluence={0.08}
          noiseAmount={0.05}
          distortion={0.03}
        />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-24 pb-20">
        <BigCountdown />

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="mt-20 text-mono text-xs uppercase tracking-[0.35em] text-fallen-gold mb-6"
        >
          Gabriel Toledo · 1991 — 2026
        </motion.p>

        <h1 className="text-display text-[14vw] sm:text-[11vw] md:text-[9vw] leading-[0.88] text-fallen-bone" style={{ letterSpacing: "-0.05em" }}>
          {name.split(" ").map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8 + i * 0.12, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block mr-[0.25em]"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.4, duration: 1 }}
          className="mt-8 max-w-xl text-lg md:text-xl text-fallen-bone/80"
        >
          {t("subhead")}
        </motion.p>
      </div>
    </section>
  );
}
