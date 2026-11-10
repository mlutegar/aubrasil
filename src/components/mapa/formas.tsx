import type { ReactNode } from 'react'
import type { TipoEdificio } from '../../data/content'

export const VB = { w: 400, h: 520 }

export const CORES: Record<TipoEdificio, { fill: string; line: string }> = {
  residencial: { fill: '#F3A39C', line: '#D7261E' },
  coletivo: { fill: '#8DB3F5', line: '#0B3A8C' },
}

type Cor = { fill: string; line: string }
interface Forma {
  vb: [number, number, number, number] // recorte da miniatura
  hotspot: [number, number] // posição do hotspot no mapa (coords do viewBox)
  desenho: (c: Cor) => ReactNode
}

const Barra = ({ cx, cy, w, h, rot, c }: { cx: number; cy: number; w: number; h: number; rot: number; c: Cor }) => (
  <rect x={cx - w / 2} y={cy - h / 2} width={w} height={h} transform={`rotate(${rot} ${cx} ${cy})`} fill={c.fill} stroke={c.line} strokeWidth={1.6} />
)
const Ret = ({ x, y, w, h, c }: { x: number; y: number; w: number; h: number; c: Cor }) => (
  <rect x={x} y={y} width={w} height={h} fill={c.fill} stroke={c.line} strokeWidth={1.6} />
)

// Bloco A: faixa em S seguindo as curvas de nível (contorno = traço largo escuro + traço mais estreito claro)
const BLOCO_A = 'M 232 62 C 330 56 352 108 312 150 C 272 192 282 232 346 262 C 378 278 372 312 350 344'

export const formas: Record<string, Forma> = {
  'bloco-a': {
    vb: [215, 40, 190, 330],
    hotspot: [312, 150],
    desenho: c => (
      <>
        <path d={BLOCO_A} fill="none" stroke={c.line} strokeWidth={24} />
        <path d={BLOCO_A} fill="none" stroke={c.fill} strokeWidth={20.8} />
      </>
    ),
  },
  'blocos-b': {
    vb: [120, 345, 170, 110],
    hotspot: [205, 405],
    desenho: c => (
      <>
        <Barra cx={195} cy={388} w={116} h={20} rot={-18} c={c} />
        <Barra cx={215} cy={424} w={116} h={20} rot={-18} c={c} />
      </>
    ),
  },
  escola: {
    vb: [45, 70, 140, 80],
    hotspot: [100, 112],
    desenho: c => (
      <>
        <Ret x={55} y={100} w={58} h={28} c={c} />
        <Ret x={124} y={84} w={44} h={30} c={c} />
        <rect x={130} y={120} width={32} height={14} rx={2} fill={c.fill} stroke={c.line} strokeWidth={1.2} strokeDasharray="3 2" />
      </>
    ),
  },
  posto: {
    vb: [75, 255, 70, 50],
    hotspot: [108, 280],
    desenho: c => <Ret x={90} y={269} w={36} h={22} c={c} />,
  },
  mercado: {
    vb: [165, 265, 80, 50],
    hotspot: [205, 290],
    desenho: c => <Ret x={184} y={279} w={42} h={22} c={c} />,
  },
  lavanderia: {
    vb: [10, 215, 80, 55],
    hotspot: [44, 242],
    desenho: c => <Ret x={24} y={231} w={40} h={24} c={c} />,
  },
  jardins: {
    vb: [25, 375, 130, 90],
    hotspot: [82, 418],
    desenho: c => (
      <>
        <Ret x={40} y={398} w={66} h={38} c={c} />
        <rect x={114} y={404} width={26} height={28} fill="none" stroke={c.line} strokeWidth={1.2} strokeDasharray="3 2" />
      </>
    ),
  },
}

/* ---------- Base do mapa (fundo, curvas de nível, árvores, rosa dos ventos, escala) ---------- */

