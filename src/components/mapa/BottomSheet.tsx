import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useDragControls } from 'framer-motion'
import { capituloDoEdificio, mapaTextos as T, statusInfo, textos, type Edificio } from '../../data/content'
import { CORES, formas } from './formas'

const CAMPOS = ['original', 'transformacao', 'hoje'] as const
const FOTOS = ['fotoOriginal', 'fotoTransformacao', 'fotoHoje'] as const

function Miniatura({ e }: { e: Edificio }) {
  const f = formas[e.id]
  return (
    <svg viewBox={f.vb.join(' ')} className="h-14 w-14 shrink-0 rounded-sm bg-[#F2F2F0] p-1" aria-hidden="true" focusable="false">
      {f.desenho(CORES[e.tipo])}
    </svg>
  )
}

const FOCAVEIS = 'a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])'

export default function BottomSheet({ edificio: e, onClose }: { edificio: Edificio; onClose: () => void }) {
  const [aba, setAba] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const fecharRef = useRef<HTMLButtonElement>(null)
  const drag = useDragControls()
  const cap = capituloDoEdificio[e.id]
  const st = statusInfo[e.status]
  const f = e[FOTOS[aba]] ?? { foto: e.foto, credito: e.credito } // foto da aba, ou a foto única

  // foco preso, Esc fecha, foco volta ao hotspot
  useEffect(() => {
    const anterior = document.activeElement as HTMLElement | null
    fecharRef.current?.focus()
    const onKey = (ev: KeyboardEvent) => {
      if (ev.key === 'Escape') { ev.stopPropagation(); onClose(); return }
      if (ev.key !== 'Tab' || !ref.current) return
      const els = Array.from(ref.current.querySelectorAll<HTMLElement>(FOCAVEIS))
      if (!els.length) return
      const primeiro = els[0], ultimo = els[els.length - 1]
      if (!ref.current.contains(document.activeElement)) { ev.preventDefault(); primeiro.focus() }
      else if (ev.shiftKey && document.activeElement === primeiro) { ev.preventDefault(); ultimo.focus() }
      else if (!ev.shiftKey && document.activeElement === ultimo) { ev.preventDefault(); primeiro.focus() }
    }
    document.addEventListener('keydown', onKey, true)
    return () => { document.removeEventListener('keydown', onKey, true); anterior?.focus?.() }
  }, [onClose])

  const onTabKey = (ev: React.KeyboardEvent, i: number) => {
    let n = i
    if (ev.key === 'ArrowRight') n = (i + 1) % 3
    else if (ev.key === 'ArrowLeft') n = (i + 2) % 3
    else return
    ev.preventDefault(); setAba(n)
    document.getElementById(`aba-${n}`)?.focus()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <motion.div className="absolute inset-0 bg-tinta/40" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} aria-hidden="true" />
      <motion.div
        ref={ref}
        role="dialog" aria-modal="true" aria-labelledby="sheet-titulo"
        className="relative flex max-h-[88vh] w-full max-w-coluna flex-col rounded-t-2xl bg-papel shadow-2xl"
        initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'tween', duration: 0.28 }}
        drag="y" dragListener={false} dragControls={drag}
        dragConstraints={{ top: 0, bottom: 0 }} dragElastic={{ top: 0, bottom: 0.7 }}
        onDragEnd={(_, i) => { if (i.offset.y > 110 || i.velocity.y > 600) onClose() }}
      >
        <div className="touch-none px-gutter pt-2" onPointerDown={ev => drag.start(ev)} style={{ cursor: 'grab' }}>
          <div className="mx-auto h-1.5 w-10 rounded-full bg-concreto/60" role="presentation" title={T.alca} />
          <div className="flex items-start gap-3 pb-3 pt-3">
            <Miniatura e={e} />
            <div className="min-w-0 flex-1">
              <h2 id="sheet-titulo" className="font-titulo text-xl font-black leading-tight">{e.nome}</h2>
              <p className="mt-0.5 text-sm text-cinza">{e.subtitulo || T.subtitulo[e.tipo]}</p>
              <span className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-linha bg-white px-2.5 py-1 text-xs font-semibold text-tinta">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: st.cor }} />{T.statusPill[e.status]}
              </span>
            </div>
            <button ref={fecharRef} onClick={onClose} aria-label={T.fechar} onPointerDown={ev => ev.stopPropagation()}
              className="-mr-2 -mt-1 h-11 w-11 shrink-0 text-3xl leading-none">×</button>
          </div>
        </div>

        <div className="overflow-y-auto overscroll-contain px-gutter pb-6">
          <div role="tablist" aria-label={T.abasLabel} className="flex border-b border-linha">
            {T.abas.map((nome, i) => (
              <button key={nome} id={`aba-${i}`} role="tab" aria-selected={aba === i} aria-controls="painel-aba"
                tabIndex={aba === i ? 0 : -1} onClick={() => setAba(i)} onKeyDown={ev => onTabKey(ev, i)}
                className={`relative flex-1 py-3 font-titulo text-sm font-extrabold ${aba === i ? 'text-tinta' : 'text-cinza'}`}>
                {nome}
                {aba === i && <motion.span layoutId="aba-sublinhado" className="absolute inset-x-0 -bottom-px h-[3px] bg-vermelho" />}
              </button>
            ))}
          </div>

          <div id="painel-aba" role="tabpanel" aria-labelledby={`aba-${aba}`} className="pt-4">
            <figure className="m-0">
              <img src={import.meta.env.BASE_URL + f.foto} loading="lazy" decoding="async" alt={`${e.nome}: ${T.abas[aba]}`} className="aspect-[4/3] w-full bg-concreto object-cover" />
              <figcaption className="mt-2 text-xs italic text-cinza">
                {f.legenda ?? `${e.nome}, ${T.abas[aba].toLowerCase()}`}. {textos.credito}: {f.credito}
              </figcaption>
            </figure>
            <p className="mt-4 font-titulo text-lg font-extrabold">{e[CAMPOS[aba]]}</p>
            <p className="mt-2 text-sm leading-relaxed">{e.descricao}</p>
          </div>

          {cap && (
            <Link to={`/capitulo/${cap}`}
              className="mt-6 flex min-h-11 items-center justify-center rounded-sm border-2 border-tinta py-3 text-center font-titulo text-sm font-extrabold hover:bg-tinta hover:text-papel">
              {T.verMais}
            </Link>
          )}
        </div>
      </motion.div>
    </div>
  )
}
