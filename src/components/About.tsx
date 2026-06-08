import { getTranslations } from "next-intl/server";
import { SITE, STACK } from "@/lib/site";
import { AnimatedSection } from "./AnimatedSection";

export async function About() {
  const t = await getTranslations("About");

  return (
    <AnimatedSection id="about" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-24">
      <div className="grid gap-12 lg:grid-cols-[1fr_0.85fr]">
        {/* Statement */}
        <div>
          <span className="data-mono text-xs uppercase tracking-widest text-brand-400">
            {t("eyebrow")}
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            {t("title")}
          </h2>
          <p className="data-mono mt-2 text-sm text-secondary">{t("role")}</p>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-body">
            {t("body")}
          </p>

          <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/3 px-3 py-1.5 text-xs text-secondary">
            <span className="h-1.5 w-1.5 rounded-full bg-up" />
            {t("differentiator")}
          </p>
        </div>

        {/* Core stack */}
        <div className="glass-card p-7">
          <p className="data-mono text-[11px] uppercase tracking-widest text-subtle">
            {t("stackTitle")}
          </p>

          <div className="mt-5 space-y-5">
            {STACK.map((group) => (
              <div key={group.group}>
                <p className="text-sm font-medium text-primary">{group.group}</p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="data-mono rounded-md border border-white/8 bg-white/3 px-2 py-1 text-[11px] text-secondary"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="mt-6 border-t border-white/6 pt-4 text-xs text-body">
            {SITE.location} · {SITE.languages.join(" / ")}
          </p>
        </div>
      </div>
    </AnimatedSection>
  );
}
