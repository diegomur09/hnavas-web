import { routing } from "@/i18n/routing";

// Static-export-friendly root redirect: "/" → "/<defaultLocale>".
// In production a CloudFront Function does this at the edge, but rendering it
// here makes "/" work everywhere else too — `npm run dev`, GitHub Pages, or any
// static host — so the app never 404s at the root.
const TARGET = `/${routing.defaultLocale}`;

export default function RootRedirectPage() {
  return (
    <html lang={routing.defaultLocale}>
      <head>
        <meta httpEquiv="refresh" content={`0; url=${TARGET}`} />
        <link rel="canonical" href={TARGET} />
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
