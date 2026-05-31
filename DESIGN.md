---
version: alpha
name: Not So Common Thoughts
description: A personal blog by A. Kohlhofer. Warm paper neutrals carry a light-and-dark reading surface set entirely in Inter, with a single terracotta accent as the brand voice — the same red-clay tone that strikes through "Not So" in the wordmark.
colors:
  # Light surfaces — warm off-white paper, not pure white
  background-light: "#f9f9f7"
  surface-light: "#f0efea"
  surface-light-alt: "#e7e6df"

  # Dark surfaces — warm near-black, not slate
  background-dark: "#121212"
  surface-dark: "#1c1c1b"
  surface-dark-alt: "#262625"

  # Code block background — warm near-black, evokes a quiet editor
  code-bg: "#1c1c1b"

  # Text — light theme
  on-light: "#111111"
  on-light-muted: "#666663"
  on-light-subtle: "#8a8a85"

  # Text — dark theme
  on-dark: "#e8e8e6"
  on-dark-muted: "#adadab"
  on-dark-subtle: "#8a8a88"

  # Borders & dividers
  divider-light: "#e3e2dc"
  divider-light-strong: "#d2d1c9"
  divider-dark: "#2a2a28"
  divider-dark-strong: "#383835"

  # The single accent — terracotta. Wordmark, links, active states, hover.
  accent-light: "#c8502d"
  accent-light-strong: "#a8431f"
  accent-dark: "#ec8a5f"
  accent-dark-strong: "#f0a07e"

typography:
  wordmark:
    fontFamily: Inter
    fontSize: 1.5rem
    fontWeight: "700"
    lineHeight: "1"
    letterSpacing: "-0.01em"
  statement:
    fontFamily: Inter
    fontSize: 2.75rem
    fontWeight: "600"
    lineHeight: "1.1"
    letterSpacing: "-0.025em"
  title:
    fontFamily: Inter
    fontSize: 3rem
    fontWeight: "600"
    lineHeight: "1.08"
    letterSpacing: "-0.025em"
  heading-lg:
    fontFamily: Inter
    fontSize: 1.875rem
    fontWeight: "600"
    lineHeight: "1.2"
    letterSpacing: "-0.015em"
  heading-md:
    fontFamily: Inter
    fontSize: 1.5rem
    fontWeight: "600"
    lineHeight: "1.3"
    letterSpacing: "-0.015em"
  heading-sm:
    fontFamily: Inter
    fontSize: 1.25rem
    fontWeight: "600"
    lineHeight: "1.4"
  body:
    fontFamily: Inter
    fontSize: 1.0625rem
    fontWeight: "400"
    lineHeight: "1.6"
  body-prose:
    fontFamily: Inter
    fontSize: 1.1875rem
    fontWeight: "400"
    lineHeight: "1.65"
  body-sm:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: "400"
    lineHeight: "1.6"
  body-xs:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: "400"
    lineHeight: "1.5"
  emphasis:
    fontFamily: Inter
    fontSize: 1rem
    fontWeight: "600"
  eyebrow:
    fontFamily: Inter
    fontSize: 0.6875rem
    fontWeight: "600"
    letterSpacing: "0.14em"
  code:
    fontFamily: Menlo
    fontSize: 0.875rem
    fontWeight: "400"
    lineHeight: "1.6"

rounded:
  none: 0px
  sm: 4px
  md: 6px
  lg: 8px
  full: 9999px

spacing:
  unit: 4px
  gutter-sm: 16px
  gutter-md: 32px
  gutter-lg: 48px
  page-top: 80px
  sidebar: 32px
  section: 48px

