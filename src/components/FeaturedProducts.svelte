<script lang="ts">
    import type { Product } from "../interfaces";
    import { isDarkModeEnabled } from "../store/state";

    import FeaturedProduct from "./FeaturedProduct.svelte";

    export let products: Product[];
</script>

<div class="container">
    <div class="banner">
        <small
            >👋 Hola! If you see <i>"Price: up to you :)"</i>, you can choose to
            pay a few bucks if you'd like to support my work. Thanks! - Slav</small
        >
        <img src="/profile.jpg" alt="Slav" />
    </div>
    {#each products as product, index}
        <FeaturedProduct {product} {index}>
            <!-- <div slot="custom">
        <h4>Audio samples:</h4>
        <TrackMiniPlayer trackId="1011296332" accent="1e2424" />
        <TrackMiniPlayer trackId="963507499" accent="1e2424" />
      </div> -->
        </FeaturedProduct>
    {/each}
    <div class="comingsoon {$isDarkModeEnabled ? 'invert' : ''}">
        <img src="/bulby_bulb.png" alt="" />
        <p>More coming soon!</p>
    </div>
</div>

<style lang="scss">
    .container {
        overflow: visible;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 1em;
        margin-top: 1em;
    }

    .banner {
        width: 100%;
        padding: 0.5em 1em;
        background: rgba(83, 199, 145, 0.187);
        /* border-bottom: 1px solid rgba(0, 0, 0, 0.09); */
        color: rgb(5, 182, 91);
        text-align: center;
        position: relative;

        @media only screen and (min-width: 1650px) {
            position: absolute;
            left: 50px;
            width: 350px;
            top: 22.5em;
        }

        > img {
            width: 40px;
            position: absolute;
            left: -20px;
            top: 0;
            bottom: 0;
            border-radius: 50px;
            border: 3px solid white;
            margin: auto;
        }
    }

    .comingsoon {
        margin: auto;
        width: 100%;
        padding: 2em 0;
        p {
            text-align: center;
            color: rgb(187, 173, 173);
        }

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
</style>
