import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { SERVICES } from "@/lib/site";
import { servicePageFor } from "@/lib/services";
import { AnimatedSection } from "./AnimatedSection";
import { ServiceIcon } from "./icons";

// On a city page the heading names the city ("... Services in Aurora"), so
// each page's H2 matches how people search for these services locally.
// `bare` drops the heading for the /services/ hub, whose H1 already says it.
// Cards that have their own service page link to it: those links are how
// Google finds and weighs the service pages.
export async function Services({ cityName, bare }: { cityName?: string; bare?: boolean } = {}) {
  const t = await getTranslations("Services");
  const title = cityName ? t("titleCity", { city: cityName }) : t("title");

  return (
    <AnimatedSection
      id="services"
      className={`mx-auto max-w-6xl scroll-mt-20 px-5 ${bare ? "pb-24" : "py-24"}`}
    >
      {!bare && <SectionHeading eyebrow={t("eyebrow")} title={title} subtitle={t("subtitle")} />}

      <div className={`${bare ? "" : "mt-12 "}grid gap-4 sm:grid-cols-2 lg:grid-cols-3`}>
        {SERVICES.map((s) => {
          const page = servicePageFor(s.id);
          return (
          <div key={s.id} className="glass-card glass-card-hover flex flex-col p-6">
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
            {page && (
              <Link
                href={`/services/${page.slug}`}
                className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-300 transition hover:text-brand-400"
              >
                {t("learnMore")} <span aria-hidden="true">→</span>
              </Link>
            )}
          </div>
          );
        })}
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
