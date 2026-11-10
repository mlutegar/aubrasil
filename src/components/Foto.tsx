import type { ImgHTMLAttributes } from 'react'

const base = import.meta.env.BASE_URL

/** Foto com WebP responsivo (gerado por `npm run imagens`) para .jpg; SVG/outros passam direto. */
export default function Foto({ src, sizes = '100vw', eager, ...rest }: { src: string; sizes?: string; eager?: boolean } & ImgHTMLAttributes<HTMLImageElement>) {
  const m = /^(.*)\.jpe?g$/i.exec(src)
  const attrs = { loading: eager ? 'eager' : 'lazy', decoding: 'async', fetchPriority: eager ? 'high' : undefined } as const
  if (!m) return <img src={base + src} {...attrs} {...rest} />
  const set = `${base}${m[1]}-400.webp 400w, ${base}${m[1]}-640.webp 640w`
  return (
    <picture>
      <source type="image/webp" srcSet={set} sizes={sizes} />
      <img src={base + src} {...attrs} {...rest} />
    </picture>
  )
}
