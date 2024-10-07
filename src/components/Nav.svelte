<script>
    import { isDarkModeEnabled } from "../store/state.js";
    import { onMount } from "svelte";
    import { getStores } from "$app/stores";
    const { page } = getStores();

    let mounted;
    let forceDarkMode;

    onMount(() => {
        isDarkModeEnabled.set(
            window.matchMedia("(prefers-color-scheme: dark)").matches
        );
        mounted = true;
    });

    $: pathname = $page?.url?.pathname;

    $: if (mounted) {
        if ($isDarkModeEnabled || forceDarkMode)
            window.document.body.classList.add("dark-mode");
        else window.document.body.classList.remove("dark-mode");

        // CHange background if music
        if (pathname === "/music") {
            window.document.body.classList.add("nav-music");
            window.document.body.classList.remove("nav-blog");
        } else if (pathname === "/blog") {
            window.document.body.classList.remove("nav-music");
            window.document.body.classList.add("nav-blog");
        } else {
            window.document.body.classList.remove("nav-music");
            window.document.body.classList.remove("nav-blog");
        }
    }
    // console.log($page);
    $: isProduct = pathname.includes("/shop/");
    $: forceDarkMode = isProduct;
</script>

<nav class={isProduct ? "frosted" : ""}>
    {#if pathname !== "/music"}
        <a class="logo" href="/"><img alt="Logo" src="/logo.svg" /></a>
    {/if}
    <div>
        <ul>
            <li>
                <a aria-current={pathname === "/" ? "page" : undefined} href="/"
                    >home</a
                >
            </li>
            <li>
                <a
                    aria-current={pathname?.startsWith("/dev")
                        ? "page"
                        : undefined}
                    href="/dev">dev</a
                >
            </li>

            <li>
                <a
                    rel="prefetch"
                    aria-current={pathname?.startsWith("/blog")
                        ? "page"
                        : undefined}
                    href="/blog">blog</a
                >
            </li>

            <li>
                <a
                    aria-current={pathname?.startsWith("/music")
                        ? "page"
                        : undefined}
                    href="/music"
                    rel="prefetch">music</a
                >
            </li>

            <!-- for the blog link, we're using rel=prefetch so that Sapper prefetches
		     the blog data when we hover over the link or tap it on a touchscreen -->
            <li>
                <a
                    rel="prefetch"
                    aria-current={pathname?.startsWith("/shop")
                        ? "page"
                        : undefined}
                    href="/shop">goodies</a
                >
            </li>
        </ul>

        {#if !forceDarkMode}
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
        {/if}
    </div>
</nav>

<style lang="scss">
    :global(body) {
        transition: background-color cubic-bezier(0.6, -0.28, 0.735, 0.045) 0.3s;
        // transition: color cubic-bezier(0.6, -0.28, 0.735, 0.045) 0.3s;
    }
    :global(.nav-music) {
        background-image: url("/white-paper-texture.jpeg");
        /* background-size: cover;
    background-position: center -1500px;
    background-attachment: inherit; */
        background-size: contain;
        background-position: center 2vh;
        background-attachment: scroll;
        background-repeat: no-repeat;

        @media only screen and (min-width: 1000px) {
            background-position: 0 -5vh;
        }

        @media only screen and (min-width: 2000px) {
            background-position: 0 -250px;
        }

        @media only screen and (min-width: 2800px) {
            /* background-position: center 290%; */
        }

        @media only screen and (max-width: 500px) {
            background: none;
        }
    }

    :global(.dark-mode) {
        /* background-color: black !important; */
        color: white;
        background: #181818 !important;
    }

    .theme-toggle {
        position: relative;
        opacity: 0.7;
        small {
            display: none;
        }
        @media screen and (min-width: 700px) {
            position: absolute;
            right: 0.5em;
            top: 0.5em;
            small {
              display: block;
            }
        }
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
        position: relative;
        > div {
            max-width: 400px;
            width: 100%;
            display: inline-flex;
        }

        &.frosted {
            color: white;
            backdrop-filter: blur(3px);
            border-bottom: 1.5px solid rgba(128, 128, 128, 0.1);
        }

        @media only screen and (max-width: 500px) {
            border-bottom: 1px solid rgba(74, 74, 74, 0.1);
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
        min-width: 200px;
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
    :global(.dark-mode) img {
        filter: invert(1);
    }

    .logo {
        position: absolute;
        top: 0;
        left: 10px;
        width: 30px;
        bottom: 0;

        @media only screen and (max-width: 500px) {
            display: none;
        }
    }
</style>
