# Environments — hnavas-web

Branch-based, two isolated environments.

| Branch | Environment | URL                       | Talks to backend            |
|--------|-------------|---------------------------|-----------------------------|
| `qa`   | QA / testing | `qa.hnavasystems.com`     | `hnavas-api` **QA** Lambda  |
| `main` | Production   | `hnavasystems.com`        | `hnavas-api` **prod** Lambda |

**Flow:** push to `qa` → deploys to the QA site → test. When it works,
merge `qa` → `main` → deploys to production.

## Environment variables

Only **non-secret** values (this is a frontend — everything here ships to the
browser). The one var that changes per environment:

| Variable                | QA build                          | Prod build                       |
|-------------------------|-----------------------------------|----------------------------------|
| `NEXT_PUBLIC_AGENT_URL` | QA backend Function URL           | prod backend Function URL        |

Set it per environment in CI (GitHub → repo → Settings → Environments →
`qa` / `production` → Variables). For local dev, copy `.env.example` to
`.env.local` and point it at your local backend (`http://localhost:3001`).

> No API keys ever live here. Secrets stay in the `hnavas-api` Lambda env.
