import { SITE } from "@/lib/site";
import { routing } from "./routing";

// Single source of truth for public URLs. The default locale is served
// prefix-less, so `/about/` is English and `/es/about/` is Spanish. Everything
// that emits a URL (canonical, hreflang, OpenGraph, sitemap, in-page links)
// goes through here so the metadata can never drift from what the edge serves.

/** Public path for `path` in `locale`, e.g. ("es", "/denver/") → "/es/denver/". */
export function localePath(locale: string, path = "/"): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (locale === routing.defaultLocale) return clean;
  return clean === "/" ? `/${locale}/` : `/${locale}${clean}`;
}

/** Absolute URL — for OpenGraph and the sitemap, which can't use relative paths. */
export function localeUrl(locale: string, path = "/"): string {
  return `${SITE.url}${localePath(locale, path)}`;
}

/**
 * hreflang map for `alternates.languages`. Includes `x-default` pointing at the
 * default locale, which is what Google serves to searchers it can't match to
 * either language.
 */
export function languageAlternates(path = "/"): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const locale of routing.locales) languages[locale] = localePath(locale, path);
  languages["x-default"] = localePath(routing.defaultLocale, path);
  return languages;
}

/**
 * Same map as `languageAlternates`, but absolute — the sitemap needs full URLs
 * where page metadata is happy with paths.
 */
export function languageAlternateUrls(path = "/"): Record<string, string> {
  return Object.fromEntries(
    Object.entries(languageAlternates(path)).map(([key, value]) => [
      key,
      `${SITE.url}${value}`,
    ]),
  );
}
