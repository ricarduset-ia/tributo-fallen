import { getYearMap, getPerYear, getWeapons, getStatsSides } from "@/lib/data";
import { YearMapFilter } from "@/components/stats/YearMapFilter";
import { RatingTrendChart } from "@/components/stats/RatingTrendChart";
import { WeaponsBar } from "@/components/stats/WeaponsBar";
import { SidesRadar } from "@/components/stats/SidesRadar";
import { RevealOnScroll } from "@/components/site/RevealOnScroll";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n";

export default async function StatsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("stats");
  const [ym, py, w, s] = await Promise.all([
    getYearMap(), getPerYear(), getWeapons(), getStatsSides(),
  ]);

  return (
    <>
      <section className="py-24 border-b border-fallen-bone/5">
        <div className="mx-auto max-w-6xl px-6">
          <h1 className="text-display text-6xl md:text-8xl text-fallen-bone" style={{ letterSpacing: "-0.05em" }}>{t("title")}</h1>
          <p className="mt-4 text-fallen-muted text-lg">{t("subtitle")}</p>
        </div>
      </section>
      <RevealOnScroll><YearMapFilter data={ym} /></RevealOnScroll>
      <RevealOnScroll><RatingTrendChart data={py} /></RevealOnScroll>
      <RevealOnScroll><WeaponsBar data={w} /></RevealOnScroll>
      <RevealOnScroll><SidesRadar data={s} /></RevealOnScroll>
    </>
  );
}
