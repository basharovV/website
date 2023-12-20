<script>
  import "../global.css";
  import { onMount } from "svelte";
  import { getStores } from "$app/stores";

  const { page } = getStores();

  import Nav from "../components/Nav.svelte";
  import { isDarkModeEnabled } from "../store/state";
  import PageTransition from "../components/PageTransition.svelte";

  let isClient = false;
  let pageId;
  let cusdisElement;

  $: pathname = $page?.url?.pathname;

  $: isLarge = pathname.includes("/shop/vintage-electric");
  $: isFullWidth = pathname.includes("/blog/full-albums-worth-listening-to");

  $: isProduct = pathname.includes("/shop/");

  const setPageId = () => {
    // Get the page from the URL
    if (typeof window !== "undefined") {
      if (window.location.href.includes("https://slavbasharov.com")) {
        pageId = window.location.href.split("https://slavbasharov.com");
      } else if (window.location.href.includes("http://localhost:3000")) {
        pageId = window.location.href.split("http://localhost:3000");
      }
      pageId = pageId.filter((a) => a.length && a !== "/");

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
      js.defer = true;
      js.src = "https://website-comments.vercel.app/js/cusdis.es.js";
      head.appendChild(js);
    }
  };

  /*
  The Cusdis SDK grabs the pageId from the DOM, so we need to observe when it's changed. 
  */
  onMount(() => {
    isClient = true;
    new MutationObserver(initCusdis).observe(cusdisElement, {
      attributeFilter: ["data-page-id"],
    });

    setPageId();
    initCusdis();
  });

  if (typeof window !== "undefined") {
    isClient = true;
  }

  /*
  Update the Cusdis theme to match the site theme when it changes. 
  */
  let isDark;

  $: {
    if (isProduct) {
      isDark = true;
      if (
        typeof window !== "undefined" &&
        typeof window.CUSDIS !== "undefined"
      ) {
        try {
          window.CUSDIS.setTheme("dark");
        } catch (err) {
          console.error(err);
        }
      }
    } else {
      if (
        typeof window !== "undefined" &&
        typeof window.CUSDIS !== "undefined"
      ) {
        isDark = $isDarkModeEnabled;
        try {
          window.CUSDIS.setTheme(isDark ? "dark" : "light");
        } catch (err) {
          console.error(err);
        }
      }
    }
  }

  isDarkModeEnabled.subscribe((enabled) => {
    if (
      typeof window !== "undefined" &&
      typeof window.CUSDIS !== "undefined" &&
      enabled !== isDark
    ) {
      try {
        window.CUSDIS.setTheme(enabled ? "dark" : "light");
      } catch (err) {
        console.error(err);
      }
    }

    isDark = enabled;
  });

  /*
  Listen for page changes and set the current page ID to pass into the SDK.
  */
  $: {
    if (typeof window !== "undefined") {
      if ($page.url.href) {
        setPageId();
      }
    }
  }
</script>

<Nav />

<main class:large={isLarge} class:full-width={isFullWidth}>
  <PageTransition url={$page.url.href}>
    <slot />
  </PageTransition>
  {#if isClient && pageId}
    <div
      bind:this={cusdisElement}
      id="cusdis_thread"
      name="comments"
      data-host="https://website-comments.vercel.app"
      data-app-id="870bd117-7a77-4923-adc7-5d294e64608d"
      data-page-id={pageId}
      data-page-url={window.location.href}
      data-page-title={document.title}
      data-theme={isDark ? "dark" : "light"}
    />
  {/if}
</main>

<!-- <GdprBanner cookieName="foo" description="bar" /> -->
<style lang="scss">
  main {
    max-width: 56em;
    min-height: 100vh;
    background-color: none;
    padding: 0 2em 2em 2em;
    margin: 0 auto;
    box-sizing: border-box;
  }

  .large {
    max-width: 70em;
  }
  .full-width {
    max-width: 100vw;

    :global(post) {
    }
  }

  :global(#cusdis_thread) {
    margin-top: 2em;
    max-width: 56em;
    margin: auto;
  }
</style>
