import { getTranslations } from "next-intl/server";
import { AnimatedSection } from "./AnimatedSection";
import { SectionHeading } from "./Services";

type QA = { q: string; a: string };

// FAQ section. Uses native <details>/<summary> so it works without client JS
// (good for a static export) and stays accessible. Emits FAQPage JSON-LD so the
// questions can show as rich results in Google.
export async function Faq() {
  const t = await getTranslations("Faq");
  const items = t.raw("items") as QA[];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <AnimatedSection id="faq" className="mx-auto max-w-3xl scroll-mt-20 px-5 py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />

      <div className="mt-10 space-y-3">
        {items.map((item) => (
          <details key={item.q} className="glass-card group p-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-primary">
              {item.q}
              <span className="text-secondary transition-transform group-open:rotate-45" aria-hidden="true">
                +
              </span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-body">{item.a}</p>
          </details>
        ))}
      </div>
    </AnimatedSection>
  );
}
