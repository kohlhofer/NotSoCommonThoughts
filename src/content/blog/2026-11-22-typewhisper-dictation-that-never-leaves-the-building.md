---
title: "TypeWhisper, Dictation That Never Leaves the Building"
description: "TypeWhisper is system-wide dictation for the Mac, with workflows per app, a dictionary that learns and the models you choose, including your own. Open source and free to run."
date: 2026-11-22
slug: typewhisper-dictation-that-never-leaves-the-building
tags: ["Artificial Intelligence"]
image: /images/typewhisper-dictation-that-never-leaves-the-building/integrations-local.png
---

Hold a key, talk, and the words land in whatever field has focus, with the filler taken out. [TypeWhisper](https://github.com/TypeWhisper/typewhisper-mac) does that in any app on the Mac. [Wispr Flow](https://wisprflow.ai/pricing) does the same and does it well, with a weekly word limit on the free plan and $15 a month for Pro. TypeWhisper does it with the models you pick, including your own.

Most of what makes it useful sits around the dictation. Workflows reshape what you said depending on where you said it: a translation in one app, a tidier email in another, set per app or per website. A workflow can also have its own hotkey and work on the selected text instead of your voice. The dictionary fixes the names it keeps getting wrong and learns from the corrections you make. Snippets turn a short trigger into text, with the date or the clipboard filled in. Everything you dictated sits in a searchable history, and it transcribes audio and video files you drop on it, with subtitles if you want them.

<figure class="not-prose">
  <img src="/images/typewhisper-dictation-that-never-leaves-the-building/integrations-local.png"
       alt="TypeWhisper settings, the plugin picker filtered to the add-ons that run locally on the Mac"
       width="2524" height="1996" loading="lazy">
  <figcaption>The local half of the plugin picker: the engines and providers that run on the machine.</figcaption>
</figure>

You choose the model that hears you and the one that tidies the text. On the Studio both run on oMLX, whisper-large-v3-turbo and the Qwen the house already keeps loaded. Four machines use it now. Rainbow, my MacBook Air, dictates to the Studio over Tailscale, and a machine that cannot reach the Studio uses Apple's SpeechAnalyzer on the device, which is good enough to be the default.

It works really well. It is GPLv3, written by one German developer, Marco Hillger, who pushes to it almost every day. Running it is free, work use included. Premium adds sync between Macs, speaker detection and correction learning in other apps. I have not checked what the app does on the network by itself.

[Yogurt](/blog/yogurt-meeting-notes-without-a-bot) does the same for meetings, and its models never leave the computer it runs on.
