<script lang="ts">
  let typeSelected = "bands";
</script>

<section>
  <h1 class="top-heading">Live music</h1>
  <h1 class="location">in Marbella</h1>
  <!-- 
  <div class="selector">
    <div>
      <h2
        class="bands-title {typeSelected === 'bands' ? 'is-selected' : ''}"
        on:click={() => {
          typeSelected = "bands";
        }}
      >
        Bands
      </h2>
      <span>/</span>
      <h2
        class="bands-title  {typeSelected === 'musicians' ? 'is-selected' : ''}"
        on:click={() => {
          typeSelected = "musicians";
        }}
      >
        MUSICIANS
      </h2>
    </div>
    <div>
      <h2
        class="bands-title {typeSelected === 'jams' ? 'is-selected' : ''}"
        on:click={() => {
          typeSelected = "jams";
        }}
      >
        Jam sessions
      </h2>
      <span>/</span>
      <h2
        class="bands-title  {typeSelected === 'studios' ? 'is-selected' : ''}"
        on:click={() => {
          typeSelected = "studios";
        }}
      >
        Studios
      </h2>
    </div>
  </div> -->
  <div class="grid">
    <div class="bands">
      <div class="artist">
        <h3 class="artist-title">
          <a href="https://instagram.com/callejondeljaleo">El Pato Yoan</a>
        </h3>
        <small>Progressive folk fusion trio</small>
      </div>

      <div class="artist">
        <h3 class="artist-title">
          <a href="https://instagram.com/callejondeljaleo">Callejon del Jaleo</a
          >
        </h3>
        <small>latin jazz band</small>
      </div>

      <div class="artist">
        <h3 class="artist-title">
          <a href="https://instagram.com/callejondeljaleo">Uncle John's Band</a>
        </h3>
        <small>Jam band</small>
      </div>

      <div class="artist">
        <h3 class="artist-title">
          <a href="https://instagram.com/callejondeljaleo">El Pato Yoan</a>
        </h3>
        <small>Progressive folk fusion trio</small>
      </div>
    </div>
  </div>
  <div class="artists">
    <div class="artist">
      <h3 class="artist-title">
        <a href="https://instagram.com/callejondeljaleo">Michael Kirkland</a>
      </h3>
      <small>Progressive folk fusion trio</small>
    </div>

    <div class="artist">
      <h3 class="artist-title">
        <a href="https://instagram.com/callejondeljaleo">Callejon del Jaleo</a>
      </h3>
      <small>latin jazz band</small>
    </div>

    <div class="artist">
      <h3 class="artist-title">
        <a href="https://instagram.com/callejondeljaleo">Uncle John's Band</a>
      </h3>
      <small>Jam band</small>
    </div>

    <div class="artist">
      <h3 class="artist-title">
        <a href="https://instagram.com/callejondeljaleo">El Pato Yoan</a>
      </h3>
      <small>Progressive folk fusion trio</small>
    </div>
  </div>
</section>

<style lang="scss">
  @font-face {
    font-family: "Recia";
    src: url("/fonts/Recia/ReciaDisplay-Bold.ttf") format("truetype");
  }

  @font-face {
    font-family: "ReciaSerif";
    src: url("/fonts/Recia/ReciaSerifDisplay-Bold.ttf") format("truetype");
  }

  .grid {
    display: grid;
    grid-template-columns: 1fr;
  }

  .bands {
    display: flex;
  }

  .artists,
  .bands {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    font-size: 1.5em;
  }

  .artists{
    font-size: 0.8em;
    gap: 1em;
  }

  .bands-title {
    font-family: "Recia", Helvetica, sans-serif !important;
    font-size: 1.7em;
    &:hover {
      cursor: pointer;
      color: cyan;
    }
    &.is-selected {
      color: white;
    }
  }

  .selector {
    display: flex;
    margin: auto;
    display: grid;
    grid-template-columns: 1fr;
    > div {
      width: 100%;
      display: inline-flex;
      margin: auto;
      width: fit-content;
      > span {
        font-size: 1.5em;
      }
    }
  }

  section {
    font-size: 2.7em;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
    font-family: "Recia", Helvetica, sans-serif !important;
  }

  .top-heading {
    margin-top: 1em;
  }

  .location {
    color: rgb(255, 149, 149);
  }

  .artist {
    width: fit-content;
    margin: 2em auto 0;
  }

  h1 {
    display: inline-flex;
    width: fit-content;
    margin: 0;
    font-size: 1.2em;
    line-height: 1em;
    font-family: "chancelaresca", Helvetica, sans-serif !important;
  }

  small {
    text-align: right;
    float: right;
    font-size: 0.5em;
    font-family: "Recia", Helvetica, sans-serif !important;
  }
  h2 {
    color: rgb(184, 179, 234);
    font-family: "Snake", Helvetica, sans-serif !important;
    font-size: 4em;
  }
  p {
    font-size: 1em;
    margin: 0;
    font-family: "Recia", Helvetica, sans-serif !important;
  }

  .artist-title {
    font-size: 1.6em;
    font-family: "ReciaSerif", Helvetica, sans-serif !important;
    width: max-content;
  }

  * {
    font-size: 4;
    text-align: center;
  }

  :global(nav > div) {
    display: none !important;
  }
</style>
