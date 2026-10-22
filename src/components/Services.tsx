import { getTranslations } from "next-intl/server";
import { SERVICES } from "@/lib/site";
import { AnimatedSection } from "./AnimatedSection";
import { ServiceIcon } from "./icons";

export async function Services() {
  const t = await getTranslations("Services");

  return (
    <AnimatedSection id="services" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-24">
      <SectionHeading eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((s) => (
          <div key={s.id} className="glass-card glass-card-hover p-6">
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/12 text-brand-300">
              <ServiceIcon name={s.icon} />
            </div>
            <h3 className="text-base font-semibold text-primary">
              {t(`${s.id}.title`)}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-body">
              {t(`${s.id}.desc`)}
            </p>
            <p className="mt-4 border-t border-white/6 pt-3 text-xs text-secondary">
              {t(`${s.id}.proof`)}
            </p>
          </div>
        ))}
      </div>
    </AnimatedSection>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="max-w-2xl">
      <span className="data-mono text-xs uppercase tracking-widest text-brand-400">
        {eyebrow}
      </span>
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-primary sm:text-4xl">
        {title}
      </h2>
      {subtitle && <p className="mt-3 text-base text-body">{subtitle}</p>}
    </div>
  );
}
