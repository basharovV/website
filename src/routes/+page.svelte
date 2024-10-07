<script>
    import TrackMiniPlayer from "../components/TrackMiniPlayer.svelte";
    import YoutubeVideo from "../components/YoutubeVideo.svelte";
    import { isDarkModeEnabled } from "../store/state.js";
    import SvelteSeo from "svelte-seo";
</script>

<SvelteSeo
    title="Vyacheslav Basharov | Developer & Composer"
    description="I make music, software and musical software."
    openGraph={{
        title: "Vyacheslav Basharov | Developer & Composer",
        description: "I make music, software and musical software.",
        url: `https://slavbasharov.com`,
        type: "website",
        images: [
            {
                url: "logo-512.png",
                width: 850,
                height: 650,
                alt: "logo"
            }
        ]
    }}
/>

<div class="container {$isDarkModeEnabled ? 'invert' : ''}">
    <img
        alt="cd"
        class="icon"
        src="icons/cd6.gif"
        style="grid-area: a;margin:auto;width: 30px;"
    />
    <header>
        <h3
            style="margin: 0;text-align: center;font-family: Snake;font-size: 3em;"
        >
            Hello! I'm Slav
        </h3>

        <br />

        <p style="text-align: center;">
            I
            <a href="/dev">make software</a>
            and
            <a href="/music">write music</a>
        </p>
    </header>

    <section>
        <p>
            Currently working on <a href="https://github.com/basharovV/musicat"
                >Musicat</a
            >
            <br />
            <img
                class="stars"
                src="https://img.shields.io/github/stars/basharovV/musicat.svg?style=social&label=Stars&maxAge=2592000{$isDarkModeEnabled ? '&color=black&labelColor=white' : ''}"
                alt=""
            />
        </p>
    </section>

    <footer class={$isDarkModeEnabled ? "invert" : ""}>
        <p>Slav Basharov</p>
        <div>
            <a href="https://github.com/basharovV"
                ><img class="icon" alt="github" src="/github.svg" /></a
            >
            <a href="https://soundcloud.com/vbash"
                ><img class="icon" alt="soundcloud" src="/soundcloud.svg" /></a
            >
            <a href="mailto:contact@vyacheslavbasharov.com"
                ><img class="icon" alt="email" src="/email.svg" /></a
            >
        </div>
    </footer>
</div>

<style lang="scss">
    .container {
        padding-top: 4em;
        display: flex;
        flex-direction: column;
        margin: auto;
        width: 100%;

        .subtitle {
            opacity: 0.6;
            line-height: 2em;
        }
        > div {
            display: flex;
            flex-direction: row;
            gap: 100px;

            @media only screen and (max-width: 522px) {
                flex-wrap: wrap;
            }

            > section {
                max-width: 50%;
                display: flex;
                flex-direction: column;

                @media only screen and (max-width: 522px) {
                    max-width: 100%;
                }
                p {
                    color: grey;
                    > a {
                        color: black;
                        :global(.dark-mode) & {
                            color: white;
                        }
                    }
                }
            }
        }
    }

    .stars {
        height: 21px;
        margin-top: 0.5em;
        width: auto;
        object-fit: contain;
        vertical-align: sub;
        opacity: 0.5;
    }

    .sections {
        position: relative;
    }
    section {
        margin: 0;
        width: 100%;
        p {
            text-align: center;
        }
    }

    .image-link {
        > img {
            display: block;
            width: 100%;
        }
    }

    .separator {
        position: absolute;
        left: 50%;
        right: 50%;
        top: 0;
        bottom: 0;
        width: 1px;
        height: 100%;
        background-color: rgb(234, 233, 233);
        :global(.dark-mode) & {
            background-color: rgb(62, 60, 60);
        }
        @media only screen and (max-width: 522px) {
            display: none;
        }
    }

    header {
        margin: 1em auto 0;
        position: relative;
    }

    h2 {
        display: inline-block;
    }

    h3 {
        margin-top: 2em;
    }

    @media only screen and (max-width: 643px) {
        h2 {
            display: block;
        }
    }

    a {
        &:hover {
            opacity: 0.6;
        }
    }

    @media only screen and (max-width: 522px) {
        .mobile-hide {
            display: none;
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

    .invert .icon {
        filter: invert(1);
    }

    small {
        margin: 0.5em 0 1em 0;
    }
</style>
