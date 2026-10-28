---
title: "Revisiting the world of Weewar"
description: "A free hex map generator brought Weewar, one of the first browser strategy games, back to me. What the generator does, and why I keep coming back to hex grids."
date: 2025-06-13
useGenerativeThumbnail: true
slug: revisiting-the-world-of-weewar
tags: ["Code", "Projects"]
---

Working on a little hex map generator brought Weewar back. It was a turn-based strategy game I created in the mid-2000s, among the earliest browser-based games. Thousands of players built on it, its open API supported academic research (into AI, no less), and the community generated countless maps. I have not touched anything from that world in a long time, and the generator pulled me straight back in.

## The Generator

The [hex map generator](https://kohlhofer.com/hex-map/) makes fantasy islands. Press the button and a new one appears: terrain across a hex grid, settlements placed where the land suits them, and roads routed between the settlements.

[![Hex map example 2](/images/hex-map-2.webp)](https://kohlhofer.com/hex-map/)

What it draws is a hexagon map in the classic tabletop style. Eight terrain types are generated — grassland, forest, mountains, hills, desert, swamp, brush and water — each with its own hand-drawn symbol rather than a flat fill. Rivers run down from the mountains to the sea. Settlements come in three sizes, cities down to villages, and every map gets a name.

It is a free online hex map maker aimed at D&D and the rest of tabletop, and at worldbuilding in general. The generation is fully random, so every press is a different island, and the map fills whatever screen it is in. Nothing is uploaded and nothing is stored: it runs in the browser, needs no account, and costs nothing. The code is [on GitHub](https://github.com/kohlhofer/hex-map), MIT licensed.

I find the mathematics of hex grids hard to let go of. The way hexagons tessellate, how movement and adjacency work, the elegance of it — a hexagonal grid is the shape strategy games want, and it is the reason Weewar's maps still live in my head.

## Remembering Weewar

At a time when browser games meant simple Flash animations or basic JavaScript, we built something rooted in modern web technology. It got a lot of attention in the Silicon Valley tech scene, which was otherwise pretty uninterested in the world of gaming. Anecdotes like tanking the productivity in the Flickr offices helped with that.

![Weewar game screenshot](/images/weewar.webp)

Weewar's success ultimately caught the attention of Electronic Arts, who acquired it — a validation that what we'd built had real value in the emerging world of web-based gaming. This also kicked off my second stint of living and working in the US.

## Fun Fact

Can you imagine that I started [Spreedly.com](https://spreedly.com) in part so we could collect payments in Weewar? The payment landscape back then was so fragmented and complicated that we ended up building our own solution just to handle subscriptions and premium features. What started as a necessity for our game eventually became a payment juggernaut transacting billions of dollars.

## Looking Forward

What surprises me most is that a little hex map generator rekindled my appetite for game development. There is something about hex grids, strategic thinking and building worlds that still calls to me after all these years. Maybe it is time to revisit that space — not to recreate Weewar, but to see what a modern web stack and a decade of experience can do.

You can [play with the generator yourself](https://kohlhofer.com/hex-map/) — every click is a new island, so there is no such thing as a bad one.

*For fellow Weewar veterans who might stumble across this — thank you for being part of that journey. The game is gone, but the maps it taught me are still in everything I build.*

*Updated 28 October 2026: added a section on what the generator does, and linked the code.*
