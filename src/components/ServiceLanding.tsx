import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { SectionHeading } from "@/components/Services";
import { AnimatedSection } from "@/components/AnimatedSection";
import { ProjectList } from "@/components/Work";
import { Faq } from "@/components/Faq";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import type { ServicePageCopy } from "@/lib/services";
import { SITE } from "@/lib/site";

// The landing-page anatomy shared by /services/{slug}/ and /colombia/: hero,
// who it's for, what's included, platforms or services, process, real
// projects, FAQ and related links. Each page adds its own JSON-LD, Navbar,
// Contact and Footer around it.

function Check() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export async function ServiceLanding({
  locale,
  eyebrow,
  crumbs,
  copy,
  projects,
  related,
  platformsEyebrow,
}: {
  locale: string;
  eyebrow: string;
  crumbs: { name: string; path: string }[];
  copy: ServicePageCopy;
  projects: string[];
  related: { href: string; label: string }[];
  /** Overrides the "Platforms" label, e.g. when the cards list services. */
  platformsEyebrow?: string;
}) {
  const t = await getTranslations("ServicePage");

  return (
    <>
      {/* Hero: answer-first intro, the two ways to start */}
      <section className="relative overflow-hidden">
        <div className="fluid-mesh pointer-events-none absolute inset-0 -z-10 opacity-60" />
        <div className="mx-auto max-w-5xl px-5 py-16 sm:py-24">
          <Breadcrumbs locale={locale} items={crumbs} />
          <span className="data-mono mt-8 block text-xs uppercase tracking-widest text-brand-400">{eyebrow}</span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-primary sm:text-5xl">{copy.h1}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-body">{copy.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#contact" className="btn-primary inline-block px-6 py-3 text-sm">
              {t("cta")}
            </a>
            <a
              href={SITE.calendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost inline-block px-6 py-3 text-sm"
            >
              {t("bookCall")}
            </a>
          </div>
        </div>
      </section>

      {/* When it pays off / who it's for */}
      <AnimatedSection className="mx-auto max-w-6xl px-5 py-20">
        <SectionHeading eyebrow={t("whenEyebrow")} title={copy.whenTitle} />
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {copy.when.map((w) => (
            <div key={w.title} className="glass-card p-6">
              <h3 className="text-base font-semibold text-primary">{w.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-body">{w.body}</p>
            </div>
          ))}
        </div>
      </AnimatedSection>

      {/* What's included */}
      <AnimatedSection className="mx-auto max-w-6xl px-5 py-20">
        <SectionHeading eyebrow={t("includedEyebrow")} title={copy.includedTitle} />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {copy.included.map((item) => (
            <li key={item.title} className="glass-card p-6">
              <div className="flex items-center gap-2.5 text-brand-300">
                <Check />
                <h3 className="text-base font-semibold text-primary">{item.title}</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-body">{item.body}</p>
            </li>
          ))}
        </ul>
      </AnimatedSection>

      {/* Which platform fits (or, on /colombia/, the services with their own pages) */}
      {copy.platforms && copy.platformsTitle && (
        <AnimatedSection className="mx-auto max-w-6xl px-5 py-20">
          <SectionHeading eyebrow={platformsEyebrow ?? t("platformsEyebrow")} title={copy.platformsTitle} subtitle={copy.platformsIntro} />
          {/* Four cards read better as 2x2 than as 3 + 1 orphan */}
          <div className={`mt-10 grid gap-4 ${copy.platforms.length === 4 ? "sm:grid-cols-2" : "lg:grid-cols-3"}`}>
            {copy.platforms.map((p) => (
              <div key={p.title} className="glass-card p-6">
                <h3 className="text-base font-semibold text-primary">
                  {p.href ? (
                    <Link href={p.href} className="transition hover:text-brand-300">
                      {p.title} <span aria-hidden="true">→</span>
                    </Link>
                  ) : (
                    p.title
                  )}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-body">{p.body}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>
      )}

      {/* How a project runs */}
      <AnimatedSection className="mx-auto max-w-4xl px-5 py-20">
        <SectionHeading eyebrow={t("processEyebrow")} title={copy.processTitle} />
        <ol className="mt-10 space-y-4">
          {copy.process.map((step, i) => (
            <li key={step.title} className="glass-card flex gap-5 p-6">
              <span className="data-mono grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-500/12 text-sm font-semibold text-brand-300">
                {i + 1}
              </span>
              <div>
                <h3 className="text-base font-semibold text-primary">{step.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-body">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
        {copy.processNote && <p className="mt-6 text-sm text-secondary">{copy.processNote}</p>}
      </AnimatedSection>

      <ProjectList slugs={projects} eyebrow={t("workEyebrow")} title={copy.workTitle} subtitle={copy.workSubtitle} />

      <Faq items={copy.faq} title={copy.faqTitle} />

      {/* Related services: internal links back into the services hub */}
      <section className="mx-auto max-w-6xl px-5 pb-20">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-secondary">{t("relatedTitle")}</h2>
        <ul className="mt-5 flex flex-wrap gap-2.5">
          {related.map((r) => (
            <li key={r.label}>
              <Link
                href={r.href}
                className="inline-block rounded-lg border border-white/12 px-3.5 py-1.5 text-sm text-secondary transition hover:border-white/30 hover:text-primary"
              >
                {r.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
