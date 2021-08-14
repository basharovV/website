<script lang="ts">
  import type { Product } from "../interfaces";
  import { isDarkModeEnabled } from "../store/state";
  import TrackMiniPlayer from "./TrackMiniPlayer.svelte";

  export let product: Product;
</script>

<div class="container {$isDarkModeEnabled ? 'invert' : ''}">
  <div class="product-image-container">
    <div class="tags">
      {#each product.tags as tag}
        <div class="tag">{tag}</div>
      {/each}
    </div>

    <a rel="prefetch" href="shop/{product.id}">
      <img class="product-image" src={product.image} />
    </a>
    <svg viewBox="0 0 100 100">
      <rect fill={product.color} width="100%" height="100%" />
    </svg>
  </div>
  <content>
    <a class="title" rel="prefetch" href="shop/{product.id}">
      <h4>{product.name}</h4>
    </a>

    <small>{product.description}</small>

    {#if product.soundCloudDemoIds.length}
      <h5>🎧 Listen:</h5>

      {#each product.soundCloudDemoIds as trackId}
        <TrackMiniPlayer
          {trackId}
          isDarkModeEnabled={$isDarkModeEnabled}
          accent="e60303"
        />
      {/each}
    {/if}
    <small class="size">{product.size} zip file</small>

    {#if product.price}
      <p>€{product.price}</p>
    {:else}
      <span
        ><p>Price:</p>
        <p class="price-pwyw">up to you :)</p></span
      >
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

<style lang="scss">
  .container {
    position: relative;
    padding: 2em;
    width: 100%;
    flex: 1 1 220px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.09);
    border-right: 1px solid rgba(0, 0, 0, 0.09);
    -webkit-background-clip: padding-box;
    background-clip: padding-box;
    &:hover {
      background-color: #00000010;
    }

    &.invert {
      border-bottom: 1px solid rgba(255, 255, 255, 0.194);
      border-right: 1px solid rgba(255, 255, 255, 0.173);
      &:hover {
        background-color: #ffffff25;
      }
    }
  }

  .product-image-container {
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

  .title {
    text-decoration: none;
  }

  .size {
    margin-top: 1em;
    display: block;
    opacity: 0.5;
  }

  span {
  > * {
      display: inline-block;
    }
  }
  .price-pwyw {
    color: rgb(0, 160, 0);
  }
  content {
    z-index: 1;
    position: relative;
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

  .product-image {
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

  .payhip-buy-button {
    display: inline-block;
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
      /* fill: #000000; */
    }
  }
</style>
