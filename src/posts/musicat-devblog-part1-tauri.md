---
slug: musicat-devblog-part1-tauri
title: "Musicat Devblog: Building a music player with Tauri + Svelte"
date: "2022-09-04"
tags: tauri,app,music,player,svelte
description: "Part 1 of the devblog for Musicat"
framework: "Tauri"
language: "Typescript"
author: "Slav"
published: false
---

I recently came across this framework called [Tauri](tauri.app), which is like Electron for building desktop apps, using a web frontend and a Rust backend. As a music nerd that still hoardes local files, I set out to build a cross-platform music player that I can use to manage my library and also as a playground to explore some new UX ideas. 

The main question I'd like to answer with this project is: 
# Can we build a desktop-quality music player using web technologies?
In this devblog, I'd like to see how close we can get in terms of:
- __UI/UX__. Windowing, integration with system UI, keyboard navigation and shortcuts
- __Performance__. How well it can handle importing, playing and managing music, even with thousands of tracks
- __Format support__. Music players need to support a lot of audio and metadata formats




## What I'm using to build Musicat:
- [Tauri](https://tauri.app) as the framework for packaging as a desktop app.
- [Svelte](https://svelte.dev) as the front-end framework.
- [Dexie](https://dexie.org) as the data storage, a wrapper around IndexedDB. 
