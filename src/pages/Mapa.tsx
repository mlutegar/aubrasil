import { useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { TransformComponent, TransformWrapper, useControls } from 'react-zoom-pan-pinch'
import Titulo from '../components/Titulo'
import BottomSheet from '../components/mapa/BottomSheet'
import { BaseMapa, CORES, VB, formas } from '../components/mapa/formas'
import { edificios, mapaTextos as T, statusInfo, type StatusEdificio } from '../data/content'

function Controles() {
  const { zoomIn, zoomOut, resetTransform } = useControls()
  const cls = 'flex h-11 w-11 items-center justify-center border border-tinta bg-white font-titulo text-xl font-black leading-none shadow-sm'
  return (
    <div className="absolute right-2 top-2 z-10 flex flex-col gap-1.5">
      <button type="button" className={cls} aria-label={T.zoomMais} onClick={() => zoomIn()}>+</button>
      <button type="button" className={cls} aria-label={T.zoomMenos} onClick={() => zoomOut()}>−</button>
      <button type="button" className={cls} aria-label={T.recentralizar} title={T.recentralizar} onClick={() => resetTransform()}>
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
          <circle cx="12" cy="12" r="4" /><path d="M12 2v5M12 17v5M2 12h5M17 12h5" />
        </svg>
      </button>
    </div>
  )
}

function Legenda() {
  const amostra = (t: 'residencial' | 'coletivo') => (
    <span className="h-3.5 w-5 shrink-0 border" style={{ background: CORES[t].fill, borderColor: CORES[t].line }} />
  )
  return (
    <div className="mt-4 grid grid-cols-2 gap-4 border border-linha bg-white p-3 text-xs">
      <div>
        <h2 className="mb-2 font-titulo text-sm font-black">{T.legendaTitulo}</h2>
        <ul className="space-y-2">
          <li className="flex items-center gap-2">{amostra('residencial')}{T.legendaResidencial}</li>
          <li className="flex items-center gap-2">{amostra('coletivo')}{T.legendaColetivo}</li>
          <li className="flex items-center gap-2">
            <span className="relative flex h-5 w-5 shrink-0 items-center justify-center">
              <span className="h-3 w-3 rounded-full border-2 border-white bg-vermelho ring-1 ring-tinta" />
            </span>
            {T.legendaHotspot}
          </li>
        </ul>
      </div>
      <div>
        <h2 className="mb-2 font-titulo text-sm font-black">{T.statusTitulo}</h2>
        <ul className="space-y-2">
          {(Object.keys(T.statusLegenda) as StatusEdificio[]).map(s => (
            <li key={s} className="flex items-center gap-2">
              <span className="h-3 w-3 shrink-0 rounded-full" style={{ background: statusInfo[s].cor }} />{T.statusLegenda[s]}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default function Mapa() {
  // Edifício selecionado vive na URL: /mapa?edificio=bloco-a abre a sheet direto (id inválido = mapa sem seleção)
  const [params, setParams] = useSearchParams()
  const sel = edificios.find(e => e.id === params.get('edificio')) ?? null
  const selId = sel?.id ?? null
  const setSelId = useCallback((id: string) => setParams({ edificio: id }, { replace: true }), [setParams])
  const fechar = useCallback(() => setParams({}, { replace: true }), [setParams])
  const op = (id: string) => (selId && selId !== id ? 0.4 : 1)

  return (
    <>
      <Titulo kicker={T.kicker}>{T.titulo}</Titulo>

      <div className="relative overflow-hidden border border-linha bg-[#F2F2F0]" style={{ aspectRatio: `${VB.w} / ${VB.h}` }}>
        <TransformWrapper minScale={1} maxScale={5} centerOnInit doubleClick={{ mode: 'zoomIn' }} wheel={{ step: 0.15 }}>
          <Controles />
          <TransformComponent wrapperStyle={{ width: '100%', height: '100%' }} contentStyle={{ width: '100%', height: '100%' }}>
            <div className="relative h-full w-full" style={{ touchAction: 'none' }}>
              <svg viewBox={`0 0 ${VB.w} ${VB.h}`} className="h-full w-full" role="img" aria-label={T.mapaLabel}>
                <BaseMapa escala={T.escala} />
                {edificios.map(e => (
                  <g key={e.id} style={{ opacity: op(e.id), transition: 'opacity .2s' }}>{formas[e.id].desenho(CORES[e.tipo])}</g>
                ))}
              </svg>
              {edificios.map(e => {
                const [x, y] = formas[e.id].hotspot
                return (
                  <button
                    key={e.id} type="button" aria-label={T.hotspotAria(e.nome)} aria-haspopup="dialog"
                    onClick={() => setSelId(e.id)}
                    className="group absolute flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tinta"
                    style={{ left: `${(x / VB.w) * 100}%`, top: `${(y / VB.h) * 100}%` }}
                  >
                    <span className="hotspot-anel absolute h-5 w-5 rounded-full border-2 border-vermelho" style={{ opacity: op(e.id) }} aria-hidden="true" />
                    <span className="relative h-3.5 w-3.5 rounded-full border-2 border-white bg-vermelho ring-1 ring-tinta" style={{ opacity: op(e.id), transition: 'opacity .2s' }} aria-hidden="true" />
                    <span className="pointer-events-none absolute top-full mt-0.5 w-max max-w-[110px] border border-tinta bg-white px-1.5 py-0.5 text-center font-texto text-[9px] font-semibold leading-tight text-tinta" aria-hidden="true">
                      {e.nome}
                    </span>
                  </button>
                )
              })}
            </div>
          </TransformComponent>
        </TransformWrapper>
      </div>

      <Legenda />

      <AnimatePresence>{sel && <BottomSheet key={sel.id} edificio={sel} onClose={fechar} />}</AnimatePresence>
    </>
  )
}
