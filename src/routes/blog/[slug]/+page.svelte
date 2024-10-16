<script>
    import FullAlbums from "../../../components/FullAlbums.svelte";
    import { isDarkModeEnabled } from "../../../store/state.js";
    import copy from "copy-to-clipboard";
    import { onMount } from "svelte";
    import "highlight.js/styles/atom-one-dark-reasonable.css";
    import TooltipNote from "../../../components/TooltipNote.svelte";

    let content;
    /**
     * This function will go through all the 'pre' elements
     * on the page and add a copy button to them.
     */
    onMount(() => {
        if (!customElements.get("tooltip-note")) {
            customElements.define("tooltip-note", TooltipNote.element);
        }
        const codeBlocks = document.querySelectorAll("pre");
        codeBlocks.forEach((block) => {
            const copyPrompt = document.createElement("div");
            copyPrompt.className = "copy-prompt";
            const copyPromptText = document.createElement("p");
            copyPromptText.innerHTML = "👆 Click here to copy";
            const copyIcon = document.createElement("img");
            copyIcon.src = "/icons/ic_copy.svg";
            copyPrompt.appendChild(copyIcon);
            copyPrompt.appendChild(copyPromptText);
            block.appendChild(copyPrompt);
            block
                .querySelector(".copy-prompt > p")
                .addEventListener("click", (evt) => {
                    copy(block.querySelector("code").textContent);
                    block.querySelector(".copy-prompt > p").innerHTML =
                        "Copied!";
                    setTimeout(() => {
                        block.querySelector(".copy-prompt > p").innerHTML =
                            "👆 Click to copy";
                    }, 1000);
                });
        });
    });

    export let data;
    export let post = data.body;
    export let slug = data.slug;

    let focusModeEnabled = post.focus || false; // Override in blog frontmatter

    let tags = post.tags
        .split(",")
        .map((t) => `#${t}`)
        .slice(0, 2);
</script>

<svelte:head>
    <title>{post.title}</title>
</svelte:head>

