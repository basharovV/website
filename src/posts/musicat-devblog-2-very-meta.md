---
slug: musicat-devblog-part2-very-meta
title: "Very meta. Reading and writing metadata tags (ID3, Vorbis)"
date: "2022-09-04"
tags: tauri,app,music,player,svelte
description: "Part 2 of the devblog for Musicat"
framework: "Tauri"
language: "Typescript"
author: "Slav"
published: false
---
Ay ay ay mi metadata...

In an ideal world, metadata would magically tell you everything you need to know about a piece of music, and the content would always be rich, meaningful and complete. 

In reality, we have some tags that we can write to files, lack of compatibility between file formats and no single source of truth to rely on. So the best we can do is to make sure our local library is properly tagged using the information we have. There's lots of software out there that let's you do this, but it's not the best experience. So let's build a metadata tagger into our music player. 

We have our basic library from the previous post: 

![Music library](/post-media/musicat-devblog-1/musicat-day1.jpeg)
