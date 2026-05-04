---
version: alpha
name: Not So Common Thoughts
description: A personal blog by A. Kohlhofer. Slate neutrals carry a dark-default reading surface, with a single red accent (red-400) as the brand voice — the same red that strikes through "Not So" in the wordmark.
colors:
  # Light surfaces
  background-light: "#ffffff"
  surface-light: "#f8fafc"
  surface-light-alt: "#f1f5f9"

  # Dark surfaces (slate-900 / slate-800 / slate-700)
  background-dark: "#0f172a"
  surface-dark: "#1e293b"
  surface-dark-alt: "#334155"

  # Code block background — slightly cooler than slate, evokes a terminal
  code-bg: "#1c2128"

  # Text — light theme
  on-light: "#0f172a"
  on-light-muted: "#475569"
  on-light-subtle: "#64748b"

  # Text — dark theme
  on-dark: "#cbd5e1"
  on-dark-muted: "#94a3b8"
  on-dark-subtle: "#64748b"

  # Borders & dividers
  divider-light: "#e2e8f0"
  divider-dark: "#334155"

  # Brand chrome accent — the strikethrough red. Wordmark, sidebar, footer, hover.
  primary: "#f87171"
  primary-hover: "#fca5a5"

  # Prose accent — sky blue, used for prose links and inline code only.
  # Currently residual from the Tailwind config "primary" scale; see "Don'ts".
  prose-link-light: "#075985"
  prose-link-dark: "#38bdf8"

typography:
  wordmark:
    fontFamily: Outfit
    fontSize: 1.5rem
    fontWeight: "700"
    lineHeight: "1"
    letterSpacing: "0.02em"
  display:
    fontFamily: Outfit
    fontSize: 2.25rem
    fontWeight: "400"
    lineHeight: "1.2"
  heading-lg:
    fontFamily: Outfit
    fontSize: 1.875rem
    fontWeight: "400"
    lineHeight: "1.25"
  heading-md:
    fontFamily: Outfit
    fontSize: 1.5rem
    fontWeight: "400"
    lineHeight: "1.3"
  heading-sm:
    fontFamily: Outfit
    fontSize: 1.25rem
    fontWeight: "400"
    lineHeight: "1.4"
  body:
    fontFamily: Outfit
    fontSize: 1rem
    fontWeight: "400"
    lineHeight: "1.7"
  body-sm:
    fontFamily: Outfit
    fontSize: 0.875rem
    fontWeight: "400"
    lineHeight: "1.6"
  body-xs:
    fontFamily: Outfit
    fontSize: 0.75rem
    fontWeight: "400"
    lineHeight: "1.5"
  emphasis:
    fontFamily: Outfit
    fontSize: 1rem
    fontWeight: "500"
  label-caps:
    fontFamily: Outfit
    fontSize: 11px
    fontWeight: "400"
    letterSpacing: "0.25em"
  serif-meta:
    fontFamily: Georgia
    fontSize: 0.75rem
    fontWeight: "400"
    lineHeight: "1.6"
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
  page-top: 64px
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

  sidebar:
    backgroundColor: "{colors.background-dark}"
    textColor: "{colors.on-dark}"
    padding: 32px
    width: 256px

  wordmark-base:
    textColor: "{colors.on-dark-muted}"
    typography: "{typography.wordmark}"

  wordmark-accent:
    textColor: "{colors.primary}"
    typography: "{typography.wordmark}"

  nav-link:
    backgroundColor: "transparent"
    textColor: "{colors.on-dark}"
    typography: "{typography.body-sm}"
    padding: 8px 0

  nav-link-hover:
    textColor: "{colors.primary}"

  nav-link-active:
    textColor: "{colors.primary}"

  link-inline:
    textColor: "{colors.primary}"
    typography: "{typography.body}"

  link-inline-hover:
    textColor: "{colors.primary-hover}"

  search-input:
    backgroundColor: "transparent"
    textColor: "{colors.on-dark}"
    typography: "{typography.body-sm}"
    padding: 6px 0

  mobile-menu-button:
    backgroundColor: "{colors.background-dark}"
    textColor: "{colors.on-dark}"
    rounded: "{rounded.md}"
    padding: 8px

  mobile-menu-button-hover:
    textColor: "{colors.primary}"

  post-list-item:
    backgroundColor: "transparent"
    textColor: "{colors.on-light}"
    typography: "{typography.body}"
    padding: 16px 0

  post-meta:
    textColor: "{colors.on-light-subtle}"
    typography: "{typography.body-xs}"

  post-meta-dark:
    textColor: "{colors.on-dark-muted}"
    typography: "{typography.body-xs}"

  category-label:
    textColor: "{colors.on-dark-subtle}"
    typography: "{typography.label-caps}"

  prose-strong:
    textColor: "{colors.on-light}"
    typography: "{typography.emphasis}"

  prose-heading:
    textColor: "{colors.on-light}"
    typography: "{typography.heading-md}"

  code-inline-light:
    backgroundColor: "{colors.surface-light-alt}"
    textColor: "{colors.prose-link-light}"
    typography: "{typography.code}"
    rounded: "{rounded.sm}"
    padding: 2px 4px

  code-inline-dark:
    backgroundColor: "{colors.surface-dark}"
    textColor: "{colors.prose-link-dark}"
    typography: "{typography.code}"
    rounded: "{rounded.sm}"
    padding: 2px 4px

  prose-link-light:
    backgroundColor: "transparent"
    textColor: "{colors.prose-link-light}"
    typography: "{typography.body}"

  prose-link-dark:
    backgroundColor: "transparent"
    textColor: "{colors.prose-link-dark}"
    typography: "{typography.body}"

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

  divider:
    backgroundColor: "{colors.divider-light}"
    height: 1px

  divider-dark:
    backgroundColor: "{colors.divider-dark}"
    height: 1px

  footer:
    backgroundColor: "{colors.background-dark}"
    textColor: "{colors.on-dark-muted}"
    typography: "{typography.body-xs}"
    padding: 32px 16px

  footer-meta:
    textColor: "{colors.on-dark-muted}"
    typography: "{typography.serif-meta}"

  footer-section-label:
    textColor: "{colors.on-dark-subtle}"
    typography: "{typography.label-caps}"

  surface-dark-alt-card:
    backgroundColor: "{colors.surface-dark-alt}"
    textColor: "{colors.on-dark}"
    rounded: "{rounded.lg}"
    padding: 16px
