---
title: "1,010 Checkmates, Each One Proven"
description: "How Claude, Stockfish and an exact solver made 1,010 mate puzzles for dxc4.com: the model built the tools and picked the puzzles, the engines proved every one."
date: 2026-10-23
slug: proven-checkmates
tags: ["Chess", "Artificial Intelligence", "Projects"]
image: /images/proven-checkmates/puzzle.jpg
---

A chess puzzle is a promise. "White to play and mate in two" means exactly one first move works, and it works against every defence Black has.

There are now 1,010 of those promises on [dxc4.com/puzzles](https://dxc4.com/puzzles). Every one was checked by two programs, and both had to agree before it shipped.

<figure>
  <img src="/images/proven-checkmates/puzzle.jpg"
       alt="A puzzle page on dxc4.com: a chessboard on the left, and on the right the title Boden's crossfire, the line White to play and mate in two, buttons for Next puzzle and Open in analyzer, and a link to browse 1,010 puzzles"
       width="1280" height="720" loading="lazy">
  <figcaption>Puzzle No. 1, composed by Claude and proven by the solver.</figcaption>
</figure>

## Two Checkers

The first is a brute-force solver, a small Python program that plays out every legal move for both sides. Where Stockfish estimates, it proves: exactly one first move mates in time, and a mate exists after every defence. The second is Stockfish 19's mate search. If they disagree on the length or the first move, the puzzle is thrown out.

## Where the Model Fits

I built this with Claude Code. The first version asked a local model, Qwen, to propose positions and let the engine check them. It produced 78 puzzles, and most of them could be solved at a glance.

So I asked Claude for a different setup: give the model a workbench rather than a pipeline. It writes down a position, `pz judge` proves it in about two seconds, and `pz edit` moves a piece and judges again. When the verdict says two key moves work, it guards the second key's square. When the position mates too fast, it adds a defender. Ten puzzles came out of that loop, among them the Boden's crossfire above.

Ten is not a thousand, and every puzzle composed this way costs tokens.

## The Hunt

The other 1,000 came from the CPU. Worker processes generate positions three ways: sparse problem-style setups around an exposed king, light random middlegames, and noisy games of Stockfish against itself. Stockfish's mate search screens each position, and the solver proves the survivors. Random middlegames yield about 1.7 candidates per worker-minute. The problem-style ones yield 0.25, but they keep only quiet first moves with at least three different mates.

A final pick step drops duplicates and allows any one tactical idea at most three times. It spreads the puzzles across mate length, where the black king stands, and what kind of move the key is: a quiet move, a sacrifice, a capture or a check. Then it proves every puzzle again. Claude wrote the hunt and ran the pick, and it does none of the searching.

## On dxc4

There are 480 mates in two and 530 in three. You play White on the board and Black answers. A wrong move is refused and you try again. The home page has a puzzle of the day.

Every puzzle also opens in the [dxc4 analyzer](https://dxc4.com/analyze). Once you have solved it, the solution comes along as the main line, and you can explore the alternatives from there.

The Easier and Harder labels are estimates. They will stay rough until real solve times can calibrate them.

More on dxc4 itself, a free analyzer that keeps the whole game in the URL and runs Stockfish in your browser, is in [How I Built a Serverless Chess Analytics Platform](/blog/chess-analytics-in-the-url).
