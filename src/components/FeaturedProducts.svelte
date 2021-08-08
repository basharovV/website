<script lang="ts">
import type { Product } from "../interfaces";

  import FeaturedProduct from "./FeaturedProduct.svelte";
  export let products: Product[];
</script>

<div class="container">
  {#each products as product}
    <FeaturedProduct {product}>
      <!-- <div slot="custom">
        <h4>Audio samples:</h4>
        <TrackMiniPlayer trackId="1011296332" accent="1e2424" />
        <TrackMiniPlayer trackId="963507499" accent="1e2424" />
      </div> -->
    </FeaturedProduct>
  {/each}
  <div class="comingsoon">
    <p>More coming soon!</p>
  </div>
</div>

<style lang="scss">
  .container {
    overflow: hidden;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    /* gap: 1em; */

    .comingsoon {
      margin: auto;
      width: 100%;
      flex: 1 1 220px;
      p {
        text-align: center;
        color: rgb(187, 173, 173);
      }
    }
  }
</style>
