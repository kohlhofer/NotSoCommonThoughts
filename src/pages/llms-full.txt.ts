import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';

const posts = await getCollection('blog');

export const GET: APIRoute = async () => {
    return new Response(
        `# Not So Common Thoughts - Full Content

> A personal blog about software development, technology, and various programming insights.

This file contains the complete content of all blog posts, sorted by date.

${posts
    .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime())
    .map((post) => {
        return `## ${post.data.title}

${post.data.description ? `> ${post.data.description}` : ''}

${post.body}

---

`;
    })
    .join('\n')}`,
        {
            headers: {
                'Content-Type': 'text/plain; charset=utf-8',
                'X-Robots-Tag': 'noindex, nofollow'
            }
        }
    );
}; 