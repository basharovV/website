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
        alt: "logo",
      },
    ],
  }}
/>
<div class="container {$isDarkModeEnabled ? 'invert' : ''}">
  <img
    style="grid-area: a;margin:auto;width: 30px;"
    alt="Logo"
    src="/logo.svg"
  />
  <header>
    <h3 style="margin: 0;text-align: center;font-family: Snake;font-size: 3em;">
      Hello! I'm Slav
    </h3>
    <br />
    <h2 style="text-align: center;">
      I
      <a href="/dev">make software</a>
      and
      <a href="/music">compose music.</a>
    </h2>
    <img alt="cd" src="icons/cd6.gif" />
  </header>

  <div>
    <section>
      <img
        class="mobile-hide"
        style="align-self: flex-end;"
        alt="Arrow"
        src="arrow_left.svg"
      />
      <p class="mobile-hide" style="opacity: 0.7;">
        For projects, dev blog, UI mockups and more, go here!
      </p>

      <h3>Recent tech</h3>
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

      <h3>Latest article</h3>
      <p>On self-tracking, exobrains and quantified self</p>
      <a
        href="https://existentialist.xyz/on-self-tracking-exobrains-and-quantified-self/"
      >
        Read ->
      </a>
    </section>
    <section style="grid-area: d;">
      <img
        class="mobile-hide"
        style="align-self: flex-start;margin-left: 5em;"
        alt="Arrow"
        src="arrow_right.svg"
      />

      <p class="mobile-hide" style="opacity: 0.7;">
        For music projects, tracks, samples, presets
      </p>
      <h3>Recent music</h3>
      <p>
        <b>Improv I</b>
        <small
          ><a href="https://songwhip.com/vyacheslavbasharov/improv-i">
            Streaming links</a
          ></small
        >
      </p>
    </section>
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
  .container {
    padding-top: 4em;
    max-width: 900px;
    display: flex;
    flex-direction: column;
    margin: auto;

    > div {
      display: flex;
      flex-direction: row;
      gap: 100px;

      @media only screen and (max-width: 522px) {
        flex-wrap: wrap;
      }

      > section {
        max-width: 350px;
        display: flex;
        flex-direction: column;
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

  section {
    margin: 0;
    width: 100%;
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

  .invert img {
    filter: invert(1);
  }

  small {
    margin: 0.5em 0 1em 0;
  }

</style>
