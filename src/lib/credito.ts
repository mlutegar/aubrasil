/** Crédito pendente começa com "[" (ex.: "[CONFIRMAR CRÉDITO]"): não aparece no site, fica só no content.ts. */
export const creditoVisivel = (c?: string): c is string => !!c && !c.trim().startsWith('[')
