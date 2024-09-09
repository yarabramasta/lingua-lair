'use server'

import { revalidatePath, revalidateTag } from 'next/cache'
import { cookies } from 'next/headers'
import { ZSAError, createServerAction } from 'zsa'

import { lucia } from '~/lib/auth'
import { getSession } from '~/services/auth/session'
import { SESSION_COOKIE_NAME } from '~/utils/constants'

/**
 * Meant to be used with zsa-openapi only!
 */
export const getSessionAction = createServerAction().handler(async () => {
  const sessionId = cookies().get(SESSION_COOKIE_NAME)?.value ?? null
  if (!sessionId) {
    throw new ZSAError('NOT_AUTHORIZED', 'You shall not pass!')
  }

  const { session, user } = await getSession(sessionId)
  if (session?.fresh) {
    const sessionCookie = lucia.createSessionCookie(session.id)

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    )
    revalidateTag('auth_session')
    revalidatePath('/')
  }

  if (!session) {
    const sessionCookie = lucia.createBlankSessionCookie()

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    )
    revalidateTag('auth_session')
    revalidatePath('/')

    throw new ZSAError('NOT_AUTHORIZED', 'You shall not pass!')
  }

  return { session, user }
})
