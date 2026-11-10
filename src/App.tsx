import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import ErrorBoundary from './components/ErrorBoundary'

const Mapa = lazy(() => import('./pages/Mapa'))
const LinhaDoTempo = lazy(() => import('./pages/LinhaDoTempo'))
const Capitulo = lazy(() => import('./pages/Capitulo'))
const Tese = lazy(() => import('./pages/Tese'))
const Referencias = lazy(() => import('./pages/Referencias'))
const NotFound = lazy(() => import('./pages/NotFound'))

export default function App() {
  return (
    <ErrorBoundary>
    <Suspense fallback={<div className="min-h-screen" role="status" aria-label="Carregando" />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/mapa" element={<Mapa />} />
          <Route path="/linha-do-tempo" element={<LinhaDoTempo />} />
          <Route path="/capitulo/:slug" element={<Capitulo />} />
          <Route path="/tese" element={<Tese />} />
          <Route path="/referencias" element={<Referencias />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
    </ErrorBoundary>
  )
}
