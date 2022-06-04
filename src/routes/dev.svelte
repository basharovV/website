<script>
  import { onMount } from "svelte";

  import Images from "../components/Images.svelte";
  import YoutubeVideo from "../components/YoutubeVideo.svelte";
  import { isDarkModeEnabled } from "../store/state.js";
</script>

<svelte:head>
  <title>Vyacheslav Basharov • dev portfolio</title>
  <meta
    name="description"
    content="A collecion of software, not-so-crazy ideas and concepts. "
  />
</svelte:head>
<header class={$isDarkModeEnabled ? "invert" : ""}>
  <!-- <div>
    <h2 style="margin-bottom: 0;">Vyacheslav Basharov</h2>
    <small style="margin-bottom: 0;">Full-stack developer</small>
  </div> -->
  <!-- <a style="display: flex;" href="/"
    ><img style="margin:auto;width: 30px;" alt="Logo" src="/logo.svg" /></a
  > -->
</header>

<!-- <Nav/> -->
<p style="text-align: center;">
  a list of some things I've built, have a look around!
</p>

<section>
  <h3>♪ Music tech</h3>
  <p>
    💡 Integrating <span style="color: #00ffb3">REAPER</span> and a smart bulb to turn <span style="color: red">red</span> when recording.
  </p>

  <YoutubeVideo videoId="CaTaeP-j7Uk" platform="yt" showTitle={false}/>
  <p>
    More info on the <a href="https://forum.cockos.com/showthread.php?t=261061"
      >Cockos forums</a
    >
  </p>
  <br/>


  <h3>👨‍💻 Apps & Extensions</h3>
  <div class="products">
    <a href="https://tbxproject.com">
      <div>
        <img src="dev/logo-tbx.png" />
        <p>tbx - Team Browser Extension</p>
        <small
          >A browser extension to browse together in real-time, and do online
          research seamlessly in the browser.</small
        >
      </div>
    </a>
    <a href="https://github.com/basharovV/StumbleUponAwesome">
      <div>
        <img src="dev/logo-sua.png" />
        <p>StumbleUponAwesome</p>
        <small>
          A fun StumbleUpon-like extension for those interested in development,
          tech and science.
        </small>
      </div>
    </a>
  </div>

  <h3>Other projects</h3>
  <ul>
    <li>
      <p>
        📲
        <b>Milly</b>: A digital loyalty platform & app based on UK Open Banking,
        allowing automatic points collection via linked bank accounts. Although
        the startup is no more - you can still check out the
        <a
          href="https://play.google.com/store/apps/details?id=works.milly.android"
          >apps on the Play Store ->
        </a>
        and
        <a
          href="https://medium.com/milly-works/loyalty-schemes-suck-90c4f2f15de6"
          >read this explanatory blog post -></a
        >
      </p>
    </li>
    <li>
      <p>
        🔈
        <b>whatsound</b>: An audio classifier using Essentia and PyBrain.
        <a href="https://github.com/basharovV/whatsound"> See on GitHub -> </a>
      </p>
    </li>
  </ul>
</section>
<section>
  <h3>Designs & concepts</h3>
  <h4>a showcase of some of my UI designs</h4>

  <ul class="designs">
    <li>
      <p>
        ♫ A hackable music player concept. What if we had <i
          >'user-generated software'</i
        >
        instead of <i>'user-generated content'</i>? In this mockup instead of
        playlists we have
        <i>'playlets'</i> - little musical programs that can be run inside the player,
        encouraging new ways to listen to and perceive music. As an example I show
        a simple Wikipedia playlet, which brings up songs together with their Wikipedia
        article.
      </p>
      <Images
        images={["designs/musicplayer.png", "designs/musicplayer_2.png"]}
      />
    </li>
    <li>
      <p>
        🔨A concept UI for the data science world: a command-based data tool
        that can perform smart transformations on documents using natural
        language commands instead of Excel-like formulas or menus.
      </p>
      <Images images={["designs/nlp_2.png", "designs/nlp_1.png"]} />
    </li>
    <li>
      <p>
        🎨 A logo I made when I was working on a social media app for students
        during my final year. The shape and two-in-one aspect are interesting,
        but I haven't found a use for it since.
      </p>
      <Images
        images={[
          "designs/peek_1.png",
          "designs/peek_3.png",
          "designs/peek_2.png",
        ]}
      />
    </li>
    <li>
      <p>
        Modos: a concept I started thinking about to re-imagine window and
        workspace management on a desktop environment. I regularly switch
        between different tasks (development, design, writing, research, music
        production, etc), and wanted a way to arrange, visualise these 'modes'
        in my OS, and switch between them at the click of a button. I started
        tinkering with a BetterTouchTool preset to imagine what this can look
        like. I left this on hold but might come back to it at some point.
      </p>
      <Images
        images={[
          "designs/modos_1.jpg",
          "designs/modos_2.png",
          "designs/modos_3.png",
        ]}
      />
    </li>
  </ul>
</section>

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

<style lang="scss">
  img {
    width: 100%;
  }

  section {
    padding: 1em 0;
    position: relative;
  }

  .products {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2em;
    text-align: center;
    margin-bottom: 4em;
    margin-top: 1em;

    small {
      max-width: 250px;
      margin-bottom: 2em;
      display: block;
    }

    > a {
      display: flex;
      flex-direction: column;
      align-items: center;
      border: 1px solid rgba(116, 116, 116, 0.249);
      border-radius: 3px;
      padding: 0.5em;
      text-decoration: none;
    }

    img {
      height: 10em;
      width: auto;
    }
  }

  .designs {
    // columns: 2;
    // column-gap: 2em;
  }
  a {
    &:hover {
      opacity: 0.6;
    }
  }

  ul {
    padding-inline-start: 0px;
  }

  header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
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
</style>
