<script>
  import "../global.css";
  import { onMount } from "svelte";
  import { getStores } from "$app/stores";

  const { page } = getStores();

  import Nav from "../components/Nav.svelte";
  import { isDarkModeEnabled } from "../store/state";

  let isClient = false;
  let pageId;
  let cusdisElement;

  $: pathname = $page?.url?.pathname;

  // console.log($page);
  $: isProduct = pathname.includes("/shop/");

  const setPageId = () => {
    // Get the page from the URL
    if (typeof window !== "undefined") {
      if (window.location.href.includes("https://vyacheslavbasharov.com")) {
        pageId = window.location.href.split("https://vyacheslavbasharov.com");
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
      if (
        typeof window !== "undefined" &&
        typeof window.CUSDIS !== "undefined"
      ) {
        isDark = true;
        window.CUSDIS.setTheme("dark");
      }
    } else {
      if (
        typeof window !== "undefined" &&
        typeof window.CUSDIS !== "undefined"
      ) {
        isDark = $isDarkModeEnabled;
        window.CUSDIS.setTheme(isDark ? 'dark' : 'light');
      }
    }
  }

  isDarkModeEnabled.subscribe((enabled) => {
    if (
      typeof window !== "undefined" &&
      typeof window.CUSDIS !== "undefined" &&
      enabled !== isDark
    ) {
      //changed
      typeof window !== "undefined" &&
        typeof window.CUSDIS !== "undefined" &&
        window.CUSDIS.setTheme(enabled ? "dark" : "light");
    }

    isDark = enabled;
  });

  /*
  Listen for page changes and set the current page ID to pass into the SDK.
  */
  $: {
    if (typeof window !== "undefined") {
      if ($page.url) {
        setPageId();
      }
    }
  }
</script>

<Nav />

<main>
  <slot />
  {#if isClient && pageId}
    <div
      bind:this={cusdisElement}
      id="cusdis_thread"
      name="comments"
      data-host="https://website-comments.vercel.app"
      data-app-id="d95890c3-822f-40ee-81ad-2432b0ff0244"
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
