"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SITE, assetUrl } from "@/lib/site";
import { useAuth } from "@/context/AuthContext";
import { AUTH_ENABLED } from "@/lib/config";
import { LocaleSwitch } from "./LocaleSwitch";

export function Navbar() {
  const t = useTranslations("Nav");
  const locale = useLocale();
  const { user, isLoading, openAuth, logoutUser } = useAuth();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Section anchors are prefixed with the home path so they also work when the
  // navbar is rendered on a separate page (e.g. /about) — no broken anchors.
  const home = `/${locale}`;
  const links = [
    { href: `${home}#work`, label: t("work") },
    { href: `${home}#services`, label: t("services") },
    { href: "/about", label: t("about"), internal: true },
    { href: `${home}#contact`, label: t("contact") },
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
        <Link href="/" className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center overflow-hidden rounded-lg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={assetUrl("/logos/logo-mark.png")} alt={`${SITE.name} logo`} className="h-full w-full object-cover" />
          </span>
          <span className="text-sm font-semibold tracking-tight text-primary">
            {SITE.name}
          </span>
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {links.map((l) =>
            l.internal ? (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm text-secondary transition hover:text-primary"
              >
                {l.label}
              </Link>
            ) : (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-secondary transition hover:text-primary"
              >
                {l.label}
              </a>
            ),
          )}
        </div>

        <div className="flex items-center gap-3">
          <LocaleSwitch />

          {/* Auth controls — two header states (signed out / signed in).
              Hidden in production via the AUTH_ENABLED flag; shown on QA/local
              where the full auth flow is reviewed. */}
          {AUTH_ENABLED &&
            !isLoading &&
            (user ? (
              <>
                <span className="hidden text-sm text-secondary sm:inline">
                  {t("greeting", { name: user.name })}
                </span>
                <button
                  type="button"
                  onClick={logoutUser}
                  className="btn-ghost px-4 py-2 text-sm"
                >
                  {t("signOut")}
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => openAuth("signin")}
                className="btn-primary px-4 py-2 text-sm"
              >
                {t("signIn")}
              </button>
            ))}
        </div>
      </nav>
    </header>
  );
}
