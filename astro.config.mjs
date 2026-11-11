// @ts-check
import { defineConfig } from 'astro/config';

// BASE_PATH permite publicar el sitio en una subcarpeta (p. ej. GitHub Pages: /havi-atacama-web).
// En el servidor de CENIA, con dominio propio, se deja vacío.
const base = process.env.BASE_PATH || '/';

export default defineConfig({
  site: process.env.SITE_URL || 'https://havi-atacama.cenia.cl',
  base,
  trailingSlash: 'always',
  build: { format: 'directory', assets: 'assets' },
  image: { responsiveStyles: false },
});
