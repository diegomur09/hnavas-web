"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useTransition } from "react";

// Swaps between EN and ES while preserving the current path.
export function LocaleSwitch() {
  const t = useTranslations("Nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const next = locale === "en" ? "es" : "en";

  return (
    <button
      onClick={() =>
        startTransition(() => router.replace(pathname, { locale: next }))
      }
      disabled={isPending}
      className="data-mono text-xs px-3 py-1.5 rounded-lg border border-white/14 text-secondary hover:text-primary hover:border-white/30 transition disabled:opacity-50"
      aria-label={t("switchTo")}
    >
      {next.toUpperCase()}
    </button>
  );
}
