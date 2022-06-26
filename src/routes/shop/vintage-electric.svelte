<script>
  import { isDarkModeEnabled } from "../../store/state.js";
  import SampleLib from 'svelte-piano/SampleLib.svelte';
  import DevicePicker from 'svelte-piano/components/DevicePicker.svelte';

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

<div class="container">
  <div class="header">
    <img class="banner" src="/product-assets/vintage-electric/banner.png" />
    <h1>
      The original soft sound of the 1973 Rhodes Mark I as a sample library for
      Kontakt. Nothing more, nothing less.
    </h1>
    <div class="circle-red" />
  </div>

  <div class="download-container">
    <div class="download">
      <a
        href="https://payhip.com/b/MxG8Z"
        class="payhip-buy-button"
        data-message="🦊 Thanks Internet stranger, hope you enjoy the instrument! If you have any feedback, email me on contact@vyacheslavbasharov.com. I'd also love to hear any music that you make using Vintage Electric, send it over and I can add it to this website!"
        data-title="Download Vintage Electric"
        data-product="MxG8Z"
        data-theme="none">Get it</a
      >
    </div>
    <div class="download-label">
      <p class="price">$5.99</p>
      <p class="specs">684 MB download. Requires Kontakt 5+</p>
    </div>
  </div>

  <h1 class="prompt">Give it a go right here in the browser!</h1>
  <small class="prompt-label"
    >Limited to single velocity, compressed samples.</small
  >

  <img class="arrow-prompt" src="/icons/arrow_up.svg" />
  <SampleLib samplesPath="/audio/rhodes/" {inputId} {urls} bind:this={player} />
  <div class="player-info">
    <h3 class="left">Just play it</h3>
    <img class="arrow" src="/icons/arrow_up.svg" />

    <h3 class="or">or</h3>
    <h3 class="middle">Let it play for you</h3>
    <h3 class="or">or</h3>
    <h3 class="right">use a MIDI keyboard!</h3>

    <div />
    <div />
    <div>
      <select bind:value={selectedSong}>
        <option value="vb_improv_1" selected>Improvisation 1</option>
        <option value="Bossa Improvisation" selected>Bossa improvisation</option
        >
        <option value="vb_improv_2" selected>Fast rundown in C minor</option>
        <option value="twinkle-twinkle-little-star" selected
          >Twinkle Twinke Little Star</option
        >
        <option value="georgia_short">Georgia</option>
      </select>

      <button on:click={() => player.playMidiFile(`/midi/${selectedSong}.midi`)}
        >Play it</button
      >
    </div>
    <div />
    <div class="device-picker">
      <DevicePicker type="input" bind:value={inputId} />
    </div>
  </div>

  <section>
    <h2>
      Kontakt 5+ instrument
      <br />
      73 keys
      <br />
      511 samples. 6-10 velocity layers
      <br />
      Key press + release noises
      <br />
      1.92 GB uncompressed
    </h2>
    <img src="/product-assets/vintage-electric/screenshot.png" />
  </section>

  <footer class="invert">
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
  @font-face {
    font-family: "Adamina";
    src: url("/fonts/Adamina/Adamina-Regular.ttf");
  }

  @font-face {
    font-family: "Lunatic Superstar";
    src: url("/fonts/LunaticSuperstar/LunaticSuperstar.otf");
  }

  .download-container {
    float: right;
    display: flex;
    align-items: flex-end;
    flex-direction: row-reverse;
    gap: 1em;
    position: relative;
    top: -2em;
  }

  .download {
    font-size: 2em;
    font-family: "Adamina", Tahoma, Geneva, Verdana, sans-serif;
    border: 3px dashed rgb(98, 98, 98);
    border-radius: 2px;
    padding: 10px 20px;
    width: fit-content;
  }

  .download-label {
    display: block;
    text-align: right;
    font-family: "Lunatic Superstar", Tahoma, Geneva, Verdana, sans-serif;

    .price {
      color: rgb(151, 255, 151);
      margin: 0;
      font-size: 1.5em;
    }

    .specs {
      opacity: 0.5;
      margin: 0;
      font-size: 1em;
    }
  }

  .arrow {
    display: block;
    margin: auto;
    left: -10em;
    position: relative;
  }

  .prompt {
    font-family: "Lunatic Superstar", Tahoma, Geneva, Verdana, sans-serif;
    opacity: 0.5;
    position: relative;
    top: 1em;
  }

  .prompt-label {
    font-family: "Lunatic Superstar", Tahoma, Geneva, Verdana, sans-serif;
    font-size: 1.2em;
    opacity: 0.5;
    position: relative;
    top: 1em;
  }

  .arrow-prompt {
    display: block;
    margin: auto;
    left: 2em;
    top: 0;
    transform: rotate(180deg);
    position: relative;
  }

  .player-info {
    margin-top: 2em;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
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
    }
  }

  select {
    background: #090909;
    border-radius: 2px;
    padding: 0.2em;
    color: #53aa8b;
    font-family: "Lunatic Superstar", Tahoma, Geneva, Verdana, sans-serif;
    font-size: 20px;
  }

  h1,
  h2 {
    font-family: "Adamina", Tahoma, Geneva, Verdana, sans-serif;
  }
  h3,
  p {
    font-family: "Lunatic Superstar", Tahoma, Geneva, Verdana, sans-serif;
  }

  section {
    margin-top: 4em;
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 4em;
    h2 {
      line-height: 2em;
    }
    img {
      width: 100%;
    }
  }

  :global(main) {
    max-width: 70em !important;
  }

  .circle-red {
    background-color: #ff0000;
    opacity: 0.1;
    filter: blur(10px);
    width: 177px;
    height: 177px;
    border-radius: 200px;
    position: absolute;
    top: 40px;
    right: -50px;
  }

  .header {
    z-index: -1;
    display: grid;
    grid-template-columns: auto 400px;
    align-items: center;
    position: relative;
    margin-top: -3em;
    img {
      width: 100%;
    }
    h1 {
      max-width: 300px;
      justify-self: flex-end;
    }
  }

  .banner {
    width: 500px;
  }

  footer {
    display: flex;
    flex-direction: column;
    font-size: 2em;
    margin: 3em auto 0;
    > p {
      font-family: Snake, Georgia, "Times New Roman", Times, serif;

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