<post>
    <h1>{post.title}</h1>
    {#if post.description}
        <small>{post.description}</small>
    {/if}
    <div class="info">
        <small class="updated-date"
            >{post.updated
                ? `updated on ${post.updated} ❖ `
                : `posted on ${post.date}`}</small
        >
        <div class="tags">
            {#each tags as tag}
                <p class="tag">{tag}</p>
            {/each}
        </div>
        {#if post.language}
            <p>{post.language}</p>
        {/if}
        {#if post.framework}
            <p>{post.framework}</p>
        {/if}
    </div>
    <div
        class="content"
        class:focus-mode={focusModeEnabled}
        bind:this={content}
    >
        {#if slug === "full-albums-worth-listening-to"}
            <FullAlbums />
        {:else}
            <svelte:component this={post.content} />
        {/if}
    </div>
</post>

<footer class={$isDarkModeEnabled ? "invert" : ""}>
    <p>Slav Basharov</p>
    <div>
        <a href="https://github.com/basharovV"
            ><img alt="github" src="/github.svg" /></a
        >
        <a href="https://soundcloud.com/vbash"
            ><img alt="soundcloud" src="/soundcloud.svg" /></a
        >
        <a href="mailto:contact@vyacheslavbasharov.com"
            ><img alt="email" src="/email.svg" /></a
        >
    </div>
</footer>

<style lang="scss">
    /*
		By default, CSS is locally scoped to the component,
		and any unused styles are dead-code-eliminated.
		In this page, Svelte can't know which elements are
		going to appear inside the {{{post.html}}} block,
		so we have to use the :global(...) modifier to target
		all elements inside .content
	*/

    @font-face {
        font-family: "IBM Plex Sans";
        src: url("/fonts/IBMPlex/IBMPlexSans-Regular.ttf");
    }

    @font-face {
        font-family: "IBM Plex Sans";
        font-weight: bold;
        src: url("/fonts/IBMPlex/IBMPlexSans-Bold.ttf");
    }

    h1 {
        font-family: Snake;
        font-size: 3.85em;
        margin-bottom: 0;
        text-align: center;
    }
    post {
        display: block;
        max-width: 70em;
        margin: auto;

        .content {
            max-width: 65em;
            margin: auto;
            // only on desktops, no touch devices
            &.focus-mode {
                @media (hover: hover) {
                    &:hover {
                        :global(p),
                        :global(li),
                        :global(h1),
                        :global(h2),
                        :global(h3),
                        :global(h4) {
                            opacity: 0.5;
                            &:hover {
                                opacity: 1 !important;
                            }
                        }
                    }
                }
            }
        }
    }

    small {
        text-align: center;
        display: block;
        max-width: 40em;
        margin: auto;
    }

    .updated-date {
        margin: 0;
    }

    .info {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 1em;
        opacity: 0.5;
    }

    .tags {
        display: flex;
        gap: 1em;
        flex-direction: row;
        .tag {
            padding: 0.3em 0.5em;
            width: max-content;
            /* border: 2px solid rgba(255, 255, 255, 0.2); */
        }
    }

    .content :global(hr) {
        max-width: 5em;
        opacity: 0.5;
    }

    .content :global(h1),
    .content :global(h2),
    .content :global(h3),
    .content :global(h4) {
        position: relative;
        left: -0.75em;
    }
    .content :global(img) {
        width: 100%;
    }

    .content :global(h2) {
        font-size: 1.4em;
        font-weight: 500;
    }

    .content :global(li) {
        line-height: 2em;
        font-size: 1.1rem;
        font-family: "IBM Plex Sans", Tahoma, Geneva, Verdana, sans-serif;
        letter-spacing: 0.04em;
    }

    .content :global(p) {
        line-height: 2em;
        opacity: 0.85;
        font-size: 1.1rem;
        font-family: "IBM Plex Sans", Tahoma, Geneva, Verdana, sans-serif;
        letter-spacing: 0.04em;
        margin: 0;
        padding: 0.5em 0;
    }

    .content :global(pre) {
        background-color: rgba(42, 42, 42, 0.863);
        box-shadow: inset 1px 1px 5px rgba(0, 0, 0, 0.05);
        padding: 0.5em;
        padding-left: 1em;
        border-radius: 2px;
        overflow-x: auto;
        line-height: 1.7em;
        font-size: 1rem;
        border: 2px dashed rgba(106, 106, 106, 0.379);
        border-radius: 4px;
        position: relative;

        :global(.dark-mode) & {
            background: none;
            color: rgb(223, 223, 223);
        }
        :global(.copy-prompt) {
            position: absolute;
            right: 0;
            color: white;
            top: 0em;
            margin: 0.2em 0 0 0;

            :global(p) {
                margin: 0;
                cursor: pointer;
                position: absolute;
                right: 0;
                opacity: 0;
                display: block;
                transition: 0.1s opacity ease-in;
                background-color: #343434;
                padding: 0 0.5em;
            }
            :global(img) {
                height: 35px;
                width: 20px;
                opacity: 1;
                transition: 0.1s opacity ease-in;
                position: absolute;
                right: 1em;
            }
        }

        &:hover {
            :global(.copy-prompt > p) {
                opacity: 1;
            }
            :global(.copy-prompt > img) {
                opacity: 0;
            }
        }
    }

    @keyframes fade {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    .content :global(pre) :global(code) {
        background: none;
        color: rgb(228, 228, 228);
    }
    .content :global(a) > :global(code) {
        background: none;
        color: rgb(76, 75, 75);

        :global(.dark-mode) & {
            color: rgb(228, 228, 228);
        }
    }

    .content > :global(p) > :global(code) {
        color: rgb(242, 125, 125);
        background-color: #ededed;
        font-family: menlo, inconsolata, monospace;
        font-size: calc(1em - 2px);
        padding: 0.2em 0.4em;
        border-radius: 2px;

        :global(.dark-mode) & {
            background-color: #343434;
        }
    }

    /* .content :global(pre) :global(code) {
    background-color: transparent;
    padding: 0;
    color: rgb(57, 57, 57);
    :global(.dark-mode) & {
      background-color: rgb(57, 57, 57);
      color: rgb(223, 223, 223);
    }
  } */

    .content > :global(ul) {
        line-height: 1.5;
        border-left: 1px solid rgb(93, 91, 91);

        :global(.dark-mode) & {
            border-left: 1px solid rgba(127, 125, 125, 0.452);
        }
    }

    .content :global(li) {
        margin: 0 0 0.5em 0;
        position: relative;
    }

    .content > :global(ul) > :global(li)::before {
        content: "";
        width: 30px;
        height: 1px;
        position: absolute;
        left: -40px;
        top: 17.5px;
        background-color: rgb(93, 91, 91);
        z-index: -1;
        :global(.dark-mode) & {
            background-color: rgba(127, 125, 125, 0.452);
        }
    }

    .content > :global(ul) > :global(li)::marker {
        color: rgb(93, 91, 91);

        :global(.dark-mode) & {
            color: rgb(241, 235, 235);
        }
    }

    .content :global(ol) {
        line-height: 1.5;
        border-left: 1px solid rgb(93, 91, 91);

        :global(.dark-mode) & {
            border-left: 1px solid rgb(196, 187, 187);
        }
    }
    .content :global(ol) :global(li)::before {
        content: "";
        width: 15px;
        height: 1px;
        position: absolute;
        left: -40px;
        top: 17.5px;
        background-color: rgb(93, 91, 91);
        :global(.dark-mode) & {
            background-color: rgb(196, 187, 187);
        }
    }

    .content :global(callout) {
        display: flex;
        position: relative;
        /* border: 1px solid rgba(123, 122, 122, 0.478); */
        /* border-radius: 5px; */
        padding: 0.75em;
        margin: 0.5em;
        color: rgb(155, 155, 155);
        :global(p),
        :global(small) {
            margin: 0;
            width: 100%;
            line-height: initial;
            text-align: center;
            padding: 0;
            &::before {
                content: "💿";
                margin-right: 1em;
            }
        }

        :global(.dark-mode) & {
            border-bottom: 1px dashed rgba(123, 122, 122, 0.478);
        }
    }

    footer {
        display: flex;
        flex-direction: column;
        font-family: Snake, Georgia, "Times New Roman", Times, serif;
        font-size: 2em;
        margin: 3em auto 0;
        > p {
            text-align: center;
        }
        > div {
            margin: auto;
            display: flex;
            flex-direction: row;
            gap: 10px;
        }
    }

    .invert img {
        filter: invert(1);
    }
</style>
