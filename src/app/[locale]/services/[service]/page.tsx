import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { languageAlternates, localePath, localeUrl } from "@/i18n/paths";
import { Navbar } from "@/components/Navbar";
import { SectionHeading } from "@/components/Services";
import { AnimatedSection } from "@/components/AnimatedSection";
import { ProjectList } from "@/components/Work";
import { Faq } from "@/components/Faq";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SERVICE_PAGES, getServicePage, servicePageFor, type ServicePage } from "@/lib/services";
import { SITE, LOCALES, SERVICES } from "@/lib/site";

// Static export: pre-render every locale × service page. Unknown slugs 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.flatMap((locale) => SERVICE_PAGES.map((s) => ({ locale, service: s.slug })));
}

function copyFor(page: ServicePage, locale: string) {
  return locale === "es" ? page.es : page.en;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; service: string }>;
}): Promise<Metadata> {
  const { locale, service } = await params;
  const page = getServicePage(service);
  if (!page) return {};

  const copy = copyFor(page, locale);
  const path = `/services/${page.slug}/`;

  return {
    title: copy.metaTitle,
    description: copy.metaDescription,
    alternates: {
      canonical: localePath(locale, path),
      languages: languageAlternates(path),
    },
    openGraph: {
      title: copy.metaTitle,
      description: copy.metaDescription,
      url: localeUrl(locale, path),
      type: "website",
    },
  };
}

function Check() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export default async function ServiceLandingPage({
  params,
}: {
  params: Promise<{ locale: string; service: string }>;
}) {
  const { locale, service } = await params;
  setRequestLocale(locale);

  const page = getServicePage(service);
  if (!page) notFound();

  const t = await getTranslations("ServicePage");
  const ts = await getTranslations("Services");
  const copy = copyFor(page, locale);
  const path = `/services/${page.slug}/`;

  // The provider points at the ProfessionalService node the layout already
  // emits on every page, so Google ties this service to the same business.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${localeUrl(locale, path)}#service`,
    serviceType: page.serviceType,
    name: copy.h1,
    description: copy.metaDescription,
    url: localeUrl(locale, path),
    provider: { "@id": `${SITE.url}/#business` },
    areaServed: [
      { "@type": "City", name: "Denver" },
      { "@type": "State", name: "Colorado" },
    ],
    availableLanguage: ["en", "es"],
  };

  const others = SERVICES.filter((s) => s.id !== page.serviceId);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main className="pt-16">
        {/* Hero: answer-first intro, the two ways to start */}
        <section className="relative overflow-hidden">
          <div className="fluid-mesh pointer-events-none absolute inset-0 -z-10 opacity-60" />
          <div className="mx-auto max-w-5xl px-5 py-16 sm:py-24">
            <Breadcrumbs
              locale={locale}
              items={[
                { name: t("home"), path: "/" },
                { name: t("services"), path: "/services/" },
                { name: copy.breadcrumb, path },
              ]}
            />
            <span className="data-mono mt-8 block text-xs uppercase tracking-widest text-brand-400">
              {t("eyebrow")}
            </span>
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

        {/* When it pays off */}
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

        {/* Which platform fits */}
        {copy.platforms && copy.platformsTitle && (
          <AnimatedSection className="mx-auto max-w-6xl px-5 py-20">
            <SectionHeading eyebrow={t("platformsEyebrow")} title={copy.platformsTitle} subtitle={copy.platformsIntro} />
            <div className="mt-10 grid gap-4 lg:grid-cols-3">
              {copy.platforms.map((p) => (
                <div key={p.title} className="glass-card p-6">
                  <h3 className="text-base font-semibold text-primary">{p.title}</h3>
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

        <ProjectList
          slugs={page.projects}
          eyebrow={t("workEyebrow")}
          title={copy.workTitle}
          subtitle={copy.workSubtitle}
        />

        <Faq items={copy.faq} title={copy.faqTitle} />

        {/* Related services: internal links back into the services hub */}
        <section className="mx-auto max-w-6xl px-5 pb-20">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-secondary">{t("relatedTitle")}</h2>
          <ul className="mt-5 flex flex-wrap gap-2.5">
            {others.map((s) => {
              const own = servicePageFor(s.id);
              return (
                <li key={s.id}>
                  <Link
                    href={own ? `/services/${own.slug}` : "/services"}
                    className="inline-block rounded-lg border border-white/12 px-3.5 py-1.5 text-sm text-secondary transition hover:border-white/30 hover:text-primary"
                  >
                    {ts(`${s.id}.title`)}
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        <Contact />
      </main>
      <Footer />
    </>
  );
}
