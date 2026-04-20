"use client";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";

export function Hero({ imageUrl }: { imageUrl: string }) {
  const t = useTranslations("home");
  const name = t("displayName");

  return (
    <section className="relative min-h-[92vh] overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 1.08 }}
        animate={{ opacity: 0.75, scale: 1 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
      >
        <Image src={imageUrl} alt="FalleN" fill priority className="object-cover object-top" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-b from-fallen-void/30 via-fallen-void/40 to-fallen-void" />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-[28vh] pb-24">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-mono text-xs uppercase tracking-[0.35em] text-fallen-gold mb-6"
        >
          Gabriel Toledo · 1991 — 2026
        </motion.p>

        <h1 className="text-display text-[14vw] sm:text-[11vw] md:text-[9vw] leading-[0.88] text-fallen-bone" style={{ letterSpacing: "-0.05em" }}>
          {name.split(" ").map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 + i * 0.12, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block mr-[0.25em]"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 1 }}
          className="mt-8 max-w-xl text-lg md:text-xl text-fallen-bone/80"
        >
          {t("subhead")}
        </motion.p>
      </div>
    </section>
  );
}
