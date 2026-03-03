import { z } from 'zod'

export const TrendCategoryEnum = z.enum([
  'AI/ML',
  'Fintech',
  'Health',
  'Education',
  'Creator Tools',
  'Dev Tools',
  'E-Commerce',
  'Web3',
  'Infrastructure',
  'Enterprise',
  'Other',
])

export const TrendStageEnum = z.enum([
  'Emerging',
  'Accelerating',
  'Peaking',
  'Saturating',
  'Declining',
])

export const TrendSignalSourceEnum = z.enum([
  'HackerNews',
  'GitHub',
  'Reddit',
  'GoogleTrends',
  'ProductHunt',
])

export const WatchlistSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(100, 'Name must be 100 characters or fewer'),
  description: z.string().max(500, 'Description must be 500 characters or fewer').optional(),
  keyword_filters: z
    .string()
    .transform((val) =>
      val
        .split(',')
        .map((s) => s.trim())
        .filter((s) => s.length > 0)
    )
    .pipe(z.array(z.string().min(1)).min(1, 'At least one keyword is required')),
  category_filters: z.array(TrendCategoryEnum).optional(),
  min_trend_score: z
    .number()
    .min(0, 'Minimum score must be 0 or greater')
    .max(100, 'Minimum score must be 100 or less')
    .default(0),
})

export type WatchlistFormValues = z.infer<typeof WatchlistSchema>

export const TrendAlertWebhookSchema = z.object({
  trend_id: z.string().min(1),
  alert_type: z.enum(['Breakout', 'Decay', 'DailyDigest', 'Custom']),
  title: z.string().min(1),
  message: z.string().min(1),
})

export type TrendAlertWebhookPayload = z.infer<typeof TrendAlertWebhookSchema>
