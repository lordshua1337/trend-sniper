'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, BookmarkPlus } from 'lucide-react'
import { NavBar } from '@/components/nav/NavBar'
import type { Watchlist, TrendCategory } from '@/lib/types'

const CATEGORIES: readonly TrendCategory[] = [
  'AI/ML',
  'Fintech',
  'Health',
  'Education',
  'Creator Tools',
  'Dev Tools',
  'E-Commerce',
  'Web3',
  'Infrastructure',
  'Enterprise',
  'Other',
]

const STORAGE_KEY = 'trend-sniper-watchlists'

interface FormErrors {
  name?: string
  keywords?: string
}

function loadExisting(): readonly Watchlist[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    return JSON.parse(raw) as Watchlist[]
  } catch {
    return []
  }
}

export default function CreateWatchlistPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [keywords, setKeywords] = useState('')
  const [minScore, setMinScore] = useState(0)
  const [selectedCategories, setSelectedCategories] = useState<readonly TrendCategory[]>([])
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitting, setSubmitting] = useState(false)

  function toggleCategory(cat: TrendCategory) {
    if (selectedCategories.includes(cat)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== cat))
    } else {
      setSelectedCategories([...selectedCategories, cat])
    }
  }

  function validate(): boolean {
    const newErrors: FormErrors = {}

    if (!name.trim()) {
      newErrors.name = 'Name is required.'
    } else if (name.length > 100) {
      newErrors.name = 'Name must be 100 characters or fewer.'
    }

    const parsedKeywords = keywords
      .split(',')
      .map((k) => k.trim())
      .filter((k) => k.length > 0)

    if (parsedKeywords.length === 0) {
      newErrors.keywords = 'At least one keyword is required.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return

    setSubmitting(true)

    const parsedKeywords = keywords
      .split(',')
      .map((k) => k.trim())
      .filter((k) => k.length > 0)

    const newWatchlist: Watchlist = {
      id: `watchlist-${Date.now()}`,
      user_id: 'user-mock-001',
      name: name.trim(),
      description: description.trim() || undefined,
      keyword_filters: parsedKeywords,
      category_filters: selectedCategories.length > 0 ? selectedCategories : undefined,
      min_trend_score: minScore,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    try {
      const existing = loadExisting()
      const updated = [...existing, newWatchlist]
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      router.push('/watchlists')
    } catch (err) {
      console.error('Failed to save watchlist:', err)
      setSubmitting(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <NavBar />
      <main className="mx-auto max-w-2xl px-4 sm:px-6 py-8">
        <div className="flex flex-col gap-8">
          {/* Header */}
          <div>
            <Link
              href="/watchlists"
              className="inline-flex items-center gap-2 text-sm mb-4 transition-colors"
              style={{ color: 'var(--text-secondary)' }}
            >
              <ArrowLeft size={14} />
              Back to Watchlists
            </Link>
            <div className="flex items-center gap-2">
              <BookmarkPlus size={20} style={{ color: 'var(--accent)' }} />
              <h1 className="text-2xl font-black" style={{ color: 'var(--text)' }}>
                New Watchlist
              </h1>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium mb-2"
                style={{ color: 'var(--text)' }}
              >
                Name *
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. High-opportunity AI tools"
                className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all"
                style={{
                  background: 'var(--surface)',
                  border: errors.name ? '1px solid var(--danger)' : '1px solid var(--border)',
                  color: 'var(--text)',
                }}
              />
              {errors.name && (
                <p className="mt-1 text-xs" style={{ color: 'var(--danger)' }}>
                  {errors.name}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium mb-2"
                style={{ color: 'var(--text)' }}
              >
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Optional: describe what this watchlist tracks..."
                rows={3}
                className="w-full px-4 py-3 rounded-lg text-sm outline-none resize-none"
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  color: 'var(--text)',
                }}
              />
            </div>

            {/* Keywords */}
            <div>
              <label
                htmlFor="keywords"
                className="block text-sm font-medium mb-1"
                style={{ color: 'var(--text)' }}
              >
                Keywords *
              </label>
              <p className="text-xs mb-2" style={{ color: 'var(--text-secondary)' }}>
                Comma-separated. Trends matching any keyword will trigger alerts.
              </p>
              <input
                id="keywords"
                type="text"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="e.g. AI, agents, LLM, inference"
                className="w-full px-4 py-3 rounded-lg text-sm outline-none"
                style={{
                  background: 'var(--surface)',
                  border: errors.keywords ? '1px solid var(--danger)' : '1px solid var(--border)',
                  color: 'var(--text)',
                }}
              />
              {errors.keywords && (
                <p className="mt-1 text-xs" style={{ color: 'var(--danger)' }}>
                  {errors.keywords}
                </p>
              )}
            </div>

            {/* Min score */}
            <div>
              <label
                htmlFor="minScore"
                className="block text-sm font-medium mb-1"
                style={{ color: 'var(--text)' }}
              >
                Minimum Trend Score:{' '}
                <span style={{ color: 'var(--accent)' }}>{minScore}</span>
              </label>
              <p className="text-xs mb-2" style={{ color: 'var(--text-secondary)' }}>
                Only alert on trends at or above this score.
              </p>
              <input
                id="minScore"
                type="range"
                min={0}
                max={90}
                step={5}
                value={minScore}
                onChange={(e) => setMinScore(Number(e.target.value))}
                className="w-full"
                style={{ accentColor: 'var(--accent)' }}
              />
              <div className="flex justify-between text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
                <span>0</span>
                <span>90</span>
              </div>
            </div>

            {/* Categories */}
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text)' }}>
                Category Filters
              </label>
              <p className="text-xs mb-3" style={{ color: 'var(--text-secondary)' }}>
                Optional. Leave blank to monitor all categories.
              </p>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => {
                  const isSelected = selectedCategories.includes(cat)
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => toggleCategory(cat)}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                      style={{
                        background: isSelected ? 'var(--accent-soft)' : 'var(--surface)',
                        border: isSelected
                          ? '1px solid rgba(0, 212, 255, 0.4)'
                          : '1px solid var(--border)',
                        color: isSelected ? 'var(--accent)' : 'var(--text-secondary)',
                      }}
                    >
                      {cat}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Submit */}
            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold transition-all"
                style={{
                  background: submitting ? 'var(--border)' : 'var(--accent)',
                  color: '#0A0A0F',
                  cursor: submitting ? 'not-allowed' : 'pointer',
                }}
              >
                <BookmarkPlus size={15} />
                {submitting ? 'Saving...' : 'Create Watchlist'}
              </button>
              <Link
                href="/watchlists"
                className="flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium transition-all"
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-secondary)',
                }}
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
