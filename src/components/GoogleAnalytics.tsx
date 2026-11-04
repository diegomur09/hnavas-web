import Script from "next/script";
import { GA_ID } from "@/lib/config";

// Google Analytics 4 via the official gtag.js snippet, loaded after the page
// becomes interactive (next/script "afterInteractive"). Renders nothing when
// NEXT_PUBLIC_GA_ID was not set at build time. GA4's enhanced measurement
// counts client-side navigations on its own, so no route listener is needed.
export function GoogleAnalytics() {
  if (!GA_ID) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
      </Script>
    </>
  );
}
