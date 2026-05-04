# Not So Common Thoughts

Personal blog by A. Kohlhofer, built with Astro 5 + Tailwind v3, deployed on Vercel.

## Design System

`DESIGN.md` (repo root) is the canonical specification of the visual identity — colors, typography, spacing, rounded scale, and component tokens. It conforms to Google's [DESIGN.md spec](https://github.com/google-labs-code/design.md) and is the **source of truth** for design decisions.

- When changing visual style (new color, new component pattern, font swap, spacing change), update `DESIGN.md` first, then propagate to code.
- `style.md` is the writing-voice guide (tone, structure, banned phrases for posts). It's separate from `DESIGN.md` and covers prose, not pixels.
- `npm run design:lint` validates `DESIGN.md` against the spec. It runs automatically on `npm run build` (and therefore on every Vercel deploy) — broken token refs or invalid values will fail the build.
- `npm run design:export` regenerates `design.tokens.json` (W3C DTCG) and `tailwind.theme.json` (Tailwind v3 config). These are derived artifacts — don't edit by hand.

### Known design drift to consolidate over time

The brand currently has two accent colors: **red-400** for site chrome (sidebar, footer, wordmark, hover) and **sky-blue (`primary-*`)** for prose links and inline code. The sky-blue scale is residual from a Tailwind starter palette. Goal: consolidate prose links to red and retire the sky scale. Until then, keep sky strictly confined to `.prose a` and `.prose code` — see `DESIGN.md`'s Don'ts section.

## Writing

- Posts live in `src/content/blog/*.mdx`
- Voice and structure rules are in `style.md`
- Frontmatter: `title, description, date, slug?, tags[], featured?, unlisted?`
- `unlisted: true` removes a post from listings but keeps the URL accessible

## Build

`npm run build` runs the design lint first (via `prebuild`), then `astro build`. A failing lint blocks the build — both locally and on Vercel.
