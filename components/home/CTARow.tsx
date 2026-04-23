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
    <section className="py-14">
      <div className="mx-auto max-w-4xl px-6">
        <p className="text-mono text-xs uppercase tracking-[0.35em] text-fallen-gold mb-6 text-center">{t("ctaExplore")}</p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-3">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="group inline-flex items-center gap-2 border border-fallen-bone/20 px-5 py-2.5 hover:border-fallen-gold hover:bg-fallen-gold/5 transition"
            >
              <span className="text-mono text-xs uppercase tracking-widest text-fallen-bone group-hover:text-fallen-gold transition">{l.label}</span>
              <span className="text-fallen-muted text-xs group-hover:text-fallen-gold group-hover:translate-x-1 transition-all">→</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