components:
  page-light:
    backgroundColor: "{colors.background-light}"
    textColor: "{colors.on-light}"
    typography: "{typography.body}"

  page-dark:
    backgroundColor: "{colors.background-dark}"
    textColor: "{colors.on-dark}"
    typography: "{typography.body}"

  sidebar-light:
    backgroundColor: "{colors.background-light}"
    textColor: "{colors.on-light}"
    padding: 32px
    width: 256px

  sidebar-dark:
    backgroundColor: "{colors.background-dark}"
    textColor: "{colors.on-dark}"
    padding: 32px
    width: 256px

  wordmark-base:
    textColor: "{colors.on-light-subtle}"
    typography: "{typography.wordmark}"

  wordmark-accent:
    textColor: "{colors.accent-light}"
    typography: "{typography.wordmark}"

  statement:
    textColor: "{colors.on-light}"
    typography: "{typography.statement}"

  eyebrow-label:
    textColor: "{colors.on-light-muted}"
    typography: "{typography.eyebrow}"

  nav-link:
    backgroundColor: "transparent"
    textColor: "{colors.on-light-muted}"
    typography: "{typography.body-sm}"
    padding: 6px 0

  nav-link-hover:
    textColor: "{colors.accent-light}"

  nav-link-active:
    textColor: "{colors.accent-light}"

  link-inline-light:
    backgroundColor: "transparent"
    textColor: "{colors.accent-light}"
    typography: "{typography.body}"

  link-inline-light-hover:
    textColor: "{colors.accent-light-strong}"

  link-inline-dark:
    backgroundColor: "transparent"
    textColor: "{colors.accent-dark}"
    typography: "{typography.body}"

  link-inline-dark-hover:
    textColor: "{colors.accent-dark-strong}"

  doorway-link:
    backgroundColor: "transparent"
    textColor: "{colors.accent-light}"
    typography: "{typography.body-sm}"

  search-input:
    backgroundColor: "transparent"
    textColor: "{colors.on-light}"
    typography: "{typography.body-sm}"
    padding: 6px 0

  menu-button:
    backgroundColor: "transparent"
    textColor: "{colors.on-light-muted}"
    padding: 8px

  menu-button-hover:
    textColor: "{colors.accent-light}"

  post-list-item:
    backgroundColor: "transparent"
    textColor: "{colors.on-light}"
    typography: "{typography.body}"
    padding: 0px

  post-list-title:
    textColor: "{colors.on-light}"
    typography: "{typography.heading-md}"

  post-meta:
    textColor: "{colors.on-light-subtle}"
    typography: "{typography.body-xs}"

  category-label:
    textColor: "{colors.on-light-muted}"
    typography: "{typography.eyebrow}"

  prose-strong:
    textColor: "{colors.on-light}"
    typography: "{typography.emphasis}"

  prose-heading:
    textColor: "{colors.on-light}"
    typography: "{typography.heading-md}"

  prose-body:
    textColor: "{colors.on-light}"
    typography: "{typography.body-prose}"

  code-inline-light:
    backgroundColor: "{colors.surface-light}"
    textColor: "{colors.accent-light}"
    typography: "{typography.code}"
    rounded: "{rounded.sm}"
    padding: 2px 5px

  code-inline-dark:
    backgroundColor: "{colors.surface-dark}"
    textColor: "{colors.accent-dark}"
    typography: "{typography.code}"
    rounded: "{rounded.sm}"
    padding: 2px 5px

  code-block:
    backgroundColor: "{colors.code-bg}"
    textColor: "{colors.on-dark}"
    typography: "{typography.code}"
    rounded: "{rounded.lg}"
    padding: 16px

  table-cell:
    backgroundColor: "transparent"
    textColor: "{colors.on-light-muted}"
    typography: "{typography.body-sm}"
    padding: 12px 16px

  table-header:
    backgroundColor: "{colors.surface-light}"
    textColor: "{colors.on-light}"
    typography: "{typography.emphasis}"
    padding: 12px 16px

  divider-light:
    backgroundColor: "{colors.divider-light}"
    height: 1px

  divider-dark:
    backgroundColor: "{colors.divider-dark}"
    height: 1px

  footer-light:
    backgroundColor: "{colors.background-light}"
    textColor: "{colors.on-light-muted}"
    typography: "{typography.body-xs}"
    padding: 40px 16px

  footer-dark:
    backgroundColor: "{colors.background-dark}"
    textColor: "{colors.on-dark-muted}"
    typography: "{typography.body-xs}"
    padding: 40px 16px

  footer-section-label:
    textColor: "{colors.on-light-muted}"
    typography: "{typography.eyebrow}"

  cta-button:
    backgroundColor: "{colors.accent-light}"
    textColor: "{colors.background-light}"
    typography: "{typography.emphasis}"
    rounded: "{rounded.md}"
    padding: 10px 20px

  search-result-hover-light:
    backgroundColor: "{colors.surface-light-alt}"
    textColor: "{colors.accent-light}"
    typography: "{typography.body-sm}"
    padding: 8px 16px

  search-result-hover-dark:
    backgroundColor: "{colors.surface-dark-alt}"
    textColor: "{colors.accent-dark}"
    typography: "{typography.body-sm}"
    padding: 8px 16px

  post-meta-dark:
    textColor: "{colors.on-dark-subtle}"
    typography: "{typography.body-xs}"

  divider-strong-light:
    backgroundColor: "{colors.divider-light-strong}"
    height: 1px

  divider-strong-dark:
    backgroundColor: "{colors.divider-dark-strong}"
    height: 1px
