---
title: "Chaos Studies: Where Math Meets Music Meets Touch"
description: "Turning a fascination with strange attractors into an immersive audiovisual experience, from Playdate to iOS and macOS."
date: 2026-02-04
tags: ["Projects", "Music", "Design"]
featured: true
image: "/images/chaos-studies/hero.png"
---

Rotate your view and the bass slides behind you. Zoom in and the particles fill your screen. The attractor never repeats, but it never escapes either. It's hypnotic in a way that's hard to explain until you've sat with it.

What started as a [coding experiment with strange attractors](/blog/lorenz-attractor) is now available as [Chaos Studies](https://fieldbw.com/chaos-studies/) for iOS and macOS. An immersive experience that combines my interests in math, music, and art into a single interactive canvas.

<a href="https://fieldbw.com/chaos-studies/" target="_blank"><img src="/images/chaos-studies/hero.png" alt="Chaos Studies"></a>

## From Playdate to Full Power

The first version of Chaos Studies was built for the [Playdate](https://play.date/), a tiny handheld with a crank and a 1-bit display. That constraint forced me to think about what mattered most: the visual rhythm of particles tracing their deterministic-yet-unpredictable paths, and the physical delight of manipulating chaos with a crank. The computational demands of tracking and moving thousands of points exceeded what the delightful Lua language could handle, requiring a custom C module.

<img src="/images/chaos-studies/playdate.jpeg" alt="Chaos Studies on Playdate" width="400">

Porting to iOS and macOS meant shedding those healthy constraints. More raw power. Full color. Room for more parallel spatial audio. Multi-touch. The Metal rendering pipeline. But the core idea remained the same: give someone direct, tactile control over a chaotic system and let them feel its behavior.

## Nine Windows into Chaos

The app features nine strange attractors, each with its own character. The iconic Lorenz is restless, tracing its familiar butterfly wings. Rössler feels meditative, spiraling in toroidal bands. Halvorsen is architectural, exhibiting striking crystalline symmetry. Chen extends Lorenz into more turbulent territory. Each attractor required its own tuning until it felt right. Fast enough to see the dynamics unfold, slow enough to follow individual particle paths.

## Particles with Memory

Thousands of points trace paths through phase space. Each point starts hot—literally rendered in red—and gradually cools as it ages, creating trails that show where the system has been while emphasizing where it's going. When points grow cold enough, they drift outward and fade, replaced by fresh particles that continue the integration.

The recycling strategy took iteration to get right. Early versions replaced points randomly, which looked jittery. The final approach prioritizes replacing the coldest points first, creating smooth visual decay.

Metal handles the rendering across multiple pipelines.

<img src="/images/chaos-studies/iphone.jpeg" alt="Chaos Studies on iPhone" width="400">

## Sound That Moves Through Space

At its core is the cursor synthesizer—a real-time oscillator highlighting the current particle as it traces through phase space. Velocity controls the bass frequency (deliberately matching the Playdate version), vertical position adds harmonics, and a low-pass filter opens up with faster movement. The stereo field tracks your horizontal position.

Layered over this are seven music stems, each positioned in 3D space: tings float above, pad drones sit below, percussion anchors the front, bass line to the right, cello behind. As you rotate the camera, the stems pan and attenuate based on their new positions relative to your viewpoint. Headphones reveal the full effect—rotating the attractor literally rotates the soundscape around you.

The stems were composed on the OP-XY by Teenage Engineering (who also helped Panic design the Playdate hardware). I split the composition into spatial tracks specifically for this purpose.

The explosion and implosion effects layer multiple synthesized sounds with careful timing—details that took tuning to make the visual experience feel visceral. Getting the mix right across tiny built-in speakers and expensive headphones took more iteration than I expected.

<img src="/images/chaos-studies/ipad-dark-2.png" alt="Chaos Studies on iPad">

## Art for Art's Sake

There's no goal. No score. No puzzle to solve. Chaos Studies exists purely as an experience—[art that doesn't need to serve a purpose beyond itself](/blog/art-design-purpose). Something to sink into, manipulate, and watch unfold. It's the kind of project that might never have existed without the ability to explore ideas quickly enough that "just for the joy of it" becomes a reasonable justification. But that freedom doesn't replace the discipline of refinement—it just means you can afford to be ambitious about what you refine.

## A Convergence of Interests

Chaos Studies sits at an intersection. It harkens back to creating visceral experiences in the game industry. It taps into my knowledge of electronic music and sound synthesis. It draws on design at large and the craft of interactive software. And it touches on math and the philosophical implications of chaos.

## Try It

Chaos Studies is available on [the App Store](https://fieldbw.com/chaos-studies/) for iPhone, iPad, and Mac. Put on headphones. Manipulate the chaos. Let the sound move around you.

In a world optimized for engagement metrics and endless algorithmic feeds, software that simply asks you to slow down and explore feels like a breath of fresh air.
