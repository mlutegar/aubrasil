import { chromium } from 'playwright'
const B = 'http://localhost:4173', O = 'shots/p13/', suf = process.argv[2] || 'depois'
const br = await chromium.launch()
for (const w of [360, 390, 430]) {
  const pg = await (await br.newContext({ viewport: { width: w, height: 844 } })).newPage()
  for (const [rota, nome] of [['/', 'home'], ['/linha-do-tempo', 'tempo']]) {
    await pg.goto(B + rota); await pg.waitForLoadState('networkidle'); await pg.waitForTimeout(2500)
    await pg.screenshot({ path: `${O}${nome}-${w}-${suf}.png`, fullPage: false })
    const ov = await pg.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
    console.log(nome, w, 'overflow-x:', ov)
  }
  if (suf === 'depois') {
    await pg.goto(B + '/linha-do-tempo'); await pg.waitForLoadState('networkidle'); await pg.waitForTimeout(2000)
    await pg.getByRole('button', { name: /Explorar linha do tempo/ }).click({ timeout: 5000 })
    await pg.waitForTimeout(1200)
    console.log('clique ok', w, 'scrollY', await pg.evaluate(() => Math.round(scrollY)))
  }
}
await br.close()
