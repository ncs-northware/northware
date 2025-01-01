import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

// Connection for Apps
export const client = neon(`${process.env.DATABASE_URL || ''}?sslmode=require`);
export const db = drizzle({ client });
