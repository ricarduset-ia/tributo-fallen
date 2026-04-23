import { getTrophies, getPersonalAchievements } from "@/lib/data";
import { MajorCards } from "@/components/conquistas/MajorCards";
import { TrophyGrid } from "@/components/conquistas/TrophyGrid";
import { HistoricalTrophies } from "@/components/conquistas/HistoricalTrophies";
import { MVPEVPLists } from "@/components/conquistas/MVPEVPLists";
import { Top20Callouts } from "@/components/conquistas/Top20Callouts";
import { RevealOnScroll } from "@/components/site/RevealOnScroll";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n";

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("conquistas");
  const [trophies, pa] = await Promise.all([getTrophies(), getPersonalAchievements()]);

  return (
    <>
      <section className="py-24 border-b border-fallen-bone/5">
        <div className="mx-auto max-w-6xl px-6">
          <h1 className="text-display text-6xl md:text-8xl text-fallen-bone" style={{ letterSpacing: "-0.05em" }}>{t("title")}</h1>
          <p className="mt-4 text-fallen-muted text-lg">{t("subtitle")}</p>
        </div>
      </section>
      <MajorCards />
      <RevealOnScroll><Top20Callouts data={pa} /></RevealOnScroll>
      <RevealOnScroll><TrophyGrid data={trophies} /></RevealOnScroll>
      <RevealOnScroll><HistoricalTrophies /></RevealOnScroll>
      <RevealOnScroll><MVPEVPLists data={pa} /></RevealOnScroll>
    </>
  );
}
