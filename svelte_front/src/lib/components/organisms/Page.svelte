<script lang="ts">
	import Waves from './Waves.svelte';
	import Header from '@lib/components/organisms/Header.svelte';
	import Toast from '@lib/components/molecules/Toast.svelte';
	import Footer from '@lib/components/organisms/Footer.svelte';

	let showBackground = true;
	$: logoText = 'Menu';
</script>

<div class="page-layout">
	<header class="header">
		{#if showBackground}
			<Waves />
			<Header {logoText} />
			<Toast />
		{/if}
		<slot name="header-after" />
	</header>
	<section class="left-sidebar">
		<slot name="left-sidebar" />
	</section>
	<main class="main-content">
		<slot name="main-content" />
	</main>
	<aside class="right-sidebar">
		<slot name="right-sidebar" />
	</aside>
	<footer class="footer">
		<slot name="footer-pre" />
		{#if showBackground}
			<Footer />
		{/if}
	</footer>
</div>

<style lang="scss">
	//https://matthewjamestaylor.com/holy-grail-layout
	/* set correct box model */
	* {
		box-sizing: border-box;
	}

	/* flexbox container */
	.page-layout {
		display: flex;
		flex-wrap: wrap;
	}

	/* columns (mobile) */
	.page-layout > * {
		width: 100%;
		//padding:1rem;
	}

	/* background colors */
	//.page-layout > .header {background:#f97171}
	//.page-layout > .main-content {background:#fff}
	//.page-layout > .left-sidebar {background:#f5d55f}
	//.page-layout > .right-sidebar {background:#c5ed77}
	//.page-layout > .footer {background:#72c2f1}

	/* tablet breakpoint */
	@media (min-width: 768px) {
		.page-layout > .left-sidebar,
		.page-layout > .right-sidebar {
			width: 100%;
		}
	}

	/* desktop breakpoint */
	@media (min-width: 1024px) {
		.page-layout > .header {
			order: -2; /* header first */
		}
		.page-layout > .left-sidebar {
			/* left sidebar second (first in second row) */
			order: -1;
		}
		.page-layout > .main-content {
			width: 60%;
		}
		.page-layout > .left-sidebar,
		.page-layout > .right-sidebar {
			width: 20%;
		}
	}
</style>
