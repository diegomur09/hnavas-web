import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { SITE } from "@/lib/site";
import { AuthProvider } from "@/context/AuthContext";
import { AuthModal } from "@/components/AuthModal";
import { AUTH_ENABLED } from "@/lib/config";
import "../globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });

  return {
    metadataBase: new URL(SITE.url),
    // Google Search Console site ownership (meta-tag verification method).
    verification: { google: "yOHr8SLg3kmc5XTkVpEY05pPorrSW6C0xQGoVsLNib8" },
    title: {
      default: t("homeTitle"),
      template: `%s | ${SITE.name}`,
    },
    description: t("homeDescription"),
    // Low domain authority → lead with service-modifier + local + long-tail
    // terms we can realistically rank for, not generic high-KD head terms.
    keywords: [
      "custom software development Denver",
      "software development company Denver",
      "web application development Denver",
      "SaaS development company",
      "AWS development Colorado",
      "AWS consultant Denver",
      "serverless development AWS",
      "AI automation services",
      "AI development Denver",
      "Next.js development services",
      "MVP development for startups",
      "bilingual software developer Denver",
      "hire software developer Denver",
      "desarrollo de software a medida Denver",
      "desarrollador de software bilingüe",
      "automatización con IA Denver",
    ],
    authors: [{ name: SITE.person, url: SITE.url }],
    creator: SITE.person,
    alternates: {
      canonical: `/${locale}`,
      languages: { en: "/en", es: "/es" },
    },
    openGraph: {
      type: "website",
      locale: locale === "es" ? "es_US" : "en_US",
      url: `${SITE.url}/${locale}`,
      siteName: SITE.name,
      title: t("homeTitle"),
      description: t("homeDescription"),
    },
    twitter: {
      card: "summary_large_image",
      title: t("homeTitle"),
      description: t("homeDescription"),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    },
  };
}

const SERVICE_TYPES = [
  "Custom software development",
  "Full-stack web application development",
  "SaaS development",
  "AWS cloud architecture & serverless",
  "AI automation",
  "Payments & CRM integrations",
  "Mobile, no-code & low-code apps",
  "Local SEO",
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": `${SITE.url}/#business`,
      name: SITE.name,
      url: SITE.url,
      email: SITE.email,
      image: `${SITE.url}/icon-512.png`,
      logo: `${SITE.url}/icon-512.png`,
      description: SITE.tagline,
      priceRange: "$$",
      areaServed: [
        { "@type": "City", name: "Denver" },
        { "@type": "City", name: "Broomfield" },
        { "@type": "State", name: "Colorado" },
        { "@type": "Country", name: "United States" },
      ],
      serviceType: SERVICE_TYPES,
      knowsLanguage: ["en", "es"],
      sameAs: ["https://github.com/diegomur09"],
      founder: { "@id": `${SITE.url}/#person` },
      address: { "@type": "PostalAddress", addressLocality: "Denver", addressRegion: "CO", addressCountry: "US" },
      makesOffer: SERVICE_TYPES.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s },
      })),
    },
    {
      "@type": "Person",
      "@id": `${SITE.url}/#person`,
      name: SITE.person,
      jobTitle: SITE.role,
      url: SITE.url,
      email: SITE.email,
      worksFor: { "@id": `${SITE.url}/#business` },
      knowsLanguage: ["en", "es"],
      sameAs: ["https://github.com/diegomur09"],
      knowsAbout: [
        "Full-stack development",
        "Next.js",
        "React",
        "TypeScript",
        "FastAPI",
        "Python",
        "AWS",
        "Serverless architecture",
        "AWS Lambda",
        "DynamoDB",
        "Cloud architecture",
        "AI automation",
        "Claude API",
        "OpenAI API",
        "SaaS development",
      ],
    },
  ],
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-dvh bg-surface-900 text-primary">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <NextIntlClientProvider>
          <AuthProvider>
            {children}
            {AUTH_ENABLED && <AuthModal />}
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
