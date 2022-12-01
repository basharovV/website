---
slug: the-problem-with-music-metadata
title: "The problem with music metadata"
date: "2022-09-04"
tags: metadata,music,player,musicat
description: "Part 2 of the devblog for Musicat"
author: "Slav"
published: true
---
Music metadata is a bit of a mess. 

In an ideal w🌎rld, it would magically tell you everything you need to know about a piece of music, and the content would always be rich, meaningful and complete. 

In reality, the information is scattered, and by the time a recording reaches the listener, some data may be wrong or incomplete. In addition, software isn't always great at managing and displaying it to listeners. Spotify didn't show songwriter credits until 2018, more than a decade after its initial release. Not blaming them, I'm just pointing out that it's a challenge to fix and enrich data at such a scale if you don't have the right data to begin with. 

Besides the essentials - title, artist, album - you can't force every artist, label and publisher to capture all the extra information for every recording. Is it really that important to put the mixing engineer in the metadata? Maybe few actually care about it, especially in the streaming era. Maybe the only thing that's really essential is the audio file itself? 

For those of us that keep music on a hard drive in 2022, there is still a good reason to keep metadata in check - it just looks ugly if you don't:

![no-metadata](/post-media/musicat-devblog-2/no-metadata.webp)


There are also community efforts such as [Musicbrainz](https://musicbrainz.org/) and [Discogs](https://discogs.com/), online databases built from user-submitted metadata. The data is by nature not always complete, has some quality issues here and there but is still very usable for a huge chunk of recorded music. 

Then there is Wikipedia, which can answer some obscure questions about artists, their albums and singles, as well as tell you the story behind them. This data is not structured like a database though, and only exists for article-worthy recordings. 

## So what can we do?

**As listeners**, we can make sure our local library is properly tagged using the information we have. There's software out there that let's you do this, but it's not the best experience. As part of my development journey for [musicat](https://github.com/basharovV/musicat), I'm including a metadata editor / tagger with the following features:
- **Read, write tags and artwork**. MP3, FLAC supported currently
- **Auto-migrate tags to latest format version**. ID3v2.x is migrated to ID3v2.4 when using the tagger.
- **Use artwork from album folder** if available (since v1)
- **Suggest auto-fixes for metadata**. Avoid encoding issues, get rid of tags that players don't understand (since v1)
- **Bulk editing** (not yet implemented)
- **Auto-download artworks** (not yet implemented)

![test](/post-media/musicat-devblog-2/track-info.webp)

Although we don't have a *single* source of truth, we do have the *first* source of truth, which is the original recording that was made by the artist. If the artist also has tools to tag their music with consistency and integrity, our music libraries would be much happier. 

As admin-y as it may be, metadata is an important part of the music industry. 
