"use client";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export function MajorCards() {
  const t = useTranslations("conquistas");
  const majors = [
    { title: t("major2016aTitle"), team: t("major2016aTeam"), date: t("major2016aDate") },
    { title: t("major2016bTitle"), team: t("major2016bTeam"), date: t("major2016bDate") },
  ];
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-mono text-xs uppercase tracking-[0.35em] text-fallen-gold mb-10">{t("majorsTitle")}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {majors.map((m, i) => (
            <motion.div
              key={m.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, delay: i * 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="group relative border border-fallen-gold/30 p-10 bg-gradient-to-br from-fallen-ink/60 to-fallen-void hover:border-fallen-gold transition"
            >
              <p className="text-mono text-xs uppercase tracking-[0.35em] text-fallen-gold mb-4">MAJOR</p>
              <h3 className="text-display text-3xl md:text-5xl text-fallen-bone leading-tight">{m.title}</h3>
              <p className="mt-6 text-fallen-bone/80">{m.team}</p>
              <p className="mt-1 text-mono text-xs uppercase tracking-widest text-fallen-muted">{m.date}</p>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition pointer-events-none" style={{ boxShadow: "inset 0 0 80px rgba(212,175,55,0.25)" }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
