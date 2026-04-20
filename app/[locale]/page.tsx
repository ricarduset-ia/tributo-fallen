import { getProfile, getWeapons } from "@/lib/data";
import { Hero } from "@/components/home/Hero";
import { Countdown } from "@/components/home/Countdown";
import { StatCard } from "@/components/home/StatCard";
import { AWPHighlight } from "@/components/home/AWPHighlight";
import { Milestones } from "@/components/home/Milestones";
import { CTARow } from "@/components/home/CTARow";
import { RevealOnScroll } from "@/components/site/RevealOnScroll";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const profile = await getProfile();
  const weapons = await getWeapons();
  const awp = weapons.weapons.find((w) => w.weapon === "awp")?.kills ?? 0;
  const ak = weapons.weapons.find((w) => w.weapon === "ak47")?.kills ?? 0;

  return (
    <>
      <Hero imageUrl={profile.image_url} />
      <Countdown />
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-mono text-xs uppercase tracking-[0.35em] text-fallen-gold mb-10">{t("journeyTitle")}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <RevealOnScroll delay={0.0}><StatCard value={t("journeyStat1Value")} label={t("journeyStat1Label")} note={t("journeyStat1Note")} accent="gold" /></RevealOnScroll>
            <RevealOnScroll delay={0.15}><StatCard value={t("journeyStat2Value")} label={t("journeyStat2Label")} note={t("journeyStat2Note")} accent="gold" /></RevealOnScroll>
            <RevealOnScroll delay={0.3}><StatCard value={t("journeyStat3Value")} label={t("journeyStat3Label")} note={t("journeyStat3Note")} accent="gold" /></RevealOnScroll>
          </div>
        </div>
      </section>
      <AWPHighlight awpKills={awp} ak47Kills={ak} />
      <Milestones />
      <CTARow />
    </>
  );
}
