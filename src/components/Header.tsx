import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { secoes, textos } from '../data/content'

export default function Header({ subtitulo }: { subtitulo: string }) {
  const [aberto, setAberto] = useState(false)
  const { pathname } = useLocation()
  useEffect(() => setAberto(false), [pathname])

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-30 border-b border-linha bg-papel/95 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-coluna items-center justify-between px-gutter">
          <Link to="/" className="min-w-0">
            <p className="truncate font-titulo text-base font-black leading-none">{textos.siteTitulo}</p>
            <p className="mt-1 truncate text-[11px] uppercase tracking-widest text-cinza">{subtitulo}</p>
          </Link>
          <button aria-label={textos.menuAbrir} onClick={() => setAberto(true)} className="-mr-2 flex h-11 w-11 flex-col items-center justify-center gap-[5px]">
            <span className="h-[2px] w-6 bg-tinta" /><span className="h-[2px] w-6 bg-tinta" /><span className="h-[2px] w-6 bg-tinta" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {aberto && (
          <>
            <motion.div className="fixed inset-0 z-40 bg-tinta/40" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setAberto(false)} />
            <motion.nav
              className="cobogo fixed right-0 top-0 z-50 flex h-full w-[85%] max-w-[360px] flex-col overflow-y-auto bg-papel px-gutter py-4"
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'tween', duration: 0.25 }}
            >
              <button aria-label={textos.menuFechar} onClick={() => setAberto(false)} className="-mr-2 ml-auto h-11 w-11 text-3xl leading-none">×</button>
              <ul className="mt-2">
                {secoes.map(s => (
                  <li key={s.to} className="border-b border-linha">
                    <Link to={s.to} className={`block py-3 font-titulo text-lg font-extrabold ${pathname === s.to ? 'text-vermelho' : ''}`}>{s.rotulo}</Link>
                  </li>
                ))}
              </ul>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
