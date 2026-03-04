import { mockTrends } from '@/lib/mock-data'
import { OpportunityDetail } from './opportunity-detail'

export function generateStaticParams() {
  return mockTrends.map((trend) => ({ id: trend.id }))
}

export default async function OpportunityDetailPage({ params }: { readonly params: Promise<{ id: string }> }) {
  const { id } = await params
  return <OpportunityDetail trendId={id} />
}
