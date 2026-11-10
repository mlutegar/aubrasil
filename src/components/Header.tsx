import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { capitulos, secoes, textos } from '../data/content'

interface Item { to: string; rotulo: string; numero?: number }
const grupos: { rotulo: string; itens: Item[] }[] = [
  { rotulo: 'Explorar', itens: secoes.slice(0, 3) },
  { rotulo: 'Capítulos', itens: capitulos.map(c => ({ to: `/capitulo/${c.slug}`, rotulo: c.subtitulo, numero: c.numero })) },
  { rotulo: 'Síntese', itens: secoes.slice(3 + capitulos.length) },
]

const CELULA = 14
const COLUNAS = 4

/** Faixa de cobogó: fundo marinho com quadrados vazados em papel; os quadrados surgem em stagger (<=300ms). */
function FaixaCobogo() {
  const [linhas] = useState(() => Math.ceil((typeof window === 'undefined' ? 900 : window.innerHeight) / CELULA) + 1)
  return (
    <div aria-hidden="true" className="faixa-cobogo absolute inset-y-0 left-0 w-14 overflow-hidden bg-marinho">
      {Array.from({ length: linhas }, (_, r) => (
        <div key={r} className="flex h-[14px]">
          {Array.from({ length: COLUNAS }, (_, c) => (
            <span key={c} className="cobogo-quadrado" style={{ animationDelay: `${Math.min(300 - 120, Math.round((r / linhas) * 180 + c * 12))}ms` }} />
          ))}
        </div>
      ))}
    </div>
  )
}

export default function Header({ subtitulo }: { subtitulo: string }) {
  const [aberto, setAberto] = useState(false)
  const { pathname } = useLocation()
  const botaoMenu = useRef<HTMLButtonElement>(null)
  const painel = useRef<HTMLDivElement>(null)
  useEffect(() => { setAberto(false) }, [pathname])

  // Trava o scroll da página, Esc fecha, foco preso no menu e devolvido ao hambúrguer
  useEffect(() => {
    if (!aberto) return
    const anterior = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const focaveis = () => Array.from(painel.current?.querySelectorAll<HTMLElement>('a[href], button') ?? [])
    const t = window.setTimeout(() => (painel.current?.querySelector<HTMLElement>('[aria-current="page"]') ?? focaveis()[0])?.focus({ preventScroll: false }), 0)
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setAberto(false); return }
      if (e.key !== 'Tab') return
      const f = focaveis()
      if (!f.length) return
      const primeiro = f[0], ultimo = f[f.length - 1]
      const ativo = document.activeElement
      if (!painel.current?.contains(ativo)) { e.preventDefault(); primeiro.focus() }
      else if (e.shiftKey && ativo === primeiro) { e.preventDefault(); ultimo.focus() }
      else if (!e.shiftKey && ativo === ultimo) { e.preventDefault(); primeiro.focus() }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      window.clearTimeout(t)
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = anterior
      botaoMenu.current?.focus()
    }
  }, [aberto])

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-30 border-b border-linha bg-papel/95 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-coluna items-center justify-between px-gutter">
          <Link to="/" className="min-w-0">
            <p className="truncate font-titulo text-base font-black leading-none">{textos.siteTitulo}</p>
            <p className="mt-1 truncate text-[11px] uppercase tracking-widest text-cinza">{subtitulo}</p>
          </Link>
          <button ref={botaoMenu} aria-label={textos.menuAbrir} aria-haspopup="dialog" aria-expanded={aberto} onClick={() => setAberto(true)} className="-mr-2 flex h-11 w-11 flex-col items-center justify-center gap-[5px]">
            <span className="h-[2px] w-6 bg-tinta" /><span className="h-[2px] w-6 bg-tinta" /><span className="h-[2px] w-6 bg-tinta" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {aberto && (
          <>
            <motion.div data-testid="overlay" className="fixed inset-0 z-40 bg-[rgba(17,17,17,0.45)]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setAberto(false)} />
            <motion.div
              ref={painel} role="dialog" aria-modal="true" aria-label="Menu"
              className="fixed right-0 top-0 z-50 h-full w-full overflow-hidden bg-papel min-[481px]:w-[420px]"
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'tween', duration: 0.25 }}
            >
              <FaixaCobogo />
              <div className="relative ml-14 flex h-full flex-col overflow-y-auto overscroll-contain bg-papel">
                <div className="flex items-center justify-between gap-2 border-b border-linha py-2 pl-5 pr-2">
                  <p className="font-titulo text-xl font-black leading-none">{textos.siteTitulo}</p>
                  <button aria-label={textos.menuFechar} onClick={() => setAberto(false)} className="h-12 w-12 shrink-0 text-3xl leading-none">×</button>
                </div>
                <nav aria-label="Seções do site" className="pb-8">
                  {grupos.map(g => (
                    <section key={g.rotulo} aria-labelledby={`g-${g.rotulo}`}>
                      <h2 id={`g-${g.rotulo}`} className="px-5 pb-1 pt-6 font-texto text-[11px] font-semibold uppercase tracking-widest text-cinza">{g.rotulo}</h2>
                      <ul className="border-t border-linha">
                        {g.itens.map(s => {
                          const atual = pathname === s.to
                          return (
                            <li key={s.to} className="border-b border-linha">
                              <Link
                                to={s.to} aria-current={atual ? 'page' : undefined}
                                className={`flex min-h-12 items-center border-l-4 py-2 pl-4 pr-4 font-texto text-[17px] font-semibold leading-snug ${atual ? 'border-vermelho bg-[#E2DFD8] text-marinho' : 'border-transparent text-tinta'}`}
                              >
                                {s.numero !== undefined && <span className="w-7 shrink-0 text-vermelho">{s.numero}</span>}
                                <span>{s.rotulo}</span>
                              </Link>
                            </li>
                          )
                        })}
                      </ul>
                    </section>
                  ))}
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
