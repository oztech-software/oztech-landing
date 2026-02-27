"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

export function Header() {
  const t = useTranslations("Header");
  const locale = useLocale();
  const pathname = usePathname();

  const isPT = locale === "pt-BR";

  return (
    <header className="w-full border-b border-white/10 sticky top-0 z-20 bg-oztech-dark/80 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Logo / brand */}
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-oztech-primary animate-pulse" />
          <span className="tracking-[0.25em] text-xs font-semibold uppercase">
            {t("brand")}
          </span>
        </div>

        {/* Navegação + toggle de idioma */}
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex gap-6 text-xs text-white/70">
            {/* Produtos / Manifesto / Contato continuam como âncora interna */}
            <a href="#products" className="hover:text-white transition">
              {t("navProducts")}
            </a>
            <a href="#about" className="hover:text-white transition">
              {t("navManifesto")}
            </a>
            <a href="#contact" className="hover:text-white transition">
              {t("navContact")}
            </a>
          </nav>

          {/* Toggle de idioma */}
          <div className="flex items-center gap-1 rounded-full border border-white/10 px-1 py-0.5 text-[10px] md:text-xs">
            <Link
              href={pathname}
              locale="pt-BR"
              className={`px-2 py-0.5 rounded-full transition ${
                isPT ? "bg-white text-black" : "text-white/60 hover:text-white"
              }`}
            >
              PT
            </Link>
            <Link
              href={pathname}
              locale="en-US"
              className={`px-2 py-0.5 rounded-full transition ${
                !isPT ? "bg-white text-black" : "text-white/60 hover:text-white"
              }`}
            >
              EN
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
