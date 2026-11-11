import { useState } from 'react'
import Ampliacao from './Ampliacao'
import { creditoVisivel } from '../lib/credito'
import { antesHoje, textos, type Midia } from '../data/content'
import AntesHoje from './AntesHoje'
import Foto from './Foto'
import Reveal from './Reveal'
import DiagramaFluxos from './diagramas/DiagramaFluxos'
import DiagramaCorte from './diagramas/DiagramaCorte'
import TabelaTransformacoes from './diagramas/TabelaTransformacoes'

const diagramas = { fluxos: DiagramaFluxos, corte: DiagramaCorte, transformacoes: TabelaTransformacoes }

const base = import.meta.env.BASE_URL

export default function BlocoMidia({ m }: { m: Midia }) {
  const [aberta, setAberta] = useState(false)
  if (m.tipo === 'imagem') {
    const isDiagrama = m.foto.endsWith('.png')
    return (
      <Reveal className="-mx-4 my-8">
        <figure>
          {isDiagrama ? (
            <button type="button" onClick={() => setAberta(true)} aria-label={`Ampliar: ${m.alt}`} className="w-full cursor-zoom-in bg-papel">
              <Foto src={m.foto} alt={m.alt} className="w-full object-contain mix-blend-multiply" />
            </button>
          ) : (
            <Foto src={m.foto} alt={m.alt} className="w-full bg-linha" />
          )}
          {aberta && <Ampliacao src={base + m.foto} alt={m.alt} onClose={() => setAberta(false)} />}
          <figcaption className="px-4 pt-2 text-[13px] leading-snug">
            {m.legenda}
            {creditoVisivel(m.credito) && <span className="block text-cinza">{textos.credito}: {m.credito}</span>}
          </figcaption>
        </figure>
      </Reveal>
    )
  }
  if (m.tipo === 'antesHoje') return (
    <Reveal className="my-10">
      <h2 className="mb-1 font-titulo text-2xl">{antesHoje.titulo}</h2>
      <p className="mb-3 text-sm text-cinza">{antesHoje.instrucao}</p>
      <AntesHoje />
    </Reveal>
  )
  if (m.tipo === 'citacao') return (
    <Reveal className="my-10">
      <blockquote className="border-l-[6px] border-vermelho pl-4 font-titulo text-[26px] font-black leading-[1.1] tracking-tight">
        {m.texto}
        {m.autor && <footer className="mt-2 font-texto text-sm font-normal text-cinza">{m.autor}</footer>}
      </blockquote>
    </Reveal>
  )
  const D = diagramas[m.id]
  return (
    <Reveal className="my-8">
      <D />
      <p className="mt-2 text-[13px] leading-snug text-cinza">{m.legenda}</p>
    </Reveal>
  )
}
