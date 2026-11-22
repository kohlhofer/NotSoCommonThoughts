---
title: "Nod, a Personal Agent on a Computer You Own"
description: "Nod chases invoices, preps your calls and cancels trials on real websites, from your own computer and with the model you choose. Open source, from n8n."
date: 2026-11-22
slug: nod-a-personal-agent-on-a-computer-you-own
tags: ["Artificial Intelligence"]
image: /images/nod-a-personal-agent-on-a-computer-you-own/hero-collage.jpg
---

Meta calls [Muse](https://about.fb.com/news/2026/09/introducing-muse-personal-ai-agent/) "the world's first personal AI agent built for everyone". It sends the email, books the trip and fills in the forms from a virtual machine in Meta's cloud, and that machine is also where your data and the logins for every service you connect are kept.

[Nod](https://github.com/n8n-io/nod) does the same kind of work from your own computer. It is a research preview from n8n Labs, released on 10 November: a separate app, no n8n account, Apache 2.0 and free. The model is whatever you give it, an API key, a ChatGPT plan or a local open model.

The errands on its page are the ones that eat an afternoon of tabs and logins: chase an invoice until it is paid, get money back from a subscription, turn client requests into Linear tasks, file the month-end paperwork, book the team offsite. It has its own browser, so it works on websites that have no integration at all. Every morning it can read your threads, your calendar and the client's latest news and write a one-page brief for each call. It drafts the reply you owe from your own pricing sheet and sends it after you say yes. It checks a page on a schedule and speaks up only when the price changes.

<figure class="not-prose">
  <img src="/images/nod-a-personal-agent-on-a-computer-you-own/hero-collage.jpg"
       alt="Nod's launch artwork: a ring of pink paper dots on layered sheets of torn graph paper"
       width="2000" height="1125" loading="lazy">
  <figcaption>Nod's launch artwork, from n8n.</figcaption>
</figure>

You talk to it in one conversation, in the app or on Telegram or WhatsApp, while several jobs run in the background. It remembers what you tell it: say once that Anna, not Bob, handles invoices, and it uses that from then on. It learns your writing style from sent mail, and it keeps the steps of a task and fixes them when a site changes. Every note it keeps can be seen, edited or deleted.

Not everything stays on the machine. App connections go through a service n8n hosts by default, usage data goes to n8n unless you switch it off, and Nod pauses when the computer sleeps. That is not a problem for me, since I run it on a Mac Studio that is always on.

The [eight bots](/blog/eight-bots-one-conversation) in the house run on the same Studio and take the other route. Nod asks a model whether I said yes. Frida, who handles my mail, has no way to send it.
