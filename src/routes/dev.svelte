<script>
  import { onMount } from "svelte";
  import DevicePicker from "svelte-sampler/components/DevicePicker.svelte";
  import SampleLib from "svelte-sampler/SampleLib.svelte";

  import Images from "../components/Images.svelte";
  import YoutubeVideo from "../components/YoutubeVideo.svelte";
  import { isDarkModeEnabled } from "../store/state.js";

  let player;
  let selectedSong;
  let inputId;

  const urls = {
    A1: "RhodesMK1_A1_60.mp3",
    A2: "RhodesMK1_A2_70.mp3",
    A3: "RhodesMK1_A3_70.mp3",
    A4: "RhodesMK1_A4_60.mp3",
    A5: "RhodesMK1_A5_60.mp3",
    A6: "RhodesMK1_A6_70.mp3",
    "A#1": "RhodesMK1_As1_60.mp3",
    "A#2": "RhodesMK1_As2_70.mp3",
    "A#3": "RhodesMK1_As3_70.mp3",
    "A#4": "RhodesMK1_As4_60.mp3",
    "A#5": "RhodesMK1_As5_60.mp3",
    "A#6": "RhodesMK1_As6_70.mp3",
    B1: "RhodesMK1_B1_60.mp3",
    B2: "RhodesMK1_B2_70.mp3",
    B3: "RhodesMK1_B3_70.mp3",
    B4: "RhodesMK1_B4_70.mp3",
    B5: "RhodesMK1_B5_60.mp3",
    B6: "RhodesMK1_B6_60.mp3",
    C2: "RhodesMK1_C2_60.mp3",
    C3: "RhodesMK1_C3_70.mp3",
    C4: "RhodesMK1_C4_70.mp3",
    C5: "RhodesMK1_C5_60.mp3",
    C6: "RhodesMK1_C6_60.mp3",
    C7: "RhodesMK1_C7_60.mp3",
    "C#2": "RhodesMK1_Cs2_70.mp3",
    "C#3": "RhodesMK1_Cs3_60.mp3",
    "C#4": "RhodesMK1_Cs4_60.mp3",
    "C#5": "RhodesMK1_Cs5_70.mp3",
    "C#6": "RhodesMK1_Cs6_60.mp3",
    "C#7": "RhodesMK1_Cs7_60.mp3",
    D2: "RhodesMK1_D2_70.mp3",
    D3: "RhodesMK1_D3_60.mp3",
    D4: "RhodesMK1_D4_60.mp3",
    D5: "RhodesMK1_D5_70.mp3",
    D6: "RhodesMK1_D6_60.mp3",
    D7: "RhodesMK1_D7_60.mp3",
    "D#2": "RhodesMK1_Ds2_60.mp3",
    "D#3": "RhodesMK1_Ds3_70.mp3",
    "D#4": "RhodesMK1_Ds4_60.mp3",
    "D#5": "RhodesMK1_Ds5_60.mp3",
    "D#6": "RhodesMK1_Ds6_60.mp3",
    "D#7": "RhodesMK1_Ds7_60.mp3",
    E1: "RhodesMK1_E1_60.mp3",
    E3: "RhodesMK1_E3_70.mp3",
    E4: "RhodesMK1_E4_60.mp3",
    E5: "RhodesMK1_E5_60.mp3",
    E6: "RhodesMK1_E6_60.mp3",
    E7: "RhodesMK1_E7_70.mp3",
    F1: "RhodesMK1_F1_60.mp3",
    F2: "RhodesMK1_F2_70.mp3",
    F3: "RhodesMK1_F3_60.mp3",
    F4: "RhodesMK1_F4_60.mp3",
    F5: "RhodesMK1_F5_70.mp3",
    F6: "RhodesMK1_F6_60.mp3",
    "F#1": "RhodesMK1_Fs1_60.mp3",
    "F#2": "RhodesMK1_Fs2_70.mp3",
    "F#3": "RhodesMK1_Fs3_70.mp3",
    "F#4": "RhodesMK1_Fs4_60.mp3",
    "F#5": "RhodesMK1_Fs5_70.mp3",
    "F#6": "RhodesMK1_Fs6_60.mp3",
    G1: "RhodesMK1_G1_60.mp3",
    G2: "RhodesMK1_G2_70.mp3",
    G3: "RhodesMK1_G3_70.mp3",
    G4: "RhodesMK1_G4_80.mp3",
    G5: "RhodesMK1_G5_60.mp3",
    G6: "RhodesMK1_G6_60.mp3",
    "G#1": "RhodesMK1_Gs1_60.mp3",
    "G#2": "RhodesMK1_Gs2_60.mp3",
    "G#3": "RhodesMK1_Gs3_60.mp3",
    "G#4": "RhodesMK1_Gs4_60.mp3",
    "G#5": "RhodesMK1_Gs5_60.mp3",
    "G#6": "RhodesMK1_Gs6_70.mp3",
  };
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

  <p></p>

  <p>🪕 musicat - a sleek desktop music player for musicians.</p>
  <img src="/dev/musicat-screenshot.jpg" alt="musicat screenshot"/>
  <p>A desktop music player with metadata tagging, powerful smart query and features for artists and musicians to manage their own tracks.</p>
  <small>(Currently building, <a href="https://github.com/basharovV/musicat">pre-release availabe</a>)</small>

  <br/>
  <br/>
  <br/>
  <br/>
  <p>🎹 Sample library player on the web.</p>

  <p style="display: block;line-height: 1.5em;"
    >Sample libraries are great, but in order to try a product you typically need to download and install it. 
    As I was making my own wample library I wanted a fully playable interactive demo that works in the browser.
  </p>
  <div class="sample-lib-demo">
    <SampleLib
      samplesPath="/audio/rhodes/"
      {urls}
      startNote="E1"
      endNote="D6"
      {inputId}
      bind:this={player}
      theme='light'
    />
  </div>
  <div class="player-info">
    <p class="left">Just play it</p>
    <img class="arrow" src="/icons/arrow_up.svg" />

    <p class="or">or</p>
    <p class="middle">Let it play for you</p>
    <p class="or">or</p>
    <p class="right">use a MIDI keyboard!</p>

    <div />
    <div />
    <div>
      <select bind:value={selectedSong}>
        <option value="vb_improv_1" selected>Improvisation 1</option>
        <option value="Bossa Improvisation" selected>
          Bossa improvisation
        </option>
        <option value="vb_improv_2" selected>Fast rundown in C minor </option>
        <option value="twinkle-twinkle-little-star" selected
          >Twinkle Twinke Little Star
        </option>
        <option value="georgia_short">Georgia</option>
      </select>

      <button on:click={() => player.playMidiFile(`/midi/${selectedSong}.midi`)}
        >Play it</button
      >
      <button on:click={() => player.stop()}>Stop</button>
    </div>
    <div />
    <div class="device-picker">
      <DevicePicker type="input" bind:value={inputId} />
    </div>
  </div>

  <small class="demo-mobile-hint" style="margin-top: 2em;">
    *demo is only available on desktop, sorry! Check out the full demo of <a
      href="/shop/vintage-electric">Vintage Electric</a
    >, which has MIDI file playback and MIDI keyboard support.</small
  >
  <small class="demo-desktop-hint" style="margin-top: 2em;">
    Play around with this demo or check out the product demo of <a
      href="/shop/vintage-electric">Vintage Electric</a
    > (Rhodes Mark I), which has some extra features.</small
  >

  <br/>
  <br/>
  <br/>
  <p>
    💡 Integrating <span style="color: #00ffb3">REAPER</span> and a smart bulb
    to turn <span style="color: red">red</span> when recording.
  </p>

  <small style="display: block;margin-top: 1em;margin-bottom: 2em;">
  When your DAW telling you it's recording clearly isn't enough</small
  >
  <YoutubeVideo videoId="CaTaeP-j7Uk" platform="yt" showTitle={false} />
  <p>
    More info on the <a href="https://forum.cockos.com/showthread.php?t=261061"
      >Cockos forums</a
    >
  </p>
  <br />

  <h3>👨‍💻 Apps & Extensions</h3>
  <div class="products">
    <a href="https://tbxproject.com">
      <div>
        <img src="/dev/logo-tbx.png" />
        <p>tbx - Team Browser Extension</p>
        <small
          >A browser extension to browse together in real-time, and do online
          research seamlessly in the browser.</small
        >
      </div>
    </a>
    <a href="https://github.com/basharovV/StumbleUponAwesome">
      <div>
        <img src="/dev/logo-sua.png" alt="StumbleUponAwesome logo" />
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
        images={["/designs/musicplayer.png", "/designs/musicplayer_2.png"]}
      />
    </li>
    <li>
      <p>
        🔨 A concept UI for the data science world: a command-based data tool
        that can perform smart transformations on documents using natural
        language commands instead of Excel-like formulas or menus.
      </p>
      <Images images={["/designs/nlp_2.png", "/designs/nlp_1.png"]} />
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
          "/designs/modos_1.jpg",
          "/designs/modos_2.png",
          "/designs/modos_3.png",
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

  .sample-lib-demo {
    @media only screen and (max-width: 975px) {
      display: none;
    }
    :global(piano) {
      box-shadow: none !important;
    }
  }

  .player-info {
     @media only screen and (max-width: 975px) {
      display: none;
    }
    margin-top: 2em;
    display: grid;
    grid-template-columns: 200px 100px 1fr 40px 1fr;
    justify-content: space-between;
    position: relative;

    .arrow {
      position: absolute;
      left: 150px;
      top: -20px;
      transform: rotateY(180deg);
    }
    .or {
      justify-self: center;
    }

    h3 {
      font-size: 24px;
      opacity: 0.5;
      margin: 0.2em 0;
    }
    button {
      margin: 0.6em 0;
    }
    * {
      width: fit-content;
    }
    .left {
      justify-self: left;
    }
    .middle {
      justify-self: left;
    }
    .right,
    .device-picker {
      justify-self: right;

      :global(select) {
        background-color: white;
        font-family: Arial;
        color: black;
        font-size: small;
        padding: 0;
      }
    }
  }

  .demo-mobile-hint {
    display: none;
     @media only screen and (max-width: 975px) {
      display: block;
    }
    
  }
  .demo-desktop-hint {
    display: block;
     @media only screen and (max-width: 975px) {
      display: none;
    }

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
