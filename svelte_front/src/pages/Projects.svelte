<svelte:options accessors />

<script context="module" lang="ts">
	export const pageNumber = 2;
	export const subRoutes = [];
	export const routeParam = 'projectid';
</script>

<script lang="ts">
	import Waves from '@lib/components/organisms/Waves.svelte';
	import Footer from '@lib/components/organisms/Footer.svelte';
	import { description, image, keywords, title, siteBaseUrl } from '@lib/utils/meta';
	import { projectStore } from '@lib/utils/store';
	import BlogCardGrid from '@lib/components/organisms/BlogCardGrid.svelte';
	import MarkdownPage from '@lib/components/organisms/MarkdownPage.svelte';
	import BlogCardScroller from '@lib/components/organisms/BlogCardScroller.svelte';
	//import GithubKanban from '@lib/components/organisms/GithubKanban.svelte';

	export let projectid: string;
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
		<!--</main> class="center-container">-->
		{#await projectStore.init}
			<p>...parsing markdown</p>
		{:then projects}
			{#if !(projectid ?? '').length}
				<svelte:component this={BlogCardScroller} posts={projects} />
			{:else}
				<svelte:component
					this={MarkdownPage}
					post={projects.find((post) => post.slug == projectid)}
				/>
			{/if}
		{:catch error}
			<p style="color: red">{error.message}</p>
		{/await}

		<!--{#await githubStore.init}
			<p>...parsing markdown</p>
		{:then github}
				Blog Kanban
				<svelte:component this={GithubKanban} data={github}/>
		{:catch error}
			<p style="color: red">{error.message}</p>
		{/await}-->
	</main>
</div>
<Footer />

<style lang="scss">
	@import '../lib/scss/_mixins.scss';

	//.grid {
	//	width: 100%;
	//	display: grid;
	//	grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
	//	grid-gap: 20px;

	//@include for-tablet-portrait-down {
	//	grid-template-columns: 1fr;
	//}

	//@include for-tablet-landscape-up {
	//	// Select every 6 elements, starting from position 1
	//	// And make it take up 6 columns
	//	> :global(:nth-child(6n + 1)) {
	//		grid-column: span 6;
	//	}
	//	// Select every 6 elements, starting from position 2
	//	// And make it take up 3 columns
	//	> :global(:nth-child(6n + 2)) {
	//		grid-column: span 3;
	//	}
	//	// Select every 6 elements, starting from position 3
	//	// And make it take up 3 columns
	//	> :global(:nth-child(6n + 3)) {
	//		grid-column: span 3;
	//	}
	//	// Select every 6 elements, starting from position 4, 5 and 6
	//	// And make it take up 2 columns
	//	> :global(:nth-child(6n + 4)),
	//	:global(:nth-child(6n + 5)),
	//	:global(:nth-child(6n + 6)) {
	//		grid-column: span 2;
	//	}
	//}
	//}
</style>
