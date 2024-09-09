import { getUserCached } from '~/lib/auth/rsc'

export default async function Header() {
  const user = await getUserCached()

  return (
    <header className="sticky inset-x-0 top-0 h-14 bg-background/10 shadow-sm backdrop-blur-sm">
      <nav className="relative flex h-full w-full max-w-[1440px] items-center px-8 py-2">
        {user && (
          <p className="font-mono text-muted-foreground text-xs">
            Breadcrumb &gt; Item &gt; Here
          </p>
        )}
      </nav>
    </header>
  )
}