---

## Overview

Not So Common Thoughts is a personal blog by A. Kohlhofer — a long-running place to think out loud about design, technology, AI, chess, and the practice of building. The visual identity follows the writing: composed, candid, and quiet. There is room to read; there is one accent color; there is no chrome.

The site reads as **dark-by-default** even though both themes ship — chrome (sidebar, footer, mobile button) is always slate-900, and the reading surface flips between white and slate-900 with a subtle blue/purple radial wash. The chrome accent is **red-400** (`#f87171`) — the same red that strikes through "Not So" in the wordmark. That strikethrough is the brand's whole posture in one gesture: a quiet correction of the assumed.

Inside long-form posts, prose links and inline code currently use a separate **sky-blue accent** (`#0284c7` light / `#38bdf8` dark). This is residual from a default Tailwind starter palette and the design intent is to consolidate to red over time. Until then, treat it as a deliberate split: red owns the *site*, sky-blue owns the *reading surface*. Don't add a third color.

Typography is **Outfit** for everything (a humanist sans from Google Fonts), with system serif reserved for the footer copyright line — a small typographic wink at "this is a personal site, not a publication." Headings within prose are weight 400, not bold; bold is for inline `strong` and one or two key phrases per post, never decorative.

## Colors

The palette is built on Tailwind's **slate** family for neutrals and a single **red-400** accent. There are no other hues in the brand — the subtle radial gradients on the body sit at 1.5–2.5% alpha and are background atmosphere, not chroma.

- **Background, light (`#ffffff`)** — Pure white reading surface. The blog body when light theme is active.
- **Background, dark (`#0f172a` / slate-900)** — The sidebar, footer, mobile menu button, and the entire dark-theme reading surface. Slate, not black — it has a touch of blue and reads as comfortable rather than stark.
- **On-light (`#0f172a`)** — Reading text on white. Same value as the dark surface — slate-900 doubles as both the deep text color in light theme and the canvas in dark theme. (This is the reason the brand feels coherent: there are really only three values doing all the work.)
- **On-dark (`#cbd5e1` / slate-300)** — Reading text on dark.
- **On-light-muted / On-dark-muted (`#475569` / `#94a3b8`)** — Metadata, captions, secondary lines.
- **Primary (`#f87171` / red-400)** — The chrome accent. Used for: the "Common Thoughts" portion of the wordmark, the strikethrough on "Not So", category nav active/hover states, mobile menu button hover, the dot bullets in the footer "Explore" list, and footer-link hover. *Not* used for prose links.
- **Primary-hover (`#fca5a5` / red-300)** — Lighter red for hover on already-red elements.
- **Prose-link-light (`#0284c7` / sky-700)** — Inline links and inline `code` color in light theme. Used only inside `.prose` content.
- **Prose-link-dark (`#38bdf8` / sky-400)** — Same role in dark theme.

