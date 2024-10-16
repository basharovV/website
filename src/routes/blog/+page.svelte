<script context="module">
    export async function load({ params, query, fetch }) {
        const posts = await fetch(`/blog.json`).then((r) => r.json());
        return {
            props: { posts: posts.sort((a, b) => a.date.localeCompare(b.date)) }
        };
    }
</script>

<script>
    export let data;

    console.log("data", data);
    import { isDarkModeEnabled } from "../../store/state";
</script>

<svelte:head>
    <title>Blog</title>
</svelte:head>

<h1>Blog</h1>
<p>Some words about tech & music.</p>

<ul>
    {#each data.body as post}
        <!-- we're using the non-standard `rel=prefetch` attribute to
				tell Sapper to load the data for the page as soon as
				the user hovers over the link or taps it, instead of
				waiting for the 'click' event -->
        <li>
            <a rel="prefetch" href="/blog/{post.slug}">{post.title}</a>
            <small>{post.date}</small>
            {#if !post.published}
                <small class="wip">WIP</small>
            {/if}
            <span style="opacity: 0.6;"
                >{post.tags
                    .split(",")
                    .map((t) => `#${t}`)
                    .slice(0, 2)
                    .join(",")}</span
            >
        </li>
    {/each}
</ul>

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

<div class="comingsoon {$isDarkModeEnabled ? 'invert' : ''}">
    <img src="/bulby_bulb.png" alt="" />
</div>

<style lang="scss">
    * {
        text-align: center;
    }
    ul {
        margin: 0 auto;
        line-height: 1.5;
        list-style: none;
        padding: 0;
        max-width: fit-content;
    }

    .wip {
        border: 2px solid black;
        border-radius: 4px;
        padding: 3px 5px;
    }
    li {
        padding: 0.5em 0;
        display: flex;
        align-items: center;
        gap: 0.75em;
        flex-wrap: wrap;
        a {
            text-align: start;
            width: max-content;
            @media screen and (max-width: 600px) {
                width: 100%;
            }
        }
    }
    .comingsoon {
        margin: 3em auto 0;
        width: 100%;
        flex: 1 1 220px;

        img {
            height: 150px;
            display: block;
            margin: auto;
            transition: filter cubic-bezier(0.6, -0.28, 0.735, 0.045) 0.3s 0.02s;
        }
        &.invert {
            img {
                filter: invert(1);
            }
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

        &.invert img {
            filter: invert(1);
        }
    }
</style>
