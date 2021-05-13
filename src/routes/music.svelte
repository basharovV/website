<script>
  import { onMount } from "svelte";

  import TrackMiniPlayer from "../components/TrackMiniPlayer.svelte";
  import { isDarkModeEnabled } from "../store/state.js";

  let refresh = 0;

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

<svelte:head>
  <title>Vyacheslav Basharov • Composer</title>
</svelte:head>

<div class="container">
  <div class="background">
    {#if $isDarkModeEnabled}
      <div class={$isDarkModeEnabled ? "invert" : ""} id="image" />
    {/if}
    <div class={$isDarkModeEnabled ? "invert" : ""} id="gradient" />
  </div>
  <header>
    <h2 style="margin-bottom: 0;">Vyacheslav Basharov</h2>

    <a
      class={$isDarkModeEnabled ? "invert" : ""}
      style="display: flex;"
      href="/"
      ><img style="margin:auto;width: 30px;" alt="Logo" src="logo.svg" /></a
    >

    <small style="opacity: 0.6;margin:0"
      ><a
        style="text-decoration: none"
        href="mailto:contact@vyacheslavbasharov.com"
        >contact@vyacheslavbasharov.com</a
      ></small
    >
  </header>

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
  <section class="top-section">
    <left>
      <p style="opacity: 0.6;">
        I'm a composer and pianist, always looking for new sounds, but staying
        true to cinematic, electronic and jazz elements. This page is a
        portfolio of my music. Thanks for checking it out!
      </p>
    </left>
    <right>
      <small
        >Need original music? Want to collab? I'm open! Click below to send
        me an email:
      </small>
      <div class="contact">
        <img src="pigeon.png" />
        <a
          style="text-decoration: none"
          href="mailto:contact@vyacheslavbasharov.com">
          <button>Send an electronic pigeon</button>
        </a>
      </div>
    </right>

    <!-- <small >My email is contact@vyacheslavbasharov.com.</small> -->
  </section>

  <section class="heading">
    <div>
      <h1 id="title">music portfolio 👇</h1>
      <h2 id="subtitle">(in no particular order)</h2>
    </div>
  </section>
  <div class="content">
    <section>
      <h3>🔌 Rhodesian Keys</h3>
      <p>My first software instrument :)</p>
      <p>
        I had to get my hands on a Rhodes, and when I did, I had to sample it!
        Rhodesian Keys is a software instrument sampled from a Rhodes Mark I
        1973, and I'll be releasing this as a VST plugin on this website.
      </p>
      <div class="embed">
        <iframe
          on:load={() => {
            refresh += 1;
          }}
          loading="lazy"
          width="400px"
          height="250px"
          src="https://www.youtube-nocookie.com/embed/2PP0OrzS_k8"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        />
      </div>
    </section>
    <section class="magic-touch">
      <h3>🥁 The Magic Touch Collective</h3>
      <img src="music/magic-touch-logo.png" alt="Magic Touch Collective logo"/>
      <p>
        This is my band (fusion, latin, folk, rock), currently performing in
        Marbella and working on our debut album. Check us out on <a
          href="https://magictouchband.com">magictouchband.com</a
        >
        or follow us on
        <a href="https://instagram.com/magictouchmarbella">Instagram</a>
      </p>
    </section>
    <section>
      <h3>🎧 Featured music</h3>
      <p>
        I regularly upload cinematic, experimental, progressive, electronic and
        jazzy tracks on my SoundCloud. Sometimes I also do covers and remixes,
        and publish unedited live jam sessions.
      </p>
      <TrackMiniPlayer
        trackId="940950685"
        isDarkModeEnabled={$isDarkModeEnabled}
        accent="e60303"
      />
      <TrackMiniPlayer
        trackId="806529274"
        isDarkModeEnabled={$isDarkModeEnabled}
        accent="e60303"
      />
      <TrackMiniPlayer
        trackId="341813329"
        isDarkModeEnabled={$isDarkModeEnabled}
        accent="e60303"
      />
      <TrackMiniPlayer
        trackId="500505501"
        isDarkModeEnabled={$isDarkModeEnabled}
        accent="e60303"
      />
      <TrackMiniPlayer
        trackId="531832953"
        isDarkModeEnabled={$isDarkModeEnabled}
        accent="e60303"
      />
    </section>
    <section>
      <h3>🎹 Pianosphere</h3>
      <p>
        Pianosphere is neo-classical album I'm working on to explore and capture
        the sound of the piano in new ways.
      </p>

      <iframe
        style="border: 0; width: 100%; height: 42px;"
        src="https://bandcamp.com/EmbeddedPlayer/track=821474887/size=small/bgcol=ffffff/linkcol=63b2cc/transparent=true/"
        seamless
        ><a href="https://vyacheslavbasharov.bandcamp.com/track/improv-i"
          >null by Vyacheslav Basharov</a
        ></iframe
      >

      <TrackMiniPlayer
        trackId="817156018"
        isDarkModeEnabled={$isDarkModeEnabled}
      />
      <TrackMiniPlayer
        trackId="814447339"
        isDarkModeEnabled={$isDarkModeEnabled}
      />
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
        I've recorded a few glass percussion samples if you'd like to use them.
      </p>
      <a href="https://freesound.org/people/basharov/packs/22959/"
        >Go to Freesound -></a
      >
    </section>

    <section>
      <h3>🎞 Sci-fi game trailer re-score</h3>
      <p>
        A re-score of a Sci-fi MMORPG game trailer as an epic orchestral
        adventure theme.
      </p>

      <div class="embed">
        <iframe
          loading="lazy"
          width="400px"
          height="250px"
          src="https://player.vimeo.com/video/491425916"
          frameborder="0"
          allow="autoplay; fullscreen"
          allowfullscreen
        />
      </div>
    </section>

    <section style="break-before: column;">
      <div
        style="display: grid; grid-template-columns: 1fr auto;margin-top: 2em;align-items: center;"
      >
        <h3 style="width: fit-content;margin: 0;">🎬 Film scoring</h3>
        <small>
          <a
            style="color: grey;"
            href="https://www.imdb.com/name/nm9098356/?ref_=ttfc_fc_cr5"
          >
            My IMDB -></a
          >
        </small>
      </div>
      <p>
        Film music composition is an amazing art that I've been attracted to
        ever since I've had the pleasure of composing for a couple of short
        films:
      </p>

      <div style="display: grid;gap: 30px;">
        <div style="display: grid;grid-template-columns: 1fr 2fr;">
          <img
            style="float:left;"
            src="https://i1.sndcdn.com/artworks-000331072095-0k7jva-t500x500.jpg"
          />
          <small style="display:block;padding: 0px 10px;margin: 0;">
            Blood of Poet is an experimental short film I scored based on
            philosophical poetry by Diego de Los Andes.
            <a href="https://www.youtube.com/watch?v=yjVuJdENXTk"
              >Watch on YouTube</a
            >
          </small>
        </div>

        <div style="display: grid;grid-template-columns: 2fr 1fr;">
          <small style="display:block;padding: 0px 10px;margin: 0;">
            Into The Loo is a fun student short film about a boy shutting away
            the outside world by locking himself in the loo.
          </small>
          <img
            style="float:right;"
            src="https://i1.sndcdn.com/artworks-000237636541-hf6qgz-t500x500.jpg"
          />
        </div>

        <div>
          <TrackMiniPlayer
            trackId="337202935"
            isDarkModeEnabled={$isDarkModeEnabled}
          />
          <TrackMiniPlayer
            trackId="337202945"
            isDarkModeEnabled={$isDarkModeEnabled}
          />
          <small
            ><a
              href="https://soundcloud.com/vbash/sets/into-the-loo-short-film-soundtrack"
              >Full album on SoundCloud -></a
            >
          </small>
        </div>
      </div>
    </section>
    <section>
      <h3>🎬 Westworld Competition</h3>
      <p>
        I took part in the online film music competition from Spitfire Audio and
        HBO, scoring a car chase sequence from Westworld season 3. Have a look
        at my entry on YouTube:
      </p>
      <div class="embed">
        <iframe
          on:load={() => {
            refresh += 1;
          }}
          loading="lazy"
          width="400px"
          height="250px"
          src="https://www.youtube-nocookie.com/embed/KPugdlU8GRs"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        />
      </div>
    </section>
    <section>
      <h3>🎞 Stranger Things intro re-score</h3>
      <p>
        A good exercise as a composer is to re-score existing clips or scenes,
        and this was my attempt at doing so for the iconic Stranger Things title
        sequence. Excuse the bad mix...
      </p>

      <div class="embed">
        <iframe
          loading="lazy"
          width="400px"
          height="250px"
          src="https://player.vimeo.com/video/215550767"
          frameborder="0"
          allow="autoplay; fullscreen"
          allowfullscreen
        />
      </div>
    </section>
  </div>
  <small
    >You didn't have to scroll all the way down here :) That's too kind. <small
    />
    <br />
    <small
      >If you'd like to hear more, there's <a
        href="https://soundcloud.com/vbash"
      >
        -> more music on my SoundCloud</a
      ></small
    >

    <footer class={$isDarkModeEnabled ? "invert" : ""}>
      <p>Vyacheslav Basharov</p>
      <div>
        <a href="https://github.com/basharovV"
          ><img alt="github" src="github.svg" /></a
        >
        <a href="https://soundcloud.com/vbash"
          ><img alt="soundcloud" src="soundcloud.svg" /></a
        >
        <a href="mailto:contact@vyacheslavbasharov.com"
          ><img alt="email" src="email.svg" /></a
        >
      </div>
    </footer>
  </small>
