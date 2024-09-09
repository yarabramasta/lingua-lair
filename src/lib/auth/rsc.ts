import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { cache } from 'react'

import { getUser } from '~/services/auth/session'
import { SESSION_COOKIE_NAME } from '~/utils/constants'

export const auth = cache(async () => {
  const sessionId = cookies().get(SESSION_COOKIE_NAME)?.value
  if (!sessionId) redirect('/sign-in')

  const user = await getUser(sessionId)
  if (!user) redirect('/sign-in')

  return user
})

export const getUserCached = cache(async () => {
  const sessionId = cookies().get(SESSION_COOKIE_NAME)?.value
  if (!sessionId) return null

  return await getUser(sessionId)
})
