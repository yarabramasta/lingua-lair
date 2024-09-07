import Header from '~/components/header'

export default function AuthLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="flex h-dvh flex-col">
      <Header />
      <main className="flex flex-1 flex-col items-center justify-center overflow-x-hidden p-8">
        {children}
      </main>
    </div>
  )
}
