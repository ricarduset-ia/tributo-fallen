import { getTranslations } from "next-intl/server";
import type { PersonalAchievementsJSON } from "@/lib/types";

export async function Top20Callouts({ data }: { data: PersonalAchievementsJSON }) {
  const t = await getTranslations("conquistas");
  const items = data.personal_achievements.top_20;
  return (
    <section className="py-20">
      <div className="mx-auto max-w-5xl px-6">
        <p className="text-mono text-xs uppercase tracking-[0.35em] text-fallen-gold mb-10">{t("top20Title")}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((it) => (
            <a key={it.year} href={it.article} target="_blank" rel="noreferrer"
               className="border border-fallen-bone/10 p-8 hover:border-fallen-gold transition group">
              <p className="text-mono text-xs uppercase tracking-widest text-fallen-muted">{t("top20Year")} {it.year}</p>
              <p className="mt-2 text-display text-7xl text-fallen-gold tabular-nums">{it.placement}</p>
              <p className="mt-4 text-sm text-fallen-muted group-hover:text-fallen-bone">{t("readArticle")} →</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
