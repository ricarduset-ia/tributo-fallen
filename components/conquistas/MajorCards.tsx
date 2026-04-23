"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const MAJORS = [
  {
    number: "I",
    titleKey: "major2016aTitle",
    teamKey: "major2016aTeam",
    dateKey: "major2016aDate",
    image: "/images/mlg-columbus.jpg",
  },
  {
    number: "II",
    titleKey: "major2016bTitle",
    teamKey: "major2016bTeam",
    dateKey: "major2016bDate",
    image: "/images/esl-cologne-major.jpg",
  },
] as const;

export function MajorCards() {
  const t = useTranslations("conquistas");

  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-mono text-xs uppercase tracking-[0.35em] text-fallen-gold mb-10">
          {t("majorsTitle")}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MAJORS.map((m, i) => (
            <motion.div
              key={m.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, delay: i * 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="group relative overflow-hidden border border-fallen-gold/30 hover:border-fallen-gold transition-colors min-h-[520px] flex flex-col justify-end"
            >
              <Image
                src={m.image}
                alt={t(m.titleKey)}
                fill
                className="object-cover object-top transition duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/65 to-transparent" />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ boxShadow: "inset 0 0 120px rgba(212,175,55,0.18)" }}
              />

              <div className="relative z-10 p-8 md:p-10">
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-mono text-xs uppercase tracking-[0.35em] text-fallen-gold">
                    Major {m.number}
                  </span>
                  <span className="flex-1 h-px bg-fallen-gold/30" />
                  <span className="text-mono text-xs uppercase tracking-widest text-fallen-gold">
                    {t(m.dateKey)}
                  </span>
                </div>
                <h3 className="text-display text-4xl md:text-6xl text-fallen-bone leading-none">
                  {t(m.titleKey)}
                </h3>
                <p className="mt-4 text-fallen-bone/70 text-lg">{t(m.teamKey)}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
