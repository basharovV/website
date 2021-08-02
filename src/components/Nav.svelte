<script>
  export let segment;
</script>

<nav>
  <ul>
    <li>
      <a aria-current={segment === undefined ? "page" : undefined} href="."
        >home</a
      >
    </li>
    <li>
      <a aria-current={segment === "dev" ? "page" : undefined} href="dev">dev</a
      >
    </li>
    <li>
      <a aria-current={segment === "music" ? "page" : undefined} href="music"
        >music</a
      >
    </li>

    <!-- for the blog link, we're using rel=prefetch so that Sapper prefetches
		     the blog data when we hover over the link or tap it on a touchscreen -->
    <li>
      <a
        rel="prefetch"
        aria-current={segment === "shop" ? "page" : undefined}
        href="shop">shop</a
      >
    </li>
  </ul>
</nav>

<style lang="scss">
  nav {
    border-bottom: 1px solid rgba(0, 115, 255, 0.1);
    font-weight: 300;
    padding: 0;
    display: flex;
    justify-content: center;
  }

  ul {
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    min-width: 300px;
    justify-content: space-around;
    @media only screen and (max-width: 522px) {
      min-width: none;
      width: 100%;
    }
  }

  /* clearfix */
  ul::after {
    content: "";
    display: block;
    clear: both;
  }

  li {
    display: block;
    float: left;
  }

  [aria-current] {
    position: relative;
    display: inline-block;
	opacity: 1;
  }

  [aria-current]::after {
    position: absolute;
    content: "";
    width: calc(100% - 1em);
    height: 2px;
    background-color: rgb(255, 62, 0);
    display: block;
    bottom: -1px;
  }

  a {
    text-decoration: none;
    padding: 1em 0.5em;
	opacity: 0.8;
    display: block;

	&:hover {
		font-weight: bold;
		opacity: 1;
	}
  }

</style>
