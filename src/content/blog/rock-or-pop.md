---
title: "Rock or Pop: A Cassette Mixtape Maker for YouTube Playlists"
description: "Rock or Pop turns any YouTube playlist into a cassette tape you can label, design and send as a single link. No log-ins, no algorithms, just intentional listening."
date: 2025-07-02
slug: rock-or-pop
tags: ["Projects", "Design", "Music"]
featured: true
---

I still buy and listen to tapes.

There's something about the physicality of it. You commit to an album, you go through the ritual of putting it in the player, and you can't skip around mindlessly. A friend once told me that listening to music on physical media like vinyl is paying homage to the artist. You get up and make a choice, and you handle and appreciate the cover and the art. It's an intentional act.

All of that is lost in a world of algorithmic streaming services.

The idea came when I revisited an old cassette web component I'd built years earlier. There is something magical about that interface: the way the tape spools, the click of the play button, the visible progress through a mixtape. I wondered whether I could bring that feeling to sharing music online. I had recently used the YouTube API for the [music page on my personal site](/blog/music-page-youtube/).

## A Mixtape From a YouTube Playlist

[Rock or Pop](https://rockorpop.com) turns a YouTube playlist into a cassette tape. You paste the playlist's link, give the tape a name, and pick one of 5 covers, 10 shell colours and 24 backgrounds. Then you send the link. Whoever opens it gets the same tape, ready to play, with the spools winding from one side to the other as the tracks go by.

It's the digital version of making someone a mixtape: personal, curated and visually distinct. The site has a guide to [making a digital mixtape](https://rockorpop.com/guides/make-a-digital-mixtape/), from picking a length to writing the label.

Using YouTube as the backend means I don't have to deal with copyright or piracy myself. The platform handles the licensing, and almost any song on YouTube can go on a tape.

## Tapes to Start With

A few tapes are on the site to play as they are or to use as a starting point: a long [Boards of Canada](https://rockorpop.com/tapes/boards-of-canada/) playlist, [80s German Synth](https://rockorpop.com/tapes/80s-german-synth/), and [An Afternoon's Electronica](https://rockorpop.com/tapes/an-afternoons-electronica/), ten short tracks made on Teenage Engineering's OP-Z and OP-XY. Each one has its own page, and sharing it shows that cassette in the preview.

## The Domain

I happened to have a fitting domain from years before: [rockorpop.com](https://rockorpop.com). I bought it for a different project, but the simple question captures music discovery and personal taste well.

## Under the Hood

The app is React and TypeScript on top of YouTube's IFrame player. Every tape is encoded in its link: the cover, the shell, the background, the label, the playlist and the track it starts on. There is no database, no account and no backend, and when someone opens a shared tape they see exactly what the sender made.

Link previews were the hard part. The site is static, so every link gets the same HTML, and the services that draw previews don't run the app. A shared tape could only ever preview as the homepage. The curated tapes now have pages of their own with a picture of their cassette, and a tape you design yourself previews as the homepage.

In October 2026 I went back to it with Claude Code for a review. We fixed labels that broke on a percent sign, made the spools follow what the player is actually doing, and gave the homepage words a search engine can read.

The technology is simple, which suits the thing.

## Design: The Art of Nostalgia

The covers, shells and backgrounds are made to bring back specific memories, from classic TDK-style covers to neon shells that feel distinctly 80s. I had a blast making them.

![A cassette with a neon-coloured cover](/images/tape_2.png)

The spools show progress too. As the playlist plays, one side empties and the other fills, so the tape tells you how far through the mix you are.

I kept the video player as small as I could while staying within YouTube's terms of service.

## Does Anybody Need This?

It's a statement about how we interact with digital media: slowing down, being intentional, and making things that feel human in an increasingly automated world.

The cassette works as a metaphor because everyone understands it. A mixtape means the care that goes into choosing the songs, the personal act of giving it to someone, and the literal linearity of tape.

[Make a tape](https://rockorpop.com) and send it to someone who matters. There's more about the project at [Field Bureau + Werkstatt](https://fieldbw.com/rock-or-pop/), alongside the [documentation](https://fieldbw.com/docs/rock-or-pop/getting-started).

*Updated 22 October 2026: tape pages, a guide to making a mixtape, and fixes to sharing.*
