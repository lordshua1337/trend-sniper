import { NavBar } from '@/components/nav/NavBar'

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <NavBar />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 py-8">{children}</main>
    </div>
  )
}