---

## Overview

Not So Common Thoughts is a personal blog by A. Kohlhofer — a long-running place to think out loud about design, technology, AI, chess, and the practice of building. The visual identity follows the writing: composed, candid, and quiet. There is room to read; there is one accent color; there is no chrome.

The look is **warm paper, set in Inter, with a single terracotta accent** — the same identity used on [kohlhofer.com](https://kohlhofer.com). Both light and dark themes ship and are first-class: light is a warm off-white (`#f9f9f7`) with near-black ink (`#111`); dark is a warm near-black (`#121212`) with warm-white text (`#e8e8e6`). Unlike the previous design, **the chrome is no longer permanently dark** — the sidebar and footer follow the active theme. The reading surface and the chrome are the same paper.

The accent is **terracotta** (`#c8502d` light / `#ec8a5f` dark) — a warm red-clay that strikes through "Not So" in the wordmark and carries every link, active state, and hover. That strikethrough is the brand's whole posture in one gesture: a quiet correction of the assumed. There is exactly **one** accent now; the residual sky-blue prose scale from the old Tailwind starter has been retired entirely.

Typography is **Inter for everything** — a single self-hosted variable face (`/fonts/inter-variable.woff2`, weights 100–900) doing all the work, from the tracked uppercase eyebrow labels to the long-form prose to the big balanced display statements. There is no serif and no second face. Headings are weight 600 with tight tracking; size and tracking carry the hierarchy, and bold is reserved for `strong` and the wordmark.

## Colors

The palette is built on a **warm neutral** ramp and a single **terracotta** accent. There are no other hues and no gradients — the old radial body washes have been removed. Surfaces are flat paper.

- **Background, light (`#f9f9f7`)** — Warm off-white paper. The reading surface, sidebar, and footer in light theme.
- **Background, dark (`#121212`)** — Warm near-black. The reading surface, sidebar, and footer in dark theme. Not slate — it carries a touch of warmth, never blue.
- **On-light (`#111111`) / On-dark (`#e8e8e6`)** — Reading text. Near-black ink on paper; warm white on near-black.
- **On-*-muted (`#666663` / `#adadab`)** — Descriptions, body-secondary lines, footer text, nav links at rest.
- **On-*-subtle (`#8a8a85` / `#8a8a88`)** — Dates, counts, the struck "Not So", the faintest metadata.
- **Accent (`#c8502d` light / `#ec8a5f` dark)** — The single accent. Wordmark "Common Thoughts", the strikethrough, prose links, inline code, category active/hover, "Read post →", footer dot-bullets, CTA fill. Terracotta is the brand voice.
- **Accent-strong (`#a8431f` / `#f0a07e`)** — Hover state on already-accented elements (and the CTA hover fill).
- **Surface (`#f0efea` / `#1c1c1b`)** — Soft tile behind inline code and search results.
- **Dividers (`#e3e2dc` / `#2a2a28`)** — The hairline rules that separate hero, featured, list, and footer. Structure comes from these 1px lines, not from boxes.

The implementation uses CSS custom properties (`--bg`, `--fg`, `--fg-muted`, `--accent`, `--border`, …) defined in `global.css` and flipped under `.dark`. Tailwind exposes them as semantic color tokens (`paper`, `ink`, `muted`, `subtle`, `accent`, `accent-strong`, `line`, `surface`), so components use `text-ink` / `bg-paper` / `text-accent` and stay theme-aware without `dark:` variants.

Strict rule: **one accent, period**. Every interactive or emphasized element is terracotta; everything else is warm neutral. Never introduce a second hue.

## Typography

One self-hosted variable face does all the work: **Inter**, preloaded as `inter-variable.woff2`.

- Body and prose: weight 400, comfortable line-height (1.6 chrome / 1.65 prose). Prose is set at `1.1875rem`, matching the kohlhofer essays.
- Headings (`h1`–`h6`, and prose headings): weight 600 with tight tracking (`-0.015em` to `-0.025em`). Size and tracking carry the hierarchy.
- Display statements (home hero, post titles): weight 600, `-0.025em` tracking, `text-balance`, line-height ~1.1.
- Inline `<strong>`: weight 600.
- Links: terracotta, underlined at `3px` offset / `1px` thickness, thickening to `2px` on hover. Chrome links shift color only.
- Wordmark: weight 700. "Common Thoughts" in terracotta; "Not So" struck through in subtle neutral. The compact form (top-left) is one line; the canonical form (sidebar) stacks "COMMON / THOUGHTS" in bold uppercase.

The recurring signal is the **eyebrow**: an `0.6875rem`, weight-600, `0.14em` tracked uppercase label (`.eyebrow`) used for "Featured", "Writing", "Categories", "Category", section labels in the footer, and post category lists. It is the one piece of tracked uppercase in the system and it appears throughout.

Code uses the system monospace stack (Menlo on macOS). Inline code is terracotta on a soft surface tile; block code is warm-white on a near-black `#1c1c1b` background.

There is **no serif** anywhere. The previous Georgia footer line and Outfit face have both been removed.

## Layout

The site keeps its **off-canvas right sidebar** for navigation, search, theme toggle, and random-post — now restyled in warm paper rather than dark slate. Reading content sits in a single narrow column.

- **Reading column** — `max-w-2xl` (≈42rem), left-aligned on listing/category pages, centered for post bodies and post headers. Generous vertical rhythm; structure via hairline dividers, not cards.
- **Page gutters** — `px-4` mobile, `px-8` small and up.
- **Top padding** — `pt-20` mobile, `pt-24` desktop. A consistent breath below the fixed top-left wordmark.
- **Sidebar** — Fixed `w-64` on the right, `bg-paper` with a `border-l border-line`, off-screen by default (`translate-x-full`), slides in over the content. The menu button (top-right) is the entry point.
- **Hero** — Pure typography. The home page opens with an eyebrow wordmark and the Brian Eno epigraph set as a large balanced statement — no illustration. (The former prime-number illustration has been retired.)
- **Footer** — Theme-aware paper with a `border-t border-line`. Three columns on desktop: a copyright line, an "Explore" list with terracotta dot-bullets, and a "Feeds & Data" list.

There are no gradients, no background washes, and no decorative imagery in the chrome.

## Elevation & Depth

Elevation is flat. No drop shadows, no glassmorphism, no layered surfaces. Separation comes from **hairline dividers** (`border-line`) and **position** (the fixed menu button, the sliding sidebar). The sidebar reads as separate because of its left border and slide-in position, not depth. Code blocks sit slightly apart via their own warm-dark tone and an 8px radius — no shadow.

## Shapes

The radius scale is small and conservative.

- **`rounded-sm` (4px)** — Inline code tile.
- **`rounded-md` (6px)** — The CTA button (e.g. 404 "Home").
- **`rounded-lg` (8px)** — Code blocks, prose images, post thumbnails, search-results panel.
- **`rounded-full`** — The avatar in the author bio and the small terracotta dot-bullets in the footer.

No `rounded-xl` or larger. The design is typographic, not card-based.

## Components

### Wordmark

Two flavors. "Common Thoughts" / "COMMON THOUGHTS" in terracotta; "<s>Not So</s>" struck through in subtle neutral.

- **Top-left, fixed** — Single line, smaller. Followed by a `text-[11px]` "About this site" link.
- **Sidebar** — Two-line stacked, bold uppercase. The canonical form.

The strikethrough is **part of the brand**. Never display "Not So" un-struck.

### Sidebar

Fixed right, `w-64`, `bg-paper`, `border-l border-line`, `p-8 pt-16`. Off-canvas by default; slides in with `translate-x-full → translate-x-0` over 200ms. Closes on outside click, on link click, and on Escape. Contains: stacked wordmark, search input (transparent with terracotta bottom-border on focus), an "Categories" eyebrow + category nav, theme toggle, random-post button.

### Eyebrow

`.eyebrow` — `0.6875rem`, weight 600, `0.14em` tracked uppercase, muted neutral. The recurring structural label across the whole site.

### Doorway link

A text link plus a right-arrow SVG (`.doorway-arrow`) that slides `4px` on hover. Used for "Read post →" and the back link. Affordance is the motion and color, not a button shape.

### Buttons

Almost no fills. The one filled button in the brand is the **CTA** (404 "Home"): `bg-accent text-paper rounded-md`, hovering to `accent-strong`. Everything else is a text link with a color shift.

### Search

A bare input, no card: `bg-transparent`, `border-b border-line`, focusing to terracotta. A magnifier SVG sits at left. Results appear in a `bg-surface` bordered panel below.

### Prose

Powered by `@tailwindcss/typography`'s `prose`, overridden in `global.css`:

- `prose` body → Inter, `1.1875rem`, line-height 1.65, `--fg`.
- `prose a` → terracotta, underline `3px` offset / `1px` thickness → `2px` on hover.
- `prose code` (inline) → terracotta on `--surface` tile, `rounded-sm`.
- `prose pre` → `#1c1c1b` background, warm-white text, `rounded-lg`, `p-4`.
- `prose h1`–`h6` → weight 600, tight tracking.
- `prose strong` → weight 600.
- `prose blockquote` → muted text, terracotta left border, not italic.
- `prose table` → hairline borders, zebra rows on `--surface`.

### Footer

Theme-aware `bg-paper` with a `border-t border-line`. Inner container `max-w-3xl`. Three columns on desktop (`2fr 1fr 1fr`), stacked on mobile: copyright, an "Explore" list with terracotta dot-bullets, and a "Feeds & Data" list. All footer text is `text-xs`; interactive text hovers to terracotta.

### Menu button

Fixed `top-4 right-4`, transparent, muted icon hovering to terracotta. The single visible control until the sidebar opens — no pill, no fill.

## Do's and Don'ts

**Do**

- Use the warm neutral ramp for everything non-accent. Reach for an adjacent neutral before introducing any other color.
- Reserve terracotta for one role per element: a link, an active state, the wordmark accent, the CTA fill. It is the only hue.
- Keep the strikethrough on "Not So" in the wordmark. Always. The strike is the brand.
- Use Inter for everything; let the self-hosted variable face cover all weights.
- Set headings at weight 600 with tight tracking — size and tracking do the work.
- Separate sections with hairline dividers (`border-line`), not boxes or shadows.
- Treat hover as a color shift (neutral → terracotta, terracotta → terracotta-strong) or the doorway-arrow slide. No scale transforms.
- Let the page breathe with `pt-20`+ top padding, a narrow reading column, and generous vertical rhythm.

**Don't**

- Don't add a second accent color. The brand has exactly one (terracotta). The old sky-blue prose scale is retired — do not reintroduce it.
- Don't bring back a serif. Inter covers prose, headings, and metadata alike.
- Don't make the chrome permanently dark. Sidebar and footer follow the active theme now.
- Don't bold prose headings past 600, and don't bold body text. Weight 700 is the wordmark only.
- Don't use shadows or gradients. Elevation is hairline dividers and position.
- Don't replace the strikethrough wordmark with a "cleaned up" version. The strikethrough *is* the brand.
- Don't introduce card-based layouts for posts. The list is typographic — a date, a title, a description, a divider. No tiles.
