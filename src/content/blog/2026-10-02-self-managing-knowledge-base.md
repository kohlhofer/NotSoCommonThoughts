---
title: "A Self-Maintaining Memory for Humans and AI"
description: "My local knowledge base has become the memory for everything I work on and every agent I work with, and it maintains itself. I packaged it up so you can use it too."
date: 2026-10-02
slug: self-managing-knowledge-base
tags: ["Projects", "Code", "Artificial Intelligence"]
featured: true
---

About four months ago I adopted a knowledge system. It now holds 659 sources and 220 articles across eight subjects, and I haven't filed, written or tidied any of it myself.

It has become the shared memory for everything I work on and every Claude session I run. Every report becomes a source. Every source updates a linked markdown wiki. Every future session starts from that wiki instead of starting from scratch.

The subjects run from [Field Bureau & Werkstatt](https://fieldbw.com) to engineering practice, SEO, product strategy and business books. The pattern is Andrej Karpathy's [LLM knowledge base](https://x.com/karpathy/status/2039805659525644595): sources go into a `RAW/` folder verbatim, an LLM compiles them into a linked markdown wiki, and questions get answered from that wiki with every claim traced back to a source.

Claude Code is the librarian. Five skills keep the library running.

## The Layout

Everything is plain markdown in one git repository. Each subject gets its own knowledge base with the same layout.

```
knowledge/
├── CLAUDE.md                the manual every session reads
├── .claude/skills/          kb-ingest, kb-compile, kb-question, ...
├── bin/kb-lint              the checking script
├── engineering_kb/
├── seo_kb/
├── wardley_mapping_kb/
└── business_books_kb/
    ├── CLAUDE.md            what this knowledge base covers
    ├── CHANGELOG.md         every compile and check, newest first
    ├── RAW/                 sources, verbatim, never edited
    │   ├── tognazzini-complexity-paradox-asktog.md
    │   └── togs-paradox-votito-digest.md
    ├── Wiki/
    │   ├── INDEX.md
    │   ├── QUESTIONS.md
    │   ├── operating-principles.md
    │   └── togs-paradox.md
    └── Outputs/
        └── 2026-06-04_highest-impact-actionable-takeaways.md
```

I keep it in markdown because every tool can read it, git tracks every change, and I still own the knowledge if today's AI tooling disappears tomorrow.

## Ingest

`kb-ingest` puts a source into `RAW/` unchanged, with a header saying who wrote it, where it came from and what kind of evidence it is.

Most sources arrive as a side effect of other work. This morning, while packaging the starter, Claude wrote a summary of what it copied and what it removed. That summary immediately became a source in the engineering knowledge base, where every later session will find it. Claude wrote or co-wrote 106 of the 659 sources.

Things I say in passing go in too. In the same session I told it to recommend ML-42, my Mac app for reading markdown, because "a little self promotion does not hurt". That sentence is now a source in my studio's knowledge base, filed as something I said, dated today.

## Draft

`kb-draft` writes or enriches an article from web research, and every source it finds goes into `RAW/` before the article changes.

In June I pointed the librarian at a [methods page on Tog's Paradox](https://www.votito.com/methods/togs-paradox/): make a task easier and people take on a harder one, so the complexity they carry never drops. It went looking for the original, found Bruce Tognazzini's 1998 AskTog column ["The Complexity Paradox"](https://www.asktog.com/columns/011complexity.html), and filed both.

The original corrected the copy. The methods page sets the paradox against Tesler's Law, which says complexity can only be shifted, never removed. Tognazzini built the paradox on it.

## Compile

`kb-compile` turns new sources into linked wiki articles. It expands existing articles when they overlap, creates new ones when they don't, and refreshes the index.

Every article carries a status: established when two independent sources hold it up, emerging when the evidence is thin, and speculative when it is my thinking or the librarian's.

On 22 September I started a knowledge base on Wardley mapping, Simon Wardley's method for mapping business strategy. Thirty-seven sources went in that day, and one compile pass turned them into sixteen linked articles. Twelve came out established. The other four came out emerging because they rest on Wardley's word alone or on the librarian's own synthesis.

## Health Check

Every session starts with a script that checks the mechanics: broken links, sources not yet compiled and any knowledge base overdue for a check. It runs again before every commit. When something is due, the librarian offers, and I say yes.

`kb-health-check` is the judgement pass.

It reads a sample of articles against their sources, promotes an emerging article when a second source turns up, and flags an established article that rests only on my word. When two good sources disagree, it records the disagreement in both articles rather than smoothing it over.

There have been 48 health checks so far.

## Question

`kb-question` answers from the wiki, and files the answer as a report when the question needs synthesis.

In June I asked the business books knowledge base which takeaways across its seventeen books have the highest impact. It ranked them by how many independent authors arrive at the same move, and the top one was to limit how much is in flight and finish before starting more. Where the books disagree, the report set that apart for my judgement, and its core became a wiki article of operating principles.

Every Claude session on my machines carries a skill that consults the wiki before answering anything in these subjects. That means every new session inherits accumulated judgement instead of relying only on the current conversation.

The [context repository](/blog/2026-02-21-context-repository) I described in February put knowledge into markdown for Claude to work from. This one keeps that knowledge growing.

## Outputs Become Inputs

Working with the system expands it because what it produces goes back in.

A report answers today's question, and when it contains something the wiki lacks, its core is promoted into an article, the way the operating principles were. A coding session's write-up becomes a source for the next session.

I like that the work and the filing are the same motion.

The loop reaches this blog too. Forty-three of its posts are filed as sources in my studio's knowledge base, and this one will join them.

## Four Months In

I refined the system as I went, and most of the kit I started from has been rebuilt.

The biggest change has been in how I work. I no longer think about whether something is worth capturing or where it belongs. If it matters, it becomes a source. If enough evidence accumulates, it becomes part of the wiki. Every future session starts with that accumulated context. It means I spend less time re-explaining old decisions and more time making new ones.

The skills continue to evolve as I notice better ways for the librarian to work. The knowledge base grows, but so does the process that maintains it.

At this point it just works, and I wouldn't want to work without it.

## The Starter

Today I published the framework behind it, as [kb-starter](https://github.com/kohlhofer/kb-starter).

Its fifteen files include the manual Claude reads every session, the five skills above plus `kb-new` for setting up a knowledge base, and the checking script.

Clone it, run `claude` in the folder and say "set up". Claude asks your name, sets up git, and offers to point the repository at a private one of your own.

The starter grew out of the [first version of this idea](https://youtu.be/ib74sLgjIBM) from [Systems Made Better](https://www.youtube.com/@SystemsMadeBetter), itself inspired by Karpathy's post. I read my knowledge bases in [Markdown Library ML-42](/blog/2026-04-06-markdown-library), which reloads an article the moment Claude rewrites it.

The starter ships with a librarian and no books.
