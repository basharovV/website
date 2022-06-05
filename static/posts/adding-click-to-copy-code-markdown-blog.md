---
slug: adding-click-to-copy-code-markdown-blog
title: "Adding 'click to copy code' on your Markdown blog"
date: "2022-06-04"
tags: code,blog,copy,markdown,svelte
description: "Help other developers by making it easy to copy code from your site."
framework: "SvelteKit"
language: "Javascript"
author: "Slav"
published: true
---

If you're writing posts with code examples, you should make your code blocks copyable with just a click. Like this:

```
<p>Wow, a demo that works!</p>
```

It's become a common practice on many developer sites around the web, and you can easily add it to your blog. Here's how!

### Copying to clipboard
To be able to copy to the clipboard, the `copy-to-clipnboard` npm package does the job quite nicely. Install it first:
```txt
npm i copy-to-clipboard
```

### Making your Markdown code blocks copy-able

You might have a markdown file with the following code block:

````
    ```
    <p>Wow, a demo that works!</p>
    ```
````

Once you "html-ify" this Markdown (for example with [marked.js](https://github.com/markedjs/marked)), this block is rendered as a `<pre>` element on the page. So we simply iterate through all these elements and add the copy functionality to them. This code runs in the `onMount()` hook in Svelte, since we need to wait for the page to load first.


In your blog post template, add the following code:
```js
// Imports
import copy from "copy-to-clipboard";
import { onMount } from "svelte";
/**
 * This function will go through all the 'pre' elements
 * on the page and add a copy button to them.
 */
onMount(() => {
  const codeBlocks = document.querySelectorAll("pre");
  codeBlocks.forEach((block) => {
    const copyPrompt = document.createElement("div");
    copyPrompt.className = "copy-prompt";
    const copyPromptText = document.createElement("p");
    copyPromptText.innerHTML = "👆 Click here to copy";
    const copyIcon = document.createElement("img");
    copyIcon.src = "/icons/ic_copy.svg";
    copyPrompt.appendChild(copyIcon);
    copyPrompt.appendChild(copyPromptText);
    block.appendChild(copyPrompt);
    block.querySelector(".copy-prompt > p").addEventListener("click", (evt) => {
      copy(block.querySelector("code").textContent);
      block.querySelector(".copy-prompt > p").innerHTML = "Copied!";
      setTimeout(() => {
        block.querySelector(".copy-prompt > p").innerHTML = "👆 Click to copy";
      }, 1000);
    });
  });
});
```

Feel free to adapt this code to your needs. In my case the copy button shows an icon by default, and changes to the text "👆Click to copy" when hovering over the code block.

And here is the CSS for the whole `<pre>` block, including the copy button.

```
  .content :global(pre) {
    background-color: rgba(42, 42, 42, 0.863);
    box-shadow: inset 1px 1px 5px rgba(0, 0, 0, 0.05);
    padding: 0.5em;
    padding-left: 1em;
    border-radius: 2px;
    overflow-x: auto;
    line-height: 1.7em;
    border-left: 2px dashed rgba(106, 106, 106, 0.379);
    transition: 0.1s all ease-in;
    position: relative;

    :global(.dark-mode) & {
      background: none;
      color: rgb(223, 223, 223);
    }
    :global(.copy-prompt) {
      position: absolute;
      right: 1em;
      color: white;
      top: 0em;
      margin: 0.2em 0 0 0;
      transition: 0.2s all ease-in;

      :global(p) {
        display: none;
        margin: 0;
        cursor: pointer;
      }
      :global(img) {
        display: block;
        height: 35px;
        width: 20px;
        left: 0;
      }
    }

    &:hover {
      :global(.copy-prompt > p) {
        display: block;
      }
      :global(.copy-prompt > img) {
        display: none;
      }
    }
  }

```
