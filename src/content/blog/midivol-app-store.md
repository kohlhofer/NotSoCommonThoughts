---
title: "MIDI Volume Control: When the Solution Doesn't Exist, Build It"
description: "How a simple need—controlling my Mac's volume with a MIDI controller—led to building my first desktop app, now available on the App Store."
date: 2025-10-05
slug: midivol-app-store
tags: ["Projects"]
featured: false
---

I wanted to control my Mac's volume with a MIDI controller. That's it. A simple problem with what I assumed would be a simple solution.

I have a MIDI controller on my desk for music production. It has knobs and faders. My Mac has a volume. Surely, I thought, someone has already solved this. It's such an obvious use case—anyone with a home studio setup would want this.

[![MIDI Volume Control app](/images/midivol.png)](https://kohlhofer.com/midiVol/)

But when I searched, I found old forum posts, abandoned GitHub projects, commercial apps that did way more than I needed, solutions that required complex setup. Nothing simple. Nothing that just worked. So I built it.

## The Solution

With AI assistance, I built it faster than I would have thought possible even a year ago. [MIDI Volume Control](https://kohlhofer.com/midiVol/) does exactly what I needed—control both system and music volume with any MIDI controller using MIDI Learn for automatic mapping.

But I added two features that turned out to be more valuable than I expected. First, separate control for Apple Music volume. This means you can keep music playing at a lower level during meetings without killing it entirely, then easily bring it back up after. Second, handy sliders in the menu bar. I started this as a MIDI project, but I found myself using those menu bar sliders even more, especially when on the road.

It's my first desktop app. Ever. And I use it every single day, all day long.

[![MIDI Volume Control menu bar interface](/images/midivol-screen.png)](https://kohlhofer.com/midiVol/)

## Learning to Ship

Publishing to the App Store was its own education. The entire ecosystem—certificates, provisioning, App Store Connect, review process—was completely new territory. But now I know how to do it. I understand the process. I can ship desktop apps.

The app exists because I needed it. Publishing it meant learning the entire ecosystem. And now others can benefit from both the app and my willingness to navigate that learning curve.

## The Pattern

This follows the pattern I'm noticing in my work—identifying obvious gaps in my own workflow, being surprised they haven't been filled, and filling them. Sometimes the most valuable things you can build aren't the most complex or innovative. Sometimes they're just the obvious things that somehow don't exist yet.

The question isn't always *"What's possible?"* or *"What's innovative?"* Sometimes it's simply *"Why doesn't this exist yet?"*

And sometimes the answer is: *"Because you haven't built it yet."*

---

**P.S.** The MIDI controller I happen to use is the absolutely adorable [8mu by Music Thing Modular](https://www.musicthing.co.uk/8mu_page/). It's a tiny, eight-fader USB MIDI controller. You can buy it assembled from Reverb if DIY isn't your thing.

<img src="/images/8mu.jpg" alt="8mu MIDI controller" width="300" />
