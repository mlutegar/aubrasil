import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const COLS = 6
const ROWS = 12
const PASSO = 0.015
const DUR = 0.35 // maior atraso (5+11)*0.015 + 0.35 = 0.59s: curta, para não atrasar a leitura
const CHAVE = 'pedregulho-intro'

export default function CobogoIntro() {
  const reduzir = useReducedMotion()
  const [feito, setFeito] = useState(() => { try { return sessionStorage.getItem(CHAVE) === '1' } catch { return false } }) // só 1x por sessão
  const concluir = () => { try { sessionStorage.setItem(CHAVE, '1') } catch { /* ignore */ } setFeito(true) }
  if (reduzir || feito) return null
  const cells = Array.from({ length: COLS * ROWS }, (_, i) => ({ i, c: i % COLS, r: Math.floor(i / COLS) }))
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[60] grid"
      style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)`, gridTemplateRows: `repeat(${ROWS}, 1fr)` }}
    >
      {cells.map(({ i, c, r }) => (
        <motion.div
          key={i}
          className="bg-marinho p-[3px]"
          initial={{ opacity: 1, scale: 1 }}
          animate={{ opacity: 0, scale: 0.2 }}
          transition={{ duration: DUR, delay: (c + r) * PASSO, ease: 'easeInOut' }}
          onAnimationComplete={i === cells.length - 1 ? concluir : undefined}
        >
          <div className="h-full w-full border-2 border-papel/30" />
        </motion.div>
      ))}
    </div>
  )
}
