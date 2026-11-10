export type Credito = string
export interface Imagem { foto: string; credito: Credito }

export const ficha = {
  nome: 'Conjunto Residencial Prefeito Mendes de Moraes (Pedregulho)',
  local: 'Encosta oeste do Morro do Pedregulho, São Cristóvão, Zona Norte do Rio de Janeiro',
  projeto: '1946 a 1948. Obras a partir de 1948. Primeira etapa inaugurada em 1950.',
  arquiteto: 'Affonso Eduardo Reidy (1909-1964)',
  orgao: 'Departamento de Habitação Popular (DHP) da Prefeitura do Distrito Federal, dirigido a partir de 1948 por Carmen Portinho (1903-2001)',
  paisagismo: 'Roberto Burle Marx. Painéis: Cândido Portinari e Anísio Medeiros',
  previsao: '522 unidades, para funcionários municipais de baixos salários, aluguel descontado em folha',
  terreno: '52.142 m², desnível de cerca de 50 m entre dois platôs',
  blocoA: 'Curvo, 272 apartamentos, 7 pavimentos, acesso por 2 passarelas no 3º pavimento (pavimento livre com creche, administração e comércio); galerias com cobogó no 4º e 6º pavimentos dão acesso aos duplex',
  blocosB: 'Menores, apartamentos duplex',
  blocoC: 'Nunca construído',
  funcaoOriginal: 'Habitação social com equipamentos coletivos (escola, ginásio, piscina, posto de saúde, lavanderia, mercado, creche)',
  funcaoAtual: 'Blocos residenciais seguem como moradia (prédios do Governo do Estado, terreno da União); maior parte dos equipamentos mudou de uso, foi separada ou abandonada',
}

export type TipoEdificio = 'residencial' | 'coletivo'
export type StatusEdificio = 'mantem' | 'mudou' | 'ruina'

export interface Edificio extends Imagem {
  id: string; nome: string; tipo: TipoEdificio
  original: string; transformacao: string; hoje: string
  status: StatusEdificio; descricao: string
  /** Opcional. Se vazio, a sheet mostra "Bloco residencial" / "Equipamento coletivo". */
  subtitulo?: string
  /** Opcionais: foto própria de cada aba da sheet. Se ausente, usa `foto`/`credito`. */
  fotoOriginal?: Imagem
  fotoTransformacao?: Imagem
  fotoHoje?: Imagem
}

/** `texto`: cor de texto sobre `cor` (todas passam AA 4.5:1: branco/marinho 9.9, branco/vermelho 5.0, tinta/cinza 6.1). */
export const statusInfo: Record<StatusEdificio, { rotulo: string; cor: string; texto: string }> = {
  mantem: { rotulo: 'Uso mantido', cor: '#0B3A8C', texto: '#FFFFFF' },
  mudou: { rotulo: 'Mudou de uso', cor: '#8C8C8C', texto: '#111111' },
  ruina: { rotulo: 'Em ruína', cor: '#D7261E', texto: '#FFFFFF' },
}

const P = '[DESCRIÇÃO DO GRUPO] Texto provisório de 2 a 3 frases sobre este edifício.'
const C = '[CRÉDITO]'
export const edificios: Edificio[] = [
  { id: 'bloco-a', nome: 'Bloco A', tipo: 'residencial', original: 'Moradia', transformacao: 'Degradação após 1964', hoje: 'Restaurado 2010-2015', status: 'mantem', descricao: P, foto: 'img/bloco-a.svg', credito: C },
  { id: 'blocos-b', nome: 'Blocos B1 e B2', tipo: 'residencial', original: 'Moradia duplex', transformacao: 'Cercados', hoje: 'Moradia', status: 'mantem', descricao: P, foto: 'img/blocos-b.svg', credito: C },
  { id: 'escola', nome: 'Escola e ginásio (com piscina)', tipo: 'coletivo', original: 'Uso do conjunto', transformacao: 'Gestão municipal', hoje: 'Isolados por cercas', status: 'mudou', descricao: P, foto: 'img/escola.svg', credito: C },
  { id: 'posto', nome: 'Posto de saúde', tipo: 'coletivo', original: 'Atendimento local', transformacao: 'Vira hospital em 1953', hoje: 'Fechado em 1999, em ruína', status: 'ruina', descricao: P, foto: 'img/posto.svg', credito: C },
  { id: 'lavanderia', nome: 'Lavanderia', tipo: 'coletivo', original: 'Lavanderia coletiva', transformacao: 'Funciona até meados dos anos 1970', hoje: 'Depósito da Fundação Leão XIII', status: 'mudou', descricao: P, foto: 'img/lavanderia.svg', credito: C },
  { id: 'mercado', nome: 'Mercado', tipo: 'coletivo', original: 'Mercado', transformacao: 'Comércio até 1980', hoje: 'Garagem da Fundação Leão XIII', status: 'mudou', descricao: P, foto: 'img/mercado.svg', credito: C },
  { id: 'jardins', nome: 'Jardins', tipo: 'coletivo', original: 'Áreas livres', transformacao: 'Descaracterizados', hoje: 'Ocupados por clube e estacionamentos', status: 'mudou', descricao: P, foto: 'img/jardins.svg', credito: C },
]

