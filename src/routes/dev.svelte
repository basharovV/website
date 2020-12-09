<script>
	import { onMount } from "svelte";

	import Images from "../components/Images.svelte";
	import { isDarkModeEnabled } from "../store/state.js";

	let mounted;

	onMount(() => {
		isDarkModeEnabled.set(
			window.matchMedia("(prefers-color-scheme: dark)").matches
		);
		mounted = true;
	});

	$: if (mounted) {
		if ($isDarkModeEnabled) window.document.body.classList.add("dark-mode");
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

	img {
		width: 100%;
	}

	section {
		padding: 1em 0;
		position: relative;
	}

	.designs {
		// columns: 2;
		// column-gap: 2em;
	}
	a {
		&:hover {
			opacity: 0.6;
		}
	}

	ul {
		padding-inline-start: 0px;
	}

	.theme-toggle {
		opacity: 0.7;
		svg {
			&:hover {
				transform: scale(1.2);
				cursor: pointer;
			}
		}
	}

	header {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
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

<svelte:head>
	<title>Vyacheslav Basharov • Full Stack Developer</title>
</svelte:head>
<header class={$isDarkModeEnabled ? 'invert' : ''}>
	<div>
		<h2 style="margin-bottom: 0;">Vyacheslav Basharov</h2>
		<small style="margin-bottom: 0;">Full-stack developer</small>
	</div>
	<a style="display: flex;" href="/"><img
			style="margin:auto;width: 30px;"
			alt="Logo"
			src="logo.svg" /></a>

	<small style="opacity: 0.6;margin:0"><a
			style="text-decoration: none"
			href="mailto:contact@vyacheslavbasharov.com">contact@vyacheslavbasharov.com</a></small>
</header>

<!-- <Nav/> -->

<div
	class="theme-toggle"
	style="display: flex;justify-content: flex-end;align-items: center;">
	<small>Theme:&nbsp;</small>
	<svg
		on:click={() => ($isDarkModeEnabled = true)}
		height="20px"
		width="20px">
		<circle
			cx="10"
			cy="10"
			r="8"
			stroke="white"
			stroke-width="3"
			fill="black" />
	</svg>
	<svg
		on:click={() => ($isDarkModeEnabled = false)}
		height="20px"
		width="20px">
		<circle
			cx="10"
			cy="10"
			r="8"
			stroke="black"
			stroke-width="3"
			fill="white" />
	</svg>
</div>
<section>
	<h3>Products & projects</h3>
	<h4>
		from full-fledged products, to failed startups, to fun mini side
		projects:
	</h4>
	<ul>
		<li>
			<p>
				🧩
				<b>tbx</b>: A browser extension to browse together in real-time,
				and do online research seamlessly in the browser.
				<a href="https://tbxproject.com">
					Learn more at tbxproject.com ->
				</a>
			</p>
		</li>
		<li>
			<p>
				🖌
				<b>existentialist</b>: A publication about the intersection of
				technology, science and art.
				<a href="https://existentialist.xyz">
					Have a read at existentialist.xyz ->
				</a>
			</p>
		</li>
		<li>
			<p>
				📲
				<b>Milly</b>: A digital loyalty platform & app based on UK Open
				Banking, allowing automatic points collection via linked bank
				accounts. Although the startup is no more - you can still check
				out the
				<a
					href="https://play.google.com/store/apps/details?id=works.milly.android">apps
					on the Play Store ->
				</a>
				and
				<a
					href="https://medium.com/milly-works/loyalty-schemes-suck-90c4f2f15de6">read
					this explanatory blog post -></a>
			</p>
		</li>
		<li>
			<p>
				⚡️
				<b>StumbleUponAwesome</b>: A fun StumbleUpon-like extension for
				developers, tech and science enthusiasts.
				<a href="https://github.com/basharovV/StumbleUponAwesome">
					Check out StumbleUponAwesome ->
				</a>
			</p>
		</li>
		<li>
			<p>
				🔈
				<b>whatsound</b>: An audio classifier using Essentia and
				PyBrain.
				<a href="https://github.com/basharovV/whatsound">
					See on GitHub ->
				</a>
			</p>
		</li>
	</ul>
</section>
<section>
	<h3>Designs & concepts</h3>
	<h4>a showcase of some of my UI designs</h4>

	<ul class="designs">
		<li>
			<p>
				♫ A hackable music player concept. Instead of playlists we have
				'playlets' - little musical programs that can be run inside the
				player, encouraging new ways to listen to and perceive music. As
				an example I show a simple Wikipedia playlet, which brings up
				songs together with their Wikipedia article.
			</p>
			<Images
				images={['designs/musicplayer.png', 'designs/musicplayer_2.png']} />
		</li>
		<li>
			<p>
				🔨A concept UI for the data science world: a command-based data
				tool that can perform smart transformations on documents using
				natural language commands instead of Excel-like formulas or
				menus.
			</p>
			<Images images={['designs/nlp_2.png', 'designs/nlp_1.png']} />
		</li>
		<li>
			<p>
				🎨 A logo I made when I was working on a social media app for
				students during my final year. The shape and two-in-one aspect
				are interesting, but I haven't found a use for it since.
			</p>
			<Images
				images={['designs/peek_1.png', 'designs/peek_3.png', 'designs/peek_2.png']} />
		</li>
		<li>
			<p>
				Modos: a concept I started thinking about to re-imagine window
				and workspace management on a desktop environment. I regularly
				switch between different tasks (development, design, writing,
				research, music production, etc), and wanted a way to arrange,
				visualise these 'modes' in my OS, and switch between them at the
				click of a button. I started tinkering with a BetterTouchTool
				preset to imagine what this can look like. I left this on hold
				but might come back to it at some point.
			</p>
			<Images
				images={['designs/modos_1.jpg', 'designs/modos_2.png', 'designs/modos_3.png']} />
		</li>
	</ul>
</section>

<footer class={$isDarkModeEnabled ? 'invert' : ''}>
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
