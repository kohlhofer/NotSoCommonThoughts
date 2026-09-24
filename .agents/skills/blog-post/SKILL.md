---
name: blog-post
description: House rules for writing or editing a post on Not So Common Thoughts, starting from the five latest posts and Alex's voice skill. Use whenever a post in this repo is drafted, edited or prepared for publishing.
---

# Blog posts

## Before the first word

1. Read the five most recent posts in `src/content/blog/`, by the `date` in their
   frontmatter, in full. The voice drifts over time, and they show where it is now.
2. Load the `alex-writing-voice` skill. It owns the voice and the order of the humanizer
   pass. Where the recent posts and the skill disagree, follow the posts and tell Alex in
   one line, so the skill can catch up.

## Frontmatter

The schema is `src/content/config.ts`. A new post carries:

- `title`, and `description`: one sentence that works as the listing and meta text
- `date`: today, as `YYYY-MM-DD`, unless Alex gives another
- `tags`: two to four, see below
- `slug` in kebab-case, which sets the URL `/blog/<slug>`
- `image` when the post has a hero picture; `featured` and `unlisted` only when asked

Save it as `src/content/blog/YYYY-MM-DD-<slug>.md`.

## Tags

Use tags that already exist; list them with `grep -h '^tags:' src/content/blog/*.md*`.
A new tag only when Alex asks for one.

## Links

Link to earlier posts where the connection is real, usually one to three per post, never
forced. The path is `/blog/<slug>`: the post's `slug` field, or its filename without the
extension when it has none. Check the target exists. Link external sources where they are
quoted or relied on.

## Images

Files go in `public/images/<slug>/` and are referenced as `/images/<slug>/<file>`. Alt
text says what is in the picture.

## Publishing

A push to `main` publishes the site. Do not commit or push a post unless Alex asks;
`unlisted: true` keeps a live post out of the listings.
