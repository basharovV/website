<script>
  import Nav from "../components/Nav.svelte";

  export let segment;
</script>

<Nav {segment} />

<main>
  <slot />

  <div
    data-config-modal-style="side"
    hidden
    id="snipcart"
    data-api-key="NTYzNTI1NzMtMmI1ZC00ODFjLWEwODgtNGVkMzQ3NmVjOGE1NjM3NjM1MDE4ODQzNzgxODI2"
  />
</main>

<style lang="scss">
  main {
    // position: relative;
    max-width: 56em;
    background-color: none;
    padding: 2em;
    margin: 0 auto;
    box-sizing: border-box;
  }
</style>