// Curvas de nível orgânicas e concêntricas ao redor do alto do morro (nordeste)
function contorno(k: number): string {
  const cx = 330, cy = 130, pts: string[] = []
  const n = 90
  for (let i = 0; i < n; i++) {
    const t = (i / n) * Math.PI * 2
    const r = 38 * k * (1 + 0.1 * Math.sin(3 * t + k * 0.6) + 0.06 * Math.sin(5 * t - k * 0.4))
    pts.push(`${(cx + r * 1.15 * Math.cos(t)).toFixed(1)},${(cy + r * 0.95 * Math.sin(t)).toFixed(1)}`)
  }
  return `M ${pts.join(' L ')} Z`
}
const CURVAS = Array.from({ length: 11 }, (_, i) => contorno(i + 1))

// Árvores: posições pseudoaleatórias fixas, fora dos edifícios
const livres: [number, number, number, number][] = [
  [0, 0, 120, 75], // rosa dos ventos / escala
  ...Object.values(formas).map(f => [f.vb[0], f.vb[1], f.vb[2], f.vb[3]] as [number, number, number, number]),
  [215, 40, 190, 330],
]
function arvores(): [number, number, number][] {
  let s = 7
  const rnd = () => ((s = (s * 16807) % 2147483647) / 2147483647)
  const out: [number, number, number][] = []
  let tent = 0
  while (out.length < 46 && tent++ < 800) {
    const x = 8 + rnd() * 384, y = 8 + rnd() * 504, r = 5 + rnd() * 4
    const dentro = livres.some(([bx, by, bw, bh]) => x > bx - r - 4 && x < bx + bw + r + 4 && y > by - r - 4 && y < by + bh + r + 4)
    const perto = out.some(([ox, oy, or]) => Math.hypot(ox - x, oy - y) < or + r + 2)
    if (!dentro && !perto) out.push([x, y, r])
  }
  return out
}
const ARVORES = arvores()

export function BaseMapa({ escala }: { escala: string }) {
  return (
    <>
      <rect width={VB.w} height={VB.h} fill="#F2F2F0" />
      <g fill="none" stroke="#B9B9B5" strokeWidth={0.8}>
        {CURVAS.map((d, i) => <path key={i} d={d} />)}
      </g>
      {/* praça central */}
      <circle cx={150} cy={262} r={28} fill="none" stroke="#9A9A95" strokeWidth={0.9} strokeDasharray="4 3" />
      <circle cx={150} cy={262} r={3} fill="none" stroke="#9A9A95" strokeWidth={0.9} />
      <g fill="none" stroke="#8E9A8A" strokeWidth={0.9}>
        {ARVORES.map(([x, y, r], i) => <circle key={i} cx={x} cy={y} r={r} />)}
      </g>
      {/* rosa dos ventos */}
      <g transform="translate(34 40)" stroke="#333" strokeWidth={1} fill="none">
        <circle r={14} />
        <path d="M 0 -20 L 5 0 L 0 20 L -5 0 Z" fill="#fff" />
        <path d="M 0 -20 L 5 0 L 0 0 Z" fill="#333" />
        <path d="M -14 0 H 14" />
        <text y={-24} textAnchor="middle" fontSize={11} fontWeight={700} fill="#333" stroke="none" fontFamily="Inter, sans-serif">N</text>
      </g>
      {/* escala gráfica 0-25-50-100 m (100 m = 104 unidades) */}
      <g transform="translate(16 72)" fontFamily="Inter, sans-serif" fontSize={7} fill="#333" aria-label={escala}>
        <rect x={0} y={0} width={26} height={4} fill="#333" />
        <rect x={26} y={0} width={26} height={4} fill="#fff" stroke="#333" strokeWidth={0.8} />
        <rect x={52} y={0} width={52} height={4} fill="#333" />
        <text x={0} y={13} textAnchor="middle">0</text>
        <text x={26} y={13} textAnchor="middle">25</text>
        <text x={52} y={13} textAnchor="middle">50</text>
        <text x={104} y={13} textAnchor="middle">100 m</text>
      </g>
    </>
  )
}