export type TipoEvento = 'construcao' | 'ruptura'
export interface Evento extends Imagem {
  ano: number; tipo: TipoEvento; titulo: string; resumo: string; texto: string
}

export const linhaDoTempo: Evento[] = [
  { ano: 1946, tipo: 'construcao', titulo: 'Criação do DHP', resumo: 'Reidy elabora o primeiro projeto', texto: 'A Prefeitura do Distrito Federal cria o Departamento de Habitação Popular. Sob Carmen Portinho, a partir de 1948, o DHP passa a tratar a moradia como serviço público ligado a saúde, educação e assistência social.', foto: 'img/tl-1946.svg', credito: C },
  { ano: 1950, tipo: 'construcao', titulo: 'Primeira etapa inaugurada', resumo: 'Blocos B1 e B2, escola, posto e piscina', texto: 'Inauguram-se os blocos B1 e B2, a escola, o posto de saúde, a lavanderia e a piscina. O Bloco A seguiria em obras durante toda a década.', foto: 'img/tl-1950.svg', credito: C },
  { ano: 1960, tipo: 'ruptura', titulo: 'Capital vai para Brasília', resumo: 'Prioridade passa à reurbanização de favelas', texto: 'Com a transferência da capital, o Rio deixa de ser Distrito Federal e a política habitacional muda de foco. O Bloco A só é ocupado no início dos anos 1960.', foto: 'img/tl-1960.svg', credito: C },
  { ano: 1962, tipo: 'ruptura', titulo: 'Extinção do DHP', resumo: 'Blocos à COHAB, serviços à Fundação Leão XIII', texto: 'O DHP é extinto. Moradia e equipamentos passam a órgãos diferentes e o conjunto perde a gestão única que o sustentava.', foto: 'img/tl-1962.svg', credito: C },
  { ano: 1964, tipo: 'ruptura', titulo: 'Golpe militar', resumo: 'Investimentos interrompidos', texto: 'Os investimentos em habitação de interesse social são descontinuados. Sem manutenção, o conjunto entra em degradação.', foto: 'img/tl-1964.svg', credito: C },
  { ano: 2015, tipo: 'construcao', titulo: 'Restauro do Bloco A concluído', resumo: 'Obras iniciadas em dezembro de 2010', texto: 'O restauro, planejado em 2004 pelo escritório de Alfredo Britto, é executado sem remover os cerca de dois mil moradores. Pioneiro para a habitação popular, provoca forte valorização.', foto: 'img/tl-2015.svg', credito: C },
]

export const tempoTextos = {
  titulo: 'Conjunto Pedregulho',
  subtitulo: 'Linha do tempo interativa · 1946 a 2015',
  frase: 'A história do conjunto em diálogo com as transformações políticas e urbanas do Brasil.',
  botao: 'Explorar linha do tempo →',
  imagem: 'img/timeline-capa.jpg',
  imagemFallback: 'img/bloco-a.svg',
  imagemAlt: 'Vista aérea do conjunto, c. anos 1960',
  imagemLegenda: 'Vista aérea do conjunto, c. anos 1960',
  imagemCredito: '[CONFIRMAR CRÉDITO]',
  listaLabel: 'Marcos da linha do tempo',
  abrir: 'Abrir',
  legenda: { construcao: 'Marco de construção', ruptura: 'Ruptura institucional' },
  tipoRotulo: { construcao: 'construção', ruptura: 'ruptura institucional' },
  fechar: 'Fechar',
  anterior: '‹ anterior',
  proximo: 'próximo ›',
  navLabel: 'Navegar entre marcos',
  fechamento: 'Sem um Estado presente, a comunidade virou isolamento',
  botaoTese: 'Ver a tese →',
  tesePara: '/tese',
}

