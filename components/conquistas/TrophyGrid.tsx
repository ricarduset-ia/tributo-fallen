"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import type { TrophiesJSON } from "@/lib/types";

export function TrophyGrid({ data }: { data: TrophiesJSON }) {
  const t = useTranslations("conquistas");
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-mono text-xs uppercase tracking-[0.35em] text-fallen-gold mb-10">{t("trophiesTitle")}</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data.trophies.map((tr, i) => {
            const cleanImg = tr.tournament_img_url.replace(/^https:\/\/www\.hltv\.orghttps:\/\//, "https://");
            return (
              <motion.a
                key={tr.tournament_id ?? i}
                href={tr.tournament_url}
                target="_blank" rel="noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: (i % 8) * 0.08 }}
                className="group border border-fallen-bone/10 p-4 hover:border-fallen-gold transition"
              >
                <div className="relative aspect-square mb-3">
                  <Image src={cleanImg} alt={tr.tournament_name} fill className="object-contain" sizes="200px" />
                </div>
                <p className="text-sm text-fallen-bone/90 group-hover:text-fallen-gold transition line-clamp-2">{tr.tournament_name}</p>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
