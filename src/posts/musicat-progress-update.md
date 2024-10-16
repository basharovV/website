---
slug: musicat-progress-update
title: "Progress update on Musicat"
date: "2024-10-10"
tags: musicat,progress
description: "Part 4 of the devblog + finding the perfect side project"
author: "Slav"
published: true
focus: true
---

<callout>
<small>
If you just want to see the list of features,&nbsp;<a href="#features">skip to the end of the post</a>
</small>
</callout>

I'm sure programmers can relate that doing programming as a hobby isn't exactly the first thing on one's mind after a long day of work... programming. It's especially hard to make it feel as relaxing as going for a walk, or sitting on the sofa watching a movie, while also being stimulating and creative. I think I managed to find that sweet spot with Musicat - it blends my two worlds quite nicely, the programming sessions make me want to _keep tinkering_, and I get to listen to music while doing it. Sometimes I'll go off on tangents and build experimental features that don't really belong in a music player, other times I'll come back to the core functionality and polish things. It's all part of the fun.

I've incentivised myself to incorporate my local music into my daily listening (thus keeping my userbase active!). That was one of the reasons for even starting this project - to re-connect with my music library in the age of streaming. And the app is pretty much always open, so even when I'm not actively working on it, I'm taking notes on things to add or change. Or you know, just listening to some Erroll Garner.

Let's have a look at some notable achievemenets and learnings from the past year of building Musicat:

### Canvas everywhere

