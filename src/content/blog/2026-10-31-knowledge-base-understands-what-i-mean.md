---
title: "My Knowledge Base Understands What I Mean"
description: "The follow-up to the self-maintaining knowledge base: a 310 MB model running locally turns questions and sections into vectors, so the base finds the article even when the words don't match."
date: 2026-10-31
slug: knowledge-base-understands-what-i-mean
tags: ["Projects", "Code", "Artificial Intelligence"]
---

For a month, the [knowledge base I described in October](/blog/2026-10-02-self-managing-knowledge-base) could only be searched the way a card catalogue can be: by the exact words on the card.

Ask it how sure I am of an article, and it comes back empty, because the article says "Status: established, two sources". Grep finds words. It does not find what I mean.

## One Model, Two Ways

The fix is a 310 MB model, [EmbeddingGemma 2](https://huggingface.co/google/embeddinggemma-2b), Apache 2.0, running on the machine that needs it. [llama.cpp](https://github.com/ggml-org/llama.cpp) serves it on port 8199, launched detached, and a launchd agent restarts it within ten seconds if it dies.

It does one thing. It reads words and writes out a single point of meaning. A question becomes one. A section of an article becomes one. Two points that sit close together are saying the same thing, even when they share no words.

<figure class="not-prose" style="margin:2.5rem 0">
<svg viewBox="0 0 460 400" role="img" aria-label="Diagram: a box labelled 'Your question, in your own words' sits top left, an arrow marked 1 · embed runs down to a terracotta box labelled 'EmbeddingGemma 2, 310 MB, runs locally, words in, one vector out'. An arrow marked 2 · all 2,032, about 0.1 s runs right from the model to a box labelled 'The index, 2,032 sections as vectors, 12 MB SQLite, outside git, one per machine, rebuild 31 s'. An arrow marked 3 · closest first runs up from the index to a box labelled 'The answer, closest sections first, each with Status, Provenance, Last-updated'. A box labelled 'Wiki/ and Outputs/, 361 files compiled from RAW/' sits in the middle and points at the index, captioned 'every commit re-embeds what it changed'. A dashed note at the bottom reads: grep stays for exact strings, links and filenames." style="display:block;width:100%;max-width:460px;height:auto;margin:0 auto;font-family:inherit">
<defs>
<marker id="kbarr" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
<path d="M0 0 L8 4 L0 8 z" fill="var(--fg-subtle)"/>
</marker>
</defs>
<rect x="20" y="28" width="150" height="54" rx="10" fill="var(--surface-alt)" stroke="var(--border)"/>
<text x="95" y="49" text-anchor="middle" font-size="11" font-weight="600" fill="var(--fg)">Your question</text>
<text x="95" y="65" text-anchor="middle" font-size="9" fill="var(--fg-muted)">in your own words</text>
<rect x="290" y="28" width="150" height="60" rx="10" fill="var(--surface-alt)" stroke="var(--border)"/>
<text x="365" y="46" text-anchor="middle" font-size="11" font-weight="600" fill="var(--fg)">The answer</text>
<text x="365" y="60" text-anchor="middle" font-size="9" fill="var(--fg-muted)">closest sections first,</text>
<text x="365" y="72" text-anchor="middle" font-size="9" fill="var(--fg-muted)">each with its Status,</text>
<text x="365" y="84" text-anchor="middle" font-size="9" fill="var(--fg-muted)">Provenance and Last-updated</text>
<rect x="20" y="268" width="150" height="64" rx="10" fill="var(--accent)"/>
<text x="95" y="288" text-anchor="middle" font-size="11" font-weight="600" fill="var(--bg)">EmbeddingGemma 2</text>
<text x="95" y="303" text-anchor="middle" font-size="9" fill="var(--bg)" opacity="0.75">310 MB · runs locally</text>
<text x="95" y="317" text-anchor="middle" font-size="9" fill="var(--bg)" opacity="0.75">words in, one vector out</text>
<rect x="290" y="268" width="150" height="64" rx="10" fill="var(--surface-alt)" stroke="var(--border)"/>
<text x="365" y="286" text-anchor="middle" font-size="11" font-weight="600" fill="var(--fg)">The index</text>
<text x="365" y="301" text-anchor="middle" font-size="9" fill="var(--fg-muted)">2,032 sections as vectors</text>
<text x="365" y="314" text-anchor="middle" font-size="9" fill="var(--fg-muted)">12 MB SQLite, outside git</text>
<text x="365" y="327" text-anchor="middle" font-size="9" fill="var(--fg-muted)">one per machine · rebuild 31 s</text>
<rect x="155" y="150" width="150" height="44" rx="10" fill="var(--surface-alt)" stroke="var(--border)"/>
<text x="230" y="168" text-anchor="middle" font-size="10.5" font-weight="600" fill="var(--fg)">Wiki/ + Outputs/</text>
<text x="230" y="183" text-anchor="middle" font-size="9" fill="var(--fg-muted)">361 files, compiled from RAW/</text>
<path d="M95 84 V264" fill="none" stroke="var(--fg-subtle)" stroke-width="1.5" marker-end="url(#kbarr)"/>
<text x="103" y="178" font-size="9" fill="var(--fg-subtle)">1 · embed</text>
<path d="M172 300 H286" fill="none" stroke="var(--fg-subtle)" stroke-width="1.5" marker-end="url(#kbarr)"/>
<text x="230" y="292" text-anchor="middle" font-size="9" fill="var(--fg-subtle)">2 · all 2,032, ~0.1 s</text>
<path d="M365 264 V92" fill="none" stroke="var(--fg-subtle)" stroke-width="1.5" marker-end="url(#kbarr)"/>
<text x="373" y="178" font-size="9" fill="var(--fg-subtle)">3 · closest first</text>
<path d="M283 196 L325 262" fill="none" stroke="var(--fg-subtle)" stroke-width="1.5" marker-end="url(#kbarr)"/>
<text x="220" y="212" text-anchor="middle" font-size="9" fill="var(--fg-muted)">every commit re-embeds</text>
<text x="220" y="225" text-anchor="middle" font-size="9" fill="var(--fg-muted)">what it changed</text>
<rect x="60" y="350" width="340" height="26" rx="13" fill="none" stroke="var(--fg-subtle)" stroke-dasharray="3 4"/>
<text x="230" y="367" text-anchor="middle" font-size="9.5" fill="var(--fg-subtle)">grep stays for exact strings, links and filenames</text>
</svg>
<figcaption>One model reads both ways. The index re-files itself after every write, so the base never searches last week's words.</figcaption>
</figure>

Every section of `Wiki/` and `Outputs/` — 2,032 of them across 361 files — is filed as a vector in a 12 MB SQLite file. That is the whole index. No vector database: a brute-force cosine over two thousand vectors takes about 0.1 seconds.

The index lives outside git, one per machine, because it is a build artifact, not knowledge. `kb-index --status` says what is pending, and a full rebuild of the corpus takes 31 seconds on my M5 Max, 32 sections at a time.

## The Writing Pass Keeps It Current

The model reads both directions with different prefixes: documents are filed as `title: … | text: …`, and questions arrive as `task: search result | query: …`. Same model, same space, both sides of the search.

That is what keeps the base self-maintaining. `kb-compile` and `kb-draft` re-embed the sections they changed, right after the commit. The index is never a snapshot of last week.

A hit comes back with the article's Status, Provenance and Last-updated attached, so the corpus grades its own confidence. An established hit from a source I can check reads differently from a speculative one.

## What It Changes

I no longer translate my question into the corpus's vocabulary before asking it. I ask the way I would ask a person, and the base answers the way it would if it understood me.

The agents I work with do the same: a question in, ranked sections out, every one traceable to an article, and the article to its sources. grep keeps its job — exact strings, `[[links]]` and filenames are still its problem. The index is for meaning.
