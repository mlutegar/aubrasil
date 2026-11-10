import { Link } from 'react-router-dom'
import { antesHoje, capitulos, home, rodape } from '../data/content'
import CobogoIntro from '../components/CobogoIntro'
import Reveal from '../components/Reveal'
import Foto from '../components/Foto'
import AntesHoje from '../components/AntesHoje'

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

        {/* Composição cartaz */}
        <div className="relative mt-5 min-h-[200px] flex-1">
          <div className="pointer-events-none absolute -right-10 -top-2 aspect-square w-[78%] rounded-full bg-marinho" />
          <div className="pointer-events-none absolute bottom-0 left-0 z-10 h-16 w-16 bg-vermelho" />
          <Foto
            eager sizes="(min-width: 480px) 440px, 90vw"
            src={home.imagem}
            onError={e => { const t = e.currentTarget; if (!t.dataset.fb) { t.dataset.fb = '1'; t.removeAttribute('srcset'); t.closest('picture')?.querySelector('source')?.remove(); t.src = import.meta.env.BASE_URL + home.imagemFallback } }}
            alt={home.imagemAlt}
            className="pointer-events-none absolute bottom-3 left-8 right-0 top-6 z-[5] h-[calc(100%-2.25rem)] w-[calc(100%-2rem)] object-cover"
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 12% 100%, 0 82%)' }}
          />
        </div>

        <div className="relative z-20 mt-5 flex flex-col gap-3">
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
          <p className="mt-1 text-cinza">Professor(a): {rodape.professor}</p>
          <p className="mt-1 text-cinza">Integrantes: {rodape.integrantes.join(', ')}</p>
          <p className="mt-1 text-cinza">Instituição: {rodape.instituicao}</p>
          <p className="mt-4 text-xs leading-relaxed text-cinza">{rodape.notaIA}</p>
        </footer>
      </Reveal>
    </>
  )
}
