import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle'
import { Lucia } from 'lucia'

import {
  SESSION_COOKIE_LIFETIME,
  SESSION_COOKIE_NAME
} from '~/lib/utils/constants'
import { db } from '../db'
import { sessions, users } from '../db/schema'

const adapter = new DrizzlePostgreSQLAdapter(db, sessions, users)

export const lucia = new Lucia(adapter, {
  sessionExpiresIn: SESSION_COOKIE_LIFETIME,
  sessionCookie: {
    name: SESSION_COOKIE_NAME,
    attributes: {
      // set to `true` when using HTTPS
      secure: process.env.NODE_ENV === 'production'
    }
  },
  getUserAttributes: attr => ({
    username: attr.username
  })
})

type DatabaseUserAttributes = Pick<typeof users.$inferSelect, 'username'>

// IMPORTANT!
declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia
    DatabaseUserAttributes: DatabaseUserAttributes
  }
}
