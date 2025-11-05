// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import compress from 'vite-plugin-compression';
import vercel from '@astrojs/vercel';
import robots from 'astro-robots';

// https://astro.build/config
export default defineConfig({
  site: 'https://notsocommonthoughts.com',
  integrations: [tailwind(), mdx(), sitemap(), vercel(), robots()],
  image: {
    // Enable image optimization with sharp
    service: {
      entrypoint: 'astro/assets/services/sharp'
    },
    remotePatterns: [{ protocol: "https" }],
  },
  markdown: {
    shikiConfig: {
      theme: 'github-dark-dimmed',
      wrap: true
    }
  },
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    build: {
      cssCodeSplit: true,
      minify: 'esbuild',
      rollupOptions: {
        output: {
          manualChunks: undefined,
        },
      },
    },
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
