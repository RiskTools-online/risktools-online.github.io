import { Link } from 'react-router-dom'
import { SEOHead } from '../components/SEOHead.jsx'
import { AdSlot } from '../components/AdSlot.jsx'
import { TOOLS } from '../tools.js'
import { ArrowRight, Shield, Zap, Lock } from 'lucide-react'

export default function Home() {
  return (
    <>
      <SEOHead
        title={null}
        description="Free trading risk management tools for forex, gold, indices and crypto. Position size calculator, risk/reward, drawdown, compounding and more. No login required."
        path="/"
      />
      <div className="max-w-6xl mx-auto px-4">
        {/* Hero */}
        <section className="pt-16 pb-12 text-center">
          <div className="inline-flex items-center gap-2 bg-green-muted border border-green/20 text-green text-xs font-medium px-4 py-1.5 rounded-full mb-6 animate-fade-up">
            <span className="w-1.5 h-1.5 bg-green rounded-full animate-pulse-slow" />
            Free · No Login · Instant Results
          </div>
          <h1
            className="animate-fade-up text-text-primary leading-none tracking-wider mb-4"
            style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(3rem, 10vw, 6rem)', animationDelay: '40ms' }}
          >
            TRADE SMARTER.<br />
            <span style={{ color: '#00D97E' }}>RISK LESS.</span>
          </h1>
          <p className="text-text-secondary text-base max-w-lg mx-auto animate-fade-up" style={{ animationDelay: '80ms' }}>
            Professional-grade risk management tools for traders of all levels. Calculate position sizes, risk/reward ratios, and more — in seconds.
          </p>
          <div className="flex items-center justify-center gap-3 mt-8 animate-fade-up" style={{ animationDelay: '120ms' }}>
            <Link to="/risk-calculator" className="btn-primary w-auto px-8 py-3 flex items-center gap-2">
              Start Calculating <ArrowRight size={16} />
            </Link>
            <Link to="/forex-sessions" className="btn-secondary flex items-center gap-2">
              Live Sessions
            </Link>
          </div>
        </section>

        <AdSlot size="leaderboard" className="mb-10" />

        {/* Tools grid */}
        <section className="pb-16">
          <h2 className="text-xs font-semibold text-text-muted uppercase tracking-widest mb-6">All Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 stagger">
            {TOOLS.map(tool => (
              <Link
                key={tool.slug}
                to={`/${tool.slug}`}
                className="tool-card p-5 block group hover:border-green/30 hover:shadow-glow-green transition-all duration-200 animate-fade-up"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-2xl">{tool.emoji}</span>
                  <ArrowRight size={14} className="text-text-muted group-hover:text-green transition-colors mt-1" />
                </div>
                <h3 className="font-semibold text-text-primary mb-1 group-hover:text-green transition-colors">
                  {tool.name}
                </h3>
                <p className="text-xs text-text-muted leading-relaxed">{tool.description}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Value props */}
        <section className="border-t border-border py-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: 'Instant Calculations', desc: 'Results update as you type. No button clicks needed.' },
              { icon: Lock, title: 'Zero Data Stored', desc: 'Everything runs locally in your browser. We never see your data.' },
              { icon: Shield, title: 'Built for Real Traders', desc: 'Used daily by forex, gold, indices and crypto traders worldwide.' },
            ].map(v => (
              <div key={v.title} className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-muted rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <v.icon size={15} className="text-green" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-text-primary mb-1">{v.title}</h3>
                  <p className="text-xs text-text-muted leading-relaxed">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <AdSlot size="rectangle" className="mb-10" />

        {/* Disclaimer */}
        <section className="border-t border-border py-8">
          <p className="text-xs text-text-muted text-center max-w-2xl mx-auto leading-relaxed">
            ⚠️ <strong className="text-text-secondary">Disclaimer:</strong> RiskTools is for educational and informational purposes only. The calculations provided are tools to assist your decision-making and do not constitute financial advice. Trading involves significant risk of loss. Always do your own research.
          </p>
        </section>
      </div>
    </>
  )
}
