---
title: "Local Alternatives to Popular AI Services"
description: "Wispr Flow, Granola and Meta's Muse all run on someone else's computer. TypeWhisper, Yogurt and Nod do the same jobs on yours, open source and free."
date: 2026-11-22T12:00:00Z
slug: local-alternatives-to-popular-ai-services
tags: ["Artificial Intelligence"]
---

The popular AI services for dictation, meeting notes and errands all run on someone else's computer. Each of them now has an open source counterpart that runs on your own, and I have all three set up in the house.

For dictation, the counterpart to Wispr Flow is [TypeWhisper](/blog/typewhisper-dictation-that-never-leaves-the-building). Hold a key, talk, and the words land in the field with the filler taken out. On the Studio both the speech model and the cleanup model run on oMLX, and a machine that cannot reach the Studio uses Apple's SpeechAnalyzer. GPLv3, free to run.

For meeting notes, the counterpart to Granola is [Yogurt](/blog/yogurt-meeting-notes-without-a-bot). It records the call on the Mac and transcribes and summarizes it there too, with the models bundled in the app. MIT, free, and it cannot be pointed anywhere else.

For errands, the counterpart to Meta's Muse is [Nod](/blog/nod-a-personal-agent-on-a-computer-you-own). Muse keeps its virtual machine, your data and your logins in Meta's cloud. Nod runs its virtual machine on your computer, with the model you choose. Apache 2.0, free, and still a research preview: it has done one small job here and no errands yet.

The models have to fit the machine they run on. My own [eight bots](/blog/eight-bots-one-conversation) run on the same oMLX server.

All three are free to try. Start with the one that replaces something you already pay for.
