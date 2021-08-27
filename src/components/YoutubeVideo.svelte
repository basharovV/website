<script>
  export let videoId;
  export let platform;

  let vimeoThumbnail;

  async function getVimeoThumbnail() {
    await fetch(`https://vimeo.com/api/oembed.json?url=https%3A//vimeo.com/${videoId}&width=480&height=360`)
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          vimeoThumbnail = response.thumbnail_url.replace('295x166', '480x360');
        }
      });
  }

  let loadIframe = false;

  $: thumbnail =
    platform === "yt"
      ? `https://img.youtube.com/vi/${videoId}/sddefault.jpg`
      : vimeoThumbnail;

  if (typeof window !== "undefined" && platform === "vimeo") {
    getVimeoThumbnail();
  }
</script>

<div class="embed">
  {#if loadIframe}
    <iframe
      alt="One of my videos"
      loading="lazy"
      src={platform === "yt"
        ? `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`
        : `https://player.vimeo.com/video/${videoId}`}
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    />
  {:else}
    <div
      on:click={() => {
        loadIframe = true;
      }}
    >
      <img alt="thumbnail" src={thumbnail} />
      <div class="play-button" />
    </div>
  {/if}
</div>

<style lang="scss">
  .embed {
    position: relative;
    width: 100%;
    padding-bottom: 56.25%;
    overflow: hidden;

    box-sizing: border-box;
    border-radius: 10px;
    border: 2px solid #c1c1c15b;
    @media only screen and (max-width: 522px) {
      width: 100%;
    }

    &:hover {
      opacity: 0.9;
      cursor: pointer;

      img {
        transform: scale(1.1);
        opacity: 0.8;
      }
    }
    .play-button {
      position: absolute;
      display: block;
      box-sizing: border-box;
      width: 0;
      height: 37px;
      margin: auto;
      border-color: transparent transparent transparent rgb(255, 255, 255);
      transition: 100ms all ease;
      cursor: pointer;
      border-style: solid;
      border-width: 18.5px 0 18.5px 30px;
      top: 0px;
      bottom: 0px;
      left: 0px;
      right: 0px;

      &:hover {
        transform: scale(1.1);
        opacity: 0.8;
      }
    }

    img {
      object-fit: cover;
      transition: all 0.1s cubic-bezier(0.075, 0.82, 0.165, 1);
    }

    > iframe,
    img {
      position: absolute;
      padding: 2px;
      left: 0;
      right: 0;
      width: 100%;
      height: 100%;
      border-radius: 10px;
      box-sizing: border-box;
      @media only screen and (max-width: 522px) {
        position: absolute;
        left: 0;
        right: 0;
        box-sizing: border-box;
        border: none;
        width: 100%;
      }
    }
  }
</style>
