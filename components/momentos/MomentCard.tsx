"use client";
import { useState } from "react";
import type { Moment } from "@/lib/moments";
import type { Locale } from "@/i18n";

export function MomentCard({ moment, locale, playLabel }: { moment: Moment; locale: Locale; playLabel: string }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const title = moment.title[locale];
  const description = moment.description[locale];
  const thumbnail = `https://i.ytimg.com/vi/${moment.id}/hqdefault.jpg`;

  return (
    <article className="group flex flex-col border border-fallen-bone/10 bg-fallen-ink/40 overflow-hidden">
      <div className="relative w-full bg-black" style={{ paddingBottom: "56.25%" }}>
        {isPlaying ? (
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube.com/embed/${moment.id}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setIsPlaying(true)}
            aria-label={`${playLabel}: ${title}`}
            className="absolute inset-0 w-full h-full group/btn"
          >
            <img
              src={thumbnail}
              alt={title}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover/btn:opacity-100 transition"
            />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex items-center justify-center w-16 h-16 rounded-full bg-fallen-gold/90 text-fallen-void group-hover/btn:bg-fallen-gold group-hover/btn:scale-110 transition">
                <svg viewBox="0 0 24 24" className="w-7 h-7 ml-1 fill-current" aria-hidden="true">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </span>
            <span className="absolute top-3 right-3 text-mono text-[10px] uppercase tracking-[0.3em] text-fallen-gold bg-fallen-void/70 px-2 py-1">
              {moment.year}
            </span>
          </button>
        )}
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-display text-xl md:text-2xl leading-tight text-fallen-bone">{title}</h3>
        <p className="mt-2 text-sm text-fallen-muted leading-relaxed">{description}</p>
      </div>
    </article>
  );
}
