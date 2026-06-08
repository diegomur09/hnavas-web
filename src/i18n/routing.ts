import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // The two locales the site ships in. EN is the default and visible
  // differentiator of the brand is being fully bilingual EN/ES.
  locales: ["en", "es"],
  defaultLocale: "en",
  // Always prefix the locale so /en and /es are both real, indexable URLs.
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];
