import { redirect } from 'next/navigation'

import { auth } from '~/lib/auth/rsc'

export default async function HomePage() {
  const cred = await auth()
  if (!cred) redirect('/sign-in')
  else redirect('/dash')
}
