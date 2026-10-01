---
title: "I Trapped a Tiny LLM in a Tiny Device"
description: "A tiny language model I trained from scratch, running entirely on a $25 board with no cloud and no internet, and what it took to fit into 16 MB."
date: 2026-09-30
slug: trapped-a-tiny-llm
tags: ["Projects", "Hardware", "Artificial Intelligence", "Code"]
image: /images/trapped-a-tiny-llm/dream.jpg
---

I trained a 25 million parameter language model from scratch and got it running on a $25 ESP32 board with 16 MB of flash.

It runs entirely on the device: no cloud, no internet, no retrieval. Unplug it from the wall and it keeps going on battery, generating about 2.5 words a second.

Most of what it writes is nonsense. Sometimes it stumbles into something unexpectedly beautiful. I leave it running on my desk, and whenever I look over it's telling itself another story.

It feels a little like watching something dream.

<figure>
  <video src="/images/trapped-a-tiny-llm/dream.mp4"
         poster="/images/trapped-a-tiny-llm/dream.jpg"
         autoplay loop muted playsinline
         aria-label="The board on a desk with a battery and a pen beside it, writing a sentence across its screen one word at a time"></video>
  <figcaption>Pen is there for scale.</figcaption>
</figure>

## Sixteen Megabytes

The board is a [LilyGo T-Display-S3](https://lilygo.cc/products/t-display-s3): an ESP32-S3 with two Xtensa cores at 240 MHz, 512 KB of internal RAM, 8 MB of PSRAM and 16 MB of flash, behind a 170×320 display. There is no GPU. One core runs the model while the other updates the screen.

Everything the model knows and everything it does has to fit inside those 16 MB.

## What Fits

The model has 25.3 million parameters, almost all quantized to four bits. That fits into a 13.5 MB firmware image and runs at about 2.5 words per second.

I trained the model from scratch on 1.204 billion tokens using an M3 MacBook. The full run took 23.2 hours.

About a quarter of the training mix consisted of synthetic stories. That turned out to be a mistake.

The synthetic data leaned heavily toward first-person internet anecdotes, and the model learned the habit a little too well. Fourteen of forty sampled generations began with some variation of:

> "A few years ago, I was scrolling through Reddit..."

To fix it, I continued training for another 180 million tokens using only literature and human-written stories.

## Keeping It Talking

The model only has room for about 160 tokens of context, which it fills in after roughly a minute.

To keep generating indefinitely I use the same trick as StreamingLLM: keep a tiny anchor at the start of the context and slide the rest forward as it fills.

Generation starts with almost nothing: just the document separator token from training.

I first tried giving it handwritten opening lines, but they quickly became grooves. "I remember..." almost always turned into "...when I first moved to..." Starting from a random word was even worse, producing fragments and metadata because the model assumed it was already in the middle of a document.

The solution was to force only the first word and let the model choose everything after. I measured a handful of first-person openers that consistently led somewhere interesting.

> I saw the light from the sun, the light that I had seen through the mists of the past. The light of a new day. "Daddy," I said

> I woke up on my bed, feeling the heat in my stomach. I was getting tired again. "What?" I asked, staring at the small room.

## The Build

The runtime ended up being just under a thousand lines of portable C, with Arduino handling the board and display.

The project took a handful of evenings and two overnight training runs.

My coding agent wrote all of it, including the runtime, optimization work and profiling tools.

There are still rough edges. It occasionally produces things like `didn ' t`, residue from tokenizer artefacts I cleaned out of the corpus too late. Another 180 million tokens helped, but they cannot completely erase habits learned over the previous 1.2 billion.

Holding the side button puts it to sleep, which is the closest thing it has to an off switch.

Nothing it says is retrieved, ranked, served or logged.

It just sits on my desk, making up stories until the battery runs out.

When the battery dies, it stops dreaming.
