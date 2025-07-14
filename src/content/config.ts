import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    image: z.string().optional(),
    tags: z.array(z.string()).optional(),
    author: z.string().optional(),
    draft: z.boolean().optional().default(false),
    unlisted: z.boolean().optional().default(false),
    useGenerativeThumbnail: z.boolean().optional().default(false),
    featured: z.boolean().optional().default(false),
  }),
});

export const collections = {
  blog,
}; 