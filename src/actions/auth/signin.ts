'use server'

import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createServerAction } from 'zsa'

import { signinActionSchema } from '~/domain/auth/validation'
import { lucia } from '~/lib/auth'
import { signInWithUsernameAndPassword } from '~/services/auth/signin'

export const signinAction = createServerAction()
  .input(signinActionSchema)
  .handler(async ({ input: { username, password } }) => {
    const sessionId = await signInWithUsernameAndPassword({
      username,
      password
    })
    const sessionCookie = lucia.createSessionCookie(sessionId)

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    )
    revalidatePath('/')
    redirect('/')
  })
