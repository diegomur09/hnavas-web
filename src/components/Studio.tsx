import { getTranslations } from "next-intl/server";
import { AnimatedSection } from "./AnimatedSection";

// Studio positioning band. Senior-led framing on purpose: it reads as a studio
// without claiming a headcount that doesn't exist.
const TAG_KEYS = ["senior", "partners", "bilingual", "production"] as const;

export async function Studio() {
  const t = await getTranslations("Studio");

  return (
    <AnimatedSection id="studio" className="mx-auto max-w-6xl scroll-mt-20 px-5 pt-6 pb-8">
      <div className="glass-card p-8 sm:p-10">
        <span className="data-mono text-xs uppercase tracking-widest text-brand-400">
          {t("eyebrow")}
        </span>
        <h2 className="mt-3 max-w-3xl text-2xl font-bold tracking-tight text-primary sm:text-3xl">
          {t("title")}
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-body">{t("body")}</p>

        <ul className="mt-6 flex flex-wrap gap-2.5">
          {TAG_KEYS.map((k) => (
            <li
              key={k}
              className="data-mono inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/3 px-3 py-1.5 text-xs text-secondary"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-up" />
              {t(`tags.${k}`)}
            </li>
          ))}
        </ul>
      </div>
    </AnimatedSection>
  );
}
