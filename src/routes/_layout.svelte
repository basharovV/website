<script>
  import Nav from "../components/Nav.svelte";
  import PageTransitions from "../components/PageTransitions.svelte";

  export let segment;
</script>

<Nav {segment} />

<main>
  <PageTransitions refresh={segment}>
    <slot />
  </PageTransitions>
</main>

<!-- <GdprBanner cookieName="foo" description="bar" /> -->
<style lang="scss">
  main {
    // position: relative;
    max-width: 56em;
    background-color: none;
    padding: 0 2em 2em 2em;
    margin: 0 auto;
    box-sizing: border-box;
  }
</style>
