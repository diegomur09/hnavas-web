import type { MetadataRoute } from "next";
import { SITE, LOCALES } from "@/lib/site";

// Both locales are real, indexable URLs (localePrefix: "always"), cross-linked
// with hreflang alternates so Google serves the right language per searcher.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const languages = Object.fromEntries(
    LOCALES.map((l) => [l, `${SITE.url}/${l}`]),
  );

  return LOCALES.map((locale) => ({
    url: `${SITE.url}/${locale}`,
    lastModified,
    changeFrequency: "monthly",
    priority: locale === "en" ? 1 : 0.9,
    alternates: { languages },
  }));
}
