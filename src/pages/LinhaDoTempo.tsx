import { useCallback, useRef, useState } from 'react'
import { LayoutGroup, MotionConfig, motion, useReducedMotion, useScroll } from 'framer-motion'
import { Link } from 'react-router-dom'
import { linhaDoTempo, tempoTextos as T } from '../data/content'
import Marcador from '../components/tempo/Marcador'
import CardMarco from '../components/tempo/CardMarco'

const base = import.meta.env.BASE_URL

export default function LinhaDoTempo() {
  const reduzir = useReducedMotion()
  const [aberto, setAberto] = useState<number | null>(null)
  const lista = useRef<HTMLElement>(null)
  const ultimoBotao = useRef<HTMLElement | null>(null)
  const { scrollYProgress } = useScroll({ target: lista, offset: ['start 65%', 'end 65%'] })

  const abrir = (i: number, el: HTMLElement) => { ultimoBotao.current = el; setAberto(i) }
  const fechar = useCallback(() => setAberto(null), [])
  const ir = useCallback((i: number) => setAberto(i), [])

  return (
    <MotionConfig reducedMotion="user">
      <LayoutGroup>
        {/* 1. Capa */}
        <section className="-mt-8 flex min-h-[calc(100svh-6rem)] flex-col">
          <h1 className="font-titulo text-[clamp(3rem,16vw,4.5rem)] leading-[0.92]">{T.titulo}</h1>
          <p className="mt-4 font-titulo text-lg font-extrabold leading-tight">{T.subtitulo}</p>
          <div className="mt-4 h-[6px] w-12 bg-vermelho" />
          <p className="mt-4 text-[15px] leading-snug">{T.frase}</p>

          <div className="relative mt-5 min-h-[220px] flex-1">
            <div className="absolute -right-10 -top-2 aspect-square w-[78%] rounded-full bg-marinho" />
            <div className="absolute bottom-0 left-0 z-10 h-16 w-16 bg-vermelho" />
            <img
              src={base + T.imagem}
              onError={e => { const t = e.currentTarget; if (!t.dataset.fb) { t.dataset.fb = '1'; t.src = base + T.imagemFallback } }}
              alt={T.imagemAlt}
              className="absolute bottom-3 left-8 right-0 top-6 z-[5] h-[calc(100%-2.25rem)] w-[calc(100%-2rem)] object-cover grayscale"
              style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 12% 100%, 0 82%)' }}
            />
          </div>

          <button
            type="button"
            onClick={() => lista.current?.scrollIntoView({ behavior: reduzir ? 'auto' : 'smooth', block: 'start' })}
            className="mt-5 flex h-12 w-full items-center justify-center rounded-full bg-marinho font-titulo text-base font-extrabold text-papel"
          >{T.botao}</button>
        </section>

        {/* 2. Lista vertical */}
        <section ref={lista} aria-label={T.listaLabel} className="relative mt-16 scroll-mt-20">
          <div className="absolute bottom-0 left-[76px] top-0 w-[2px] bg-linha" aria-hidden="true" />
          <motion.div
            className="absolute bottom-0 left-[76px] top-0 w-[2px] origin-top bg-marinho"
            style={{ scaleY: scrollYProgress }} aria-hidden="true"
          />
          <ol className="m-0 list-none p-0">
            {linhaDoTempo.map((ev, i) => (
              <motion.li
                key={ev.ano}
                className="relative"
                initial={reduzir ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -60px 0px' }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                <button
                  type="button"
                  onClick={e => abrir(i, e.currentTarget)}
                  aria-haspopup="dialog"
                  aria-label={`${T.abrir}: ${ev.ano}, ${ev.titulo}`}
                  className="flex w-full items-start py-6 text-left"
                >
                  <span className="w-[62px] shrink-0 pt-0.5">
                    {aberto !== i && (
                      <motion.span layoutId={`ano-${i}`} className="block font-titulo text-[22px] font-black leading-none">{ev.ano}</motion.span>
                    )}
                  </span>
                  <span className="relative z-10 flex w-[30px] shrink-0 justify-center bg-papel py-1">
                    {aberto !== i && <Marcador tipo={ev.tipo} layoutId={`marcador-${i}`} />}
                  </span>
                  <span className="min-w-0 flex-1 pl-4">
                    <span className="flex items-start justify-between gap-2">
                      <span className="font-titulo text-lg font-black leading-tight">{ev.titulo}</span>
                      <span className="text-xl leading-none text-cinza" aria-hidden="true">&gt;</span>
                    </span>
                    <span className="mt-1 line-clamp-3 block text-sm leading-snug text-tinta/80">{ev.resumo}</span>
                  </span>
                </button>
              </motion.li>
            ))}
          </ol>

          {/* Legenda fixa no rodapé da lista */}
          <div className="sticky bottom-0 z-20 flex flex-wrap gap-x-5 gap-y-1 border-t border-linha bg-papel/95 py-3 text-xs backdrop-blur">
            <span className="flex items-center gap-2"><Marcador tipo="construcao" pequeno />{T.legenda.construcao}</span>
            <span className="flex items-center gap-2"><Marcador tipo="ruptura" pequeno />{T.legenda.ruptura}</span>
          </div>
        </section>

        {/* 4. Fechamento */}
        <section className="mt-16 bg-marinho p-6 text-papel">
          <p className="font-titulo text-3xl font-black leading-[1.05]">{T.fechamento}</p>
          <div className="mt-4 h-[6px] w-12 bg-vermelho" />
          <Link to={T.tesePara} className="mt-6 flex h-12 w-full items-center justify-center rounded-full bg-papel font-titulo text-base font-extrabold text-marinho">
            {T.botaoTese}
          </Link>
        </section>

        {/* 3. Card expandido */}
        <CardMarco indice={aberto} onFechar={fechar} onIr={ir} retorno={ultimoBotao} />
      </LayoutGroup>
    </MotionConfig>
  )
}
