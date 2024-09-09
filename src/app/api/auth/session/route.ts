import { setupApiHandler } from 'zsa-openapi'

import { getSessionAction } from '~/actions/auth/session'

export const dynamic = 'force-dynamic'

export const { GET } = setupApiHandler('/api/auth/session', getSessionAction, {
  shapeError: error => ({
    code: error.code,
    message: error.message
  })
})
