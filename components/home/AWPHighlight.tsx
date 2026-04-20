"use client";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export function AWPHighlight({ awpKills, ak47Kills }: { awpKills: number; ak47Kills: number }) {
  const t = useTranslations("home");
  const ratio = ak47Kills / awpKills;

  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-mono text-xs uppercase tracking-[0.35em] text-fallen-awp mb-3">{t("awpTitle")}</p>
        <h2 className="text-display text-4xl md:text-6xl max-w-3xl text-fallen-bone">{t("awpCopy")}</h2>
        <div className="mt-14 space-y-5">
          <div>
            <div className="flex justify-between text-mono text-xs uppercase tracking-widest mb-2">
              <span className="text-fallen-awp">{t("awpRank1")}</span>
              <span className="tabular-nums text-fallen-bone">{awpKills.toLocaleString("pt-BR")}</span>
            </div>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
              style={{ originX: 0 }}
              className="h-3 bg-fallen-awp"
            />
          </div>
          <div>
            <div className="flex justify-between text-mono text-xs uppercase tracking-widest mb-2">
              <span className="text-fallen-muted">{t("awpRank2")}</span>
              <span className="tabular-nums text-fallen-muted">{ak47Kills.toLocaleString("pt-BR")}</span>
            </div>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: ratio }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              style={{ originX: 0 }}
              className="h-3 bg-fallen-muted/70"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
