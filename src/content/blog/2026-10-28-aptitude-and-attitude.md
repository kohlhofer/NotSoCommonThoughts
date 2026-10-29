---
title: "How Do You Define an AI Agent?"
description: "The job title says what an agent is good at, never how it should work. Aptitude and attitude, Simon Wardley's two axes, put the right mindset at the right time."
date: 2026-10-28
slug: aptitude-and-attitude
tags: ["Artificial Intelligence", "Reflections"]
unlisted: true
---

I have been fascinated by a Simon Wardley idea about organisations, and I have been talking it over with my friend Aleksandar Simovic since. [Wardley named the split aptitude and attitude in 2014](https://www.swardleymaps.com/posts/2014-07-22-notes-on-organisation-aptitude-and-attitude): aptitude is the skill, and attitude is the kind of work a person thrives in. For an organisation, the attitudes are three.

His [doctrine chapter](https://medium.com/wardleymaps/doctrine-8bb0015688e5) gives the definitions:

- Pioneers "explore the never before discovered concepts, the uncharted land. They show you wonder but they fail a lot."
- Settlers "turn the half-baked thing into something useful for a larger audience."
- Town planners "take something and industrialise it taking advantage of economies of scale." "You trust what they build."

## The missing dimension

The same split is missing from how an agent is defined. Definitions start the same way everywhere: "You are a senior software engineer." That line is the aptitude. It does not say whether it is a pioneer, a settler or a town planner, and the model fills in the gap with its default, which is competent, unopinionated and in the middle of the range.

<figure class="not-prose" style="margin:2.5rem 0">
<svg viewBox="0 0 400 368" role="img" aria-label="Diagram: a grid with four columns of capability, senior engineer, UI designer, security engineer and data engineer, and three rows named for the people who best embodied each mindset: Wozniak the pioneer, Jobs the settler and Cook the town planner. A chip labelled 'You are a senior engineer' sits above the first column with a dashed band running down it and question marks in two of its cells, because the job title fixes only the column. Two cells are filled in terracotta: the Wozniak row times senior engineer, labelled innovate, and the Cook row times security engineer, labelled harden and scale. The axes are captioned mindset and capability." style="display:block;width:100%;max-width:460px;height:auto;margin:0 auto;font-family:inherit">
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
<text x="114" y="143" text-anchor="end" font-size="10.5" font-weight="600" fill="var(--fg)">Wozniak</text>
<text x="114" y="157" text-anchor="end" font-size="9" fill="var(--fg-muted)">pioneer</text>
<text x="114" y="209" text-anchor="end" font-size="10.5" font-weight="600" fill="var(--fg)">Jobs</text>
<text x="114" y="223" text-anchor="end" font-size="9" fill="var(--fg-muted)">settler</text>
<text x="114" y="275" text-anchor="end" font-size="10.5" font-weight="600" fill="var(--fg)">Cook</text>
<text x="114" y="289" text-anchor="end" font-size="9" fill="var(--fg-muted)">town planner</text>
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
<figcaption>The job title fixes the column. The task picks the cell. The rows are the three mindsets, named for the people who best embodied them.</figcaption>
</figure>

## Naming both

One line in the definition does it:

```
Aptitude: senior engineer. Attitude: town planner.
```

And the contract changes in both directions. A pioneer gets a question and owes you options, some of which may turn out wrong. A settler gets the rough thing that worked once and owes you the repeatable, tested version. A town planner gets the running system and its constraints and owes you something boring on purpose. Same senior engineer, three contracts.

You do not want a town planner when you are looking to innovate, and you do not need a pioneer when you are fixing a security or scaling problem. The row is picked by the work.

You can simply give an agent an aptitude. The same doesn't work for humans, which is why Wardley writes about staffing rather than prompting. With people, the failure looks like what Aleksandar calls [the flat line problem](https://simalexan.com/posts/the-flat-line-problem/): one rulebook across a prototype and a hardening job, and the engineers argue about process. Are you a pioneer, a settler, or a town planner?
