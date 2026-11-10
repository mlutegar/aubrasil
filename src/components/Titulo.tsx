import type { ReactNode } from 'react'

export default function Titulo({ children, kicker }: { children: ReactNode; kicker?: string }) {
  return (
    <div className="mb-6">
      {kicker && <p className="mb-2 font-texto text-xs font-semibold uppercase tracking-widest text-cinza">{kicker}</p>}
      <h1 className="titulo-pagina traco">{children}</h1>
    </div>
  )
}
