import { useState } from 'react'
import { SEOHead } from '../../components/SEOHead.jsx'
import { ToolLayout } from '../../components/Layout.jsx'

export default function DrawdownCalculator() {
  const [balance, setBalance] = useState('10000')
  const [lossPct, setLossPct] = useState('20')

  const bal = parseFloat(balance) || 0
  const pct = parseFloat(lossPct) || 0
  const remaining = bal * (1 - pct / 100)
  const lost = bal - remaining
  const recoveryNeeded = pct > 0 ? (pct / (100 - pct)) * 100 : 0
  const isValid = bal > 0 && pct > 0 && pct < 100

  const severity = pct <= 10 ? 'low' : pct <= 25 ? 'moderate' : pct <= 50 ? 'high' : 'critical'
  const severityConfig = {
    low:      { label: 'Low Risk', color: 'text-green', bar: 'bg-green' },
    moderate: { label: 'Moderate', color: 'text-amber', bar: 'bg-amber' },
    high:     { label: 'High Risk', color: 'text-red', bar: 'bg-red' },
    critical: { label: 'Critical', color: 'text-red', bar: 'bg-red' },
  }
  const sc = severityConfig[severity]

  // Losing streak simulation
  const streaks = [3, 5, 7, 10]
  const riskPerTrade = 1 // 1% default

  return (
    <>
      <SEOHead
        title="Drawdown Calculator"
        description="Free drawdown calculator for traders. See how a drawdown impacts your balance and how much you need to recover to break even."
        path="/drawdown-calculator"
      />
      <ToolLayout
        title="DRAWDOWN CALCULATOR"
        description="Understand the real impact of drawdown and how much you need to recover to get back to break even."
      >
        <div className="tool-card">
          <div className="p-6 border-b border-border">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="label-text">Account Balance ($)</label>
                <input type="number" className="input-field" value={balance} onChange={e => setBalance(e.target.value)} placeholder="10000" />
              </div>
              <div>
                <label className="label-text">Drawdown / Loss (%)</label>
                <input type="number" className="input-field" value={lossPct} onChange={e => setLossPct(e.target.value)} placeholder="20" min="0" max="99" step="0.5" />
                <p className="tooltip">How much % of your account you lost</p>
              </div>
            </div>

            {/* Visual bar */}
            {isValid && (
              <div className="mt-5">
                <div className="flex justify-between text-xs text-text-muted mb-1.5">
                  <span>Remaining: ${remaining.toFixed(0)}</span>
                  <span>Lost: ${lost.toFixed(0)}</span>
                </div>
                <div className="h-4 bg-surface-700 rounded-full overflow-hidden">
                  <div
                    className="bg-surface-500 h-full rounded-full bar-fill relative"
                    style={{ width: `${100 - pct}%` }}
                  >
                    <div className="absolute inset-0 bg-green/20 rounded-full" />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-6 bg-surface-900/50">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
              <div className="result-box">
                <p className="result-label">Remaining</p>
                <p className={`result-value text-lg ${isValid ? 'text-text-primary' : 'text-text-muted'}`}>
                  {isValid ? `$${remaining.toFixed(2)}` : '—'}
                </p>
              </div>
              <div className="result-box">
                <p className="result-label">Amount Lost</p>
                <p className={`result-value ${isValid ? 'text-red' : 'text-text-muted'}`}>
                  {isValid ? `-$${lost.toFixed(2)}` : '—'}
                </p>
              </div>
              <div className="result-box">
                <p className="result-label">Recovery Needed</p>
                <p className={`result-value text-lg ${isValid ? 'text-amber' : 'text-text-muted'}`}>
                  {isValid ? `${recoveryNeeded.toFixed(1)}%` : '—'}
                </p>
              </div>
              <div className="result-box">
                <p className="result-label">Severity</p>
                <p className={`text-sm font-semibold mt-1 ${isValid ? sc.color : 'text-text-muted'}`}>
                  {isValid ? sc.label : '—'}
                </p>
              </div>
            </div>

            {isValid && recoveryNeeded > pct && (
              <div className="bg-red-muted border border-red/20 rounded-xl p-3">
                <p className="text-xs text-red-text">
                  ⚠ A {pct}% loss requires a <strong>{recoveryNeeded.toFixed(1)}% gain</strong> just to break even — not {pct}%. This is why protecting capital is critical.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Drawdown table */}
        <div className="mt-6 tool-card p-5">
          <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-widest mb-4">Drawdown Recovery Table</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left text-text-muted pb-2 font-medium">Drawdown</th>
                  <th className="text-right text-text-muted pb-2 font-medium">Recovery Needed</th>
                  <th className="text-right text-text-muted pb-2 font-medium">Difficulty</th>
                </tr>
              </thead>
              <tbody>
                {[[10,11.1,'Easy'],[20,25,'Moderate'],[30,42.9,'Hard'],[40,66.7,'Very Hard'],[50,100,'Extreme'],[60,150,'Near Impossible']].map(([d, r, diff]) => (
                  <tr key={d} className="border-b border-border/50">
                    <td className="py-2 font-mono text-red">{d}%</td>
                    <td className="py-2 font-mono text-amber text-right">{r}%</td>
                    <td className="py-2 text-text-muted text-right">{diff}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 text-xs text-text-muted leading-relaxed">
          <h2 className="text-sm font-semibold text-text-secondary mb-2">Why Drawdown Management Matters</h2>
          <p>The mathematics of drawdown recovery are asymmetric. A 50% loss requires a 100% gain to recover — meaning you have to double your remaining capital. This is why professional traders focus obsessively on limiting drawdowns rather than chasing returns.</p>
        </div>
      </ToolLayout>
    </>
  )
}
