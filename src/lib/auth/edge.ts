import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { getBaseUrl } from '~/lib/utils/url'

export const authMiddleware = async (req: NextRequest) => {
  const next = NextResponse.next()
  await fetch(`${getBaseUrl()}/api/auth/session`, {
    headers: {
      cookie: req.cookies.toString()
    }
  })
  return next
}