Initially I implemented the library as a standard HTML `<table>`, but I quickly understood the importance of keeping the amount of DOM elements to a minimum and started looking for solutions to improve performance. Earlier this year I discovered [Konva](https://konvajs.org/docs/svelte/), and tried re-writing the library view in it, which turned out to be a huge boost for the app's UI performance, especially on large libraries with thousands of songs. Now the library is drawn on a canvas, only the visible rows are rendered, and scrolling is fast.

<img src="/post-media/musicat-devblog-4/canvas.webp"  />

I also used `<canvas>` for the oscilloscope in the bottom bar, the scrolling song title marquee effect, and to implement a crossfade animation on the album artwork.

### Responsive design on desktop

At one point I got quite immersed making the app responsive (i.e be useful in all window sizes), and I wanted to go further than the typical few CSS breakpoints and make the app feel like it smarly adapts as you resize it, hiding extra panels, shifting UI elements and keeping only what's necessary. You can even resize it all the way down to a mini-player<tooltip-note content="To achieve this look, use keepOnTop with set_decorations(false) in Tauri" />. I think it's quite cool that all of these screenshots are the same app:

<img src="/post-media/musicat-devblog-4/screenshot-miniplayer.webp" style="width: 250px" />
<img src="/post-media/musicat-devblog-4/screenshot-small.webp" style="width: 260px" />
<img src="/post-media/musicat-devblog-4/screenshot-medium.webp" style="width: 510px" />
<img src="/post-media/musicat-devblog-4/screenshot-complex.webp"  />

It's interesting that a music player is one of the few types of app that can morph into all these different sizes, in both software and hardware - remember the iPod shuffle _without any physical controls_? Goes to show that at the end of the day we just want to play our music, all the bells and whistles are extra. Do I really need to be digesting a Wikipedia article about an artist while I'm listening to them? Or organise my library on a world map based on the artist's origin country? Not really, but it's fun to go down these rabbit holes, even if most of the time you just want to press play and forget.

## Artist's toolkit

I finally came back to this feature.
Why it exists: When I write music, most of it happens at an instrument, or in the DAW. But there's also an organisational element that is not captured in any specific tools, and that is - being able to manage my musical ideas and songs I'm working on, lyrics, chords progressions, riffs, etc. The Artist's Toolkit is a rough implementation of this idea - the UI is split into the _scrapbook_ (for storing ideas), and the _songbook_ (for writing songs and storing recordings).

### Folder sync

When I hacked together the Artist's toolkit in the early days, I didn't like that all the data was stored in IndexedDB, but the recent re-visit makes me want to use it much more. The songbook and the scrapbook are now just folders on your hard drive, which the app can read from and write to<tooltip-note content="The songbook expects a folder structure like /songbook/[artist]/[song]/[song].txt"/>. Lyrics and chort charts are just plain .txt files. You can take those files anywhere, or delete the app and everything will stay where it was. Think of the Artist's toolkit as a hyper-focused file explorer for artists, with a lyric/chord editor for songwriters. For added peace of mind, I recommend using a Dropbox / cloud storage folder as your songbook/scrapbook location.

<img src="/post-media/musicat-devblog-4/artists-toolkit-explain.webp"  />

### Lyrics & chords viewer/editor

I stumbled upon the [ChordMark](https://chordmark.netlify.app/) format, which allows defining song sections via Markdown-like syntax, and embeds some rhythmic information like bar separators, chord duration and time signature. I think it's a happy medium between the charts you see on Ultimate Guitar (no bars or durations, just chords above lyrics), and the jazz charts on iReal Pro (which don't have lyrics). You can change the font size, and make it full screen for easier viewing.

To make rendering these charts even neater, I've added the 'align 1st chord' option which vertically aligns the start of each line according to the where the first chord is, not the lyric. The charts can be transposed up/down a semitone, and there are 5 view options available: Lyrics with chords, Lyrics only, Chords only, Chords with 1st line, and Structure. This is actually quite useful for learning songs in a band context - the singer might only be interested in the lyrics, and the bassist in the chords/structure.

# The stack

-   Svelte as frontend framework
-   IndexedDB via Dexie for database
-   Symphonia, cpal for audio playback
-   WebRTC for streaming viz data
-   Tauri for Rust - JS IPC, packaging as desktop app

## Tauri

I must admit that the Tauri framework shifted my perspective on desktop apps. The hybrid Rust + JS approach works very well, and encourages developers to treat the Javascript side as the presentation layer, and offload heavy work and I/O to the Rust "backend". This is really evident in the development experience - when I change something in the JS layer, Tauri hot-reloads the Svelte app, but since nothing changed in the Rust code - music keeps playing :) Generally I've become much fonder of Rust in the last few months. During the course of development, I would find myself refactoring features (eg. medatada reading/writing) by simply re-writing them in Rust and using Tauri's commands for IPC between the layers.

<p style="text-align: center;">
<img src="/icons/cd6.gif" style="width:40px;"/>
</p>

Over the past year, I've learned about a whole deal about audio decoding and playback, dealt with the intricacies of audio file tagging, played around with WebAudio, WebRTC, IndexedDB, got better at drawing on the HTML5 Canvas. I got interested in the semantic web and extracting data from the public domain, as well as using public APIs like Internet Archive and Wikipedia / DBPedia. Started actually learning Rust<tooltip-note content="Instead of blindly copying from ChatGPT"/>, cpal, Symphonia and Objective-C bindings to macOS APIs. I got comfortable with dealing with audio at the sample-level, applying FFTs, using ring buffers, and became obsessed with gapless playback. Stopped designing features in Figma - instead I began to code as soon as I came up with something. All in all, I enjoyed getting my hands dirty in things I have no idea about - it made me a better developer.

I'm really happy with how the app is turning out, and I'm looking forward to 1.0 in the not-too-distant future. Next on my radar is probably support for DSP plugins (EQ, pitch shifter, time stretching).

<p id="features">I hope you enjoyed my ramblings 👾 I'll try to document the app better and make a website for it soon. Until then, here's a full list of features so far:</p>

-   Gapless playback. Only between files of the same sample rate and codec.
-   Switchable audio device, or follow system default
-   Audio file tagger (ID3, Vorbis), with bulk edit support
-   Album grid view
-   Smart Playlists and smart playlist builder using condition blocks
-   Waveform view with looper, marker support
-   Stats view with listening insights, album timeline
-   Wiki view for displaying a Wikipedia article of an artist, making connections to existing music in library
-   Artist's Toolkit with scrapbook for rough ideas, and songbook with lyrics viewer and editor
-   Map View for displaying your whole music library on a map based on artist's origin country (uses Wikipedia)
-   Internet Archive browser for the most popular collections on archive.org (uses Internet Archive API)
-   Lyrics view (uses Genius API, requires API key)
-   Playback queue with 2 modes: custom queue or 'same as library'
-   That small oscilloscope visualizer in the bottom bar. Getting this working was a proud moment, as I had never done FFT or WebRTC stuff in the past - the viz data is streamed from the Rust end to JS end via WebRTC DataChannels.
-   Tags, for organising songs by tags eg. "guitar". Tag cloud for easy filtering in library
-   Artwork fetched from file, otherwise from folder (from list of filenames)
-   Customizable library columns (re-order, hide)
-   Mini-player with configurable location
-   Collapsible sidebar
-   Fully resizable / responsive
-   Shuffle
-   Playlists
-   Integration with macOS Now Playing
-   "Open with" file explorer association
-   Favourite tracks
-   Recently added playlists

<callout>
<p>
other Musicat devblogs:
<a href="/blog/building-music-player-tauri-svelte">part 1</a>,
<a href="/blog/the-problem-with-music-metadata">part 2</a>
<a href="/blog/musicat-road-to-gapless">part 3</a>
</p>
</callout>