Strict rule: **one accent per region**. Chrome regions get red; prose regions get sky. Never mix the two within the same visual block.

## Typography

One face does almost all the work: **Outfit**, loaded from Google Fonts at weights 400/500/600/700.

- Body and prose: weight 400, comfortable line-height (~1.7).
- Prose headings (`h2`–`h6`): weight 400, *not* bold. The size hierarchy carries the structure; weight is reserved for emphasis.
- Inline `<strong>`: weight 500. A nudge, not a shout.
- Links: weight 500 in prose, color-only differentiation otherwise.
- Wordmark: weight 700 on "COMMON THOUGHTS" (uppercase, bold), with weight 400 strikethrough on "Not So". The single use of bold uppercase in the design.

Two accents in the type system:

- **Tracked-out small caps (label-caps, 11px, `0.25em` letter-spacing)** — Section labels in the footer ("EXPLORE", "FEEDS & DATA"). Used sparingly; never inside posts.
- **Serif (`serif-meta`, Georgia)** — The footer copyright line. The one place where serif appears, intentionally — it signals "this is a journal" without committing the rest of the site to a serif personality.

Code uses the system monospace stack (Menlo on macOS) — no custom mono is loaded. Inline code is red on a light slate tile; block code is slate-300 on a near-black `#1c2128` background, evoking a GitHub dark editor.

## Layout

The site is built around an **off-canvas right sidebar** that holds navigation, search, theme toggle, and a "random post" button. Main content occupies the rest of the viewport, capped at sensible reading widths.

- **Page gutters** — `px-4` mobile, `px-8` small, `px-12` md, `px-16` lg. Generous on desktop.
- **Reading max-width** — `max-w-5xl` for the footer; the prose itself is constrained by `@tailwindcss/typography`'s default measure.
- **Top padding** — `pt-16` mobile, `pt-20` desktop. A small, consistent breath between the top-left wordmark and the content.
- **Sidebar** — Fixed `w-64` on the right, off-screen by default (`translate-x-full`), slides in over the content. No persistent sidebar on desktop — the menu button is always the entry point.
- **Hero** — A mathematical illustration (prime number Goldbach loops on a logarithmic number line) sits at the top of the home page in `slate-300` (light) / `slate-600` (dark). It's quiet, monochromatic, and the only decorative element on the site.

The body has two soft radial-gradient washes at very low alpha — blue at center, violet at top-left. They are atmospheric only and should not be relied on for any structural definition.

## Elevation & Depth

Elevation is almost flat. There are no drop shadows on cards, no glassmorphism, and no layered surfaces in the reading area. The only "lifted" element on the page is the **mobile menu button** (top-right, fixed), which uses `bg-slate-900/80` with `backdrop-blur-sm` to read clearly over both light and dark content beneath.

The sidebar is also a "floating" element when open — fixed position, off-canvas slide-in, with a hard slate-900 background and no shadow. Its presence is about position and color contrast, not depth.

Code blocks lift slightly via their own background tone (`#1c2128` over either white or slate-900) and a small border radius, but no shadow.

## Shapes

The radius scale is small and conservative. Most surfaces use either no radius (the page itself, the sidebar, the footer) or `rounded-lg` (8px) for code blocks and prose images. There is one `rounded-md` (6px) on the mobile menu button.

- **`rounded-sm` (4px)** — Inline code tile. Just enough softness to feel like a tile, not a box.
- **`rounded-md` (6px)** — Mobile menu button.
- **`rounded-lg` (8px)** — Code blocks, prose images.
- **`rounded-full`** — The 1px×1px red dots used as bullets in the footer "Explore" list.

No `rounded-xl` or larger. Boxiness is part of the personality — the design feels typographic, not card-based.

## Components

### Wordmark

Two flavors, both at `Outfit 700 uppercase` for "COMMON THOUGHTS":

