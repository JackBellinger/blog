<script>
	import FooterWave from '@assets/icons/footer-wave.svelte';
	import Socials from '@lib/components/molecules/Socials.svelte';
	import ThemeToggle from '@lib/components/molecules/ThemeToggle.svelte';
	import RssLink from '@lib/components/atoms/RssLink.svelte';
	import FluidSim from '@lib/components/molecules/FluidSim.svelte';
</script>

<footer>
	<div class="wave">
		<FooterWave />
	</div>
	<div class="content">
		<div class="copyright">Copyright (c) 2023 Jack Bellinger</div>
		<div class="credits">
			<a href="https://github.com/sveltejs/svelte" target="_blank" rel="noopener noreferrer"
				>Svelte</a
			>Frontend,
			<a href="https://github.com/vitejs/vite" target="_blank" rel="noopener noreferrer"> Vite</a>
			Bundler
			<a href="https://github.com/tokio-rs/axum" target="_blank" rel="noopener noreferrer">Axum</a>
			Server
			<br />Icons by
			<a href="https://iconoir.com/" target="_blank" rel="noopener noreferrer">Iconoir</a>
			and
			<a href="https://flaticon.com/" target="_blank" rel="noopener noreferrer">Flaticon</a>, Images
			by
			<a href="https://www.freepik.com/author/vectorjuice" target="_blank" rel="noopener noreferrer"
				>Freepik/Vectorjuice</a
			>
		</div>
		<div class="socials">
			<Socials />
			<RssLink />
			<ThemeToggle />
		</div>
	</div>
	<!--<FluidSim/>-->
</footer>

<style lang="scss">
	footer {
		height: 340px;
		width: 100%;
		background: linear-gradient(60deg, var(--color--waves-start) 0%, var(--color--waves-end) 100%);
		display: grid;
		grid-template-rows: 120px 1fr;

		.content {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			gap: 15px;
			font-weight: 500;
			text-align: center;

			.credits {
				font-weight: 400;
				font-size: 90%;
				color: var(--color--text-shade);
			}

			.socials {
				display: flex;
				align-items: center;
				gap: 20px;
			}
		}

		a {
			&:hover {
				filter: drop-shadow(0px 0px 3px var(--color--primary));
			}
		}
	}
</style>
