'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Crosshair, TrendingUp } from 'lucide-react'
import { TrendHeatmap } from '@/components/dashboard/TrendHeatmap'
import { AlertCenter } from '@/components/alerts/AlertCenter'
import { StageBadge } from '@/components/common/StageBadge'
import { getCategoryStats, getTrends } from '@/lib/mock-data'
import type { TrendCategory } from '@/lib/types'

export default function DashboardPage() {
  const [selectedCategory, setSelectedCategory] = useState<TrendCategory | undefined>()

  const categoryStats = getCategoryStats()
  const filteredTrends = getTrends(
    selectedCategory
      ? { category: selectedCategory, sortBy: 'trend_score', sortDir: 'desc' }
      : { sortBy: 'trend_score', sortDir: 'desc' }
  )
  const topTrends = filteredTrends.slice(0, 8)

  const totalTrends = filteredTrends.length
  const avgScore =
    filteredTrends.length > 0
      ? Math.round(filteredTrends.reduce((s, t) => s + t.trend_score, 0) / filteredTrends.length)
      : 0

  return (
    <div className="flex flex-col gap-8">
      {/* Page header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Crosshair size={20} style={{ color: 'var(--accent)' }} />
            <h1 className="text-2xl font-black tracking-tight" style={{ color: 'var(--text)' }}>
              Dashboard
            </h1>
          </div>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            {selectedCategory
              ? `Showing ${totalTrends} trends in ${selectedCategory}`
              : `${totalTrends} trends across 11 categories`}
          </p>
        </div>
        <AlertCenter />
      </div>

      {/* Stat pills */}
      <div className="flex items-center gap-4 flex-wrap">
        {[
          { label: 'Tracking', value: `${totalTrends} trends` },
          { label: 'Avg score', value: String(avgScore) },
          { label: 'Data sources', value: '5' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm"
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
            }}
          >
            <span style={{ color: 'var(--text-secondary)' }}>{stat.label}:</span>
            <span className="font-semibold" style={{ color: 'var(--text)' }}>
              {stat.value}
            </span>
          </div>
        ))}
      </div>

      {/* Heatmap */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp size={16} style={{ color: 'var(--accent)' }} />
          <h2 className="text-base font-bold" style={{ color: 'var(--text)' }}>
            Category Heatmap
          </h2>
          <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
            Click to filter
          </span>
        </div>
        <TrendHeatmap
          stats={categoryStats}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </section>

      {/* Top trends table */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-base font-bold" style={{ color: 'var(--text)' }}>
            {selectedCategory ? `Top in ${selectedCategory}` : 'Top Trends'}
          </h2>
        </div>

        <div
          className="rounded-xl overflow-hidden"
          style={{ border: '1px solid var(--border)' }}
        >
          <div
            className="grid grid-cols-12 gap-4 px-4 py-3 text-xs font-semibold uppercase tracking-wider"
            style={{
              background: 'var(--surface)',
              borderBottom: '1px solid var(--border)',
              color: 'var(--text-secondary)',
            }}
          >
            <div className="col-span-4">Trend</div>
            <div className="col-span-2">Stage</div>
            <div className="col-span-2 text-right">Score</div>
            <div className="col-span-2 text-right">Confidence</div>
            <div className="col-span-2 text-right">Competition</div>
          </div>

          {topTrends.map((trend, index) => (
            <motion.div
              key={trend.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.04 }}
              className="grid grid-cols-12 gap-4 px-4 py-3 items-center transition-colors"
              style={{
                borderBottom: index < topTrends.length - 1 ? '1px solid var(--border)' : 'none',
                background: index % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)',
              }}
            >
              <div className="col-span-4">
                <div className="text-sm font-medium" style={{ color: 'var(--text)' }}>
                  {trend.name}
                </div>
                <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                  {trend.category}
                </div>
              </div>
              <div className="col-span-2">
                <StageBadge stage={trend.current_stage} size="sm" />
              </div>
              <div className="col-span-2 text-right">
                <span className="text-sm font-bold" style={{ color: 'var(--accent)' }}>
                  {trend.trend_score}
                </span>
              </div>
              <div className="col-span-2 text-right">
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {trend.confidence_score}%
                </span>
              </div>
              <div className="col-span-2 text-right">
                <span
                  className="text-xs font-medium"
                  style={{
                    color:
                      trend.competition_density === 'Low'
                        ? 'var(--success)'
                        : trend.competition_density === 'Medium'
                          ? 'var(--warning)'
                          : 'var(--danger)',
                  }}
                >
                  {trend.competition_density}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}
