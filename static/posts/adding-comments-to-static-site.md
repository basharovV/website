---
slug: adding-comments-to-static-site
title: "Adding comments to a static site using Cusdis"
date: "2022-02-02"
tags: dev,composer,site,music,portfolio
description: "A fast and easy way to add comments to your site, and for free!"
author: "Slav"
published: false
---

This tutorial is on how to implement Cusdis comments into a Sapper + Svelte site.

### Pre-requisite:
First you need to [Self-host Cusdis](https://cusdis.com/doc#/self-host/vercel). You can use the free Heroku Postgres as your database. 

## Adding Cusdis to Svelte site
To add comments support on any page of your static site, you need to add the Cusdis element in your `_layout.svelte` template - this is where the comments secion iframe will be loaded into. This is also how we pass our config to the SDK (it will read from this element).

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
      data-theme='dark'
    />
  {/if}
</main>
```

Now let's define `cusdisElement` (to bind the comments element), `pageId` (to tell the SDK about URL changes, so comments are associated with the right page).

```
let pageId;
let cusdisElement;
```

## Dynamic pageId
And now let's write a function that will set the `pageId`. This could be a unique ID, or based on the URL. I used the URL path (without the domain) as the `pageId`. Eg. if the current URL is **https://vyacheslavbasharov.com/blog/adding-comments-to-static-site** the `pageId` is **blog/adding-comments-to-static-site**

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

We need to update the `pageId` automatically whenever the route changes. To do this, we import the `page` store which will fire on update:

```
import { stores } from "@sapper/app";

const { page } = stores();
```

We can now listen for changes and update the `pageId` like this:

```
  /*
  Listen for page changes and set the current page ID to pass into the SDK.
  */
  $: {
    if (typeof window !== "undefined") {
      if ($page.path) {
        setPageId();
      }
    }
  }

  /*
  The Cusdis SDK grabs the pageId from the DOM, so we need to observe when it's changed.
  */
  onMount(() => {
    new MutationObserver(initCusdis).observe(cusdisElement, {
      attributeFilter: ["data-page-id"],
    });

    setPageId();
  });

  if (typeof window !== "undefined") {
    isClient = true;
  }
```

