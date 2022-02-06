<script>
  import { onMount } from "svelte";
  import { stores } from "@sapper/app";

  const { page } = stores();

  import Nav from "../components/Nav.svelte";
  import { isDarkModeEnabled } from "../store/state";

  let isClient = false;
  export let segment;
  let pageId;
  let cusdisElement;

  const setPageId = () => {
    // Get the page from the URL
    if (typeof window !== "undefined") {
      if (window.location.href.includes("https://vyacheslavbasharov.com")) {
        pageId = window.location.href
          .split("https://vyacheslavbasharov.com")
          .filter((a) => a.length && a !== "/");
      } else if (window.location.href.includes("http://localhost:3000")) {
        pageId = window.location.href
          .split("http://localhost:3000")
          .filter((a) => a.length && a !== "/");
      }

      // Default to home
      if (pageId.length) {
        pageId = pageId[0];
      } else {
        pageId = "home";
      }

      // Remove leading /
      if (pageId && pageId.charAt(0) === "/") {
        pageId = pageId.slice(1);
      }
    }
  };

  
  const initCusdis = () => {
    let head = document.getElementsByTagName("head")[0];
    if (document.getElementById("cusdis-sdk")) {
      // ReInit existing script
      if (
        typeof window !== "undefined" &&
        typeof window.CUSDIS !== "undefined"
      ) {
        window.CUSDIS.initial();
      }
    } else {
      // Create it
      let js = document.createElement("script");
      js.id = "cusdis-sdk";
      js.async = true;
      js.src = "https://website-comments.vercel.app/js/cusdis.es.js";
      head.appendChild(js);
    }
  };

  /*
  The Cusdis SDK grabs the pageId from the DOM, so we need to observe when it's changed. 
  */
  onMount(() => {
    new MutationObserver(initCusdis).observe(cusdisElement, {
      attributeFilter: ["data-page-id"],
    });

    setPageId();
  });

  if (typeof window !== "undefined") {
    isClient = true;
  }

  /*
  Update the Cusdis theme to match the site theme when it changes. 
  */
  let currentTheme;

  isDarkModeEnabled.subscribe((enabled) => {
    if (
      typeof window !== "undefined" &&
      typeof window.CUSDIS !== "undefined" &&
      enabled !== currentTheme
    ) {
      //changed
      typeof window !== "undefined" &&
        typeof window.CUSDIS !== "undefined" &&
        window.CUSDIS.setTheme(enabled ? "dark" : "light");
    }

    currentTheme = enabled;
  });

  /*
  Listen for page changes and set the current page ID to pass into the SDK.
  */
  $: {
    if (typeof window !== "undefined") {
      if ($page.path) {
        setPageId();
      }
    }
  }

</script>

<Nav {segment} />

<main>
  <slot />
  {#if isClient && pageId}
    <div
      bind:this={cusdisElement}
      id="cusdis_thread"
      data-host="https://website-comments.vercel.app"
      data-app-id="d95890c3-822f-40ee-81ad-2432b0ff0244"
      data-page-id={pageId}
      data-page-url={window.location.href}
      data-page-title={document.title}
      data-theme={$isDarkModeEnabled ? "dark" : "light"}
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

  :global(#cusdis_thread) {
    margin-top: 2em;
  }
</style>
