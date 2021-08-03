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

<div class="header-container">
  <div class="header">
    <div class={$isDarkModeEnabled ? "invert shop-logo" : "shop-logo"} >
      <img
        style="grid-area: a;margin:auto;width: 30px;"
        alt="Logo"
        src="logo.svg"
      />
      <h1 style="margin:0">vb shop</h1>
    </div>
    <div>
      <h3>
        An independent creative outlet of music, software and musical software.
      </h3>
    </div>
  </div>
</div>

<section>
  <h2>📦 Products</h2>
  <p class="label">
    Mostly stuff for musicians (virtual instruments, sample packs), and my own music licensed for use in media.
  </p>

  <FeaturedProducts {products} />
</section>

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

  .header-container {
    margin: auto;
    width: fit-content;
  }
  .header {
    display: grid;
    grid-template-columns: 150px 200px;
    align-items: center;
    width: fit-content;

    > div {
      padding: 1em;
    }

    .shop-logo {
      display: flex;
      flex-direction: column;
      border-right: 1px solid rgb(222, 222, 222);
    }
  }

  section {
    border: 1px solid rgb(222, 222, 222);
    padding: 1em;
  }

  h1 {
    font-size: 3em !important;
    font-family: "Snake" !important;
  }

  h2 {
    margin-top: 2em;
  }

  small {
    margin: 3em 0;
    display: block;
  }

  .label {
    opacity: 0.5;
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
