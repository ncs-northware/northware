import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

config({ path: '.env.local' });

export default defineConfig({
  schema: './schema',
  out: './drizzle-migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.NW_API || '',
  },
});
