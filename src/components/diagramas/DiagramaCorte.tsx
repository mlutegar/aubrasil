import { motion } from 'framer-motion'
import { useEntrar } from './useEntrar'

export default function DiagramaCorte() {
  const { ref, on } = useEntrar<SVGSVGElement>()
  const fade = (delay: number) => ({ initial: { opacity: 0 }, animate: { opacity: on ? 1 : 0 }, transition: { delay, duration: 0.5 } })
  return (
    <figure>
      <svg ref={ref} viewBox="0 0 368 240" className="w-full" role="img"
        aria-label="Corte esquemático sem escala: cobogó, galeria, apartamento e brises de madeira, com luz filtrada, sol da tarde e ventilação cruzada">
        <defs>
          <marker id="sa" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#0B3A8C" /></marker>
          <marker id="sv" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#D7261E" /></marker>
          <pattern id="cobo" width="8" height="8" patternUnits="userSpaceOnUse"><rect x="1.5" y="1.5" width="5" height="5" fill="none" stroke="#111" strokeWidth="1.2" /></pattern>
        </defs>
        <rect x="20" y="60" width="276" height="6" fill="#8C8C8C" />
        <rect x="20" y="184" width="276" height="6" fill="#8C8C8C" />
        <rect x="52" y="66" width="76" height="118" fill="#5B8DEF" fillOpacity=".18" />
        <rect x="128" y="66" width="150" height="118" fill="#fff" fillOpacity=".5" />
        <line x1="128" y1="66" x2="128" y2="184" stroke="#111" strokeWidth="3" />
        <rect x="20" y="66" width="32" height="118" fill="url(#cobo)" stroke="#111" strokeWidth="1.5" />
        {[0, 1, 2, 3, 4, 5, 6].map(i => <line key={i} x1="278" y1={70 + i * 17} x2="296" y2={76 + i * 17} stroke="#8a5a2b" strokeWidth="4" />)}
        <motion.g {...fade(0.2)}>
          <line x1="4" y1="96" x2="20" y2="108" stroke="#0B3A8C" strokeWidth="2.5" markerEnd="url(#sa)" />
          <line x1="54" y1="108" x2="104" y2="134" stroke="#0B3A8C" strokeWidth="2.5" markerEnd="url(#sa)" />
          <text x="58" y="98" fontSize="11" fontWeight="700" fill="#0B3A8C">luz filtrada</text>
        </motion.g>
        <motion.g {...fade(0.7)}>
          <line x1="364" y1="40" x2="304" y2="92" stroke="#D7261E" strokeWidth="3" markerEnd="url(#sv)" />
          <text x="300" y="30" fontSize="11" fontWeight="700" fill="#D7261E">sol da tarde</text>
        </motion.g>
        <motion.g {...fade(1.2)}>
          <path d="M6,152 H300" stroke="#0B3A8C" strokeWidth="2.5" strokeDasharray="8 6" fill="none" className="fluxo-vento" />
          <text x="170" y="172" fontSize="11" fontWeight="700" fill="#0B3A8C" textAnchor="middle">ventilação cruzada</text>
        </motion.g>
        {([[36, 'Cobogó'], [90, 'Galeria'], [203, 'Apartamento'], [300, 'Brises de']] as [number, string][]).map(([x, t]) => (
          <text key={t} x={x} y="210" fontSize="11.5" fontWeight="700" textAnchor="middle" fill="#111">{t}</text>
        ))}
        <text x="300" y="224" fontSize="11.5" fontWeight="700" textAnchor="middle" fill="#111">madeira</text>
      </svg>
    </figure>
  )
}
