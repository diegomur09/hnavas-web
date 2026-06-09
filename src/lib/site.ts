// Single source of truth for brand, stats, services and projects.
// All figures here are backed by the real AWS account + GitHub audit.

export const SITE = {
  name: "HNavas Systems",
  person: "Diego Navas Murcia",
  role: "Full-Stack & Cloud Engineer",
  tagline: "Production AWS apps, AI automation, and software that ships.",
  location: "Denver / Broomfield, CO",
  email: "hnavasystems@gmail.com",
  url: "https://hnavasystems.com",
  // Public Cal.com booking link (same one the AI agent shares).
  calendarUrl: "https://cal.com/diego-navas-murcia-6a7b9n",
  // Bilingual reach is the core differentiator vs generic agencies.
  languages: ["English", "Español"],
} as const;

// Headline numbers — the audited production footprint.
export const STATS = [
  { value: "60+", labelKey: "lambdas" },
  { value: "40", labelKey: "tables" },
  { value: "16", labelKey: "apis" },
  { value: "3", labelKey: "years" },
] as const;

// Platforms / tech logo strip — the tools clients recognize.
// Full-color brand SVGs live in /public/logos/tech (sourced from Devicon, MIT,
// plus Stripe from Simple Icons). Platforms with no official mark fall back to a
// wordmark tile (no `logo`).
export const PLATFORMS: { name: string; logo?: string }[] = [
  { name: "AWS", logo: "aws.svg" },
  { name: "Next.js", logo: "nextjs.svg" },
  { name: "React", logo: "react.svg" },
  { name: "TypeScript", logo: "typescript.svg" },
  { name: "Tailwind CSS", logo: "tailwindcss.svg" },
  { name: "Node.js", logo: "nodejs.svg" },
  { name: "Python", logo: "python.svg" },
  { name: "Stripe", logo: "stripe.svg" },
  { name: "WordPress", logo: "wordpress.svg" },
  { name: "Vercel", logo: "vercel.svg" },
  { name: "GitHub", logo: "github.svg" },
  { name: "Base44" },
  { name: "HTML5", logo: "html5.svg" },
  { name: "CSS3", logo: "css3.svg" },
];

// Image/asset base URL. Empty by default → assets are served locally from
// /public (and, in prod, through the site's own CloudFront, since the static
// export already sits behind it). To serve images from a dedicated CDN later,
// set NEXT_PUBLIC_ASSET_BASE_URL (e.g. "https://cdn.hnavasystems.com") — every
// image reference flows through assetUrl(), so it's a one-variable switch.
// TODO(cloudfront): provision the assets bucket + CloudFront distribution, then
// set NEXT_PUBLIC_ASSET_BASE_URL and run the upload/invalidation steps in TODO.md.
const ASSET_BASE = process.env.NEXT_PUBLIC_ASSET_BASE_URL ?? "";

