import { SEOHead } from '../../components/SEOHead.jsx'
import { Link } from 'react-router-dom'
import { TOOLS } from '../../tools.js'

export function About() {
  return (
    <>
      <SEOHead
        title="About RiskTools"
        description="RiskTools is a free suite of trading risk management tools built for forex, gold, indices and crypto traders. No login, no data collection."
        path="/about"
      />
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="page-title mb-2">ABOUT RISKTOOLS</h1>
        <p className="text-text-muted text-sm mb-8">Built for traders, by traders</p>

        <div className="space-y-6 text-sm text-text-secondary leading-relaxed">
          <div className="tool-card p-6">
            <h2 className="text-base font-semibold text-text-primary mb-3">What is RiskTools?</h2>
            <p className="text-text-muted">RiskTools is a free, open-access suite of trading risk management calculators designed for forex, gold, indices and cryptocurrency traders. Our mission is simple: eliminate the mental math and calculation errors that cost traders money.</p>
            <p className="text-text-muted mt-3">Whether you are a complete beginner or an experienced prop trader, the right position size and risk calculation should take seconds — not minutes. RiskTools makes that possible.</p>
          </div>

          <div className="tool-card p-6">
            <h2 className="text-base font-semibold text-text-primary mb-4">Our Tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {TOOLS.map(t => (
                <Link key={t.slug} to={`/${t.slug}`} className="flex items-start gap-2 hover:text-green transition-colors">
                  <span>{t.emoji}</span>
                  <div>
                    <p className="font-medium text-text-primary text-xs">{t.name}</p>
                    <p className="text-text-muted text-xs">{t.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="tool-card p-6">
            <h2 className="text-base font-semibold text-text-primary mb-3">Our Principles</h2>
            <ul className="space-y-2 text-text-muted">
              <li className="flex items-start gap-2"><span className="text-green">→</span> <span><strong className="text-text-secondary">Always free.</strong> No subscriptions, no paywalls, no premium tiers.</span></li>
              <li className="flex items-start gap-2"><span className="text-green">→</span> <span><strong className="text-text-secondary">Privacy first.</strong> No data collection. Everything runs in your browser.</span></li>
              <li className="flex items-start gap-2"><span className="text-green">→</span> <span><strong className="text-text-secondary">Simple by design.</strong> No trader should need a finance degree to manage risk.</span></li>
              <li className="flex items-start gap-2"><span className="text-green">→</span> <span><strong className="text-text-secondary">Fast.</strong> Results in under 10 seconds. Every time.</span></li>
            </ul>
          </div>

          <div className="tool-card p-5 border-border">
            <p className="text-xs text-text-muted">
              <strong className="text-amber">⚠ Disclaimer:</strong> RiskTools is for educational and informational purposes only. Nothing on this site constitutes financial advice. Trading involves substantial risk of loss. Always conduct your own research and consult a qualified financial advisor before making trading decisions.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export function Contact() {
  return (
    <>
      <SEOHead
        title="Contact"
        description="Contact the RiskTools team. We're happy to hear feedback, suggestions or questions about our free trading tools."
        path="/contact"
      />
      <div className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="page-title mb-2">CONTACT</h1>
        <p className="text-text-muted text-sm mb-8">Get in touch with the RiskTools team</p>

        <div className="space-y-4">
          <div className="tool-card p-6">
            <h2 className="text-sm font-semibold text-text-primary mb-4">Reach Us</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-xl">📧</span>
                <div>
                  <p className="text-xs text-text-muted uppercase tracking-widest mb-0.5">Email</p>
                  <a href="mailto:contact@risktools.io" className="text-green hover:underline text-sm font-medium">
                    contact@risktools.io
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="tool-card p-6">
            <h2 className="text-sm font-semibold text-text-primary mb-3">What We Can Help With</h2>
            <ul className="space-y-2 text-xs text-text-muted">
              <li className="flex items-start gap-2"><span className="text-green">→</span> Tool calculation errors or bugs</li>
              <li className="flex items-start gap-2"><span className="text-green">→</span> Suggestions for new tools or features</li>
              <li className="flex items-start gap-2"><span className="text-green">→</span> General feedback about RiskTools</li>
              <li className="flex items-start gap-2"><span className="text-green">→</span> Partnership or advertising inquiries</li>
              <li className="flex items-start gap-2"><span className="text-green">→</span> Privacy or data questions</li>
            </ul>
          </div>

          <div className="tool-card p-5">
            <p className="text-xs text-text-muted">
              We typically respond within 24–48 hours. For privacy-related questions, please review our <Link to="/privacy" className="text-green hover:underline">Privacy Policy</Link> first.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export function NotFound() {
  return (
    <>
      <SEOHead title="404 Not Found" description="Page not found." />
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <div className="text-6xl mb-4">📊</div>
        <h1 className="page-title mb-3">PAGE NOT FOUND</h1>
        <p className="text-text-muted mb-6">The page you're looking for doesn't exist.</p>
        <Link to="/" className="btn-primary w-auto px-8">← Back to Tools</Link>
      </div>
    </>
  )
}
