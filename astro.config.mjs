// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import compress from 'vite-plugin-compression';
import vercel from '@astrojs/vercel';
import robots from 'astro-robots';
import { rehypeHeadingIds } from '@astrojs/markdown-remark';

// Prepends a "#" link to every h2 and h3 in a post so a section can be linked
// to. Runs after rehypeHeadingIds, which gives the headings their ids. The
// link is hidden from assistive tech and the tab order: it is a pointer
// convenience, revealed on hover (see .heading-anchor in global.css).
function rehypeHeadingAnchors() {
  const visit = (node) => {
    if (node.type === 'element' && (node.tagName === 'h2' || node.tagName === 'h3') && node.properties?.id) {
      node.children.unshift({
        type: 'element',
        tagName: 'a',
        properties: { href: `#${node.properties.id}`, className: ['heading-anchor'], ariaHidden: 'true', tabIndex: -1 },
        children: [{ type: 'text', value: '#' }],
      });
    }
    node.children?.forEach(visit);
  };
  return visit;
}

// https://astro.build/config
export default defineConfig({
  site: 'https://notsocommonthoughts.com',
  integrations: [
    tailwind(),
    mdx(),
    sitemap({
      // Single-segment root URLs are the legacy category redirects
      // (src/pages/[legacy].astro) and the 404 page; neither belongs in the
      // sitemap. Real pages live at /, /blog/… and /category/….
      filter: (page) => !/^https:\/\/notsocommonthoughts\.com\/[^/]+\/?$/.test(page),
    }),
    vercel(),
    robots(),
  ],
  image: {
    // Enable image optimization with sharp
    service: {
      entrypoint: 'astro/assets/services/sharp'
    },
    remotePatterns: [{ protocol: "https" }],
  },
  markdown: {
    rehypePlugins: [rehypeHeadingIds, rehypeHeadingAnchors],
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
