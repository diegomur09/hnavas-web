"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SITE } from "@/lib/site";
import { LocaleSwitch } from "./LocaleSwitch";

export function Navbar() {
  const t = useTranslations("Nav");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#services", label: t("services") },
    { href: "#work", label: t("work") },
    { href: "#about", label: t("about") },
    { href: "#contact", label: t("contact") },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/8 bg-surface-900/70 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link href="/" className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-brand-400 to-brand-600 text-[13px] font-bold text-surface-950">
            H
          </span>
          <span className="text-sm font-semibold tracking-tight text-primary">
            {SITE.name}
          </span>
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-secondary transition hover:text-primary"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <LocaleSwitch />
          <a
            href="#contact"
            className="btn-primary hidden px-4 py-2 text-sm sm:inline-block"
          >
            {t("cta")}
          </a>
        </div>
      </nav>
    </header>
  );
}
