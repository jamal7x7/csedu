import type { Config } from 'drizzle-kit'
export default {
  schema: './db/schema/*',
  out: './drizzle',
  driver: 'pg',
  dbCredentials: {
    connectionString:
      'postgresql://newmac@localhost:5432/jamal?search_path=public',
  },
} satisfies Config
