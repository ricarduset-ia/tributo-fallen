"use client";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { RETIREMENT_DATE, diffToParts } from "@/lib/dates";

export function Countdown() {
  const t = useTranslations("home");
  const [parts, setParts] = useState(() => diffToParts(RETIREMENT_DATE));

  useEffect(() => {
    const tick = () => setParts(diffToParts(RETIREMENT_DATE));
    const id = setInterval(tick, 1000);
    tick();
    return () => clearInterval(id);
  }, []);

  const cells = [
    { v: parts.days, label: t("daysLabel") },
    { v: parts.hours, label: t("hoursLabel") },
    { v: parts.minutes, label: t("minutesLabel") },
    { v: parts.seconds, label: t("secondsLabel") },
  ];

  return (
    <section className="relative border-y border-fallen-bone/10 bg-fallen-void py-20">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <p className="text-mono text-xs uppercase tracking-[0.35em] text-fallen-muted mb-10">
          {t("countdownLabel")}
        </p>
        <div className="grid grid-cols-4 gap-4 md:gap-10 mx-auto max-w-4xl">
          {cells.map((c, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="text-mono text-5xl md:text-8xl font-light text-fallen-bone tabular-nums">
                {String(c.v).padStart(2, "0")}
              </span>
              <span className="mt-3 text-mono text-[10px] md:text-xs uppercase tracking-[0.3em] text-fallen-gold">
                {c.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
