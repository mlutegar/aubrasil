import { motion } from 'framer-motion'
import { useEntrar } from './useEntrar'

type Pub = 'publico' | 'semi' | 'privado'
const cores: Record<Pub, { fill: string; text: string }> = {
  publico: { fill: '#0B3A8C', text: '#EDEBE6' },
  semi: { fill: '#5B8DEF', text: '#111111' },
  privado: { fill: '#8C8C8C', text: '#111111' },
}
const W = 104, H = 52, PITCH = 78
interface No { id: string; x: number; y: number; linhas: string[]; pub: Pub }
const col = (x: number, itens: [string[], Pub][]): No[] =>
  itens.map(([linhas, pub], i) => ({ id: `${x}-${i}`, x, y: 16 + i * PITCH, linhas, pub }))

const A = col(8, [[['Platô superior'], 'publico'], [['Passarelas'], 'semi'], [['3º pavimento', 'livre'], 'semi'], [['Galerias', '4º e 6º'], 'semi'], [['Duplex'], 'privado']])
const B = col(128, [[['Corredores', '1º e 2º'], 'semi'], [['Apartamentos de', 'um só nível'], 'privado']])
const C = col(248, [[['Térreo e', 'encosta'], 'publico'], [['Praça central'], 'publico'], [['Escola e', 'academia'], 'publico']])
const lav: No = { id: 'lav', x: 248, y: 16 + 4 * PITCH, linhas: ['Lavanderia', 'e mercado'], pub: 'semi' }
const cadeias = [A, B, C]
const todos = [...A, ...B, ...C, lav]
// ordem de acendimento: por passo da cadeia, depois a próxima cadeia
const ordem = (n: No) => {
  if (n === lav) return 15
  const c = cadeias.findIndex(ch => ch.includes(n))
  return cadeias[c].indexOf(n) * 3 + c
}

export default function DiagramaFluxos() {
  const { ref, on, reduzir } = useEntrar<SVGSVGElement>()
  const d = (k: number) => (reduzir ? 0 : k * 0.22)
  const yPraca = C[1].y + H / 2
  return (
    <figure>
      <svg ref={ref} viewBox="0 0 368 380" className="w-full" role="img"
        aria-label="Diagrama de fluxos: do platô e do térreo aos espaços públicos, semipúblicos e privados do conjunto">
        <defs>
          <marker id="seta" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#111" /></marker>
          <marker id="setaV" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#D7261E" /></marker>
        </defs>
        {cadeias.map(ch => ch.slice(0, -1).map((n, i) => (
          <motion.line key={`l${n.id}`} x1={n.x + W / 2} y1={n.y + H} x2={n.x + W / 2} y2={ch[i + 1].y - 3}
            stroke="#111" strokeWidth={1.5} markerEnd="url(#seta)"
            initial={{ opacity: 0 }} animate={{ opacity: on ? 1 : 0 }} transition={{ delay: d(ordem(ch[i + 1]) + 0.5), duration: 0.3 }} />
        )))}
        <motion.path d={`M${C[1].x + W},${yPraca} C366,${yPraca} 366,${lav.y + H / 2} ${lav.x + W + 3},${lav.y + H / 2}`}
          fill="none" stroke="#D7261E" strokeWidth={2} strokeDasharray="6 5" markerEnd="url(#setaV)"
          initial={{ opacity: 0 }} animate={{ opacity: on ? 1 : 0 }} transition={{ delay: d(16), duration: 0.4 }} />
        <motion.text x={C[1].x + W / 2} y={(C[2].y + H + lav.y) / 2 + 4} textAnchor="middle" fontSize="11" fontWeight="700" fill="#D7261E"
          initial={{ opacity: 0 }} animate={{ opacity: on ? 1 : 0 }} transition={{ delay: d(16.5), duration: 0.4 }}>percurso longo</motion.text>
        {todos.map(n => (
          <motion.g key={n.id} initial={{ opacity: 0.12 }} animate={{ opacity: on ? 1 : 0.12 }} transition={{ delay: d(ordem(n)), duration: 0.4 }}>
            <rect x={n.x} y={n.y} width={W} height={H} fill={cores[n.pub].fill} />
            <text textAnchor="middle" fontSize="11.5" fontWeight="700" fill={cores[n.pub].text}>
              {n.linhas.map((l, i) => (
                <tspan key={l} x={n.x + W / 2} y={n.y + H / 2 + 4 - (n.linhas.length - 1) * 7 + i * 14}>{l}</tspan>
              ))}
            </text>
          </motion.g>
        ))}
      </svg>
      <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[13px]" aria-label="Legenda">
        {([['publico', 'Público'], ['semi', 'Semipúblico/coletivo'], ['privado', 'Privado']] as [Pub, string][]).map(([k, t]) => (
          <li key={k} className="flex items-center gap-2"><span className="h-3 w-3" style={{ background: cores[k].fill }} />{t}</li>
        ))}
      </ul>
    </figure>
  )
}
