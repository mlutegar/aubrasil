import { motion } from 'framer-motion'
import { capituloTextos, edificios, statusInfo } from '../../data/content'
import { useEntrar } from './useEntrar'

export default function TabelaTransformacoes() {
  const { ref, on } = useEntrar<HTMLDivElement>(0.1)
  const [h1, h2, h3, h4] = capituloTextos.diagramaTabela
  const cols = 'grid grid-cols-[1.1fr_1fr_1fr_1.1fr]'
  return (
    <div ref={ref} role="table" aria-label="Transformações por edifício" className="text-[12px] leading-snug">
      <div role="row" className={`${cols} gap-x-2 border-b-2 border-tinta pb-1 font-titulo font-extrabold`}>
        <span role="columnheader">{h1}</span><span role="columnheader">{h2} →</span><span role="columnheader">{h3} →</span><span role="columnheader">{h4}</span>
      </div>
      {edificios.map((e, i) => (
        <motion.div key={e.id} role="row" className={`${cols} gap-x-2 border-b border-linha py-2`}
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: on ? 1 : 0, y: on ? 0 : 8 }} transition={{ delay: i * 0.08 }}>
          <span role="cell" className="font-bold">{e.nome}</span>
          <span role="cell">{e.original}</span>
          <span role="cell">{e.transformacao}</span>
          <span role="cell" className="self-start px-1.5 py-1 font-bold" style={{ background: statusInfo[e.status].cor, color: statusInfo[e.status].texto }}>{e.hoje}</span>
        </motion.div>
      ))}
    </div>
  )
}
