import { chromium } from 'playwright'
const br = await chromium.launch()
for (const w of [360, 390, 430]) {
  const pg = await (await br.newContext({ viewport: { width: w, height: 1100 } })).newPage()
  await pg.goto('http://localhost:4173/linha-do-tempo'); await pg.waitForLoadState('networkidle'); await pg.waitForTimeout(2500)
  await pg.screenshot({ path: `shots/p17/tempo-capa-${w}.png` })
}
await br.close()
