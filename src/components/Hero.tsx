"use client";

import { useTranslations } from "next-intl";
import { AgentChat } from "./AgentChat";

export function Hero() {
  const t = useTranslations("Hero");

  return (
    <section className="relative overflow-hidden pt-28 pb-20">
      {/* Background layers */}
      <div className="fluid-mesh pointer-events-none absolute inset-0 animate-mesh opacity-80" />
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-40" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-surface-900 to-transparent" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Left: statement */}
        <div>
          <span className="reveal data-mono inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/3 px-3 py-1.5 text-[11px] text-secondary">
            <span className="h-1.5 w-1.5 rounded-full bg-up" />
            {t("badge")}
          </span>

          {/* Deliberately not animated: this is the LCP element, so it has to
              paint from the server HTML instead of waiting on hydration. */}
          <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight text-primary sm:text-5xl lg:text-6xl">
            {t("title")}{" "}
            <span className="text-gradient">{t("titleAccent")}</span>
          </h1>

          <p className="reveal reveal-2 mt-6 max-w-xl text-base leading-relaxed text-body sm:text-lg">
            {t("subtitle")}
          </p>

          <div className="reveal reveal-3 mt-8 flex flex-wrap items-center gap-3">
            <a href="#contact" className="btn-primary px-5 py-3 text-sm">
              {t("ctaPrimary")}
            </a>
            <a href="#work" className="btn-ghost px-5 py-3 text-sm">
              {t("ctaSecondary")}
            </a>
          </div>
        </div>

        {/* Right: the talking website */}
        <div className="reveal reveal-3">
          <p className="mb-3 text-center text-xs text-body lg:text-left">
            {t("chatHint")}
          </p>
          <AgentChat />
        </div>
      </div>
    </section>
  );
}
