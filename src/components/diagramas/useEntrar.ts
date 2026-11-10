import { useRef } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

/** Retorna ref e flag `on` (true ao entrar na tela, ou sempre se movimento reduzido). */
export function useEntrar<T extends Element>(amount = 0.25) {
  const ref = useRef<T>(null)
  const visto = useInView(ref, { once: true, amount })
  const reduzir = useReducedMotion()
  return { ref, on: visto || !!reduzir, reduzir: !!reduzir }
}
