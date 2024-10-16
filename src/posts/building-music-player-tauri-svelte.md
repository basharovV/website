---
slug: building-music-player-tauri-svelte
title: "Building a music player with Tauri + Svelte"
date: "2022-09-04"
tags: tauri,app,music,player,svelte
description: "Part 1 of the devblog for Musicat"
framework: "Tauri"
language: "Typescript"
author: "Slav"
published: true
---

I recently came across this framework called [Tauri](https://tauri.app), which is similar to Electron for building desktop apps, using a web frontend and a Rust backend.

As an avid listener with a bunch of local music, I set out to build a cross-platform music player that I can use to listen to and manage my library. I'm also using this project as a playground to explore some new UX ideas.

# Why build a new desktop music player in 2022?

Mostly because it's just a fun project, especially when the software is something I would use every day.

This project is also my way of moving away from streaming services and enjoying curating my local library in an active rather than passive way.

While there is a lot of good music software out there, I wanted something a bit different. Here's a brief rundown of what musicat is and isn't:

-   💾 **offline first**. musicat's primary purpose is to play and manage your local music library.
-   🏷 a **metadata viewer and tagger**, with support for all the main formats.
-   💿 **focused on artists**. Personally, this would be a game changer for me. I write and record music, but the process is always quite scattered and the files are all over the place. What if my music player was also where I managed _my own music_, including random ideas (lyrics, rerordings), as well as final track masters?
-   💻 **feels like a native app**. This is a technical challenge, to see whether we can build an app that "feels" native, integrates nicely with the OS and doesn't look like a website despite using web technologies as a front-end.
-   🎯 **modern and cross-platform**. There's lots of great music software out there (Winamp, iTunes, Foobar2000, Musicbee), but they are limited to a single platform (or lacking many features on other platforms).
-   🌞 **a pleasant experience**. Music is a beautiful thing, and music software should reflect that, because software is allowed to be fun, too.

## What I'm using to build Musicat:

-   [Tauri](https://tauri.app) as the framework for packaging as a desktop app.
-   [Svelte](https://svelte.dev) as the front-end framework.
-   [Dexie](https://dexie.org) as the data storage, a wrapper around IndexedDB.

Our packaged app's front-end will run using [WRY](https://github.com/tauri-apps/wry), which essentially is a bridge to the built-in OS WebView, so on macOS the app will use Safari's WebView, and on Windows it will uses Edge's Chromium. On Linux, you need to have webkit2gtk installed.

# Day 1: The library

The first thing to do is: import a list of songs and display them. Pretty cool feature! So let's define a `Song` - this will be the object saved to IndexedDB. Since we can't have duplicate file paths, let's make the `id` based on that.

```ts
interface Song {
    id: string; // A hash of the filepath
    path: string;
    file: string;
    title: string;
    artist: string;
    album: string;
    year: number;
}
```

We can tell the database in Dexie to use this type for a store called `songs`:

```ts
export class MySubClassedDexie extends Dexie {
    songs!: Table<Song>;

    constructor() {
        super("musicatdb");
        this.version(1).stores({
            songs: "id, title, artist, album, genre, year, duration, [artist+album+trackNumber], [album+trackNumber], [artist+album]"
        });
    }
}
```

The list `id, title, artist..` and so on is the indexable fields - so that when searching for music we can quickly find stuff simply by an index and not have to check every single song. We can also provide compound indexes - that's the entries like `[artist+album]`, so that queries like "where artist is x and album is y" are nice and fast.

Now we're ready to add some songs!

## Read files

To import tracks, it would make sense to give the user an option to do it in one of two ways:

1. "Import" button, which lets you select files or directories
2. "Drag and drop" files or folders into the app from the system.

Tauri provides a way to summon the system file picker, and also supports native file drag and drop onto the app window, so this was easy to set up with minimal code.

## Drag and drop

When dragging and dropping files, we want to show a "dropzone" of some sort when hovering over the app. We can listen for the `hover` event on the Tauri window:

```ts
// In <script>
await appWindow.onFileDropEvent((evt) => {
    switch (evt.payload.type) {
        case "drop":
            showDropzone = false;
            addPaths(evt.payload.paths);
            break;
        case "hover":
            console.log("files:", evt.payload.paths);
            showDropzone = true;
            break;
        case "cancel":
            showDropzone = false;
            break;
    }
});

// In template
{#if showDropzone}
    <Dropzone />
{/if}
```

The `<Dropzone>` component that shows up when you hover over the app while dragging files should be something clear and big, that prompts the user to drop files anywhere in the zone bounds. Something like this should do the trick:

![Dropzone GIF](/post-media/musicat-devblog-1/dropzone.png)

## Reading music medadata

Metadata comes in various shapes and sizes depending on the file format (eg. MP3 uses ID3, FLAC uses Vorbis Comments). The metadata format used by a file is generally defined in first few bytes of the file header. For example the following header tells us that an MP3 file uses the ID3v2 format, and the metadata is 30874 bytes long:

![id3-header](/post-media/musicat-devblog-1/id3-header.png)
<small>Image from <a href="https://bignerdranch.com/blog/encore-javascript-create-an-mp3-reader-with-dataviews-textdecoder/">BigNerdRanch (great article!)</a></small>

Although it's interesting and useful to know how each metadata format works at the low-level, we don't need to write code to extract this data manually. There's some great open source libraries that can help with this:

-   We'll be using [`music-metadata-browser`](https://github.com/Borewit/music-metadata-browser) to read tags. It supports lots of formats and is great at extracting the most common tags for you, so you can just access `data.title` for example. It also provides file and codec information, so we can show the bit rate, sample rate and codec info for the song that's playing. Neat!
-   Rust has a great open source library called [`lofty`](https://docs.rs/lofty/latest/lofty/index.html), which we'll be using to write tags directly to the file (I'll cover writing tags in the next post of this series). It also supports all the formats and even allows you to upgrade your ID3v2 tags to the latest version (eg ID3v2.1 -> ID3v2.4). Also neat!

When you add a folder to musicat, it goes through all the files and subfolders, reads metadata from audio files and adds new `Song`s to the database:

```ts
import { convertFileSrc } from "@tauri-apps/api/tauri";
import * as musicMetadata from "music-metadata-browser";

const metadata = await musicMetadata.fetchFromUrl(convertFileSrc(filePath), {
    skipCovers: true
});
const fileHash = md5(filePath);
const songToAdd: Song = {
    id: fileHash,
    path: filePath,
    file: fileName,
    title: metadata.common.title || "",
    artist: metadata.common.artist || "",
    album: metadata.common.album || "",
    year: metadata.common.year || 0
};
await db.songs.put(songToAdd);
```

⚠️ When adding a new object in Dexie, make sure to set 'empty' values for the fields you want to be indexed, not `null` or `undefined`! This makes sure that these Songs appear when using indexed queries like `orderBy` or `where`.

<small>Check out the full import code on <a href="https://github.com/basharovV/musicat/blob/main/src/data/LibraryImporter.ts">GitHub</a></small>

## Displaying songs

We use a good old HTML `table`, with columns for the song fields, and show the song rows by iterating over the Dexie query results using `each`. Nothing crazy here. Here's what that looks like:

![Library day 1](/post-media/musicat-devblog-1/musicat-day1.jpeg)

# The `audio` player

The `audio` element has decent support for audio codecs, including MP3, AAC, OGG, FLAC, WAV in modern browsers. Although for basic purposes of the app we just need to be able to play files, we can also connect the audio element to the Web Audio API for signal chaining, or passing the audio data through an analyser for visualisation.

⚠️ Note that WebAudio is particularly [buggy](https://bugs.webkit.org/show_bug.cgi?id=215314) on [Safari](https://bugs.webkit.org/show_bug.cgi?id=221334). I've had issues with pops, clicks and audio playing back at the wrong speed. 

So let's set up a basic audio player, which contains:

-   **Play/pause**. Simply call `.play()` or `.pause()` on an `HTMLAudioElement` (`<audio>`).

    ```ts
    this.pause();
    this.audioFile.currentTime = 0;
    playerTime.set(this.audioFile.currentTime);
    this.audioFile.src = "asset://" + song.path.replace("?", "%3F");
    this.play();
    ```

-   **Volume/Mute**. To control volume, create a gain node, and set the gain whenever a slider on the UI is updated:

    ```ts
    // Player class in AudioPlayer.ts
    const audioCtx = new AudioContext();
    this.gainNode = audioCtx.createGain();
    this.gainNode.gain.value = 1;
    this.gainNode.connect(audioCtx.destination);

    this.audioFile = new Audio();
    this.source = audioCtx.createMediaElementSource(this.audioFile);
    this.source.connect(this.gainNode);

    // A 0-1 store, bound to a slider in the UI.
    volume.subscribe((vol) => {
        this.gainNode.gain.value = vol;
    });
    ```

-   **Next/previous**. This requires finding a `Song` by index, and keeping track of the index currently playing:

    ```ts
    function playNext() {
        AudioPlayer.playSong($songs[++$currentSongIdx]);
    }
    function playPrev() {
        AudioPlayer.playSong($songs[--$currentSongIdx]);
    }
    ```

    <small>See the <a href="https://github.com/basharovV/musicat/blob/main/src/lib/AudioPlayer.ts">AudioPlayer.ts</a> implementation for more details</small>

-   **Seekbar**. I added a seekbar which displays the current position as a percentage of the `currentTime` / total duration. When we click on the seekbar, set the new audio time:

    ```ts
    // seekTime is updated whenever
    // the seekbar is interacted with
    seekTime.subscribe((time) => {
        if (this.audioFile) {
            this.audioFile.currentTime = time;
            playerTime.set(time);
        }
    });
    ```

    Fortunately, I already had a useful seekbar Svelte component that I wrote for the [music](/music) section on this site, so I just dropped that in with zero changes and it worked really well :)

And here is our player UI with all of these elements. Quite sleek, compact and easy to use.

<img src="/post-media/musicat-devblog-1/seekbar.png" />

Wait, what is that visualiser?! That's [`audiomotion-analyzer`](https://github.com/hvianna/audioMotion-analyzer), an awesome open-source library that's great for showing the spectrum in real time. 

----

Thanks for reading the first entry in the musicat devblog series! This post covered the basics of setting up the music player, with a basic library and an audio component. In the next post(s) the focus will be more on the product side, talking about the inspiration for some of the new features like the mini player, Smart Query, and the Artist's toolkit. 


<img src="/dev/logo-musicat.png" style="height: 200px;width: fit-content;margin: auto;display:block;"/>

🪕 musicat is [open-source](https://github.com/basharovV/musicat). If you're using the app and find any bugs or want to suggest a feature or improvement, [create an issue](https://github.com/basharovV/musicat/issues) or if you'd like to contribute code,  [open a pull request](https://github.com/basharovV/musicat/pulls), thanks :) 


<callout>
<p>
other Musicat devblogs:
<a href="/blog/the-problem-with-music-metadata">part 2</a>
<a href="/blog/musicat-road-to-gapless">part 3</a>
<a href="/blog/musicat-progress-update">part 4</a>
</p>
</callout>