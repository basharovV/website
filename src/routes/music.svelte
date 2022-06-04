<script>
  import FeaturedTracks from "../components/FeaturedTracks.svelte";

  import TrackMiniPlayer from "../components/TrackMiniPlayer.svelte";
  import YoutubeVideo from "../components/YoutubeVideo.svelte";
  import { isDarkModeEnabled } from "../store/state.js";
  import SvelteSeo from "svelte-seo";
  import GlobalPlayer from "../components/GlobalPlayer.svelte";
  import tracks from "../tracks";
  import WarpSpeed from "../components/WarpSpeed.svelte";
  import FlyingBirds from "../components/FlyingBirds.svelte";

  const urls = [
    "https://soundcloud.com/vbash/improv-i",
    "https://soundcloud.com/vbash/inertia",
    "https://soundcloud.com/vbash/species",
    "https://soundcloud.com/vbash/revamped",
    "https://soundcloud.com/vbash/rise-and-fall?in=vbash/sets/atmospheric-ambient",
    "https://soundcloud.com/vbash/the-lab",
    "https://soundcloud.com/vbash/space-exploration",
    "https://soundcloud.com/vbash/phobia",
    "https://soundcloud.com/vbash/singularity",
  ];

  const intoTheLooUrls = [
    "https://soundcloud.com/vbash/2-before-the-loo",
    "https://soundcloud.com/vbash/6-wake-up",
  ];

  const pianoTrackUrls = [
    "https://soundcloud.com/vbash/improv-i",
    "https://soundcloud.com/vbash/phantasiai-unreleased-new-album-demo",
    "https://soundcloud.com/vbash/hammers-unreleased-new-album-demo",
  ];

  const artistFilter = "by Vyacheslav Basharov | composer";
  const getTrack = async (url) => {
    return fetch(`https://soundcloud.com/oembed.json?url=${url}`)
      .then((response) => response.json())
      .then((response) => ({
        ...response,
        url,
        title: response.title.replace(artistFilter, ""),
        iframeSrc:
          response.html.match(new RegExp('src="' + "(.*)" + '"'))[1] +
          `&sharing=false&auto_play=false&hide_related=true&show_comments=true&show_user=false&show_reposts=false&show_teaser=false`,
      }));
  };

  const transformTrack = (track) => {
    return {
      ...track,
      title: track.title.replace(artistFilter, ""),
      iframeSrc:
        track.html.match(new RegExp('src="' + "(.*)" + '"'))[1] +
        `&sharing=false&auto_play=false&hide_related=true&show_comments=true&show_user=false&show_reposts=false&show_teaser=false`,
    };
  };

  async function getTracks() {
    const featuredTracks = tracks.tracks.map(transformTrack);
    const intoTheLooTracks = await Promise.all(
      intoTheLooUrls.map((url) => getTrack(url))
    );
    const pianoTracks = await Promise.all(
      pianoTrackUrls.map((url) => getTrack(url))
    );

    return { featuredTracks, intoTheLooTracks, pianoTracks };
  }
  let searchQuery = "";
  let featuredTracks = urls.map((url) => undefined);
  $: filteredTracks = featuredTracks.filter((t) =>
    t ? t.title.toLowerCase().includes(searchQuery.toLowerCase()) : true
  );
  let intoTheLooTracks = [];
  let pianoTracks = [];
  if (typeof window !== "undefined") {
    (async () => {
      let tracks = await getTracks();
      featuredTracks = tracks.featuredTracks;
      intoTheLooTracks = tracks.intoTheLooTracks;
      pianoTracks = tracks.pianoTracks;
    })();
  }
</script>

<SvelteSeo
  title="Vyacheslav Basharov | Music"
  description="I make thought-provoking music for use in your projects. Listen to tracks, license music or hire me as a composer."
  openGraph={{
    title: "Vyacheslav Basharov | Music",
    description:
      "I make thought-provoking music for use in your projects. Listen to tracks, license music or hire me as a composer.",
    url: `https://vyacheslavbasharov.com/music`,
    type: "website",
    images: [
      {
        url: "logo-512.png",
        width: 850,
        height: 650,
        alt: "logo",
      },
    ],
  }}
