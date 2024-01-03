import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import postgres from 'postgres'
import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js'

import * as user from '@/db/schema/user'
import * as unit from '@/db/schema/unit'
import { DrizzleTypeError } from 'drizzle-orm'
import { env } from 'process'
// import { env } from '~/env.mjs'

const schema = { ...user, ...unit }
const connectionString =
  'postgresql://newmac@localhost:5432/jamal?search_path=public'

// for migrations
const migrationClient = postgres(connectionString, { max: 1, onnotice() {} })
migrate(drizzle(migrationClient), { migrationsFolder: 'drizzle' })

declare global {
  // eslint-disable-next-line no-var -- only var works here
  var db: PostgresJsDatabase<typeof schema> | undefined
}

let db: PostgresJsDatabase<typeof schema>

if (env.NODE_ENV === 'production') {
  const client = postgres(connectionString)

  db = drizzle(client, {
    schema,
  })
} else {
  if (!global.db) {
    const client = postgres(connectionString)

    global.db = drizzle(client, {
      schema,
      logger: {
        logQuery: (query) => {
          // to remove quotes on query string, to make it more readable
          console.log({ query: query.replace(/\"/g, '') })
        },
      },
    })
  }

  db = global.db
}

type DbInstance = typeof db

export { db }
export type { DbInstance }

// ===============================================================
// for query purposes
// const queryClient = postgres(connectionString)
// export const db = drizzle(queryClient, { schema })
// ===============================================================
// let db: PostgresJsDatabase
// // Fix for "sorry, too many clients already"
// declare global {
//   // eslint-disable-next-line no-var -- only var works here
//   var db: PostgresJsDatabase | undefined | any
//   // var db: any
// }
// const queryClient = postgres(connectionString)

// if (false) {
//   db = drizzle(queryClient)
// } else {
//   // export const db = drizzle(queryClient, { schema })
//   if (!global.db) global.db = drizzle(queryClient, { schema })
//   // if (!global.db) global.db = drizzle(postgres(connectionString))

//   db = global.db
// }

// export { db }

// ============================================================

// import { drizzle } from 'drizzle-orm/postgres-js'
// import postgres from 'postgres'

// import { env } from '~/lib/env/server.mjs'

// import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js'

// // Fix for "sorry, too many clients already"
// declare global {
//   // eslint-disable-next-line no-var -- only var works here
//   var db: PostgresJsDatabase | undefined
// }

// let db: PostgresJsDatabase

// if (env.NODE_ENV === 'production') {
//   db = drizzle(postgres(env.DATABASE_URL))
// } else {
//   if (!global.db) global.db = drizzle(postgres(env.DATABASE_URL))

//   db = global.db
// }

// export { db }

// ==================================?
