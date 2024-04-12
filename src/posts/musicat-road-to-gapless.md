---
slug: musicat-road-to-gapless
title: "The road to gapless"
date: "2024-04-12"
tags: rust,music,webaudio,gapless
description: "Part 3 of the devblog for Musicat"
author: "Slav"
published: true
---

Ever since I started working on musicat, the audiophile in me wanted to implement gapless playback. Yet I decided to park it, live with the gaps on The Dark Side Of The Moon and just use the `<audio>` element. That way I could focus on building out features that I needed first. 

But now that I'm quite happy with how the app is turning out, it's time to (temporarily) stop making fancy features and start getting my hands dirty in a PCM stream. It's also time to offload the CPU-heavy stuff away from the the web frontend, and start actually learning Rust since this is a Tauri app after all. 

So over the past few months I have played around with a few ideas to try and enable gapless support, constantly re-architecting the whole playback engine and eventually scrapping WebAudio altogether and doing the decoding and the playback in Rust (Symphonia + cpal). Of course, going native is great, but let's have a look at why the various WebAudio approaches didn't work:

- **Approach 1: No WebAudio, just `<audio src="local track">`:**
  - Need two `<audio>` elements and try to crossfade between them during the gapless transition. 
  - No control over decoding, resampling and playback when changing `src`
  - No access to samples, can't precisely time things, so gaps are inevitable. 
- **Approach 2: [mse-gapless-poc](https://github.com/basharovV/musicat/tree/mse-gapless-poc)**
  - Consisted of fetching the audio chunks manually over Tauri's asset protocol, and feeding them to a `MediaSource`, to which you can append chunks using `SourceBuffer.appendBuffer()`. Browsers can be very strict with how you use this buffer, and I found the implementation to be very clunky. I believe this is what YouTube and Spotify use. 
  - Managing buffered/played chunks was a pain, you constantly run into the QuotaExceededError, and the quota is different for every browser..
  - Decoding and resampling is still handled by the browser/webview
  - Without sample-level precision, wasn't sure how to implement precise seeking, so I had to approximate the desired seek position and guess which chunk to request. Not ideal
- **Approach 3: [webaudio-worklet-poc](https://github.com/basharovV/musicat/tree/webaudio-worklet-poc)**
  - Here we take control over the decoding the chunks using [WASM libraries](https://github.com/eshaz/wasm-audio-decoders), then feed the decoded raw PCM into an AudioWorklet
  - The browser is no longer in charge of resampling, so I tried resampling in the AudioWorklet, which proved to be quite slow for real-time. So I settled for re-initializing the AudioContext with a new sample rate if it changes between files. So gapless was only possible between files that had the sample sample rate. 
  - However this still introduced gaps, sometimes even between chunks, especially when playing MP3s where compression requires data from previous frames. Basically - don't decode MP3's chunk-by-chunk unless you have split the file on the exact frame boundaries. 
 - **Approach 4: [webrtc-worklet-poc](https://github.com/basharovV/musicat/tree/webrtc-worklet-poc)**
   - The decoding is offloaded to the Rust backend using Symphonia, which streams the raw PCM to the web app over a WebRTC DataChannel, played back using an AudioWorklet, no chunking needed. When I thought of this, I knew it was overkill for a local app, but I tried it anyway. This [research paper](https://iris.polito.it/retrieve/handle/11583/2974022/ae5b2403-b2ab-49d6-98d8-b63ee834b6cb/JackTrip_WebRTC_Journal.post-print.pdf) follows a similar approach. 
   - Requires flow control on both sides, to make sure that sender can keep up with playback, but not so fast that it overflows the ring buffer. I had to implement an VLC-like algorithm where the consumer sends the producer it's "receive rate" at regular intervals, and the decoder slows down or speeds up accordingly, between 0.8x and 3x playback speed. 
   - The approach generally worked, and since it's a local app there weren't any "lost packets". So technically we could do gapless. But the CPU usage increased heavily due to WebRTC, and when moving the app to the background I sometimes experienced the WebKit WebView throttling the connection, causing the playback to stutter. 
- **Final approach: [rust-audio-backend](https://github.com/basharovV/musicat/tree/rust-audio-backend)**
  - Decoding, playback and resampling is done in Rust using Symphonia + cpal on a separate thread. I got to re-use the flow-control mechanism from the previous approach, making sure that decoding rate is around playback rate.
  - Direct control over the raw audio stream sent to the native device
  - Frontend communicates necessary file, volume, seek information
  - WebRTC is still used, but only for streaming the real-time FFT viz data for the spectroscope visualization on the frontend. 
  - CPU usage is acceptable 15-20%
  - Road to gapless and other audio features paved ahead!

Essentially, I went down a rabbit hole, progressively getting closer to the raw audio stream in the process. And I'm so glad I did, because I feel like I have peeled off all the layers of abstraction and browser limitations that were getting in the way. This leads to a hybrid architecture where Rust is the I/O, audio, heavy-lifting layer, and the Svelte app is just the presentation layer. Granted, the database is still using IndexedDB which is in the browser, but that's something for another day. 
