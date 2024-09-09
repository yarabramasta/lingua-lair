import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { SESSION_COOKIE_LIFETIME_SECONDS } from '~/utils/constants'
import { getBaseUrl } from '~/utils/url'

export const authMiddleware = async (req: NextRequest) => {
  const next = NextResponse.next()

  await fetch(`${getBaseUrl()}/api/auth/session`, {
    headers: { cookie: req.cookies.toString() },
    next: {
      tags: ['auth_session'],
      revalidate: SESSION_COOKIE_LIFETIME_SECONDS
    }
  })

  return next
}
