<script lang="ts">
  import type { Product } from "../interfaces";
  import { isDarkModeEnabled } from "../store/state";
  import TrackMiniPlayer from "./TrackMiniPlayer.svelte";

  let highlight;
  export let index = 0;
  export let product: Product;

  setTimeout(() => {
    highlight = true;

    setTimeout(() => {
      highlight = false;
    }, 200);
  }, 200 + (300 * (index + 1)));
</script>

<div class="container {$isDarkModeEnabled ? 'invert' : ''}">
  <div class="tag">{product.tags[0]}</div>

  <div class="product-image-container">

    <a rel="prefetch" href="/shop/{product.id}">
      <img
        class="product-image {highlight ? 'highlight' : ''}"
        src={product.image}
        alt="product"
      />
    </a>
    <svg viewBox="0 0 100 100">
      <rect fill={product.color} width="100%" height="100%" />
    </svg>
  </div>
  <content>
    <!-- <a class="title" rel="prefetch" href="shop/{product.id}">
      <h4>{product.name}</h4>
    </a>

    <small>{product.description}</small>

    {#if product.trackUrls.length}
      <h5>🎧 Listen:</h5>

      {#each product.trackUrls as trackId}
        <TrackMiniPlayer
          {trackId}
          isDarkModeEnabled={$isDarkModeEnabled}
          accent="e60303"
        />
      {/each}
    {/if}
    <small class="size">{product.size} zip file</small> -->

    <div class="buttons">
      <a rel="prefetch" class="details-button" href="/shop/{product.id}">Details</a>
      <a
        href="https://payhip.com/b/{product.productId}"
        class="payhip-buy-button"
        data-message={product.paymentDescription}
        data-title="Download {product.name}"
        data-product={product.productId}
        data-theme="none">Get it</a
      >
    </div>
    {#if product.price}
      <p>€{product.price}</p>
    {:else}
      <span class="price"
        ><p style="opacity:0.7;margin-right: 0.5em">Price:</p>
        <p class="price-pwyw">up to you</p></span
      >
    {/if}
  </content>
</div>

<style lang="scss">
  .container {
    position: relative;
    /* padding: 2em; */
    align-self: center;
    max-width: 300px;
    flex: 1 1 200px;
    /* border: 1px solid rgba(0, 0, 0, 0.09); */
    /* border-right: 1px solid rgba(0, 0, 0, 0.09); */
    -webkit-background-clip: padding-box;
    background-clip: padding-box;
   

    &.invert {
      /* border: 1px solid rgba(255, 255, 255, 0.194); */
      /* border-right: 1px solid rgba(255, 255, 255, 0.173); */
      &:hover {
        /* background-color: #ffffff25; */

        .product-image-container {
          &::before {
            background: #ffffff25;
          }
        }
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


  span {
    > * {
      display: inline-block;
    }
  }

  .price {
    margin: 1em auto 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    p {
      margin: 0;
    }

    .price-pwyw {
      background:rgba(50, 205, 50, 0.132);
      border-radius: 20px;
      padding: 0.2em 0.8em;
      color: rgb(0, 160, 0);
    }
  }
  content {
    z-index: 1;
    position: relative;
  }


  .tag {
    position: relative;
    top: 10px;
    margin: 0 auto;
    z-index: 2;
    /* background-color: rgb(0, 0, 0); */
    /* background: rgb(24, 24, 24); */
    /* background: black; */
    backdrop-filter: blur(1.4px);
    color: rgb(123, 123, 123);
    padding: 0.5em 1em 1em 1em;
    width: fit-content;
    /* border-radius: 15px; */
    border: 1.8px solid rgba(130, 130, 130, 0.209);
    transform: scale(0.9);
    /* box-shadow: 2px 10px 10px black; */
    /* border: 7px solid rgb(24, 24, 24); */
  }

  .product-image {
    width: 100%;
    height: auto;
    z-index: 3;
    position: relative;
    transition: all 0.1s cubic-bezier(0.47, 0, 0.745, 0.715);
    /* animation: glow 1.5s ease-in-out infinite alternate-reverse; */
    margin-bottom: 1em;
    border: 1.5px solid rgba(255, 255, 255, 0.5);
    border-radius: 4px;
    outline: 2px solid transparent;
    box-sizing: border-box;
    box-shadow: 0px -5px 10px rgba(0, 0, 0, 0.166);
    &:hover,
    &.highlight {
      transform: translate(-3px, -3px);
      filter: brightness(1.5);
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

  .buttons {
    display: flex;
    flex: 1 1 100%;
    flex-direction: row;
    gap: 10px;
  }

  .payhip-buy-button {
    flex-grow: 3;
    display: inline-block;
    border-radius: 0px;
    border: 2px solid rgb(0, 0, 0);
    background: none;
    text-align: center;
    color: black;
    &:hover {
      background: rgba(0, 0, 0, 0.139);
    }
    :global(.dark-mode) & {
      border-color: white;
      color: white;
      &:hover {
        background: rgba(255, 255, 255, 0.139);
      }
    }
  }
  .details-button {
    text-align: center;
    flex-grow: 1;
    text-decoration: none;
    border: 2px solid rgba(0, 0, 0, 0.425);
    /* border-radius: 5px; */
    padding: 0.3em 1em;

    &:hover {
      background: rgba(0, 0, 0, 0.139);
    }
    :global(.dark-mode) & {
      border-color: rgba(255, 255, 255, 0.434);
      &:hover {
        background: rgba(255, 255, 255, 0.139);
      }
    }
  }

  svg {
    width: 100%;
    height: auto;
    position: absolute;
    top: 5px;
    left: 5px;
    border-radius: 4px;
    z-index: 1;
    box-shadow: 2px 2px 20px rgba(0, 0, 0, 0.411);

  }
</style>
