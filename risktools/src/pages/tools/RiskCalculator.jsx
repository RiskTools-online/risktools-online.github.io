import { useState } from 'react'
import { SEOHead } from '../../components/SEOHead.jsx'
import { ToolLayout } from '../../components/Layout.jsx'
import { Info } from 'lucide-react'

const ASSETS = [
  { id: 'forex', label: 'Forex (Major pairs)' },
  { id: 'gold', label: 'Gold (XAU/USD)' },
  { id: 'indices', label: 'Indices (US30, NAS100)' },
  { id: 'crypto', label: 'Crypto (BTC, ETH)' },
]

export default function RiskCalculator() {
  const [balance, setBalance] = useState('10000')
  const [riskPct, setRiskPct] = useState('1')
  const [sl, setSl] = useState('50')
  const [asset, setAsset] = useState('forex')

  const bal = parseFloat(balance) || 0
  const pct = parseFloat(riskPct) || 0
  const slPips = parseFloat(sl) || 0
  const dollarRisk = (bal * pct) / 100
  const isValid = bal > 0 && pct > 0 && slPips > 0

  const riskLevel = pct <= 1 ? 'conservative' : pct <= 2 ? 'moderate' : 'aggressive'
  const riskColors = { conservative: 'tag-green', moderate: 'tag-amber', aggressive: 'tag-red' }
  const riskLabels = { conservative: '✓ Conservative', moderate: '⚡ Moderate', aggressive: '⚠ Aggressive' }

  return (
    <>
      <SEOHead
        title="Risk Calculator"
        description="Free trading risk calculator. Enter your account balance and risk percentage to instantly calculate your dollar risk per trade."
        path="/risk-calculator"
      />
      <ToolLayout
        title="RISK CALCULATOR"
        description="Calculate how much money to risk per trade based on your account size and risk tolerance."
      >
        <div className="tool-card">
          <div className="p-6 border-b border-border">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="label-text">Account Balance ($)</label>
                <input type="number" className="input-field" value={balance} onChange={e => setBalance(e.target.value)} placeholder="10000" min="0" />
                <p className="tooltip">Your total trading account balance</p>
              </div>
              <div>
                <label className="label-text">Risk per Trade (%)</label>
                <input type="number" className="input-field" value={riskPct} onChange={e => setRiskPct(e.target.value)} placeholder="1" min="0" max="100" step="0.1" />
                <p className="tooltip">Recommended: 0.5%–2% per trade</p>
              </div>
              <div>
                <label className="label-text">Stop Loss (pips / points)</label>
                <input type="number" className="input-field" value={sl} onChange={e => setSl(e.target.value)} placeholder="50" min="0" />
                <p className="tooltip">Distance from entry to stop loss</p>
              </div>
              <div>
                <label className="label-text">Asset Type</label>
                <select className="select-field" value={asset} onChange={e => setAsset(e.target.value)}>
                  {ASSETS.map(a => <option key={a.id} value={a.id}>{a.label}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Result */}
          <div className="p-6 bg-surface-900/50">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="result-box">
                <p className="result-label">Dollar Risk</p>
                <p className={`result-value text-2xl ${isValid ? 'text-green' : 'text-text-muted'}`}>
                  {isValid ? `$${dollarRisk.toFixed(2)}` : '—'}
                </p>
              </div>
              <div className="result-box">
                <p className="result-label">Risk Level</p>
                <div className="mt-1">
                  {isValid
                    ? <span className={`tag ${riskColors[riskLevel]} text-sm`}>{riskLabels[riskLevel]}</span>
                    : <span className="text-text-muted">—</span>}
                </div>
              </div>
            </div>
            <div className="flex items-start gap-2 bg-surface-800 rounded-xl p-3">
              <Info size={14} className="text-text-muted flex-shrink-0 mt-0.5" />
              <p className="text-xs text-text-muted leading-relaxed">
                With a <span className="text-text-secondary">${bal.toLocaleString()}</span> account risking <span className="text-text-secondary">{pct}%</span>, you should never lose more than <span className="text-green">${dollarRisk.toFixed(2)}</span> on this trade.
              </p>
            </div>
          </div>
        </div>

        {/* Risk % guide */}
        <div className="mt-6 tool-card p-5">
          <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-widest mb-4">Risk % Guide</h2>
          <div className="space-y-2">
            {[
              { pct: '0.5%', label: 'Ultra safe — beginners', color: 'bg-green' },
              { pct: '1%', label: 'Standard — most traders', color: 'bg-green' },
              { pct: '2%', label: 'Moderate — experienced', color: 'bg-amber' },
              { pct: '5%+', label: 'High risk — not recommended', color: 'bg-red' },
            ].map(r => (
              <div key={r.pct} className="flex items-center gap-3">
                <span className={`w-2 h-2 rounded-full ${r.color} flex-shrink-0`} />
                <span className="font-mono text-xs text-green w-12">{r.pct}</span>
                <span className="text-xs text-text-muted">{r.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 text-xs text-text-muted leading-relaxed">
          <h2 className="text-sm font-semibold text-text-secondary mb-2">About This Calculator</h2>
          <p>The risk calculator helps traders determine the correct dollar amount to risk per trade. Proper risk management is the foundation of consistent profitability — no matter how good your strategy is. Most professional traders risk between 0.5% and 2% per trade to preserve capital during losing streaks.</p>
        </div>
      </ToolLayout>
    </>
  )
}
