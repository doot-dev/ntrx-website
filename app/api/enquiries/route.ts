import { createHash, timingSafeEqual } from "node:crypto";
import { db } from "@/lib/db";
import type { Enquiry } from "@/generated/prisma/client";

type Field = { min?: number; max: number; fallback?: string };
type Key = "name" | "company" | "email" | "interest" | "message";

// Same limits as the old Pydantic EnquiryCreate.
const FIELDS: Record<Key, Field> = {
  name: { min: 1, max: 120 },
  company: { max: 160, fallback: "" },
  email: { min: 3, max: 254 },
  interest: { max: 60, fallback: "general" },
  message: { min: 1, max: 4000 },
};
// ponytail: shape check only, like most forms; a real address check means sending mail
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_BODY = 16_000;

type Issue = { field: string; message: string };

function parse(body: unknown): { data: Record<Key, string> } | { issues: Issue[] } {
  const input = body && typeof body === "object" ? (body as Record<string, unknown>) : {};
  const data = {} as Record<Key, string>;
  const issues: Issue[] = [];
  for (const [field, { min = 0, max, fallback }] of Object.entries(FIELDS) as [Key, Field][]) {
    const raw = input[field] ?? fallback;
    if (typeof raw !== "string") {
      issues.push({ field, message: "must be a string" });
      continue;
    }
    data[field] = raw.trim();
    if (data[field].length < min || data[field].length > max) {
      issues.push({ field, message: `must be ${min}-${max} characters` });
    }
  }
  if (data.email && !EMAIL.test(data.email)) issues.push({ field: "email", message: "invalid email" });
  return issues.length ? { issues } : { data };
}

const toJson = ({ createdAt, ...rest }: Enquiry) => ({ ...rest, created_at: createdAt.toISOString() });

export async function POST(request: Request) {
  const text = await request.text();
  if (text.length > MAX_BODY) return Response.json({ error: "body too large" }, { status: 413 });

  let body: unknown;
  try {
    body = JSON.parse(text);
  } catch {
    return Response.json({ error: "invalid JSON" }, { status: 400 });
  }

  const result = parse(body);
  if ("issues" in result) return Response.json({ issues: result.issues }, { status: 422 });

  const enquiry = await db.enquiry.create({ data: result.data });
  return Response.json(toJson(enquiry), { status: 201 });
}

const digest = (s: string) => createHash("sha256").update(s).digest();

// The old FastAPI GET was public and leaked every submitter's email. Admin-only now;
// with ADMIN_TOKEN unset nobody can read.
function isAdmin(request: Request) {
  const token = process.env.ADMIN_TOKEN;
  const given = request.headers.get("authorization")?.replace(/^Bearer /, "");
  return Boolean(token && given && timingSafeEqual(digest(token), digest(given)));
}

export async function GET(request: Request) {
  if (!isAdmin(request)) return Response.json({ error: "unauthorized" }, { status: 401 });

  const asked = Number(new URL(request.url).searchParams.get("limit") ?? 50);
  const take = Number.isInteger(asked) ? Math.min(Math.max(asked, 1), 200) : 50;

  const enquiries = await db.enquiry.findMany({ orderBy: { createdAt: "desc" }, take });
  return Response.json(enquiries.map(toJson));
}
