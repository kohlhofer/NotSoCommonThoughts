---
title: "Yogurt, Meeting Notes Without a Bot"
description: "Yogurt records your calls, names the speakers, writes the notes and answers questions across meetings, all on your own computer. Free, MIT, and no account."
date: 2026-11-22
slug: yogurt-meeting-notes-without-a-bot
tags: ["Artificial Intelligence"]
image: /images/yogurt-meeting-notes-without-a-bot/hero-desktop.webp
---

Granola takes meeting notes from the computer's own audio. The transcript comes from [Deepgram or AssemblyAI](https://www.granola.ai/security), the summary from OpenAI or Anthropic, and the notes are kept in AWS in the US. The free plan shows 30 days of history, and the next plan up is $14 a user a month.

[Yogurt](https://github.com/FrigadeHQ/yogurt) does the same work without leaving the computer. It is made by [Frigade](https://frigade.com), MIT licensed and free, for Mac, Windows and Linux, with no account.

It offers to record when a Zoom, Teams or Meet call starts, transcribes while people talk, and names the speakers. When the call ends it stops by itself and writes up the conversation together with any notes you added. It handles 99 languages and follows each side of the call in its own, even when someone switches mid-meeting. An old recording can go in as an MP3, M4A or WAV file and gets the same treatment.

<figure class="not-prose">
  <img src="/images/yogurt-meeting-notes-without-a-bot/hero-desktop.webp"
       alt="Yogurt on a desktop Mac, the meeting workspace with a recording in progress"
       width="2000" height="1216" loading="lazy">
  <figcaption>The meeting workspace, with a recording in progress.</figcaption>
</figure>

Ask works across meetings. "What did we decide about pricing?" gets an answer with links to the meetings it came from, and it can be asked of one meeting, a folder or all of them. Meetings sort into folders, search covers titles, notes and transcripts, and both notes and transcripts export as Markdown.

The models ship with the app and are picked for the hardware. A 16 GB MacBook Air gets the larger notes model. Unlike [TypeWhisper](/blog/typewhisper-dictation-that-never-leaves-the-building), it cannot be pointed at the Studio's models. It can act as an MCP server for other apps on the same computer, which is how OpenCode reads my meetings.

Try it on your next call. It is free, it installs with `brew install --cask frigadehq/yogurt/yogurt`, and it takes back a piece of data sovereignty that most of us gave away without noticing.
