<script>
  export let segment;
  import { isDarkModeEnabled } from "../store/state.js";
  import { onMount } from "svelte";

  let mounted;

  onMount(() => {
    isDarkModeEnabled.set(
      window.matchMedia("(prefers-color-scheme: dark)").matches
    );
    mounted = true;
  });

  $: if (mounted) {
    if ($isDarkModeEnabled) window.document.body.classList.add("dark-mode");
    else window.document.body.classList.remove("dark-mode");
  }
</script>

<nav>
  <div>
    <ul>
      <li>
        <a aria-current={segment === undefined ? "page" : undefined} href="."
          >home</a
        >
      </li>
      <li>
        <a aria-current={segment === "dev" ? "page" : undefined} href="dev"
          >dev</a
        >
      </li>
      <li>
        <a aria-current={segment === "music" ? "page" : undefined} href="music"
          >music</a
        >
      </li>

      <!-- for the blog link, we're using rel=prefetch so that Sapper prefetches
		     the blog data when we hover over the link or tap it on a touchscreen -->
      <li>
        <a
          rel="prefetch"
          aria-current={segment === "shop" ? "page" : undefined}
          href="shop">shop</a
        >
        {#if segment === undefined}
          <div class="link-pointer">
            <svg
              width="12"
              height="21"
              viewBox="0 0 12 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.9368 0.559717C2.69367 0.428795 2.39043 0.519762 2.25951 0.762897L0.126031 4.725C-0.00489033 4.96813 0.0860765 5.27136 0.329211 5.40229C0.572345 5.53321 0.875577 5.44224 1.0065 5.19911L2.90293 1.67724L6.4248 3.57367C6.66793 3.70459 6.97116 3.61362 7.10208 3.37049C7.233 3.12735 7.14204 2.82412 6.8989 2.6932L2.9368 0.559717ZM11.1265 20.2963C6.65912 13.0736 5.53039 8.69562 3.17866 0.85628L2.22083 1.14362C4.5701 8.97477 5.73035 13.473 10.2761 20.8223L11.1265 20.2963Z"
                fill="black"
              />
            </svg>

            <small>just launched!</small>
          </div>
        {/if}
      </li>
    </ul>

    <div
      class="theme-toggle"
      style="display: flex;justify-content: flex-end;align-items: center;"
    >
      <small>Theme:&nbsp;</small>
      <svg
        on:click={() => isDarkModeEnabled.set(true)}
        height="20px"
        width="20px"
      >
        <circle
          cx="10"
          cy="10"
          r="8"
          stroke="white"
          stroke-width="3"
          fill="black"
        />
      </svg>
      <svg
        on:click={() => isDarkModeEnabled.set(false)}
        height="20px"
        width="20px"
      >
        <circle
          cx="10"
          cy="10"
          r="8"
          stroke="black"
          stroke-width="3"
          fill="white"
        />
      </svg>
    </div>
  </div>
</nav>

<style lang="scss">
  :global(body) {
    transition: background-color cubic-bezier(0.6, -0.28, 0.735, 0.045) 0.3s;
    // transition: color cubic-bezier(0.6, -0.28, 0.735, 0.045) 0.3s;

    background: url("/white-paper-texture.jpeg");
    background-size: auto;
    background-position: 0 -500px;
    background-attachment: fixed;
  }

  :global(.dark-mode) {
    /* background-color: black !important; */
    color: white;
    background: black !important;
  }

  .theme-toggle {
    opacity: 0.7;
    svg {
      &:hover {
        transform: scale(1.2);
        cursor: pointer;
      }
    }
  }
  nav {
    /* border-bottom: 1px solid rgba(74, 74, 74, 0.1); */
    font-weight: 300;
    padding: 0;
    display: flex;
    justify-content: center;

    > div {
      max-width: 400px;
      width: 100%;
      display: inline-flex;
    }
  }

  ul {
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    justify-content: space-around;
    width: 100%;
    @media only screen and (max-width: 522px) {
      /* min-width: 0px;
      width: 100%; */
    }
  }

  /* clearfix */
  ul::after {
    content: "";
    display: block;
    clear: both;
  }

  li {
    display: block;
    float: left;
    position: relative;
  }

  .link-pointer {
    position: absolute;
    top: 50px;
    left: 20px;
    min-width: 115px;
    display: flex;
    flex-direction: column;
    animation: bounce 1s alternate-reverse 1s infinite ease-in-out;
    transform: rotate(5deg);
    > svg {
      align-self: flex-start;
      height: 20px;
      > path {
        fill: rgb(0, 211, 137);
      }
    }
    > small {
      margin: 5px 0 0 0;
      color: rgb(0, 211, 137);
    }
  }

  @keyframes bounce {
    0% {
      transform: rotate(5deg);
    }
    20% {
      transform: rotate(10deg);
    }
    40% {
      transform: rotate(5deg);
    }
    60% {
      transform: rotate(10deg);
    }
    80% {
      transform: rotate(5deg);
    }
    100% {
      transform: rotate(5deg);
    }
  }

  [aria-current] {
    position: relative;
    display: inline-block;
    opacity: 1;
  }

  [aria-current]::after {
    position: absolute;
    content: "";
    width: calc(100% - 1em);
    height: 2px;
    background-color: rgb(255, 62, 0);
    display: block;
    bottom: -1px;
  }

  a {
    text-decoration: none;
    padding: 1em 0.5em;
    opacity: 0.8;
    display: block;

    &:hover {
      font-weight: bold;
      opacity: 1;
    }
  }
</style>
