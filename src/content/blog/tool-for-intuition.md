---
title: "A Tool for Intuition"
description: "LLMs stopped being bad at math by using a calculator. I spent a weekend turning Jev, a model that answers with a decision and a confidence and no reasons, into a tool for a regular LLM."
date: 2026-09-20
slug: tool-for-intuition
tags: ["Artificial Intelligence", "Code", "Reflections"]
---

LLMs were terrible at math. They still are. They just use a calculator now, along with a shell, a search index and whatever else the harness puts in front of them. Every gap got a tool.

Could there be a tool for intuition?

## Jev as a Tool

This weekend I played with two harnesses, OpenCode and pi.dev, and tried the new Jev System 1 model. I can see Jev being good for software applications, because it returns types instead of sentences. I had much more fun turning it into yet another tool for a regular LLM.

Jev writes no prose. It gives a lean between 0 and 1, or a choice with a probability on each option, and a confidence in its own answer. It answers fast and costs almost nothing.

It worked. I gave it six open questions from my [knowledge bases](/blog/2026-02-21-context-repository) and got six opinions back, two of them against decisions I had already written down. Asked whether my poster shop should sit on its own domain, it came back at 0.51 and rated its own confidence somewhere between low and medium, which is a model telling me it does not know.

```json
{
  "own_domain": { "type": "noul", "noul": 0.51 },
  "confidence": { "type": "score", "score": 1.19, "confidence": 0.2 }
}
```

## No Reasons Attached

The ponderous LLM hands its context over to Jev and very quickly gets a decision back, with a confidence attached. The LLM can act on the decision and weigh the confidence, but it would be hard pressed to explain why the answer is what it is. Jev does not explain, and has no way to.

It reminds me of human intuition. System 1 is [Kahneman's name](https://en.wikipedia.org/wiki/Thinking,_Fast_and_Slow) for the fast judgement that arrives before its reasons, with System 2 as the slow checking that follows, and a slow LLM asking Jev for a read is that split made literal. A practitioner will tell you in two seconds that the third option is wrong and then need ten minutes to explain how they know.

Jev is a permanent tool in my harness now, and I expect one in every harness soon. I am excited to watch my AI intuit.
