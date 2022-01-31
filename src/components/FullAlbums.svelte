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
      artwork: "/post-media/full-albums/space-1-8.jpeg",
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
      artwork: "/post-media/full-albums/page-one.jpeg",
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
        "Something from the local jazz scene in Malaga, Spain. A wonderfully crafted Andalusian jazz record from Nacho Loring, composed for a nine piece band.",
      artwork: "/post-media/full-albums/noneto.jpeg",
      link: "https://www.youtube.com/watch?v=7fqmRGv4SJw&list=OLAK5uy_lf66koFRm7PxsUqDZFtEU5geAefJiet04",
      linkText: "YouTube link (official channel)",
    },
    {
      artist: "Solomon Fox",
      title: "Solomon",
      year: 2021,
      review:
        "Dreamy vocals with lo-fi production. Worth listening the whole way through. Favourite tracks: Swallow Your Pride.",
      artwork: "/post-media/full-albums/solomon.jpeg",
      link: "https://www.youtube.com/channel/UCeGioxzXtvkbEVZdLs3bHMQ",
      linkText: "YouTube link (official channel)",
    },
    {
      artist: "e.s.t. Esbjörn Svensson Trio",
      title: "Seven Days of Falling",
      year: 2003,
      review:
        "Really captivating blend of jazz and minimalism with a Scandinavian touch from the late Esbjörn Svensson.",
      artwork: "/post-media/full-albums/seven-days-of-falling.jpeg",
      link: "https://www.youtube.com/channel/UCeGioxzXtvkbEVZdLs3bHMQ",
      linkText: "YouTube link (official channel)",
      liveLink: "https://www.youtube.com/watch?v=D7KXq6RJ0PA",
    },
    {
      artist: "Banda Magda",
      title: "Tigre",
      year: 2017,
      review:
        "A multilingual record from the multi-talented Magda Giannikou, telling tales of courage through music. The album has a sense of continuity despite jumping between French, Spanish, Greek and Portuguese.",
      artwork: "/post-media/full-albums/tigre.jpeg",
      link: "https://www.youtube.com/playlist?list=OLAK5uy_m3h0VamCCD1kAjRSvyvIjHFhbDPB3xANI",
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
            {#if album.liveLink}
              <span
                >You should also hear it
                <a href={album.liveLink}>live</a></span
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

    @media only screen and (max-width: 800px) {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        > img {
            width: 70%;
            margin-bottom: 1em;
        }
    }
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
