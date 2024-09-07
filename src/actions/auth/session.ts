'use server'

import { revalidateTag } from 'next/cache'
import { ZSAError, createServerAction } from 'zsa'

import { lucia } from '~/lib/auth'
import { getSession } from '~/services/auth/session'

/**
 * Meant to be used with zsa-openapi only!
 */
export const getSessionAction = createServerAction().handler(
  async ({ request, responseMeta }) => {
    const sessionId = request?.cookies.get(lucia.sessionCookieName)?.value
    if (!sessionId) {
      throw new ZSAError('NOT_AUTHORIZED', 'You shall not pass!')
    }

    const { session, user } = await getSession(sessionId)

    if (!session) {
      const sessionCookie = lucia.createBlankSessionCookie()
      responseMeta?.headers.append('set-cookie', sessionCookie.serialize())
      revalidateTag('auth_session')
      throw new ZSAError('NOT_AUTHORIZED', 'You shall not pass!')
    }

    if (session.fresh) {
      const sessionCookie = lucia.createSessionCookie(session.id)
      responseMeta?.headers.append('set-cookie', sessionCookie.serialize())
      revalidateTag('auth_session')
    }

    return {
      sid: session.id,
      user: {
        username: user.username
      }
    }
  }
)
