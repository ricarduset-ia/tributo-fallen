import { NextCountdown } from "@/components/campeonatos/NextCountdown";
import { TournamentList } from "@/components/campeonatos/TournamentList";
import { RevealOnScroll } from "@/components/site/RevealOnScroll";
import { getTranslations, setRequestLocale } from "next-intl/server";

export default async function CampeonatosPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("campeonatos");

  const todayISO = new Date().toISOString().slice(0, 10);

  return (
    <>
      <section className="py-24 border-b border-fallen-bone/5">
        <div className="mx-auto max-w-6xl px-6">
          <h1 className="text-display text-6xl md:text-8xl text-fallen-bone" style={{ letterSpacing: "-0.05em" }}>
            {t("title")}
          </h1>
          <p className="mt-4 text-fallen-muted text-lg">{t("subtitle")}</p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6">
        <NextCountdown />
      </div>

      <div className="border-t border-fallen-bone/5" />

      <RevealOnScroll>
        <TournamentList todayISO={todayISO} />
      </RevealOnScroll>
    </>
  );
}
