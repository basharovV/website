<script>
  export let tracks;
  import { isDarkModeEnabled } from "../store/state.js";
  import TrackMiniPlayer from "./TrackMiniPlayer.svelte";
</script>

<div class="container">
  {#if tracks}
    {#each tracks as track, idx}
      <TrackMiniPlayer {track} isDarkModeEnabled={$isDarkModeEnabled} autoPlay={true}/>
    {/each}
  {/if}
  <div>
    <h3>
      + more on <a href="https://soundcloud.com/vbash">Soundcloud! </a>
    </h3>
  </div>
</div>

<style lang="scss">
  h3 {
    font-family: Snake, Arial, Helvetica, sans-serif;
    font-size: 2em;
    margin: auto;
    a {
      text-decoration-color: orange;
      &:hover {
        color: orange;
      }
    }
  }
  .container {
    /* display: flex;
        flex-wrap: wrap;
        gap: 0 5px; */
    column-count: 1;
    filter: drop-shadow(2px 20px 20px rgba(0, 0, 0, 0.139));
    @media only screen and (min-width: 700px) {
      column-count: 2;
      :global(:nth-child(6)) {
        break-before: column;
      }
    }

    div {
      border-radius: 10px;
      height: 70px;
      display: flex;
      box-sizing: border-box;
      background: rgba(128, 128, 128, 0.05);
    }

    /* display: grid;
    grid-template-columns: 1fr 1fr;
    @media only screen and (max-width: 522px) {
        grid-template-columns: 1fr 1fr;
    }  */
  }
</style>
