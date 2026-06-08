# HNavas Systems — Web (`hnavas-web`)

Bilingual (EN / ES) marketing site for **HNavas Systems**, the studio of Diego
Navas Murcia — a full-stack & cloud engineer in Denver, CO. A fast, static
Next.js 16 site with an AI chat agent, a real project portfolio, and full
technical SEO.

## Links

| | |
|---|---|
| Production site | `https://hnavasystems.com` *(CloudFront — coming soon)* |
| Frontend repo | https://github.com/diegomur09/hnavas-web |
| Backend / API repo | https://github.com/diegomur09/hnavas-api |
| API (QA) | `https://tfpo7fqoszogi2qtznsxuhblb40kmyzt.lambda-url.us-east-1.on.aws` |
| API (Production) | `https://vvbwtcwlds3irp4ubw2b4cumaq0oumrl.lambda-url.us-east-1.on.aws` |

## What it does

- **Bilingual EN/ES** (next-intl) — `/en` and `/es` are both real, indexable routes.
- **AI chat agent** in the hero — talks to the backend API; falls back to built-in
  demo replies if the backend is offline.
- **Project portfolio** with real brand logos + metrics, services, and a contact form.
- **Technical SEO** — sitemap, robots, web manifest, per-locale Open Graph images,
  and JSON-LD structured data (Person + ProfessionalService).

## System design

**Runtime architecture**

```
                       Visitor (browser)
                        │              │
            static page │              │ JSON: POST /chat, /contact
              requests   │              │
                         ▼              ▼
          ┌────────────────────┐   ┌──────────────────────────────┐
          │  CloudFront (CDN)  │   │  Lambda Function URL          │
          │        │           │   │  hnavas-api (Node + Express)  │
          │        ▼           │   │        │                      │
          │  S3 (static site)  │   │        ▼                      │
          │  Next.js export    │   │  OpenAI API (gpt-4o-mini)     │
          └────────────────────┘   └──────────────────────────────┘
          a CloudFront Function       🔑 the API key lives ONLY in the
          redirects /  →  /en         Lambda environment (never here)
```

**CI/CD (GitHub Actions + OIDC — no AWS keys stored in GitHub)**

```
  git push ──┬── qa ───▶ GitHub Actions ──OIDC──▶ AWS ──▶ QA environment
             └── main ─▶ GitHub Actions ──OIDC──▶ AWS ──▶ Production

  frontend:  build  →  S3 sync  →  CloudFront invalidation
  backend:   package →  lambda update-function-code
```

## Tech stack

Next.js 16 (App Router, static export) · React 19 · TypeScript · Tailwind CSS v4 ·
next-intl · Framer Motion. Hosted on **AWS S3 + CloudFront**, deployed by **GitHub
Actions** via OIDC.

## Environments

Branch-based: `main` = production, `qa` = testing. See [ENVIRONMENTS.md](./ENVIRONMENTS.md).

## Local development

```bash
npm install
cp .env.example .env.local      # set NEXT_PUBLIC_AGENT_URL (e.g. http://localhost:3001)
npm run dev                     # http://localhost:3000
```

Leave `NEXT_PUBLIC_AGENT_URL` unset to run the chat in built-in demo mode (no backend).

> This is a frontend — everything here ships to the browser, so it contains **no
> secrets**. The only environment value is `NEXT_PUBLIC_AGENT_URL`, which is just
> the public address of the API. All secret keys live in the backend.
