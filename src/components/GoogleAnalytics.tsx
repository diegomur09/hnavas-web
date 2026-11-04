import Script from "next/script";
import { GOOGLE_TAG_ID } from "@/lib/config";

// Google Analytics through the Google tag, loaded after the page becomes
// interactive (next/script "afterInteractive"). Renders nothing when
// NEXT_PUBLIC_GOOGLE_TAG_ID was not set at build time. A GTM-... ID uses the
// install snippet Google gives for that container (gtm.js plus gtag('js'));
// a plain G-... ID uses gtag.js with a config call. GA4's enhanced
// measurement counts client-side navigations on its own.
export function GoogleAnalytics() {
  if (!GOOGLE_TAG_ID) return null;
  const isContainer = GOOGLE_TAG_ID.startsWith("GTM-");
  const src = isContainer
    ? `https://www.googletagmanager.com/gtm.js?id=${GOOGLE_TAG_ID}`
    : `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_TAG_ID}`;
  return (
    <>
      <Script id="google-tag-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());${isContainer ? "" : `\ngtag('config', '${GOOGLE_TAG_ID}');`}`}
      </Script>
      <Script src={src} strategy="afterInteractive" />
    </>
  );
}
