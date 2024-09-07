import { createServerActionProcedure } from 'zsa'

import { getSessionAction } from '~/actions/auth/session'

export const authedProc = createServerActionProcedure().handler(async () => {
  const [data, err] = await getSessionAction()
  if (!data || err) throw err.message
  return data
})
