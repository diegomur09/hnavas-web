"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
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
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="data-mono inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/3 px-3 py-1.5 text-[11px] text-secondary"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-up" />
            {t("badge")}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
            className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight text-primary sm:text-5xl lg:text-6xl"
          >
            {t("title")}{" "}
            <span className="text-gradient">{t("titleAccent")}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-body sm:text-lg"
          >
            {t("subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a href="#contact" className="btn-primary px-5 py-3 text-sm">
              {t("ctaPrimary")}
            </a>
            <a href="#work" className="btn-ghost px-5 py-3 text-sm">
              {t("ctaSecondary")}
            </a>
          </motion.div>
        </div>

        {/* Right: the talking website */}
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          <p className="mb-3 text-center text-xs text-body lg:text-left">
            {t("chatHint")}
          </p>
          <AgentChat />
        </motion.div>
      </div>
    </section>
  );
}
