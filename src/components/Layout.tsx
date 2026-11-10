import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Header from './Header'
import { capitulos, secoes } from '../data/content'

export function subtituloDe(pathname: string): string {
  const cap = capitulos.find(c => pathname === `/capitulo/${c.slug}`)
  if (cap) return `Capítulo ${cap.numero}`
  return secoes.find(s => s.to === pathname)?.subtitulo ?? ''
}

export default function Layout() {
  const { pathname } = useLocation()
  useEffect(() => window.scrollTo(0, 0), [pathname])
  return (
    <div className="mx-auto min-h-screen max-w-coluna bg-papel sm:border-x sm:border-linha">
      <Header subtitulo={subtituloDe(pathname)} />
      <main className="px-gutter pb-16 pt-24"><Outlet /></main>
    </div>
  )
}
