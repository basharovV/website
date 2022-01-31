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
  import WarpSpeed from "../../components/WarpSpeed.svelte";
  import { isDarkModeEnabled } from "../../store/state.js";
  import SvelteSeo from "svelte-seo";
  export let products;
</script>
  
<SvelteSeo
  title="vb shop | free sample packs, libraries and instruments | Vyacheslav Basharov"
  description="Free sample packs, sample libraries and instruments. An independent creative outlet by Vyacheslav Basharov"
  openGraph={{
    title:
      "vb shop | free sample packs, libraries and instruments | Vyacheslav Basharov",
    description:
      "Free sample packs, sample libraries and instruments. An independent creative outlet by Vyacheslav Basharov",
    url: `https://vyacheslavbasharov.com/shop`,
    type: "website",
    images: [
      {
        url: "logo-512.png",
        width: 850,
        height: 650,
        alt: "logo",
      },
    ],
  }}
/>

<div class="top">
  <WarpSpeed />
  <div class="header-container">
    <div class="header">
      <div class="item {$isDarkModeEnabled ? 'invert shop-logo' : 'shop-logo'}">
        <div>
          <img
            style="grid-area: a;margin:auto;width: 30px;"
            alt="Logo"
            src="logo.svg"
          />
          <h1 style="margin:0">vb shop</h1>
        </div>
      </div>

      <div class="vertical-line fill" />

      <div class="item">
        <div>
          <h3>
            An independent creative outlet of music, software and musical
            software.
          </h3>
        </div>
      </div>
    </div>
  </div>

  <small class="desc">
    handcrafted sample packs, software instruments, audio plugins, royalty-free
    music
  </small>
  <div class="arrow">
    <div class="vertical-line" />
    <div class="down-arrow" />
  </div>
</div>
<section>
  <!-- <h2>📦 Products</h2> -->

  <FeaturedProducts {products} />
</section>

<small style="text-align:center;">Thanks for stopping by!</small>

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
  .header-container {
    margin: auto;
    display: flex;
    width: 100%;
  }
  .header {
    display: flex;
    width: 100%;
    align-items: center;
    > :nth-child(2) {
      padding: 1em 0 !important;
    }
    > .item {
      padding: 1em;
      flex: 1;

      &:first-child {
        align-items: flex-end;

        > div {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
      }

      &:last-child {
        align-items: flex-start;

        > div {
          width: 200px;

          @media only screen and (max-width: 500px) {
            width: auto;
          }
        }
      }
    }
    .shop-logo {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }

  .top {
    position: relative;
  }
  section {
    /* border: 1px solid rgba(222, 222, 222, 0.452); */
    overflow: visible;
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
      font-size: 2em;
    }
    > div {
      margin: auto;
      display: flex;
      flex-direction: row;
      gap: 10px;
    }
  }

  .vertical-line {
    width: 1px;
    height: 20px;
    background-image: linear-gradient(90deg, silver 50%, transparent 50%),
      linear-gradient(90deg, silver 50%, transparent 50%),
      linear-gradient(0deg, silver 50%, transparent 50%),
      linear-gradient(0deg, silver 50%, transparent 50%);
    background-repeat: repeat-x, repeat-x, repeat-y, repeat-y;
    background-size: 100px 10px;
    background-position: left top;
    animation: border-dance 2s infinite linear;
    margin: auto;

    &.fill {
      height: 70%;
    }
  }
  @keyframes border-dance {
    0% {
      background-position: left top, right bottom, left bottom, right top;
    }
    100% {
      background-position: left 15px top, right 15px bottom, left bottom 15px,
        right top 15px;
    }
  }

  .desc {
    text-align: center;
    max-width: 400px;
    align-self: center;
    display: block;
    margin: 0 auto;
  }

  .arrow {
    margin: 1em auto;
    width: fit-content;
  }
  .down-arrow {
    border-style: solid;
    border-color: rgb(0, 0, 0);
    border-width: 0 3px 3px 0;
    display: inline-block;
    padding: 3px;
    transform: rotate(45deg);
    -webkit-transform: rotate(45deg);

    :global(.dark-mode) & {
      border-color: rgb(255, 255, 255);
    }
  }
</style>
