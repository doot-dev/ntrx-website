# NTRX Website

Next.js (App Router, TypeScript, Tailwind 4) site for NTRX — server-rendered landing page
and, from Phase 4, the API.

## Branches

| Branch | Environment | Gets code from |
|---|---|---|
| `dev` | Development — all work lands here first (via feature branches `feat/*`, `fix/*`) | feature branches |
| `uat` | UAT / staging — verified before release | `dev` |
| `main` | Production | `uat` |

Promote by PR only: `feat/*` → `dev` → `uat` → `main`. Never commit to `uat` or `main` directly.

```bash
cp .env.example .env.local   # NEXT_PUBLIC_SITE_URL
npm install
npm run dev                  # http://localhost:3000
npm run build && npm start   # production
npm run lint
npm audit                    # must report 0 vulnerabilities
```

SEO lives in `lib/site.ts` (copy, keywords, URL) and `app/layout.tsx` (metadata).
Generated routes: `/robots.txt`, `/sitemap.xml`, `/manifest.webmanifest`,
`/opengraph-image`, `/twitter-image`, `/icon`.
