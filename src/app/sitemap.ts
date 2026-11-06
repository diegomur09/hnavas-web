import type { MetadataRoute } from "next";
import { SITE, LOCALES, SCREENSHOT_SLUGS } from "@/lib/site";
import { languageAlternateUrls, localeUrl } from "@/i18n/paths";
import { CITIES } from "@/lib/cities";

// Required for `output: export` — emit a static sitemap.xml at build.
export const dynamic = "force-static";

// Project screenshots shown on the page — declared as an image sitemap so
// Google can discover and index the project imagery (image SEO / GEO).
const SCREENSHOTS = [...SCREENSHOT_SLUGS].map(
  (slug) => `${SITE.url}/screenshots/${slug}.webp`,
);

type Entry = MetadataRoute.Sitemap[number];

// Both locales are real, indexable URLs: English prefix-less (/denver/) and
// Spanish prefixed (/es/denver/), cross-linked with hreflang + x-default so
// Google serves the right language per searcher. English carries the higher
// priority because it's the default locale and the x-default target.
function localizedEntry(
  path: string,
  changeFrequency: Entry["changeFrequency"],
  priority: number,
  images?: string[],
): MetadataRoute.Sitemap {
  const alternates = { languages: languageAlternateUrls(path) };
  return LOCALES.map((locale) => ({
    url: localeUrl(locale, path),
    lastModified: new Date(),
    changeFrequency,
    priority: locale === "en" ? priority : Math.round((priority - 0.1) * 10) / 10,
    alternates,
    ...(images ? { images } : {}),
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...localizedEntry("/", "monthly", 1, SCREENSHOTS),
    ...localizedEntry("/about/", "monthly", 0.7),
    ...localizedEntry("/privacy/", "yearly", 0.3),
    // Local-SEO city landing pages.
    ...CITIES.flatMap((city) => localizedEntry(`/${city.slug}/`, "monthly", 0.8)),
  ];
}
