// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import compress from 'vite-plugin-compression';
import { analytics } from 'astro-analytics';

// https://astro.build/config
export default defineConfig({
  site: 'https://notsocommonthoughts.com',
  integrations: [tailwind(), mdx(), sitemap(), analytics({
    measurementIds: ['G-DTND00MKLK']
  })],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true
    }
  },
  vite: {
    plugins: [
      compress({
        algorithm: 'gzip',
        ext: '.gz',
      }),
      compress({
        algorithm: 'brotliCompress',
        ext: '.br',
      }),
    ],
  }
});
