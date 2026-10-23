---
title: "The Puzzle Machine"
description: "An interactive drawing of how the 1,010 mate puzzles on dxc4.com were made, built with Ryan's Anatomy skill for Claude: three hoppers on compute, an LLM on tokens, and one inspection head that decides what ships."
date: 2026-10-23
slug: puzzle-machine
tags: ["Chess", "Artificial Intelligence", "Projects"]
image: /images/puzzle-machine/machine.jpg
---

[Anatomy](https://github.com/wheresryan22/anatomy) is a Claude skill by Ryan that explains an idea by building it as a physical object. Its one rule: "Don't draw boxes, arrows and labels. Invent a real, well-made physical thing whose working *is* the concept." A cache that skips work when nothing changed becomes a pin-tumbler lock that only turns when every pin matches.

The skill then has Claude build that object from dozens of small shaded parts in isometric SVG, make it move, and check its own work by zooming in on every joint. Ryan's [examples](https://skills.wheresryan.sh/anatomy) include a dial gauge, an arcade cabinet and a rocket engine on a test stand.

I asked it to draw the pipeline behind the [1,010 mate puzzles on dxc4](https://dxc4.com/puzzles). Press the buttons.

<iframe id="puzzle-machine" src="/figures/puzzle-machine/index.html" title="The puzzle machine: an interactive drawing of how the puzzles are made and proven" style="display:block;width:100%;height:760px;border:0" loading="lazy" allow="fullscreen" allowfullscreen></iframe>
<script is:inline>
  window.addEventListener("message", function (event) {
    if (event.origin !== window.location.origin || !event.data || event.data.type !== "puzzle-machine-height") return;
    document.getElementById("puzzle-machine").style.height = event.data.height + "px";
  });
</script>

## Three Hoppers and a Brain

Each hopper is one way of finding positions. Sparse setups put a few pieces around an exposed king. Random middlegames scatter pieces and pawns near both kings. Self-play takes a moment from a noisy game of Stockfish against itself. The middlegame hopper is the big one because it yields about 1.7 candidates per worker-minute; the other two yield 0.25.

The brain on the bench is the LLM composing a puzzle by hand: an idea, a key move, an answer to every defence. It runs on tokens, so it has a tank, and the tank runs dry if you lean on the button. The hoppers run on compute, and every cable lights up while its station works.

## The Inspection Head

Everything passes the same head. The probe in front is Stockfish's mate search, a quick look for any short forced mate. The head behind it is the exact solver: one pin per defence, and a puzzle ships only when every pin lights. A second key that also mates, or one defence that escapes, sends the tile to the shredder. The LLM's compositions skip the probe but not the head.

The trays at the end are the pick step. It drops duplicates, allows any one idea three times, spreads the puzzles across mate length, where the black king stands and what kind of move the key is, and proves every one again.

The pass and fail odds in the drawing are made up; the rest is how it works. The longer story, with the real numbers, is in [1,010 Checkmates, Each One Proven](/blog/proven-checkmates).

## The Build

The first version ran on its own, in a loop. I wanted to play with it, so it became four buttons, each dropping a puzzle the moment you press. After that the changes were mostly about what is fun to watch and what reads at a glance: a counter on every source, shredder and tray, a shape on each tile so you can tell where it came from, feeder belts so a busy line backs up instead of jamming, and a lid that flashes red when a feeder is full. The press became an inspection head with a hologram over it, the bins became shredders that throw sparks, and the LLM got a token tank once the hoppers had their compute cables and the brain had nothing.

The result is about 1,000 lines of JavaScript that place every part in isometric space and write plain SVG, with no images. The page is 75 KB over the wire.

In the real machine the tokens are the expensive part too, which is why the hoppers made 1,000 of the puzzles and the LLM made ten.
