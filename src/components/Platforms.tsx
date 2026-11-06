import { getTranslations } from "next-intl/server";
import { PLATFORMS, assetUrl } from "@/lib/site";
import { AnimatedSection } from "./AnimatedSection";
import { SectionHeading } from "./Services";

export async function Platforms() {
  const t = await getTranslations("Platforms");

  return (
    <AnimatedSection id="platforms" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-20">
      <SectionHeading eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />

      <ul className="mt-10 flex flex-wrap items-center gap-3 sm:gap-4">
        {PLATFORMS.map((p) => (
          <li key={p.name}>
            {p.logo ? (
              <span className="platform-logo" title={p.name}>
                {/* Brand SVGs are static assets; a plain img avoids next/image
                    SVG config and keeps each logo at its native aspect ratio. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={assetUrl(`/logos/tech/${p.logo}`)}
                  alt={`${p.name} logo`}
                  loading="lazy"
                />
              </span>
            ) : (
              <span className="platform-logo platform-logo--text" title={p.name}>
                {p.name}
              </span>
            )}
          </li>
        ))}
      </ul>
    </AnimatedSection>
  );
}
