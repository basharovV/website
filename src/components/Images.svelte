<script>
    import Carousel from "@beyonk/svelte-carousel";
    import { fade } from "svelte/transition";
    export let images;
    export let image;
    export let width = '90%';
    let fullScreenImg = false;
    let currentSlide = 0;
</script>

<style lang="scss">
    img {
        width: 90%;
        margin: auto;
        display: block;

        &:hover {
            cursor: zoom-in;
        }
    }

    .full-screen {
        position: fixed;
        display: flex;
        width: 100vw;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 100;
        background: rgba(0, 0, 0, 0.4);

        > img {
            margin: auto;
            &:hover {
                cursor: zoom-out;
            }
        }

        > h1 {
            &:hover {
                cursor: pointer;
                opacity: 0.5;
            }
        }
    }

    .slide-content {
        width: 100%;
    }

    .control {
        &:hover {
            opacity: 0.5;
            cursor: pointer;
        }
    }

    .disabled {
        opacity: 0.5;
        cursor: initial;
    }

    :global(.left) {
        left: -15px !important;
    }

    :global(.right) {
        right: -15px !important;
    }

    :global(.carousel > ul) {
        margin-top: 0 !important;
        position: relative  !important;
    }

    :global(.carousel > ul > li) {
        background-color: rgba(0, 0, 0, 0.4) !important;
    }

    :global(.carousel > ul > .active) {
        background-color: rgba(0, 0, 0, 0.8) !important;
    }
</style>

{#if images && images.length > 1}
    <div>
        <Carousel
            perPage={{ 800: 2, 500: 1 }}
            on:change={(event) => {
                currentSlide = event.detail.currentSlide;
            }}>
            <span class="control"  slot="left-control"> &lt;-- </span>
            <span class="control" slot="right-control"> --&gt; </span>
            {#each images as image}
                <div
                    class="slide-content"
                    on:click={() => {
                        fullScreenImg = image;
                    }}>
                    <img alt="image1" src={image} />
                </div>
            {/each}
        </Carousel>
    </div>
{:else if image}<img on:click={() => {
    fullScreenImg = image;
}} alt="image1" src={image} style="width: {width}"/>{/if}

{#if fullScreenImg}
    <div transition:fade={{ duration: 100 }} class="full-screen">
        <img
            on:click={() => (fullScreenImg = null)}
            alt="image1"
            src={fullScreenImg} />
        <h1
            on:click={() => (fullScreenImg = null)}
            style="position: fixed; top: 1em; right: 1em;">
            X
        </h1>
    </div>
{/if}
