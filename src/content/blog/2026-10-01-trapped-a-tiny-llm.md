---
title: "I Trapped a Tiny LLM in a Tiny Device"
description: "A 25-million-parameter language model trained from scratch, squeezed into 16 MB, and running entirely on a $25 ESP32: no cloud, no internet, just battery-powered text generation."
date: 2026-10-01
slug: trapped-a-tiny-llm
tags: ["Projects", "Hardware", "Artificial Intelligence", "Code"]
image: /images/trapped-a-tiny-llm/dream.jpg
---

I trained a language model from scratch and squeezed it into a $25 ESP32 board with just 16 MB of flash.

It runs entirely on the device: no cloud, no internet, no retrieval. Unplug it from the wall and it keeps writing stories on battery power, generating around 2.5 words per second.

Most of what it writes is nonsense. Sometimes it stumbles into something unexpectedly beautiful.

I leave it running on my desk, and whenever I glance over it's telling itself another story.

It feels a little like watching something dream.

<figure>
  <video src="/images/trapped-a-tiny-llm/dream.mp4"
         poster="/images/trapped-a-tiny-llm/dream.jpg"
         autoplay loop muted playsinline
         aria-label="The board on a desk with a battery and a pen beside it, writing a sentence across its screen one word at a time"></video>
  <figcaption>Pen is there for scale.</figcaption>
</figure>

## Sixteen Megabytes

The board is a [LilyGo T-Display-S3](https://lilygo.cc/products/t-display-s3): an ESP32-S3 with two Xtensa cores running at 240 MHz, 512 KB of internal RAM, 8 MB of PSRAM and 16 MB of flash, paired with a 170×320 display.

There is no GPU. One core runs the model while the other updates the screen.

Everything it knows has to fit inside those 16 MB.

## Building on Earlier Work

None of this would have been possible without [slvDev/esp32-ai](https://github.com/slvDev/esp32-ai), which proved that a transformer could run on the ESP32 at all. The project provides the 4-bit quantization format, the C inference runtime, the trainer, and the deployment pipeline.

Building on that foundation, I trained an entirely new model from scratch on a fresh corpus and modified the generation pipeline so it could run continuously instead of stopping after a single completion.

The resulting model has 25.3 million parameters, almost all quantized to four bits. It fits into a 13.5 MB firmware image and generates text at around 2.5 words per second.

## Training

I trained the model from scratch on 1.204 billion tokens using an M3 MacBook. The full training run took 23.2 hours.

About a quarter of the training corpus consisted of synthetic stories.

That turned out to be a mistake.

The synthetic data leaned heavily toward first-person internet anecdotes, and the model learned that habit far more strongly than I expected. Fourteen of forty sampled generations began with some variation of:

> "A few years ago, I was scrolling through Reddit..."

Instead of sounding like fiction, it kept trying to sound like someone posting online.

To fix it, I continued training for another 180 million tokens using only literature and human-written stories.

That greatly reduced the problem, although traces of it still occasionally appear.

## Keeping It Talking

The model only has room for about 160 tokens of context, which it fills after roughly a minute.

To keep it generating indefinitely, I use the same idea as StreamingLLM: preserve a tiny anchor at the beginning of the context while sliding the rest of the window forward as it fills.

Generation begins with almost nothing: just the document separator token used during training.

I first tried giving it handwritten opening lines, but they quickly became grooves.

"I remember..." almost always became "...when I first moved to..."

Starting from a random word was even worse. The model often assumed it had landed in the middle of an existing document and began producing sentence fragments, metadata or other debris.

The solution was surprisingly simple: I force only the first word and let the model choose everything after.

After trying a handful of candidates, I found a few first-person openings that consistently led somewhere interesting.

> I saw the light from the sun, the light that I had seen through the mists of the past. The light of a new day. "Daddy," I said...

> I woke up on my bed, feeling the heat in my stomach. I was getting tired again. "What?" I asked, staring at the small room...

## The Build

The project took a handful of evenings and two overnight training runs. My coding agent wrote essentially all of the code.

There are still rough edges.

It occasionally produces things like `didn ' t`, residue from tokenizer artefacts that I cleaned out of the corpus too late. Another 180 million tokens helped, but they can't completely erase habits learned over the previous 1.2 billion.

Holding the side button puts it to sleep, which is the closest thing it has to an off switch.

Nothing it says is retrieved, ranked, served or logged. It just sits on my desk, making up stories until the battery runs out.

When the battery dies, it stops dreaming.
