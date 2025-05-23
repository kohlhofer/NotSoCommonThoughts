import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';

const posts = await getCollection('blog');

export const GET: APIRoute = async () => {
    return new Response(
        `# Not So Common Thoughts

> Not So Common Thoughts is a personal blog exploring the intersection of design, technology, and human creativity. Through thoughtful analysis and personal experiences, it examines how modern tools and AI are reshaping our approach to design, coding, and creative work, while maintaining a focus on the human elements of judgment, intuition, and meaningful decision-making. The blog combines design insights with reflections on work, creativity, and the evolving relationship between humans and technology.

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