import { getTranslations } from "next-intl/server";
import { FEATURED_PROJECTS, MORE_PROJECTS, assetUrl, getScreenshotUrl, type Project } from "@/lib/site";
import { AnimatedSection } from "./AnimatedSection";
import { SectionHeading } from "./Services";

// External-link glyph, inline so we keep the zero-icon-dependency rule.
function ArrowUpRight() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export async function Work() {
  const t = await getTranslations("Work");
  const tProjects = await getTranslations("Projects");

  const [lead, ...rest] = FEATURED_PROJECTS;

  return (
    <AnimatedSection id="work" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-24">
      <SectionHeading eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />

      <div className="mt-12 space-y-4">
        {/* Lead case study — full width, with the problem → architecture → result story */}
        <LeadCard project={lead} t={t} tProjects={tProjects} />

        {/* Remaining featured projects — full-width rows: text left, screenshot right */}
        <div className="grid gap-4">
          {rest.map((p) => (
            <CompactCard key={p.slug} project={p} t={t} tProjects={tProjects} />
          ))}
        </div>
      </div>

      {/* More work — wider sample in a tighter grid */}
      <div className="mt-16">
        <h3 className="text-lg font-semibold text-primary">{t("more")}</h3>
        <p className="mt-1 text-sm text-body">{t("moreSubtitle")}</p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MORE_PROJECTS.map((p) => (
            <MiniCard key={p.slug} project={p} t={t} tProjects={tProjects} />
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

type Tr = Awaited<ReturnType<typeof getTranslations>>;

function StackTags({ stack }: { stack: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {stack.map((s) => (
        <li
          key={s}
          className="data-mono rounded-md border border-white/8 bg-white/3 px-2 py-1 text-[11px] text-secondary"
        >
          {s}
        </li>
      ))}
    </ul>
  );
}

function Metrics({ project, tProjects }: { project: Project; tProjects: Tr }) {
  return (
    <div className="flex flex-wrap gap-x-8 gap-y-3">
      {project.metrics.map((m) => (
        <div key={m.labelKey}>
          <div className="data-mono text-xl font-semibold text-primary">{m.value}</div>
          <div className="text-[11px] text-body">
            {tProjects(`${project.slug}.metrics.${m.labelKey}`)}
          </div>
        </div>
      ))}
    </div>
  );
}

function LiveLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-300 transition hover:text-brand-400"
    >
      {label}
      <ArrowUpRight />
    </a>
  );
}

// Project preview in a subtle browser-style frame. Lazy-loaded + explicit
// dimensions so it never hurts LCP/CLS (the cards sit below the fold).
function ScreenshotFrame({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-surface-850 shadow-[0_18px_50px_-24px_rgba(0,0,0,0.8)]">
      <div className="flex items-center gap-1.5 border-b border-white/8 bg-white/4 px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="h-2 w-2 rounded-full bg-white/15" />
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={`${alt} — screenshot`}
        width={900}
        height={560}
        loading="lazy"
        decoding="async"
        className="block h-auto w-full"
      />
    </div>
  );
}

// Brand mark for a project. Wide lockups (e.g. ScoreFlow) render on a white
// pill; square marks on a white tile; logo-less projects fall back to a
// monogram so every card still has a consistent leading badge.
function ProjectLogo({
  project,
  alt,
  fallback,
  size = "md",
}: {
  project: Project;
  alt: string;
  fallback?: string;
  size?: "sm" | "md";
}) {
  if (project.logo && project.logoWide) {
    return (
      <span className="inline-flex w-fit items-center rounded-xl bg-white px-4 py-3 shadow-sm">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={assetUrl(project.logo)} alt={alt} className="h-16 w-auto sm:h-20" loading="lazy" />
      </span>
    );
  }

  const tile = size === "sm" ? "h-10 w-10" : "h-12 w-12";

  if (project.logo) {
    return (
      <span className={`grid ${tile} shrink-0 place-items-center overflow-hidden rounded-xl bg-white`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={assetUrl(project.logo)} alt={alt} className="h-full w-full object-contain p-1.5" loading="lazy" />
      </span>
    );
  }

  if (fallback) {
    return (
      <span
        className={`grid ${tile} shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand-400/20 to-violet-500/20 text-base font-bold text-brand-200`}
        aria-hidden="true"
      >
        {fallback}
      </span>
    );
  }

  return null;
}

function LeadCard({ project, t, tProjects }: { project: Project; t: Tr; tProjects: Tr }) {
  return (
    <article className="glass-card glass-card-hover grid gap-8 p-7 lg:grid-cols-[1.1fr_0.9fr] lg:p-9">
      <div>
        {project.logo && (
          <div className="mb-5">
            <ProjectLogo project={project} alt={tProjects(`${project.slug}.title`)} />
          </div>
        )}

        <div className="flex items-center gap-3">
          <span className="data-mono text-xs uppercase tracking-widest text-brand-400">
            {tProjects(`${project.slug}.category`)}
          </span>
          <span className="data-mono text-xs text-subtle">{project.year}</span>
        </div>

        <h3 className="mt-3 text-2xl font-bold tracking-tight text-primary sm:text-3xl">
          {tProjects(`${project.slug}.title`)}
        </h3>

        <p className="mt-3 text-base leading-relaxed text-body">
          {tProjects(`${project.slug}.summary`)}
        </p>

        <div className="mt-6 space-y-4">
          <Detail label={t("problem")} body={tProjects(`${project.slug}.problem`)} />
          <Detail label={t("architecture")} body={tProjects(`${project.slug}.architecture`)} />
          <Detail label={t("result")} body={tProjects(`${project.slug}.result`)} />
        </div>
      </div>

      <div className="flex flex-col gap-6 lg:border-l lg:border-white/6 lg:pl-8">
        {getScreenshotUrl(project.slug) && (
          <ScreenshotFrame src={getScreenshotUrl(project.slug)!} alt={tProjects(`${project.slug}.title`)} />
        )}
        <Metrics project={project} tProjects={tProjects} />

        <div>
          <p className="data-mono mb-2 text-[11px] uppercase tracking-widest text-subtle">
            {t("stack")}
          </p>
          <StackTags stack={project.stack} />
        </div>

        {project.liveUrl && (
          <div className="mt-auto pt-2">
            <LiveLink href={project.liveUrl} label={t("viewLive")} />
          </div>
        )}
      </div>
    </article>
  );
}

function Detail({ label, body }: { label: string; body: string }) {
  return (
    <div>
      <p className="data-mono text-[11px] uppercase tracking-widest text-brand-400/80">
        {label}
      </p>
      <p className="mt-1 text-sm leading-relaxed text-secondary">{body}</p>
    </div>
  );
}

function CompactCard({ project, t, tProjects }: { project: Project; t: Tr; tProjects: Tr }) {
  const screenshot = getScreenshotUrl(project.slug);
  return (
    <article className="glass-card glass-card-hover flex flex-col gap-6 p-6 md:flex-row md:items-start">
      {/* Left: the story */}
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start gap-3.5">
          <ProjectLogo project={project} alt={tProjects(`${project.slug}.title`)} />
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <span className="data-mono text-xs uppercase tracking-widest text-brand-400">
                {tProjects(`${project.slug}.category`)}
              </span>
              <span className="data-mono text-xs text-subtle">{project.year}</span>
            </div>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              {tProjects(`${project.slug}.title`)}
            </h3>
          </div>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-body">
          {tProjects(`${project.slug}.summary`)}
        </p>

        <div className="mt-5">
          <Metrics project={project} tProjects={tProjects} />
        </div>

        <div className="mt-5">
          <StackTags stack={project.stack} />
        </div>

        {project.liveUrl && (
          <div className="mt-5 pt-1">
            <LiveLink href={project.liveUrl} label={t("viewLive")} />
          </div>
        )}
      </div>

      {/* Right: the screenshot */}
      {screenshot && (
        <div className="md:w-[42%] md:shrink-0">
          <ScreenshotFrame src={screenshot} alt={tProjects(`${project.slug}.title`)} />
        </div>
      )}
    </article>
  );
}

function MiniCard({ project, t, tProjects }: { project: Project; t: Tr; tProjects: Tr }) {
  const title = tProjects(`${project.slug}.title`);
  // Wide transparent lockups (e.g. Baychata) read better as a banner on the
  // dark card than squeezed into the small square tile.
  const wide = project.logo && project.logoWide;

  const screenshot = getScreenshotUrl(project.slug);

  return (
    <article className="glass-card glass-card-hover flex flex-col p-5">
      {screenshot && (
        <div className="mb-4">
          <ScreenshotFrame src={screenshot} alt={title} />
        </div>
      )}
      {wide ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={assetUrl(project.logo!)} alt={title} className="mb-3 h-11 w-auto self-start" loading="lazy" />
          <span className="data-mono text-[11px] uppercase tracking-widest text-brand-400">
            {tProjects(`${project.slug}.category`)}
          </span>
          <h4 className="mt-0.5 text-base font-semibold text-primary">{title}</h4>
        </>
      ) : (
        <div className="flex items-start gap-3">
          <ProjectLogo
            project={project}
            alt={title}
            fallback={title.charAt(0)}
            size="sm"
          />
          <div className="min-w-0">
            <span className="data-mono text-[11px] uppercase tracking-widest text-brand-400">
              {tProjects(`${project.slug}.category`)}
            </span>
            <h4 className="mt-0.5 text-base font-semibold text-primary">{title}</h4>
          </div>
        </div>
      )}

      <p className="mt-3 flex-1 text-sm leading-relaxed text-body">
        {tProjects(`${project.slug}.summary`)}
      </p>

      <div className="mt-4 flex items-center justify-between gap-3">
        <span className="data-mono text-[11px] text-subtle">{project.stack[0]}</span>
        {project.liveUrl && <LiveLink href={project.liveUrl} label={t("viewLive")} />}
      </div>
    </article>
  );
}
