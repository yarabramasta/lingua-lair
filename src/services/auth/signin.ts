import { verify } from '@node-rs/argon2'
import type { z } from 'zod'
import { ZSAError } from 'zsa'

import type { signinActionSchema } from '~/domain/auth/validation'
import { lucia } from '~/lib/auth'
import { db } from '~/lib/db'

export async function signInWithUsernameAndPassword({
  username,
  password
}: z.infer<typeof signinActionSchema>) {
  const existingUser = await db.query.users.findFirst({
    where: (t, { eq }) => eq(t.username, username),
    columns: { id: true, passwordHash: true }
  })
  if (!existingUser) {
    throw new ZSAError('ERROR', 'Invalid username or password')
  }

  const isMatchPassword = await verify(existingUser.passwordHash, password, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1
  })
  if (!isMatchPassword) {
    throw new ZSAError('ERROR', 'Invalid username or password')
  }

  const session = await lucia.createSession(existingUser.id, {})

  return session.id
}
