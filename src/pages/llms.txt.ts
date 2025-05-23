import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';

const posts = await getCollection('blog');

export const GET: APIRoute = async () => {
    return new Response(
        `# Not So Common Thoughts

> A personal blog about software development, technology, and various programming insights.

This blog contains articles about software development, programming practices, and technology insights.

## Blog Posts

${posts
    .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime())
    .map((post) => {
        return `- [${post.data.title}](https://notsocommonthoughts.com/blog/${post.slug}/): ${post.data.description || ''}\n`;
    })
    .join('')}`,
        {
            headers: {
                'Content-Type': 'text/plain; charset=utf-8',
                'X-Robots-Tag': 'noindex, nofollow'
            }
        }
    );
}; 