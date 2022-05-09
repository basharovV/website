<script context="module">
  export async function preload({ params, query }) {
    // the `slug` parameter is available because
    // this file is called [slug].svelte
    const res = await this.fetch(`blog/${params.slug}.json`);
    const data = await res.json();

    if (res.status === 200) {
      return { post: data, slug: params.slug };
    } else {
      this.error(res.status, data.message);
    }
  }
</script>

<script>
  import FullAlbums from "../../components/FullAlbums.svelte";
  import { isDarkModeEnabled } from "../../store/state.js";
  import copy from "copy-to-clipboard";
  import { onMount } from "svelte";

  let content;
  /**
   * This function will go through all the 'pre' elements on the page and add a copy button to them.
   */
  onMount(() => {
    // content is now binded
    const codeBlocks = document.querySelectorAll("pre");
    console.log("codeBlocks", codeBlocks);
    codeBlocks.forEach((block) => {
      const copyPrompt = document.createElement("p");
      copyPrompt.className = "copy-prompt";
      copyPrompt.innerHTML = "👆 Click to copy";
      block.appendChild(copyPrompt);
      block.addEventListener("click", (evt) => {
        copy(block.querySelector("code").textContent);
        block.getElementsByClassName("copy-prompt")[0].innerHTML = "Copied!";
        setInterval(() => {
          block.getElementsByClassName("copy-prompt")[0].innerHTML =
            "👆 Click to copy";
        }, 1000);
      });
    });
  });

  export let post;
  export let slug;
  let tags = post.tags
    .split(",")
    .map((t) => `#${t}`)
    .slice(0, 2);
</script>

<svelte:head>
  <title>{post.title}</title>
</svelte:head>

<post>
  <h1>{post.title}</h1>
  {#if post.description}
    <small>{post.description}</small>
  {/if}
  <div class="info">
    <small class="updated-date"
      >{post.updated
        ? `updated on ${post.updated} ❖ `
        : `posted on ${post.date}`}</small
    >
    <div class="tags">
      {#each tags as tag}
        <p class="tag">{tag}</p>
      {/each}
    </div>
  </div>
  <div class="content" bind:this={content}>
    {#if slug === "full-albums-worth-listening-to"}
      <FullAlbums />
    {:else}
      {@html post.html}
    {/if}
  </div>
</post>

<footer class={$isDarkModeEnabled ? "invert" : ""}>
  <p>Vyacheslav Basharov</p>
  <div>
    <a href="https://github.com/basharovV"
      ><img alt="github" src="github.svg" /></a
    >
    <a href="https://soundcloud.com/vbash"
      ><img alt="soundcloud" src="soundcloud.svg" /></a
    >
    <a href="mailto:contact@vyacheslavbasharov.com"
      ><img alt="email" src="email.svg" /></a
    >
  </div>
</footer>

<style lang="scss">
  /*
		By default, CSS is locally scoped to the component,
		and any unused styles are dead-code-eliminated.
		In this page, Svelte can't know which elements are
		going to appear inside the {{{post.html}}} block,
		so we have to use the :global(...) modifier to target
		all elements inside .content
	*/

  @font-face {
    font-family: "IBM Plex Sans";
    src: url("fonts/IBMPlex/IBMPlexSans-Regular.ttf");
  }

  @font-face {
    font-family: "IBM Plex Sans";
    font-weight: bold;
    src: url("fonts/IBMPlex/IBMPlexSans-Bold.ttf");
  }

  h1 {
    font-family: Snake;
    font-size: 4em;
    margin-bottom: 0;
    text-align: center;
  }
  post {
    display: block;
    max-width: 50em;
    margin: auto;

    > p {
      text-align: center;
    }

    .content {
      max-width: 45em;
      margin: auto;
    }
  }

  small {
    text-align: center;
    display: block;
    max-width: 40em;
    margin: auto;
  }

  .updated-date {
    margin: 0;
  }

  .info {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 1em;
    opacity: 0.5;
  }

  .tags {
    display: flex;
    gap: 1em;
    flex-direction: row;
    .tag {
      padding: 0.3em 0.5em;
      width: max-content;
      /* border: 2px solid rgba(255, 255, 255, 0.2); */
    }
  }

  .content :global(hr) {
    max-width: 5em;
    opacity: 0.5;
  }

  .content :global(h1),
  .content :global(h2),
  .content :global(h3),
  .content :global(h4) {
    position: relative;
    left: -0.75em;
  }
  .content :global(img) {
    width: 100%;
  }

  .content :global(h2) {
    font-size: 1.4em;
    font-weight: 500;
  }

  .content :global(li),
  .content :global(p) {
    line-height: 2em;
    opacity: 0.85;
    font-size: 1.1em;
    font-family: "IBM Plex Sans", Tahoma, Geneva, Verdana, sans-serif;
    letter-spacing: 0.04em;
  }

  .content :global(pre) {
    background-color: rgb(245, 242, 239);
    box-shadow: inset 1px 1px 5px rgba(0, 0, 0, 0.05);
    padding: 0.5em;
    padding-left: 1em;
    border-radius: 2px;
    overflow-x: auto;
    line-height: 1.7em;
    border-left: 2px dashed rgba(106, 106, 106, 0.379);
    transition: 0.1s all ease-in;
    position: relative;
    transform: scale(0.95);
    :global(.dark-mode) & {
      background: none;
      color: rgb(223, 223, 223);
    }
    :global(.copy-prompt) {
      position: absolute;
      top: 1em;
      right: 1em;
      color: white;
      opacity: 0;
      top: -5px;
      transition: 0.2s all ease-in;
    }
    &:hover {
      background: rgba(96, 96, 96, 0.057);
      cursor: pointer;
      transform: scale(0.96);
      :global(.copy-prompt) {
        opacity: 1;
        top: 0;
      }
    }
  }

  .content :global(code) {
    background: none;
  }

  .content > :global(p) > :global(code) {
    color: rgb(251, 140, 140);
    background-color: #ededed;
    font-family: menlo, inconsolata, monospace;
    font-size: calc(1em - 2px);
    padding: 0.2em 0.4em;
    border-radius: 2px;

    :global(.dark-mode) & {
      background-color: #343434;
    }
  }

  /* .content :global(pre) :global(code) {
    background-color: transparent;
    padding: 0;
    color: rgb(57, 57, 57);
    :global(.dark-mode) & {
      background-color: rgb(57, 57, 57);
      color: rgb(223, 223, 223);
    }
  } */

  .content :global(ul) {
    line-height: 1.5;
  }

  .content :global(li) {
    margin: 0 0 0.5em 0;
  }

  footer {
    display: flex;
    flex-direction: column;
    font-family: Snake, Georgia, "Times New Roman", Times, serif;
    font-size: 2em;
    margin: 3em auto 0;
    > p {
      text-align: center;
    }
    > div {
      margin: auto;
      display: flex;
      flex-direction: row;
      gap: 10px;
    }
  }

  .invert img {
    filter: invert(1);
  }
</style>
