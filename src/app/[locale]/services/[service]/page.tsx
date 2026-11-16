import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { languageAlternates, localePath, localeUrl } from "@/i18n/paths";
import { Navbar } from "@/components/Navbar";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { ServiceLanding } from "@/components/ServiceLanding";
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

  // Other services: link to their own page when one exists, else the hub.
  const related = SERVICES.filter((s) => s.id !== page.serviceId).map((s) => {
    const own = servicePageFor(s.id);
    return { href: own ? `/services/${own.slug}` : "/services", label: ts(`${s.id}.title`) };
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main className="pt-16">
        <ServiceLanding
          locale={locale}
          eyebrow={t("eyebrow")}
          crumbs={[
            { name: t("home"), path: "/" },
            { name: t("services"), path: "/services/" },
            { name: copy.breadcrumb, path },
          ]}
          copy={copy}
          projects={page.projects}
          related={related}
        />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
