import { createSelectSchema } from 'drizzle-zod'

import { sessions, users } from '~/lib/db/schema'

export const userDto = createSelectSchema(users).pick({
  id: true,
  username: true
})

export const sessionDto = createSelectSchema(sessions)