- **Top-left, on light or dark theme** — Single line, smaller. "<s>Not So</s>" in slate-400/500 (struck through), "Common Thoughts" in red-400. Followed by a small `text-[11px]` "About this site" link.
- **Sidebar, larger** — Two-line stacked. "<s>Not So</s>" on top in slate-300, "COMMON" / "THOUGHTS" stacked underneath in red-400 bold uppercase. This is the canonical wordmark; the top-left is its compact form.

The strikethrough is **part of the brand**. Never display "Not So" un-struck.

### Sidebar

Fixed right, `w-64`, `bg-slate-900`, `p-8 pt-16`. Off-canvas by default; slides in with `translate-x-full → translate-x-0` over 200ms. Closes on outside click, on link click, and on Escape. Contains: wordmark, search input (transparent with red bottom-border on focus), category nav, theme toggle, random-post button.

### Buttons

There are no traditional buttons in the brand. Interactive elements are styled as text links with hover-color shifts (slate → red), the mobile menu button, and ghost button-like elements in the sidebar (theme toggle, random-post). All use `text-xs` to `text-sm` Outfit, no fill, no border. Affordance is color, not shape.

### Search

A bare input with no enclosing card: `bg-transparent`, `border-b-2 border-slate-700`, focuses to `border-red-400`. A magnifying-glass SVG sits at left padding inside the input's space. Results appear in a `bg-slate-800` rounded panel below the input. The search itself is a quiet design move — discoverable but not prominent.

### Prose

Powered by `@tailwindcss/typography`'s `prose` class, with overrides:

- `prose img` → `rounded-lg`
- `prose a` → red-400 (light) / red-400 (dark)
- `prose code` (inline) → red-600 on slate-100 (light) / red-400 on slate-800 (dark), `rounded-sm`, small horizontal padding
- `prose pre` → `#1c2128` background, slate-100 text, `rounded-lg`, `p-4`
- `prose h2`–`h6` → `font-weight: 400` (override the default bold)
- `prose strong` → `font-weight: 500` (override the default 700), `color: inherit`
- `prose table` → bordered, alternating zebra rows on slate-50 / slate-800

### Footer

Full-bleed `bg-slate-900` with a `slate-800/60` top border. Inner container is `max-w-5xl`. Three columns on desktop (`2fr 1fr 1fr`), stacked on mobile: copyright in serif (Georgia, weight 400), an "Explore" list with red-dot bullets, and a "Feeds & Data" list (RSS, llms.txt). All footer text is `text-xs`, all interactive text hovers to red-400.

### Mobile menu button

Fixed `top-4 right-4`, `bg-slate-900/80`, `backdrop-blur-sm`, `rounded-md`, `p-2`, white icon. The single visible UI control on every page until the sidebar is opened.

## Do's and Don'ts

**Do**

- Use slate as the entire neutral palette. If you need a "lighter slate" or "darker slate", reach for an adjacent slate level before introducing a new color.
- Reserve red-400 for one role per view: a link, an active state, the wordmark accent. Never for decoration.
- Keep the strikethrough on "Not So" in the wordmark. Always. The strike is the brand.
- Use Outfit for everything except the footer copyright (serif Georgia) and code (system monospace).
- Set headings inside posts at weight 400 — let size do the work, not weight.
- Treat hover as a color shift only (slate → red, red → red-300). No transforms, no scale.
- Allow the page to breathe with `pt-16`+ top padding and generous horizontal gutters. Density is for sidebars, not for prose.

**Don't**

- Don't add a *third* accent color. The brand currently has two (red for chrome, sky-blue for prose links/code). Adding any green, orange, or yellow accent breaks the design. The eventual goal is to consolidate prose links and code to red and retire the sky-blue scale entirely — until that happens, keep sky-blue confined to inline `prose a` and `prose code` only.
- Don't bold prose headings. If a heading isn't reading, increase its size, not its weight.
- Don't use shadows. Elevation is achieved by tone (slate-900 over slate-800) or position (fixed/floating), not by drop shadow.
- Don't replace the strikethrough wordmark with a "cleaned up" version. The strikethrough *is* the brand.
- Don't let red appear more than once or twice per visible viewport. If two red elements compete, demote one to slate.
- Don't use Outfit weight 600 or heavier for body or prose. Reserve 700 for the wordmark only.
- Don't introduce card-based layouts for posts. The list is typographic — a date, a title, a description, a separator. No tiles.
