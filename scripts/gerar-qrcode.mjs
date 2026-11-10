// Uso: npm run qrcode -- https://pedregulho.mrender.com.br
// Gera qrcode.svg (vetorial, azul-marinho, fundo transparente) e qrcode.png (2000x2000) com ?origem=prancha
import QRCode from 'qrcode'
import sharp from 'sharp'
import { writeFileSync } from 'node:fs'

const base = process.argv[2]
if (!base) { console.error('Uso: npm run qrcode -- <URL final>'); process.exit(1) }
const u = new URL(base)
u.searchParams.set('origem', 'prancha')
const url = u.toString()

const opts = { errorCorrectionLevel: 'H', margin: 4 } // margem de 4 módulos (quiet zone padrão)
const svg = await QRCode.toString(url, { ...opts, type: 'svg', color: { dark: '#0B3A8C', light: '#0000' } })
writeFileSync('qrcode.svg', svg)

const png = await QRCode.toBuffer(url, { ...opts, type: 'png', width: 2000, color: { dark: '#0B3A8C', light: '#FFFFFFFF' } })
await sharp(png).resize(2000, 2000, { kernel: 'nearest' }).png().toFile('qrcode.png')
console.log('OK:', url, '-> qrcode.svg, qrcode.png (2000x2000)')
