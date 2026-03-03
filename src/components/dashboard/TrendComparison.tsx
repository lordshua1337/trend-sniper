'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { X, BarChart2 } from 'lucide-react'
import type { Trend } from '@/lib/types'
import { StageBadge, getStageColor } from '@/components/common/StageBadge'

interface TrendComparisonProps {
  readonly trends: readonly Trend[]
}

const MAX_COMPARE = 3

interface BarChartRowProps {
  readonly label: string
  readonly values: readonly { trendName: string; value: number; color: string; maxValue: number }[]
}

function BarChartRow({ label, values }: BarChartRowProps) {
  return (
    <div className="mb-4">
      <div className="text-xs font-semibold mb-2 uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
        {label}
      </div>
      <div className="flex flex-col gap-2">
        {values.map((v) => (
          <div key={v.trendName} className="flex items-center gap-3">
            <div className="w-28 shrink-0">
              <span className="text-xs truncate block" style={{ color: 'var(--text-secondary)' }}>
                {v.trendName}
              </span>
            </div>
            <div
              className="flex-1 h-5 rounded overflow-hidden"
              style={{ background: 'var(--border)' }}
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(v.value / v.maxValue) * 100}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="h-full rounded flex items-center justify-end pr-2"
                style={{ background: v.color }}
              >
                <span className="text-xs font-bold" style={{ color: '#0A0A0F' }}>
                  {v.value}
                </span>
              </motion.div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

interface TrendCardProps {
  readonly trend: Trend
  readonly onRemove: (id: string) => void
}

function TrendCard({ trend, onRemove }: TrendCardProps) {
  const stageColor = getStageColor(trend.current_stage)

  return (
    <div
      className="flex flex-col gap-3 p-4 rounded-xl flex-1 min-w-0"
      style={{
        background: 'var(--surface)',
        border: `1px solid ${stageColor}40`,
        boxShadow: `0 0 16px ${stageColor}15`,
      }}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-bold truncate" style={{ color: 'var(--text)' }}>
            {trend.name}
          </h3>
          <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>
            {trend.category}
          </p>
        </div>
        <button
          onClick={() => onRemove(trend.id)}
          className="p-1 rounded transition-colors shrink-0"
          style={{ color: 'var(--text-secondary)' }}
        >
          <X size={14} />
        </button>
      </div>
      <StageBadge stage={trend.current_stage} />
      <div className="grid grid-cols-2 gap-2">
        {[
          { label: 'Score', value: String(trend.trend_score), color: stageColor },
          { label: 'Confidence', value: `${trend.confidence_score}%`, color: 'var(--text)' },
          {
            label: 'Competition',
            value: trend.competition_density,
            color:
              trend.competition_density === 'Low'
                ? 'var(--success)'
                : trend.competition_density === 'Medium'
                  ? 'var(--warning)'
                  : 'var(--danger)',
          },
          { label: 'Monetization', value: trend.monetization_signal, color: 'var(--text-secondary)' },
        ].map((item) => (
          <div key={item.label}>
            <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
              {item.label}
            </div>
            <div className="text-sm font-bold" style={{ color: item.color }}>
              {item.value}
            </div>
          </div>
        ))}
      </div>
      {trend.time_to_build_days && (
        <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
          Build time: <span style={{ color: 'var(--text)' }}>{trend.time_to_build_days} days</span>
        </div>
      )}
    </div>
  )
}

export function TrendComparison({ trends }: TrendComparisonProps) {
  const [selectedIds, setSelectedIds] = useState<readonly string[]>([])
  const [search, setSearch] = useState('')

  const selectedTrends = selectedIds
    .map((id) => trends.find((t) => t.id === id))
    .filter((t): t is Trend => t !== undefined)

  const filteredTrends = trends.filter((t) => {
    if (selectedIds.includes(t.id)) return false
    if (!search) return true
    return (
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.category.toLowerCase().includes(search.toLowerCase())
    )
  })

  function toggleTrend(id: string) {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((s) => s !== id))
    } else if (selectedIds.length < MAX_COMPARE) {
      setSelectedIds([...selectedIds, id])
    }
  }

  const chartValues = selectedTrends.map((t) => ({
    trendName: t.name,
    color: getStageColor(t.current_stage),
    trendScore: t.trend_score,
    confidence: t.confidence_score,
    buildDays: t.time_to_build_days ?? 0,
  }))

  return (
    <div className="flex flex-col gap-8">
      {/* Trend picker */}
      <div
        className="rounded-xl p-4"
        style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
      >
        <div className="flex items-center justify-between gap-4 mb-4">
          <span className="text-sm font-bold" style={{ color: 'var(--text)' }}>
            Select up to {MAX_COMPARE} trends
          </span>
          <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
            {selectedIds.length}/{MAX_COMPARE} selected
          </span>
        </div>
        <input
          type="text"
          placeholder="Search trends..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-3 py-2 rounded-lg text-sm mb-3 outline-none"
          style={{
            background: 'var(--bg)',
            border: '1px solid var(--border)',
            color: 'var(--text)',
          }}
        />
        <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
          {filteredTrends.map((trend) => {
            const disabled = selectedIds.length >= MAX_COMPARE
            return (
              <button
                key={trend.id}
                onClick={() => toggleTrend(trend.id)}
                disabled={disabled}
                className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                style={{
                  background: 'var(--bg)',
                  border: '1px solid var(--border)',
                  color: disabled ? 'var(--text-secondary)' : 'var(--text)',
                  opacity: disabled ? 0.5 : 1,
                  cursor: disabled ? 'not-allowed' : 'pointer',
                }}
              >
                {trend.name}
              </button>
            )
          })}
        </div>
      </div>

      {/* Selected trend cards */}
      {selectedTrends.length > 0 && (
        <div className="flex flex-col gap-6">
          <div className="flex gap-4">
            {selectedTrends.map((trend) => (
              <TrendCard
                key={trend.id}
                trend={trend}
                onRemove={(id) => setSelectedIds(selectedIds.filter((s) => s !== id))}
              />
            ))}
          </div>

          {/* Bar charts */}
          {selectedTrends.length >= 2 && (
            <div
              className="rounded-xl p-6"
              style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
            >
              <div className="flex items-center gap-2 mb-6">
                <BarChart2 size={16} style={{ color: 'var(--accent)' }} />
                <h3 className="text-sm font-bold" style={{ color: 'var(--text)' }}>
                  Head-to-Head Comparison
                </h3>
              </div>

              <BarChartRow
                label="Trend Score"
                values={chartValues.map((v) => ({
                  trendName: v.trendName,
                  value: v.trendScore,
                  color: v.color,
                  maxValue: 100,
                }))}
              />
              <BarChartRow
                label="Confidence Score"
                values={chartValues.map((v) => ({
                  trendName: v.trendName,
                  value: v.confidence,
                  color: v.color,
                  maxValue: 100,
                }))}
              />
              {chartValues.some((v) => v.buildDays > 0) && (
                <BarChartRow
                  label="Build Time (days)"
                  values={chartValues
                    .filter((v) => v.buildDays > 0)
                    .map((v) => ({
                      trendName: v.trendName,
                      value: v.buildDays,
                      color: v.color,
                      maxValue: Math.max(...chartValues.map((c) => c.buildDays)),
                    }))}
                />
              )}
            </div>
          )}
        </div>
      )}

      {selectedTrends.length === 0 && (
        <div
          className="rounded-xl p-12 text-center"
          style={{ border: '1px dashed var(--border)' }}
        >
          <BarChart2 size={32} className="mx-auto mb-3" style={{ color: 'var(--text-secondary)' }} />
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Select 2-3 trends above to compare them side by side.
          </p>
        </div>
      )}
    </div>
  )
}
