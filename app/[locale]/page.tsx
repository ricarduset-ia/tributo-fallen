import Link from "next/link";
import { Hero } from "@/components/home/Hero";
import { StatCard, DaysPlayingCard } from "@/components/home/StatCard";
import { RevealOnScroll } from "@/components/site/RevealOnScroll";
import { NextCountdown } from "@/components/campeonatos/NextCountdown";
import { MomentosHighlight } from "@/components/home/MomentosHighlight";
import { YouTubePlayer } from "@/components/site/YouTubePlayer";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const tm = await getTranslations("momentos");

  return (
    <>
      <Hero imageUrl="/images/fallen-hero.jpg" />

      <section className="py-24 border-t border-fallen-bone/5">
        <div className="mx-auto max-w-4xl px-6">
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="h-px w-12 bg-fallen-gold/40" aria-hidden="true" />
            <p className="text-mono text-xs uppercase tracking-[0.35em] text-fallen-gold">{t("retirementSpeech")}</p>
            <span className="h-px w-12 bg-fallen-gold/40" aria-hidden="true" />
          </div>
          <div className="p-[3px] bg-gradient-to-b from-fallen-gold/70 via-fallen-gold/40 to-fallen-gold/70 shadow-[0_0_120px_-20px_rgba(228,180,82,0.45)]">
            <YouTubePlayer
              videoId="CZ8gWC2aWeE"
              title={t("retirementSpeech")}
              playLabel={tm("playButton")}
              thumbnail="/images/fallen-discurso-final.jpg"
              accent
            />
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-mono text-xs uppercase tracking-[0.35em] text-fallen-gold mb-10">{t("journeyTitle")}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <RevealOnScroll delay={0.0}><DaysPlayingCard baselineValue={8508} label={t("journeyStat1Label")} note={t("journeyStat1Note")} accent="gold" /></RevealOnScroll>
            <RevealOnScroll delay={0.15}><StatCard value={t("journeyStat2Value")} label={t("journeyStat2Label")} note={t("journeyStat2Note")} accent="gold" /></RevealOnScroll>
            <RevealOnScroll delay={0.3}><StatCard value={t("journeyStat3Value")} label={t("journeyStat3Label")} note={t("journeyStat3Note")} accent="gold" /></RevealOnScroll>
          </div>
        </div>
      </section>

      <section className="border-t border-fallen-bone/5">
        <div className="mx-auto max-w-4xl px-6">
          <NextCountdown />
          <div className="flex justify-center pb-16 -mt-6">
            <Link
              href={`/${locale}/campeonatos`}
              className="text-mono text-xs uppercase tracking-[0.35em] text-fallen-gold border border-fallen-gold/40 px-6 py-3 hover:bg-fallen-gold/5 transition"
            >
              {t("ctaCampeonatos")}
            </Link>
          </div>
        </div>
      </section>

      <MomentosHighlight locale={locale as Locale} />
    </>
  );
}
