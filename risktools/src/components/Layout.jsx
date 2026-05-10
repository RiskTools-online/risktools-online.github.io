import { Link, useLocation } from 'react-router-dom'
import { TOOLS } from '../tools.js'
import { AdSlot } from './AdSlot.jsx'
import { BarChart2, Menu, X } from 'lucide-react'
import { useState } from 'react'

export function Layout({ children }) {
  const loc = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Ad */}
      <div className="hidden md:block border-b border-border bg-surface-900 py-2 px-4">
        <AdSlot size="leaderboard" className="max-w-5xl mx-auto" />
      </div>

      {/* Nav */}
      <header className="border-b border-border bg-surface-900/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-7 h-7 bg-green rounded-lg flex items-center justify-center">
              <BarChart2 size={14} className="text-surface-950" strokeWidth={2.5} />
            </div>
            <span className="font-display text-xl tracking-wider text-text-primary group-hover:text-green transition-colors"
              style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.1em' }}>
              RISKTOOLS
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {TOOLS.map(t => (
              <Link
                key={t.slug}
                to={`/${t.slug}`}
                className={loc.pathname === `/${t.slug}` ? 'nav-link-active' : 'nav-link'}
              >
                {t.short}
              </Link>
            ))}
          </nav>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 text-text-secondary hover:text-text-primary"
            onClick={() => setMobileOpen(o => !o)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-border bg-surface-900 px-4 py-3 grid grid-cols-2 gap-1">
            {TOOLS.map(t => (
              <Link
                key={t.slug}
                to={`/${t.slug}`}
                onClick={() => setMobileOpen(false)}
                className={`text-sm px-3 py-2 rounded-lg ${loc.pathname === `/${t.slug}` ? 'bg-green-muted text-green' : 'text-text-secondary hover:text-text-primary hover:bg-surface-700'}`}
              >
                {t.emoji} {t.short}
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* Main */}
      <main className="flex-1">{children}</main>

      {/* Mobile sticky ad */}
      <div className="md:hidden sticky bottom-0 z-40 border-t border-border bg-surface-900 py-1 px-4">
        <AdSlot size="mobile" />
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-surface-900 py-10 mt-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 bg-green rounded-md flex items-center justify-center">
                  <BarChart2 size={12} className="text-surface-950" strokeWidth={2.5} />
                </div>
                <span className="font-display tracking-wider text-text-primary"
                  style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.1em', fontSize: '18px' }}>
                  RISKTOOLS
                </span>
              </div>
              <p className="text-xs text-text-muted max-w-xs leading-relaxed">
                Free trading risk management tools for forex, gold, indices and crypto traders. No login required.
              </p>
              <p className="text-xs text-text-muted mt-3">
                ⚠️ For educational purposes only. Not financial advice.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-x-12 gap-y-1">
              <div>
                <p className="text-xs font-semibold text-text-secondary uppercase tracking-widest mb-2">Tools</p>
                {TOOLS.map(t => (
                  <Link key={t.slug} to={`/${t.slug}`} className="block text-xs text-text-muted hover:text-green transition-colors py-0.5">
                    {t.emoji} {t.name}
                  </Link>
                ))}
              </div>
              <div>
                <p className="text-xs font-semibold text-text-secondary uppercase tracking-widest mb-2">Company</p>
                <Link to="/about" className="block text-xs text-text-muted hover:text-green transition-colors py-0.5">About</Link>
                <Link to="/contact" className="block text-xs text-text-muted hover:text-green transition-colors py-0.5">Contact</Link>
                <Link to="/privacy" className="block text-xs text-text-muted hover:text-green transition-colors py-0.5">Privacy Policy</Link>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-text-muted">© {new Date().getFullYear()} RiskTools. All rights reserved.</p>
            <div className="flex gap-4">
              <Link to="/privacy" className="text-xs text-text-muted hover:text-green transition-colors">Privacy Policy</Link>
              <Link to="/about" className="text-xs text-text-muted hover:text-green transition-colors">About</Link>
              <Link to="/contact" className="text-xs text-text-muted hover:text-green transition-colors">Contact</Link>
            </div>
          </div>
        </div>
        <AdSlot size="leaderboard" className="max-w-5xl mx-auto mt-6" />
      </footer>
    </div>
  )
}

export function ToolLayout({ title, description, children, path }) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-8 animate-fade-up">
        <h1 className="page-title">{title}</h1>
        <p className="page-sub">{description}</p>
      </div>
      <AdSlot size="rectangle" className="mb-8" />
      <div className="animate-fade-up" style={{ animationDelay: '80ms' }}>{children}</div>
      <div className="mt-10"><AdSlot size="leaderboard" /></div>
    </div>
  )
}
