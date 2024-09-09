import Header from '~/components/header'

export default function DashboardLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="relative flex h-dvh flex-col overflow-x-hidden">
      <Header />
      <main className="flex-1">{children}</main>
    </div>
  )
}
