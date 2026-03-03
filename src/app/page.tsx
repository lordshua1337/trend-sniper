import Link from 'next/link'
import { Crosshair, TrendingUp, Database, Brain } from 'lucide-react'

export default function LandingPage() {
  return (
    <div
      className="flex min-h-screen flex-col"
      style={{ background: 'var(--bg)', color: 'var(--text)' }}
    >
      {/* Nav bar */}
      <nav
        className="w-full px-6 py-4 flex items-center justify-between"
        style={{ borderBottom: '1px solid var(--border)' }}
      >
        <div className="flex items-center gap-2">
          <div
            className="flex items-center justify-center w-8 h-8 rounded-lg"
            style={{ background: 'var(--accent-soft)', border: '1px solid rgba(0, 212, 255, 0.3)' }}
          >
            <Crosshair size={18} style={{ color: 'var(--accent)' }} />
          </div>
          <span className="text-lg font-bold tracking-tight">Trend Sniper</span>
        </div>
        <Link
          href="/dashboard"
          className="text-sm font-medium px-4 py-2 rounded-lg transition-all"
          style={{
            background: 'var(--accent-soft)',
            border: '1px solid rgba(0, 212, 255, 0.3)',
            color: 'var(--accent)',
          }}
        >
          Enter Dashboard
        </Link>
      </nav>

      {/* Hero */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-24 text-center">
        {/* Crosshair icon */}
        <div
          className="flex items-center justify-center w-20 h-20 rounded-2xl mb-8"
          style={{
            background: 'var(--accent-soft)',
            border: '1px solid rgba(0, 212, 255, 0.3)',
            boxShadow: '0 0 40px rgba(0, 212, 255, 0.15)',
          }}
        >
          <Crosshair size={40} style={{ color: 'var(--accent)' }} />
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl font-black tracking-tight mb-6 max-w-3xl leading-none">
          <span style={{ color: 'var(--text)' }}>Monitor trends</span>
          <br />
          <span style={{ color: 'var(--accent)' }}>before they peak.</span>
        </h1>

        <p
          className="text-lg sm:text-xl max-w-xl leading-relaxed mb-10"
          style={{ color: 'var(--text-secondary)' }}
        >
          5 data sources. AI-powered analysis. Real-time alerts. Identify the next wave early
          and build before the competition arrives.
        </p>

        {/* CTA */}
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-bold transition-all hover:scale-105"
          style={{
            background: 'var(--accent)',
            color: '#0A0A0F',
            boxShadow: '0 0 30px rgba(0, 212, 255, 0.3)',
          }}
        >
          <Crosshair size={18} />
          Enter Dashboard
        </Link>

        {/* Stats row */}
        <div className="flex items-center gap-8 mt-16 flex-wrap justify-center">
          {[
            { label: 'Trends tracked', value: '45+' },
            { label: 'Data sources', value: '5' },
            { label: 'Categories', value: '11' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                className="text-3xl font-black mb-1"
                style={{ color: 'var(--accent)' }}
              >
                {stat.value}
              </div>
              <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Feature row */}
      <div
        className="border-t px-6 py-16"
        style={{ borderColor: 'var(--border)' }}
      >
        <div className="mx-auto max-w-5xl grid grid-cols-1 sm:grid-cols-3 gap-8">
          {[
            {
              Icon: Database,
              title: '5 Signal Sources',
              desc: 'HackerNews, GitHub, Reddit, Google Trends, and ProductHunt aggregated into a single score.',
            },
            {
              Icon: Brain,
              title: 'AI-Enriched Analysis',
              desc: 'Each trend analyzed with historical patterns, confidence scoring, and peak timing estimates.',
            },
            {
              Icon: TrendingUp,
              title: 'Goldmine Finder',
              desc: 'Filter by competition density and monetization signal to find high-opportunity, low-competition gaps.',
            },
          ].map(({ Icon, title, desc }) => (
            <div
              key={title}
              className="flex flex-col gap-3 p-6 rounded-xl"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
              }}
            >
              <div
                className="flex items-center justify-center w-10 h-10 rounded-lg"
                style={{ background: 'var(--accent-soft)', border: '1px solid rgba(0, 212, 255, 0.2)' }}
              >
                <Icon size={20} style={{ color: 'var(--accent)' }} />
              </div>
              <h3 className="font-bold text-base" style={{ color: 'var(--text)' }}>
                {title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
