# Security Audit — NTRX Website

Date: 2026-11-07. Scope: this repo (Next.js 16 site + `/api/enquiries`, Prisma 7, MySQL on
Hostinger, Vercel target). Checklist from the Notion "Web Application Security" page.
Statuses: PASS, PARTIAL, FAIL, NOT VERIFIED, N/A.

## Summary

Small attack surface: one static page, one public write endpoint, one admin read endpoint,
no user accounts, no uploads, no cookies. Found and fixed in this pass: plaintext DB
connection, oversized DB pool, missing CSP/HSTS, no rate limit. Open: weak DB password
(owner action), privacy notice before any form goes live (DPDP).

| Severity | Found | Fixed | Open |
|---|---|---|---|
| High | 2 | 1 | 1 |
| Medium | 3 | 3 | 0 |
| Low | 2 | 0 | 2 |

## Architecture and trust boundaries

- `/` and SEO routes: static, prerendered, no user input.
- `POST /api/enquiries`: public. Writes name, company, email, interest, message (personal data).
- `GET /api/enquiries`: admin. Bearer `ADMIN_TOKEN`, compared in constant time.
- `GET /api`: health, no data.
- DB: Hostinger MariaDB 11.8, user `@'%'` (any host), `ALL` on its own DB only,
  50 open / 500 per hour connection caps.

## Findings

| # | Area | Item | Status | Severity | Evidence | Action |
|---|---|---|---|---|---|---|
| 1 | F Secrets | DB password is short and dictionary-like, and was shared in chat; DB user accepts any host | **FAIL** | High | Grants show `@'%'`; Vercel needs any-host | **Owner:** rotate to a 24+ char random password in hPanel, update `DATABASE_URL` |
| 2 | H Data | DB connection was unencrypted over the internet | Fixed, PASS | High | `?ssl=true&sslaccept=strict` in `DATABASE_URL`; cert verified against Node CA store, TLS 1.3 | Keep both params in every env |
| 3 | E API | No rate limit on public POST | Fixed, PARTIAL | Medium | `app/api/enquiries/route.ts` 5 per 10 min per IP, 429 verified | Per instance only. Add Vercel WAF rate-limit rule on `/api/enquiries` |
| 4 | D Browser | No Content-Security-Policy / HSTS | Fixed, PARTIAL | Medium | `next.config.ts`; page verified with zero CSP violations | `script-src 'unsafe-inline'` remains (Next inline RSC payload). Nonces would make every page dynamic |
| 5 | J Infra | Driver pool of 10 per serverless instance would exhaust 500 conn/hour | Fixed, PASS | Medium | `lib/db.ts` defaults `connectionLimit=2` | Watch Hostinger limits if traffic grows |
| 6 | E API | No bot/spam protection beyond rate limit | Open | Low | — | Add honeypot field or Turnstile when a form is built |
| 7 | H Data | No retention/deletion for enquiries (DPDP) | Open | Low | — | Decide period before collecting; see Notion DPDP checklist |

## Checklist

| Area | Item | Status | Notes |
|---|---|---|---|
| A Auth | Passwords, sessions, cookies | N/A | No user accounts or cookies |
| B Access | Admin route | PASS | 401 without/with wrong token (`scripts/check-api.mjs`); unset token = locked |
| B Access | BOLA / IDOR | N/A | No per-user objects |
| C Input | Body validation | PASS | Type + length per field, email shape, trims; 422 with issues |
| C Input | SQL injection | PASS | Prisma parameterised queries only; no raw SQL |
| C Input | XSS | PASS | No user content rendered; JSON-LD escapes `<` |
| D Browser | CSP | PARTIAL | Finding 4 |
| D Browser | HSTS, nosniff, frame DENY, referrer, permissions | PASS | `next.config.ts`; `X-Powered-By` off |
| D Browser | CSRF | N/A | No cookies or sessions to ride |
| D Browser | CORS | PASS | None set: same-origin only |
| E API | Rate limit | PARTIAL | Finding 3 |
| E API | Body / page size limits | PASS | 16 KB body (413), `limit` 1–200 |
| E API | Error leakage | PASS | Fixed messages; DB errors become generic 500 |
| F Secrets | `.env` in git | PASS | `.env*` ignored, `.dockerignore` too; only `.env.example` tracked |
| F Secrets | Secrets in client bundle | PASS | Only `NEXT_PUBLIC_SITE_URL` is public |
| F Secrets | DB password strength | FAIL | Finding 1 |
| G Uploads | — | N/A | None |
| H Data | Encryption in transit | PASS | Finding 2 |
| H Data | Least privilege | PARTIAL | User has `ALL` on its DB (Hostinger default). App needs only SELECT/INSERT; migrations need DDL |
| H Data | Backups | NOT VERIFIED | Hostinger plan backups; confirm in hPanel |
| I Logs | PII / secrets in logs | PASS | App logs nothing; no request bodies logged |
| I Logs | Monitoring / alerting | NOT VERIFIED | Use Vercel logs + uptime check on `/api` |
| J Deps | Vulnerabilities | PASS | `npm audit`: 0 (2026-11-07) |
| J Deps | Lockfile, install scripts | PASS | `package-lock.json`; only Prisma install scripts allow-listed |
| J Deps | Source maps | PASS | Next default: no browser source maps in production |
| K Logic | Duplicate submissions | PARTIAL | Rate limit only; acceptable for an enquiry box |
| L Tests | Auth + validation tests | PASS | `npm run check:api` (5 checks) |

## Verified on 2026-11-07

Production build against the Hostinger DB over TLS: `check:api` 5/5, 6th rapid POST
returned 429, all SEO routes 200, headers present, browser console clean. Test rows deleted.

This does not prove the site is secure; it covers the items above.
