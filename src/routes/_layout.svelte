<script>
  import Nav from "../components/Nav.svelte";
  import GdprBanner from "@beyonk/gdpr-cookie-consent-banner";

  export let segment;
</script>

<Nav {segment} />

<main>
  <slot />
</main>

<GdprBanner cookieName="foo" description="bar" />

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
