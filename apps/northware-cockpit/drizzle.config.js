import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/database/schema/*",
  out: "./drizzle-migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
