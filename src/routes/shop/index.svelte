<script context="module">
  export function preload() {
    return this.fetch(`shop.json`)
      .then((r) => r.json())
      .then((products) => {
        return { products };
      });
  }
</script>

<script lang="ts">
  import FeaturedProducts from "../../components/FeaturedProducts.svelte";
  import { isDarkModeEnabled } from "../../store/state.js";
  export let products;
</script>

<img style="grid-area: a;margin:auto;width: 30px;" alt="Logo" src="logo.svg" />
<h1>vb shop</h1>
<h3>An independent creative outlet of music, software and musical software.</h3>

<h2>📦 Products</h2>
<p>
  I'll be mainly focusing on two types of products: stuff for musicians (virtual
  instruments, sample packs), and my own music, licensed for use in media.
</p>

<FeaturedProducts {products} />

<small>Thanks for stopping by!</small>

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

<svelte:head>
  <title>Shop</title>
</svelte:head>

<style lang="scss">
  :global(body) {
    transition: background-color cubic-bezier(0.6, -0.28, 0.735, 0.045) 0.3s;
    // transition: color cubic-bezier(0.6, -0.28, 0.735, 0.045) 0.3s;
  }

  :global(.dark-mode) {
    background-color: black !important;
    color: white;
  }
  h1 {
    font-size: 3em !important;
    font-family: "Snake" !important;
  }
  h2 {
    margin-top: 4em;
  }

  small {
    margin-top: 3em;
  }

  .invert img {
    filter: invert(1);
  }

  footer {
    display: flex;
    flex-direction: column;
    font-family: Snake, Georgia, "Times New Roman", Times, serif;
    // font-size: 2em;
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
</style>
