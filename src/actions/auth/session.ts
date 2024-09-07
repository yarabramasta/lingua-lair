'use server'

import { ZSAError, createServerAction } from 'zsa'

import { lucia } from '~/lib/auth'
import { getSession } from '~/services/auth/session'
import { SESSION_COOKIE_NAME } from '~/utils/constants'

/**
 * Meant to be used with zsa-openapi only!
 */
export const getSessionAction = createServerAction().handler(
  async ({ request }) => {
    const sessionId = request?.cookies.get(SESSION_COOKIE_NAME)?.value
    if (!sessionId) {
      throw new ZSAError('NOT_AUTHORIZED', 'You shall not pass!')
    }

    const { session, user } = await getSession(sessionId)
    if (!session) {
      throw new ZSAError('NOT_AUTHORIZED', 'You shall not pass!')
    }

    /**
     * Prevent cookie being leaked if not under route handler environment.
     */
    const cookie =
      !session.fresh || !request
        ? undefined
        : lucia.createSessionCookie(session.id).serialize()

    return {
      session: {
        id: session.id,
        cookie
      },
      user
    }
  }
)
