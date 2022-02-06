---
slug: adding-comments-to-static-site
title: 'Adding comments to a static site using Cusdis'
date: '2022-02-02'
tags: dev,composer,site,music,portfolio
description: "A fast and easy way to add comments to your site, and for free!"
author: "Slav"
published: false
---

If you operate a static site, you might be interested in adding a comments section. 
There's many options out there, in my case I wanted something that's:
- Private and lightweight
- Self hosted
- Free and easy to setup
- Customizable

This tutorial is on how to implement Cusdis into a Sapper + Svelte site. 

Assuming you've already followed the instructions to host Cusdis (either on your own server, Vercel, or on Cusdis servers), we can get started!

In your Svelte `_layout.svelte` template, you can define the element where the comments secion iframe will be loaded. This is also how we pass our config to the SDK (it will read from this element). 

```
<main>
  <slot />
  {#if isClient && pageId}
    <div
      bind:this={cusdisElement}
      id="cusdis_thread"
      data-host="https://website-comments.vercel.app"
      data-app-id="d95890c3-822f-40ee-81ad-2432b0ff0244"
      data-page-id={pageId}
      data-page-url={window.location.href}
      data-page-title={document.title}
      data-theme={$isDarkModeEnabled ? "dark" : "light"}
    />
  {/if}
</main>
```

The Cusdis SDK needs a `pageId` to know which page to load comments for. Let's generate a `pageId` from the current URL:

```
let pageId;
const setPageId = () => {
    // Get the page from the URL
    if (typeof window !== "undefined") {
        if (window.location.href.includes("https://vyacheslavbasharov.com")) {
        pageId = window.location.href
            .split("https://vyacheslavbasharov.com")
            .filter((a) => a.length && a !== "/");
        } else if (window.location.href.includes("http://localhost:3000")) {
        pageId = window.location.href
            .split("http://localhost:3000")
            .filter((a) => a.length && a !== "/");
        }

        // Default to home
        if (pageId.length) {
            pageId = pageId[0];
        } else {
            pageId = "home";
        }

        // Remove leading /
        if (pageId && pageId.charAt(0) === "/") {
            pageId = pageId.slice(1);
        }
    }
};
```
