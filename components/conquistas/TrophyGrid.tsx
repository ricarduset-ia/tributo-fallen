"use client";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import type { TrophiesJSON } from "@/lib/types";

const TEAM_GROUPS = [
  {
    team: "Luminosity Gaming",
    period: "2016",
    titles: [
      { name: "MLG Columbus 2016", isMajor: true },
      { name: "DreamHack Austin 2016", isMajor: false },
    ],
  },
  {
    team: "SK Gaming",
    period: "2016 – 2018",
    titles: [
      { name: "ESL One Cologne 2016", isMajor: true },
      { name: "ESL Pro League Season 3 Finals", isMajor: false },
      { name: "cs_summit Spring 2017", isMajor: false },
      { name: "IEM Sydney 2017", isMajor: false },
      { name: "DreamHack Open Summer 2017", isMajor: false },
      { name: "ECS Season 3 Finals", isMajor: false },
      { name: "ESL One Cologne 2017", isMajor: false },
      { name: "EPICENTER 2017", isMajor: false },
      { name: "BLAST Pro Series Copenhagen 2017", isMajor: false },
      { name: "ESL Pro League Season 6 Finals", isMajor: false },
    ],
  },
  {
    team: "MIBR",
    period: "2018 – 2020",
    titles: [
      { name: "ZOTAC Cup Masters 2018 Grand Finals", isMajor: false },
    ],
  },
  {
    team: "FURIA",
    period: "2023 – presente",
    titles: [
      { name: "Elisa Masters Espoo 2023", isMajor: false },
      { name: "BLAST Rivals 2025 Season 2", isMajor: false },
      { name: "IEM Chengdu 2025", isMajor: false },
      { name: "Thunderpick World Championship 2025", isMajor: false },
      { name: "FISSURE Playground 2", isMajor: false },
    ],
  },
];

export function TrophyGrid({ data }: { data: TrophiesJSON }) {
  const t = useTranslations("conquistas");

  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex items-baseline justify-between mb-10">
          <p className="text-mono text-xs uppercase tracking-[0.35em] text-fallen-gold">
            {t("trophiesTitle")}
          </p>
          <span className="text-mono text-xs text-fallen-muted tabular-nums">
            {data.trophy_count} títulos
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TEAM_GROUPS.map((group, gi) => (
            <motion.div
              key={group.team}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: gi * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="border border-fallen-bone/10 p-6"
            >
              <div className="flex items-baseline justify-between mb-5">
                <h3 className="text-display text-xl text-fallen-bone">{group.team}</h3>
                <span className="text-mono text-xs text-fallen-muted">{group.period}</span>
              </div>

              <ul className="space-y-2">
                {group.titles.map((title) => (
                  <li
                    key={title.name}
                    className={`flex items-center justify-between gap-3 py-2 border-b last:border-b-0 ${
                      title.isMajor ? "border-fallen-gold/20" : "border-fallen-bone/5"
                    }`}
                  >
                    <span className={`text-sm ${title.isMajor ? "text-fallen-gold font-medium" : "text-fallen-bone/80"}`}>
                      {title.name}
                    </span>
                    {title.isMajor && (
                      <span className="flex-shrink-0 text-mono text-[10px] uppercase tracking-widest border border-fallen-gold/50 text-fallen-gold px-2 py-0.5">
                        Major
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
