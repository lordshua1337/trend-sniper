import type { Alert } from '../types'

interface WebhookConnection {
  readonly url: string
  readonly secret?: string
}

function parseConnections(): readonly WebhookConnection[] {
  const raw = process.env.WEBHOOK_CONNECTIONS
  if (!raw) {
    return []
  }

  try {
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) {
      console.warn('[send-trend-alert] WEBHOOK_CONNECTIONS is not an array. Skipping.')
      return []
    }
    return parsed as WebhookConnection[]
  } catch (err) {
    console.error('[send-trend-alert] Failed to parse WEBHOOK_CONNECTIONS:', err)
    return []
  }
}

export interface TrendAlertPayload {
  readonly alert: Alert
  readonly timestamp: string
}

export async function sendTrendAlert(alert: Alert): Promise<void> {
  const connections = parseConnections()

  if (connections.length === 0) {
    console.log('[send-trend-alert] No webhook connections configured. Stub -- alert not sent:', alert.id)
    return
  }

  const payload: TrendAlertPayload = {
    alert,
    timestamp: new Date().toISOString(),
  }

  const body = JSON.stringify(payload)

  const results = await Promise.allSettled(
    connections.map(async (conn) => {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      }

      if (conn.secret) {
        headers['X-Webhook-Secret'] = conn.secret
      }

      const response = await fetch(conn.url, {
        method: 'POST',
        headers,
        body,
      })

      if (!response.ok) {
        throw new Error(`Webhook ${conn.url} responded with ${response.status}`)
      }

      console.log(`[send-trend-alert] Sent alert ${alert.id} to ${conn.url}`)
    })
  )

  results.forEach((result, i) => {
    if (result.status === 'rejected') {
      console.error(`[send-trend-alert] Failed to send to connection ${i}:`, result.reason)
    }
  })
}
