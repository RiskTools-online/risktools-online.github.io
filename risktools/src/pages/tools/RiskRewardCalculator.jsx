import { useState } from 'react'
import { SEOHead } from '../../components/SEOHead.jsx'
import { ToolLayout } from '../../components/Layout.jsx'

export default function RiskRewardCalculator() {
  const [entry, setEntry] = useState('1.0850')
  const [sl, setSl] = useState('1.0800')
  const [tp, setTp] = useState('1.0950')
  const [direction, setDirection] = useState('long')
  const [riskDollars, setRiskDollars] = useState('100')

  const entryN = parseFloat(entry) || 0
  const slN = parseFloat(sl) || 0
  const tpN = parseFloat(tp) || 0
  const riskD = parseFloat(riskDollars) || 0

  const isLong = direction === 'long'
  const riskPips = isLong ? entryN - slN : slN - entryN
  const rewardPips = isLong ? tpN - entryN : entryN - tpN
  const rr = riskPips > 0 ? rewardPips / riskPips : 0
  const potentialProfit = riskPips > 0 ? (rewardPips / riskPips) * riskD : 0
  const isValid = entryN > 0 && slN > 0 && tpN > 0 && riskPips > 0 && rewardPips > 0

  const rrColor = rr >= 2 ? 'text-green' : rr >= 1 ? 'text-amber' : 'text-red'
  const rrLabel = rr >= 2 ? '✓ Good trade' : rr >= 1 ? '⚡ Acceptable' : '⚠ Poor R:R'

  return (
    <>
      <SEOHead
        title="Risk/Reward Calculator"
        description="Free risk reward ratio calculator. Enter entry, stop loss and take profit to instantly see your R:R ratio and potential profit."
        path="/risk-reward-calculator"
      />
      <ToolLayout
        title="RISK / REWARD"
        description="Calculate your risk/reward ratio and potential profit before entering any trade."
      >
        <div className="tool-card">
          <div className="p-6 border-b border-border">
            {/* Direction toggle */}
            <div className="mb-5">
              <label className="label-text">Trade Direction</label>
              <div className="flex bg-surface-900 border border-border rounded-xl p-1 w-fit">
                {['long', 'short'].map(d => (
                  <button
                    key={d}
                    onClick={() => setDirection(d)}
                    className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all capitalize
                      ${direction === d
                        ? d === 'long' ? 'bg-green text-surface-950' : 'bg-red text-white'
                        : 'text-text-muted hover:text-text-secondary'}`}
                  >
                    {d === 'long' ? '▲ Long' : '▼ Short'}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="label-text">Entry Price</label>
                <input type="number" className="input-field" value={entry} onChange={e => setEntry(e.target.value)} placeholder="1.0850" step="0.0001" />
              </div>
              <div>
                <label className="label-text">Stop Loss</label>
                <input type="number" className="input-field border-red/30 focus:border-red" value={sl} onChange={e => setSl(e.target.value)} placeholder="1.0800" step="0.0001" />
              </div>
              <div>
                <label className="label-text">Take Profit</label>
                <input type="number" className="input-field border-green/30 focus:border-green" value={tp} onChange={e => setTp(e.target.value)} placeholder="1.0950" step="0.0001" />
              </div>
              <div>
                <label className="label-text">Risk Amount ($)</label>
                <input type="number" className="input-field" value={riskDollars} onChange={e => setRiskDollars(e.target.value)} placeholder="100" />
              </div>
            </div>
          </div>

          <div className="p-6 bg-surface-900/50">
            {/* Visual ratio bar */}
            {isValid && (
              <div className="mb-5">
                <div className="flex justify-between text-xs text-text-muted mb-1.5">
                  <span>Risk</span><span>Reward</span>
                </div>
                <div className="h-3 bg-surface-800 rounded-full overflow-hidden flex">
                  <div
                    className="bg-red h-full rounded-l-full bar-fill"
                    style={{ width: `${Math.min(50, (riskPips / (riskPips + rewardPips)) * 100)}%` }}
                  />
                  <div
                    className="bg-green h-full rounded-r-full bar-fill"
                    style={{ width: `${Math.min(50, (rewardPips / (riskPips + rewardPips)) * 100)}%` }}
                  />
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="result-box">
                <p className="result-label">R:R Ratio</p>
                <p className={`result-value text-xl ${isValid ? rrColor : 'text-text-muted'}`}>
                  {isValid ? `1:${rr.toFixed(2)}` : '—'}
                </p>
              </div>
              <div className="result-box">
                <p className="result-label">Verdict</p>
                <p className={`text-xs font-semibold mt-1 ${isValid ? rrColor : 'text-text-muted'}`}>
                  {isValid ? rrLabel : '—'}
                </p>
              </div>
              <div className="result-box">
                <p className="result-label">Potential Profit</p>
                <p className={`result-value ${isValid ? 'text-green' : 'text-text-muted'}`}>
                  {isValid ? `+$${potentialProfit.toFixed(2)}` : '—'}
                </p>
              </div>
              <div className="result-box">
                <p className="result-label">Max Loss</p>
                <p className={`result-value ${isValid ? 'text-red' : 'text-text-muted'}`}>
                  {isValid ? `-$${riskD.toFixed(2)}` : '—'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 text-xs text-text-muted leading-relaxed">
          <h2 className="text-sm font-semibold text-text-secondary mb-2">What is a Good R:R Ratio?</h2>
          <p>Professional traders typically aim for a minimum 1:2 risk/reward ratio — meaning for every $1 risked, the potential profit is $2. With a 1:2 R:R, you only need to win 34% of your trades to break even. Higher R:R ratios allow for lower win rates while remaining profitable.</p>
        </div>
      </ToolLayout>
    </>
  )
}
