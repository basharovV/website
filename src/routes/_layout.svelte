<script>
  import { onMount } from "svelte";

  import Nav from "../components/Nav.svelte";
  import PageTransitions from "../components/PageTransitions.svelte";
  import { isDarkModeEnabled } from "../store/state";

  let isHome = true;

  let isClient = false;
  export let segment;
  let hasLoaded = false;
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

  onMount(() => {
    // Start up observer
    setPageId();

    const observer = new MutationObserver((records) => {
      // Page Id changed
      initCusdis();
    });

    observer.observe(cusdisElement, { attributeFilter: ["data-page-id"] });
  });

  const onScriptLoaded = () => {
    hasLoaded = true;
  };

  if (typeof window !== "undefined") {
    // client-only code here
    isClient = true;
  }

  let currentTheme;

  isDarkModeEnabled.subscribe((enabled) => {
    if (
      typeof window !== "undefined" &&
      typeof window.CUSDIS !== "undefined" &&
      enabled !== currentTheme
    ) {
      //changed
      window.CUSDIS.setTheme(enabled ? "dark" : "light");
    }

    currentTheme = enabled;
  });

  $: {
    if (typeof window !== "undefined") {
      if (segment) {
        // trigger it
        setPageId();
        initCusdis();
      } else {
        setPageId();
        initCusdis();
      }
    }
  }

  const initCusdis = () => {
    let head = document.getElementsByTagName("head")[0];
    if (document.getElementById("cusdis-sdk")) {
      // ReInit existing script ;

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
      js.onload = function () {
        // remote script has loaded
        onScriptLoaded();
      };
      js.src =
        "https://website-comments.vercel.app/js/cusdis.es.js";
      head.appendChild(js);
    }
  };
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
