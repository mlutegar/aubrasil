import { chromium } from 'playwright'
const base = (process.env.BASE ?? 'http://localhost:4173').replace(/\/$/, ''), out = process.env.SHOTS ?? 'shots/local'
const b = await chromium.launch(); const page = await (await b.newContext({ viewport: { width: 390, height: 844 } })).newPage()
for (const [nome, url] of [['home', '/'], ['cap-identificacao', '/capitulo/identificacao'], ['cap-materiais', '/capitulo/materiais'], ['cap-transformacoes', '/capitulo/transformacoes'], ['referencias', '/referencias']]) {
  await page.goto(base + url); await page.waitForLoadState('networkidle')
  const intro = page.getByRole('button', { name: /pular|entrar/i }); if (await intro.count()) await intro.first().click().catch(() => {})
  await page.waitForTimeout(1500)
  await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 500) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 120)) } window.scrollTo(0, 0) })
  await page.waitForTimeout(500)
  await page.screenshot({ path: `${out}/${nome}.png`, fullPage: nome !== 'home' })
  const quebradas = await page.evaluate(() => [...document.images].filter(i => !(i.complete && i.naturalWidth > 0)).map(i => i.currentSrc))
  console.log(nome, 'imgs quebradas:', quebradas.length ? quebradas : 'nenhuma')
}
await b.close()
