#!/usr/bin/env node
// Generate WebP derivatives for every image the site references and rewrite
// the references. Posts list 68 entries whose 64px thumbnails were shipping
// full-size PNGs (~7MB on the homepage). Two derivatives per source:
//
//   <name>.webp         max 1600px, quality 78 — post pages and featured cards
//   <name>-thumb.webp   max 176px, quality 75 — the 64/80px list slot at 2x
//
// Reference rewrite: `![..](/images/x.png)` and front-matter `image:` in
// src/content/blog/*.md, plus any /images/*.png|jpg|jpeg path in src/.
// Originals stay in public/images so existing external links and cached share
// cards keep working; the site itself stops shipping them.
//
// Encoding uses sharp — the same libvips Astro's image service already
// installs; nothing new lands in package.json. (sips on this macOS reads WebP
// but cannot write it.)
//
// Also writes src/data/image-manifest.json mapping /images/<file>.webp to its
// pixel dimensions (and the thumb's), so components can set width/height and
// pick the thumb. Regenerate after adding or replacing images:
//   node scripts/images-webp.mjs

import { readdirSync, readFileSync, writeFileSync, existsSync, statSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'
import sharp from 'sharp'

const ROOT = new URL('..', import.meta.url).pathname
const PUB = join(ROOT, 'public')
const SOURCES = join(ROOT, 'src')
const RASTER = /\.(png|jpe?g)$/i
const MIN_BYTES = 40 * 1024 // skip originals already small enough to leave alone

function walk(dir, out = []) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name)
    if (e.isDirectory()) walk(p, out)
    else out.push(p)
  }
  return out
}

// 1. collect referenced /images/ paths from content and components
const refs = new Set()
const scanText = (text) => {
  for (const m of text.matchAll(/\/images\/[A-Za-z0-9._/-]+\.(?:png|jpe?g)/gi)) refs.add(m[0])
}
for (const f of walk(join(SOURCES, 'content'))) if (/.mdx?$/.test(f)) scanText(readFileSync(f, 'utf8'))
for (const f of walk(SOURCES)) if (/\.(astro|ts|js|mjs)$/.test(f)) scanText(readFileSync(f, 'utf8'))

const sources = [...refs]
  .map((p) => ({ sitePath: p, disk: join(PUB, p) }))
  .filter((r) => existsSync(r.disk) && statSync(r.disk).size >= MIN_BYTES && !/-thumb\./.test(r.disk))

// 2. derivatives (+ dimensions from the encoder itself)
const manifestPath = join(SOURCES, 'data', 'image-manifest.json')
const manifest = existsSync(manifestPath) ? JSON.parse(readFileSync(manifestPath, 'utf8')) : {}
let before = 0
let after = 0
for (const { sitePath, disk } of sources) {
  const base = sitePath.replace(RASTER, '')
  const full = join(PUB, `${base}.webp`)
  const thumb = join(PUB, `${base}-thumb.webp`)
  const fd = await sharp(disk).rotate().resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 78 }).toFile(full)
  const td = await sharp(disk).rotate().resize({ width: 176, withoutEnlargement: true }).webp({ quality: 75 }).toFile(thumb)
  manifest[`${base}.webp`] = { w: fd.width, h: fd.height, thumb: `${base}-thumb.webp`, tw: td.width, th: td.height }
  before += statSync(disk).size
  after += statSync(full).size + statSync(thumb).size
  console.log(`${sitePath}  ${(statSync(disk).size / 1024).toFixed(0)}KB -> ${(statSync(full).size / 1024).toFixed(0)}KB + thumb ${(statSync(thumb).size / 1024).toFixed(0)}KB`)
}

// 3. rewrite references (longest paths first so subfolders never partial-match)
const sorted = Object.keys(manifest).map((k) => k.replace(/\.webp$/, '')).sort((a, b) => b.length - a.length)
const rewrite = (text) => {
  for (const base of sorted) text = text.replaceAll(`${base}.png`, `${base}.webp`).replaceAll(`${base}.jpg`, `${base}.webp`).replaceAll(`${base}.jpeg`, `${base}.webp`)
  return text
}
let changed = 0
const seen = new Set()
for (const dir of [join(SOURCES, 'content'), SOURCES]) {
  for (const f of walk(dir)) {
    if (!/\.(md|mdx|astro|ts|js|mjs)$/.test(f) || f.includes('node_modules') || seen.has(f)) continue
    seen.add(f)
    const src = readFileSync(f, 'utf8')
    const out = rewrite(src)
    if (out !== src) { writeFileSync(f, out); changed++ }
  }
}

mkdirSync(join(SOURCES, 'data'), { recursive: true })
writeFileSync(join(SOURCES, 'data', 'image-manifest.json'), JSON.stringify(manifest, null, 1) + '\n')
console.log(`\n${sources.length} images converted: ${(before / 1048576).toFixed(1)}MB of sources -> ${(after / 1048576).toFixed(1)}MB of webp (incl. thumbs); ${changed} files rewritten; manifest: src/data/image-manifest.json`)
