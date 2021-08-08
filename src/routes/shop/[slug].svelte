<script context="module">
  export async function preload({ params }) {
    // the `slug` parameter is available because
    // this file is called [slug].svelte
    const res = await this.fetch(`shop/${params.slug}.json`);
    const data = await res.json();

    if (res.status === 200) {
      return { product: data };
    } else {
      this.error(res.status, data.message);
    }
  }
</script>

<script>
  import FeaturedProduct from "../../components/FeaturedProduct.svelte";
  import TrackMiniPlayer from "../../components/TrackMiniPlayer.svelte";
  import { isDarkModeEnabled } from "../../store/state";

  export let product;
</script>

<svelte:head>
  <title>{product.name}</title>
</svelte:head>

<a href="/shop">&lt- Back to shop</a>
<br />
<br />
<div class="container">
  <img src={product.bannerImage} />

  <div class="item-grid">
    <div class="product-image">
      <a rel="prefetch" href="shop/{product.id}">
        <img src={product.image} />
      </a>
      <svg viewBox="0 0 100 100">
        <rect fill={product.color} width="100%" height="100%" />
      </svg>
    </div>
    <content>
      <div class="tags">
        {#each product.tags as tag}
          <div class="tag">{tag}</div>
        {/each}
      </div>
      <a rel="prefetch" href="shop/{product.id}">
        <h3>{product.name}</h3>
      </a>
      <small>{product.description}</small>
      {@html product.longDescription}
      {#if product.soundCloudDemoIds.length}
        <h4>Listen to the demos:</h4>
        {#each product.soundCloudDemoIds as trackId}
          <TrackMiniPlayer
            {trackId}
            isDarkModeEnabled={$isDarkModeEnabled}
            accent="e60303"
          />
        {/each}
      {/if}
      <p class="size">💾 {product.size}</p>

      {#if product.price}
        <p>€{product.price}</p>
      {:else}
        <p>Price: up to you :)</p>
      {/if}

      <a
        href="https://payhip.com/b/{product.productId}"
        class="payhip-buy-button"
        data-message={product.paymentDescription}
        data-title="Download {product.name}"
        data-product={product.productId}
        data-theme="none">Get it</a
      >
    </content>
  </div>
</div>

<style lang="scss">
  :global(body) {
    transition: background-color cubic-bezier(0.6, -0.28, 0.735, 0.045) 0.3s;
    // transition: color cubic-bezier(0.6, -0.28, 0.735, 0.045) 0.3s;
  }

  :global(.dark-mode) {
    background-color: black !important;
    color: white;
  }
  .container {
    padding: 1em;
    border: 1px dashed rgb(220, 220, 220);
    border-radius: 1em;
    box-shadow: 20px 80px 140px 20px rgba(0, 255, 255, 0.098);
  }

  .product-image {
    position: relative;
    max-width: 300px;
  }

  .item-grid {
    display: flex;
    flex-direction: row;
  }

  content {
    padding: 0 2em 2em 2em;
  }

  h4 {
    margin: 1em 0;
  }

  .banner {
    width: 100%;
    height: auto;
  }

  .size {
    opacity: 0.5;
  }

  .custom {
    display: flex;
    margin: 1em 0;
  }

  .tags {
    display: inline-flex;
    z-index: 4;
    $colors: rgb(120, 89, 193), rgb(210, 160, 68), rgb(56, 184, 163),
      rgb(55, 155, 49) rgb(39, 39, 152) ue, rgb(53, 0, 128);

    @for $i from 1 through length($colors) {
      div:nth-child(#{length($colors)}n + #{$i}) {
        background: nth($colors, $i);
        width: fit-content;
        margin: 0.2em;
        color: white;
        transform: skew(5deg, 1deg);
      }
    }
  }

  img {
    width: 100%;
    height: auto;
    z-index: 3;
    position: relative;
    transition: all 1s ease-in-out;
    margin-bottom: 1em;
  }

  svg {
    width: 100%;
    height: auto;
    position: absolute;
    top: 5px;
    left: 5px;
    z-index: 1;
    box-shadow: 2px 2px 20px rgba(0, 0, 0, 0.411);

    rect {
      /* fill: rgb(0, 187, 255); */
    }
  }
</style>
