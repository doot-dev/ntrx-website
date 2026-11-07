import { defineConfig } from "prisma/config";

// The Prisma CLI does not read .env itself; Next.js does, so only the CLI needs this.
for (const file of [".env.local", ".env"]) {
  try {
    process.loadEnvFile(file);
  } catch {} // missing file is fine: Docker passes env directly
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: { path: "prisma/migrations" },
  datasource: { url: process.env.DATABASE_URL },
});
