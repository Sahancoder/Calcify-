'use client'

interface FabProps {
  onClick: () => void
  busy: boolean
}

export default function Fab({ onClick, busy }: FabProps) {
  return (
    <button
      onClick={onClick}
      disabled={busy}
      className="relative h-16 w-16 rounded-full bg-brand-700 text-white shadow-xl disabled:opacity-60 hover:shadow-2xl transition-shadow"
    >
      <span
        className="absolute inset-0 rounded-full blur-xl opacity-60"
        style={{ background: 'radial-gradient(circle, #1F7A8C55, transparent 60%)' }}
      />
      <span className="relative text-2xl">{busy ? '…' : '⊕'}</span>
    </button>
  )
}
