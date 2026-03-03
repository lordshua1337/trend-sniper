import { NextRequest, NextResponse } from 'next/server'
import { getTrends } from '@/lib/mock-data'
import type { Trend } from '@/lib/types'

const CSV_HEADERS = [
  'id',
  'name',
  'category',
  'current_stage',
  'trend_score',
  'confidence_score',
  'competition_density',
  'monetization_signal',
  'time_to_build_days',
  'created_at',
  'updated_at',
]

function escapeCell(value: unknown): string {
  const str = value === undefined || value === null ? '' : String(value)
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`
  }
  return str
}

function trendToRow(trend: Trend): string {
  return CSV_HEADERS.map((header) => escapeCell(trend[header as keyof Trend])).join(',')
}

export async function POST(req: NextRequest) {
  let filters: Record<string, unknown> = {}

  try {
    const body = await req.json()
    if (body && typeof body === 'object') {
      filters = body as Record<string, unknown>
    }
  } catch {
    // No body -- export all trends
  }

  const trends = getTrends({
    category: typeof filters.category === 'string' ? (filters.category as import('@/lib/types').TrendCategory) : undefined,
    stage: typeof filters.stage === 'string' ? (filters.stage as import('@/lib/types').TrendStage) : undefined,
    minScore: typeof filters.min_score === 'number' ? filters.min_score : undefined,
  })

  const rows = [
    CSV_HEADERS.join(','),
    ...trends.map(trendToRow),
  ]

  const csv = rows.join('\n')

  return new NextResponse(csv, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': `attachment; filename="trends-export-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  })
}
