import { chromium } from 'playwright'
const base = process.env.BASE ?? 'http://localhost:4173'
const browser = await chromium.launch()
let falhas = 0
const ok = (c, m) => { console.log((c ? 'OK   ' : 'FALHA ') + m); if (!c) falhas++ }
for (const [w, h] of [[360, 740], [390, 844], [430, 932], [1280, 800]]) {
  const page = await (await browser.newContext({ viewport: { width: w, height: h } })).newPage()
  await page.goto(base); await page.waitForLoadState('networkidle')
  const intro = page.getByRole('button', { name: /pular|entrar/i }); if (await intro.count()) await intro.first().click().catch(() => {})
  const abrir = page.getByRole('button', { name: 'Abrir menu' })
  await abrir.click()
  const dlg = page.getByRole('dialog')
  await dlg.waitFor(); await page.waitForTimeout(700)
  ok(await page.evaluate(() => document.body.style.overflow) === 'hidden', `${w}: scroll travado`)
  const box = await dlg.boundingBox()
  ok(Math.abs(box.width - (w <= 480 ? w : 420)) < 1.5, `${w}: largura drawer ${box.width}`)
  await page.screenshot({ path: `shots/menu-${w}-aberto.png` })
  await dlg.getByRole('link', { name: /Materiais/ }).click()
  await page.waitForURL(/materiais/); await page.waitForTimeout(500)
  ok(await dlg.count() === 0, `${w}: menu fechou ao navegar`)
  await page.getByRole('button', { name: 'Abrir menu' }).click(); await dlg.waitFor(); await page.waitForTimeout(700)
  const atual = page.locator('[aria-current="page"]')
  ok(await atual.count() === 1 && /Materiais/.test(await atual.innerText()), `${w}: item atual = Materiais`)
  const cor = await atual.evaluate(e => { const s = getComputedStyle(e); return [s.color, s.backgroundColor, s.borderLeftWidth, s.borderLeftColor] })
  ok(cor[0] === 'rgb(11, 58, 140)' && cor[1] === 'rgb(226, 223, 216)' && cor[2] === '4px' && cor[3] === 'rgb(215, 38, 30)', `${w}: estilo atual ${cor}`)
  await page.screenshot({ path: `shots/menu-${w}-atual.png` })
  await page.keyboard.press('Escape'); await page.waitForTimeout(500)
  ok(await dlg.count() === 0, `${w}: Esc fecha`)
  ok(await page.evaluate(() => document.activeElement?.getAttribute('aria-label')) === 'Abrir menu', `${w}: foco volta ao hambúrguer`)
  await page.getByRole('button', { name: 'Abrir menu' }).click(); await dlg.waitFor()
  await page.getByRole('button', { name: 'Fechar menu' }).click(); await page.waitForTimeout(500)
  ok(await dlg.count() === 0, `${w}: X fecha`)
  if (w >= 1280) {
    await page.getByRole('button', { name: 'Abrir menu' }).click(); await dlg.waitFor(); await page.waitForTimeout(500)
    await page.getByTestId('overlay').click({ position: { x: 100, y: 300 } }); await page.waitForTimeout(500)
    ok(await dlg.count() === 0, `${w}: overlay fecha`)
  }
  // foco preso
  await page.getByRole('button', { name: 'Abrir menu' }).click(); await dlg.waitFor()
  for (let i = 0; i < 20; i++) await page.keyboard.press('Tab')
  ok(await page.evaluate(() => !!document.querySelector('[role=dialog]')?.contains(document.activeElement)), `${w}: foco preso`)
  await page.close()
}
await browser.close(); process.exit(falhas ? 1 : 0)
