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
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-mono text-xs uppercase tracking-[0.35em] text-fallen-gold mb-6">{t("ctaExplore")}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="group block border border-fallen-bone/10 p-10 hover:border-fallen-gold transition"
            >
              <span className="text-display text-3xl text-fallen-bone group-hover:text-fallen-gold transition">{l.label}</span>
              <span className="block mt-3 text-mono text-xs uppercase tracking-widest text-fallen-muted group-hover:text-fallen-gold transition">→</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
