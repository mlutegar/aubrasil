import { useCallback, useRef, useState } from 'react'
import { antesHoje as D, textos } from '../data/content'
import Foto from './Foto'

/** Slider de comparação: foto "antes" à esquerda da alça, "hoje" à direita, com marcações opcionais sobre "hoje". */
export default function AntesHoje() {
  const [pos, setPos] = useState(50)
  const box = useRef<HTMLDivElement>(null)

  const mover = useCallback((clientX: number) => {
    const r = box.current?.getBoundingClientRect()
    if (r) setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)))
  }, [])

  const onKey = (e: React.KeyboardEvent) => {
    const passo = e.shiftKey ? 10 : 2
    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') setPos(p => Math.max(0, p - passo))
    else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') setPos(p => Math.min(100, p + passo))
    else if (e.key === 'Home') setPos(0)
    else if (e.key === 'End') setPos(100)
    else return
    e.preventDefault()
  }

  const img = 'absolute inset-0 h-full w-full select-none object-cover'
  return (
    <figure className="m-0">
      <div
        ref={box}
        className="relative touch-pan-y overflow-hidden bg-linha"
        style={{ aspectRatio: D.proporcao }}
        onPointerDown={e => { e.currentTarget.setPointerCapture(e.pointerId); mover(e.clientX) }}
        onPointerMove={e => { if (e.currentTarget.hasPointerCapture(e.pointerId)) mover(e.clientX) }}
      >
        {/* Hoje: camada de baixo, com marcações */}
        <Foto src={D.hoje.foto} alt={D.hoje.alt} sizes="(min-width: 480px) 480px, 100vw" draggable={false} className={img} style={{ objectPosition: D.hoje.objectPosition }} />
        {D.marcacoes.map(m => (
          <span key={m.rotulo} className="pointer-events-none absolute" style={{ left: `${m.x}%`, top: `${m.y}%` }} aria-hidden="true">
            <span className="absolute block -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-vermelho" style={{ width: `${m.raio * 2}%`, aspectRatio: '1', minWidth: 20 }} />
            <span className="absolute left-0 whitespace-nowrap bg-vermelho px-1.5 py-0.5 text-[11px] font-bold leading-tight text-white" style={{ top: `${m.rotuloDy ?? 14}px`, transform: `translateX(${m.rotuloDx ?? -50}%)` }}>{m.rotulo}</span>
          </span>
        ))}

        {/* Antes: camada de cima, recortada até a alça */}
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <Foto src={D.antes.foto} alt={D.antes.alt} sizes="(min-width: 480px) 480px, 100vw" draggable={false} className={img} style={{ objectPosition: D.antes.objectPosition }} />
        </div>

        <span className="pointer-events-none absolute left-2 top-2 bg-tinta px-2 py-1 text-xs font-bold text-white">{D.rotuloAntes}</span>
        <span className="pointer-events-none absolute right-2 top-2 bg-tinta px-2 py-1 text-xs font-bold text-white">{D.rotuloHoje}</span>

        {/* Alça (área de toque 44px) */}
        <div className="pointer-events-none absolute inset-y-0 w-[3px] -translate-x-1/2 bg-white shadow" style={{ left: `${pos}%` }}>
          <div
            role="slider" tabIndex={0} aria-label={D.alcaLabel} aria-orientation="horizontal"
            aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(pos)} aria-valuetext={`${Math.round(pos)}% ${D.rotuloAntes}`}
            onKeyDown={onKey}
            className="pointer-events-auto absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full border-2 border-white bg-marinho text-white shadow-lg"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden="true"><path d="M9 6l-6 6 6 6M15 6l6 6-6 6" /></svg>
          </div>
        </div>
      </div>
      <figcaption className="mt-2 grid grid-cols-2 gap-3 text-[13px] leading-snug">
        {[D.antes, D.hoje].map((l, i) => (
          <span key={i}>{l.legenda}<span className="block text-cinza">{textos.credito}: {l.credito}</span></span>
        ))}
      </figcaption>
    </figure>
  )
}
