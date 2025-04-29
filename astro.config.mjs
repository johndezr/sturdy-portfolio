// @ts-check
import path from 'path';
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import partytown from '@astrojs/partytown';
import { fileURLToPath } from 'url';
import vercel from '@astrojs/vercel';
import vue from '@astrojs/vue';

const SITE_URL = 'https://johndez.net';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://astro.build/config
export default defineConfig({
  vite: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    plugins: [tailwindcss()],
  },
  output: 'static',
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
  site: SITE_URL,
  integrations: [
    vue(),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
    }),
    partytown({
      // Configuración para Google Analytics
      config: {
        forward: ['dataLayer.push'],
      },
    }),
  ],
});
