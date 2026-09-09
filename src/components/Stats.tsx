import { getTranslations } from "next-intl/server";
import { STATS } from "@/lib/site";
import { AnimatedSection } from "./AnimatedSection";

export async function Stats() {
  const t = await getTranslations("Stats");

  return (
    <AnimatedSection className="relative border-y border-white/6 bg-surface-950/40">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px px-5 py-2 lg:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.labelKey} className="px-2 py-8 text-center lg:text-left">
            <div className="data-mono text-3xl font-semibold text-primary sm:text-4xl">
              {s.value}
            </div>
            <div className="mt-1 text-xs text-body sm:text-sm">
              {t(s.labelKey)}
            </div>
          </div>
        ))}
      </div>
    </AnimatedSection>
  );
}
