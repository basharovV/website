<script>
	import { onMount } from "svelte";

	import TrackMiniPlayer from "../components/TrackMiniPlayer.svelte";

	let darkMode;
	let mounted;

	onMount(() => {
		darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
		mounted = true;
	});

	$: if (mounted) {
		if (darkMode) window.document.body.classList.add("dark-mode");
		else window.document.body.classList.remove("dark-mode");
	}
</script>

<style lang="scss">
	:global(body) {
		transition: background-color cubic-bezier(0.6, -0.28, 0.735, 0.045) 0.3s;
		// transition: color cubic-bezier(0.6, -0.28, 0.735, 0.045) 0.3s;
	}

	:global(.dark-mode) {
		background-color: black !important;
		color: white;
	}

	.container {
		padding-top: 4em;
		max-width: 900px;
		display: flex;
		flex-direction: column;
		margin: auto;

		> div {
			display: flex;
			flex-direction: row;
			gap: 100px;

			@media only screen and (max-width: 522px) {
				flex-wrap: wrap;
			}

			> section {
				max-width: 350px;
				display: flex;
				flex-direction: column;
			}
		}
	}

	section {
		margin: 0;
		width: 100%;
	}

	header {
		margin: 1em auto 0;
		position: relative;
	}

	h2 {
		display: inline-block;
	}

	h3 {
		margin-top: 2em;
	}

	@media only screen and (max-width: 643px) {
		h2 {
			display: block;
		}
	}

	a {
		&:hover {
			opacity: 0.6;
		}
	}

	@media only screen and (max-width: 522px) {
		.mobile-hide {
			display: none;
		}
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

<div class="container {darkMode ? 'invert' : ''}">
	<img
		style="grid-area: a;margin:auto;width: 30px;"
		alt="Logo"
		src="logo.svg" />
	<header>
		<h2 style="text-align: center;">Hello! I’m Slav</h2>
		<h2 style="text-align: center;">
			- I
			<a href="/dev">make software</a>
			and
			<a href="/music">compose music.</a>
		</h2>
	</header>

	<div>
		<section>
			<img
				class="mobile-hide"
				style="align-self: flex-end;"
				alt="Arrow"
				src="arrow_left.svg" />
			<p class="mobile-hide" style="opacity: 0.7;">
				For projects, dev blog, UI mockups and more, go here!
			</p>

			<h3>Latest project</h3>
			<p>
				A browser extension to browse together in real-time, and do
				online research seamlessly in the browser.
			</p>
			<a href="https://tbxproject.com"> Visit site -> </a>
			<h3>Latest article</h3>
			<p>On self-tracking, exobrains and quantified self</p>
			<a
				href="https://existentialist.xyz/on-self-tracking-exobrains-and-quantified-self/">
				Read ->
			</a>
		</section>
		<section style="grid-area: d;">
			<img
				class="mobile-hide"
				style="align-self: flex-start;margin-left: 5em;"
				alt="Arrow"
				src="arrow_right.svg" />

			<p class="mobile-hide" style="opacity: 0.7;">
				For music projects, tracks, samples, presets
			</p>

			<h3>Latest tracks</h3>
			<TrackMiniPlayer trackId="1011296332" accent="1e2424" />
			<TrackMiniPlayer trackId="963507499" accent="1e2424" />
			<TrackMiniPlayer trackId="818507320" accent="1e2424" />
			<TrackMiniPlayer trackId="940950685" accent="1e2424" />
		</section>
	</div>

	<footer class={darkMode ? 'invert' : ''}>
		<p>Vyacheslav Basharov</p>
		<div>
			<a href="https://github.com/basharovV"><img
					alt="github"
					src="github.svg" /></a>
			<a href="https://soundcloud.com/vbash"><img
					alt="soundcloud"
					src="soundcloud.svg" /></a>
			<a href="mailto:contact@vyacheslavbasharov.com"><img
					alt="email"
					src="email.svg" /></a>
		</div>
	</footer>
</div>
