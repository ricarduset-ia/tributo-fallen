"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    twttr?: {
      _e: Array<(twttr: Window["twttr"]) => void>;
      ready: (fn: (twttr: Window["twttr"]) => void) => void;
      widgets: { load: (el?: HTMLElement | null) => void };
    };
  }
}

const MOCK_TWEETS = [
  {
    id: "1",
    text: "23 anos de Counter-Strike. Obrigado a todos que fizeram parte dessa jornada. Cada round, cada major, cada título — foi com vocês. 💛",
    date: "20 abr 2026",
    likes: "48.2K",
    retweets: "12.1K",
  },
  {
    id: "2",
    text: "Treino finalizado. Preparação máxima para os últimos campeonatos. O Professor ainda tem muito a ensinar. 🎯",
    date: "18 abr 2026",
    likes: "21.7K",
    retweets: "4.3K",
  },
  {
    id: "3",
    text: "Que jogo ontem. Isso é Counter-Strike. Isso é o que me fez amar esse game por mais de duas décadas.",
    date: "15 abr 2026",
    likes: "34.9K",
    retweets: "8.8K",
  },
  {
    id: "4",
    text: "MLG Columbus 2016. Ainda sinto aquele round final. Sempre vou sentir. 🏆",
    date: "12 abr 2026",
    likes: "67.4K",
    retweets: "19.2K",
  },
  {
    id: "5",
    text: "Para os jovens que querem ser pro players: dediquem-se, estudem o jogo, respeitem seus colegas. O talento abre portas, o caráter mantém.",
    date: "9 abr 2026",
    likes: "29.1K",
    retweets: "9.6K",
  },
];

function MockTimeline() {
  return (
    <div className="border border-fallen-bone/10 rounded-2xl overflow-hidden max-w-[598px]">
      <div className="bg-black px-4 py-3 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-fallen-bone/20 flex items-center justify-center text-fallen-gold font-bold text-sm">F</div>
          <div>
            <p className="text-white text-sm font-bold leading-none">FalleN</p>
            <p className="text-white/50 text-xs mt-0.5">@fallencs</p>
          </div>
        </div>
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white" aria-label="X"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.912-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
      </div>

      <div className="bg-black divide-y divide-white/10">
        {MOCK_TWEETS.map((tweet) => (
          <div key={tweet.id} className="px-4 py-4 hover:bg-white/[0.03] transition">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-fallen-bone/20 flex-shrink-0 flex items-center justify-center text-fallen-gold font-bold text-sm">F</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-white text-sm font-bold">FalleN</span>
                  <span className="text-white/50 text-sm">@fallencs</span>
                  <span className="text-white/30 text-sm">·</span>
                  <span className="text-white/50 text-sm">{tweet.date}</span>
                </div>
                <p className="text-white/90 text-sm mt-1 leading-relaxed">{tweet.text}</p>
                <div className="flex gap-6 mt-3">
                  <span className="text-white/40 text-xs flex items-center gap-1.5">
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current"><path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"/></svg>
                    {tweet.likes}
                  </span>
                  <span className="text-white/40 text-xs flex items-center gap-1.5">
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current"><path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z"/></svg>
                    {tweet.retweets}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <a
        href="https://twitter.com/fallencs"
        target="_blank"
        rel="noopener noreferrer"
        className="block bg-black px-4 py-3 text-center text-[#1d9bf0] text-sm hover:bg-white/[0.03] transition border-t border-white/10"
      >
        Ver no X (Twitter)
      </a>
    </div>
  );
}

const IS_DEV = process.env.NODE_ENV === "development";

export function TwitterFeed() {
  const ref = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (IS_DEV) return;

    const load = () => {
      window.twttr?.ready(() => {
        window.twttr?.widgets.load(ref.current);
        setLoaded(true);
      });
    };

    if (document.getElementById("twitter-wjs")) {
      load();
      return;
    }

    window.twttr = window.twttr || ({ _e: [], ready(f) { this._e.push(f); } } as any);

    const script = document.createElement("script");
    script.id = "twitter-wjs";
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    script.charset = "utf-8";
    document.head.appendChild(script);

    load();
  }, []);

  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-6 flex justify-center">
        {IS_DEV ? (
          <MockTimeline />
        ) : (
          <div ref={ref}>
            <a
              className="twitter-timeline"
              href="https://twitter.com/fallencs"
              data-theme="dark"
              data-tweet-limit="5"
            >
              Tweets by @fallencs
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
