import { NextRequest, NextResponse } from 'next/server'
import { getTrends } from '@/lib/mock-data'
import type { TrendCategory, TrendStage } from '@/lib/types'

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl

  const category = searchParams.get('category') as TrendCategory | null
  const stage = searchParams.get('stage') as TrendStage | null
  const minScore = searchParams.get('min_score')
  const maxScore = searchParams.get('max_score')
  const competition = searchParams.get('competition') as 'Low' | 'Medium' | 'High' | null
  const monetization = searchParams.get('monetization') as 'None' | 'Emerging' | 'Proven' | 'Unknown' | null
  const sortBy = searchParams.get('sort_by') as 'trend_score' | 'confidence_score' | 'name' | 'created_at' | null
  const sortDir = searchParams.get('sort_dir') as 'asc' | 'desc' | null
  const limit = searchParams.get('limit')

  const trends = getTrends({
    category: category ?? undefined,
    stage: stage ?? undefined,
    minScore: minScore !== null ? Number(minScore) : undefined,
    maxScore: maxScore !== null ? Number(maxScore) : undefined,
    competition: competition ?? undefined,
    monetization: monetization ?? undefined,
    sortBy: sortBy ?? undefined,
    sortDir: sortDir ?? undefined,
  })

  const sliced = limit !== null ? trends.slice(0, Number(limit)) : trends

  return NextResponse.json({
    data: sliced,
    total: sliced.length,
    filters_applied: {
      category,
      stage,
      min_score: minScore,
      max_score: maxScore,
      competition,
      monetization,
    },
  })
}
