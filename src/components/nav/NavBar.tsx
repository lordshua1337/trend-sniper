'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Crosshair, Bell, Menu, X, User } from 'lucide-react'
import { getAlerts } from '@/lib/mock-data'

const navLinks = [
  { href: '/dashboard', label: 'Opportunities' },
  { href: '/dashboard/pipeline', label: 'Pipeline' },
  { href: '/dashboard/goldmine', label: 'Goldmine' },
  { href: '/dashboard/timeline', label: 'Timeline' },
  { href: '/dashboard/comparison', label: 'Compare' },
  { href: '/watchlists', label: 'Watchlists' },
]

export function NavBar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  const unreadCount = getAlerts().filter((a) => !a.read_at).length

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard'
    }
    return pathname.startsWith(href)
  }

  return (
    <nav
      className="sticky top-0 z-50 w-full"
      style={{
        background: 'rgba(10, 10, 15, 0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between gap-8">
          {/* Logo */}
          <Link
            href="/dashboard"
            className="flex items-center gap-2 shrink-0 group"
          >
            <div
              className="flex items-center justify-center w-8 h-8 rounded-lg"
              style={{ background: 'var(--accent-soft)', border: '1px solid rgba(0, 212, 255, 0.3)' }}
            >
              <Crosshair
                size={18}
                style={{ color: 'var(--accent)' }}
                className="group-hover:rotate-45 transition-transform duration-300"
              />
            </div>
            <span
              className="text-lg font-bold tracking-tight"
              style={{ color: 'var(--text)' }}
            >
              Trend Sniper
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150"
                style={{
                  color: isActive(link.href) ? 'var(--accent)' : 'var(--text-secondary)',
                  background: isActive(link.href) ? 'var(--accent-soft)' : 'transparent',
                  border: isActive(link.href)
                    ? '1px solid rgba(0, 212, 255, 0.2)'
                    : '1px solid transparent',
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Alert bell */}
            <Link
              href="/dashboard"
              className="relative flex items-center justify-center w-9 h-9 rounded-lg transition-colors"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
              }}
            >
              <Bell size={16} style={{ color: 'var(--text-secondary)' }} />
              {unreadCount > 0 && (
                <span
                  className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-bold rounded-full"
                  style={{ background: 'var(--accent)', color: '#0A0A0F' }}
                >
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </Link>

            {/* User avatar placeholder */}
            <div
              className="flex items-center justify-center w-9 h-9 rounded-lg"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
              }}
            >
              <User size={16} style={{ color: 'var(--text-secondary)' }} />
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg transition-colors"
              style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label="Toggle mobile menu"
            >
              {mobileOpen ? (
                <X size={16} style={{ color: 'var(--text)' }} />
              ) : (
                <Menu size={16} style={{ color: 'var(--text)' }} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div
            className="md:hidden pb-4 flex flex-col gap-1"
            style={{ borderTop: '1px solid var(--border)', paddingTop: '0.75rem' }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
                style={{
                  color: isActive(link.href) ? 'var(--accent)' : 'var(--text-secondary)',
                  background: isActive(link.href) ? 'var(--accent-soft)' : 'transparent',
                }}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
