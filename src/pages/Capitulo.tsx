import { Fragment } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { capitulos, capituloTextos as T, primeiroEdificioDoCapitulo } from '../data/content'
import BlocoMidia from '../components/BlocoMidia'
import ProgressoLeitura from '../components/ProgressoLeitura'

export default function Capitulo() {
  const { slug } = useParams()
  const i = capitulos.findIndex(x => x.slug === slug)
  if (i < 0) return <Navigate to="/" replace />
  const c = capitulos[i]
  const ant = capitulos[i - 1], prox = capitulos[i + 1]
  const edMapa = primeiroEdificioDoCapitulo(c.slug)
  return (
    <article>
      <ProgressoLeitura />
      <header className="mb-8">
        <p className="font-titulo text-[96px] font-black leading-[0.85] text-vermelho" aria-label={`Capítulo ${c.numero}`}>{String(c.numero).padStart(2, '0')}</p>
        <h1 className="titulo-pagina traco mt-3">{c.titulo}</h1>
        <p className="mt-4 font-titulo text-lg font-extrabold">{c.subtitulo}</p>
      </header>
      <div className="text-[17px] leading-[1.6]">
        {c.paragrafos.map((p, k) => (
          <Fragment key={k}>
            <p className="mb-5 max-w-[65ch]">{p}</p>
            {c.midia.filter(b => b.depois === k).map((b, j) => <BlocoMidia key={j} m={b.bloco} />)}
          </Fragment>
        ))}
      </div>
      <footer className="mt-12 border-t-2 border-tinta pt-6">
        {edMapa && <Link to={`/mapa?edificio=${edMapa}`} className="mb-5 flex h-12 w-full items-center justify-center rounded-full bg-marinho font-titulo text-base font-extrabold text-white">{T.verNoMapa}</Link>}
        <nav className="flex items-stretch justify-between gap-3 font-titulo text-[15px] font-extrabold">
          {ant ? <Link to={`/capitulo/${ant.slug}`} className="flex min-h-12 flex-1 items-center border-2 border-tinta px-3">{T.anterior}</Link> : <span className="flex-1" />}
          {prox ? <Link to={`/capitulo/${prox.slug}`} className="flex min-h-12 flex-1 items-center justify-end border-2 border-tinta px-3 text-right">{T.proximo}</Link> : <span className="flex-1" />}
        </nav>
      </footer>
    </article>
  )
}
