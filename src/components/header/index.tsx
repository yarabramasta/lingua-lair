import { getUserCached } from '~/lib/auth/rsc'
import Navigation from './nav'
import UserButton from './user-button'

export default async function Header() {
  const user = await getUserCached()

  return (
    <header className="sticky inset-x-0 top-0 h-14 bg-background/10 shadow-sm backdrop-blur-sm">
      <nav className="relative flex h-full w-full max-w-[1440px] items-center px-8 py-2">
        <div className="flex-1">
          {!user && (
            <div className="inline-flex items-center gap-2">
              <h2 className="font-semibold text-foreground/60 text-sm">
                Lingua Lair
              </h2>
            </div>
          )}
        </div>
        <div className="flex items-start justify-end gap-6">
          {user ? <UserButton user={user} /> : <Navigation />}
        </div>
      </nav>
    </header>
  )
}
