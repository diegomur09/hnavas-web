import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { SITE, assetUrl } from "@/lib/site";
import { CITIES } from "@/lib/cities";

export async function Footer() {
  const t = await getTranslations("Footer");
  const tc = await getTranslations("City");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/6">
      {/* Areas served — internal links to the local-SEO city pages. */}
      <div className="mx-auto max-w-6xl px-5 pt-12">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-secondary">
          {tc("areasLabel")}
        </h2>
        <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
          {CITIES.map((city) => (
            <li key={city.slug}>
              <Link
                href={`/${city.slug}`}
                className="text-sm text-body transition hover:text-brand-300"
              >
                {city.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="mx-auto mt-10 flex max-w-6xl flex-col gap-6 border-t border-white/6 px-5 py-12 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center overflow-hidden rounded-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={assetUrl("/logos/logo-mark.png")} alt={`${SITE.name} logo`} className="h-full w-full object-cover" />
            </span>
            <span className="text-sm font-semibold tracking-tight text-primary">
              {SITE.name}
            </span>
          </div>
          <p className="mt-3 text-xs text-body">{t("tagline")}</p>
        </div>

        <div className="text-xs text-subtle sm:text-right">
          <a
            href={`mailto:${SITE.email}`}
            className="data-mono text-secondary transition hover:text-brand-300"
          >
            {SITE.email}
          </a>
          <p className="mt-2">
            © {year} {SITE.name}. {t("rights")}
          </p>
          <p className="mt-1">{t("built")}</p>
          <Link
            href="/privacy"
            className="mt-1 inline-block text-secondary transition hover:text-brand-300"
          >
            {t("privacy")}
          </Link>
        </div>
      </div>
    </footer>
  );
}
