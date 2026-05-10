import { useState, useMemo } from 'react'
import { SEOHead } from '../../components/SEOHead.jsx'
import { ToolLayout } from '../../components/Layout.jsx'

export default function CompoundingCalculator() {
  const [capital, setCapital] = useState('10000')
  const [monthly, setMonthly] = useState('5')
  const [months, setMonths] = useState('12')

  const cap = parseFloat(capital) || 0
  const pct = parseFloat(monthly) || 0
  const mos = Math.min(parseInt(months) || 0, 120)

  const projections = useMemo(() => {
    if (!cap || !pct || !mos) return []
    const rows = []
    let bal = cap
    for (let i = 1; i <= mos; i++) {
      const gain = bal * (pct / 100)
      bal += gain
      if (i === 1 || i % Math.max(1, Math.floor(mos / 10)) === 0 || i === mos) {
        rows.push({ month: i, balance: bal, gain, total: bal - cap })
      }
    }
    return rows
  }, [cap, pct, mos])

  const finalBalance = projections.length ? projections[projections.length - 1].balance : 0
  const totalGain = finalBalance - cap
  const multiplier = cap > 0 ? finalBalance / cap : 0
  const isValid = cap > 0 && pct > 0 && mos > 0

  const maxBal = finalBalance || 1

  return (
    <>
      <SEOHead
        title="Compounding Calculator"
        description="Free trading compounding calculator. See how consistent monthly returns compound your trading account over time."
        path="/compounding-calculator"
      />
      <ToolLayout
        title="COMPOUNDING"
        description="See the power of consistent monthly returns compounding your trading account over time."
      >
        <div className="tool-card">
          <div className="p-6 border-b border-border">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div>
                <label className="label-text">Starting Capital ($)</label>
                <input type="number" className="input-field" value={capital} onChange={e => setCapital(e.target.value)} placeholder="10000" />
              </div>
              <div>
                <label className="label-text">Monthly Return (%)</label>
                <input type="number" className="input-field" value={monthly} onChange={e => setMonthly(e.target.value)} placeholder="5" step="0.5" />
                <p className="tooltip">Realistic: 3%–8% per month</p>
              </div>
              <div>
                <label className="label-text">Period (months)</label>
                <input type="number" className="input-field" value={months} onChange={e => setMonths(e.target.value)} placeholder="12" min="1" max="120" />
              </div>
            </div>
          </div>

          <div className="p-6 bg-surface-900/50">
            <div className="grid grid-cols-3 gap-3 mb-5">
              <div className="result-box">
                <p className="result-label">Final Balance</p>
                <p className={`result-value text-xl ${isValid ? 'text-green' : 'text-text-muted'}`}>
                  {isValid ? `$${Math.round(finalBalance).toLocaleString()}` : '—'}
                </p>
              </div>
              <div className="result-box">
                <p className="result-label">Total Profit</p>
                <p className={`result-value ${isValid ? 'text-green' : 'text-text-muted'}`}>
                  {isValid ? `+$${Math.round(totalGain).toLocaleString()}` : '—'}
                </p>
              </div>
              <div className="result-box">
                <p className="result-label">Account ×</p>
                <p className={`result-value ${isValid ? 'text-amber' : 'text-text-muted'}`}>
                  {isValid ? `${multiplier.toFixed(1)}×` : '—'}
                </p>
              </div>
            </div>

            {/* Chart */}
            {isValid && projections.length > 0 && (
              <div className="space-y-1.5">
                <p className="text-xs text-text-muted uppercase tracking-widest mb-2">Growth Projection</p>
                {projections.map(row => (
                  <div key={row.month} className="flex items-center gap-3">
                    <span className="text-xs text-text-muted w-16 font-mono">Mo. {row.month}</span>
                    <div className="flex-1 h-5 bg-surface-800 rounded overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-green/60 to-green rounded bar-fill"
                        style={{ width: `${(row.balance / maxBal) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs font-mono text-green w-24 text-right">
                      ${Math.round(row.balance).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Presets */}
        <div className="mt-6 tool-card p-5">
          <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-widest mb-3">Common Scenarios ($10,000 start)</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { label: 'Conservative', pct: 3, mos: 12, result: 14258 },
              { label: 'Moderate', pct: 5, mos: 12, result: 17959 },
              { label: 'Aggressive', pct: 10, mos: 12, result: 31384 },
            ].map(s => (
              <div key={s.label} className="bg-surface-900 border border-border rounded-xl p-3">
                <p className="text-xs font-semibold text-text-secondary mb-1">{s.label}</p>
                <p className="font-mono text-xs text-text-muted">{s.pct}%/month × {s.mos} months</p>
                <p className="font-mono text-base text-green mt-1">${s.result.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 text-xs text-text-muted leading-relaxed">
          <h2 className="text-sm font-semibold text-text-secondary mb-2">The Power of Compounding</h2>
          <p>Compounding means reinvesting your profits so each month you earn returns on a larger base. A consistent 5% monthly return grows $10,000 into nearly $18,000 in one year — without adding any new capital. Focus on consistency over high monthly returns to maximize long-term compounding.</p>
        </div>
      </ToolLayout>
    </>
  )
}
