<script context="module" lang="ts">
	export const pageNumber = 3;
	export const hidden = false;
	export const subRoutes = [];
	export const routeParam = 'projectid';
</script>

<script lang="ts">
	import { projectStore } from '@lib/utils/store';
	import MarkdownPage from '@lib/components/organisms/MarkdownPage.svelte';
	import BlogCardScroller from '@lib/components/organisms/BlogCardScroller.svelte';
	//import GithubKanban from '@lib/components/organisms/GithubKanban.svelte';

	export let projectid: string;
</script>

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
