import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { languageAlternates, localePath, localeUrl } from "@/i18n/paths";
import { Navbar } from "@/components/Navbar";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { ServiceLanding } from "@/components/ServiceLanding";
import { COLOMBIA_COPY, COLOMBIA_PROJECTS } from "@/lib/colombia";
import { servicePageFor } from "@/lib/services";
import { SITE, SERVICES } from "@/lib/site";

// /es/colombia/ (and /colombia/ in English): Colombian companies that sell in
// the US. Not a city page: it sits outside [city] and the CITIES list.
const PATH = "/colombia/";

function copyFor(locale: string) {
  return locale === "es" ? COLOMBIA_COPY.es : COLOMBIA_COPY.en;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const copy = copyFor(locale);
  return {
    // Absolute: the brand suffix would push "Colombia" out of the visible title.
    title: { absolute: copy.metaTitle },
    description: copy.metaDescription,
    alternates: {
      canonical: localePath(locale, PATH),
      languages: languageAlternates(PATH),
    },
    openGraph: {
      title: copy.metaTitle,
      description: copy.metaDescription,
      url: localeUrl(locale, PATH),
      type: "website",
    },
  };
}

export default async function ColombiaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("ServicePage");
  const ts = await getTranslations("Services");
  const copy = copyFor(locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${localeUrl(locale, PATH)}#service`,
    serviceType: "Website and software development for Colombian companies selling in the United States",
    name: copy.h1,
    description: copy.metaDescription,
    url: localeUrl(locale, PATH),
    provider: { "@id": `${SITE.url}/#business` },
    areaServed: [
      { "@type": "Country", name: "Colombia" },
      { "@type": "Country", name: "United States" },
    ],
    availableLanguage: ["es", "en"],
  };

  const related = SERVICES.map((s) => {
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
          eyebrow={locale === "es" ? "Colombia → Estados Unidos" : "Colombia → United States"}
          crumbs={[
            { name: t("home"), path: "/" },
            { name: copy.breadcrumb, path: PATH },
          ]}
          copy={copy}
          projects={COLOMBIA_PROJECTS}
          related={related}
          platformsEyebrow={t("services")}
        />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
