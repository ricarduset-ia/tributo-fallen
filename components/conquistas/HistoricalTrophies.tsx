import { getTranslations } from "next-intl/server";

const CS16_TITLES = [
  { date: "2007-04-27", name: "Brazil Cup 2007 — Etapa São Paulo VI" },
  { date: "2007-07-21", name: "World Cyber Games Brasil 2007 — Etapa Online" },
  { date: "2007-09-23", name: "G3XCUP III" },
  { date: "2007-11-03", name: "Acervus Cup #3" },
  { date: "2009-09-27", name: "World Cyber Games Brasil 2009" },
  { date: "2010-01-08", name: "2º Campeonato do Litoral" },
  { date: "2010-02-07", name: "3º LANTEK Cup" },
  { date: "2010-05-01", name: "ESWC Brazil 2010 — São Paulo Qualifier #2" },
  { date: "2010-06-06", name: "ESWC Brazil 2010" },
  { date: "2010-08-29", name: "World Cyber Games Brasil 2010" },
  { date: "2010-08-29", name: "WCG Pan-American Championship 2010" },
  { date: "2010-10-10", name: "IEM V American Championship Finals" },
  { date: "2011-03-20", name: "TEAMPLAY Summer Cup 2011" },
  { date: "2011-10-23", name: "GamingCon Tt eSport 2011" },
  { date: "2011-11-06", name: "World Cyber Games Brasil 2011" },
  { date: "2011-11-06", name: "WCG Pan-American Championship 2011" },
  { date: "2011-12-18", name: "CWB Jungle Cup 2011" },
  { date: "2012-05-06", name: "PSYCUP 5" },
  { date: "2012-05-11", name: "Handy Show Games Cup 2012" },
  { date: "2012-08-26", name: "WCG Pan-American Championship 2012" },
  { date: "2012-10-28", name: "Mega Acervus Cup 2012" },
];

const CSS_TITLES = [
  { date: "2006-12-02", name: "Campeonato Brasileiro de CS:S 2006 — Bracket B" },
  { date: "2006-12-03", name: "Campeonato Brasileiro de CS:S 2006 — Finals" },
  { date: "2008-06-01", name: "Quest Cup of Source #2" },
  { date: "2008-07-20", name: "Quest Cup of Source #3" },
  { date: "2008-07-26", name: "Liga Monkey 2008 Counter-Strike: Source" },
  { date: "2009-12-18", name: "Destroyers TargeTDown Cup #2" },
  { date: "2010-04-03", name: "Destroyers TargeTDown Cup #3" },
  { date: "2010-09-25", name: "Mouses Cup CS:S" },
];

export async function HistoricalTrophies() {
  const t = await getTranslations("conquistas");

  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex items-baseline justify-between mb-10">
          <p className="text-mono text-xs uppercase tracking-[0.35em] text-fallen-gold">
            {t("historicalTitle")}
          </p>
          <span className="text-mono text-xs text-fallen-muted tabular-nums">
            {CS16_TITLES.length + CSS_TITLES.length} títulos
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* CS 1.6 */}
          <div className="border border-fallen-bone/10 p-6">
            <div className="flex items-baseline justify-between mb-5">
              <h3 className="text-display text-xl text-fallen-bone">Counter-Strike 1.6</h3>
              <span className="text-mono text-xs text-fallen-muted">{CS16_TITLES.length} títulos</span>
            </div>
            <ul className="space-y-0">
              {CS16_TITLES.map((t) => (
                <li key={t.date + t.name} className="flex items-baseline justify-between gap-4 py-2 border-b border-fallen-bone/5 last:border-b-0">
                  <span className="text-sm text-fallen-bone/80">{t.name}</span>
                  <span className="flex-shrink-0 text-mono text-xs text-fallen-muted tabular-nums">{t.date.slice(0, 4)}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CS:Source */}
          <div className="border border-fallen-bone/10 p-6">
            <div className="flex items-baseline justify-between mb-5">
              <h3 className="text-display text-xl text-fallen-bone">Counter-Strike: Source</h3>
              <span className="text-mono text-xs text-fallen-muted">{CSS_TITLES.length} títulos</span>
            </div>
            <ul className="space-y-0">
              {CSS_TITLES.map((t) => (
                <li key={t.date + t.name} className="flex items-baseline justify-between gap-4 py-2 border-b border-fallen-bone/5 last:border-b-0">
                  <span className="text-sm text-fallen-bone/80">{t.name}</span>
                  <span className="flex-shrink-0 text-mono text-xs text-fallen-muted tabular-nums">{t.date.slice(0, 4)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
