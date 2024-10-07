<script context="module">
  const artistFilter = "by Vyacheslav Basharov | composer";

  const getTrack = async (url, fetch) => {
    return fetch(`https://soundcloud.com/oembed.json?url=${url}`)
      .then((response) => response.json())
      .then((response) => ({
        ...response,
        title: response.title.replace(artistFilter, ""),
        iframeSrc:
          response.html.match(new RegExp('src="' + "(.*)" + '"'))[1] +
          `&sharing=false&auto_play=false&hide_related=true&show_comments=true&show_user=false&show_reposts=false&show_teaser=false`,
      })).catch(err=>{});
  };

  export async function load({ params, fetch }) {
    // the `slug` parameter is available because
    // this file is called [slug].svelte
    const res = await fetch(`/shop/${params.slug}.json`);
    const data = await res.json();

    let tracks = [];
    if (data.trackUrls) {
      tracks = await Promise.all(
        data.trackUrls.map((url) => getTrack(url, fetch))
      );
    }

    if (data) {
      return {
        props: {
          data: data,
          tracks,
        },
      };
    } else {
      return {
        error: "Not found",
      };
    }
  }
</script>

<script lang="ts">
    import SvelteSeo from "svelte-seo";
    import TrackMiniPlayer from "../../../components/TrackMiniPlayer.svelte";

    export let data;
    export let tracks;

    console.log('data', data);

    export let seoTitle = `${data.body.name} | ${data.body.price ? "" : "free"} ${
        data.body.type
    } | vb shop`;
</script>

<SvelteSeo
    title={seoTitle}
    description={data.body.description}
    openGraph={{
        title: seoTitle,
        description: data.body.description,
        url: `https://slavbasharov.com/${data.body.url}`,
        type: "website",
        images: [
            {
                url: data.body.image,
                width: 850,
                height: 650,
                alt: data.body.name
            }
        ]
    }}
/>

