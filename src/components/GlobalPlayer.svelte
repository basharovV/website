<script lang="ts">
  import { onMount } from "svelte";
  import PauseIcon from "./PauseIcon.svelte";
  import PlayIcon from "./PlayIcon.svelte";
  import {
    currentlyPlayingWidgetId,
    currentTrack,
    isDarkModeEnabled,
  } from "../store/state";
  let SC;
  let widget;

  let playerState = {
    relativePosition: 0,
    loadProgress: 0,
    currentPosition: 0,
  };

  $: title = $currentTrack?.title;
  $: description =
    $currentTrack?.description || "test test test test test test test end";

  $: thumbnail = $currentTrack?.thumbnail_url || "soundcloud.svg";

  $: duration = 0;

  $: elapsedTime = `${(~~(playerState.currentPosition / (1000 * 60)) % 60)
    .toString()
    .padStart(2, "0")}:${(~~((playerState.currentPosition / 1000) % 60))
    .toString()
    .padStart(2, "0")}`;

  $: playheadPos = playerState.relativePosition * 100;

  $: hoverheadPosPx = 0;

  let seekBar;

  $: hoverTime =
    seekBar &&
    `${(
      ~~((duration * (hoverheadPosPx / seekBar.offsetWidth)) / (1000 * 60)) % 60
    )
      .toString()
      .padStart(2, "0")}:${(
      ~~((duration * (hoverheadPosPx / seekBar.offsetWidth)) / 1000) % 60
    )
      .toString()
      .padStart(2, "0")}`;

  let showHoverHead = false;

  const onSeekHover = (e) => {
    hoverheadPosPx = e.offsetX > 0 ? e.offsetX : 0;
  };

  const onSeek = async (e) => {

    const percent = e.offsetX / e.target.offsetWidth;
    const milli = await new Promise((resolve, reject) => {
      widget.getDuration((duration) => {
        resolve(duration * percent);
      });
    });
    widget.seekTo(milli);
  };

  let isPlaying;

  const togglePlayPause = () => {
    if (!widget) return;
    if (isPlaying) {
      widget.pause();
      isPlaying = false;
    } else {
      widget.play();
      isPlaying = true;
    }
  };
  const updateTrack = (widgetId) => {
    if (SC && widgetId) {
      widget = SC.Widget(widgetId);

      widget.bind(SC.Widget.Events.READY, function () {
        widget.getDuration((d) => {
          duration = d;
        });
        widget.bind(SC.Widget.Events.PLAY_PROGRESS, function (update) {
          playerState = update;
        });
        widget.bind(SC.Widget.Events.PLAY, function () {
          isPlaying = true;
        });
        widget.bind(SC.Widget.Events.PAUSE, function () {
          isPlaying = false;
        });
      });
    }
  };

  $: {
    updateTrack($currentlyPlayingWidgetId);
  }

  onMount(async () => {
    SC = (await import("../lib/soundcloud.js")).SC;
  });
</script>

{#if $currentlyPlayingWidgetId}
  <div class="container">
    <img class="thumbnail" src={thumbnail} />

    <div class="play-button" on:click={togglePlayPause}>
      {#if isPlaying}
        <PauseIcon isDarkModeEnabled={true} />
      {:else}
        <PlayIcon isDarkModeEnabled={true} />
      {/if}
    </div>
    <span class="info">
      <p>{title}</p>
      <!-- <small class="description">{description}</small> -->
    </span>
    <div
      class="seekbar-container"
      on:mouseenter={() => (showHoverHead = true)}
      on:mouseleave={() => (showHoverHead = false)}
      on:mousemove={onSeekHover}
      on:click={onSeek}
    >
      <div class="seekbar" bind:this={seekBar}>
        <svg class="playhead" style="left:{playheadPos}%;" viewBox="0 0 20 20">
          <circle cx="10" cy="10" r="10" />
        </svg>
        {#if showHoverHead}
          <div
            class="hoverhead-container"
            style="transform: translateX({hoverheadPosPx}px);"
          >
            <svg class="hoverhead" viewBox="0 0 20 20">
              <circle cx="10" cy="10" r="10" />
            </svg>
            <div class="hoverhead-tooltip">
              <p>{hoverTime}</p>
            </div>
          </div>
        {/if}
      </div>
    </div>

    <p class="elapsed-time">{elapsedTime}</p>
    <div>
      <a class="license-btn" href="mailto:contact@vyacheslavbasharov.com?subject=License%20for%20{title}&body=Hi%20Slav%2C%0A%0APlease%20let%20me%20know%20the%20licensing%20details%20for%20this%20track%3A%20%0A%0A-%20Track%20title%3A%20{title}%0A-%20What%20it's%20for%3A%20%3Ctelevision%2C%20web%2C%20non-commercial%2C%20other%3E%0A%0A"
        >License it</a
      >
    </div>
  </div>
{/if}

<style lang="scss">
  .container {
    display: flex;
    flex-direction: row;
    position: fixed;
    bottom: 0px;
    left: 0px;
    right: 0px;
    height: 65px;
    padding: 1em 1em;
    align-items: center;
    justify-content: space-between;
    gap: 1em;

    background: rgba(0, 0, 0, 0.954);
    color: white;
    /* box-shadow: -5px -10px 5px rgba(0, 0, 0, 0.071); */
    z-index: 4;

    span {
    }
  }

  .play-button {
    height: 70%;
    &:hover {
      transform: scale(1.1);
      cursor: pointer;
    }
  }

  .thumbnail {
    height: 100%;
    align-self: flex-end;
    width: auto;
    transition: all 0.1s cubic-bezier(0.165, 0.84, 0.44, 1);
    border: 1px solid rgba(255, 255, 255, 0.788);
    background: rgba(0, 0, 0, 0.872);
    padding: 3px;
    border-radius: 4px;
  }

  p,
  small {
    margin: 0;
  }

  .info {
    max-width: 300px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .description {
    opacity: 0.7;
  }

  @keyframes scroll {
    from {
      left: 0%;
    }
    to {
      left: -100%;
    }
  }

  .seekbar-container {
    flex-grow: 5;
    height: 100%;
    align-items: center;
    display: flex;
    cursor: ew-resize;

    @media only screen and (max-width: 522px) {
      display: none;
    }
  }

  .seekbar {
    background: rgba(255, 255, 255, 0.262);
    height: 2px;
    width: 100%;
    overflow: visible;
    align-items: center;
    display: flex;
    position: relative;

    .hoverhead-container {
      pointer-events: none;
      position: absolute;
      height: 15px;
      width: 15px;

      .hoverhead-tooltip {
        position: absolute;
        top: -25px;
        font-size: 0.7em;
      }
    }

    svg {
      height: 15px;
      width: 15px;
      fill: white;
      position: absolute;
      overflow: visible;

      :global(.dark-mode) & {
      }

      &.hoverhead {
        fill: none;
        pointer-events: none;
        cursor: pointer;

        > circle {
          stroke: white;
          stroke-width: 2px;

          :global(.dark-mode) & {
          }
        }
      }
    }
  }

  .elapsed-time {
    opacity: 0.5;
  }
  .license-btn {
    padding: 0.3em 0.5em;
    border: 2px solid white;
    color: white;
    border-radius: 5px;
    text-decoration: none;
    font-weight: bold;
    font-size: 0.8em;
    &:hover {
      background: rgba(255, 255, 255, 0.262);
    }
  }
</style>
