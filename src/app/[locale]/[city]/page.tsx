import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Navbar } from "@/components/Navbar";
import { Services } from "@/components/Services";
import { Work } from "@/components/Work";
import { Faq } from "@/components/Faq";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { CITIES, getCity, type City } from "@/lib/cities";
import { SITE, LOCALES } from "@/lib/site";

// Static export: pre-render every locale × city. Unknown slugs 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.flatMap((locale) => CITIES.map((c) => ({ locale, city: c.slug })));
}

function copyFor(city: City, locale: string) {
  return locale === "es" ? city.es : city.en;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; city: string }>;
}): Promise<Metadata> {
  const { locale, city: slug } = await params;
  const city = getCity(slug);
  if (!city) return {};

  const t = await getTranslations({ locale, namespace: "City" });
  const copy = copyFor(city, locale);

  return {
    title: t("metaTitle", { city: city.name }),
    description: copy.intro,
    alternates: {
      canonical: `/${locale}/${city.slug}`,
      languages: Object.fromEntries(LOCALES.map((l) => [l, `/${l}/${city.slug}`])),
    },
    openGraph: {
      title: t("metaTitle", { city: city.name }),
      description: copy.intro,
      url: `${SITE.url}/${locale}/${city.slug}`,
      type: "website",
    },
  };
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ locale: string; city: string }>;
}) {
  const { locale, city: slug } = await params;
  setRequestLocale(locale);

  const city = getCity(slug);
  if (!city) notFound();

  const t = await getTranslations("City");
  const copy = copyFor(city, locale);

  // Service schema with the city as areaServed — the core local-SEO signal.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Custom software development",
    name: t("metaTitle", { city: city.name }),
    url: `${SITE.url}/${locale}/${city.slug}`,
    provider: {
      "@type": "ProfessionalService",
      name: SITE.name,
      url: SITE.url,
      email: SITE.email,
      areaServed: city.name,
    },
    areaServed: {
      "@type": "City",
      name: city.name,
      containedInPlace: { "@type": "AdministrativeArea", name: city.county },
    },
    availableLanguage: ["en", "es"],
  };

  const nearby = CITIES.filter((c) => c.slug !== city.slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className="pt-16">
        {/* City hero */}
        <section className="relative overflow-hidden">
          <div className="fluid-mesh pointer-events-none absolute inset-0 -z-10 opacity-60" />
          <div className="mx-auto max-w-5xl px-5 py-20 sm:py-28">
            <span className="data-mono text-xs uppercase tracking-widest text-brand-400">
              {t("eyebrow")} · {city.county}
            </span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-primary sm:text-5xl">
              {t("title", { city: city.name })}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-body">{copy.intro}</p>
            <p className="mt-4 text-sm text-secondary">
              <span className="font-semibold text-primary">{t("areasLabel")}:</span> {copy.areas}
            </p>
            <a href={`/${locale}#contact`} className="btn-primary mt-8 inline-block px-6 py-3 text-sm">
              {t("cta")}
            </a>
          </div>
        </section>

        <Services />
        <Work />
        <Faq />
        <Contact />

        {/* Internal links to the other city pages — local-SEO link graph */}
        <section className="mx-auto max-w-6xl px-5 pb-24">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-secondary">
            {t("nearbyTitle")}
          </h2>
          <ul className="mt-5 flex flex-wrap gap-2.5">
            {nearby.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/${c.slug}`}
                  className="inline-block rounded-lg border border-white/12 px-3.5 py-1.5 text-sm text-secondary transition hover:border-white/30 hover:text-primary"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
