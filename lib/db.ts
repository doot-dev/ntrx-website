import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "@/generated/prisma/client";

// Each serverless instance opens its own pool, and the Hostinger account caps
// connections (50 open, 500 per hour). The driver default of 10 per pool would burn that fast.
function poolUrl() {
  const url = new URL(process.env.DATABASE_URL || "mysql://localhost/unset");
  if (!url.searchParams.has("connectionLimit")) url.searchParams.set("connectionLimit", "2");
  return url.toString();
}

// One client per process: dev hot reload would otherwise open a new pool on every edit.
const g = globalThis as unknown as { prisma?: PrismaClient };

export const db = (g.prisma ??= new PrismaClient({ adapter: new PrismaMariaDb(poolUrl()) }));
