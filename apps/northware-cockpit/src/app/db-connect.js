import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

// Connection
export const client = neon(`${process.env.POSTGRES_URL}?sslmode=require`);
export const db = drizzle(client);