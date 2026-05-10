export function AdSlot({ size = 'leaderboard', className = '' }) {
  const sizes = {
    leaderboard: { h: '90px', label: 'AD · 728×90' },
    rectangle:   { h: '200px', label: 'AD · 300×250' },
    mobile:      { h: '56px', label: 'AD · 320×50' },
  }
  const s = sizes[size] || sizes.leaderboard
  return (
    <div
      className={`ad-slot ${className}`}
      style={{ minHeight: s.h }}
      aria-hidden="true"
      data-ad-slot={size}
    >
      {/* Google AdSense: replace with <ins className="adsbygoogle"> tag */}
      <span>{s.label}</span>
    </div>
  )
}
