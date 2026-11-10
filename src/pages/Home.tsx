import { Link } from 'react-router-dom'
import { antesHoje, capitulos, home, rodape } from '../data/content'
import CobogoIntro from '../components/CobogoIntro'
import Reveal from '../components/Reveal'
import Foto from '../components/Foto'
import AntesHoje from '../components/AntesHoje'
import { motion, useReducedMotion, type TargetAndTransition } from 'framer-motion'
import type { ReactNode } from 'react'

/** Entrada sutil da composição; sem movimento em prefers-reduced-motion. */
function Mov({ className, children, ini, fim, atraso = 0 }: { className: string; children?: ReactNode; ini: TargetAndTransition; fim: TargetAndTransition; atraso?: number }) {
  const reduzir = useReducedMotion()
  if (reduzir) return <div className={className}>{children}</div>
  return <motion.div className={className} initial={ini} animate={fim} transition={{ duration: 0.6, ease: 'easeOut', delay: atraso }}>{children}</motion.div>
}

export default function Home() {
  return (
    <>
      <CobogoIntro />
      {/* Hero */}
      <section className="-mt-8 flex min-h-[calc(100svh-6rem)] flex-col">
        <h1 className="font-titulo text-[clamp(3rem,16vw,4.5rem)] leading-[0.92]">
          {home.linha1}<br />{home.linha2}
        </h1>
        <p className="mt-4 font-titulo text-xl font-extrabold leading-tight">{home.subtitulo}</p>
        <p className="mt-1 text-sm text-cinza">{home.periodo}</p>
        <div className="mt-4 h-[6px] w-12 bg-vermelho" />
        <p className="mt-4 text-[15px] leading-snug">{home.resumo}</p>

        {/* Composição cartaz: círculo atrás (centro na borda superior da foto), foto com topo em curva S, faixa vermelha na base */}
        <svg width="0" height="0" className="absolute" aria-hidden focusable="false">
          <defs>
            <clipPath id="curva-foto" clipPathUnits="objectBoundingBox">
              <path d="M0,0.16 C0.3,0.16 0.4,0.02 0.7,0.02 C0.85,0.02 0.94,0.05 1,0.05 L1,1 L0,1 Z" />
            </clipPath>
          </defs>
        </svg>
        <figure className="relative -mx-gutter mt-6 pt-[37.5%] [overflow-x:clip]">
          <Mov className="pointer-events-none absolute right-[-6%] top-0 z-0 aspect-square w-3/4 rounded-full bg-marinho" ini={{ opacity: 0, scale: 0.96 }} fim={{ opacity: 1, scale: 1 }} atraso={0.15} />
          <Mov className="relative z-10" ini={{ opacity: 0, y: 12 }} fim={{ opacity: 1, y: 0 }}>
            <Foto
              eager sizes="(min-width: 480px) 480px, 100vw" larguras={[400, 640, 708]}
              src={home.imagem}
              onError={e => { const t = e.currentTarget; if (!t.dataset.fb) { t.dataset.fb = '1'; t.removeAttribute('srcset'); t.closest('picture')?.querySelector('source')?.remove(); t.src = import.meta.env.BASE_URL + home.imagemFallback } }}
              alt={home.imagemAlt}
              className="pointer-events-none block aspect-[4/3] w-full object-cover object-[0%_50%]"
              style={{ clipPath: 'url(#curva-foto)' }}
            />
            <div className="pointer-events-none absolute bottom-0 left-gutter h-5 w-[72px] translate-y-1/2 bg-vermelho" />
          </Mov>
          <figcaption className="relative z-0 mt-4 px-gutter text-right text-xs text-[#595959]">{home.imagemLegenda} · {home.imagemCredito}</figcaption>
        </figure>

        <div className="relative z-20 mt-6 flex flex-col gap-3">
          <Link to="/mapa" className="flex h-12 w-full items-center justify-center rounded-full bg-marinho font-titulo text-base font-extrabold text-white">{home.botaoMapa}</Link>
          <Link to="/linha-do-tempo" className="flex h-12 w-full items-center justify-center rounded-full border-2 border-marinho font-titulo text-base font-extrabold text-marinho">{home.botaoTempo}</Link>
        </div>
      </section>

      {/* Capítulos */}
      <section className="mt-16">
        <Reveal><h2 className="mb-4 font-titulo text-2xl">{home.capitulosTitulo}</h2></Reveal>
        <div className="grid grid-cols-2 gap-3">
          <Reveal className="col-span-2">
            <Link to={home.cardTese.to} className="flex min-h-[112px] flex-col justify-between bg-vermelho p-4 text-white">
              <span className="text-xs font-semibold uppercase tracking-widest">{home.cardTese.rotulo}</span>
              <span className="flex items-end justify-between gap-3">
                <span className="font-titulo text-xl font-black leading-tight">{home.cardTese.titulo}</span>
                <span className="text-2xl" aria-hidden>→</span>
              </span>
            </Link>
          </Reveal>
          {capitulos.map((c, i) => (
            <Reveal key={c.slug} delay={(i % 2) * 0.06}>
              <Link to={`/capitulo/${c.slug}`} className="flex h-full min-h-[136px] flex-col justify-between border-2 border-tinta p-3">
                <span className="font-titulo text-5xl font-black leading-none">{String(c.numero).padStart(2, '0')}</span>
                <span className="mt-3 flex items-end justify-between gap-2">
                  <span className="font-titulo text-[15px] font-extrabold leading-tight">{c.subtitulo}</span>
                  <span className="text-lg" aria-hidden>→</span>
                </span>
              </Link>
            </Reveal>
          ))}
          <Reveal className="col-span-2">
            <Link to={home.cardRef.to} className="flex items-center justify-between border-2 border-linha bg-papel p-4 font-titulo text-lg font-extrabold">
              {home.cardRef.rotulo}<span aria-hidden>→</span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Antes x Hoje */}
      <section className="mt-16" aria-labelledby="antes-hoje-titulo">
        <Reveal>
          <h2 id="antes-hoje-titulo" className="font-titulo text-2xl">{home.antesHojeTitulo}</h2>
          <p className="mb-4 mt-1 text-sm text-cinza">{antesHoje.instrucao}</p>
          <AntesHoje />
        </Reveal>
      </section>

      {/* Rodapé */}
      <Reveal>
        <footer className="mt-16 border-t-2 border-tinta pt-4 text-sm">
          <p className="font-titulo text-base font-extrabold">{rodape.disciplina}</p>
          <p className="mt-1 text-cinza">{rodape.grupo}: {rodape.integrantes.slice(0, -1).join(', ')} e {rodape.integrantes[rodape.integrantes.length - 1]}</p>
          <p className="mt-4 text-xs leading-relaxed text-cinza">{rodape.notaIA}</p>
        </footer>
      </Reveal>
    </>
  )
}
