---
title: "Implementing LLMs.txt: Making Your Blog AI-Friendly"
description: "How and why I implemented the LLMs.txt standard to make this blog more accessible to AI tools."
date: 2025-05-23
slug: implementing-llms-txt
tags: ["Code", "Artificial Intelligence"]
---

In an era where AI tools increasingly help us interact with web content, making your website AI-friendly has become as important as making it human-friendly. Today, I implemented the emerging LLMs.txt standard on this blog to better serve both human readers and AI assistants.

## What is LLMs.txt?

The [LLMs.txt specification](https://llmstxt.org) is a proposed standard for helping Large Language Models (LLMs) better understand and interact with websites. Similar to how `robots.txt` guides search engines, `llms.txt` provides a structured way to present your content to AI tools.

The key difference is that while `robots.txt` tells bots what they can and cannot access, `llms.txt` helps AI tools understand your content more effectively by providing:
- A concise overview of your site
- Curated links to important content
- Clean, markdown-formatted versions of your content

## Why Implement It?

LLMs often struggle with complex HTML pages that include navigation, ads, and JavaScript. They have limited context windows and need content in a more digestible format. By implementing `llms.txt`, we help AI tools:

1. Quickly understand the purpose and structure of our site
2. Access content in a clean, parseable format
3. Make better decisions about which content is relevant
4. Provide more accurate assistance to users

## Implementation in Astro

Following the guide from [Scalable Developer](https://scalabledeveloper.com/posts/llms-txt-with-astro/), I implemented two endpoints in my Astro blog:

1. `/llms.txt` - A concise overview with links to all blog posts
2. `/llms-full.txt` - Complete content of all posts in markdown format

The implementation uses Astro's API routes and content collections. Here's a simplified version of the code:

```typescript
import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
    const posts = await getCollection('blog');
    
    return new Response(
        `# Not So Common Thoughts

> A personal blog about software development, technology, and various programming insights.

## Blog Posts

${posts.map(post => 
    `- [${post.data.title}](https://notsocommonthoughts.com/blog/${post.slug}/)`
).join('\n')}`,
        {
            headers: {
                'Content-Type': 'text/plain; charset=utf-8'
            }
        }
    );
};
```

You can see the results at:
- [/llms.txt](/llms.txt) - The concise version
- [/llms-full.txt](/llms-full.txt) - The complete content version

## The AI-Assisted Implementation

What makes this implementation particularly interesting is that it was created with the help of AI. Using Cursor, an AI-powered code editor, I was able to implement this feature with just three simple prompts:

> Can you generate LLMs txt as per these instructions: @https://scalabledeveloper.com/posts/llms-txt-with-astro/ 
> background on the format and purpose is here: @https://llmstxt.org

> Can you write a blog post about this work, including the why, the how? Include relative links to the resulting work and also to the two resources i gave you. Tag with "Coding", "Artificial Intelligence"

> please add a section to the post that reveals that my two prompts in cursor (as quotes) were

This meta-example perfectly illustrates the value of making content AI-friendly: by providing clear, structured content and documentation, we enable AI tools to help us implement new features more efficiently. The AI was able to understand the requirements, implement the solution, and even write this blog post about the process.

## Looking Forward

As AI tools become more integrated into our daily workflows, standards like `llms.txt` will play an increasingly important role in making web content more accessible and useful. This implementation is just the beginning - I expect we'll see more sophisticated ways of helping AI tools understand and interact with our content in the future.

For now, this simple addition makes my blog more accessible to AI assistants, coding tools, and other AI-powered services that might want to help users understand or work with my content.

If you're interested in implementing this on your own site, check out the [LLMs.txt specification](https://llmstxt.org) and the [Astro implementation guide](https://scalabledeveloper.com/posts/llms-txt-with-astro/). 