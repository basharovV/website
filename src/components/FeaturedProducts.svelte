
<script lang="ts">
  import FeaturedProduct from "./FeaturedProduct.svelte";
  import TrackMiniPlayer from "./TrackMiniPlayer.svelte";
  export let products;

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
    display: grid;
    grid-template-columns: repeat(3, 300px);

    .comingsoon {
      margin: auto;

      p {
        margin: auto;
        color: rgb(187, 173, 173);
      }
    }
  }
</style>
