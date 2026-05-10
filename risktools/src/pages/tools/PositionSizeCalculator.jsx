import { useState } from 'react'
import { SEOHead } from '../../components/SEOHead.jsx'
import { ToolLayout } from '../../components/Layout.jsx'

const ASSET_CONFIGS = {
  forex_major: { label: 'Forex — Major Pairs', pipValue: 10, unit: 'lots', lotSize: 100000 },
  forex_jpy:   { label: 'Forex — JPY Pairs', pipValue: 9.1, unit: 'lots', lotSize: 100000 },
  gold:        { label: 'Gold (XAU/USD)', pipValue: 10, unit: 'oz', lotSize: 100 },
  us30:        { label: 'US30 / Dow Jones', pipValue: 1, unit: 'units', lotSize: 1 },
  nas100:      { label: 'NAS100 / Nasdaq', pipValue: 1, unit: 'units', lotSize: 1 },
  btc:         { label: 'Bitcoin (BTC/USD)', pipValue: 1, unit: 'units', lotSize: 1 },
}

export default function PositionSizeCalculator() {
  const [balance, setBalance] = useState('10000')
  const [riskPct, setRiskPct] = useState('1')
  const [sl, setSl] = useState('50')
  const [asset, setAsset] = useState('forex_major')

  const cfg = ASSET_CONFIGS[asset]
  const bal = parseFloat(balance) || 0
  const pct = parseFloat(riskPct) || 0
  const slPips = parseFloat(sl) || 0

  const dollarRisk = (bal * pct) / 100
  const lotSize = slPips > 0 ? dollarRisk / (slPips * cfg.pipValue) : 0
  const isValid = bal > 0 && pct > 0 && slPips > 0

  return (
    <>
      <SEOHead
        title="Position Size Calculator"
        description="Free position size calculator for traders. Find the correct lot size so your stop loss never exceeds your risk limit."
        path="/position-size-calculator"
      />
      <ToolLayout
        title="POSITION SIZE"
        description="Find the correct lot size so your stop loss never exceeds your maximum risk per trade."
      >
        <div className="tool-card">
          <div className="p-6 border-b border-border">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="label-text">Account Balance ($)</label>
                <input type="number" className="input-field" value={balance} onChange={e => setBalance(e.target.value)} placeholder="10000" />
              </div>
              <div>
                <label className="label-text">Risk per Trade (%)</label>
                <input type="number" className="input-field" value={riskPct} onChange={e => setRiskPct(e.target.value)} placeholder="1" step="0.1" />
              </div>
              <div>
                <label className="label-text">Stop Loss (pips / points)</label>
                <input type="number" className="input-field" value={sl} onChange={e => setSl(e.target.value)} placeholder="50" />
              </div>
              <div>
                <label className="label-text">Asset</label>
                <select className="select-field" value={asset} onChange={e => setAsset(e.target.value)}>
                  {Object.entries(ASSET_CONFIGS).map(([k, v]) => (
                    <option key={k} value={k}>{v.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="p-6 bg-surface-900/50">
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="result-box col-span-1">
                <p className="result-label">Dollar Risk</p>
                <p className={`result-value ${isValid ? 'text-amber' : 'text-text-muted'}`}>
                  {isValid ? `$${dollarRisk.toFixed(2)}` : '—'}
                </p>
              </div>
              <div className="result-box col-span-2">
                <p className="result-label">Position Size ({cfg.unit})</p>
                <p className={`result-value text-2xl ${isValid ? 'text-green' : 'text-text-muted'}`}>
                  {isValid ? lotSize.toFixed(2) : '—'}
                  {isValid && <span className="text-sm text-text-muted ml-2">{cfg.unit}</span>}
                </p>
              </div>
            </div>

            {isValid && (
              <div className="bg-surface-800 rounded-xl p-4 space-y-2 text-xs text-text-muted">
                <div className="flex justify-between">
                  <span>Max risk</span>
                  <span className="text-red font-mono">${dollarRisk.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Pip value used</span>
                  <span className="font-mono text-text-secondary">${cfg.pipValue}/pip</span>
                </div>
                <div className="flex justify-between">
                  <span>Stop loss distance</span>
                  <span className="font-mono text-text-secondary">{slPips} pips</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 tool-card p-5">
          <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-widest mb-3">Pip Values Used</h2>
          <div className="space-y-1.5">
            {Object.entries(ASSET_CONFIGS).map(([k, v]) => (
              <div key={k} className="flex justify-between text-xs">
                <span className="text-text-muted">{v.label}</span>
                <span className="font-mono text-text-secondary">${v.pipValue}/pip</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-text-muted mt-3">Pip values are approximate for standard lots at current rates. Actual values may vary slightly.</p>
        </div>

        <div className="mt-6 text-xs text-text-muted leading-relaxed">
          <h2 className="text-sm font-semibold text-text-secondary mb-2">How Position Sizing Works</h2>
          <p>Position sizing is the most important skill in trading. Even with a great strategy, using the wrong lot size can blow your account. This calculator automatically converts your risk in dollars and stop loss distance into the correct lot size — no manual pip value calculations needed.</p>
        </div>
      </ToolLayout>
    </>
  )
}
