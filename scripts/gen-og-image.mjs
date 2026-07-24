#!/usr/bin/env node
// Regenerates the default Open Graph card at public/images/og-default.png.
// Run after a brand change: `node scripts/gen-og-image.mjs`.
//
// This is the fallback share image for pages without their own — the home
// page, category archives, and posts with no frontmatter or inline image.
// Posts that do have an image use it directly (see src/layouts/Layout.astro),
// so this is only ever the backstop, which is why one static card is enough.
//
// Rendered with sharp (already a dependency). Text uses a system sans rather
// than Inter: librsvg has no access to the self-hosted variable woff2, and at
// share-thumbnail scale the difference is invisible. Colours are the brand
// tokens from DESIGN.md — warm near-black ground, terracotta accent.

import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'images', 'og-default.png');

const svg = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#121212"/>
  <rect x="0" y="0" width="1200" height="12" fill="#ec8a5f"/>
  <g font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-weight="600">
    <text x="96" y="292" font-size="96" fill="#8a8a88" text-decoration="line-through">Not So</text>
    <text x="96" y="410" font-size="96" fill="#ec8a5f">Common Thoughts</text>
  </g>
  <text x="100" y="524" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="33" fill="#adadab" font-weight="400">A. Kohlhofer — design, technology, and human creativity</text>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile(OUT);
console.log(`wrote ${OUT}`);
