export default function Brand({ compact = false }) {
  return (
    <div className={`brand ${compact ? 'brand-compact' : ''}`}>
      <span className="brand-mark">✦</span>
      {!compact && <span>Bodrio <b>PopCorn</b></span>}
    </div>
  )
}
