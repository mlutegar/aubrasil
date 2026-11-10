// Gera WebP responsivo, OG cover 1200x630, favicons e fontes locais. Uso: npm run imagens
import sharp from 'sharp'
import opentype from 'opentype.js'
import { copyFileSync, readdirSync, readFileSync } from 'node:fs'

const IMG = 'public/img/'
const LARGURAS = [400, 640]
const EXTRAS = { 'home-bloco-a': [708] } // largura original (708px): servida em telas 2x sem ampliar

// 1) WebP em múltiplos tamanhos (nunca amplia além do original)
for (const f of readdirSync(IMG).filter(f => /\.jpe?g$/i.test(f))) {
  const nome = f.replace(/\.jpe?g$/i, '')
  const ws = [...LARGURAS, ...(EXTRAS[nome] ?? [])] // arquivo -640 pode ter menos px se o original for menor (sem ampliar)
  for (const w of ws) await sharp(IMG + f).resize({ width: w, withoutEnlargement: true }).webp({ quality: 78 }).toFile(`${IMG}${nome}-${w}.webp`)
  console.log(nome, ws.join(','))
}

// 2) Fontes locais (só latin): título 900 recebe preload
const FD = 'node_modules/@fontsource/'
const fontes = [['inter-tight', [600, 800, 900]], ['inter', [400, 500, 600]]]
for (const [fam, pesos] of fontes) for (const p of pesos) copyFileSync(`${FD}${fam}/files/${fam}-latin-${p}-normal.woff2`, `public/fonts/${fam}-latin-${p}.woff2`)

// 3) Open Graph 1200x630: recorte da arte + título em curvas (opentype) na fonte do site
const W = 1200, H = 630
const carrega = n => { const b = readFileSync(`${FD}inter-tight/files/${n}`); return opentype.parse(b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength)) }
const fonte = carrega('inter-tight-latin-900-normal.woff')
const fonteSub = carrega('inter-tight-latin-800-normal.woff')
const path = (f, t, x, y, s) => { // glifo a glifo (evita o motor GSUB do opentype.js, que falha nesta fonte)
  const k = s / f.unitsPerEm; let d = ''; let prev = null
  for (const ch of t) {
    const g = f.charToGlyph(ch)
    if (prev) x += f.getKerningValue(prev, g) * k
    d += g.getPath(x, y, s).toSVG(2); x += g.advanceWidth * k; prev = g
  }
  return d
}
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
<g fill="#111111">${path(fonte, 'Conjunto', 64, 120, 100)}${path(fonte, 'Pedregulho', 64, 215, 100)}</g>
<rect x="64" y="242" width="96" height="12" fill="#D7261E"/>
<g fill="#111111">${path(fonteSub, 'Comunidade ou isolamento?', 64, 306, 38)}</g></svg>`
await sharp('public/img/og-arte.png').resize(W, H, { fit: 'cover', position: 'left top' })
  .composite([{ input: Buffer.from(svg) }]).png({ compressionLevel: 9, palette: true }).toFile('public/og-cover.png')

// 4) Favicons
const fav = readFileSync('public/favicon.svg')
await sharp(fav, { density: 384 }).resize(180, 180).png().toFile('public/apple-touch-icon.png')
await sharp(fav, { density: 384 }).resize(32, 32).png().toFile('public/favicon-32.png')
console.log('ok')
