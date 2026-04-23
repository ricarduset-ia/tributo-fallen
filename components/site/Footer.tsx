import { getTranslations } from "next-intl/server";

export async function Footer() {
  const t = await getTranslations("footer");
  return (
    <footer className="mt-32 border-t border-fallen-bone/5 py-10 text-center text-mono text-xs uppercase tracking-widest text-fallen-muted">
      <div className="mx-auto max-w-6xl px-6 space-y-4">
        <div className="flex items-center justify-center gap-3">
          <a
            href="https://twitter.com/fallencs"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter / X — @fallencs"
            className="group w-9 h-9 flex items-center justify-center border border-fallen-bone/20 rounded-full hover:border-fallen-gold hover:bg-fallen-gold/5 transition"
          >
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-fallen-muted group-hover:fill-fallen-gold transition" aria-hidden="true">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.912-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          <a
            href="https://www.instagram.com/fallen/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram — @fallen"
            className="group w-9 h-9 flex items-center justify-center border border-fallen-bone/20 rounded-full hover:border-fallen-gold hover:bg-fallen-gold/5 transition"
          >
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-fallen-muted group-hover:fill-fallen-gold transition" aria-hidden="true">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.336 3.608 1.311.975.975 1.249 2.242 1.311 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.336 2.633-1.311 3.608-.975.975-2.242 1.249-3.608 1.311-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.336-3.608-1.311-.975-.975-1.249-2.242-1.311-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.336-2.633 1.311-3.608C4.519 2.567 5.786 2.293 7.152 2.231 8.418 2.175 8.798 2.163 12 2.163Zm0 1.838c-3.148 0-3.52.012-4.76.068-1.06.049-1.637.226-2.02.376a3.38 3.38 0 0 0-1.24.807 3.38 3.38 0 0 0-.807 1.24c-.15.383-.327.96-.376 2.02-.056 1.24-.068 1.612-.068 4.76s.012 3.52.068 4.76c.049 1.06.226 1.637.376 2.02.184.47.448.832.807 1.24.408.359.77.623 1.24.807.383.15.96.327 2.02.376 1.24.056 1.612.068 4.76.068s3.52-.012 4.76-.068c1.06-.049 1.637-.226 2.02-.376a3.38 3.38 0 0 0 1.24-.807 3.38 3.38 0 0 0 .807-1.24c.15-.383.327-.96.376-2.02.056-1.24.068-1.612.068-4.76s-.012-3.52-.068-4.76c-.049-1.06-.226-1.637-.376-2.02a3.38 3.38 0 0 0-.807-1.24 3.38 3.38 0 0 0-1.24-.807c-.383-.15-.96-.327-2.02-.376-1.24-.056-1.612-.068-4.76-.068Zm0 3.135a5.864 5.864 0 1 1 0 11.728 5.864 5.864 0 0 1 0-11.728Zm0 1.838a4.026 4.026 0 1 0 0 8.052 4.026 4.026 0 0 0 0-8.052Zm6.406-2.005a1.37 1.37 0 1 1-2.74 0 1.37 1.37 0 0 1 2.74 0Z" />
            </svg>
          </a>
        </div>
        <p className="text-fallen-gold">{t("retirement")}</p>
        <p>{t("credit")}</p>
      </div>
    </footer>
  );
}