<!-- <a href="/shop">&lt- Back to shop</a> -->
<br />
<br />
<div class="container">
    <div class="tags">
        {#each data.body.tags as tag}
            <div class="tag">{tag}</div>
        {/each}
    </div>
    <img class="banner" src={data.body.bannerImage} />

    <div class="description"><p>{data.body.description}</p></div>
    {#if tracks && tracks.length}
        <h4>Listen to the demos:</h4>

        <div class="listen">
            {#each tracks as track}
                <TrackMiniPlayer
                    {track}
                    isDarkModeEnabled={true}
                    accent="e60303"
                />
            {/each}

            <div>
                <a
                    href="https://payhip.com/b/{data.body.data.bodyId}"
                    class="payhip-buy-button"
                    data-message={data.body.paymentDescription}
                    data-title="Download {data.body.name}"
                    data-data.body={data.body.data.bodyId}
                    data-theme="none">Get it</a
                >
            </div>
        </div>
    {/if}
    <div class="gradient" />
    <div class="item-grid">
        <!-- <div class="data.body-image">
      <a rel="prefetch" href="shop/{data.body.id}">
        <img src={data.body.image} />
      </a>
      <svg viewBox="0 0 100 100">
        <rect fill={data.body.color} width="100%" height="100%" />
      </svg>
    </div> -->
        <content>
            {#if data.body.screenshot}<img
                    class="screenshot"
                    src={data.body.screenshot}
                />{/if}

            {@html data.body.longDescription}

            <small class="size">💾 {data.body.size} zip file</small>

            {#if data.body.price}
                <p>€{data.body.price}</p>
            {:else}
                <p>Price: up to you :)</p>
            {/if}

            <a
                href="https://payhip.com/b/{data.body.productId}"
                class="payhip-buy-button"
                data-message={data.body.paymentDescription}
                data-title="Download {data.body.name}"
                data-data.body={data.body.productId}
                data-theme="none">Get it</a
            >
        </content>
    </div>
</div>

<style lang="scss">
    .description {
        margin: auto;
        text-align: center;
        max-width: 490px;
        /* background: rgba(0, 0, 0, 0.783); */
        color: white;
        padding: 0 2em;
        /* border: 2px solid black; */
        z-index: 2;
        /* border-radius: 3px; */
        /* backdrop-filter: blur(4px); */
    }

    .container {
        padding: 1em;
        text-align: center;
        /* background: rgba(255, 255, 255, 0.262); */
    }

    .data.body-image {
        position: relative;
        max-width: 300px;
    }

    .item-grid {
        display: flex;
        flex-direction: row;
        justify-content: center;

        @media only screen and (max-width: 600px) {
            flex-direction: column;
            align-items: center;
        }
    }

    .listen {
        display: grid;
        max-width: 600px;
        margin: auto;
        align-items: center;
        grid-template-columns: 2fr 1fr;

        > div {
        }
    }

    content {
        padding: 0 2em 2em 2em;
        :global(li) {
            width: fit-content !important;
            margin: auto;
        }
    }

    h4 {
        margin: 1em 0;
    }

    .screenshot {
        margin: 2em 0;
        border: 2px solid rgb(133, 133, 133);
    }

    .banner {
        width: 100%;
        height: 350px;
        z-index: -2;
        position: absolute;
        top: -2em;
        left: 0;
        right: 0;
        object-fit: cover;
        animation: float-and-scale 3s infinite ease-in-out;
    }
    .gradient {
        position: absolute;
        z-index: -1;
        height: 350px;
        width: 100%;
        top: 0;
        left: 0;
        right: 0;
        background: linear-gradient(
            to top,
            rgb(255, 255, 255) 10%,
            rgba(255, 255, 255, 0.5) 30%,
            transparent
        );

        :global(.dark-mode) & {
            background: linear-gradient(
                to top,
                rgb(24, 24, 24) 4%,
                transparent 50%
            );
        }
    }

    @keyframes float {
        0% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(5px);
        }
        100% {
            transform: translateY(0px);
        }
    }

    @keyframes float-and-scale {
        0% {
            transform: scale(1) translateY(0);
        }
        50% {
            transform: translateY(5px);
        }
        100% {
            transform: scale(1) translateY(0px);
        }
    }

    .size {
        margin-top: 1em;
        display: block;
        opacity: 0.5;
    }

    .custom {
        display: flex;
        margin: 1em 0;
    }

    .tags {
        margin-top: 6em;
        margin-bottom: 1.5em;
        display: flex;
        z-index: 4;
        align-items: center;
        justify-content: center;
        animation: float 3s 0.2s infinite ease-in-out;

        $colors:
            rgb(120, 89, 193),
            rgb(210, 160, 68),
            rgb(56, 184, 163),
            rgb(55, 155, 49) rgb(39, 39, 152) ue,
            rgb(53, 0, 128);

        @for $i from 1 through length($colors) {
            div:nth-child(#{length($colors)}n + #{$i}) {
                padding: 0.5em 1em;
                margin: 0.2em 0.3em;
                width: fit-content;
                border-radius: 15px;
                outline: 1.8px solid rgba(130, 130, 130, 0.209);
                backdrop-filter: blur(1.8px);
                background: rgba(46, 46, 46, 0.571);
                color: rgb(210, 210, 210);
                transform: scale(0.9);
            }
        }
    }

    img {
        width: 100%;
        height: auto;
        z-index: 3;
        position: relative;
        transition: all 1s ease-in-out;
        margin-bottom: 1em;
    }

    .payhip-buy-button {
        display: inline-block;
    }

    svg {
        width: 100%;
        height: auto;
        position: absolute;
        top: 5px;
        left: 5px;
        z-index: 1;
        box-shadow: 2px 2px 20px rgba(0, 0, 0, 0.411);

        rect {
            /* fill: rgb(0, 187, 255); */
        }
    }
</style>
