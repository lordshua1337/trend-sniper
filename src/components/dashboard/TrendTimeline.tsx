'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, Activity } from 'lucide-react'
import type { Trend, TrendSignal, TrendAnalysis } from '@/lib/types'
import { StageBadge, getStageColor } from '@/components/common/StageBadge'
import { getTrends, getSignalsForTrend, getAnalysisForTrend } from '@/lib/mock-data'

const SIGNAL_SOURCES = ['HackerNews', 'GitHub', 'Reddit', 'GoogleTrends', 'ProductHunt'] as const

function SignalBar({
  source,
  score,
  velocity,
}: {
  source: string
  score: number
  velocity?: number
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-28 shrink-0">
        <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
          {source}
        </span>
      </div>
      <div
        className="flex-1 h-5 rounded-md overflow-hidden"
        style={{ background: 'var(--border)' }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="h-full rounded-md flex items-center justify-end pr-2"
          style={{
            background: score >= 70 ? 'var(--success)' : score >= 40 ? 'var(--accent)' : 'var(--text-secondary)',
          }}
        >
          <span className="text-xs font-bold" style={{ color: '#0A0A0F' }}>
            {score}
          </span>
        </motion.div>
      </div>
      {velocity !== undefined && (
        <div
          className="w-16 text-right text-xs font-medium shrink-0"
          style={{ color: velocity >= 0 ? 'var(--success)' : 'var(--danger)' }}
        >
          {velocity >= 0 ? '+' : ''}{velocity}
        </div>
      )}
    </div>
  )
}

interface TrendDetailPanelProps {
  readonly trend: Trend
  readonly signals: readonly TrendSignal[]
  readonly analysis: TrendAnalysis | undefined
}

function TrendDetailPanel({ trend, signals, analysis }: TrendDetailPanelProps) {
  const stageColor = getStageColor(trend.current_stage)

  return (
    <div className="flex flex-col gap-6">
      {/* Trend header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3 flex-wrap">
          <h2 className="text-xl font-black" style={{ color: 'var(--text)' }}>
            {trend.name}
          </h2>
          <StageBadge stage={trend.current_stage} />
        </div>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          {trend.description ?? 'No description available.'}
        </p>
      </div>

      {/* Score grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Trend Score', value: trend.trend_score, unit: '', color: stageColor },
          { label: 'Confidence', value: trend.confidence_score, unit: '%', color: 'var(--text)' },
          { label: 'Competition', value: trend.competition_density, unit: '', color:
            trend.competition_density === 'Low' ? 'var(--success)' :
            trend.competition_density === 'Medium' ? 'var(--warning)' : 'var(--danger)' },
          { label: 'Monetization', value: trend.monetization_signal, unit: '', color: 'var(--text-secondary)' },
        ].map((item) => (
          <div
            key={item.label}
            className="p-3 rounded-lg"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
          >
            <div className="text-xs mb-1" style={{ color: 'var(--text-secondary)' }}>
              {item.label}
            </div>
            <div className="text-lg font-bold" style={{ color: item.color }}>
              {item.value}{item.unit}
            </div>
          </div>
        ))}
      </div>

      {/* Signal bars */}
      <div
        className="rounded-xl p-4"
        style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
      >
        <div className="flex items-center gap-2 mb-4">
          <Activity size={15} style={{ color: 'var(--accent)' }} />
          <h3 className="text-sm font-bold" style={{ color: 'var(--text)' }}>
            Signal Sources
          </h3>
          <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
            score / velocity
          </span>
        </div>
        <div className="flex flex-col gap-3">
          {SIGNAL_SOURCES.map((source) => {
            const sig = signals.find((s) => s.source === source)
            return (
              <SignalBar
                key={source}
                source={source}
                score={sig?.signal_score ?? 0}
                velocity={sig?.velocity}
              />
            )
          })}
        </div>
      </div>

      {/* AI analysis */}
      {analysis && (
        <div
          className="rounded-xl p-4"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
        >
          <h3 className="text-sm font-bold mb-3" style={{ color: 'var(--text)' }}>
            AI Analysis
          </h3>
          {analysis.ai_notes && (
            <p
              className="text-sm leading-relaxed mb-3"
              style={{ color: 'var(--text-secondary)' }}
            >
              {analysis.ai_notes}
            </p>
          )}
          {analysis.historical_pattern && (
            <div
              className="p-3 rounded-lg text-sm italic"
              style={{
                background: 'var(--surface-hover)',
                borderLeft: '3px solid var(--accent)',
                color: 'var(--text-secondary)',
              }}
            >
              {analysis.historical_pattern}
            </div>
          )}
          {analysis.estimated_peak_months !== undefined && analysis.estimated_peak_months > 0 && (
            <div className="mt-3 flex items-center gap-2">
              <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                Estimated peak:
              </span>
              <span className="text-xs font-bold" style={{ color: 'var(--warning)' }}>
                {analysis.estimated_peak_months} months
              </span>
            </div>
          )}
          {analysis.key_indicators && analysis.key_indicators.length > 0 && (
            <div className="mt-4">
              <h4 className="text-xs font-semibold mb-2 uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                Key Indicators
              </h4>
              <div className="flex flex-col gap-2">
                {analysis.key_indicators.map((ki) => (
                  <div key={ki.indicator} className="flex items-center justify-between gap-2 text-xs">
                    <span style={{ color: 'var(--text-secondary)' }}>{ki.indicator}</span>
                    <span className="font-semibold" style={{ color: 'var(--text)' }}>
                      {String(ki.value)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export function TrendTimeline() {
  const trends = getTrends({ sortBy: 'trend_score', sortDir: 'desc' })
  const [selectedId, setSelectedId] = useState<string>(trends[0]?.id ?? '')

  const selectedTrend = trends.find((t) => t.id === selectedId)
  const selectedSignals = selectedId ? getSignalsForTrend(selectedId) : []
  const selectedAnalysis = selectedId ? getAnalysisForTrend(selectedId) : undefined

  return (
    <div className="flex gap-6" style={{ minHeight: '600px' }}>
      {/* Sidebar */}
      <div
        className="w-64 shrink-0 rounded-xl overflow-y-auto"
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          maxHeight: '80vh',
        }}
      >
        <div
          className="px-4 py-3 sticky top-0"
          style={{
            background: 'var(--surface)',
            borderBottom: '1px solid var(--border)',
          }}
        >
          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
            Top 20 Trends
          </span>
        </div>
        {trends.slice(0, 20).map((trend) => {
          const isSelected = trend.id === selectedId
          const stageColor = getStageColor(trend.current_stage)

          return (
            <button
              key={trend.id}
              onClick={() => setSelectedId(trend.id)}
              className="w-full flex items-center gap-3 px-4 py-3 text-left transition-colors"
              style={{
                background: isSelected ? 'var(--surface-hover)' : 'transparent',
                borderLeft: isSelected ? `3px solid ${stageColor}` : '3px solid transparent',
                borderBottom: '1px solid var(--border)',
              }}
            >
              <div className="flex-1 min-w-0">
                <div
                  className="text-xs font-medium truncate"
                  style={{ color: isSelected ? 'var(--text)' : 'var(--text-secondary)' }}
                >
                  {trend.name}
                </div>
                <div className="text-xs mt-0.5" style={{ color: stageColor }}>
                  {trend.current_stage}
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <span className="text-xs font-bold" style={{ color: stageColor }}>
                  {trend.trend_score}
                </span>
                {isSelected && (
                  <ChevronRight size={12} style={{ color: stageColor }} />
                )}
              </div>
            </button>
          )
        })}
      </div>

      {/* Detail panel */}
      <div className="flex-1 min-w-0 overflow-y-auto" style={{ maxHeight: '80vh' }}>
        {selectedTrend ? (
          <motion.div
            key={selectedTrend.id}
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
          >
            <TrendDetailPanel
              trend={selectedTrend}
              signals={selectedSignals}
              analysis={selectedAnalysis}
            />
          </motion.div>
        ) : (
          <div
            className="h-full flex items-center justify-center rounded-xl"
            style={{ border: '1px solid var(--border)' }}
          >
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Select a trend to view details.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
