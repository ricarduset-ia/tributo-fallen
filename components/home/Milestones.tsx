"use client";
import { useTranslations } from "next-intl";
import { RevealOnScroll } from "@/components/site/RevealOnScroll";

export function Milestones() {
  const t = useTranslations("home");
  const items = [
    { year: "2002", text: t("milestone2002") },
    { year: "2007", text: t("milestone2007") },
    { year: "2016", text: t("milestone2016") },
    { year: "2023", text: t("milestone2023") },
    { year: "2026", text: t("milestone2026") },
  ];
  return (
    <section className="py-24">
      <div className="mx-auto max-w-5xl px-6">
        <p className="text-mono text-xs uppercase tracking-[0.35em] text-fallen-gold mb-10">{t("milestonesTitle")}</p>
        <ol className="space-y-6">
          {items.map((it, i) => (
            <RevealOnScroll key={it.year} delay={i * 0.08}>
              <li className="flex items-baseline gap-8 border-b border-fallen-bone/5 pb-5">
                <span className="text-mono text-fallen-gold w-16 tabular-nums">{it.year}</span>
                <span className="text-lg md:text-2xl text-fallen-bone/90">{it.text}</span>
              </li>
            </RevealOnScroll>
          ))}
        </ol>
      </div>
    </section>
  );
}
