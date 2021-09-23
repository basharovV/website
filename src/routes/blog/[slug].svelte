<script context="module">
  export async function preload({ params, query }) {
    // the `slug` parameter is available because
    // this file is called [slug].svelte
    const res = await this.fetch(`blog/${params.slug}.json`);
    const data = await res.json();

    if (res.status === 200) {
      return { post: data };
    } else {
      this.error(res.status, data.message);
    }
  }
</script>

<script>
  export let post;
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
  <div class="info">
    <small>posted on {post.date}</small>
    <div class="tags">
      {#each tags as tag}
        <p class="tag">{tag}</p>
      {/each}
    </div>
  </div>
  <div class="content">
    {@html post.html}
  </div>
</post>

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
    max-width: 45em;
    margin: auto;

    > p {
      text-align: center;
    }
  }

  .info {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 1em;
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
    font-size: 1.2em;
    font-family: "IBM Plex Sans", Tahoma, Geneva, Verdana, sans-serif;
    letter-spacing: 0.04em;
  }

  .content :global(pre) {
    background-color: rgb(223, 223, 223);
    box-shadow: inset 1px 1px 5px rgba(0, 0, 0, 0.05);
    padding: 0.5em;
    border-radius: 2px;
    overflow-x: auto;

    :global(.dark-mode) & {
      background-color: rgb(57, 57, 57);
      color:rgb(223, 223, 223);
    }
  }

  .content :global(pre) :global(code) {
    background-color: transparent;
    padding: 0;
    color:rgb(57, 57, 57);
    :global(.dark-mode) & {
      background-color: rgb(57, 57, 57);
      color:rgb(223, 223, 223);
    }
  }

  .content :global(ul) {
    line-height: 1.5;
  }

  .content :global(li) {
    margin: 0 0 0.5em 0;
  }
</style>
