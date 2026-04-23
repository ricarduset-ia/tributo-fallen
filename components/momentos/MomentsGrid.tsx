import type { Moment } from "@/lib/moments";
import type { Locale } from "@/i18n";
import { MomentCard } from "./MomentCard";

export function MomentsGrid({ moments, locale, playLabel }: { moments: Moment[]; locale: Locale; playLabel: string }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {moments.map((m) => (
        <MomentCard key={m.id} moment={m} locale={locale} playLabel={playLabel} />
      ))}
    </div>
  );
}
