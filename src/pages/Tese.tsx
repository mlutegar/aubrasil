import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Titulo from '../components/Titulo'
import Reveal from '../components/Reveal'
import { tese, teseTextos as T } from '../data/content'

const estilo = {
  papel: 'border-2 border-tinta bg-papel text-tinta',
  marinho: 'bg-marinho text-papel',
  vermelho: 'bg-vermelho text-papel',
  concreto: 'bg-concreto text-tinta',
  celeste: 'bg-celeste text-tinta',
}

function Sintese() {
  const reduzir = useReducedMotion()
  const n = tese.sintese.length
  return (
    <ol className="flex flex-col items-center" aria-label={T.diagrama}>
      {tese.sintese.map((s, i) => (
        <li key={s.rotulo} className="flex w-full flex-col items-center">
          <motion.div
            className={`w-full px-4 text-center ${estilo[s.cor]} ${s.grande ? 'py-7' : 'py-4'}`}
            initial={reduzir ? false : { opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '0px 0px -60px 0px' }}
            transition={{ duration: 0.5 }}
          >
            <p className={`font-titulo font-black leading-tight ${s.grande ? 'text-2xl' : 'text-lg'}`}>{s.rotulo}</p>
            <p className={`mt-1 leading-snug ${s.grande ? 'text-[15px]' : 'text-[13px]'}`}>{s.detalhe}</p>
          </motion.div>
          {i < n - 1 && (
            <motion.div aria-hidden className="h-9 w-[3px] origin-top bg-tinta"
              initial={reduzir ? false : { scaleY: 0 }} whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: '0px 0px -40px 0px' }} transition={{ duration: 0.4, delay: 0.25 }} />
          )}
        </li>
      ))}
    </ol>
  )
}

export default function Tese() {
  const [aberto, setAberto] = useState<string | null>(null)
  return (
    <>
      <Titulo kicker="Tese">{tese.titulo}</Titulo>
      <Reveal>
        <p className="mb-10 font-titulo text-[28px] font-black leading-[1.08] tracking-tight">{tese.texto}</p>
      </Reveal>

      <div className="flex flex-col gap-3">
        {tese.argumentos.map(a => {
          const on = aberto === a.numero
          return (
            <Reveal key={a.numero}>
              <div className="border-2 border-tinta">
                <button type="button" aria-expanded={on} aria-controls={`arg-${a.numero}`}
                  onClick={() => setAberto(on ? null : a.numero)}
                  className="flex min-h-16 w-full items-center gap-4 p-3 text-left">
                  <span className="font-titulo text-4xl font-black leading-none text-vermelho">{a.numero}</span>
                  <span className="flex-1 font-titulo text-xl font-black leading-tight">{a.titulo}</span>
                  <span aria-hidden className={`text-2xl transition-transform ${on ? 'rotate-45' : ''}`}>+</span>
                </button>
                <AnimatePresence initial={false}>
                  {on && (
                    <motion.div id={`arg-${a.numero}`} key="c" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                      <div className="px-3 pb-4 text-[17px] leading-[1.6]">
                        <p className="max-w-[65ch]">{a.texto}</p>
                        <p className="mb-1 mt-4 text-xs font-semibold uppercase tracking-widest text-cinza">{T.evidencias}</p>
                        <ul className="list-disc space-y-1 pl-5 text-[15px] leading-snug">
                          {a.evidencias.map(e => <li key={e}>{e}</li>)}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          )
        })}
      </div>

      <section className="mt-14">
        <Reveal><h2 className="mb-5 font-titulo text-2xl">{T.diagrama}</h2></Reveal>
        <Sintese />
      </section>

      <section className="mt-14 border-t-2 border-tinta pt-6">
        <Reveal>
          <h2 className="traco mb-4 font-titulo text-2xl">{T.conclusao}</h2>
          <p className="max-w-[65ch] text-[17px] leading-[1.6]">{tese.conclusao}</p>
        </Reveal>
      </section>
    </>
  )
}
