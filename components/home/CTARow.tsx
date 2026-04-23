import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";

export async function CTARow() {
  const locale = await getLocale();
  const t = await getTranslations("home");
  const links = [
    { href: `/${locale}/stats`, label: t("ctaStats") },
    { href: `/${locale}/trajetoria`, label: t("ctaTrajetoria") },
    { href: `/${locale}/conquistas`, label: t("ctaConquistas") },
  ];
  return (
    <section className="py-24 border-t border-fallen-bone/5">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-mono text-xs uppercase tracking-[0.35em] text-fallen-gold mb-10">{t("ctaExplore")}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="group flex items-center justify-between border border-fallen-bone/20 px-7 py-5 hover:border-fallen-gold hover:bg-fallen-gold/5 transition"
            >
              <span className="text-mono text-sm uppercase tracking-widest text-fallen-bone group-hover:text-fallen-gold transition">{l.label}</span>
              <span className="text-fallen-muted group-hover:text-fallen-gold group-hover:translate-x-1 transition-all">→</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
