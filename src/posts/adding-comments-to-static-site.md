---
slug: adding-comments-to-static-site
title: "Adding comments to a Svelte site using Cusdis"
date: "2022-02-02"
tags: svelte,comments,sapper
description: "Yet another 'how to do comments' blog post"
author: "Slav"
published: true
---

<p style="text-align:center;margin:auto;">
  <a href="/blog/adding-comments-to-static-site#cusdis_thread">👇See an exampe at the bottom of this page.👇</a>
</p>

This tutorial is for a SvelteKit site, but code examples can easily be adapted to other frameworks.

At the end of this tutorial you'll have:

- Comments section on every page of your Svelte site
- Dashboard with comments moderation
- (optional) Email notifications when someone leaves a comment

<small>...for free!</small>

---

<br/>
<br/>

### Pre-requisite:

1. Get yourself a database - <s>the free [Heroku](https://heroku.com) Postgres will do.</s>. Update 2024: Get a free PostgresDB on [Railway](https://railway.app/pricing)
2. [Self-host Cusdis](https://cusdis.com/doc#/self-host/vercel).

<br/>

---

<br/>

## Adding Cusdis to Svelte site

To add comments support on any page of your static site, you need to add the Cusdis element in your `+layout.svelte` template - this is where the comments secion iframe will be loaded into. This is also how we pass our config to the SDK (it will read from this element).

```
<main>
  <slot />
  <!-- Only render the element on the client, not the server -->
  {#if isClient && pageId}
    <div
      bind:this={cusdisElement}
      id="cusdis_thread"
      data-host="<YOUR CUSDIS URL HERE>"
      data-app-id="<YOUR CUSDIS APP ID HERE>"
      data-page-id={pageId}
      data-page-url={window.location.href}
      data-page-title={document.title}
      data-theme='dark'
    />
  {/if}
</main>
```

For `data-app-id`, you can grab the Cusdis app ID from the settings in the Cusdis dashboard.

Now let's define those variables:

```
let isClient = false; # for ignoring server-side rendering
let pageId; # for linking comments to the current page
let cusdisElement; # The comments frame itself
```


## Dynamic pageId

And now let's write a function that will set the `pageId`. This could be a unique ID, or based on the URL. I used the URL path (without the domain) as the `pageId`. Eg. if the current URL is **https://slavbasharov.com/blog/adding-comments-to-static-site** the `pageId` is **blog/adding-comments-to-static-site**

```
let pageId;
const setPageId = () => {
    // Get the page from the URL
    if (typeof window !== "undefined") {
        if (window.location.href.includes("https://slavbasharov.com")) {
        pageId = window.location.href
            .split("https://slavbasharov.com")
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
import { getStores } from "$app/stores";

const { page } = getStores();
```

We can now perform the update in two steps:
- Update the page ID on route change
- Tell the SDK to use the new page ID

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
  Re-initialize the SDK when the page id attribute is changed in the element. 
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

Hope that was helpful! Let me know in the comments if anything in this article is wrong or doesn't work as expected. You are also welcome to say nice things.