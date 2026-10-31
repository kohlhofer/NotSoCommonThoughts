---
title: "The Knowledge Base Gets Semantic Search"
description: "The knowledge base gets semantic search: a 310 MB local embedding model, EmbeddingGemma 2 on llama.cpp, finds articles even when the words don't match."
date: 2026-10-31
slug: knowledge-base-gets-semantic-search
tags: ["Projects", "Code", "Artificial Intelligence"]
---

The [knowledge base](/blog/2026-10-02-self-managing-knowledge-base) I described in October maintains itself, but its search was grep. Grep is file-based: it finds the exact words you type, and the corpus rarely uses yours. Ask it how sure I am of an article and the result is empty, because the article says "Status: established, two sources".

For an agent, that miss costs a round-trip: another query with different words, the files it opens while checking, and the tokens all of it consumes.

## The Embedding Layer

The new part is semantic search. The model is [EmbeddingGemma 2](https://huggingface.co/google/embeddinggemma-2b), a 310 MB GGUF, Apache 2.0. [llama.cpp](https://github.com/ggml-org/llama.cpp) serves it locally on port 8199, launched detached, and a launchd agent restarts it within ten seconds if it dies.

The model reads words and writes out an embedding, a vector in a space where nearby vectors mean the same thing, with or without shared words. Documents are filed with the model's trained `title: … | text: …` prefix and questions arrive as `task: search result | query: …`, so both sides of a search live in the same space.

<figure class="not-prose" style="margin:2.5rem 0">
<svg viewBox="0 0 460 340" role="img" aria-label="Diagram in three rows. The top row is the five skills: kb-ingest, kb-draft, kb-compile, kb-question, kb-health-check, each with an arrow down. The middle row is the markdown library: a RAW/ box for verbatim sources and a larger box for Wiki and Outputs, 361 files of plain markdown in git, with an arrow from RAW to Wiki. The bottom row is a zone, the embedding layer, outside git, one per machine, containing a terracotta box for EmbeddingGemma 2, 310 MB running locally on port 8199, and a box for the index: 2,032 sections as vectors in a 12 MB SQLite file. An arrow from the library down into the zone is captioned: every section becomes a vector, re-filed after each compile. The kb-question arrow routes down the right side into the zone, captioned: asks by meaning. A dashed note at the bottom reads: grep stays for exact strings, links and filenames." style="display:block;width:100%;max-width:460px;height:auto;margin:0 auto;font-family:inherit">
<defs>
<marker id="kbarr" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
<path d="M0 0 L8 4 L0 8 z" fill="var(--fg-subtle)"/>
</marker>
</defs>
<text x="18" y="12" font-size="9" fill="var(--fg-subtle)">the five skills</text>
<rect x="18" y="20" width="80" height="30" rx="8" fill="var(--surface-alt)" stroke="var(--border)"/>
<text x="58" y="39" text-anchor="middle" font-size="9" fill="var(--fg)">kb-ingest</text>
<rect x="104" y="20" width="80" height="30" rx="8" fill="var(--surface-alt)" stroke="var(--border)"/>
<text x="144" y="39" text-anchor="middle" font-size="9" fill="var(--fg)">kb-draft</text>
<rect x="190" y="20" width="80" height="30" rx="8" fill="var(--surface-alt)" stroke="var(--border)"/>
<text x="230" y="39" text-anchor="middle" font-size="9" fill="var(--fg)">kb-compile</text>
<rect x="276" y="20" width="80" height="30" rx="8" fill="var(--surface-alt)" stroke="var(--border)"/>
<text x="316" y="39" text-anchor="middle" font-size="9" fill="var(--fg)">kb-question</text>
<rect x="362" y="20" width="80" height="30" rx="8" fill="var(--surface-alt)" stroke="var(--border)"/>
<text x="402" y="39" text-anchor="middle" font-size="9" fill="var(--fg)">kb-health-check</text>
<rect x="18" y="84" width="122" height="48" rx="10" fill="var(--surface-alt)" stroke="var(--border)"/>
<text x="79" y="104" text-anchor="middle" font-size="11" font-weight="600" fill="var(--fg)">RAW/</text>
<text x="79" y="120" text-anchor="middle" font-size="9" fill="var(--fg-muted)">sources, verbatim</text>
<rect x="166" y="84" width="276" height="48" rx="10" fill="var(--surface-alt)" stroke="var(--border)"/>
<text x="304" y="104" text-anchor="middle" font-size="11" font-weight="600" fill="var(--fg)">Wiki/ + Outputs/</text>
<text x="304" y="120" text-anchor="middle" font-size="9" fill="var(--fg-muted)">361 files, plain markdown in git</text>
<rect x="18" y="196" width="424" height="84" rx="10" fill="none" stroke="var(--border)"/>
<text x="30" y="214" font-size="10" font-weight="600" fill="var(--fg)">the embedding layer</text>
<text x="430" y="214" text-anchor="end" font-size="9" fill="var(--fg-muted)">outside git · one per machine</text>
<rect x="36" y="224" width="170" height="46" rx="10" fill="var(--accent)"/>
<text x="121" y="242" text-anchor="middle" font-size="11" font-weight="600" fill="var(--bg)">EmbeddingGemma 2</text>
<text x="121" y="257" text-anchor="middle" font-size="9" fill="var(--bg)" opacity="0.75">310 MB, runs locally</text>
<text x="121" y="269" text-anchor="middle" font-size="9" fill="var(--bg)" opacity="0.75">port 8199, restarts in 10 s</text>
<rect x="236" y="224" width="188" height="46" rx="10" fill="var(--surface-alt)" stroke="var(--border)"/>
<text x="330" y="242" text-anchor="middle" font-size="11" font-weight="600" fill="var(--fg)">The index</text>
<text x="330" y="257" text-anchor="middle" font-size="9" fill="var(--fg-muted)">2,032 sections as vectors</text>
<text x="330" y="269" text-anchor="middle" font-size="9" fill="var(--fg-muted)">12 MB SQLite file</text>
<path d="M58 52 V82" fill="none" stroke="var(--fg-subtle)" stroke-width="1.5" marker-end="url(#kbarr)"/>
<path d="M130 52 V82" fill="none" stroke="var(--fg-subtle)" stroke-width="1.5" marker-end="url(#kbarr)"/>
<path d="M230 52 V82" fill="none" stroke="var(--fg-subtle)" stroke-width="1.5" marker-end="url(#kbarr)"/>
<path d="M402 52 V82" fill="none" stroke="var(--fg-subtle)" stroke-width="1.5" marker-end="url(#kbarr)"/>
<path d="M316 52 V68 H448 V240 H442" fill="none" stroke="var(--fg-subtle)" stroke-width="1.5" marker-end="url(#kbarr)"/>
<path d="M140 108 H166" fill="none" stroke="var(--fg-subtle)" stroke-width="1.5" marker-end="url(#kbarr)"/>
<path d="M304 134 V194" fill="none" stroke="var(--fg-subtle)" stroke-width="1.5" marker-end="url(#kbarr)"/>
<text x="292" y="160" text-anchor="end" font-size="9" fill="var(--fg-muted)">every section becomes a vector</text>
<text x="292" y="174" text-anchor="end" font-size="9" fill="var(--fg-muted)">re-filed after each compile</text>
<text x="444" y="160" text-anchor="end" font-size="9" fill="var(--fg-muted)">asks by meaning</text>
<rect x="60" y="300" width="340" height="26" rx="13" fill="none" stroke="var(--fg-subtle)" stroke-dasharray="3 4"/>
<text x="230" y="317" text-anchor="middle" font-size="9.5" fill="var(--fg-subtle)">grep stays for exact strings, links and filenames</text>
</svg>
<figcaption>The five skills keep the library current. The embedding layer is a mirror of it, kept outside git and re-filed after each write; kb-question asks through it.</figcaption>
</figure>

The layer is a mirror of the markdown library. Every section of `Wiki/` and `Outputs/` — 2,032 of them across 361 files — is filed as a vector in a 12 MB SQLite file. There is no vector database: a question is ranked by brute-force cosine similarity against all two thousand vectors, about 0.1 seconds.

The mirror lives outside git, one per machine. The writing skills keep it current: `kb-compile` and `kb-draft` run `kb-index` after the commit, and it re-embeds only what that pass changed. `kb-index --status` says what is pending, and a full rebuild of the corpus takes 31 seconds on my M5 Max, 32 sections at a time.

## Asking

`kb-question` uses the layer whenever a question is a paraphrase: `kb-search` finds the articles by meaning, and the hits arrive with each article's Status and Provenance, which is how the answer is weighted. Exact strings, `[[links]]` and filenames still go to grep.

With `kb-question` answering on top of the retrieval, that is RAG, pointed at a markdown library instead of the open web.

The question no longer has to be phrased the way the article is.
