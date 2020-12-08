<script>
    import { onMount } from "svelte";

    import TrackMiniPlayer from "../components/TrackMiniPlayer.svelte";

    let refresh = 0;

    let darkMode;
    let mounted;

    onMount(() => {
        darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
        mounted = true;
    });

    $: if (mounted) {
        if (darkMode) window.document.body.classList.add("dark-mode");
        else window.document.body.classList.remove("dark-mode");
    }
</script>

<style lang="scss">
    a {
        &:hover {
            opacity: 0.6;
        }
    }

    :global(body) {
        transition: background-color cubic-bezier(0.6, -0.28, 0.735, 0.045) 0.3s;
        // transition: color cubic-bezier(0.6, -0.28, 0.735, 0.045) 0.3s;
    }

    :global(.dark-mode) {
        background-color: black !important;
        color: white;
    }

    * {
        font-family: "Snake" !important;
    }

    h3 {
        margin-top: 2em;
        background-color: black;
        color: white;
        width: fit-content;
    }

    img {
        width: 100%;
        border-radius: 4px;
        display: inline-block;
        // filter: grayscale(1);

        // &:hover {
        //     filter: grayscale(0);
        // }
        /* vertical-align: top; */
    }

    .container {
        font-size: 2em !important;
    }

    .content {
        column-count: 2;

        @media only screen and (max-width: 522px) {
            column-count: 1;
            display: inline;
        }
    }

    section {
    }

    figure {
        margin: 0;

        caption {
            width: max-content;
        }
    }

    .image-grid {
        column-count: 3;
        column-gap: 0;
        img {
            width: 100%;
            display: block;
            padding: 2px;
            box-sizing: border-box;
        }
    }

    iframe {
        position: relative;
    }

    header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
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

    footer {
        display: flex;
        flex-direction: column;
        font-family: Snake, Georgia, "Times New Roman", Times, serif;
        // font-size: 2em;
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

    .dark-footer img {
        filter: invert(1);
    }
</style>

<svelte:head>
    <title>Vyacheslav Basharov • Composer</title>
</svelte:head>

<div class="container">
    <header>
        <h2 style="margin-bottom: 0;">Vyacheslav Basharov</h2>

        <a style="display: flex;" href="/"><img
                style="margin:auto;width: 30px;"
                alt="Logo"
                src="logo.svg" /></a>

        <small style="opacity: 0.6;margin:0"><a
                style="text-decoration: none"
                href="mailto:contact@vyacheslavbasharov.com">contact@vyacheslavbasharov.com</a></small>
    </header>

    <section>
        <p style="opacity: 0.6;">
            I'm a composer and pianist, always looking for new sounds, but still
            staying true to cinematic, electronic and jazz elements. This page
            is a demo reel/showcase/portfolio of my music. Thanks for checking
            it out!<a href="https://soundcloud.com/vbash">More music on my
                SoundCloud -></a>
        </p>
        <!-- <small >My email is contact@vyacheslavbasharov.com.</small> -->
    </section>
    <div
        class="theme-toggle"
        style="display: flex;justify-content: flex-end;align-items: center;">
        <small>Theme:&nbsp;</small>
        <svg on:click={() => (darkMode = true)} height="20px" width="20px">
            <circle
                cx="10"
                cy="10"
                r="8"
                stroke="white"
                stroke-width="3"
                fill="black" />
        </svg>
        <svg on:click={() => (darkMode = false)} height="20px" width="20px">
            <circle
                cx="10"
                cy="10"
                r="8"
                stroke="black"
                stroke-width="3"
                fill="white" />
        </svg>
    </div>
    <div class="content">
        <section>
            <h3>🎹 Pianosphere</h3>
            <p>
                Pianosphere is neo-classical album I'm working on to explore and
                capture the sound of the piano in new ways. I already have a few
                demo recordings, some of which can be heard on my SoundCloud:
            </p>

            <TrackMiniPlayer trackId="817156018" {darkMode} />
            <TrackMiniPlayer trackId="818507320" {darkMode} />
            <TrackMiniPlayer trackId="814447339" {darkMode} />
            <br />
            <div class="image-grid">
                <img src="music/pianosphere/MVIMG_20200421_194344.jpg" />
                <img src="music/pianosphere/MVIMG_20200504_151957.jpg" />
                <!-- <img src="music/pianosphere/MVIMG_20200509_141820.jpg" /> -->
                <img src="music/pianosphere/MVIMG_20200510_171435.jpg" />
            </div>
        </section>
        <section>
            <h3>🔉 Samples</h3>
            <h4>VB Materials - Glass</h4>
            <p>
                I've recorded a few glass percussion samples if you'd like to
                use them.
            </p>
            <a href="https://freesound.org/people/basharov/packs/22959/">Go to
                Freesound -></a>
        </section>

        <section style="break-before: column;">
            <h3>🎬 Film scoring</h3>
            <p>
                Film music composition is an amazing art that I've been
                attracted to ever since I've had the pleasure of composing for a
                couple of short films:
            </p>

            <div style="display: grid;gap: 30px;">
                <div style="display: grid;grid-template-columns: 1fr 2fr;">
                    <img
                        style="float:left;"
                        src="https://i1.sndcdn.com/artworks-000331072095-0k7jva-t500x500.jpg" />
                    <small style="display:block;padding: 0px 10px;margin: 0;">
                        Blood of Poet is an experimental short film I scored
                        based on philosophical poetry by Diego de Los Andes.
                        <a
                            href="https://www.youtube.com/watch?v=yjVuJdENXTk">Watch
                            on YouTube</a>
                    </small>
                </div>

                <div style="display: grid;grid-template-columns: 2fr 1fr;">
                    <small style="display:block;padding: 0px 10px;margin: 0;">
                        Into The Loo is a fun student short film about a boy
                        shutting away the outside world by locking himself in
                        the loo.
                    </small>
                    <img
                        style="float:right;"
                        src="https://i1.sndcdn.com/artworks-000237636541-hf6qgz-t500x500.jpg" />
                </div>

                <div>
                    <TrackMiniPlayer trackId="337202935" {darkMode} />
                    <TrackMiniPlayer trackId="337202945" {darkMode} />
                    <small><a
                            href="https://soundcloud.com/vbash/sets/into-the-loo-short-film-soundtrack">Full
                            album on SoundCloud</a>
                    </small>
                </div>
            </div>
        </section>
        <section>
            <h3>🎬 Westworld Competition</h3>
            <p>
                I took part in the online film music competition from Spitfire
                Audio and HBO, scoring a car chase sequence from Westworld
                season 3. Have a look at my entry on YouTube:
            </p>
            <div
                style="
                width: 400px;
                height: 250px;">
                <iframe
                    on:load={() => {
                        refresh += 1;
                    }}
                    style="position: absolute;
                    border-radius: 10px;
                    border: 2px solid black;
                    padding: 2px;"
                    width="400px"
                    height="250px"
                    src="https://www.youtube-nocookie.com/embed/KPugdlU8GRs"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen />
            </div>
        </section>
    </div>

    <footer class={darkMode ? 'dark-footer' : ''}>
        <p>Vyacheslav Basharov</p>
        <div>
            <a href="https://github.com/basharovV"><img
                    alt="github"
                    src="github.svg" /></a>
            <a href="https://soundcloud.com/vbash"><img
                    alt="soundcloud"
                    src="soundcloud.svg" /></a>
            <a href="mailto:contact@vyacheslavbasharov.com"><img
                    alt="email"
                    src="email.svg" /></a>
        </div>
    </footer>
</div>
