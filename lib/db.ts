import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "@/generated/prisma/client";

// One client per process: dev hot reload would otherwise open a new pool on every edit.
const g = globalThis as unknown as { prisma?: PrismaClient };

export const db = (g.prisma ??= new PrismaClient({
  adapter: new PrismaMariaDb(process.env.DATABASE_URL ?? ""),
}));
