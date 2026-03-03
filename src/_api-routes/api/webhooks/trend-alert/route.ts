import { NextRequest, NextResponse } from 'next/server'
import { TrendAlertWebhookSchema } from '@/lib/validation/schemas'

export async function POST(req: NextRequest) {
  let body: unknown

  try {
    body = await req.json()
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON body.' },
      { status: 400 }
    )
  }

  const result = TrendAlertWebhookSchema.safeParse(body)

  if (!result.success) {
    return NextResponse.json(
      {
        error: 'Validation failed.',
        issues: result.error.issues.map((i) => ({
          path: i.path,
          message: i.message,
        })),
      },
      { status: 422 }
    )
  }

  const payload = result.data

  // Stub: log received payload. Real implementation would persist to DB.
  console.log('[webhook/trend-alert] Received:', payload)

  return NextResponse.json(
    {
      status: 'received',
      processed: false,
      trend_id: payload.trend_id,
      alert_type: payload.alert_type,
    },
    { status: 200 }
  )
}
