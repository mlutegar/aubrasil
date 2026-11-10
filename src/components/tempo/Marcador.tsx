import { motion } from 'framer-motion'
import type { TipoEvento } from '../../data/content'

export default function Marcador({ tipo, layoutId, pequeno }: { tipo: TipoEvento; layoutId?: string; pequeno?: boolean }) {
  const t = pequeno ? 'h-3 w-3' : 'h-[18px] w-[18px]'
  return (
    <motion.span
      layoutId={layoutId}
      aria-hidden="true"
      className={`block shrink-0 ${t} ${tipo === 'construcao' ? 'rounded-full bg-marinho' : 'bg-vermelho'}`}
    />
  )
}
