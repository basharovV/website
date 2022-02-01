<script context="module">
  export function preload({ params, query }) {
    return this.fetch(`blog.json`)
      .then((r) => r.json())
      .then((posts) => {
        return { posts };
      });
  }
</script>

<script>
  export let posts;
  import { isDarkModeEnabled } from "../../store/state";
</script>

<svelte:head>
  <title>Blog</title>
</svelte:head>

<h1>Blog</h1>
<p>Some words about tech & music.</p>

<ul>
  {#each posts as post}
    <!-- we're using the non-standard `rel=prefetch` attribute to
				tell Sapper to load the data for the page as soon as
				the user hovers over the link or taps it, instead of
				waiting for the 'click' event -->
    <li>
      <a rel="prefetch" href="blog/{post.slug}">{post.title}</a>
      <span style="opacity: 0.6;"
        >{post.tags
          .split(",")
          .map((t) => `#${t}`)
          .slice(0, 2)
          .join(",")}</span
      >
    </li>
  {/each}
</ul>

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

<div class="comingsoon {$isDarkModeEnabled ? 'invert' : ''}">
  <img src="/bulby_bulb.png" />
</div>

<style lang="scss">
  * {
    text-align: center;
  }
  ul {
    margin: 0;
    line-height: 1.5;
    list-style: none;
    padding: 0;
  }
  li {
    padding: 0.5em 0;
  }
  .comingsoon {
    margin: 3em auto 0;
    width: 100%;
    flex: 1 1 220px;
    p {
      text-align: center;
      color: rgb(187, 173, 173);
    }

    img {
      height: 150px;
      display: block;
      margin: auto;
      transition: filter cubic-bezier(0.6, -0.28, 0.735, 0.045) 0.3s 0.02s;
    }
    &.invert {
      img {
        filter: invert(1);
      }
    }
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

    &.invert img {
      filter: invert(1);
    }
  }
</style>
