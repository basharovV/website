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

  const setPageId = () => {
    if (typeof window !== "undefined") {
      pageId = window.location.href.split("https://vyacheslavbasharov.com").filter(a=>a.length);
      if (pageId.length !== 1) {
        pageId = window.location.href.split("http://localhost:3000").filter(a=>a.length);
        if (pageId) {
          pageId = pageId[1];
        }
      } else {
        pageId = "home";
      }

      if (pageId && pageId.charAt(0) === "/") {
        pageId = pageId.slice(1);
      }
    }
    console.log("pageId", pageId);
  };

  onMount(() => {
    setPageId();
    initCusdis();
  });

  const onScriptLoaded = () => {
    console.log("Cusdis loaded");
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
      window.CUSDIS.setTheme(enabled ? 'dark' : 'light');
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
        "https://website-comments-6yo47knvo-basharov.vercel.app/js/cusdis.es.js";
      head.appendChild(js);
    }
  };
</script>

<Nav {segment} />

<main>
  <slot />
  {#if isClient && pageId}
    <div
      id="cusdis_thread"
      data-host="https://website-comments-6yo47knvo-basharov.vercel.app"
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