/>
<div class="container">
  {#if !$isDarkModeEnabled}
    <FlyingBirds />
  {/if}
  <GlobalPlayer />
  <div class="background">
    {#if $isDarkModeEnabled}
      <div class={$isDarkModeEnabled ? "invert" : ""} id="image" />
    {/if}
    <div class={$isDarkModeEnabled ? "invert" : ""} id="gradient" />
  </div>
  <header>
    <div>
      <a
        class={$isDarkModeEnabled ? "invert" : ""}
        style="display: flex;"
        href="/"><img alt="Logo" src="/logo.svg" /></a
      >
      <p style="font-family: Snake, Arial, sans-serif;font-size: 3em;">
        I make thought-provoking music.
      </p>
    </div>

    <small style="opacity: 0.6;margin:0"
      ><a
        style="text-decoration: none"
        href="mailto:contact@vyacheslavbasharov.com"
        >contact@vyacheslavbasharov.com</a
      ></small
    >
  </header>

  <div class="heading">
    <h1>tracks</h1>
    <!-- <input type="text" placeholder="Search" bind:value={searchQuery} />
    <div></div> -->
  </div>
  <div class="featured-tracks">
    <!-- <div class="warp-speed"><WarpSpeed /></div> -->
    <FeaturedTracks tracks={filteredTracks} />
  </div>
  <div class="prompt-container">
    <div class="prompt">
      <h2>Licensing / using in your projects</h2>
      <p>
        <a href="mailto:contact@vyacheslavbasharov.com">Send me an email </a> with
        the track(s) you like and what it's for, and I'll get back to you with license
        details. Thanks!
      </p>
    </div>
    <div>
      <h2>🎻 Custom score</h2>
      <h4 style="display: inline;">I'm currently</h4>
      <h4 style="display: inline;color: rgb(72, 199, 72);">available</h4>
      <svg class="available-circle" width="10" height="10" viewBox="0 0 10 10">
        <circle cx="5" cy="5" r="5" fill="green" />
      </svg>
      <br />
      <small style="opacity: 0.6;margin-top: 0.5em;display: block;"
        >I especially welcome films of a contemplative nature.
      </small>
      <div class="contact">
        <img src="pigeon.png" />
        <a
          style="text-decoration: none"
          href="mailto:contact@vyacheslavbasharov.com"
        >
          <button>Send an electronic pigeon</button>
        </a>
      </div>
    </div>
  </div>
  <div>
    <h1 id="title">music projects 👇</h1>
    <h2 id="subtitle">some things here and there...</h2>
  </div>
  <div class="content">
    <section>
      <h3>🔌 Improvisations</h3>
      <p>
        A lot of my musical adventures have their roots in improvisation. As a
        personal project, I'm recording some of my improv sessions, like this
        one:
      </p>
      <YoutubeVideo videoId="bSN3eBiGWIM" platform="yt" />
      <p>or this one:</p>
      <YoutubeVideo videoId="-imEDkQukVY" platform="yt" />

      <!-- <div class="embed">
        <iframe
          on:load={() => {
            refresh += 1;
          }}
          loading="lazy"
          src="https://www.youtube-nocookie.com/embed/bSN3eBiGWIM"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        />
      </div> -->
    </section>
    <section>
      <h3>🔌 Rhodesian Keys</h3>
      <p>My first software instrument :)</p>
      <span style="display: block;margin: 1em 0;">
        <p style="display: inline;">
          I had to get my hands on a Rhodes, and when I did, I had to sample it!
          Rhodesian Keys is a software instrument sampled from a Rhodes Mark I
          1973, which I'll be releasing on this website at some point.
        </p>
        <p style="display: inline; color: orange;">
          Update: you can now get it from <a href="/shop">the shop!</a>
        </p>
      </span>
      <YoutubeVideo videoId="2PP0OrzS_k8" platform="yt" />
    </section>
    <section class="magic-touch">
      <h3>🦆 El Pato Records</h3>
      <img src="music/el-pato-records.png" alt="El Pato Records logo" />
      <p>
        A little record label and collective of musicians started by me and some
        friends. Check us out our music on <a
          href="https://soundcloud.com/elpatorecords">SoundCloud</a
        >
        or follow us on
        <a href="https://instagram.com/elpatoyoan">Instagram</a>
      </p>
    </section>

    <section>
      <h3>🎞 Stranger Things intro re-score</h3>
      <p>An attempt at rescoring the iconic Stranger Things title sequence.</p>
      <YoutubeVideo videoId="215550767" platform="vimeo" />
    </section>
    
    <section style="break-before: column;">
      <div
        style="display: grid; grid-template-columns: 1fr auto;align-items: center;"
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
      <p>I've had the pleasure of composing for these short films:</p>

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
            track={intoTheLooTracks[0]}
            isDarkModeEnabled={$isDarkModeEnabled}
          />
          <TrackMiniPlayer
            track={intoTheLooTracks[1]}
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
      <h3>🎧 Featured music</h3>
      <p>
        I regularly upload cinematic, experimental, progressive, electronic and
        jazzy tracks on my SoundCloud. Sometimes I also do covers and remixes,
        and publish unedited live jam sessions.
      </p>
      <TrackMiniPlayer
        track={pianoTracks[0]}
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

      <TrackMiniPlayer
        track={pianoTracks[1]}
        isDarkModeEnabled={$isDarkModeEnabled}
      />
      <TrackMiniPlayer
        track={pianoTracks[2]}
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
      <p>
        If you're looking for distinct sounds to use in your projects, head over
        to the <a href="/shop">shop!</a>
      </p>
    </section>

    <section>
      <h3>🎬 Westworld Competition</h3>
      <p>
        I took part in the online film music competition from Spitfire Audio and
        HBO, scoring a car chase sequence from Westworld season 3. Have a look
        at my entry on YouTube:
      </p>
      <YoutubeVideo videoId="KPugdlU8GRs" platform="yt" />
    </section>
    <!-- 
    <section>
      <h3>🎞 Sci-fi game trailer re-score</h3>
      <p>
        A re-score of a Sci-fi MMORPG game trailer as an epic orchestral
        adventure theme.
      </p>
      <YoutubeVideo videoId="491425916" platform="vimeo" />
    </section> -->
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
  </small>
</div>

<style lang="scss">
  a {
    &:hover {
      opacity: 0.6;
    }
  }

  * {
    /* font-family: "Snake" !important; */
  }

  h3 {
    margin-top: 0;
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
    /* font-size: 2em !important; */
  }

  .featured-tracks {
    .warp-speed {
      z-index: -1;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }

  .content {
    column-count: 2;

    margin-top: 2em;
    @media only screen and (max-width: 522px) {
      column-count: 1;
      display: inline;
    }
  }

  :global(.dark-mode) {
    section {
      background: rgba(0, 0, 0, 0.74) !important;
    }
  }
  section {
    margin: 0.5em 0;
    padding: 1em;
    border: 1px solid rgba(121, 121, 121, 0.475);
    background: rgba(255, 255, 255, 0.776) !important;
    /* box-shadow: inset 0px 0px 0px 2px rgba(121, 121, 121, 0.475); */
    /* box-sizing: border-box; Include padding and border in element's */
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
  header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 2em;
    padding: 1em 0;

    div {
      display: flex;
      flex-direction: row;
      align-items: center;

      p {
        margin: 0;
      }
    }
    > div > a {
      opacity: 0.5;
      margin-right: 1em;
      display: inline;

      > img {
        height: 40px;
        width: 40px;
      }
    }
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
      /* transition: all cubic-bezier(0.6, -0.28, 0.735, 0.045) 0.3s; */

      &.invert {
        background: linear-gradient(to top, rgb(24, 24, 24), transparent);
        /* filter: invert(1); */
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
    margin-top: 0.5em;
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
      width: 60px;
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
    }
  }

  .heading {
    display: flex;
    flex-direction: row;
    gap: 1em;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;

    a {
      height: fit-content;
    }
    input {
      margin-top: 20px;
      border: none;
      background: none;
      border-bottom: 2px solid lightgrey;
      font-size: 1.2em;
      outline: none;
      text-align: center;
    }
  }

  ::placeholder {
    opacity: 0.4;
  }

  .prompt-container {
    position: absolute;
    left: 0;
    right: 0;
    height: auto;
    margin: 2em 0;
    padding: 1em 1em 2em 1em;
    /* color: white; */
    display: grid;
    grid-template-columns: minmax(200px, 450px) minmax(200px, 450px);
    justify-content: center;
    gap: 0 4em;
    /* background: black; */

    :global(.dark-mode) & {
      /* background: rgba(103, 103, 103, 0.564); */
    }

    @media only screen and (max-width: 622px) {
      display: block;
    }
  }
  .prompt {
    max-width: 53em;
    margin: 0 auto;
    /* border: 2px dashed rgb(235, 235, 235); */
    /* background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='gainsboro' stroke-width='4' stroke-dasharray='2%2c 8' stroke-dashoffset='0' stroke-linecap='butt'/%3e%3c/svg%3e"); */
    small,
    h3 {
      margin: 0;
    }
    small {
      margin: 1em 0;
      display: block;
    }
    flex-basis: 400px;
  }

  #title {
    margin-top: 260px;
    margin-bottom: 0;
    @media only screen and (max-width: 822px) {
      margin-top: 320px;
    }
    @media only screen and (max-width: 622px) {
      margin-top: 380px;
    }
    @media only screen and (max-width: 454px) {
      margin-top: 460px;
    }
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

  .available-circle {
    animation: fade 1.3s infinite alternate-reverse ease-in-out;
    > circle {
      fill: rgb(72, 199, 72);
    }
  }

  @keyframes fade {
    from {
      opacity: 0.3;
    }
    to {
      opacity: 1;
    }
  }
</style>
