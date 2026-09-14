---
title: "Videotext: An E-Paper Wall Anyone Can Write To"
description: "A teletext-style e-paper wall my family and my agents can put a page on, and why a slow, flat-colour panel and a format from 1984 suit each other."
date: 2026-09-14
slug: videotext
tags: ["Projects", "Design", "Code", "Hardware"]
image: /images/videotext/screen-dark.png
unlisted: true
---

There is a small e-paper display on our wall now that looks like videotext from 1984. It shows one page at a time, big letters, seven colours, and it takes half a minute to change. Anyone in the house can put a page on it, and so can my coding agents. Building it was fun, living with it feels good, and the family likes it too. Most of that comes down to the format.

![A dark videotext screen titled Deploys, with an hourly bar chart and three services marked green, yellow and red](/images/videotext/screen-dark.png)

## Slow and Deliberate

Videotext (Ceefax or Teletext, depending on where you grew up) travelled in the spare lines of the television signal. A page was 24 rows of 40 characters, seven colours plus black, and blocky graphics where a picture was needed. You typed a three-digit page number on the remote and then you waited while the carousel of pages came round to yours. A few seconds, sometimes most of a minute. Then the page sat there until you asked for another.

If you used it, you remember the waiting. I think more now about the people who wrote for it. A page held a few hundred bytes, so the weather page was the weather, the news index was eight headlines, and whoever wrote it had to decide what mattered before typing a word. The grid did the layout for them.

It was slow, it never interrupted, and you went to it when you wanted something.

## The Panel Wants the Same Things

Colour e-paper has the same limits. The seven-colour panels take about 30 seconds for a full refresh, flashing through it, and they draw flat colour well and mixed colour badly. A photograph comes out muddy and dithered. A gradient falls apart. Anything designed for a phone looks wrong on them, because everything designed for a phone assumes millions of colours and instant redraws.

Most e-ink dashboards shrink a web page onto the panel anyway, muddy photos and all.

Videotext never asks the panel for any of that. Seven flat colours are the palette. Big letters on a fixed grid read from across the room and need no anti-aliasing. Block characters make charts and little pictures line up without blending. A format built around pages that sit still for a while is comfortable on a screen that can only change every half minute. The limits of 1984 and the limits of this panel are close enough that the old format fits the new screen with no adjustment.

I chose teletext because its limits are the panel's limits. I like the look too.

![A light videotext screen titled Weather, with a temperature chart and a short forecast](/images/videotext/screen-light.png)

![A videotext screen titled 9 days to the autumn equinox, with the sun's path across the sky drawn in block characters over a green horizon](/images/videotext/screen-equinox.png)

## A Wall for Anything

I started it to explore the hardware and the videotext idea. Since then it has shown, among other things, the weather, the headlines on a Sunday night, a countdown to the autumn equinox with the sun's path drawn in block characters, a reminder, a notice for whoever comes home next, and a chart someone wanted to look at for a while. Anything that fits on a page of 50 by 18 characters can go up.

The board does all of it on its own. It joins the WiFi and runs its own MCP server and HTTP API, so one `claude mcp add` connects Claude Code, and any other MCP client or a `curl` from a laptop works the same way. Four tools: show a page, preview one, read what's up, clear it. Every call returns a PNG of what the wall will draw, so an agent can check its work before committing to a 30-second refresh.

The format helps the agents as much as the panel. The title is one double-height line, the body is 14 rows, colour carries meaning (red needs a person, yellow is attention, green is fine, blue is information), and the sender chooses words rather than positions. Inside those limits an agent produces a readable page on the first try.

A page survives reboots and power cuts, and if several arrive during a refresh the board draws only the newest once it's done. The wall can't interrupt anyone.

![A videotext screen titled Sunday night headlines, with a block-character globe beside the top story and eight numbered headlines](/images/videotext/screen-news.png)

## The Build

It's firmware for the [Soldered Inkplate 6COLOR](https://docs.soldered.com/inkplate/6color/overview/), a 600 by 448 panel with an ESP32 behind it, drawn in the [Bedstead](https://bjh21.me.uk/bedstead/) font, which is built on the Mullard SAA5050 character set that drew the original pages. The first version was a Node relay on a computer serving pages to a board that polled it. It worked, but it meant one more process to keep alive. The second version moved everything onto the board. I wrote most of it with Claude Code in three days.

The firmware, the setup guide and a Claude Code skill that tells an agent when the wall is worth using are at [github.com/kohlhofer/inkplate](https://github.com/kohlhofer/inkplate), MIT licensed. It's a personal project, shared as it is for anyone with the same board. Back up your flash before you replace it; the README says how.

I've since done the same to a very different screen, a cheap four-colour photo frame that is now a [ship's console](/blog/semiotic/).

A page that changes slowly, in a format that only ever had room for what mattered, on a panel built for the same limits, is pleasant to have in the room. Form follows function, and how a thing makes you feel is part of the function.
