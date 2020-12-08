<script>
import TrackMiniPlayer from "../components/TrackMiniPlayer.svelte";

</script>
<style lang="scss">
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

</style>

<div class="container">
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
			<p>
				On self-tracking, exobrains and quantified self
			</p>
			<a href="https://existentialist.xyz/on-self-tracking-exobrains-and-quantified-self/"> Read -> </a>
		</section>
		<section style="grid-area: d;">
			<img
				class="mobile-hide"
				style="align-self: flex-start;margin-left: 5em;"
				alt="Arrow"
				src="arrow_right.svg" />

			<p class="mobile-hide" style="opacity: 0.7;">
				For music projects, tracks, blog, samples, presets
			</p>

			<h3>Latest tracks</h3>
				<TrackMiniPlayer trackId="818507320" />
				<TrackMiniPlayer trackId="940950685" />
		</section>
	</div>

</div>
