import { getTranslations, setRequestLocale } from "next-intl/server";
import { MOMENTS } from "@/lib/moments";
import { MomentsGrid } from "@/components/momentos/MomentsGrid";
import type { Locale } from "@/i18n";

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("momentos");

  return (
    <>
      <section className="py-24 border-b border-fallen-bone/5">
        <div className="mx-auto max-w-6xl px-6">
          <h1 className="text-display text-6xl md:text-8xl text-fallen-bone" style={{ letterSpacing: "-0.05em" }}>{t("title")}</h1>
          <p className="mt-4 text-fallen-muted text-lg">{t("subtitle")}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <p className="mb-12 text-center text-sm text-fallen-muted italic">{t("moreSoon")}</p>
          <MomentsGrid moments={MOMENTS} locale={locale as Locale} playLabel={t("playButton")} />
        </div>
      </section>
    </>
  );
}
