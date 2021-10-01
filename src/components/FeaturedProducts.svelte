<script lang="ts">
  import type { Product } from "../interfaces";
  import { isDarkModeEnabled } from "../store/state";

  import FeaturedProduct from "./FeaturedProduct.svelte";

  export let products: Product[];

</script>

<div class="container">
  <div class="banner">
    <small
      >👋 Hola! I just launched this store! If you see <i
        >"Price: up to you :)"</i
      > it's technically free, but you can choose to pay a few bucks if you'd like
      to support my work. Thanks! - Slav</small
    >
    <img src="profile.jpg" />
  </div>
  {#each products as product, index}
    <FeaturedProduct {product} {index}>
      <!-- <div slot="custom">
        <h4>Audio samples:</h4>
        <TrackMiniPlayer trackId="1011296332" accent="1e2424" />
        <TrackMiniPlayer trackId="963507499" accent="1e2424" />
      </div> -->
    </FeaturedProduct>
  {/each}
  <div class="comingsoon {$isDarkModeEnabled ? 'invert' : ''}">
    <img src="/bulby_bulb.png" />
    <p>More coming soon!</p>
  </div>
</div>

<style lang="scss">
  .container {
    overflow: visible;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1em;
    margin-top: 4em;
    &::before {
      content: "";
      height: 10px;
      width: 10px;
      border-radius: 200%;
      /* box-shadow: -100px -200px 600px 400px rgba(0, 0, 0, 0.7), */

      /* background: white; */
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: -4;
      margin: auto;
      box-sizing: border-box;
    }

    .banner {
      top: -3em;
      padding: 0.5em 1em;
      background: rgba(83, 199, 145, 0.187);
      border-bottom: 1px solid rgba(0, 0, 0, 0.09);
      color: rgb(5, 182, 91);
      text-align: center;
      position: relative;

      @media only screen and (min-width: 1680px) {
        position: absolute;
        left: 50px;
        width: 350px;
      }

      > img {
        width: 40px;
        position: absolute;
        left: -20px;
        top: 0;
        bottom: 0;
        border-radius: 50px;
        border: 3px solid white;
        margin: auto;
      }
    }

    .comingsoon {
      margin: auto;
      width: 100%;
      flex: 1 1 220px;
      p {
        text-align: center;
        color: rgb(187, 173, 173);
      }

      img {
        height: 200px;
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
  }
</style>
