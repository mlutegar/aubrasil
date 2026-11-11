// Uso: node scripts/shots-capa.mjs <prefixo> [url-base]   -> shots/p18/<prefixo>-{tempo,home}-<w>.png (scroll 0, movimento reduzido p/ ser determinístico)
import { chromium } from 'playwright'
const [prefixo = 'depois', base = 'http://localhost:4173'] = process.argv.slice(2)
const br = await chromium.launch()
for (const w of [360, 390, 430]) {
  const ctx = await br.newContext({ viewport: { width: w, height: 844 }, reducedMotion: 'reduce' })
  for (const [nome, rota] of [['tempo', '/linha-do-tempo'], ['home', '/']]) {
    const pg = await ctx.newPage()
    await pg.goto(base + rota); await pg.waitForLoadState('networkidle'); await pg.waitForTimeout(2500)
    await pg.screenshot({ path: `shots/p18/${prefixo}-${nome}-${w}.png` })
    if (nome === 'tempo') {
      const m = await pg.evaluate(() => {
        const r = s => { const e = document.querySelector(s); if (!e) return null; const b = e.getBoundingClientRect(); return { top: Math.round(b.top), bottom: Math.round(b.bottom), left: Math.round(b.left), right: Math.round(b.right) } }
        return { header: r('header'), circulo: r('figure > div:first-of-type'), frase: r('section > p:nth-of-type(2)'), foto: r('figure img') }
      })
      console.log(w, JSON.stringify(m))
    }
    await pg.close()
  }
  await ctx.close()
}
await br.close()
