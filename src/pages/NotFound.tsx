import { Link } from 'react-router-dom'
import Titulo from '../components/Titulo'
import { textos } from '../data/content'

export default function NotFound() {
  return (
    <section>
      <Titulo kicker="404">{textos.naoEncontrado}</Titulo>
      <p className="mt-6 max-w-[65ch] text-[17px] leading-[1.6]">{textos.naoEncontradoTexto}</p>
      <Link to="/" className="mt-8 flex h-12 w-full items-center justify-center rounded-full bg-marinho font-titulo text-base font-extrabold text-white">{textos.voltarHome}</Link>
    </section>
  )
}
