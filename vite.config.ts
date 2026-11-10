import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ---- Constantes de deploy: troque aqui ----
const SITE_URL = 'https://pedregulho.mrender.com.br' // domínio final (og:image, og:url, canonical)
const CF_ANALYTICS_TOKEN = '' // Cloudflare Web Analytics: cole o token do site (vazio = sem beacon)
// -------------------------------------------

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'html-constantes',
      transformIndexHtml: html =>
        html
          .replace(/%SITE_URL%/g, SITE_URL)
          .replace(
            '<!--CF_BEACON-->',
            CF_ANALYTICS_TOKEN
              ? `<script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{"token": "${CF_ANALYTICS_TOKEN}"}'></script>`
              : '',
          ),
    },
  ],
  base: '/',
})
