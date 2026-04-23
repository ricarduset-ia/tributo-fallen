import Link from "next/link";
import { Hero } from "@/components/home/Hero";
import { StatCard, DaysPlayingCard } from "@/components/home/StatCard";
import { RevealOnScroll } from "@/components/site/RevealOnScroll";
import { NextCountdown } from "@/components/campeonatos/NextCountdown";
import { getTranslations, setRequestLocale } from "next-intl/server";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");

  return (
    <>
      <Hero imageUrl="/images/fallen-hero.jpg" />

      <section className="py-20 border-t border-fallen-bone/5">
        <div className="mx-auto max-w-5xl px-6">
          <p className="text-mono text-xs uppercase tracking-[0.35em] text-fallen-gold mb-6 text-center">{t("retirementSpeech")}</p>
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            <iframe
              className="absolute inset-0 w-full h-full border border-fallen-bone/10"
              src="https://www.youtube.com/embed/CZ8gWC2aWeE"
              title="Discurso de aposentadoria de FalleN"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
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
    </>
  );
}
