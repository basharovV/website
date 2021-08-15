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
    padding: 0 2em 2em 2em;
    margin: 0 auto;
    box-sizing: border-box;
  }
  
  :global(.embed) {
    position: relative;
    width: 100%;
    padding-bottom: 56.25%;

    @media only screen and (max-width: 522px) {
      width: 100%;
    }

    > :global(iframe) {
      position: absolute;
      border-radius: 10px;
      border: 2px solid #c1c1c15b;
      padding: 2px;
      left: 0;
      right: 0;
      box-sizing: border-box;
      width: 100%;
      height: 100%;

      @media only screen and (max-width: 522px) {
        position: absolute;
        left: 0;
        right: 0;
        box-sizing: border-box;
        border: none;
        width: 100%;
      }
    }
  }
</style>
