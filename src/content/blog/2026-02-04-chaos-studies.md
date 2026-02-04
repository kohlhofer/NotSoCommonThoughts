---
title: "Chaos Studies: Where Math Meets Music Meets Touch"
description: "Turning a fascination with strange attractors into an immersive audiovisual experience, from Playdate to iOS and macOS."
date: 2026-02-04
tags: ["Projects", "Music", "Design"]
featured: true
unlisted: true
image: "/images/chaos-studies/playdate.jpeg"
---

What started as a [coding experiment with strange attractors](/blog/lorenz-attractor) is now available as [Chaos Studies](https://fieldbw.com/chaos-studies/) for iOS and macOS. An immersive experience that combines my interests in math, music, and art into a single interactive canvas.

<a href="https://fieldbw.com/chaos-studies/" target="_blank"><img src="/images/chaos-studies/hero.png" alt="Chaos Studies"></a>

## From Playdate to Full Power

The first version of Chaos Studies was built for the [Playdate](https://play.date/), a tiny handheld with a crank and a 1-bit display. That constraint forced me to think about what mattered most: the visual rhythm of particles tracing their deterministic-yet-unpredictable paths, and the physical delight of manipulating chaos with a crank. The computational demands of tracking and moving thousands of points exceeded what the delightful Lua language could handle, requiring a custom C module.

<img src="/images/chaos-studies/playdate.jpeg" alt="Chaos Studies on Playdate" width="400">

Porting to iOS and macOS meant shedding those healthy constraints. More raw power. Full color. Room for more parallel spatial audio. Multi-touch. The Metal rendering pipeline. But the core idea remained the same: give someone direct, tactile control over a chaotic system and let them feel its behavior.

## Sound That Moves Through Space

Then there's the audio. Each sound in Chaos Studies is positioned in three-dimensional space, corresponding to what's happening on screen. As you manipulate the attractor, rotating your view, zooming in and out, the soundscape shifts around you.

Some of the audio was pre-created but split into spatial tracks, composed on the [OP-XY](https://teenage.engineering/products/op-xy) by Teenage Engineering (who also helped Panic design the Playdate hardware). Other sounds are synthesized dynamically in response to the attractor's behavior. **The sounds are the system made audible.** Headphones reveal the full effect: audio that orbits, converges, and drifts just like the particles do.

<img src="/images/chaos-studies/iphone.jpeg" alt="Chaos Studies on iPhone" width="400">

## Art for Art's Sake

There's no goal. No score. No puzzle to solve. Chaos Studies exists purely as an experience. Something to sink into, manipulate, and watch unfold. It's the kind of project that might never have existed without the freedom that AI-assisted development provides: the ability to explore ideas quickly enough that "just for the joy of it" becomes a reasonable justification.

Most of the effort was spent refining the experience. Iterating. Honing. **The freedom that AI affords you to explore doesn't replace the discipline of refinement.** It just means you can afford to be ambitious about what you refine.

<img src="/images/chaos-studies/ipad-dark-2.png" alt="Chaos Studies on iPad">

## A Convergence of Interests

Chaos Studies sits at an intersection. It harkens back to creating visceral experiences in the game industry. It taps into my knowledge of electronic music and sound synthesis. It draws on design at large and the craft of interactive software. And it touches on math and the philosophical implications of chaos.

I only just experimented with making native apps like [MIDI Volume Control](/blog/midivol-app-store), and this feels like a logical next step. I am excited to take it further still. Sometimes the projects you build are preparation for the projects you don't know you're building yet. Chaos Studies feels like that. A convergence I couldn't have planned.

## Try It

Chaos Studies is available on [the App Store](https://fieldbw.com/chaos-studies/) for iPhone, iPad, and Mac. Put on headphones. Manipulate the chaos. Let the sound move around you.