</div>

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

  .invert img {
    filter: invert(1);
  }

  .embed {
    width: 400px;
    height: 250px;

    @media only screen and (max-width: 522px) {
      width: 100%;
    }

    > iframe {
      position: absolute;
      border-radius: 10px;
      border: 2px solid #c1c1c1;
      padding: 2px;

      @media only screen and (max-width: 522px) {
        position: absolute;
        left: 0;
        right: 0;
        box-sizing: border-box;
        border: none;
        width: 100%;
      }
    }
  }

  .background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 200px;
    z-index: -1;

    #image {
      height: 100%;
      opacity: 0.1;
      background-image: url("/header-bg.jpg");
      background-size: cover;
      background-position-y: bottom;

      &.invert {
        opacity: 0.3;
      }
    }

    #gradient {
      position: absolute;
      z-index: 1;
      height: 100%;
      top: 0;
      left: 0;
      right: 0;
      background: linear-gradient(to top, white, transparent);
      transition: all cubic-bezier(0.6, -0.28, 0.735, 0.045) 0.3s;

      &.invert {
        filter: invert(1);
      }
    }
  }

  button {
    padding: 0.2em 1em;
    background-color: white;
    border: 3px solid black;
    color: black;
    margin: 0.5em 0;
    font-size: 0.8em;
  }

  .contact {
    margin-top: 0;
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    &:hover {

        img {
            animation: rotate 0.4s ease-in-out 1 forwards;
        }
    }

    @keyframes rotate {
        from {
            transform: rotate(0deg) translateX(0px);
        }
        to {
            transform: rotate(1turn) translateX(15px);
        }
    }
    button {
      top: 0;
      /* transition: all 0.2s cubic-bezier(0.95, 0.05, 0.795, 0.035); */
      height: fit-content;
      &:hover {
        cursor: pointer;
      }
    }
    img {
      width: 80px;
      z-index: 1;
      right: 0;
      position: absolute;
      pointer-events: none;
      transform: scaleX(-1);
    }
  }

  .top-section {
    display: grid;
    grid-template-columns: 10fr 6fr;
    gap: 1em;
    grid-auto-flow: column;
    margin-top: 1em;
    @media only screen and (max-width: 900px) {
      grid-auto-flow: row;
      grid-template-columns: none;
    }

    small {
      margin-top: 1em;
      display: block;
    }
    left {
        p {
            margin: 0;
        }
    }
    right {
        padding: 1em 0.8em;
        /* border: 2px dashed rgb(235, 235, 235); */
        background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='gainsboro' stroke-width='4' stroke-dasharray='2%2c 8' stroke-dashoffset='0' stroke-linecap='butt'/%3e%3c/svg%3e");
        small, h3 {
            margin: 0;
        }
    }
  }

  .heading {
    display: flex;
    flex-direction: row;
    gap: 1em;
    justify-content: space-between;

    a {
      height: fit-content;
    }
  }

  #title {
    margin: 0;
  }
  #subtitle {
    margin: 0;
  }

  .magic-touch {
      img {
          width: 200px;
          margin: auto;
          display: block;
      }
  }
</style>
