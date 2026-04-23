import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { LangSwitcher } from "./LangSwitcher";

export async function NavHeader() {
  const locale = await getLocale();
  const t = await getTranslations("site.nav");
  const links = [
    { href: `/${locale}`, label: t("home") },
    { href: `/${locale}/stats`, label: t("stats") },
    { href: `/${locale}/conquistas`, label: t("conquistas") },
    { href: `/${locale}/trajetoria`, label: t("trajetoria") },
    { href: `/${locale}/campeonatos`, label: t("campeonatos") },
  ];
  return (
    <header className="sticky top-0 z-40 bg-fallen-void/70 backdrop-blur-md border-b border-fallen-bone/5">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <Link href={`/${locale}`} className="text-display text-xl" style={{ letterSpacing: "-0.05em" }}>FalleN</Link>
        <nav className="hidden md:flex gap-8 text-mono text-xs uppercase tracking-widest text-fallen-muted">
          {links.map((l) => (<Link key={l.href} href={l.href} className="hover:text-fallen-bone transition">{l.label}</Link>))}
        </nav>
        <LangSwitcher />
      </div>
    </header>
  );
}
