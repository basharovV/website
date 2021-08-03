<script lang="ts">
  import type { Product } from "../interfaces";
  import { isDarkModeEnabled } from "../store/state";
  import TrackMiniPlayer from "./TrackMiniPlayer.svelte";

  export let product: Product;
</script>

<div class="container">
  <div class="product-image">
    <div class="tags">
      {#each product.tags as tag}
        <div class="tag">{tag}</div>
      {/each}
    </div>

    <a rel="prefetch" href="shop/{product.id}">
      <img src={product.image} />
    </a>
    <svg viewBox="0 0 100 100">
      <rect width="100%" height="100%" />
    </svg>
  </div>
  <content>
    <a rel="prefetch" href="shop/{product.id}">
      <h3>{product.name}</h3>
    </a>

    <small>{product.description}</small>

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
    <p class="size">{product.size}</p>

    <p>Price: up to you :)</p>
  </content>
  <a
    href="https://payhip.com/b/{product.productId}"
    class="payhip-buy-button"
    data-message="🦊 Thanks Internet stranger! You can take this product for free, or pay what you want. If you have any feedback, email me on contact@vyacheslavbasharov.com"
    data-title="Download {product.name}"
    data-product={product.productId}
    data-theme="none">Get it</a
  >
</div>

<style lang="scss">
  .container {
    padding: 1em;
    border: 1px dashed rgb(220, 220, 220);
    border-radius: 1em;
  }

  .product-image {
    position: relative;
  }

  :global(.payhip-buy-button) {
    background: rgb(50, 205, 50);
    color: white;
    padding: 0.4em 0.5em;
    border-radius: 3px;
    text-decoration: none;

    &:hover {
      background: rgb(0, 187, 255);
    }
  }

  .size {
    opacity: 0.5;
  }
  content {
  }

  .custom {
    display: flex;
    margin: 1em 0;
  }

  .tags {
    position: absolute;
    top: 20px;
    right: -60px;
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
    transition: all 0.2s ease-in;
    animation: glow 1.5s ease-in-out infinite alternate-reverse;
    margin-bottom: 1em;

    &:hover {
      transform: scale(0.95) rotate(5deg);
    }
  }

  @keyframes glow {
    from {
      filter: none;
    }
    to {
      filter: contrast(175%) brightness(100%) saturate(150%);
    }
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
      fill: rgb(0, 187, 255);
    }
  }
</style>
