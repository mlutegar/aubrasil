import { chromium } from 'playwright'
const B = 'http://localhost:4173', O = 'shots/p12/'
const br = await chromium.launch(); const pg = await (await br.newContext({ viewport: { width: 390, height: 844 } })).newPage()
const cap = async (slug, alvo, nome) => { await pg.goto(`${B}/capitulo/${slug}`); await pg.waitForLoadState('networkidle'); const f = pg.locator('figure', { hasText: alvo }).first(); await f.scrollIntoViewIfNeeded(); await pg.waitForTimeout(900); await pg.screenshot({ path: O + nome }) }
await cap('transformacoes', 'Obstáculos à acessibilidade', 'transformacoes-1.png')
await cap('transformacoes', 'Corte: as escadas', 'transformacoes-2.png')
await cap('materiais', 'Ventilação dos banheiros', 'materiais.png')
await cap('contexto', 'Affonso Reidy e Lucio Costa', 'contexto.png')
await pg.goto(`${B}/mapa?edificio=escola`); await pg.waitForSelector('[role=tab]'); 
for (const i of [0, 1, 2]) { await pg.click(`#aba-${i}`); await pg.waitForTimeout(700); await pg.screenshot({ path: `${O}mapa-aba${i}.png` }) }
await pg.goto(`${B}/linha-do-tempo`); await pg.waitForLoadState('networkidle')
await pg.getByText('Capital vai para Brasília').first().click(); await pg.waitForTimeout(1000); await pg.screenshot({ path: O + 'tempo-1960.png' })
await pg.goto(`${B}/referencias`); await pg.waitForLoadState('networkidle'); await pg.screenshot({ path: O + 'referencias.png', fullPage: true })
await br.close()
