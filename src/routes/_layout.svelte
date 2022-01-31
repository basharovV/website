<script>
  import { onMount } from "svelte";

  import Nav from "../components/Nav.svelte";
  import PageTransitions from "../components/PageTransitions.svelte";
  import { isDarkModeEnabled } from '../store/state';

  export let segment;

  let isClient = false;
  if (typeof window !== "undefined") {
    // client-only code here
    isClient = true;
  }
</script>

<Nav {segment} />

<main>
  <slot />
  {#if isClient}
    <div
      id="cusdis_thread"
      data-host="https://website-comments-6yo47knvo-basharov.vercel.app"
      data-app-id="d95890c3-822f-40ee-81ad-2432b0ff0244"
      data-page-id={segment}
      data-page-url={window.location.href}
      data-page-title={document.title}
      data-theme={isDarkModeEnabled ? 'dark' : 'light'}
    />
  {/if}
</main>

<!-- <GdprBanner cookieName="foo" description="bar" /> -->
<style lang="scss">
  main {
    // position: relative;
    max-width: 56em;
    min-height: 100vh;
    background-color: none;
    padding: 0 2em 2em 2em;
    margin: 0 auto;
    box-sizing: border-box;
  }
</style>
