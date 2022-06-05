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
  <header />

  <div class="heading">
    <h1>tracks</h1>
    <!-- <input type="text" placeholder="Search" bind:value={searchQuery} />
    <div></div> -->
  </div>
  <div class="featured-tracks">
    <!-- <div class="warp-speed"><WarpSpeed /></div> -->
    <FeaturedTracks tracks={filteredTracks} />
    <small>
      Want to use some of my music in your projects? Send me an email to <a
        style="text-decoration: none"
        href="mailto:contact@vyacheslavbasharov.com"
        >contact@vyacheslavbasharov.com</a
      >
    </small>
  </div>

  <h1>videos</h1>
  <div class="improv-videos">
    <YoutubeVideo videoId="bSN3eBiGWIM" platform="yt" />
    <YoutubeVideo videoId="-imEDkQukVY" platform="yt" />
  </div>

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
</div>

<style lang="scss">
  a {
    &:hover {
      opacity: 0.6;
    }
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
  }


  .improv-videos {
    display: grid;
    grid-template-columns: 1fr 1fr;
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

    small {
      margin-top: 2em;
      display: block;
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
