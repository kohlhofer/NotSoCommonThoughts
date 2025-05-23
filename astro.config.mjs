// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import compress from 'vite-plugin-compression';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://notsocommonthoughts.com',
  integrations: [tailwind(), mdx(), sitemap(), vercel()],
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
