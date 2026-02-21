---
title: "Building a Context Repository"
description: "A practical approach to making AI actually useful: translate your company knowledge into a structured, version-controlled repository that AI can reason from."
date: 2026-02-21
tags: ["Artificial Intelligence", "Code"]
featured: false
---

Everyone talks about context being critical for getting useful results from AI. This is a practical recap of how that has worked for me. The principles are solid, but you can implement them many ways. Here is one.

## The Approach

I used Claude Code to ingest a lot of company context and capture it as markdown files in a hierarchical structure. The process was straightforward. Reference existing resources. Have AI parse PDFs, slide decks, documentation. Connect to other systems via MCP. The key was translating everything into a repository of AI-readable (and human-readable) context.

It's rare that this information just sits around neatly organized. But AI can help sort through and structure it. Merging information from multiple sources. Removing duplication. Resolving inconsistencies. What would take weeks of manual work happens in hours.

## The Structure

The result includes:

**A strategy kit** covering core positioning, competitive advantages, ICPs and personas, use cases, proof points, markitecture, and pricing.

**Brand guidelines** with voice and tone, logo usage, colors, typography, and visual elements.

**A product kit** with detailed capabilities and API documentation.

This is what it looks like:

```
├── brand-guidelines/
│   ├── voice-and-tone.md
│   ├── logo.md
│   ├── colors.md
│   ├── typography.md
│   ├── visual-elements.md
│   └── ...
├── strategy-kit/
│   ├── core-positioning.md
│   ├── competitive-advantages.md
│   ├── product-suite.md
│   ├── icp-and-personas.md
│   ├── problem-positioning.md
│   ├── use-cases.md
│   ├── proof-and-customers.md
│   ├── markitecture.md
│   ├── pricing-and-packaging.md
│   └── ...
├── product/
│   ├── capabilities/
│   ├── api/
│   └── ...
└── output/
```

## Git as the Foundation

I put it all into a git repository. Version control for company knowledge.

I also had Claude Code add a static site generator so the content can be viewed and deployed in a human-friendly format. GitHub Pages works well for this. But the main payload is the set of markdown files covering all company essentials, organized in a logical file structure.

You can reference this repository as a submodule in another project, or simply use it as context when starting new work. Either way, everything AI generates from this point forward is informed by the precise context of the company.

## From Generic to Specialized

This is where the leverage appears. Results go from generic to highly specialized and relevant. On par with what long-time employees hold in their heads, often beyond it, because the AI can synthesize across all the documented context simultaneously.

Strategy documents. Product specs. Feature definitions. Marketing copy. All of it informed by the same coherent base of knowledge.

The generated outputs, when they are text, live in the same repository. I created an output folder. Now you can reference and iterate from that growing body of work. Fold insights back into the main context. The repository becomes a living system, not a static archive.

Pricing changes? Just tell AI what they are and have it apply the changes. No need to maintain this manually. Odd result? Ask for the source and update it as needed.

## A Reasoning Partner

All of this happens conversationally. You're not just generating documents. You're reasoning with a partner who holds all the relevant knowledge for your specific situation.

I use this constantly in my design process. AI generates entire workflows, diagrams, prototypes, and working code, all grounded on this foundation. Features can be scoped against real constraints. Positioning decisions can be pressure-tested against actual competitive dynamics.

**Context is the difference between generic output and genuinely useful work.** And because it lives in a shared repository that is agnostic to the LLM you use, anyone on the team can benefit. Claude Code? Codex? Cursor? You do you.

No need to buy into someone else's tool or tooling. This is all about you and your context. You don't need somebody else's opinionated PM or design tool. They just get in between you and outcomes.

---

**PS:** With MCP you could connect directly to existing systems, but clean, authoritative sources are rare. In practice, I use MCP to publish to those systems or pull in new information. Fast evolving space, but this workflow holds up.
