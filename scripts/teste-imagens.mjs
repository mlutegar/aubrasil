// Abre as 7 sheets do mapa nas 3 abas e os 6 marcos da linha do tempo (390px).
// Falha se algum <img> apontar para arquivo inexistente (404, HTML do fallback SPA, não carrega) ou para SVG placeholder.
// Uso: BASE=https://site npm run teste:imagens   (padrão: http://localhost:4173, rode `npm run preview` antes)
//      SHOTS=pasta  salva um screenshot por estado.
import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'
const base = (process.env.BASE ?? 'http://localhost:4173').replace(/\/$/, '')
const shots = process.env.SHOTS
if (shots) mkdirSync(shots, { recursive: true })
const EDIFICIOS = ['bloco-a', 'blocos-b', 'escola', 'posto', 'lavanderia', 'mercado', 'jardins']
const ABAS = ['Original', 'Transformação', 'Hoje']
const browser = await chromium.launch()
const page = await (await browser.newContext({ viewport: { width: 390, height: 844 } })).newPage()
let falhas = 0, imgsVistas = 0
const log = []
const checar = async (nome, escopo) => {
  const imgs = await escopo.locator('img').evaluateAll(l => l.map(i => ({ src: i.currentSrc || i.src, ok: i.complete && i.naturalWidth > 0 })))
  const problemas = []
  for (const i of imgs) {
    imgsVistas++
    if (/\.svg(\?|$)/i.test(i.src)) problemas.push(`SVG placeholder: ${i.src}`)
    else if (!i.ok) problemas.push(`não carregou: ${i.src}`)
    else {
      const r = await page.request.get(i.src)
      const ct = r.headers()['content-type'] ?? ''
      if (!r.ok() || !ct.startsWith('image/') || ct.includes('svg')) problemas.push(`arquivo inexistente/inválido (${r.status()} ${ct}): ${i.src}`)
    }
  }
  if (problemas.length) falhas++
  log.push(`${problemas.length ? 'FALHA' : 'ok   '} ${nome} (${imgs.length} img)${problemas.length ? ' -> ' + problemas.join('; ') : ''}`)
}
const esperar = async () => { await page.waitForLoadState('networkidle'); await page.waitForTimeout(500) }

for (const id of EDIFICIOS) {
  await page.goto(`${base}/mapa?edificio=${id}`); await esperar()
  const dlg = page.getByRole('dialog')
  await dlg.waitFor()
  for (const [i, aba] of ABAS.entries()) {
    await dlg.getByRole('tab', { name: aba }).click(); await esperar()
    await checar(`mapa ${id} / ${aba}`, dlg)
    if (shots) await page.screenshot({ path: `${shots}/mapa-${id}-${i + 1}-${aba.toLowerCase().replace('ç', 'c').replace('ã', 'a')}.png` })
  }
}

await page.goto(`${base}/linha-do-tempo`); await esperar()
const marcos = page.locator('ol > li > button')
const n = await marcos.count()
if (n !== 6) { falhas++; log.push(`FALHA esperados 6 marcos, achei ${n}`) }
for (let i = 0; i < n; i++) {
  await marcos.nth(i).click()
  const dlg = page.getByRole('dialog'); await dlg.waitFor(); await esperar()
  const ano = (await dlg.locator('h2').first().innerText()).replace(/\n/g, ' ')
  await checar(`marco ${i + 1} (${ano})`, dlg)
  if (shots) await page.screenshot({ path: `${shots}/marco-${i + 1}.png` })
  await page.keyboard.press('Escape'); await dlg.waitFor({ state: 'detached' })
}
await browser.close()
console.log(log.join('\n'))
console.log(`\n${imgsVistas} imagens verificadas, ${falhas} estado(s) com falha`)
if (!imgsVistas) { console.log('FALHA: nenhuma imagem verificada'); process.exit(1) }
process.exit(falhas ? 1 : 0)
