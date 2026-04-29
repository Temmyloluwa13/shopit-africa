// This file configures the Prisma CLI (migrations, studio, etc.)
// In Prisma v7, datasource.url here is used by the CLI — point it to DIRECT_URL
// so migrations bypass pgBouncer and connect directly to Supabase.
import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // Use direct connection URL for CLI/migrations (bypasses pgBouncer)
    url: process.env["DIRECT_URL"]!,
  },
});
