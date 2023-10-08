<svelte:options accessors />

<script context="module" lang="ts">
	export const pageNumber = 0;
	export const subRoutes = [];
	export const routeParams = undefined;
</script>

<script lang="ts">
	import Waves from '@lib/components/organisms/Waves.svelte';
	import Hero from '@lib/components/organisms/Hero.svelte';
	import About from '@lib/components/organisms/About.svelte';
	import BlogCardGrid from '@lib/components/organisms/BlogCardGrid.svelte';
	import { postStore } from '@lib/utils/store';
	import { projectStore } from '@lib/utils/store';

	import Footer from '@lib/components/organisms/Footer.svelte';
	import { description, image, keywords, title, siteBaseUrl } from '@lib/utils/meta';

	let howManyRecent = 4;
</script>

<svelte:head>
	<link rel="canonical" href={siteBaseUrl} />
	<meta name="keywords" content={keywords.join(', ')} />

	<meta name="description" content={description} />
	<meta property="og:description" content={description} />
	<meta name="twitter:description" content={description} />

	<title>{title}</title>
	<meta property="og:title" content={title} />
	<meta name="twitter:title" content={title} />

	<meta property="og:image" content={image} />
	<meta name="twitter:image" content={image} />

	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>
<div class="container">
	<main>
		<div class="center-container">
			<Hero />
			<About />
		</div>

		{#await projectStore.init}
			<p>...parsing projects</p>
		{:then projects}
			<BlogCardGrid posts={projects} title={'Projects'} numToShow={howManyRecent} />
		{:catch error}
			<p style="color: red">{error.message}</p>
		{/await}

		{#await postStore.init}
			<p>...parsing markdown</p>
		{:then posts}
			<BlogCardGrid {posts} title={'Articles'} numToShow={howManyRecent} />
		{:catch error}
			<p style="color: red">{error.message}</p>
		{/await}
	</main>

	<Footer />
</div>
