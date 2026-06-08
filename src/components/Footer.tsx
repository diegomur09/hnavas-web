import { getTranslations } from "next-intl/server";
import { SITE } from "@/lib/site";

export async function Footer() {
  const t = await getTranslations("Footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/6">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-12 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-brand-400 to-brand-600 text-[13px] font-bold text-surface-950">
              H
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
        </div>
      </div>
    </footer>
  );
}
