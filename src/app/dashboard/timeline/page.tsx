import { Activity } from 'lucide-react'
import { TrendTimeline } from '@/components/dashboard/TrendTimeline'

export default function TimelinePage() {
  return (
    <div className="flex flex-col gap-6">
      {/* Page header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Activity size={20} style={{ color: 'var(--accent)' }} />
          <h1 className="text-2xl font-black tracking-tight" style={{ color: 'var(--text)' }}>
            Timeline
          </h1>
        </div>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Drill into each trend: signal breakdown, AI analysis, and historical pattern matching.
        </p>
      </div>

      <TrendTimeline />
    </div>
  )
}
