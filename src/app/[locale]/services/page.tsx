import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { languageAlternates, localePath, localeUrl } from "@/i18n/paths";
import { Navbar } from "@/components/Navbar";
import { Services } from "@/components/Services";
import { Faq } from "@/components/Faq";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";

// /services/ hub: every service in one place, each card linking to its own
// page once it exists. Navbar and footer link here from every page.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ServicePage" });
  return {
    title: t("hubMetaTitle"),
    description: t("hubMetaDescription"),
    alternates: {
      canonical: localePath(locale, "/services/"),
      languages: languageAlternates("/services/"),
    },
    openGraph: {
      title: t("hubMetaTitle"),
      description: t("hubMetaDescription"),
      url: localeUrl(locale, "/services/"),
      type: "website",
    },
  };
}

export default async function ServicesHubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("ServicePage");

  return (
    <>
      <Navbar />
      <main className="pt-16">
        <section className="relative overflow-hidden">
          <div className="fluid-mesh pointer-events-none absolute inset-0 -z-10 opacity-60" />
          <div className="mx-auto max-w-5xl px-5 pb-12 pt-16 sm:pt-24">
            <Breadcrumbs
              locale={locale}
              items={[
                { name: t("home"), path: "/" },
                { name: t("services"), path: "/services/" },
              ]}
            />
            <h1 className="mt-8 text-4xl font-bold tracking-tight text-primary sm:text-5xl">{t("hubH1")}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-body">{t("hubIntro")}</p>
            <a href="#contact" className="btn-primary mt-8 inline-block px-6 py-3 text-sm">
              {t("cta")}
            </a>
          </div>
        </section>

        <Services bare />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
