import { getTranslations } from "next-intl/server";
import type { PersonalAchievementsJSON } from "@/lib/types";

export async function MVPEVPLists({ data }: { data: PersonalAchievementsJSON }) {
  const t = await getTranslations("conquistas");
  const pa = data.personal_achievements;
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-6 grid grid-cols-1 md:grid-cols-2 gap-14">
        <div>
          <p className="text-mono text-xs uppercase tracking-[0.35em] text-fallen-gold mb-6">{t("mvpTitle")}</p>
          <ul className="space-y-2 text-fallen-bone/90">
            {pa.mvp_winner.map((title) => <li key={title} className="border-b border-fallen-bone/5 py-2">{title}</li>)}
          </ul>
        </div>
        <div>
          <p className="text-mono text-xs uppercase tracking-[0.35em] text-fallen-awp mb-1">{t("evpTitle")}</p>
          <p className="text-mono text-xs text-fallen-muted mb-6">{t("evpDesc")}</p>
          <div className="flex flex-wrap gap-2">
            {pa.evp_at.map((title) => (
              <span key={title} className="text-xs text-fallen-muted border border-fallen-bone/10 px-3 py-1">{title}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
