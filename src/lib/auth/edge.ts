import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import type { inferServerActionReturnData } from 'zsa'

import type { getSessionAction } from '~/actions/auth/session'
import {
  SESSION_COOKIE_LIFETIME_SECONDS,
  SESSION_COOKIE_NAME
} from '~/utils/constants'
import { getBaseUrl } from '~/utils/url'

type GetSessionActionReturnData = inferServerActionReturnData<
  typeof getSessionAction
>

export const authMiddleware = async (req: NextRequest) => {
  const next = NextResponse.next()

  const res = await fetch(`${getBaseUrl()}/api/auth/session`, {
    headers: { cookie: req.cookies.toString() },
    next: {
      tags: ['auth_session'],
      revalidate: SESSION_COOKIE_LIFETIME_SECONDS
    }
  })

  if (res.ok) {
    const json = (await res.json()) as GetSessionActionReturnData
    if (json.session.cookie) {
      next.headers.append('set-cookie', json.session.cookie)
    }
  } else {
    next.cookies.delete(SESSION_COOKIE_NAME)
  }

  return next
}
