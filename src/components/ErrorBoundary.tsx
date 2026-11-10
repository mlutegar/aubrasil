import { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props { children: ReactNode }
interface State { erro: Error | null }

/** Captura erros de renderização/commit para nunca deixar a página em branco. */
export default class ErrorBoundary extends Component<Props, State> {
  state: State = { erro: null }

  static getDerivedStateFromError(erro: Error): State { return { erro } }

  componentDidCatch(erro: Error, info: ErrorInfo) { console.error('ErrorBoundary:', erro, info.componentStack) }

  render() {
    if (!this.state.erro) return this.props.children
    return (
      <div role="alert" className="px-4 py-16 text-center">
        <h1 className="font-titulo text-3xl font-black leading-tight">Algo deu errado nesta página</h1>
        <p className="mt-3 text-sm text-cinza">Tente voltar para a página inicial.</p>
        {/* <a> de propósito: recarrega o app e limpa qualquer estado quebrado */}
        <a href="/" className="mt-6 inline-flex h-12 items-center justify-center rounded-full bg-marinho px-6 font-titulo text-base font-extrabold text-white">
          Voltar para a Home
        </a>
      </div>
    )
  }
}
