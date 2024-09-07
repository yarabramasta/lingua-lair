import { cookies } from 'next/headers'
import { cache } from 'react'

import { getUser } from '~/services/auth/session'
import { SESSION_COOKIE_NAME } from '~/utils/constants'

export const auth = cache(async () => {
  const sessionId = cookies().get(SESSION_COOKIE_NAME)?.value
  if (!sessionId) return null
  return getUser(sessionId)
})
