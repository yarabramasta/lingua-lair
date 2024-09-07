import { cookies } from 'next/headers'
import { cache } from 'react'

import { getUser } from '~/services/auth/session'
import { lucia } from '.'

export const auth = cache(async () => {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value
  if (!sessionId) return null
  return getUser(sessionId)
})
