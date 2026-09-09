import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { routing } from "@/i18n/routing";
import { SITE, STATS } from "@/lib/site";

export const alt = "HNavas Systems — Custom software, AWS cloud & AI automation in Denver";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Pre-render one image per locale at build time (required for output: export).
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const COPY: Record<string, { role: string; tagline: string }> = {
  en: {
    role: "Full-Stack & Cloud Engineer · Denver, CO",
    tagline: "Custom software, AWS cloud & AI automation",
  },
  es: {
    role: "Ingeniero Full-Stack & Cloud · Denver, CO",
    tagline: "Software a medida, nube AWS y automatización con IA",
  },
};

const STAT_LABELS: Record<string, string> = {
  lambdas: "Lambdas",
  tables: "Tables",
  apis: "APIs",
  years: "Years",
};

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const c = COPY[locale] ?? COPY.en;
  const logo = await readFile(join(process.cwd(), "public/logos/logo-wordmark.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background:
            "radial-gradient(900px 600px at 12% -10%, #0e3a44 0%, transparent 55%), radial-gradient(900px 600px at 110% 120%, #1b1b3a 0%, transparent 55%), #0a0a0f",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={300} height={169} alt={SITE.name} />

        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div style={{ fontSize: "68px", fontWeight: 800, lineHeight: 1.05, maxWidth: "1000px" }}>
            {c.tagline}
          </div>
          <div style={{ fontSize: "30px", color: "#9aa0b4" }}>
            {`${SITE.person} · ${c.role}`}
          </div>
        </div>

        <div style={{ display: "flex", gap: "56px" }}>
          {STATS.map((s) => (
            <div key={s.labelKey} style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: "44px", fontWeight: 800, color: "#67e8f9" }}>
                {s.value}
              </div>
              <div style={{ fontSize: "22px", color: "#9aa0b4" }}>
                {STAT_LABELS[s.labelKey] ?? s.labelKey}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
