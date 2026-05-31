/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      colors: {
        // Semantic tokens backed by CSS variables — flip automatically
        // under `.dark`, so no `dark:` variants are needed for these.
        paper: 'var(--bg)',
        surface: 'var(--surface)',
        'surface-alt': 'var(--surface-alt)',
        ink: 'var(--fg)',
        muted: 'var(--fg-muted)',
        subtle: 'var(--fg-subtle)',
        accent: 'var(--accent)',
        'accent-strong': 'var(--accent-strong)',
        line: 'var(--border)',
        'line-strong': 'var(--border-strong)',
      },
      typography: {
        DEFAULT: {
          css: {
            color: 'inherit',
            maxWidth: 'none',
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
