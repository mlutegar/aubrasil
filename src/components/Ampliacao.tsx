import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

/** Tela cheia com X (44px), Esc, toque no fundo e pinch-zoom/arraste. */
export default function Ampliacao({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  const [t, setT] = useState({ s: 1, x: 0, y: 0 })
  const pts = useRef(new Map<number, { x: number; y: number }>())
  const ref = useRef({ d: 0, s: 1 })
  const fechar = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', k)
    fechar.current?.focus()
    const o = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', k); document.body.style.overflow = o }
  }, [onClose])

  const dist = () => { const [a, b] = [...pts.current.values()]; return Math.hypot(a.x - b.x, a.y - b.y) }
  const clamp = (s: number) => Math.min(6, Math.max(1, s))
  const down = (e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    pts.current.set(e.pointerId, { x: e.clientX, y: e.clientY })
    if (pts.current.size === 2) ref.current = { d: dist(), s: t.s }
  }
  const move = (e: React.PointerEvent) => {
    const p = pts.current.get(e.pointerId); if (!p) return
    const dx = e.clientX - p.x, dy = e.clientY - p.y
    pts.current.set(e.pointerId, { x: e.clientX, y: e.clientY })
    if (pts.current.size === 2) { const s = clamp(ref.current.s * dist() / ref.current.d); setT(v => ({ ...v, s, ...(s === 1 ? { x: 0, y: 0 } : {}) })) }
    else if (t.s > 1) setT(v => ({ ...v, x: v.x + dx, y: v.y + dy }))
  }
  const up = (e: React.PointerEvent) => { pts.current.delete(e.pointerId); if (t.s === 1) setT({ s: 1, x: 0, y: 0 }) }
  const wheel = (e: React.WheelEvent) => setT(v => { const s = clamp(v.s * (e.deltaY < 0 ? 1.15 : 1 / 1.15)); return s === 1 ? { s, x: 0, y: 0 } : { ...v, s } })

  return createPortal(
    <div role="dialog" aria-modal="true" aria-label={alt} className="fixed inset-0 z-[100] flex items-center justify-center bg-preto/90 p-4" onClick={onClose}>
      <button ref={fechar} type="button" aria-label="Fechar ampliação" onClick={(e) => { e.stopPropagation(); onClose() }}
        className="absolute right-3 top-3 z-10 flex h-11 w-11 items-center justify-center bg-papel text-preto focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vermelho" style={{ top: 'max(0.75rem, env(safe-area-inset-top))' }}>
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden="true"><path d="M5 5l14 14M19 5L5 19" /></svg>
      </button>
      <div className="flex h-full w-full items-center justify-center overflow-hidden" style={{ touchAction: 'none' }}
        onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up} onWheel={wheel}>
        <img src={src} alt={alt} draggable={false} onClick={(e) => e.stopPropagation()}
          className="max-h-full max-w-full select-none bg-papel object-contain"
          style={{ transform: `translate(${t.x}px, ${t.y}px) scale(${t.s})`, mixBlendMode: 'multiply' }} />
      </div>
    </div>,
    document.body,
  )
}
