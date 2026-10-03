import type { Metadata } from "next";
import { routing } from "@/i18n/routing";

// Local-development fallback for "/".
//
// In production "/" IS the English home: the CloudFront router rewrites it to
// the /en/index.html object, so this file's output is never served. But a
// static export still needs something at the root for `npm run dev` and for any
// host without that router, where the locale segment is the only real route.
//
// It is explicitly noindex: the canonical English home is "/", and the router
// 301s /index.html there, so this page must never compete for it.
const TARGET = `/${routing.defaultLocale}/`;

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function RootRedirectPage() {
  return (
    <html lang={routing.defaultLocale}>
      <head>
        <meta httpEquiv="refresh" content={`0; url=${TARGET}`} />
      </head>
      <body>
        {/* Instant redirect when JS is on; a real link as the no-JS fallback. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `location.replace(${JSON.stringify(TARGET)})`,
          }}
        />
        <noscript>
          <a href={TARGET}>Continue to HNavas Systems</a>
        </noscript>
      </body>
    </html>
  );
}
