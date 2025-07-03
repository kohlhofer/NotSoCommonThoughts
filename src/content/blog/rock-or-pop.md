---
title: "RockOrPop.com: Turn Any YouTube Playlist into a Virtual Cassette"
description: "Turn any playlist into a customizable mixtape—no log-ins, no algorithms, just intentional listening."
date: 2025-07-02
slug: rock-or-pop
tags: ["Projects", "Design", "Music"]
---

I still buy and listen to tapes.

There's something about the physicality of it—the way you have to commit to an album, the ritual of putting it in the player, the way you can't just skip around mindlessly. A friend once told me that listening to music on physical media like vinyl is paying homage to the artist. You commit to it, you have to get up and make a choice, you handle and appreciate the cover and art. It's an intentional act.

All of that is lost in a world of algorithmic streaming services.

The inspiration for this project struck when I revisited an old analog cassette web component I'd built years earlier. There is something magical about that specific physical interface—the way the tape would spool, the satisfying click of the play button, the visual feedback of progress through a mixtape. I wondered if I could evoke that tactile, nostalgic feeling while sharing music online? (I had recently explored using YouTube APIs for sharing music on my [personal site](https://notsocommonthoughts.com/blog/music-page-youtube/).)

## Turn a YouTube Playlist into a Digital Mixtape

The concept was straightforward: create a web app that transforms YouTube playlists into virtual cassette tapes. Users could customize their "mixtapes" with different cassette designs, colors, and backgrounds, then share them with friends. It's the digital equivalent of making someone a mixtape—personal, curated, and visually distinctive.

Using YouTube as a backend has the added benefit that I don't have to deal with copyright and piracy issues myself. The platform handles all the licensing, and users can access virtually any song that's available on YouTube.

The cassette interface isn't just a gimmick; it's a deliberate choice to slow down our consumption of music. Instead of mindlessly clicking through tracks, users engage with their playlists through a familiar, comforting interface that encourages intentional listening.

## The Domain

It turned out I happened to have a fitting domain from years prior: [rockorpop.com](https://rockorpop.com). I had purchased it for a different project but it seems quite fitting as the simple question captures the essence of music discovery and personal taste.

## Under the Hood

The app uses React and TypeScript to integrate YouTube's API, managing state between player controls and cassette animations. Since it's a serverless static web app, social media previews are generated dynamically—each cassette configuration creates a unique Open Graph image for sharing.

## The Social Aspect: Sharing Mixtapes

Every cassette configuration is encoded in the URL, making sharing as simple as copying a link. This approach eliminates the need for databases, user accounts, or complex backend systems. When someone opens a shared mixtape, they see exactly what the creator intended—the same design, the same playlist, the same vibe.

In a sense the technology itself is simplistic which seems quite fitting for the application.

## Design: The Art of Nostalgia

The app features 5 cassette cover designs, 10 shell colors for personalization, 24 background styles to set the mood, and custom tape labels. They all are made to evoke specific emotions and memories, from the classic TDK-style covers to vibrant neon shells that feel distinctly 80s. I had a blast making it all.

![Neon cassette design](/images/tape_2.png)

The cassette animations are more than just visual flair—they provide meaningful feedback about playback state. Tape spooling indicates progress through the playlist.

I have strived to reduce the prominence of the video player while still being compliant with the YouTube terms of service. 

## Does anybody need this?

It's a statement about how we interact with digital media. It's about slowing down, being intentional, and creating experiences that feel human in an increasingly automated world.

The cassette metaphor works because it's universal—everyone understands the concept of a mixtape, the care that goes into selecting tracks, the personal nature of sharing music and the literal linearity of tape. 

Rock or Pop? is live at [rockorpop.com](https://rockorpop.com). Try making your own mixtape and share it with someone who matters.

What's your cassette aesthetic? Are you a classic TDK person, or do you prefer the neon vibes?