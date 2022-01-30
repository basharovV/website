<script>
  const albums = [
    {
      artist: "Nala Sinephro",
      title: "Space 1.8",
      year: 2021,
      review:
        "This album is a wonderful sonic journey, \
            full of things that feel fresh to the ears. \
            Jazz, improvisation, electronic, ambient. \
            Each track is an individual space that brings \
            you in and doesn't let go. And just look at that artwork!",
      artwork:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.musikexpress.de%2Fwp-content%2Fuploads%2F2021%2F09%2F03%2F10%2Fnala-sinephro-space-1-8.jpg&f=1&nofb=1",
      link: "https://www.youtube.com/watch?v=Qqi_EZ0DgrA",
      linkText: "YouTube link (official channel)",
    },
    {
      artist: "Joe Henderson",
      title: "Page One",
      year: 1963,
      review:
        "Features the first appearance of the popular standard 'Blue Bossa', \
        a great classic jazz album that stands the test of time.",
      artwork:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages-na.ssl-images-amazon.com%2Fimages%2FI%2F71QubkT%252BwwL._AC_SL1200_.jpg&f=1&nofb=1",
      link: "https://www.youtube.com/watch?v=yaHl83qK0eM",
      linkText: "YouTube link (vinyl rip - Side A)",
      linkB: "https://www.youtube.com/watch?v=2lGPBce-FRo",
      linkBText: "YouTube link (vinyl rip - Side B)",
    },
    {
      artist: "Nacho Loring",
      title: "Noneto",
      year: 2021,
      review:
        "A wonderfully crafted Andalusian jazz record from Nacho Loring's nine-piece band",
      artwork: "https://f4.bcbits.com/img/a3519593757_16.jpg",
      link: "https://www.youtube.com/watch?v=7fqmRGv4SJw&list=OLAK5uy_lf66koFRm7PxsUqDZFtEU5geAefJiet04",
      linkText: "YouTube link (official channel)",
    },
    {
      artist: "Solomon Fox",
      title: "Solomon",
      year: 2021,
      review:
        "Dreamy vocals with lo-fi production. Worth listening the whole way through. Favourite tracks: Swallow Your Pride.",
      artwork: "https://f4.bcbits.com/img/a2947954285_16.jpg",
      link: "https://www.youtube.com/channel/UCeGioxzXtvkbEVZdLs3bHMQ",
      linkText: "YouTube link (official channel)",
    },
  ];
</script>

<div class="post">
  <a
    class="playlist"
    href="https://www.youtube.com/playlist?list=PL_6G6za9bUylqt1k56FWGJJbAV0HU3bTr"
    >📺 YouTube playlist here</a
  >
  <div class="full-albums">
    <div class="albums">
      {#each albums as album}
        <div class="album">
          <img src={album.artwork} />
          <h1>{album.title}</h1>
          <h3><span style="opacity: 0.5;">by</span> {album.artist}</h3>
          <div class="links">
            <a href={album.link}>{album.linkText ? album.linkText : "Link"}</a>
            {#if album.linkB}
              <a href={album.linkB}
                >{album.linkBText ? album.linkBText : "Link B"}</a
              >
            {/if}
          </div>
          <p>{album.review}</p>
        </div>
      {/each}
    </div>
  </div>
</div>

<style lang="scss">
  .playlist {
    margin: 1em auto;
    width: fit-content;
    display: block;
  }
  .full-albums {
    position: absolute;
    left: 0;
    right: 0;
    margin-top: 4em;
  }
  .albums {
    width: 90%;
    margin: auto;
    display: flex;
    gap: 2em;
    flex-wrap: wrap;
    justify-content: center;
  }

  .album {
    display: grid;
    grid-template-columns: 20em 1fr;
    grid-template-rows: auto auto auto 1fr;
    column-gap: 2em;
    > img {
      grid-row: 1 / span 4;
      grid-column: 1;
      border-radius: 3px;
    }
    > h1 {
      margin-top: 0;
      margin-bottom: 0;
      grid-row: 1;
      grid-column: 2;
    }
    > h3 {
      margin-top: 0.5em;
      margin-bottom: 1em;
      grid-row: 2;
      grid-column: 2;
    }
    > .links {
      grid-row: 3;
      grid-column: 2;
      display: grid;
      gap: 10px;
    }
    > p {
      grid-row: 4;
      grid-column: 2;
      max-width: 400px;
    }
  }
</style>
