import { getTranslations } from "next-intl/server";

export async function Footer() {
  const t = await getTranslations("footer");
  return (
    <footer className="mt-32 border-t border-fallen-bone/5 py-10 text-center text-mono text-xs uppercase tracking-widest text-fallen-muted">
      <div className="mx-auto max-w-6xl px-6 space-y-2">
        <p className="text-fallen-gold">{t("retirement")}</p>
        <p>{t("credit")}</p>
      </div>
    </footer>
  );
}