export type Midia =
  | { tipo: 'imagem'; foto: string; credito: Credito; legenda: string; alt: string }
  | { tipo: 'citacao'; texto: string; autor?: string }
  | { tipo: 'antesHoje' }
  | { tipo: 'diagrama'; id: 'fluxos' | 'corte' | 'transformacoes'; legenda: string }
/** `depois`: índice do parágrafo após o qual o bloco aparece (0 = depois do 1º). */
export interface BlocoMidia { depois: number; bloco: Midia }

export interface Capitulo extends Imagem {
  slug: string; numero: number; titulo: string; subtitulo: string; paragrafos: string[]; midia: BlocoMidia[]
}
const T = '[TEXTO DO GRUPO]'
const cap = (slug: string, numero: number, titulo: string, subtitulo: string): Capitulo => ({
  slug, numero, titulo, subtitulo, paragrafos: [T, T, T], foto: `img/cap-${slug}.svg`, credito: C,
  midia: [{ depois: 0, bloco: { tipo: 'imagem', foto: `img/cap-${slug}.svg`, credito: C, legenda: titulo, alt: `Imagem do capítulo ${subtitulo}` } }],
})
const extras: Record<string, BlocoMidia[]> = {
  identificacao: [{ depois: 1, bloco: { tipo: 'citacao', texto: '522 unidades para funcionários municipais de baixos salários, com aluguel descontado em folha.' } }],
  projeto: [{ depois: 1, bloco: { tipo: 'diagrama', id: 'fluxos', legenda: 'Fluxos de circulação e graus de publicidade do conjunto. Esquema sem escala.' } }],
  materiais: [{ depois: 1, bloco: { tipo: 'diagrama', id: 'corte', legenda: 'Corte esquemático do Bloco A, sem escala.' } }],
  transformacoes: [
    { depois: 1, bloco: { tipo: 'diagrama', id: 'transformacoes', legenda: 'O que aconteceu com cada edifício.' } },
    { depois: 1, bloco: { tipo: 'antesHoje' } },
  ],
}
const base: Capitulo[] = [
  cap('identificacao', 1, 'Um conjunto, não um edifício', 'Identificação'),
  cap('contexto', 2, 'Do ministério à moradia operária', 'Contexto'),
  cap('territorio', 3, 'A curva que segue o morro', 'Território'),
  cap('projeto', 4, 'Coletivo por projeto', 'Projeto'),
  cap('materiais', 5, 'Concreto, cobogó e madeira', 'Materiais'),
  cap('economia', 6, 'Morar como serviço público', 'Economia'),
  cap('sociedade', 7, 'Dignidade e tutela', 'Sociedade'),
  cap('transformacoes', 8, 'A arquitetura fica, o coletivo se desfaz', 'Transformações'),
]
export const capitulos: Capitulo[] = base.map(c => ({ ...c, midia: [...c.midia, ...(extras[c.slug] ?? [])] }))

export const tese = {
  titulo: 'Comunidade ou isolamento?',
  texto: T,
  argumentos: [
    { numero: '01', titulo: 'Programa', texto: T, evidencias: [ficha.previsao, ficha.funcaoOriginal] },
    { numero: '02', titulo: 'Produção', texto: T, evidencias: [ficha.orgao, ficha.paisagismo] },
    { numero: '03', titulo: 'Sociedade', texto: T, evidencias: [ficha.previsao, 'Moradia e equipamentos passam a órgãos diferentes em 1962 (DHP extinto).'] },
    { numero: '04', titulo: 'Transformação', texto: T, evidencias: edificios.filter(e => e.tipo === 'coletivo').map(e => `${e.nome}: ${e.hoje}.`) },
  ] as { numero: string; titulo: string; texto: string; evidencias: string[] }[],
  sintese: [
    { rotulo: 'Contexto 1946', detalhe: 'Criação do DHP', cor: 'papel' },
    { rotulo: 'Ideário', detalhe: 'Moradia como serviço público', cor: 'papel' },
    { rotulo: 'Projeto', detalhe: 'Reidy, 1946–1950', cor: 'papel' },
    { rotulo: 'Condição: um Estado presente', detalhe: 'Gestão única de moradia e serviços', cor: 'marinho', grande: true },
    { rotulo: 'Ruptura 1953-64', detalhe: 'Posto vira hospital, DHP extinto, golpe militar', cor: 'vermelho' },
    { rotulo: 'Isolamento', detalhe: 'Equipamentos separados, cercados ou abandonados', cor: 'concreto' },
    { rotulo: 'Hoje 2015', detalhe: 'comunidade para quem?', cor: 'celeste' },
  ] as { rotulo: string; detalhe: string; cor: 'papel' | 'marinho' | 'vermelho' | 'concreto' | 'celeste'; grande?: boolean }[],
  conclusao: T,
}

