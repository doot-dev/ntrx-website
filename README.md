# NTRX Website

Next.js (App Router, TypeScript, Tailwind 4) site for NTRX — server-rendered landing page
and the enquiries API (Prisma 7 + MySQL).

## Branches

| Branch | Environment | Gets code from |
|---|---|---|
| `dev` | Development — all work lands here first (via feature branches `feat/*`, `fix/*`) | feature branches |
| `uat` | UAT / staging — verified before release | `dev` |
| `main` | Production | `uat` |

Promote by PR only: `feat/*` → `dev` → `uat` → `main`. Never commit to `uat` or `main` directly.

## Run with Docker (default)

```bash
ADMIN_TOKEN=pick-a-secret docker compose up --build   # http://localhost:3000
ADMIN_TOKEN=pick-a-secret npm run check:api           # 5 API checks
docker compose down          # add -v to wipe the local database
```

Compose starts MySQL 8.4 (host port 3307), runs `prisma migrate deploy` once, then the
site. To use a real database, set `DATABASE_URL=mysql://user:pass@host:3306/db` in the
shell or `.env`; the bundled `db` service is then unused.

## Run without Docker

```bash
cp .env.example .env.local   # set DATABASE_URL (e.g. the compose db on 3307) and ADMIN_TOKEN
docker compose up -d db      # or any MySQL 8
npm install                  # also runs `prisma generate`
npm run db:migrate           # apply/create migrations (dev)
npm run dev
npm run lint
npm audit                    # must report 0 vulnerabilities
```

Schema change: edit `prisma/schema.prisma`, run `npm run db:migrate -- --name <what>`,
commit the new folder in `prisma/migrations/`.

## API

| Route | Auth | Does |
|---|---|---|
| `GET /api` | — | health `{ ok: true }` |
| `POST /api/enquiries` | — | `{ name, email, message, company?, interest? }` → 201 row, 422 issues |
| `GET /api/enquiries?limit=50` | `Authorization: Bearer $ADMIN_TOKEN` | newest first, limit 1–200 |

SEO lives in `lib/site.ts` (copy, keywords, URL) and `app/layout.tsx` (metadata).
Generated routes: `/robots.txt`, `/sitemap.xml`, `/manifest.webmanifest`,
`/opengraph-image`, `/twitter-image`, `/icon`.
