import { creditoVisivel } from '../../lib/credito'
import { useEffect, useRef, type RefObject } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { linhaDoTempo, tempoTextos as T, textos } from '../../data/content'
import Marcador from './Marcador'
import Foto from '../Foto'

const FOCAVEIS = 'a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])'

interface Props {
  indice: number | null
  onFechar: () => void
  onIr: (i: number) => void
  retorno: RefObject<HTMLElement | null>
}

/** Quebra o título em duas linhas equilibradas. */
function duasLinhas(t: string): [string, string] {
  const p = t.split(' ')
  if (p.length < 2) return [t, '']
  let melhor = 1
  let dif = Infinity
  for (let i = 1; i < p.length; i++) {
    const d = Math.abs(p.slice(0, i).join(' ').length - p.slice(i).join(' ').length)
    if (d < dif) { dif = d; melhor = i }
  }
  return [p.slice(0, melhor).join(' '), p.slice(melhor).join(' ')]
}

export default function CardMarco(props: Props) {
  return (
    <AnimatePresence>
      {props.indice !== null && <Card key="card" {...props} indice={props.indice} />}
    </AnimatePresence>
  )
}

function Card({ indice: i, onFechar, onIr, retorno }: Props & { indice: number }) {
  const reduzir = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const fecharRef = useRef<HTMLButtonElement>(null)
  const dir = useRef(1)
  const ev = linhaDoTempo[i]
  const total = linhaDoTempo.length

  const ir = (n: number) => {
    if (n < 0 || n >= total) return
    dir.current = n > i ? 1 : -1
    onIr(n)
  }
  const irRef = useRef((_delta: number) => {})
  irRef.current = (delta: number) => ir(i + delta)

  // foco preso, Esc fecha, setas navegam, trava o scroll do fundo, devolve o foco
  useEffect(() => {
    const anterior = retorno.current
    fecharRef.current?.focus()
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.stopPropagation(); onFechar(); return }
      if (e.key === 'ArrowLeft') irRef.current(-1)
      if (e.key === 'ArrowRight') irRef.current(1)
      if (e.key !== 'Tab' || !ref.current) return
      const els = Array.from(ref.current.querySelectorAll<HTMLElement>(FOCAVEIS))
      if (!els.length) return
      const a = els[0]
      const z = els[els.length - 1]
      if (!ref.current.contains(document.activeElement)) { e.preventDefault(); a.focus() }
      else if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus() }
      else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus() }
    }
    document.addEventListener('keydown', onKey, true)
    return () => {
      document.removeEventListener('keydown', onKey, true)
      document.body.style.overflow = overflow
      anterior?.focus?.()
    }
  }, [onFechar, retorno])

  const [l1, l2] = duasLinhas(ev.titulo)
  const x = reduzir ? 0 : 40 * dir.current

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3">
      <motion.div
        className="absolute inset-0 bg-tinta/60"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onFechar} aria-hidden="true"
      />
      <motion.div
        ref={ref}
        role="dialog" aria-modal="true" aria-labelledby="marco-titulo"
        layout
        className="relative flex max-h-[92svh] w-full max-w-coluna flex-col overflow-hidden bg-papel shadow-2xl"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-between gap-3 px-4 pb-2 pt-4">
          <div className="flex items-center gap-3">
            <Marcador tipo={ev.tipo} layoutId={`marcador-${i}`} />
            <motion.span layoutId={`ano-${i}`} className="font-titulo text-[22px] font-black leading-none">{ev.ano}</motion.span>
            <span className="sr-only">{T.tipoRotulo[ev.tipo]}</span>
          </div>
          <button ref={fecharRef} onClick={onFechar} aria-label={T.fechar} className="-mr-2 h-11 w-11 text-3xl leading-none">×</button>
        </div>

        <motion.div
          key={i}
          className="overflow-y-auto overscroll-contain px-4 pb-4"
          style={{ touchAction: 'pan-y' }}
          initial={{ opacity: 0, x }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.25 }}
          drag={reduzir ? false : 'x'} dragDirectionLock dragConstraints={{ left: 0, right: 0 }} dragElastic={0.25}
          onDragEnd={(_, info) => {
            if (info.offset.x < -70 || info.velocity.x < -500) ir(i + 1)
            else if (info.offset.x > 70 || info.velocity.x > 500) ir(i - 1)
          }}
        >
          <h2 id="marco-titulo" className="font-titulo text-[clamp(2rem,10vw,2.75rem)] leading-[0.98]">
            {l1}{l2 && <><br />{l2}</>}
          </h2>
          <div className="mt-4 h-[6px] w-12 bg-vermelho" />
          {ev.foto && (
            <figure className="m-0 mt-5">
              <Foto src={ev.foto} sizes="(min-width: 480px) 480px, 100vw" alt={`${ev.titulo}, ${ev.ano}`} draggable={false} className="aspect-[4/3] w-full bg-concreto object-cover" />
              <figcaption className="mt-2 text-xs italic text-cinza">{ev.legenda ?? ev.resumo}.{creditoVisivel(ev.credito) && <> {textos.credito}: {ev.credito}</>}</figcaption>
            </figure>
          )}
          <p className="mt-5 text-[15px] leading-relaxed">{ev.texto}</p>
        </motion.div>

        <nav aria-label={T.navLabel} className="flex items-center justify-between border-t border-linha px-4 py-2">
          <button onClick={() => ir(i - 1)} disabled={i === 0} className="h-11 px-2 font-titulo text-sm font-extrabold disabled:opacity-30">{T.anterior}</button>
          <span className="text-xs text-cinza" aria-live="polite">{i + 1} / {total}</span>
          <button onClick={() => ir(i + 1)} disabled={i === total - 1} className="h-11 px-2 font-titulo text-sm font-extrabold disabled:opacity-30">{T.proximo}</button>
        </nav>
      </motion.div>
    </div>
  )
}
