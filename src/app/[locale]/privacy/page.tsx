import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Footer } from "@/components/Footer";
import { SITE } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Privacy" });
  return {
    title: `${t("title")} — ${SITE.name}`,
    alternates: { canonical: `/${locale}/privacy`, languages: { en: "/en/privacy", es: "/es/privacy" } },
  };
}

// Section keys rendered in order (each a heading + body in the message catalog).
const SECTIONS = [
  ["collectTitle", "collectBody"],
  ["useTitle", "useBody"],
  ["storeTitle", "storeBody"],
  ["thirdTitle", "thirdBody"],
  ["retainTitle", "retainBody"],
  ["choicesTitle", "choicesBody"],
  ["contactTitle", "contactBody"],
] as const;

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Privacy");

  return (
    <>
      <main className="mx-auto max-w-3xl px-5 py-20">
        <a href={`/${locale}`} className="text-sm text-brand-300 transition hover:text-brand-400">
          {t("back")}
        </a>

        <h1 className="mt-6 text-3xl font-bold tracking-tight text-primary sm:text-4xl">
          {t("title")}
        </h1>
        <p className="data-mono mt-2 text-xs text-subtle">{t("updated")}</p>
        <p className="mt-6 text-base leading-relaxed text-body">{t("intro")}</p>

        {SECTIONS.map(([titleKey, bodyKey]) => (
          <section key={titleKey} className="mt-8">
            <h2 className="text-lg font-semibold text-primary">{t(titleKey)}</h2>
            <p className="mt-2 text-base leading-relaxed text-body">{t(bodyKey)}</p>
          </section>
        ))}

        <a
          href={`mailto:${SITE.email}`}
          className="data-mono mt-4 inline-block text-sm text-brand-300 transition hover:text-brand-400"
        >
          {SITE.email}
        </a>
      </main>
      <Footer />
    </>
  );
}
