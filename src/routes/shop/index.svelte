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
  export let products;
</script>

<h1>Shop</h1>
<h3>An independent creative outlet of music, software and musical software.</h3>
<p>This is kind of like a personal thrift shop. Have a look around!</p>

<h2>Products</h2>

<FeaturedProducts {products} />

<svelte:head>
  <title>Shop</title>
</svelte:head>

<style lang="scss">
  h2 {
    margin-top: 4em;
  }
</style>
