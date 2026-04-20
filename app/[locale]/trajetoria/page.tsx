import { getTeamsTimeline } from "@/lib/data";
import { TeamsTimeline } from "@/components/trajetoria/TeamsTimeline";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n";

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("trajetoria");
  const timeline = await getTeamsTimeline();

  return (
    <>
      <section className="py-24 border-b border-fallen-bone/5">
        <div className="mx-auto max-w-6xl px-6">
          <h1 className="text-display text-6xl md:text-8xl text-fallen-bone" style={{ letterSpacing: "-0.05em" }}>{t("title")}</h1>
          <p className="mt-4 text-fallen-muted text-lg">{t("subtitle")}</p>
        </div>
      </section>
      <TeamsTimeline data={timeline} />
    </>
  );
}
