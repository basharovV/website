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
        url: `https://vyacheslavbasharov.com`,
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
        class="icon"
        style="grid-area: a;margin:auto;width: 30px;"
        alt="Logo"
        src="/logo.svg"
    />
    <header>
        <h3
            style="margin: 0;text-align: center;font-family: Snake;font-size: 3em;"
        >
            Hello! I'm Slav
        </h3>
        <br />
        <h2 style="text-align: center;">
            I
            <a href="/dev">make software</a>
            and
            <a href="/music">write music</a>
        </h2>
        <img alt="cd" src="icons/cd6.gif" />
    </header>

    <div class="sections">
        <section>
            <h3>currently building:</h3>

            <p>
                <a href="https://github.com/basharovV/musicat">musicat</a>: a
                sleek desktop music player for artists and musicians
            </p>
            <small
                >/read the <a href="/blog/building-music-player-tauri-svelte"
                    >devblog</a
                >/</small
            >

            <h3>other tech:</h3>
            <p>
                <a href="https://tbxproject.com">tbx</a>: browser extension for
                collaborative browsing
            </p>

            <p>
                <a href="https://github.com/basharovV/StumbleUponAwesome"
                    >StumbleUponAwesome</a
                >: remember StumbleUpon? It's like that, but for tech sites.
                <a href="https://github.com/basharovV/StumbleUponAwesome">
                    <img
                        class="stars"
                        src="https://img.shields.io/github/stars/basharovV/stumbleuponawesome.svg?style=social&label=Star&maxAge=2592000"
                        alt=""
                    />
                </a>
            </p>
        </section>
        <div class="separator" />
        <section style="grid-area: d;">
            <br />
            <br />
            <div>
                <a
                    class="image-link"
                    href="https://vyacheslavbasharov.bandcamp.com/track/improv-i"
                >
                    <img src="/music/ImprovI.jpeg" />
                </a>
                <TrackMiniPlayer
                    trackUrl="https://soundcloud.com/elpatorecords/cause-studio-outtake"
                    isDarkModeEnabled={$isDarkModeEnabled}
                />
                <TrackMiniPlayer
                    trackUrl="https://soundcloud.com/vbash/mind-wandering"
                    isDarkModeEnabled={$isDarkModeEnabled}
                />
            </div>
        </section>
    </div>

    <footer class={$isDarkModeEnabled ? "invert" : ""}>
        <p>Vyacheslav Basharov</p>
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
        max-width: 900px;
        display: flex;
        flex-direction: column;
        margin: auto;

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
