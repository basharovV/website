<script lang="ts">
  import PlayIcon from "./PlayIcon.svelte";
  import { currentlyPlayingWidgetId, currentTrack } from "../store/state";

  let accent = "e60303";
  let loadIframe = false;
  let isLoading = false;

  let isExpanded = false;

  export let track;
  export let isDarkModeEnabled = false;
  export let autoPlay = false;

  // $: {
  //   if ($currentTrack?.id)
  // }

  $: trackParts = track && track.url && track.url.split("/");
  $: slug = trackParts && `vb-track-${trackParts[trackParts.length - 1]}`;

  const play = () => {
    isExpanded = true;
    setTimeout(() => {
      loadIframe = true;
      isLoading = true;
    }, 300);
  };
</script>

<div class="embed {isExpanded ? 'is-expanded' : ''}">
  {#if loadIframe && track.iframeSrc}
    <iframe
      id={slug}
      loading="lazy"
      style="background:{isDarkModeEnabled
        ? 'black'
        : 'white'};margin: auto;transform: scaleX(1.02) scaleY(1.04);"
      width="100%"
      height="100%"
      scrolling="no"
      frameborder="no"
      allow="autoplay"
      on:load={() => {
        isLoading = false;
        // Global store
        currentlyPlayingWidgetId.set(slug);
        currentTrack.set(track);
      }}
      src={autoPlay
        ? track.iframeSrc.replace("&auto_play=false", "&auto_play=true")
        : track.iframeSrc}
      alt={track.title}
      title={track.title}
    />
    <button>License</button>
    {#if isLoading}
      <p class="loading">loading...</p>
    {/if}
  {:else}
    <div
      class="placeholder"
      on:click={() => {
        play();
      }}
    >
      <img
        aria-hidden="true"
        class="background"
        src={track ? track.thumbnail_url : ""}
      />
      <div class="placeholder-content">
        <div class="play-button"><PlayIcon {isDarkModeEnabled} /></div>
        <span>
          <p>{track ? track.title : "getting track..."}</p>
          <!-- <small>{track ? "Click to listen on Soundcloud" : "one sec"}</small> -->
        </span>
        <img class="thumbnail" src={track ? track.thumbnail_url : ""} />
      </div>
    </div>
  {/if}
</div>

<style lang="scss">
  .embed {
    position: relative;
    padding: 3px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 4px 0;
    background: white;
    flex-grow: 1;
    flex-basis: 350px;
    height: 50px;
    overflow: hidden;
    box-sizing: border-box;
    border-radius: 10px;

    /* border: 2px solid #c1c1c15b; */
    transition: height 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);

    :global(.dark-mode) & {
      background: black;
      border: 2px solid #ffffff29;
    }

    .loading {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      width: fit-content;
      height: fit-content;
      margin: auto;
    }
    &.is-expanded {
      height: 140px;

      .placeholder {
        opacity: 0;
      }
    }

    .placeholder {
      position: relative;
      width: 100%;
      height: 100%;
      border-radius: 6px;
      overflow: hidden;
      &:hover {
        cursor: pointer;

        img {
          transform: scale(1.2);
        }

        .background {
          filter: opacity(0.7) brightness(0.4);
        }

        span {
          filter: drop-shadow(1px 1px 5px black);
        }

        p {
          color: white;
          /* filter: drop-shadow(2px 2px 10px black); */
        }
        small {
          color: white;
        }
      }
      .background {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        object-fit: cover;
        transition: all 0.1s cubic-bezier(0.165, 0.84, 0.44, 1);
        filter: opacity(0.1);
        /* filter: opacity(0.7) brightness(0.4); */
      }
      .placeholder-content {
        z-index: 2;
        height: 100%;
        width: 100%;
        display: grid;
        grid-template-columns: 60px 1fr auto;
        align-items: center;
        /* background: linear-gradient(
          0deg,
          transparent,
          rgba(0, 0, 0, 0.365) 40%
        );
        color: white; */
        /* font-size: 2em;
        font-family: Snake, Arial, Helvetica, sans-serif; */
        span {
          width: 100%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          padding-right: 1em;
          z-index: 2;
        }
        p {
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          width: 100%;
          text-overflow: ellipsis;
        }

        small {
          font-size: 0.7em;
          opacity: 0.6;
        }
      }

      .play-button {
        display: block;
        width: 35px;
        height: 35px;
        padding: 0.5em 1em;
        transition: 100ms width, height, opacity ease;
        cursor: pointer;
        margin: auto;
        z-index: 2;
        &:hover {
          transform: scale(1.1);
          opacity: 0.8;
        }
      }

      .thumbnail {
        width: 40px;
        height: auto;
        transform: scale(1.1);
        transition: all 0.1s cubic-bezier(0.165, 0.84, 0.44, 1);
      }
    }
  }
</style>
