---
title: "A Better Way to Define AI Agents"
description: "Personas define what an agent is good at, never its mindset. Aptitude and attitude, Simon Wardley's two axes, put the right mindset at the right time."
date: 2026-10-28
slug: aptitude-and-attitude
tags: ["Artificial Intelligence", "Reflections"]
unlisted: true
---

Most agent definitions start the same way: "You are a senior software engineer." The system prompt sometimes repeats it. One variant names a real person instead, banking on whatever the model absorbed of how they worked.

A persona sets one axis of a two-axis thing. It says what the agent is good at. It says nothing about how the agent should work, and the model fills the gap with its default, which is competent, unopinionated and in the middle of the range.

## Two axes

Simon Wardley [named the split in 2014](https://www.swardleymaps.com/posts/2014-07-22-notes-on-organisation-aptitude-and-attitude), in the context of how to staff an organisation, and it survives the move to agents. Aptitude is the skill — engineering, design, security, data. Attitude is the kind of work a person thrives in. His line from the [doctrine chapter of his mapping book](https://medium.com/wardleymaps/doctrine-8bb0015688e5): "There isn't such a thing as IT or finance or marketing but instead multiples of." I have been filing his work in a [knowledge base](/blog/self-managing-knowledge-base) since September, and the chapter is in it verbatim.

One aptitude, several attitudes. At the start of something "you might need the aptitude of engineering" in "a specific form i.e. agile engineering". Once the thing is industrialised, the same engineering "requires a focus on volume operations and removing deviation". Same skill, opposite behaviour.

His three attitudes are pioneers, settlers and town planners:

- Pioneers "explore the never before discovered concepts, the uncharted land. They show you wonder but they fail a lot."
- Settlers "turn the half-baked thing into something useful for a larger audience."
- Town planners "take something and industrialise it taking advantage of economies of scale." "You trust what they build."

The split makes sense for humans working together, and it works just as well for agents that are expected to work with humans.

## The persona

<figure class="not-prose" style="margin:2.5rem 0">
<svg viewBox="0 0 400 368" role="img" aria-label="Diagram: a grid with four columns of capability, senior engineer, UI designer, security engineer and data engineer, and three rows of mindset, pioneer, settler and town planner, whose sublabels read explore fail a lot, stabilise repeat and industrialise scale. A chip labelled 'You are a senior engineer' sits above the first column with a dashed band running down it and question marks in two of its cells, because a persona fixes only the column. Two cells are filled in terracotta: pioneer times senior engineer, labelled innovate, and town planner times security engineer, labelled harden and scale. The axes are captioned mindset and capability." style="display:block;width:100%;max-width:460px;height:auto;margin:0 auto;font-family:inherit">
<rect x="192" y="118" width="62" height="58" rx="8" fill="var(--surface-alt)" stroke="var(--border)"/>
<rect x="260" y="118" width="62" height="58" rx="8" fill="var(--surface-alt)" stroke="var(--border)"/>
<rect x="328" y="118" width="62" height="58" rx="8" fill="var(--surface-alt)" stroke="var(--border)"/>
<rect x="124" y="184" width="62" height="58" rx="8" fill="var(--surface-alt)" stroke="var(--border)"/>
<rect x="192" y="184" width="62" height="58" rx="8" fill="var(--surface-alt)" stroke="var(--border)"/>
<rect x="260" y="184" width="62" height="58" rx="8" fill="var(--surface-alt)" stroke="var(--border)"/>
<rect x="328" y="184" width="62" height="58" rx="8" fill="var(--surface-alt)" stroke="var(--border)"/>
<rect x="124" y="250" width="62" height="58" rx="8" fill="var(--surface-alt)" stroke="var(--border)"/>
<rect x="192" y="250" width="62" height="58" rx="8" fill="var(--surface-alt)" stroke="var(--border)"/>
<rect x="328" y="250" width="62" height="58" rx="8" fill="var(--surface-alt)" stroke="var(--border)"/>
<rect x="124" y="118" width="62" height="58" rx="8" fill="var(--accent)"/>
<rect x="260" y="250" width="62" height="58" rx="8" fill="var(--accent)"/>
<text x="155" y="151" text-anchor="middle" font-size="10" font-weight="600" fill="var(--bg)">innovate</text>
<text x="291" y="276" text-anchor="middle" font-size="10" font-weight="600" fill="var(--bg)">harden &amp;</text>
<text x="291" y="289" text-anchor="middle" font-size="10" font-weight="600" fill="var(--bg)">scale</text>
<text x="155" y="218" text-anchor="middle" font-size="12" fill="var(--fg-subtle)">?</text>
<text x="155" y="284" text-anchor="middle" font-size="12" fill="var(--fg-subtle)">?</text>
<rect x="120" y="112" width="70" height="202" rx="10" fill="none" stroke="var(--fg-subtle)" stroke-dasharray="3 4"/>
<rect x="70" y="12" width="170" height="24" rx="12" fill="var(--surface-alt)" stroke="var(--fg-subtle)"/>
<path d="M155 36 V112" fill="none" stroke="var(--fg-subtle)" stroke-width="1"/>
<text x="155" y="28" text-anchor="middle" font-size="10.5" font-weight="600" fill="var(--fg)">“You are a senior engineer”</text>
<text x="114" y="143" text-anchor="end" font-size="10.5" font-weight="600" fill="var(--fg)">Pioneer</text>
<text x="114" y="157" text-anchor="end" font-size="9" fill="var(--fg-muted)">explore, fail a lot</text>
<text x="114" y="209" text-anchor="end" font-size="10.5" font-weight="600" fill="var(--fg)">Settler</text>
<text x="114" y="223" text-anchor="end" font-size="9" fill="var(--fg-muted)">stabilise, repeat</text>
<text x="114" y="275" text-anchor="end" font-size="10.5" font-weight="600" fill="var(--fg)">Town planner</text>
<text x="114" y="289" text-anchor="end" font-size="9" fill="var(--fg-muted)">industrialise, scale</text>
<text x="155" y="328" text-anchor="middle" font-size="10" font-weight="600" fill="var(--fg)">Senior</text>
<text x="155" y="340" text-anchor="middle" font-size="10" font-weight="600" fill="var(--fg)">engineer</text>
<text x="223" y="328" text-anchor="middle" font-size="10" font-weight="600" fill="var(--fg)">UI</text>
<text x="223" y="340" text-anchor="middle" font-size="10" font-weight="600" fill="var(--fg)">designer</text>
<text x="291" y="328" text-anchor="middle" font-size="10" font-weight="600" fill="var(--fg)">Security</text>
<text x="291" y="340" text-anchor="middle" font-size="10" font-weight="600" fill="var(--fg)">engineer</text>
<text x="359" y="328" text-anchor="middle" font-size="10" font-weight="600" fill="var(--fg)">Data</text>
<text x="359" y="340" text-anchor="middle" font-size="10" font-weight="600" fill="var(--fg)">engineer</text>
<text x="257" y="358" text-anchor="middle" font-size="9.5" fill="var(--fg-subtle)">capability</text>
<text transform="rotate(-90 24 213)" x="24" y="213" text-anchor="middle" font-size="9.5" fill="var(--fg-subtle)">mindset</text>
</svg>
<figcaption>The persona fixes the column. The task picks the cell. The sublabels under each row say what that mindset gives you.</figcaption>
</figure>

A persona is a column on that grid. "Senior engineer" fixes what the agent is good at and leaves the row open, which is what the band and the question marks show. The model answers the one question it was asked, and the row is whatever its training defaults to. You only notice the mismatch when it hands you a hardening pass on something that needed exploring, or a pile of options when you needed a number.

## The rubric

The fix is to name both axes:

```
Aptitude: senior engineer. Attitude: town planner.
```

Now the contract changes in both directions — what you owe the agent as input and what it owes you back.

- **Pioneer.** Give it a question, not a spec. Ask for several approaches and expect some of them to fail. The output is options, and a few of them are wrong on purpose.
- **Settler.** Give it the rough thing that worked once. It finds the pattern, makes it repeatable, and writes the tests and the docs that let someone else run it.
- **Town planner.** Give it the running system and the constraints, the latency and the security and the budget. It tightens, measures, removes deviation. The output is boring on purpose, and that is the point.

Same senior engineer, three contracts.

## The right cell

The row is picked by the work. When you are looking to innovate you do not want a town planner, who optimises what exists when the job is to find what doesn't. When you are solving a security or scaling problem you do not need a pioneer. Pioneers "show you wonder but they fail a lot", and a security review is not the place for wonder. You want the attitude whose whole trade is removing deviation.

You can simply give an agent an aptitude. The same doesn't work for humans, which is why Wardley writes about staffing rather than prompting. What's yours?
