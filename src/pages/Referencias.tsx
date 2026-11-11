import { creditoVisivel } from '../lib/credito'
import type { ReactNode } from 'react'
import Titulo from '../components/Titulo'
import { antesHoje, capitulos, edificios, home, linhaDoTempo, referencias, referenciasTextos as T, rodape, tempoTextos, textos } from '../data/content'

/** Transforma URLs do texto em links clicáveis. */
function comLinks(texto: string): ReactNode[] {
  return texto.split(/(https?:\/\/[^\s<>]+[^\s<>.,;)])/g).map((parte, i) =>
    i % 2 === 1
      ? <a key={i} href={parte} target="_blank" rel="noopener noreferrer" className="break-words text-marinho underline underline-offset-2">{parte}</a>
      : parte)
}

interface ItemCredito { chave: string; nome: string; credito: string }

/** Reúne todas as imagens do site (campos foto/credito) sem repetir arquivos. */
function creditosDasImagens(): ItemCredito[] {
  const mapa = new Map<string, ItemCredito>()
  const add = (foto: string, nome: string, credito: string) => { if (!mapa.has(foto)) mapa.set(foto, { chave: foto, nome, credito }) }
  add(home.imagem, `Início: ${home.imagemLegenda}`, home.imagemCredito)
  add(tempoTextos.imagem, `Linha do tempo: ${tempoTextos.imagemLegenda}`, tempoTextos.imagemCredito)
  add(antesHoje.antes.foto, `Antes: ${antesHoje.antes.legenda}`, antesHoje.antes.credito)
  add(antesHoje.hoje.foto, `Hoje: ${antesHoje.hoje.legenda}`, antesHoje.hoje.credito)
  edificios.forEach(e => {
    ;([['Original', e.fotoOriginal], ['Transformação', e.fotoTransformacao], ['Hoje', e.fotoHoje]] as const).forEach(([aba, f]) => { if (f) add(f.foto, `${e.nome} (${aba})`, f.credito) })
  })
  linhaDoTempo.forEach(ev => { if (ev.foto) add(ev.foto, `${ev.ano}: ${ev.titulo}`, ev.credito ?? '') })
  capitulos.forEach(c => {
    c.midia.forEach(b => {
      if (b.bloco.tipo === 'imagem') add(b.bloco.foto, `Capítulo ${c.numero}: ${b.bloco.legenda}`, b.bloco.credito)
      if (b.bloco.tipo === 'par') b.bloco.fotos.forEach(f => add(f.foto, `Capítulo ${c.numero}: ${b.bloco.tipo === 'par' ? b.bloco.legenda : ''} (${f.rotulo.toLowerCase()})`, b.bloco.tipo === 'par' ? b.bloco.credito : ''))
    })
  })
  return [...mapa.values()]
}

export default function Referencias() {
  const imagens = creditosDasImagens()
  return (
    <>
      <Titulo kicker={T.bibliografia}>{T.titulo}</Titulo>

      <section>
        <h2 className="mb-3 font-titulo text-2xl">{T.bibliografia}</h2>
        <ul className="space-y-4 text-[15px] leading-[1.5]">
          {referencias.bibliografia.map(r => <li key={r} className="max-w-[65ch] border-l-4 border-linha pl-3">{comLinks(r)}</li>)}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="mb-3 font-titulo text-2xl">{T.imagens}</h2>
        <ul className="space-y-3 text-[14px] leading-snug">
          {imagens.map(i => (
            <li key={i.chave}>
              <span className="font-bold">{i.nome}.</span> {creditoVisivel(i.credito) && <><span className="text-cinza">{textos.credito}:</span> {comLinks(i.credito)}</>}
            </li>
          ))}
          {referencias.creditos.filter(creditoVisivel).map(c => <li key={c}>{comLinks(c)}</li>)}
        </ul>
      </section>

      <section className="mt-12 border-t-2 border-tinta pt-6">
        <h2 className="mb-3 font-titulo text-2xl">{T.ia}</h2>
        <p className="max-w-[65ch] text-[15px] leading-[1.5]">{rodape.notaIA}</p>
      </section>
    </>
  )
}
