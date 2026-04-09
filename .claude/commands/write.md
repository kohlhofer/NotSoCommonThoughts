---
description: Generate a new blog post with proper style and formatting
---

Generate a new blog post based on the user's request. Follow these steps:

1. **Review the style guide**: Read `style.md` to understand the voice, tone, structure, and formatting patterns.

2. **Review recent posts**: Read the 3 most recent blog posts (by date) from `src/content/blog/` to ensure consistency with current writing style and format.

3. **Check existing tags**: Search through existing blog posts to identify all currently used tags. Only use existing tags unless the user specifically requests a new tag.

4. **Identify cross-linking opportunities**: While writing, look for opportunities to link to other relevant blog posts in the content.

5. **Generate the post** with:
   - Current date (2025-11-05) in the front matter
   - Proper YAML front matter (title, description, date, tags, featured flag if appropriate)
   - Slug in kebab-case format (YYYY-MM-DD-slug if needed)
   - Content matching the style guide
   - Cross-links to related posts where relevant

6. **Save the post** to `src/content/blog/` with an appropriate filename (use date prefix format: `YYYY-MM-DD-title-slug.md`)

Remember:
- Use existing tags only unless specifically asked to create new ones
- Follow the style guide patterns (first-person, reflective, short paragraphs, bold for key concepts)
- End with an open question or reflection
- Include cross-links to related posts when natural
