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

const HOME_CREDITO = '[CONFIRMAR CRÉDITO]'
export const edificios: Edificio[] = [
  { id: 'bloco-a', nome: 'Bloco A', tipo: 'residencial', original: 'Moradia', transformacao: 'Degradação após 1964', hoje: 'Restaurado 2010-2015', status: 'mantem', descricao: "Edifício curvo de 272 apartamentos em sete pavimentos, que acompanha a curva de nível do morro. A entrada é pelo 3º pavimento, por duas passarelas, onde ficavam a creche, a administração e pequenos comércios. Só foi ocupado no início dos anos 1960 e foi restaurado entre 2010 e 2015.", foto: 'img/home-bloco-a.jpg', credito: HOME_CREDITO },
  { id: 'blocos-b', nome: 'Blocos B1 e B2', tipo: 'residencial', original: 'Moradia duplex', transformacao: 'Cercados', hoje: 'Moradia', status: 'mantem', descricao: "Dois blocos menores de apartamentos duplex, inaugurados em 1950 na primeira etapa do conjunto. Junto com a escola e o posto de saúde, conformam a praça central. Seguem como moradia, mas hoje estão cercados.", foto: 'img/home-bloco-a.jpg', credito: HOME_CREDITO },
  { id: 'escola', nome: 'Escola e ginásio (com piscina)', tipo: 'coletivo', original: 'Uso do conjunto', transformacao: 'Gestão municipal', hoje: 'Isolados por cercas', status: 'mudou', descricao: "Escola, ginásio e piscina ficam na parte baixa do terreno, junto à praça central. Sob gestão municipal, mantiveram o uso original e estão em melhor estado, mas foram separados do conjunto por cercas.", foto: 'img/escola.svg', credito: '' },
  { id: 'posto', nome: 'Posto de saúde', tipo: 'coletivo', original: 'Atendimento local', transformacao: 'Vira hospital em 1953', hoje: 'Fechado em 1999, em ruína', status: 'ruina', descricao: "O posto de saúde atendia os moradores como extensão da habitação. Virou hospital em 1953, foi fechado em 1999 e hoje está em ruína.", foto: 'img/posto.svg', credito: '' },
  { id: 'lavanderia', nome: 'Lavanderia', tipo: 'coletivo', original: 'Lavanderia coletiva', transformacao: 'Funciona até meados dos anos 1970', hoje: 'Depósito da Fundação Leão XIII', status: 'mudou', descricao: "Concentrava a lavagem de roupa, retirada dos apartamentos para aliviar o trabalho das moradoras. Ficava longe do Bloco A, enfrentou resistência e funcionou só até meados dos anos 1970. Hoje é depósito da Fundação Leão XIII.", foto: 'img/lavanderia.svg', credito: '' },
  { id: 'mercado', nome: 'Mercado', tipo: 'coletivo', original: 'Mercado', transformacao: 'Comércio até 1980', hoje: 'Garagem da Fundação Leão XIII', status: 'mudou', descricao: "Fazia parte da ideia de um conjunto autossuficiente, com os serviços ao alcance dos moradores. Funcionou como comércio até 1980 e hoje é garagem da Fundação Leão XIII.", foto: 'img/mercado.svg', credito: '' },
  { id: 'jardins', nome: 'Jardins', tipo: 'coletivo', original: 'Áreas livres', transformacao: 'Descaracterizados', hoje: 'Ocupados por clube e estacionamentos', status: 'mudou', descricao: "Áreas livres com paisagismo de Roberto Burle Marx, pensadas para o convívio entre os blocos e os equipamentos. Foram descaracterizadas e hoje estão ocupadas por um clube e por estacionamentos.", foto: 'img/jardins.svg', credito: '' },
]

export type TipoEvento = 'construcao' | 'ruptura'
export interface Evento extends Imagem {
  ano: number; tipo: TipoEvento; titulo: string; resumo: string; texto: string
}

