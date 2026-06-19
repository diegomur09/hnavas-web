import type { MetadataRoute } from "next";
import { SITE, LOCALES, SCREENSHOT_SLUGS } from "@/lib/site";
import { CITIES } from "@/lib/cities";

// Required for `output: export` — emit a static sitemap.xml at build.
export const dynamic = "force-static";

// Project screenshots shown on the page — declared as an image sitemap so
// Google can discover and index the project imagery (image SEO / GEO).
const SCREENSHOTS = [...SCREENSHOT_SLUGS].map(
  (slug) => `${SITE.url}/screenshots/${slug}.webp`,
);

// Both locales are real, indexable URLs (localePrefix: "always"), cross-linked
// with hreflang alternates so Google serves the right language per searcher.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const homeLanguages = Object.fromEntries(LOCALES.map((l) => [l, `${SITE.url}/${l}`]));
  const aboutLanguages = Object.fromEntries(LOCALES.map((l) => [l, `${SITE.url}/${l}/about`]));
  const privacyLanguages = Object.fromEntries(LOCALES.map((l) => [l, `${SITE.url}/${l}/privacy`]));

  const home = LOCALES.map((locale) => ({
    url: `${SITE.url}/${locale}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: locale === "en" ? 1 : 0.9,
    alternates: { languages: homeLanguages },
    images: SCREENSHOTS,
  }));

  const about = LOCALES.map((locale) => ({
    url: `${SITE.url}/${locale}/about`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
    alternates: { languages: aboutLanguages },
  }));

  const privacy = LOCALES.map((locale) => ({
    url: `${SITE.url}/${locale}/privacy`,
    lastModified,
    changeFrequency: "yearly" as const,
    priority: 0.3,
    alternates: { languages: privacyLanguages },
  }));

  // Local-SEO city landing pages: one URL per locale, cross-linked by hreflang.
  const cities = CITIES.flatMap((city) => {
    const languages = Object.fromEntries(
      LOCALES.map((l) => [l, `${SITE.url}/${l}/${city.slug}`]),
    );
    return LOCALES.map((locale) => ({
      url: `${SITE.url}/${locale}/${city.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      alternates: { languages },
    }));
  });

  return [...home, ...about, ...privacy, ...cities];
}
