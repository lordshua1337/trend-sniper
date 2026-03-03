import { BarChart2 } from 'lucide-react'
import { TrendComparison } from '@/components/dashboard/TrendComparison'
import { getTrends } from '@/lib/mock-data'

export default function ComparisonPage() {
  const trends = getTrends({ sortBy: 'trend_score', sortDir: 'desc' })

  return (
    <div className="flex flex-col gap-6">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <BarChart2 size={20} style={{ color: 'var(--accent)' }} />
          <h1 className="text-2xl font-black tracking-tight" style={{ color: 'var(--text)' }}>
            Compare
          </h1>
        </div>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Select up to 3 trends and compare their scores, confidence, competition, and build time side by side.
        </p>
      </div>

      <TrendComparison trends={trends} />
    </div>
  )
}
