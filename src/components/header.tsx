import { getUserCached } from '~/lib/auth/rsc'
import SignoutButton from './signout-button'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

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
          {!user && (
            <ul className="flex items-center justify-end gap-4 [&_li]:font-medium [&_li]:text-foreground/60 [&_li]:text-sm [&_li]:leading-none [&_li]:transition [&_li]:hover:text-foreground [&_li]:hover:underline">
              <a
                href="https://lingua-lair.vercel.app"
                target="_blank"
                rel="noreferrer"
              >
                <li>Docs</li>
              </a>
            </ul>
          )}
          {user && (
            <SignoutButton>
              {/* TODO: user account popover */}
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={`https://avatars.jakerunzer.com/${user.username}`}
                />
                <AvatarFallback>
                  {user.username.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </SignoutButton>
          )}
        </div>
      </nav>
    </header>
  )
}
