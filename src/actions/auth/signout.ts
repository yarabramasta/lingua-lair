'use server'

import { revalidateTag } from 'next/cache'
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
    revalidateTag('auth_session')
    redirect('/sign-in')
  })
