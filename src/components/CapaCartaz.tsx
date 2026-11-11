import { useId, type CSSProperties, type ReactNode } from 'react'
import { motion, useReducedMotion, type TargetAndTransition } from 'framer-motion'
import Foto from './Foto'

/** Entrada sutil da composição; sem movimento em prefers-reduced-motion. */
function Mov({ className, children, ini, fim, atraso = 0 }: { className: string; children?: ReactNode; ini: TargetAndTransition; fim: TargetAndTransition; atraso?: number }) {
  const reduzir = useReducedMotion()
  if (reduzir) return <div className={className}>{children}</div>
  return <motion.div className={className} initial={ini} animate={fim} transition={{ duration: 0.6, ease: 'easeOut', delay: atraso }}>{children}</motion.div>
}

/** Topo da foto em curva S (objectBoundingBox). "espelhada" inverte horizontalmente a "padrao". */
const CURVAS = {
  padrao: 'M0,0.16 C0.3,0.16 0.4,0.02 0.7,0.02 C0.85,0.02 0.94,0.05 1,0.05 L1,1 L0,1 Z',
  espelhada: 'M1,0.16 C0.7,0.16 0.6,0.02 0.3,0.02 C0.15,0.02 0.06,0.05 0,0.05 L0,1 L1,1 Z',
  /** Espelhada com a ponta esquerda mais baixa, acompanhando o telhado do Bloco A (que cai para a esquerda) em vez de cortar céu claro. */
  tempo: 'M1,0.16 C0.7,0.16 0.6,0.02 0.3,0.02 C0.15,0.02 0.06,0.2 0,0.24 L0,1 L1,1 Z',
}

type Props = {
  foto: string
  alt: string
  legenda: string
  credito: string
  /** Classe Tailwind de proporção da foto, ex. "aspect-[4/3]" */
  proporcao?: string
  /** Valor CSS de object-position, ex. "0% 50%" */
  objectPosition?: string
  circulo?: 'direita' | 'esquerda'
  curva?: keyof typeof CURVAS
  larguras?: number[]
  /** Filtro CSS opcional aplicado à foto (ex. P&B) */
  filtro?: string
  /** Camada de cor em multiply sobre a foto (tom papel) */
  tom?: string
  /** Linha vertical fina saindo de baixo da foto até o conteúdo seguinte (precisa de mt-6 = 1.5rem de respiro) */
  linha?: boolean
  /** Fração (0–1) da altura da foto cortada no topo (tira céu); o enquadramento 4:3 se mantém. Sem a prop, a foto não é recortada. */
  recorteTopo?: number
  /** Legenda em duas camadas (texto 12px + crédito 11px mais claro), em vez de uma linha só */
  legendaDupla?: boolean
  /** Degradê de máscara no topo da foto (transparente → opaco em 18%): o céu claro se funde ao papel */
  fundirCeu?: boolean
  className?: string
}

/** Composição cartaz: círculo marinho atrás, foto com topo em curva S, faixa vermelha na base, legenda à direita. */
export default function CapaCartaz({
  foto, alt, legenda, credito, proporcao = 'aspect-[4/3]', objectPosition = '0% 50%',
  circulo = 'direita', curva = 'padrao', larguras = [640, 960, 1262], filtro, tom, linha, recorteTopo, legendaDupla, fundirCeu, className = '',
}: Props) {
  const id = `curva-${useId().replace(/:/g, '')}`
  const lado = circulo === 'direita' ? 'right-[-6%]' : 'left-[-6%]'
  const estilo: CSSProperties = { clipPath: `url(#${id})`, objectPosition, filter: filtro }
  // Com recorte: a <img> fica mais alta que o quadro (ancorada na base) e o excesso do topo é escondido.
  const foto$ = (
    <Foto
      eager sizes="(min-width: 480px) 480px, 100vw" larguras={larguras}
      src={foto} alt={alt}
      className={recorteTopo ? 'pointer-events-none absolute inset-x-0 bottom-0 block w-full object-cover' : `pointer-events-none block ${proporcao} w-full object-cover`}
      style={recorteTopo ? { height: `${100 / (1 - recorteTopo)}%`, objectPosition, filter: filtro } : estilo}
    />
  )
  return (
    <>
      <svg width="0" height="0" className="absolute" aria-hidden focusable="false">
        <defs>
          <clipPath id={id} clipPathUnits="objectBoundingBox"><path d={CURVAS[curva]} /></clipPath>
        </defs>
      </svg>
      <figure className={`relative -mx-gutter mt-6 pt-[37.5%] [overflow-x:clip] ${className}`}>
        <Mov className={`pointer-events-none absolute ${lado} top-0 z-0 aspect-square w-3/4 rounded-full bg-marinho`} ini={{ opacity: 0, scale: 0.96 }} fim={{ opacity: 1, scale: 1 }} atraso={0.15} />
        <Mov className={`relative z-10 ${fundirCeu ? '[mask-image:linear-gradient(to_bottom,transparent_0%,black_18%)]' : ''}`} ini={{ opacity: 0, y: 12 }} fim={{ opacity: 1, y: 0 }}>
          {recorteTopo
            ? <div className={`relative overflow-hidden ${proporcao}`} style={{ clipPath: `url(#${id})` }}>{foto$}</div>
            : foto$}
          {tom && <div className="pointer-events-none absolute inset-0 mix-blend-multiply" style={{ background: tom, clipPath: `url(#${id})` }} />}
          <div className="pointer-events-none absolute bottom-0 left-gutter h-5 w-[72px] translate-y-1/2 bg-vermelho" />
        </Mov>
        <figcaption className="relative z-0 px-gutter pt-4 text-right text-xs text-[#595959]">
          {linha && <span aria-hidden className="pointer-events-none absolute left-[calc(16px+35px)] top-0 -bottom-6 z-0 w-[2px] bg-marinho" />}
          {legendaDupla
            ? <><span className="block text-xs text-[#595959]">{legenda}</span><span className="block text-[11px] text-[#8C8C8C]">{credito}</span></>
            : <>{legenda} · {credito}</>}
        </figcaption>
      </figure>
    </>
  )
}
