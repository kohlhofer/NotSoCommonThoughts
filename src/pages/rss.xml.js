import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection('blog');
  const sortedPosts = posts.sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime());

  return rss({
    title: 'Not So Common Thoughts',
    description: 'Not So Common Thoughts is a personal blog exploring the intersection of design, technology, and human creativity. Through thoughtful analysis and personal experiences, it examines how modern tools and AI are reshaping our approach to design, coding, and creative work, while maintaining a focus on the human elements of judgment, intuition, and meaningful decision-making. The blog combines design insights with reflections on work, creativity, and the evolving relationship between humans and technology.',
    site: context.site,
    items: sortedPosts.map(post => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/blog/${post.slug}/`,
    })),
    customData: `<language>en-us</language>`,
  });
} 