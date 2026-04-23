"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { locales, type Locale } from "@/i18n";
import { cn } from "@/lib/cn";

type NavLink = { href: string; label: string };

export function MobileMenu({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const current = useLocale() as Locale;
  const rest = pathname.split("/").slice(2).join("/");

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const drawer = (
    <>
      {/* Overlay */}
      <div
        onClick={() => setOpen(false)}
        className={cn(
          "fixed inset-0 z-[60] bg-black transition-opacity duration-300",
          open ? "opacity-90 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      />

      {/* Drawer */}
      <div
        className={cn(
          "fixed top-0 right-0 z-[70] h-full w-72 bg-[#0A0A0A] border-l border-fallen-bone/10 flex flex-col transition-transform duration-300 ease-out shadow-2xl",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-fallen-bone/10">
          <span className="text-display text-lg text-fallen-bone" style={{ letterSpacing: "-0.05em" }}>FalleN</span>
          <button
            onClick={() => setOpen(false)}
            className="w-8 h-8 flex items-center justify-center text-fallen-muted hover:text-fallen-bone transition text-base leading-none border border-fallen-bone/10 hover:border-fallen-bone/30"
            aria-label="Fechar menu"
          >
            ✕
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex flex-col px-6 py-6 gap-0 flex-1 overflow-y-auto">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="group flex items-center justify-between py-4 border-b border-fallen-bone/10 text-mono text-xs uppercase tracking-widest text-fallen-bone hover:text-fallen-gold transition-colors"
            >
              {l.label}
              <span className="text-fallen-muted group-hover:text-fallen-gold group-hover:translate-x-0.5 transition-all">→</span>
            </Link>
          ))}
        </nav>

        {/* Lang switcher */}
        <div className="px-6 py-6 border-t border-fallen-bone/10 flex gap-2">
          {locales.map((l) => (
            <Link
              key={l}
              href={`/${l}${rest ? `/${rest}` : ""}`}
              onClick={() => setOpen(false)}
              className={cn(
                "text-mono text-xs uppercase tracking-widest px-3 py-2 border transition",
                l === current
                  ? "border-fallen-gold text-fallen-gold bg-fallen-gold/5"
                  : "border-fallen-bone/15 text-fallen-muted hover:text-fallen-bone hover:border-fallen-bone/35"
              )}
            >
              {l}
            </Link>
          ))}
        </div>
      </div>
    </>
  );

  return (
    <div className="md:hidden">
      {/* Hamburger button */}
      <button
        onClick={() => setOpen(!open)}
        className="relative z-50 flex flex-col justify-center gap-[5px] w-8 h-8 focus:outline-none"
        aria-label={open ? "Fechar menu" : "Abrir menu"}
      >
        <span className={cn("block h-px bg-fallen-bone transition-all duration-300 origin-center", open ? "rotate-45 translate-y-[6px]" : "")} />
        <span className={cn("block h-px bg-fallen-bone transition-all duration-300", open ? "opacity-0 scale-x-0" : "")} />
        <span className={cn("block h-px bg-fallen-bone transition-all duration-300 origin-center", open ? "-rotate-45 -translate-y-[6px]" : "")} />
      </button>

      {mounted && createPortal(drawer, document.body)}
    </div>
  );
}
