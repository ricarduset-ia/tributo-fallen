"use client";
import { useState, type ReactNode } from "react";

export function YouTubePlayer({
  videoId,
  title,
  playLabel,
  cornerBadge,
  className = "",
}: {
  videoId: string;
  title: string;
  playLabel: string;
  cornerBadge?: ReactNode;
  className?: string;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const thumbnail = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <div className={`relative w-full bg-black ${className}`} style={{ paddingBottom: "56.25%" }}>
      {isPlaying ? (
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
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
          {cornerBadge && (
            <span className="absolute top-3 right-3 text-mono text-[10px] uppercase tracking-[0.3em] text-fallen-gold bg-fallen-void/70 px-2 py-1">
              {cornerBadge}
            </span>
          )}
        </button>
      )}
    </div>
  );
}
