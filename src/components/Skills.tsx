import { getTranslations } from "next-intl/server";
import { SKILLS } from "@/lib/site";
import { AnimatedSection } from "./AnimatedSection";
import { ServiceIcon } from "./icons";
import { SectionHeading } from "./Services";

export async function Skills() {
  const t = await getTranslations("Skills");

  return (
    <AnimatedSection id="skills" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-24">
      <SectionHeading eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SKILLS.map((s, i) => (
          <div
            key={s.id}
            // A lone card on the last row of the 3-column grid spans the row instead.
            className={`glass-card glass-card-hover flex flex-col p-6 ${
              SKILLS.length % 3 === 1 && i === SKILLS.length - 1 ? "lg:col-span-3" : ""
            }`}
          >
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/12 text-brand-300">
              <ServiceIcon name={s.icon} />
            </div>
            <h3 className="text-base font-semibold text-primary">{t(`${s.id}.title`)}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-body">{t(`${s.id}.desc`)}</p>
            <ul className="mt-4 flex flex-wrap gap-2 border-t border-white/6 pt-4">
              {s.items.map((item) => (
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
    </AnimatedSection>
  );
}