export const linhaDoTempo: Evento[] = [
  { ano: 1946, tipo: 'construcao', titulo: 'Criação do DHP', resumo: 'Reidy elabora o primeiro projeto', texto: 'A Prefeitura do Distrito Federal cria o Departamento de Habitação Popular. Sob Carmen Portinho, a partir de 1948, o DHP passa a tratar a moradia como serviço público ligado a saúde, educação e assistência social.', foto: 'img/tl-1946.svg', credito: '' },
  { ano: 1950, tipo: 'construcao', titulo: 'Primeira etapa inaugurada', resumo: 'Blocos B1 e B2, escola, posto e piscina', texto: 'Inauguram-se os blocos B1 e B2, a escola, o posto de saúde, a lavanderia e a piscina. O Bloco A seguiria em obras durante toda a década.', foto: 'img/tl-1950.svg', credito: '' },
  { ano: 1960, tipo: 'ruptura', titulo: 'Capital vai para Brasília', resumo: 'Prioridade passa à reurbanização de favelas', texto: 'Com a transferência da capital, o Rio deixa de ser Distrito Federal e a política habitacional muda de foco. O Bloco A só é ocupado no início dos anos 1960.', foto: 'img/tl-1960.svg', credito: '' },
  { ano: 1962, tipo: 'ruptura', titulo: 'Extinção do DHP', resumo: 'Blocos à COHAB, serviços à Fundação Leão XIII', texto: 'O DHP é extinto. Moradia e equipamentos passam a órgãos diferentes e o conjunto perde a gestão única que o sustentava.', foto: 'img/tl-1962.svg', credito: '' },
  { ano: 1964, tipo: 'ruptura', titulo: 'Golpe militar', resumo: 'Investimentos interrompidos', texto: 'Os investimentos em habitação de interesse social são descontinuados. Sem manutenção, o conjunto entra em degradação.', foto: 'img/tl-1964.svg', credito: '' },
  { ano: 2015, tipo: 'construcao', titulo: 'Restauro do Bloco A concluído', resumo: 'Obras iniciadas em dezembro de 2010', texto: 'O restauro, planejado em 2004 pelo escritório de Alfredo Britto, é executado sem remover os cerca de dois mil moradores. Pioneiro para a habitação popular, provoca forte valorização.', foto: 'img/home-bloco-a.jpg', credito: HOME_CREDITO },
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
const paragrafos: Record<string, string[]> = {
  identificacao: [
    "O Conjunto Residencial Prefeito Mendes de Moraes, conhecido como Pedregulho, foi projetado entre 1946 e 1948 pelo arquiteto Affonso Eduardo Reidy (1909-1964), com a equipe do Departamento de Habitação Popular (DHP) da Prefeitura do então Distrito Federal, dirigido a partir de 1948 pela urbanista e engenheira Carmen Portinho (1903-2001). Implantado na encosta do morro do Pedregulho, na Zona Norte do Rio de Janeiro, o conjunto contou com a colaboração de Roberto Burle Marx (1909-1994) no paisagismo e de artistas como Cândido Portinari (1903-1962) e Anísio Medeiros (1922-2003), autores de painéis nos equipamentos coletivos. Destinado a funcionários de baixos salários da prefeitura, que pagariam aluguel descontado em folha, o projeto previa 522 unidades e um programa completo de unidade de vizinhança: blocos residenciais, escola, ginásio, piscina, posto de saúde, lavanderia, mercado e creche.",
    "As obras começaram em 1948. A primeira etapa (blocos B1 e B2, escola, posto de saúde, lavanderia e piscina) foi inaugurada em 1950, enquanto o Bloco A, edifício curvo de 272 apartamentos que se tornaria a imagem do conjunto, permaneceu em obras durante toda a década e só foi ocupado no início dos anos 1960. Parte do programa, como o Bloco C, nunca foi construída. Hoje os blocos residenciais seguem como moradia, sob propriedade do Governo do Estado, e o Bloco A foi restaurado entre 2010 e 2015; já a maior parte dos equipamentos coletivos mudou de uso, foi separada do conjunto ou abandonada.",
    "Mais do que um edifício de moradia, o Pedregulho expressa uma ideia de coletividade, articulando espaços privados e comunitários. Sua forma curva, que acompanha a topografia, revela uma arquitetura que busca integrar técnica e sensibilidade plástica, enquanto os espaços coletivos traduzem o suposto desejo de promover uma vida urbana mais democrática. Ao mesmo tempo, a obra expõe as contradições entre a utopia modernista e os desafios do cotidiano, tornando-se um exemplo potente para refletir sobre a relação entre habitação social, cidade e tempo.",
  ],
  contexto: [
    "Nos anos 1940, o Rio de Janeiro era a capital federal e crescia em ritmo acelerado com a chegada de migrantes. Sem oferta de moradia acessível, boa parte dessa população se instalou em cortiços e, cada vez mais, em favelas. As décadas de 1940, 50 e 60 foram as de maior proliferação de favelas na cidade, um período de grande crescimento urbano e intensa migração; o Censo de 1948 da Prefeitura mostrou que 52% da população favelada era formada por migrantes. O problema tornou-se tão visível que a Prefeitura chegou a fazer um recenseamento das favelas em 1948. Antes disso, a primeira política voltada às favelas havia sido o programa dos Parques Proletários Provisórios, elaborado pela Prefeitura no início dos anos 1940. Ao mesmo tempo, o fim do Estado Novo, em 1945, e a Constituição de 1946 abriram um período de redemocratização, no qual a habitação popular ganhou espaço na agenda pública.",
    "A atuação estatal na moradia operária, porém, vinha da Era Vargas. Os Institutos de Aposentadoria e Pensões (IAPs), criados a partir de 1933, atendiam categorias profissionais específicas, reconhecidas pelo Ministério do Trabalho, Indústria e Comércio. Os institutos dos industriários, dos comerciários e dos bancários foram responsáveis pelos primeiros grandes blocos de habitação no Brasil e, somados à Fundação da Casa Popular, produziram 142.127 unidades até 1964. Por estar vinculada à previdência de cada categoria, essa produção atendia quem contribuía, e não necessariamente quem mais precisava. O Pedregulho também não foi o primeiro grande conjunto do Rio: o Conjunto Residencial do Realengo, primeira experiência habitacional do IAPI, começou a ser ocupado em 1943. O que o distingue é o ideário do DHP, que previa unidades autônomas de vizinhança próximas aos locais de emprego, moradia ligada diretamente a serviços sociais, médicos e educativos, entendidos como extensão da habitação, e um serviço social voltado à educação para um novo modo de morar. A diferença, portanto, não estava apenas na arquitetura, mas na pretensão de transformar o próprio modo de vida dos moradores.",
    "O Departamento de Habitação Popular (DHP) da Prefeitura do Distrito Federal representa um capítulo fundamental, porém frequentemente negligenciado, da história da habitação social no Rio de Janeiro: a institucionalização do problema da moradia dos trabalhadores e a responsabilização do Estado por ele. Criado em 1946 e dirigido a partir de 1948 por Carmen Portinho, o DHP surge em um momento crucial de transformação urbana e social da cidade, quando a questão habitacional tornava-se cada vez mais urgente. No entanto, ofuscado pela relevância internacional do Pedregulho, o papel do DHP e todo o seu processo histórico de desenvolvimento da questão da moradia e da função social do arquiteto acabam ocupando um segundo plano. Não coincidentemente, o esmaecimento da participação do departamento reflete a complexidade dos recursos, ações e análises necessários a intervenções em conjuntos habitacionais voltados a públicos naturalmente variáveis. O DHP pode ser entendido como um programa ambicioso, que buscava solucionar a questão da moradia por meio de unidades residenciais exemplares, usando a arquitetura como ferramenta de transformação não só do habitar, mas do estilo de vida, e não como um mero órgão construtor de casas. Em essência, o programa pretendia oferecer uma vida melhor aos trabalhadores e, ao mesmo tempo, otimizar as relações sociais, econômicas e de utilização do espaço urbano.",
    "Inspirada em seus estudos da reconstrução urbana na Inglaterra do pós-Segunda Guerra, Carmen Portinho defendia a construção de conjuntos autossuficientes, dotados de serviços adjacentes, em detrimento de casas isoladas, que ela considerava inadequadas para solucionar a questão habitacional. Para Portinho, habitação não se tratava de construir casas, mas de criar ambientes capazes de promover transformação social por meio da educação para a vida coletiva. Já Affonso Eduardo Reidy consolidou-se como figura central do movimento moderno brasileiro não apenas por sua arquitetura, mas pela maneira como entrelaçou habitação social e urbanismo. Engajado com os problemas urbanos do Rio desde os anos 1930, foi Diretor de Urbanismo da Prefeitura. Sua compreensão de que habitação e urbanismo são faces indissociáveis de um mesmo problema, exigindo soluções integradas que considerassem a cidade em sua totalidade, serve como parte da fundamentação do Pedregulho. Reidy via o movimento moderno não como uma linguagem, mas como uma nova visão de mundo capaz de abarcar os problemas da cidade.",
    "Reidy chegava ao Pedregulho como um dos protagonistas dessa arquitetura. Em 1936, o ministro Gustavo Capanema anulou o concurso para a sede do Ministério da Educação e Saúde e encarregou Lucio Costa do projeto. Costa convidou para a equipe Oscar Niemeyer, Carlos Leão, Ernani Vasconcellos, Affonso Reidy, Jorge Machado Moreira e Burle Marx, com Le Corbusier como consultor. Esse projeto é considerado um dos episódios fundadores da chamada Escola Carioca. O Pedregulho retoma elementos daquela experiência, como os pilotis, a proteção solar, os painéis de azulejo de Portinari e os jardins de Burle Marx, mas os leva da sede de um ministério para a habitação popular. Se o MES mostrou que a linguagem moderna podia representar o Estado brasileiro, o Pedregulho testou se ela poderia abrigar o trabalhador, e é nesse deslocamento que se lê o processo de o moderno se tornar brasileiro.",
    "Assim, da convergência dessas duas visões de habitação para além da arquitetura, unindo perspectivas sociais e urbanísticas aos ideais da arquitetura moderna, nasce o Conjunto Residencial Prefeito Mendes de Moraes. A proposta materializava os princípios das unidades de vizinhança, que circulavam internacionalmente desde os anos 1920. Concebido com programa completo, composto de blocos residenciais, escola primária, ginásio de esportes, piscina, centro de saúde, lavanderia, mercado, creche e clube, o conjunto buscava criar um ambiente autossuficiente, onde os funcionários municipais pudessem não apenas morar, mas ter acesso facilitado a serviços essenciais e equipamentos de lazer.",
    "Essa concepção ia muito além da simples provisão de moradia: tratava-se de criar um ambiente educativo, capaz de transformar os hábitos e o padrão cultural dos moradores. A habitação social deveria estimular a vida em sociedade, mesmo que isso significasse abrir mão de parte da individualidade conferida pelas casas isoladas, como as dos modelos de cidade-jardim estudados por Portinho na Inglaterra. O cultivo da comunidade e a inserção dos trabalhadores no espaço urbano e na vida político-social tornam-se prioridade na visão urbanística da dupla. Surge, então, uma proposta que prioriza áreas comunais, serviços compartilhados e localização estratégica, e que se desdobra no conjunto Pedregulho.",
  ],
  territorio: [
    "O conjunto está implantado na encosta oeste do Morro do Pedregulho, no bairro de São Cristóvão, região antiga da Zona Norte, próxima ao centro. A localização seguia um princípio defendido por Carmen Portinho: a moradia deveria ficar perto do trabalho, a no máximo 30 minutos para os funcionários municipais.",
    "O terreno, de 52.142 m², tem configuração irregular e um desnível de cerca de 50 metros entre dois platôs. O projeto responde a esse desafio não por meio de grandes movimentos de terra, mas pela adaptação da própria forma arquitetônica. A curva do Bloco A acompanha a curva de nível na meia encosta, integrando construção e terreno e garantindo vista para a Baía de Guanabara.",
    "A estratégia dos pilotis em diferentes alturas revela-se uma solução técnica e plástica ao mesmo tempo. Eles compensam as variações do relevo e evitam grandes movimentações de terra. Essa lógica explica também a entrada pelo terceiro pavimento, feita por duas passarelas a partir do platô superior, solução que traduz a inteligência do projeto em explorar as especificidades do lugar. Abaixo, a escola, o posto de saúde e o Bloco B conformam a praça central do conjunto.",
    "Hoje, cercas em torno dos blocos B1 e B2 e da escola fragmentam o conjunto, e a área junto ao Bloco A foi ocupada por um clube e por estacionamentos.",
  ],
  projeto: [
    "O partido do Pedregulho distribui o programa em edifícios separados pelo terreno: de um lado, os blocos residenciais; de outro, os equipamentos coletivos, articulados por percursos e pela praça central. O Bloco A, com 272 apartamentos em sete pavimentos, é o elemento dominante, enquanto os blocos B1 e B2, menores, abrigam apartamentos duplex.",
    "Reidy transforma as condições do terreno em argumento projetual, usando a curva não apenas como resposta topográfica, mas como gesto que declara ambição simbólica para a habitação social. A forma contínua e monumental do bloco, ainda que eficiente, aposta em um protagonismo arquitetônico que tensiona a própria ideia de coletividade que pretende representar. Os pilotis e os vazios criados pelo edifício produzem uma espacialidade mais leve, mas também reforçam uma narrativa modernista que supõe controle total sobre o espaço, algo distante da complexidade cotidiana dos moradores. A repetição rigorosa das fachadas unifica o conjunto, porém também homogeneíza seus habitantes, subordinando a diversidade do uso doméstico à coerência formal do projeto. Assim, a arquitetura se torna signo, e a monumentalidade acaba por disputar centralidade com a própria vida que deveria abrigar.",
    "Essa forma organiza também a circulação. O acesso ao Bloco A se dá por duas passarelas que partem do platô superior e chegam ao terceiro pavimento, um pavimento livre destinado à creche, à administração e a pequenos comércios. Dali, escadas levam aos dois andares inferiores, com apartamentos de um só nível, e aos superiores, com duplex acessados por galerias no quarto e no sexto pavimentos. Fechadas por cobogós, essas galerias funcionam como ruas internas, que filtram luz e ventilação e fazem a transição entre o espaço coletivo e o privado. Os equipamentos, por sua vez, ficam na parte baixa do terreno, de modo que ir à escola, à lavanderia ou ao mercado exige descer a encosta.",
    "A organização funcional revela a ambição de transformar a habitação coletiva em um modo de vida compartilhado. A separação rígida entre áreas privadas e serviços coletivos buscava estimular práticas comunitárias, mas acabou evidenciando um descompasso entre intenção e uso real. A retirada das áreas de serviço dos apartamentos expôs a fragilidade da aposta na convivência: a rotina doméstica exigia uma autonomia que os espaços comuns não supriam, e a distância até a lavanderia pesava para os moradores do Bloco A. Sem ela, eles passaram a instalar tanques e máquinas de lavar nos banheiros e a estender varais nas fachadas.",
    "A mesma lógica aparece na escala do apartamento. A intenção era oferecer moradias econômicas e capazes de atender às necessidades básicas da vida familiar. Sala e dormitórios têm dimensões mínimas, organizadas para maximizar a repetição modular, e cozinha e banheiro foram reduzidos ao essencial. Essa compactação, coerente com a habitação popular do período, gerou espaços pouco flexíveis, inadequados sobretudo a famílias maiores. A planta rígida, em que a eficiência construtiva se sobrepôs à diversidade de usos, dificultou que as unidades acompanhassem as transformações familiares ao longo do tempo.",
    "Nas três escalas, a do conjunto, a do bloco e a do apartamento, repete-se a mesma tensão: um projeto que organiza com rigor a vida coletiva, mas deixa pouco espaço para a maneira como os moradores de fato vivem.",
  ],
  materiais: [
    "O Bloco A é estruturado em concreto armado sobre pilotis. As galerias de circulação são fechadas por cobogós, elementos vazados que garantem ventilação e luminosidade. Nas fachadas dos apartamentos, voltadas para a baía, as janelas tinham venezianas de madeira, protegidas por 690 brises, também de madeira. Nos equipamentos coletivos, painéis de azulejo de Portinari, Burle Marx e Anísio Medeiros integram arte e arquitetura.",
    "Os brises controlam a insolação da tarde, e os cobogós e vazios permitem ventilação cruzada e luz natural, numa atenção ao clima ainda incipiente na habitação da época. Os pilotis, em diferentes alturas, acompanham o relevo e permitiram que a forma curva se concretizasse sem grandes movimentações de terra.",
    "A escolha desses materiais se relaciona ao período. Nos anos 1940, o concreto armado já era o material de construção nacional por excelência, apoiado em uma engenharia consolidada no Rio, como mostra o MES, em que Reidy integrou a equipe e Baumgart foi o engenheiro calculista. Carmen Portinho, engenheira formada pela Escola Politécnica do Rio, trazia esse domínio técnico ao DHP. Não encontramos documentação sobre custos ou mão de obra. Levantamos, como hipótese, que materiais de produção local tenham favorecido a construção em larga escala com recursos públicos limitados.",
    "Essas soluções, porém, exigiam uma manutenção que o poder público nem sempre garantiu. Com o tempo, os moradores trocaram as venezianas por esquadrias de alumínio sem critério. Na restauração de 2010 a 2015, as novas esquadrias de alumínio passaram a respeitar a geometria e as cores do projeto original, e os brises de madeira foram recuperados em uma marcenaria montada no próprio canteiro.",
  ],
  economia: [
    "O Pedregulho foi encomendado e financiado pela Prefeitura do então Distrito Federal, por meio do Departamento de Habitação Popular (DHP). Destinava-se a funcionários municipais de baixos salários, que não compravam as unidades: pagavam um aluguel calculado como porcentagem do salário e descontado diretamente em folha. A moradia funcionava, assim, como um serviço público vinculado ao emprego, e não como mercadoria.",
    "A economia de recursos aparece também no projeto. As unidades têm dimensões mínimas e repetição modular. No Bloco A, a entrada pelo pavimento intermediário reduziu a necessidade de elevadores, já que os moradores sobem ou descem poucos andares. Ainda assim, a falta de recursos marcou a obra. Iniciada em 1948, teve a primeira etapa inaugurada em 1950, mas o Bloco A ficou em obras durante toda a década e só foi ocupado no início dos anos 1960, e o Bloco C nunca foi construído. Não encontramos documentação sobre a construtora nem sobre o custo da obra.",
    "As mudanças políticas desmontaram o modelo. Com a transferência da capital para Brasília, em 1960, e a extinção do DHP, em 1962, os edifícios residenciais passaram à COHAB e os serviços à Fundação Leão XIII, separando moradia e equipamentos. Após o golpe de 1964, os investimentos em habitação de interesse social foram descontinuados, e a falta de manutenção levou à degradação do conjunto.",
    "Hoje, os edifícios pertencem ao Governo do Estado e o terreno à União, o que impede a venda regular das unidades e a formação de condomínio. Na prática, os moradores repassam os apartamentos por \"contratos de gaveta\". A restauração, planejada em 2004 e executada entre 2010 e 2015 pelo Governo do Estado, provocou forte valorização. Concebido fora da lógica de mercado, o conjunto acabou reinserido nela de maneira informal.",
  ],
  sociedade: [
    "O Pedregulho não era aberto a qualquer trabalhador. Destinava-se a funcionários municipais de baixos salários, e o acesso passava por uma seleção: antes da ocupação, assistentes sociais do DHP, como Anna Augusta Almeida, faziam inquéritos que avaliavam as condições de cada família candidata. Ficavam de fora, portanto, os trabalhadores sem vínculo com a prefeitura, o que excluía boa parte da população pobre da cidade, e as famílias que não se enquadravam nos critérios do serviço social. Não encontramos documentação sobre os critérios exatos de renda e de seleção.",
    "Para quem entrava, o projeto previa mais do que moradia: um ambiente educativo, capaz de transformar hábitos. Depois da mudança, as assistentes sociais seguiam acompanhando as famílias, ensinando desde o uso correto do apartamento até a participação na vida comunitária. Essa pedagogia tinha dupla face. Era uma forma de cuidado e de acesso a serviços que essas famílias raramente teriam. Mas era também um projeto de controle social: partia do pressuposto de que os trabalhadores precisavam aprender a morar, e cabia a técnicos e arquitetos definir o modo correto de viver. A repetição rigorosa das fachadas, que homogeneíza os habitantes, é a expressão formal dessa mesma ideia.",
    "A lavanderia coletiva mostra bem essa tensão, que passa também pelo gênero. Carmen Portinho questionava a suposta vocação natural da mulher para as tarefas domésticas, e a retirada das áreas de serviço dos apartamentos buscava aliviar o trabalho das moradoras. Na prática, porém, a lavanderia logo virou motivo de polêmica. Ficava longe do Bloco A, enfrentou resistência e funcionou apenas até meados dos anos 1970. As moradoras passaram a lavar roupa nos banheiros e a estender varais nas fachadas. O que foi pensado como emancipação acabou vivido como imposição.",
    "Os moradores também se apropriaram do conjunto à sua maneira. As grades instaladas nos corredores, por exemplo, servem para que as crianças pequenas não se afastem dos apartamentos. Enquanto isso, o projeto social se desfazia com a política: o serviço social foi interrompido em 1953 por problemas administrativos, apartamentos foram destinados a usos políticos e ocupações irregulares geraram conflitos entre moradores de diferentes estratos sociais.",
    "Na dimensão cultural, o conjunto levou para a habitação popular a arte de Portinari, Burle Marx e Anísio Medeiros, até então associada a edifícios públicos de prestígio como o MES, afirmando que o trabalhador merecia a melhor arquitetura de seu tempo. O Pedregulho expressa, assim, ao mesmo tempo, dignidade e tutela.",
  ],
  transformacoes: [
    "Quando o Bloco A foi ocupado, no início dos anos 1960, o DHP já havia sido extinto e Carmen Portinho estava afastada. Os edifícios residenciais passaram à COHAB e os serviços à Fundação Leão XIII, separando definitivamente moradia e equipamentos. Sem gestão nem investimentos após 1964, o conjunto entrou em degradação. A questão fundiária agravou o quadro: os edifícios pertencem ao Estado e o terreno à União, as unidades circulam por \"contratos de gaveta\" e não há condomínio formal que se responsabilize pela manutenção.",
    "Os equipamentos coletivos tiveram destinos diferentes. A escola, o ginásio e a piscina, sob gestão municipal, mantiveram o uso original e estão em melhor estado, mas foram separados do conjunto por cercas. O posto de saúde virou hospital em 1953, foi fechado em 1999 e hoje está em ruína. A lavanderia e o mercado deram lugar a um depósito e a uma garagem, e os jardins foram ocupados por um clube e por estacionamentos. Os moradores, por sua vez, trocaram as venezianas de madeira por esquadrias de alumínio e instalaram grades nos corredores. O conjunto pensado como um todo coletivo foi se fragmentando em partes isoladas.",
    "O reconhecimento patrimonial veio com o tombamento municipal, em 1986, e estadual, em 2011; no Iphan, o processo segue em aberto. A restauração do Bloco A, planejada em 2004 pelo escritório de Alfredo Britto e executada entre 2010 e 2015 sem remover os cerca de dois mil moradores, foi pioneira para a habitação popular no Brasil e na América Latina. Ela também provocou forte valorização, o que abre uma questão: como conciliar preservação patrimonial e permanência dos moradores de baixa renda.",
    "Lido com os parâmetros de hoje, o Bloco A revela ainda uma exclusão. São sete pavimentos sem elevador, e a entrada pelo pavimento intermediário reduz, mas não elimina, as escadas. Com cômodos compactos e circulações estreitas, longe das exigências da NBR 9050, o edifício limita o uso por idosos e pessoas com mobilidade reduzida. Esse problema é ainda mais difícil de resolver num edifício tombado.",
    "A trajetória do Pedregulho mostra que a qualidade arquitetônica, sozinha, não garante o êxito de um projeto habitacional: sem gestão e manutenção contínuas, a arquitetura permanece, mas a vida coletiva que ela previa se desfaz.",
  ],
}
const cap = (slug: string, numero: number, titulo: string, subtitulo: string): Capitulo => ({
  slug, numero, titulo, subtitulo, paragrafos: paragrafos[slug], foto: `img/cap-${slug}.svg`, credito: '',
  midia: [],
})
const extras: Record<string, BlocoMidia[]> = {
  identificacao: [
    { depois: 0, bloco: { tipo: 'imagem', foto: 'img/mapa-localizacao.png', credito: 'Produção do grupo', legenda: 'Localização do conjunto na malha urbana de São Cristóvão', alt: 'Mapa de localização do conjunto' } },
    { depois: 1, bloco: { tipo: 'citacao', texto: '522 unidades para funcionários municipais de baixos salários, com aluguel descontado em folha.' } },
  ],
  contexto: [
    { depois: 2, bloco: { tipo: 'imagem', foto: 'img/carmen-portinho.jpg', credito: 'IAB', legenda: 'Carmen Portinho', alt: 'Foto de Carmen Portinho' } },
    { depois: 3, bloco: { tipo: 'imagem', foto: 'img/exposicao-ny-1958.jpg', credito: '[CONFIRMAR CRÉDITO]', legenda: 'Abertura da exposição sobre habitação popular em Nova York, em 1958', alt: 'Exposição em Nova York, 1958' } },
  ],
  territorio: [
    { depois: 1, bloco: { tipo: 'imagem', foto: 'img/implantacao.png', credito: 'Produção do grupo', legenda: 'Implantação: blocos residenciais em vermelho, equipamentos coletivos em azul', alt: 'Diagrama de implantação' } },
    { depois: 2, bloco: { tipo: 'imagem', foto: 'img/implantacao-pilotis.png', credito: 'Produção do grupo', legenda: 'Pilotis em diferentes alturas acompanham o relevo', alt: 'Diagrama dos pilotis' } },
  ],
  projeto: [
    { depois: 0, bloco: { tipo: 'imagem', foto: 'img/setorizacao-3d.png', credito: 'Produção do grupo', legenda: 'Setorização: serviços (azul escuro), pavimento de uso coletivo (azul claro) e residencial (cinza)', alt: 'Diagrama de setorização 3D' } },
    { depois: 1, bloco: { tipo: 'diagrama', id: 'fluxos', legenda: 'Fluxos de circulação e graus de publicidade do conjunto. Esquema sem escala.' } },
    { depois: 3, bloco: { tipo: 'imagem', foto: 'img/plantas-setorizadas.png', credito: 'Produção do grupo', legenda: 'Plantas setorizadas: sala, cozinha, banheiro, quarto e circulação', alt: 'Plantas setorizadas dos apartamentos' } },
    { depois: 5, bloco: { tipo: 'citacao', texto: "Um projeto que organiza com rigor a vida coletiva, mas deixa pouco espaço para a maneira como os moradores de fato vivem." } },
  ],
  materiais: [
    { depois: 1, bloco: { tipo: 'diagrama', id: 'corte', legenda: 'Corte esquemático do Bloco A, sem escala.' } },
    { depois: 1, bloco: { tipo: 'imagem', foto: 'img/pilotis-estrutura.png', credito: 'Produção do grupo', legenda: 'Estrutura em concreto armado sobre pilotis', alt: 'Estrutura dos pilotis' } },
    { depois: 3, bloco: { tipo: 'imagem', foto: 'img/cobogo-restauro.jpg', credito: '[CONFIRMAR CRÉDITO]', legenda: 'Recuperação dos cobogós durante o restauro', alt: 'Cobogós sendo restaurados' } },
  ],
  sociedade: [
    { depois: 2, bloco: { tipo: 'citacao', texto: "O que foi pensado como emancipação acabou vivido como imposição." } },
    { depois: 3, bloco: { tipo: 'imagem', foto: 'img/grades-corredor.jpg', credito: '[CONFIRMAR CRÉDITO]', legenda: 'Grades instaladas pelos moradores nos corredores', alt: 'Grades nos corredores' } },
  ],
  economia: [
    { depois: 3, bloco: { tipo: 'citacao', texto: "Concebido fora da lógica de mercado, o conjunto acabou reinserido nela de maneira informal." } },
  ],
  transformacoes: [
    { depois: 1, bloco: { tipo: 'diagrama', id: 'transformacoes', legenda: 'O que aconteceu com cada edifício.' } },
    { depois: 1, bloco: { tipo: 'antesHoje' } },
    { depois: 4, bloco: { tipo: 'citacao', texto: "Sem gestão e manutenção contínuas, a arquitetura permanece, mas a vida coletiva que ela previa se desfaz." } },
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
  texto: "No Pedregulho, a vida coletiva projetada dependia de um Estado presente para funcionar. Quando o DHP, os recursos e o serviço social se foram, a comunidade planejada se desfez em dependência e isolamento, revelando a habitação moderna como projeto de transformação — e controle — dos modos de vida operários.",
  argumentos: [
    { numero: '01', titulo: 'Programa', texto: "As áreas de serviço saíram dos apartamentos e foram concentradas na lavanderia, no mercado e nos equipamentos, na parte baixa do terreno.", evidencias: ["plantas setorizadas, diagrama de setorização, diagrama de fluxos."] },
    { numero: '02', titulo: 'Produção', texto: "A obra foi lenta e incompleta: o Bloco A só foi ocupado nos anos 1960 e o Bloco C nunca foi construído. A extinção do DHP, em 1962, separou moradia e serviços, e o golpe de 1964 cortou os investimentos.", evidencias: ["linha do tempo."] },
    { numero: '03', titulo: 'Sociedade', texto: "O serviço social selecionava e \"educava\" os moradores. A lavanderia coletiva enfrentou resistência, funcionou só até os anos 1970, e as moradoras voltaram a lavar roupa em casa.", evidencias: ["fontes históricas e fotos."] },
    { numero: '04', titulo: 'Transformação', texto: "As cercas fragmentaram o conjunto, os equipamentos mudaram de uso ou viraram ruína, e a falta de condomínio impediu a manutenção. O restauro e a valorização reabrem a pergunta: comunidade para quem?", evidencias: ["cronologia dos edifícios, par de fotos aéreas."] },
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
  conclusao: "O Pedregulho materializou com rara qualidade a ambição moderna de transformar a habitação em vida compartilhada. Mas o programa coletivo só funcionava sustentado por um Estado presente, que financiava, geria e educava. Sem ele, a separação entre moradia e serviços deixou de ser convivência e virou dependência, e o conjunto se fragmentou em partes isoladas. A arquitetura permaneceu, restaurada e reconhecida como patrimônio; a vida coletiva que ela previa, não. Ao final, a monumentalidade do Bloco A acaba por disputar centralidade com a própria vida que deveria abrigar.",
}

export const referenciasTextos = { titulo: 'Referências e créditos', bibliografia: 'Bibliografia', imagens: 'Créditos das imagens', ia: 'Uso de inteligência artificial' }
export const capituloTextos = { anterior: '‹ capítulo anterior', proximo: 'próximo capítulo ›', verNoMapa: 'Ver no mapa', progresso: 'Progresso de leitura', diagramaTabela: ['Edifício', 'Original', 'Transformação', 'Situação'] }
export const teseTextos = { conclusao: 'Conclusão', evidencias: 'Evidências', diagrama: 'Da condição ao isolamento' }

export const referencias = {
  bibliografia: [
    "CARINI, Márcia. O lugar das mulheres nas moradias sociais erguidas no Brasil moderno. Pesquisa FAPESP, São Paulo, n. 358, nov. 2025. Disponível em: https://revistapesquisa.fapesp.br/o-lugar-das-mulheres-nas-moradias-sociais-erguidas-no-brasil-moderno/. Acesso em: 31 out. 2026.",
    "COMPLEXO do Pedregulho: um marco da arquitetura moderna brasileira. Revista Gestão e Gerenciamento, [S. l.], n. 1, 2015. Disponível em: https://nppg.org.br/revistas/gestaoegerenciamento/article/download/111/55. Acesso em: 31 out. 2026.",
    "NASCIMENTO, Flávia Brito do. A restauração do Conjunto Residencial do Pedregulho: trajetória da arquitetura moderna e o desafio contemporâneo. Revista CPC, São Paulo, n. 22 especial, p. 138-175, abr. 2017. Disponível em: https://revistas.usp.br/cpc/article/view/121482. Acesso em: 31 out. 2026.",
    "PEDREGULHO Housing Complex. In: WIKIPEDIA: the free encyclopedia. [S. l.: s. n.], 2026. Disponível em: https://en.wikipedia.org/wiki/Pedregulho_Housing_Complex. Acesso em: 31 out. 2026.",
    "SILVA, Rafael Spindler da. O Conjunto Pedregulho e algumas relações compositivas. Cadernos de Arquitetura e Urbanismo, Belo Horizonte, v. 12, n. 13, p. 77-93, dez. 2005.",
  ],
  creditos: [
    'Produção do grupo: mapa-localizacao.png, implantacao.png, implantacao-pilotis.png, setorizacao-3d.png, plantas-setorizadas.png, pilotis-estrutura.png',
    'IAB: carmen-portinho.jpg',
    'Arte fora do Museu: aerea-hoje.jpg',
    '[CONFIRMAR CRÉDITO]: home-bloco-a.jpg, exposicao-ny-1958.jpg, cobogo-restauro.jpg, grades-corredor.jpg, timeline-capa.jpg, aerea-antes.jpg',
    'Imagem de compartilhamento (Open Graph): ilustração gerada com IA (ChatGPT), sob direção do grupo.',
  ],
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
  resumo: "No Pedregulho, a vida coletiva projetada dependia de um Estado presente. Quando ele saiu, a comunidade planejada virou dependência e isolamento.",
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
  disciplina: '[PREENCHER]',
  professor: '[PREENCHER]',
  integrantes: ['[PREENCHER]'],
  instituicao: '[PREENCHER]',
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
