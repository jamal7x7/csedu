import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import postgres from 'postgres'

import * as schema from '@/db/schema'

const connectionString =
  'postgresql://newmac@localhost:5432/jamal?search_path=public'

// for migrations
const migrationClient = postgres(connectionString, { max: 1 })
migrate(drizzle(migrationClient), { migrationsFolder: 'drizzle' })

// for query purposes
const queryClient = postgres(connectionString)
export const ddb = drizzle(queryClient, { schema })
// await db.select().from(...)...
