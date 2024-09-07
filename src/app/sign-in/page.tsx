export default function SigninPage() {
  return (
    <div className="flex h-dvh flex-col">
      <header className="h-16 inline-flex items-center justify-center shadow-sm sticky">
        <nav className="relative w-full px-8 pt-4 h-full"></nav>
      </header>
      <main className="flex flex-1 flex-col items-center justify-center overflow-x-hidden p-8">
        <div className="flex max-w-[348px] flex-col gap-2">
          <h1 className="font-semibold text-lg">Lingua Lair</h1>
          <p className="text-sm">
            Please proceed with authentication before accessing dashboard.
          </p>
          <div className="mt-6 flex w-full flex-col">
            <form className="flex flex-col gap-4">
              <input type="text" placeholder="Your username here" />
              <input type="password" placeholder="8 characters or more" />
              <button type="submit">Sign in</button>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}
