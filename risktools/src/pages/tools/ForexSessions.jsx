import { useState, useEffect } from 'react'
import { SEOHead } from '../../components/SEOHead.jsx'
import { ToolLayout } from '../../components/Layout.jsx'

const SESSIONS = [
  {
    id: 'sydney',
    name: 'Sydney',
    flag: '🇦🇺',
    tz: 'Australia/Sydney',
    openHour: 22, openMin: 0,  // UTC previous day
    closeHour: 7, closeMin: 0, // UTC
    openUTC: 22, closeUTC: 7,
    color: 'bg-blue-500',
    pairs: 'AUD/USD, AUD/JPY, NZD/USD',
    desc: 'Quietest session. Low volatility except AUD/NZD pairs.',
  },
  {
    id: 'tokyo',
    name: 'Tokyo',
    flag: '🇯🇵',
    tz: 'Asia/Tokyo',
    openUTC: 0, closeUTC: 9,
    color: 'bg-red-500',
    pairs: 'USD/JPY, EUR/JPY, AUD/JPY',
    desc: 'Asian session. JPY pairs most active. Lower volume than London/NY.',
  },
  {
    id: 'london',
    name: 'London',
    flag: '🇬🇧',
    tz: 'Europe/London',
    openUTC: 8, closeUTC: 17,
    color: 'bg-purple-500',
    pairs: 'GBP/USD, EUR/USD, EUR/GBP',
    desc: 'Highest volume session. Most major pairs are most active here.',
  },
  {
    id: 'new_york',
    name: 'New York',
    flag: '🇺🇸',
    tz: 'America/New_York',
    openUTC: 13, closeUTC: 22,
    color: 'bg-green',
    pairs: 'EUR/USD, GBP/USD, USD/CAD',
    desc: 'Overlaps with London (13:00–17:00 UTC) — peak volatility window.',
  },
]

function getUTCHour() {
  const now = new Date()
  return now.getUTCHours() + now.getUTCMinutes() / 60
}

function isSessionOpen(session, utcHour) {
  const { openUTC, closeUTC } = session
  if (openUTC < closeUTC) return utcHour >= openUTC && utcHour < closeUTC
  return utcHour >= openUTC || utcHour < closeUTC // crosses midnight
}

function pad(n) { return String(Math.floor(n)).padStart(2, '0') }

function getLocalTime(tz) {
  try {
    return new Date().toLocaleTimeString('en-US', { timeZone: tz, hour: '2-digit', minute: '2-digit', hour12: false })
  } catch { return '--:--' }
}

function getHoursUntilOpen(session, utcHour) {
  if (isSessionOpen(session, utcHour)) return 0
  let diff = session.openUTC - utcHour
  if (diff < 0) diff += 24
  return diff
}

export default function ForexSessions() {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  const utcHour = now.getUTCHours() + now.getUTCMinutes() / 60
  const utcTime = `${pad(now.getUTCHours())}:${pad(now.getUTCMinutes())}:${pad(now.getUTCSeconds())}`

  const openSessions = SESSIONS.filter(s => isSessionOpen(s, utcHour))
  const isOverlap = openSessions.some(s => s.id === 'london') && openSessions.some(s => s.id === 'new_york')

  return (
    <>
      <SEOHead
        title="Forex Session Clock"
        description="Live forex market session clock. See when Tokyo, London, New York and Sydney sessions are open. Real-time market hours."
        path="/forex-sessions"
      />
      <ToolLayout
        title="FOREX SESSIONS"
        description="Live forex market clock — see which sessions are open right now and when they overlap."
      >
        {/* UTC Clock */}
        <div className="tool-card mb-5">
          <div className="p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-xs text-text-muted uppercase tracking-widest mb-1">Current UTC Time</p>
              <p className="font-mono text-4xl font-medium text-text-primary">{utcTime}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-text-muted uppercase tracking-widest mb-1">Active Sessions</p>
              <div className="flex gap-2 flex-wrap justify-end">
                {openSessions.length === 0
                  ? <span className="tag tag-red">No active sessions</span>
                  : openSessions.map(s => (
                    <span key={s.id} className="tag tag-green">
                      {s.flag} {s.name}
                    </span>
                  ))}
              </div>
              {isOverlap && (
                <p className="text-xs text-amber mt-1 font-semibold">⚡ London-NY Overlap — High Volatility</p>
              )}
            </div>
          </div>
        </div>

        {/* Session cards */}
        <div className="space-y-3">
          {SESSIONS.map(session => {
            const open = isSessionOpen(session, utcHour)
            const localTime = getLocalTime(session.tz)
            const hoursUntil = getHoursUntilOpen(session, utcHour)

            return (
              <div
                key={session.id}
                className={`tool-card transition-all duration-300 ${open ? 'border-green/30 shadow-glow-green' : ''}`}
              >
                <div className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{session.flag}</span>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-text-primary">{session.name}</h3>
                          {open
                            ? <span className="tag tag-green text-xs">● OPEN</span>
                            : <span className="tag tag-red text-xs">CLOSED</span>}
                        </div>
                        <p className="text-xs text-text-muted mt-0.5">{session.pairs}</p>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="font-mono text-lg text-text-primary">{localTime}</p>
                      <p className="text-xs text-text-muted">
                        {open
                          ? `Closes ${session.closeUTC}:00 UTC`
                          : `Opens in ~${Math.round(hoursUntil)}h`}
                      </p>
                    </div>
                  </div>

                  {/* Time bar */}
                  <div className="mt-3">
                    <div className="h-1.5 bg-surface-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-1000 ${open ? 'bg-green' : 'bg-surface-500'}`}
                        style={{ width: open ? '100%' : '0%' }}
                      />
                    </div>
                  </div>

                  <p className="text-xs text-text-muted mt-2">{session.desc}</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Overlap info */}
        <div className="mt-6 tool-card p-5">
          <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-widest mb-3">Key Overlap Windows (UTC)</h2>
          <div className="space-y-2">
            {[
              { label: 'Tokyo + London', time: '08:00 – 09:00', note: 'Short overlap, mild spike', color: 'text-amber' },
              { label: 'London + New York', time: '13:00 – 17:00', note: 'Most volatile window — best for trading', color: 'text-green' },
            ].map(o => (
              <div key={o.label} className="flex items-center justify-between bg-surface-900 rounded-xl p-3">
                <div>
                  <p className="text-xs font-semibold text-text-secondary">{o.label}</p>
                  <p className="text-xs text-text-muted">{o.note}</p>
                </div>
                <p className={`font-mono text-sm ${o.color}`}>{o.time}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 text-xs text-text-muted leading-relaxed">
          <h2 className="text-sm font-semibold text-text-secondary mb-2">Best Times to Trade Forex</h2>
          <p>The most profitable time to trade forex is during session overlaps, particularly the London-New York overlap (13:00–17:00 UTC). This is when liquidity is highest, spreads are tightest, and price movements are most significant. Avoid trading during the Asian session if you trade major EUR/USD or GBP/USD pairs.</p>
        </div>
      </ToolLayout>
    </>
  )
}
