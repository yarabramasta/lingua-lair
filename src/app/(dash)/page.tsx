import { auth } from '~/lib/auth/rsc'

export default async function HomePage() {
  const cred = await auth()
  return (
    <div className="flex h-full flex-col items-center justify-center">
      Hello, {cred.username}!
    </div>
  )
}
