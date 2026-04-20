"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { locales, type Locale } from "@/i18n";
import { cn } from "@/lib/cn";

export function LangSwitcher() {
  const pathname = usePathname();
  const current = useLocale() as Locale;
  const rest = pathname.split("/").slice(2).join("/");
  return (
    <nav aria-label="Language" className="flex items-center gap-2 text-mono text-xs uppercase tracking-widest">
      {locales.map((l) => (
        <Link
          key={l}
          href={`/${l}${rest ? `/${rest}` : ""}`}
          className={cn("px-2 py-1 transition", l === current ? "text-fallen-gold" : "text-fallen-muted hover:text-fallen-bone")}
        >
          {l}
        </Link>
      ))}
    </nav>
  );
}
