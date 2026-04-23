import type { Moment } from "@/lib/moments";
import type { Locale } from "@/i18n";
import { YouTubePlayer } from "@/components/site/YouTubePlayer";

export function MomentCard({ moment, locale, playLabel }: { moment: Moment; locale: Locale; playLabel: string }) {
  const title = moment.title[locale];
  const description = moment.description[locale];

  return (
    <article className="group flex flex-col border border-fallen-bone/10 bg-fallen-ink/40 overflow-hidden">
      <YouTubePlayer videoId={moment.id} title={title} playLabel={playLabel} cornerBadge={moment.year} />
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-display text-xl md:text-2xl leading-tight text-fallen-bone">{title}</h3>
        <p className="mt-2 text-sm text-fallen-muted leading-relaxed">{description}</p>
      </div>
    </article>
  );
}
