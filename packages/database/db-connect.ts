import { Pool } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";

// Connection for Apps
const pool = new Pool({ connectionString: process.env.DATABASE_URL || "" });
export const db = drizzle({ casing: "snake_case", client: pool });
