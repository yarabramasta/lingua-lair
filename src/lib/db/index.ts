import { drizzle } from 'drizzle-orm/node-postgres'
import pg from 'pg'

import { env } from '~/env'
import * as schema from './schema'

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
  conn: pg.Pool | undefined
}

const sql =
  globalForDb.conn ??
  new pg.Pool({
    connectionString: env.POSTGRES_URL
  })

if (env.NODE_ENV !== 'production') globalForDb.conn = sql

const db = drizzle(sql, {
  schema,
  logger: env.NODE_ENV === 'production'
})

export { sql, db }
