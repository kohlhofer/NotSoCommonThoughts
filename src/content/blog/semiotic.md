---
title: "Semiotic: A Ship's Console Out of a Cheap E-Ink Photo Frame"
description: "Four-colour e-ink can't show photos, so I gave a PicPak frame new firmware: a ship's console in the language of Alien, with my household as the crew."
date: 2026-09-14
slug: semiotic
tags: ["Projects", "Design", "Code", "Hardware"]
image: /images/semiotic/device.jpg
unlisted: true
---

The [PicPak](https://picpak.tech/) is a photo frame built on a panel that cannot show photos.

It is a 4.2 inch e-ink frame in black, white, yellow and red, with an ESP32-C3, a motion sensor, one button and a battery the maker says lasts about a year. The stock firmware is a Bluetooth photo frame driven from a phone app. None of it is badly made. It's the panel that can't do the job.

Colour e-ink draws flat colour well and mixed colour badly. A photograph comes out muddy and dithered, a gradient falls apart, and faces come out worst. Anything designed for a phone looks wrong on it, because everything designed for a phone assumes millions of colours and instant redraws. The seven-colour panel on my [videotext wall](/blog/videotext/) has this problem, and with four colours it is worse. A family photo on the PicPak comes out as a few blotches of red and yellow with grey dither in between.

I kept the panel and went looking for something it is good at.

![The PicPak frame on a wall, running Semiotic's Atmospheric Conditions screen: a yellow thermal placard, 86 degrees, and the next twelve hours as a row of hazard signs](/images/semiotic/device.jpg)

## Taking It Over

The chip inside is left open by the maker, so the firmware can be replaced and, with a backup, put back. [varanu5's open firmware](https://github.com/varanu5/picpak-tesserae-client) got to this hardware first and worked out the wiring; I built on that. How to back the frame up and flash it is in the README, along with the caveats: one unit tested, the way back not yet rehearsed, battery life unmeasured.

## Why a Ship's Console

A four-colour panel is good at signage: flat fields of black, white, yellow and red, big shapes and capitals. That is the palette of hazard placards, and the hazard placards I like best are Ron Cobb's semiotic standard for *Alien*, the pictograms and signs that make the Nostromo feel like a working vessel run by a company that cares about procedure and not much about the crew.

The slowness fits too. A console reports rather than scrolls, so a 16-second refresh is fine for a readout that changes once an hour. One button steps through five screens the way you'd page through a ship's status. The capitals-only pixel fonts (Jersey 10, Silkscreen and Big Shoulders Display, rasterised into the firmware) hold up at 400 by 300 pixels where a proper typeface would smear. I could have made another weather dashboard. With hazard signage as the language, a ship's console was the more interesting thing to make.

## The Five Screens

![Mode 1, Atmospheric Conditions: the current temperature with a hazard placard, and the next twelve hours](/images/semiotic/mode-1.png)

Atmospheric Conditions is the weather, from Open-Meteo: temperature, humidity, gusts, pressure and UV now, hazard placards for the next six hours and a strip for hours seven to twelve.

![Mode 2, System Updates: four headlines, each with a placard showing its age](/images/semiotic/mode-2.png)

System Updates is four headlines from any RSS feed (BBC World by default, because its headlines say what happened), each with an orbit placard showing how old it is.

![Mode 3, System Status: battery gauge and readouts for feeds, Wi-Fi, chip temperature, storage, firmware and attitude](/images/semiotic/mode-3.png)

System Status is the board reporting on itself: battery and its trend over a day, feed health, Wi-Fi signal, chip temperature, storage, firmware build, and which way up the frame is, read off the motion sensor.

![Mode 4, Orbital Tracking: the next visible ISS pass drawn on a sky scope, and the nearest asteroid this week](/images/semiotic/mode-4.png)

Orbital Tracking draws the next visible ISS pass on a sky scope, computed on the board from CelesTrak's orbital elements, beside the nearest asteroid this week from JPL, plus sunrise, sunset and the moon. Ten minutes before a pass the frame wakes on its own to show INTERCEPT IMMINENT, and again once it's over. The tests check the pass predictions against Skyfield.

![Mode 5, Crew Manifest: five crew cards with status, and the day's Special Order](/images/semiotic/mode-5.png)

Crew Manifest shows my household as a ship's crew. Each person has a rank and a schedule, so the card reads ON DUTY during work hours and HYPERSLEEP on a black placard at night. A rotating duty roster assigns the galley, the hydro bay, the cargo bay and sanitation among the humans. Pets get no duty and keep watch whenever no human is up. Every day carries one of 366 Special Orders, written as cheerful corporate memos about water, bedtime, pancakes and the moon.

## The Repo

The frame wakes once an hour, fetches, redraws and goes back to sleep. The firmware and the setup guide are at [github.com/kohlhofer/picpak-semiotic](https://github.com/kohlhofer/picpak-semiotic), AGPL licensed. It's a personal project, shared as it is for anyone else who owns one of these frames. Read the warning at the top before you flash anything. *Alien*, the Nostromo and Weyland-Yutani belong to 20th Century Studios; this is an unofficial homage.

It's the second e-paper display I've written firmware for this month, after the [videotext wall](/blog/videotext/). Both are small screens doing one calm thing in a visual language from a particular past, on panels whose limits suit it.

The panel is the same one that made a mess of our photos. Drawn as a crew, with the ISS on approach, the same family is something I keep looking at. How a thing makes you feel is part of what it's for.