export function assetUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${ASSET_BASE}${path.startsWith("/") ? path : `/${path}`}`;
}

export type ServiceId =
  | "fullstack"
  | "cloud"
  | "ai"
  | "web"
  | "mobile"
  | "integrations"
  | "seo";

export const SERVICES: { id: ServiceId; icon: string }[] = [
  { id: "fullstack", icon: "layers" },
  { id: "cloud", icon: "cloud" },
  { id: "ai", icon: "sparkles" },
  { id: "web", icon: "gauge" },
  { id: "mobile", icon: "smartphone" },
  { id: "integrations", icon: "plug" },
  { id: "seo", icon: "search" },
];

export type Project = {
  slug: string;
  // Content (title, summary, problem, etc.) lives in the message catalogs,
  // keyed by slug, so it can be authored in both EN and ES.
  liveUrl?: string;
  featured: boolean;
  year: string;
  stack: string[];
  metrics: { value: string; labelKey: string }[];
  // Brand logo in /public/logos, pulled from each project's real repo/site.
  // `logoWide` marks horizontal lockups so cards can render them full-width
  // instead of squeezing them into a square tile.
  logo?: string;
  logoWide?: boolean;
};

export const PROJECTS: Project[] = [
  // ---- Featured: the four headline case studies ----
  {
    slug: "scoreflow",
    liveUrl: "https://myscoreflow.com",
    featured: true,
    year: "2026",
    logo: "/logos/scoreflow.webp",
    logoWide: true,
    stack: ["Next.js 16", "React 19", "FastAPI", "AWS CDK", "DynamoDB", "WebSocket", "Cognito"],
    metrics: [
      { value: "21", labelKey: "competitors" },
      { value: "9", labelKey: "judges" },
      { value: "135", labelKey: "scores" },
    ],
  },
  {
    slug: "dynamic-bachata",
    liveUrl: "https://dynamicbachata.com",
    featured: true,
    year: "2025",
    logo: "/logos/dynamic-bachata.webp",
    stack: ["Next.js", "AWS Lambda", "DynamoDB", "Square", "SES", "CloudFront", "Zod"],
    metrics: [
      { value: "$51K", labelKey: "processed" },
      { value: "200+", labelKey: "customers" },
      { value: "864", labelKey: "transactions" },
    ],
  },
  {
    slug: "sky-weekender",
    liveUrl: "https://sky.dynamicbachata.com",
    featured: true,
    year: "2026",
    logo: "/logos/sky-weekender.webp",
    stack: ["Next.js 16", "Stripe", "AWS Lambda", "DynamoDB", "CloudFront", "Framer Motion"],
    metrics: [
      { value: "~45%", labelKey: "conversion" },
      { value: "3-day", labelKey: "event" },
      { value: "Prod+QA", labelKey: "environments" },
    ],
  },
  {
    slug: "email-campaigns",
    liveUrl: "https://emails.dynamicbachata.com",
    featured: true,
    year: "2026",
    logo: "/logos/email-campaigns.webp",
    stack: ["React 18", "Vite", "AWS Lambda", "DynamoDB", "SES", "Cognito", "OpenRouter AI", "Amplify"],
    metrics: [
      { value: "AI", labelKey: "campaigns" },
      { value: "Bulk", labelKey: "delivery" },
      { value: "Prod+QA", labelKey: "environments" },
    ],
  },
  // ---- More work: the wider sample shown in a compact strip ----
  {
    slug: "bachata-crm",
    liveUrl: "https://app.hnavasystems.com",
    featured: false,
    year: "2026",
    stack: ["Next.js", "AWS Lambda", "Claude Haiku", "DynamoDB", "SES", "EventBridge", "Cognito"],
    metrics: [
      { value: "Daily", labelKey: "cron" },
      { value: "14-28d", labelKey: "atRisk" },
      { value: "AI", labelKey: "personalized" },
    ],
  },
  {
    slug: "petary",
    liveUrl: "https://mypetary.com",
    featured: false,
    year: "2026",
    logo: "/logos/petary.webp",
    stack: ["Next.js 15", "FastAPI", "Lambda", "DynamoDB", "Stripe", "next-intl"],
    metrics: [
      { value: "Amazon", labelKey: "affiliate" },
      { value: "Men's", labelKey: "category" },
      { value: "EN/ES", labelKey: "bilingual" },
    ],
  },
  {
    slug: "ccc-field-app",
    featured: false,
    year: "2025",
    stack: ["AppSheet", "Google Sheets", "Apps Script", "Automated PDF"],
    metrics: [
      { value: "100+", labelKey: "properties" },
      { value: "No-code", labelKey: "platform" },
      { value: "Auto", labelKey: "pdf" },
    ],
  },
  {
    slug: "drilled-pier",
    featured: false,
    year: "2026",
    stack: ["Expo / React Native", "AWS Lambda", "GitHub Actions"],
    metrics: [
      { value: "Mobile", labelKey: "field" },
      { value: "Auto", labelKey: "pdf" },
      { value: "CI/CD", labelKey: "pipeline" },
    ],
  },
  {
    slug: "luxury-rides",
    liveUrl: "https://luxuryridesdenver.com",
    featured: false,
    year: "2025",
    logo: "/logos/luxury-rides.webp",
    stack: ["Base44", "Low-code"],
    metrics: [
      { value: "Low-code", labelKey: "platform" },
      { value: "Fast", labelKey: "delivery" },
    ],
  },
  {
    slug: "baychata",
    liveUrl: "https://baychatafestival.com",
    featured: false,
    year: "2025",
    logo: "/logos/baychata.webp",
    logoWide: true,
    stack: ["WordPress", "PHP", "Plugins", "Core Web Vitals"],
    metrics: [
      { value: "WordPress", labelKey: "platform" },
      { value: "LCP", labelKey: "performance" },
      { value: "Redesign", labelKey: "scope" },
    ],
  },
];

export const MORE_PROJECTS = PROJECTS.filter((p) => !p.featured);

export const FEATURED_PROJECTS = PROJECTS.filter((p) => p.featured);

// Core stack shown in the About section — grouped the way clients think about
// it (where it runs, how it's built, what powers the AI).
export const STACK: { group: string; items: string[] }[] = [
  { group: "Frontend", items: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS"] },
  { group: "Backend", items: ["FastAPI", "Python", "Node.js", "REST + WebSocket"] },
  { group: "Cloud / AWS", items: ["Lambda", "DynamoDB", "API Gateway", "S3 + CloudFront", "Cognito", "SES", "CDK"] },
  { group: "AI", items: ["Claude API", "OpenAI API", "EventBridge automation"] },
];

export const LOCALES = ["en", "es"] as const;