export const referenciasTextos = { titulo: 'Referências e créditos', bibliografia: 'Bibliografia', imagens: 'Créditos das imagens', ia: 'Uso de inteligência artificial' }
export const capituloTextos = { anterior: '‹ capítulo anterior', proximo: 'próximo capítulo ›', verNoMapa: 'Ver no mapa', progresso: 'Progresso de leitura', diagramaTabela: ['Edifício', 'Original', 'Transformação', 'Situação'] }
export const teseTextos = { conclusao: 'Conclusão', evidencias: 'Evidências', diagrama: 'Da condição ao isolamento' }

export const referencias = {
  bibliografia: ['[REFERÊNCIA DO GRUPO]'],
  creditos: ['[CRÉDITO DO GRUPO]', 'Imagem de compartilhamento (Open Graph): ilustração gerada com IA (ChatGPT), sob direção do grupo.'],
}

export interface Secao { rotulo: string; to: string; subtitulo: string }
export const secoes: Secao[] = [
  { rotulo: 'Início', to: '/', subtitulo: 'Abertura' },
  { rotulo: 'Mapa de implantação', to: '/mapa', subtitulo: 'Mapa' },
  { rotulo: 'Linha do tempo', to: '/linha-do-tempo', subtitulo: 'Linha do tempo' },
  ...capitulos.map(c => ({ rotulo: `${c.numero}. ${c.subtitulo}`, to: `/capitulo/${c.slug}`, subtitulo: `Capítulo ${c.numero}` })),
  { rotulo: 'Tese', to: '/tese', subtitulo: 'Tese' },
  { rotulo: 'Referências', to: '/referencias', subtitulo: 'Referências e créditos' },
]

export const textos = {
  siteTitulo: 'Conjunto Pedregulho',
  homeChamada: 'Pedregulho',
  homeLema: 'Reidy, 1946–1950. Uma cidade pequena para morar em comunidade.',
  homeEntrar: 'Explorar',
  menuAbrir: 'Abrir menu',
  menuFechar: 'Fechar menu',
  naoEncontrado: 'Página não encontrada',
  naoEncontradoTexto: 'O endereço que você abriu não existe ou foi movido. Volte ao início para continuar a leitura.',
  voltarHome: 'Voltar para a Home',
  emBreve: 'Em construção',
  credito: 'Crédito',
}

/** Slider Antes x Hoje (P06). */
export interface Marcacao {
  /** Centro do círculo, em % da largura/altura do container. */
  x: number; y: number
  /** Raio do círculo, em % da largura do container. */
  raio: number
  rotulo: string
  /** Ajuste fino do rótulo: deslocamento vertical em px (padrão 14) e horizontal em % do próprio rótulo (padrão -50 = centralizado). */
  rotuloDy?: number; rotuloDx?: number
}
export const antesHoje = {
  titulo: 'Antes x Hoje',
  instrucao: 'Arraste a alça para comparar',
  alcaLabel: 'Comparar antes e hoje',
  rotuloAntes: 'Antes', rotuloHoje: 'Hoje',
  /** Proporção do container. As duas fotos usam object-fit: cover nele. */
  proporcao: '16 / 9',
  // objectPosition: ajuste de enquadramento de cada foto (sintaxe CSS, ex.: '50% 40%') para alinhar o conjunto nas duas.
  antes: { foto: 'img/aerea-antes.jpg', alt: 'Vista aérea do conjunto nos anos 1960', objectPosition: '50% 50%', legenda: 'Vista aérea do conjunto, c. anos 1960', credito: '[CONFIRMAR CRÉDITO]' },
  hoje: { foto: 'img/aerea-hoje.jpg', alt: 'Vista aérea atual do conjunto, com cercas, clube e posto em ruína', objectPosition: '50% 50%', legenda: 'Vista aérea atual', credito: 'Arte fora do Museu' },
  // Marcações vermelhas sobre a foto de hoje. Lista vazia = sem marcações. Posições provisórias: ajustar olhando a foto.
  marcacoes: [
    { x: 30, y: 62, raio: 7, rotulo: 'cercas' },
    { x: 68, y: 70, raio: 8, rotulo: 'clube e estacionamento' },
    { x: 84, y: 30, raio: 6, rotulo: 'posto em ruína', rotuloDx: -85 },
  ] as Marcacao[],
}

