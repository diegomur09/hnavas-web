import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // The two locales the site ships in. EN is the default and visible
  // differentiator of the brand is being fully bilingual EN/ES.
  locales: ["en", "es"],
  defaultLocale: "en",
  // The default locale is served without a prefix (/denver/), every other
  // locale keeps one (/es/denver/) — the structure Google recommends and the
  // one visitors expect. The static export still emits out/en/** and out/es/**;
  // the CloudFront router (hnavas-web-router) maps the prefix-less URLs onto
  // the /en objects and 301s the legacy /en/* URLs. Keep the two in sync.
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];
