import Link from 'next/link'
import { Crosshair, TrendingUp, Target, Zap, ArrowRight, DollarSign, Shield } from 'lucide-react'

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
            background: 'var(--accent)',
            color: '#0A0A0F',
          }}
        >
          Find Opportunities
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
          <span style={{ color: 'var(--text)' }}>Find what to build</span>
          <br />
          <span style={{ color: 'var(--accent)' }}>before everyone else.</span>
        </h1>

        <p
          className="text-lg sm:text-xl max-w-xl leading-relaxed mb-10"
          style={{ color: 'var(--text-secondary)' }}
        >
          Trend Sniper analyzes 45+ market trends across 11 categories, scores them on buildability, and gives you a specific product idea, target customer, and revenue model for each one.
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
          <Target size={18} />
          See Top Opportunities
          <ArrowRight size={18} />
        </Link>

        {/* Stats row */}
        <div className="flex items-center gap-8 mt-16 flex-wrap justify-center">
          {[
            { label: 'Trends analyzed', value: '45+' },
            { label: 'Build playbooks', value: '18' },
            { label: 'Product ideas', value: '35+' },
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

      {/* How it works */}
      <div
        className="border-t px-6 py-16"
        style={{ borderColor: 'var(--border)' }}
      >
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-black text-center mb-2" style={{ color: 'var(--text)' }}>
            From Trend to Product in 3 Steps
          </h2>
          <p className="text-sm text-center mb-10" style={{ color: 'var(--text-secondary)' }}>
            Stop guessing what to build. Let the data decide.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                Icon: TrendingUp,
                step: '01',
                title: 'Spot the Signal',
                desc: '45+ trends scored by momentum, competition density, and monetization signal across 11 categories. The Build Score tells you which ones are worth your time right now.',
              },
              {
                Icon: Zap,
                title: 'Get the Playbook',
                step: '02',
                desc: 'Every high-scoring trend comes with specific product ideas, target customers, revenue models, estimated MRR, and build advice. Not generic suggestions -- actionable strategies.',
              },
              {
                Icon: DollarSign,
                title: 'Build & Track',
                step: '03',
                desc: 'Add opportunities to your pipeline. Track them from Watching to Researching to Building to Launched. See your entire opportunity portfolio in one view.',
              },
            ].map(({ Icon, step, title, desc }) => (
              <div
                key={title}
                className="flex flex-col gap-3 p-6 rounded-xl"
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="flex items-center justify-center w-10 h-10 rounded-lg"
                    style={{ background: 'var(--accent-soft)', border: '1px solid rgba(0, 212, 255, 0.2)' }}
                  >
                    <Icon size={20} style={{ color: 'var(--accent)' }} />
                  </div>
                  <span className="text-xs font-bold" style={{ color: 'var(--text-secondary)' }}>{step}</span>
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

      {/* Example opportunity */}
      <div
        className="border-t px-6 py-16"
        style={{ borderColor: 'var(--border)' }}
      >
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-black text-center mb-2" style={{ color: 'var(--text)' }}>
            What You Get for Each Trend
          </h2>
          <p className="text-sm text-center mb-8" style={{ color: 'var(--text-secondary)' }}>
            Every opportunity comes with a complete build playbook
          </p>

          <div
            className="rounded-xl p-6 flex flex-col gap-4"
            style={{ background: 'var(--surface)', border: '1px solid rgba(0, 230, 118, 0.3)', boxShadow: '0 0 30px rgba(0, 230, 118, 0.08)' }}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                  Example Opportunity
                </div>
                <h3 className="text-xl font-black" style={{ color: 'var(--text)' }}>AI Brand Voice Tools</h3>
                <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>Creator Tools</span>
              </div>
              <div className="text-right">
                <div className="text-3xl font-black" style={{ color: 'var(--success)' }}>72</div>
                <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>Build Score</div>
              </div>
            </div>

            <div
              className="flex items-center gap-2 px-3 py-2 rounded-lg"
              style={{ background: 'rgba(0, 230, 118, 0.08)', border: '1px solid rgba(0, 230, 118, 0.2)' }}
            >
              <Shield size={14} style={{ color: 'var(--success)' }} />
              <span className="text-sm font-bold" style={{ color: 'var(--success)' }}>Build Now</span>
              <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                -- Low competition, clear pain point, growing TAM
              </span>
            </div>

            <div
              className="rounded-lg p-4"
              style={{ background: 'rgba(0, 212, 255, 0.05)', border: '1px solid rgba(0, 212, 255, 0.15)' }}
            >
              <div className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--accent)' }}>
                Top Product Idea
              </div>
              <div className="text-sm font-bold mb-1" style={{ color: 'var(--text)' }}>
                Brand Voice Linter
              </div>
              <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                Browser extension and API that checks AI-generated content against a company&apos;s brand voice guidelines.
              </div>
              <div className="flex items-center gap-4 mt-2 text-xs">
                <span style={{ color: 'var(--text-secondary)' }}>
                  Target: <span style={{ color: 'var(--text)' }}>Marketing teams</span>
                </span>
                <span style={{ color: 'var(--text-secondary)' }}>
                  MRR: <span style={{ color: 'var(--success)' }}>$15K-60K</span>
                </span>
                <span style={{ color: 'var(--text-secondary)' }}>
                  Time to revenue: <span style={{ color: 'var(--text)' }}>2-3 months</span>
                </span>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-3 text-center text-xs">
              <div>
                <div className="font-bold" style={{ color: 'var(--accent)' }}>28</div>
                <div style={{ color: 'var(--text-secondary)' }}>Momentum</div>
              </div>
              <div>
                <div className="font-bold" style={{ color: 'var(--success)' }}>Low</div>
                <div style={{ color: 'var(--text-secondary)' }}>Competition</div>
              </div>
              <div>
                <div className="font-bold" style={{ color: 'var(--text)' }}>Emerging</div>
                <div style={{ color: 'var(--text-secondary)' }}>Monetization</div>
              </div>
              <div>
                <div className="font-bold" style={{ color: 'var(--text)' }}>21d</div>
                <div style={{ color: 'var(--text-secondary)' }}>Build Time</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div
        className="border-t px-6 py-16 text-center"
        style={{ borderColor: 'var(--border)' }}
      >
        <h2 className="text-2xl font-black mb-3" style={{ color: 'var(--text)' }}>
          Stop scrolling for ideas. Start building.
        </h2>
        <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
          Your next product is already in the data. Find it.
        </p>
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
          Find Your Next Build
        </Link>
      </div>
    </div>
  )
}
