'use server'

import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { lucia } from '~/lib/auth'
import { authedProc } from '~/lib/zsa'

export const signoutAction = authedProc
  .createServerAction()
  .handler(async ({ ctx: { sid } }) => {
    await lucia.invalidateSession(sid)
    const sessionCookie = lucia.createBlankSessionCookie()

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    )
    revalidatePath('/')
    redirect('/sign-in')
  })
