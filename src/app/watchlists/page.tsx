'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { BookmarkPlus, Tag, Sliders } from 'lucide-react'
import { NavBar } from '@/components/nav/NavBar'
import type { Watchlist } from '@/lib/types'
import { getWatchlists } from '@/lib/mock-data'

const STORAGE_KEY = 'trend-sniper-watchlists'

function loadWatchlists(): readonly Watchlist[] {
  if (typeof window === 'undefined') return getWatchlists()
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return getWatchlists()
    const parsed = JSON.parse(raw) as Watchlist[]
    return parsed
  } catch {
    return getWatchlists()
  }
}

export default function WatchlistsPage() {
  const [watchlists, setWatchlists] = useState<readonly Watchlist[]>([])

  useEffect(() => {
    setWatchlists(loadWatchlists())
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <NavBar />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
        <div className="flex flex-col gap-8">
          {/* Header */}
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <BookmarkPlus size={20} style={{ color: 'var(--accent)' }} />
                <h1 className="text-2xl font-black tracking-tight" style={{ color: 'var(--text)' }}>
                  Watchlists
                </h1>
              </div>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                Keyword-based filters that generate alerts when trends match your criteria.
              </p>
            </div>
            <Link
              href="/watchlists/create"
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all"
              style={{
                background: 'var(--accent)',
                color: '#0A0A0F',
              }}
            >
              <BookmarkPlus size={15} />
              New Watchlist
            </Link>
          </div>

          {/* Watchlist grid */}
          {watchlists.length === 0 ? (
            <div
              className="rounded-xl p-12 text-center"
              style={{ border: '1px dashed var(--border)' }}
            >
              <BookmarkPlus size={32} className="mx-auto mb-3" style={{ color: 'var(--text-secondary)' }} />
              <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
                No watchlists yet.
              </p>
              <Link
                href="/watchlists/create"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium"
                style={{ background: 'var(--accent-soft)', border: '1px solid rgba(0, 212, 255, 0.3)', color: 'var(--accent)' }}
              >
                Create your first watchlist
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {watchlists.map((wl) => (
                <WatchlistCard key={wl.id} watchlist={wl} onDelete={(id) => {
                  const updated = watchlists.filter((w) => w.id !== id)
                  setWatchlists(updated)
                  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
                }} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

interface WatchlistCardProps {
  readonly watchlist: Watchlist
  readonly onDelete: (id: string) => void
}

function WatchlistCard({ watchlist, onDelete }: WatchlistCardProps) {
  return (
    <div
      className="rounded-xl p-5 flex flex-col gap-4"
      style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-base font-bold" style={{ color: 'var(--text)' }}>
            {watchlist.name}
          </h3>
          {watchlist.description && (
            <p className="text-xs mt-1 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {watchlist.description}
            </p>
          )}
        </div>
        <button
          onClick={() => onDelete(watchlist.id)}
          className="text-xs px-2 py-1 rounded transition-colors"
          style={{ color: 'var(--danger)', border: '1px solid rgba(255, 82, 82, 0.3)' }}
        >
          Delete
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {/* Keywords */}
        <div>
          <div className="flex items-center gap-1.5 mb-2">
            <Tag size={12} style={{ color: 'var(--text-secondary)' }} />
            <span className="text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
              Keywords
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {watchlist.keyword_filters.map((kw) => (
              <span
                key={kw}
                className="text-xs px-2 py-0.5 rounded-full"
                style={{ background: 'var(--accent-soft)', color: 'var(--accent)', border: '1px solid rgba(0, 212, 255, 0.2)' }}
              >
                {kw}
              </span>
            ))}
          </div>
        </div>

        {/* Min score */}
        <div className="flex items-center gap-2 text-xs">
          <Sliders size={12} style={{ color: 'var(--text-secondary)' }} />
          <span style={{ color: 'var(--text-secondary)' }}>Min score:</span>
          <span className="font-semibold" style={{ color: 'var(--accent)' }}>
            {watchlist.min_trend_score}
          </span>
        </div>

        {/* Categories */}
        {watchlist.category_filters && watchlist.category_filters.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {watchlist.category_filters.map((cat) => (
              <span
                key={cat}
                className="text-xs px-2 py-0.5 rounded"
                style={{
                  background: 'var(--surface-hover)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-secondary)',
                }}
              >
                {cat}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
        Created {new Date(watchlist.created_at).toLocaleDateString()}
      </div>
    </div>
  )
}
