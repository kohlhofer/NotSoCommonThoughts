# Not So Common Thoughts

A modern blog built with Astro, featuring responsive design, category-based organization, and newsletter integration.

## Features

- 🎨 Modern, responsive design
- 📱 Mobile-first approach
- 🏷️ Category-based organization
- 📧 Newsletter integration (coming soon)
- 🌙 Dark mode support
- 📝 MDX support for enhanced content
- 🎯 SEO optimized

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/NotSoCommonThoughts.git
cd NotSoCommonThoughts
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The site will be available at `http://localhost:4321`

## Creating Content

Blog posts are written in Markdown or MDX and stored in the `src/content/blog` directory. Each post should include frontmatter with the following fields:

```yaml
---
title: "Your Post Title"
description: "A brief description of your post"
date: YYYY-MM-DD
tags: ["tag1", "tag2"]
image: "/path/to/image.jpg" # optional
author: "Your Name" # optional
---
```

## Deployment

This site is configured for deployment on GitHub Pages. To deploy:

1. Push your changes to the main branch
2. GitHub Actions will automatically build and deploy the site

## Customization

- Edit `src/layouts/Layout.astro` to modify the site layout
- Update `tailwind.config.mjs` to customize the theme
- Modify `src/content/config.ts` to change the content schema

## License

MIT License - feel free to use this template for your own blog!

```sh
npm create astro@latest -- --template minimal
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/withastro/astro/tree/latest/examples/minimal)
[![Open with CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/sandbox/github/withastro/astro/tree/latest/examples/minimal)
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/withastro/astro?devcontainer_path=.devcontainer/minimal/devcontainer.json)

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
