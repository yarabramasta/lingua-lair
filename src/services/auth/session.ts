import { lucia } from '~/lib/auth'

export async function getSession(sessionId: string) {
  const { session, user } = await lucia.validateSession(sessionId)
  if (!session) return { session: null, user: null }
  return { session, user }
}

export async function getUser(sessionId: string) {
  const { session, user } = await getSession(sessionId)
  if (!session || !user) return null
  return {
    sid: session.id,
    user: {
      username: user.username
    }
  }
}
