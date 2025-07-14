---
title: "Building a Music Player: YouTube as a Backend"
description: "How I built a music player for kohlhofer.com that pulls from a YouTube playlist, fetches video backgrounds, and focuses on an integrated audio/visual listening experience."
date: 2025-03-12
useGenerativeThumbnail: true
slug: music-page-youtube
tags: ["Music", "Code", "Projects"]
---

The [music page](https://kohlhofer.com/music) on my site is a simple but effective way to share my electronic music. Instead of uploading tracks or managing files, I just maintain a dedicated playlist on YouTube. The site pulls in the latest videos from that playlist automatically.

I fetch the background image for each track using the YouTube API. The result is a dynamic, ever-changing backdrop that matches the currently playing video.

Users get a focused, centered experience: you can shuffle, play, pause, and skip tracks right from the page. No distractions, no clutter—just music and visuals, front and center.

[![Music player screenshot](/images/kohlhofer-music-screen.jpg)](https://kohlhofer.com/music?v=7MWWRs_Nyj8)

Another nice touch: the URL auto-updates as you play, allowing for deep linking to specific videos. That means you can share a direct link to any track—like [this one](https://kohlhofer.com/music?v=7MWWRs_Nyj8), which is a fairly early piece paired with a snapshot of a nice moment in France. 