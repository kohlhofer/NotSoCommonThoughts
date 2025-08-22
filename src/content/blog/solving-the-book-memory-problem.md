---
title: "Meet my books"
description: "How I built a personal book collection website to solve the frustrating problem of tracking what I've already read."
date: 2025-08-19
slug: solving-the-book-memory-problem
tags: ["Projects"]
featured: false
---

This weekend, I finally solved a problem that's been nagging me for years.

It started during a conversation about science fiction with a friend. We were discussing a novel when I caught myself saying, *"I think I've read that… but I'm not sure."* That moment summed up a recurring frustration.

Over time, I’ve read books in every format: physical shelves, Kindle downloads, Audible audiobooks, and library borrowings. But I never kept a consistent record of what I’d finished. And now I often can’t remember if I’ve read something, let alone when or what I thought of it.

So this weekend I built [kohlhofer.com/books](http://kohlhofer.com/books) as personal repository to catalog my reading.

![My book collection website](/images/books.png)

## The Technical Approach

Rather than manually entering everything, I leaned on automation. For physical books, I photographed my shelves and used AI to transcribe the titles and authors. To my surprise, it handled obscured spines and unusual fonts with decent accuracy. I’m still working through all my shelves, but the approach is proving effective.

The site itself is a static build that pulls from CSV files containing my book data. It organizes by category, author, and format, with search and filtering baked in. For the technically curious, [DeepWiki generated full documentation](https://deepwiki.com/kohlhofer/books) from the project files.

Why not just use Goodreads or Notion? In short: I wanted something lightweight, fast, and fully mine. No ads, no platform lock-in, just a flexible system I can grow however I like.

Looking ahead, I plan to expand it with stats about my reading habits: how many books per year, which genres dominate, and how my interests shift over time. Not all that data is in the CSVs yet, but adding it is just a matter of time.

## Speed

Sometimes the best projects are the ones you can build in a weekend and actually use right away. I barely glanced at the code and I think that is ok. 

Now, when someone asks if I’ve read a book, I can answer with confidence. As I add more shelves and collections, I’ll finally have a complete picture of my reading journey, one I can explore and learn from.

Just today, my daughter asked me about planetary mechanics for a story idea she was working on. Within seconds I pulled up *The Integral Trees* by Larry Niven, a novel full of wild orbital-worldbuilding sitting right there on the shelf. 