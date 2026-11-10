import type { Config } from 'tailwindcss'
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        papel: 'var(--papel)', tinta: 'var(--tinta)', marinho: 'var(--marinho)',
        vermelho: 'var(--vermelho)', celeste: 'var(--celeste)',
        concreto: 'var(--concreto)', cinza: 'var(--cinza)', linha: 'var(--linha)',
      },
      fontFamily: {
        titulo: ['"Inter Tight"', 'Archivo', 'sans-serif'],
        texto: ['Inter', 'sans-serif'],
      },
      spacing: { gutter: '16px' },
      maxWidth: { coluna: '480px' },
    },
  },
  plugins: [],
} satisfies Config
