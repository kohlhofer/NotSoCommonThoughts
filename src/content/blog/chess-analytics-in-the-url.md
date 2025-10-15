---
title: "How I Built a Serverless Chess Analytics Platform with Game Data in the URL"
description: "Building a free chess game analysis tool that stores everything in the URL—no servers, no databases, just instant analytics you can share with a link."
date: 2025-10-01
slug: chess-analytics-in-the-url
tags: ["Projects", "Code", "Chess"]
featured: true
---

After exploring URL-based state encoding with [RockOrPop.com](/blog/rock-or-pop), I wanted to push the concept further. What if you combined URL encoding with WebAssembly and chess analysis? Could you build a completely serverless analysis platform where the game state lives in the link and the chess engine runs entirely in the browser?

The idea seemed worth exploring. Chess analysis has a natural sharing problem—after a game on Chess.com, you often want to show someone a specific position or variation. The typical workflow is clunky: copy PGN, paste into a tool, navigate to the position, explore variations... and then you can't share that exact state. What if the entire analysis session could live in a URL, with all the computation happening client-side?

That's [dxc4.com](https://dxc4.com).

## Chess Analytics, No Account Needed

[dxc4.com](https://dxc4.com) is a **free chess game analysis tool** designed around a simple idea: your entire analysis session should live in the URL. Every move, every variation branch, every position—all encoded in a shareable link.

No sign-up. No database. No server storing your games. Just instant chess analytics that you can share with anyone.

![dxc4.com analysis interface](/images/dxc4-screenshot.png)

## The URL is the Database

The approach is simple: store the complete game state directly in the URL. When you analyze a game on dxc4.com, the URL updates to include all moves in the game, every variation branch you explore, your current position in the analysis, and the active branch you're examining.

It's like bit.ly for chess positions. The entire game state fits in your clipboard. Your brilliant tactics (and embarrassing blunders) can now live forever in a link.

This means when you **share chess games with a link**, the recipient sees exactly what you see—the same position, the same variations, ready to explore further. It's like sharing a Google Doc link, but for chess analysis.

Here's an example: [this link](https://dxc4.com/analyze?branches=eyJ2ZXJzaW9uIjoxLCJicmFuY2hlcyI6W3siaWQiOiJtYWluIiwibmFtZSI6Ik1haW4gTGluZSIsIm1vdmVzIjpbIk5mMyIsIk5mNiIsImM0IiwiZzYiLCJOYzMiLCJCZzciLCJkNCIsIk8tTyIsIkJmNCIsImQ1IiwiUWIzIiwiZHhjNCIsIlF4YzQiLCJjNiIsImU0IiwiTmJkNyIsIlJkMSIsIk5iNiIsIlFjNSIsIkJnNCIsIkJnNSIsIk5hNCIsIlFhMyIsIk54YzMiLCJieGMzIiwiTnhlNCIsIkJ4ZTciLCJRYjYiLCJCYzQiLCJOeGMzIiwiQmM1IiwiUmZlOCsiLCJLZjEiLCJCZTYiLCJCeGI2IiwiQnhjNCsiLCJLZzEiLCJOZTIrIiwiS2YxIiwiTnhkNCsiLCJLZzEiLCJOZTIrIiwiS2YxIiwiTmMzKyIsIktnMSIsImF4YjYiLCJRYjQiLCJSYTQiLCJReGI2IiwiTnhkMSIsImgzIiwiUnhhMiIsIktoMiIsIk54ZjIiLCJSZTEiLCJSeGUxIiwiUWQ4KyIsIkJmOCIsIk54ZTEiLCJCZDUiLCJOZjMiLCJOZTQiLCJRYjgiLCJiNSIsIk5lNSIsIktnNyIsIktnMSIsIkJjNSsiLCJLZjEiLCJOZzMrIiwiS2UxIiwiQmI0KyIsIktkMSIsIkJiMysiLCJLYzEiLCJOZTIrIiwiS2IxIiwiTmMzKyIsIktjMSIsIlJjMiMiXSwiZGl2ZXJnZW5jZVBvaW50IjowLCJwYXJlbnRCcmFuY2hJZCI6bnVsbCwiaXNBdXRvbWF0aWMiOmZhbHNlfV0sImFjdGl2ZUJyYW5jaElkIjoibWFpbiIsImN1cnJlbnRNb3ZlSW5kZXgiOjgwLCJtYWluQnJhbmNoSWQiOiJtYWluIn0=) takes you to a complete game by 13-year-old Fischer (Black).

## Why Serverless Matters

Most chess analysis tools run the engine on a server. That means infrastructure costs, API rate limits, and the need to manage user authentication to prevent abuse. For a free tool, this creates constant tension between providing good service and managing costs.

WebAssembly changes this equation entirely. Stockfish, one of the strongest chess engines in the world, can run directly in your browser. The analysis happens on your device, not on a server somewhere. This matters in several ways.

First, there are zero server costs for analysis. The tool can stay free indefinitely without worrying about scaling infrastructure or managing compute budgets. Second, there's no network latency—evaluation is instant because nothing leaves your device. Third, privacy is guaranteed—your games never get uploaded anywhere. And finally, once the page loads, it works offline.

The serverless architecture isn't just about cost savings. It fundamentally changes what's possible. Without server costs to worry about, I can focus on making the tool better rather than figuring out how to monetize it or limit usage.

## Getting Your Games In

The easiest way to start analyzing is to **import your Chess.com games directly** using [dxc4.com/import](https://dxc4.com/import). Just enter your Chess.com username, select the game you want to analyze, and you're ready to go. No need to manually copy PGN files or navigate through multiple screens.

For players who want to analyze games from other sources, you can paste any PGN directly into the analyzer. The interface supports exploring multiple variations without losing track of the main line, real-time engine evaluations as you navigate through positions, and keyboard shortcuts for quick navigation through game history.

## Try It Yourself

Head to [dxc4.com/import](https://dxc4.com/import), enter your Chess.com username, and start analyzing your games. Or paste any PGN at [dxc4.com](https://dxc4.com). When you find an interesting position or variation, copy the URL and share it.

No sign-up, no subscription, no friction. Just instant, shareable chess analysis.

Got a particularly brilliant game or a spectacular blunder? I'd love to see it—share your links on Twitter, Reddit, or wherever you discuss chess. I'm curious to see what positions people find worth sharing.
