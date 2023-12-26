import type { Config } from 'drizzle-kit'
export default {
  schema: './db/schema.ts',
  out: './drizzle',
  driver: 'pg',
  dbCredentials: {
    connectionString: 'postgresql://newmac@localhost:5432/jamal?schema=public',
  },
} satisfies Config
