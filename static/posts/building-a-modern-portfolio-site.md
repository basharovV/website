---
slug: building-a-modern-portfolio-site
title: 'Building a modern portfolio site'
date: '2021-09-21'
tags: dev,composer,site,music,portfolio
description: "A multi-faceted website for mu"
author: "Slav"
---

This site is powered by:
- Svelte, with Sapper for server-side rendering
- PayHip for the [shop](/shop)
- Various embeds from Soundcloud, Vimeo, YouTube
- Deployed as a serverless function on Vercel

You can check out the code [here](https://github.com/basharovV/website).

---

Portfolio sites are all over the Internet. Artists, [musicians](https://olafurarnalds.com/), [researchers](https://andymatuschak.org/), [developers](https://peterthaleikis.com/), designers and creatives of all types share their work with the world in a public display. It's a very personal thing - each portfolio should represent the unqeuivocable uniquess of it's owner. We want our portfolios to be welcoming to visitors and hopefully spark a conversation or business opportunity. 


In my case I wanted something that was both form and function, with an artistic quality but minimal enough to make room for content (blog, shop, music, projects, etc). 



## The music player
The [music](/music) page shows placeholder widgets for various Soundcloud tracks, but doesn't load the embed until you click on them, which significantly improves performance and load times. I built a custom player that uses the [SoundCloud Widget API](https://developers.soundcloud.com/docs/api/html5-widget#methods) to interact with the currently playing widget. 

## Video embeds
Similarly to music, video embeds are lazy loaded, so they don't clog up the page until you explicitly load them. 

## Selling stuff
It's never been easier, no matter what you're selling. Create a Stripe account, and connect it to a storefront like Shopify, Snipcart, or PayHip (what I use). I chose PayHip because of a very generous 5GB digital download size, which is perfect for my [sample packs and virtual instruments](/shop). 


## It has to load fast
It's 2021, and the web is generally bloated and poorly optimized. But, your site could be interactive in less than a second! That means using server-side rendering where applicable, hosting static content on a CDN, compressing media and opting for a modern compile time framework like Svelte. 