export const home = {
  linha1: 'Conjunto',
  linha2: 'Pedregulho',
  subtitulo: 'Comunidade ou isolamento?',
  periodo: 'Rio de Janeiro, 1946 a hoje',
  // Resumo da tese (2 linhas). Substituir pelo texto final do grupo.
  resumo: 'Projetado como cidade pequena para morar em comunidade, o Pedregulho manteve a arquitetura, mas perdeu a gestão única que unia moradia e serviços.',
  imagem: 'img/home-bloco-a.jpg',
  imagemFallback: 'img/bloco-a.svg',
  imagemAlt: 'Bloco A após o restauro',
  imagemLegenda: 'Bloco A após o restauro',
  imagemCredito: '[CONFIRMAR CRÉDITO]',
  botaoMapa: 'Explorar o mapa →',
  botaoTempo: 'Linha do tempo',
  capitulosTitulo: 'Capítulos',
  antesHojeTitulo: 'Antes x Hoje',
  cardTese: { rotulo: 'A tese', titulo: 'Comunidade ou isolamento?', to: '/tese' },
  cardRef: { rotulo: 'Referências', to: '/referencias' },
}

export const rodape = {
  disciplina: '[NOME DA DISCIPLINA]',
  integrantes: ['[INTEGRANTE 1]', '[INTEGRANTE 2]', '[INTEGRANTE 3]', '[INTEGRANTE 4]'],
  notaIA: 'Ferramenta de IA utilizada: Claude, no apoio à organização e revisão dos textos, à pesquisa de fontes e à produção de diagramas. Conteúdo verificado pelo grupo.',
}

// ---- Mapa de implantação (/mapa): rótulos de interface e vínculos com capítulos ----
export const mapaTextos = {
  titulo: 'Mapa de implantação',
  kicker: 'Mapa',
  mapaLabel: 'Implantação esquemática do conjunto, vista de cima, com o norte para cima',
  zoomMais: 'Aproximar',
  zoomMenos: 'Afastar',
  recentralizar: 'Recentralizar o mapa',
  hotspotAria: (nome: string) => `Abrir detalhes: ${nome}`,
  legendaTitulo: 'Legenda',
  legendaResidencial: 'Blocos residenciais',
  legendaColetivo: 'Equipamentos coletivos',
  legendaHotspot: 'Hotspot interativo',
  statusTitulo: 'Status dos edifícios',
  statusLegenda: { mantem: 'Mantém uso original', mudou: 'Mudou de uso', ruina: 'Em ruína' } as Record<StatusEdificio, string>,
  statusPill: { mantem: 'Mantém uso', mudou: 'Mudou de uso', ruina: 'Em ruína' } as Record<StatusEdificio, string>,
  subtitulo: { residencial: 'Bloco residencial', coletivo: 'Equipamento coletivo' } as Record<TipoEdificio, string>,
  fechar: 'Fechar',
  alca: 'Arraste para baixo para fechar',
  abas: ['Original', 'Transformação', 'Hoje'] as const,
  abasLabel: 'Fases do edifício',
  verMais: 'Ver mais informações ›',
  escala: '0 25 50 100 m',
}

export const capituloDoEdificio: Record<string, string> = {
  'bloco-a': 'projeto',
  'blocos-b': 'projeto',
  lavanderia: 'sociedade',
  posto: 'transformacoes',
  mercado: 'transformacoes',
  jardins: 'transformacoes',
  escola: 'territorio',
}

/** Primeiro edifício ligado ao capítulo (ordem de `capituloDoEdificio`), para o link /mapa?edificio=id. */
export const primeiroEdificioDoCapitulo = (slug: string): string | undefined =>
  Object.entries(capituloDoEdificio).find(([, c]) => c === slug)?.[0]
