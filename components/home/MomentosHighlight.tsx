import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { MOMENTS } from "@/lib/moments";
import { MomentsGrid } from "@/components/momentos/MomentsGrid";
import type { Locale } from "@/i18n";

export async function MomentosHighlight({ locale }: { locale: Locale }) {
  const t = await getTranslations("home");
  const tm = await getTranslations("momentos");
  const featured = MOMENTS.filter((m) => m.featured);

  return (
    <section className="py-24 border-t border-fallen-bone/5">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex items-end justify-between mb-10">
          <p className="text-mono text-xs uppercase tracking-[0.35em] text-fallen-gold">{t("momentosTitle")}</p>
          <Link
            href={`/${locale}/momentos`}
            className="text-mono text-xs uppercase tracking-[0.3em] text-fallen-muted hover:text-fallen-gold transition"
          >
            {t("momentosLink")}
          </Link>
        </div>
        <MomentsGrid moments={featured} locale={locale} playLabel={tm("playButton")} />
      </div>
    </section>
  );
}
