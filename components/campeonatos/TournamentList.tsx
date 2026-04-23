import { getTranslations } from "next-intl/server";

const TOURNAMENTS = [
  { name: "BLAST Rivals 2026 Season 1",        dates: "29 abr — 3 mai",   start: "2026-04-29", isMajor: false },
  { name: "PGL Astana",                         dates: "9 — 17 mai",       start: "2026-05-09", isMajor: false },
  { name: "IEM Cologne Major 2026",             dates: "11 — 21 jun",      start: "2026-06-11", isMajor: true  },
  { name: "BLAST Bounty Season 2",              dates: "20 jun — 2 ago",   start: "2026-06-20", isMajor: false },
  { name: "Esports World Cup 2026",             dates: "12 — 23 ago",      start: "2026-08-12", isMajor: false },
  { name: "BLAST Open Porto",                   dates: "24 ago — 6 set",   start: "2026-08-24", isMajor: false },
  { name: "FISSURE Playground 3",               dates: "7 — 13 set",       start: "2026-09-07", isMajor: false },
  { name: "StarLadder StarSeries",              dates: "17 — 20 set",      start: "2026-09-17", isMajor: false },
  { name: "ESL Pro League Season 24",           dates: "13 out — 11 nov",  start: "2026-10-13", isMajor: false },
  { name: "Thunderpick World Championship 2026",dates: "14 — 18 out",      start: "2026-10-14", isMajor: false },
  { name: "PGL Masters Bucharest 2026",         dates: "24 — 31 out",      start: "2026-10-24", isMajor: false },
  { name: "IEM China 2026",                     dates: "2 — 8 nov",        start: "2026-11-02", isMajor: false },
  { name: "BLAST Rivals 2026 Season 2",         dates: "9 — 15 nov",       start: "2026-11-09", isMajor: false },
  { name: "PGL Singapore Major 2026",           dates: "24 nov — 13 dez",  start: "2026-11-24", isMajor: true  },
];

export async function TournamentList({ todayISO }: { todayISO: string }) {
  const t = await getTranslations("campeonatos");
  const today = todayISO;

  return (
    <section className="py-10 pb-24">
      <div className="mx-auto max-w-4xl px-6">
        <p className="text-mono text-xs uppercase tracking-[0.35em] text-fallen-gold mb-8">
          {t("listTitle")}
        </p>

        <ul className="space-y-2">
          {TOURNAMENTS.map((tr) => {
            const isNext = tr.start > today &&
              !TOURNAMENTS.some((x) => x.start > today && x.start < tr.start);
            const isPast = tr.start < today;

            return (
              <li
                key={tr.name}
                className={`flex items-center justify-between gap-4 p-4 border transition ${
                  isNext
                    ? "border-fallen-gold bg-fallen-gold/5"
                    : isPast
                    ? "border-fallen-bone/5 opacity-40"
                    : "border-fallen-bone/10 hover:border-fallen-bone/20"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  {isNext && (
                    <span className="flex-shrink-0 text-mono text-[10px] uppercase tracking-widest border border-fallen-gold text-fallen-gold px-2 py-0.5">
                      {t("nextBadge")}
                    </span>
                  )}
                  {tr.isMajor && (
                    <span className="flex-shrink-0 text-mono text-[10px] uppercase tracking-widest border border-fallen-awp text-fallen-awp px-2 py-0.5">
                      Major
                    </span>
                  )}
                  <span className={`text-sm truncate ${isNext ? "text-fallen-bone font-medium" : "text-fallen-bone/80"}`}>
                    {tr.name}
                  </span>
                </div>
                <span className="flex-shrink-0 text-mono text-xs text-fallen-muted tabular-nums">
                  {tr.dates}
                </span>
              </li>
            );
          })}
        </ul>

        <p className="mt-10 text-mono text-xs text-fallen-muted/60">
          {t("sourceNote")}{" "}
          <a
            href="https://www.dust2.com.br/noticias/72940/veja-quais-torneios-fallen-ainda-pode-jogar-pela-furia"
            target="_blank"
            rel="noopener noreferrer"
            className="text-fallen-muted hover:text-fallen-bone transition underline underline-offset-2"
          >
            dust2.com.br
          </a>
        </p>
      </div>
    </section>
  );
}
