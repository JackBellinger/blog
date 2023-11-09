<script context="module" lang="ts">
	export const pageNumber = 3;
	export const hidden = false;
	export const subRoutes = [];
	export const routeParam = 'projectid';
</script>

<script lang="ts">
	import { projectStores } from '@lib/utils/store';
	import MarkdownPage from '@lib/components/organisms/MarkdownPage.svelte';
	import BlogCardScroller from '@lib/components/organisms/BlogCardScroller.svelte';
	import Page from '@lib/components/organisms/Page.svelte';

	export let projectid: string = '';
</script>

<Page>
	<div slot="left-sidebar" />
	<div slot="right-sidebar" />
	<main slot="main-content">
		{#await projectStores.items.load()}
			<p>...parsing markdown</p>
		{:then projects}
			{#if !(projectid ?? '').length}
				<svelte:component this={BlogCardScroller} store={projectStores} />
			{:else}
				<svelte:component this={MarkdownPage} post={projects.find((project) => project.slug == projectid)} />
			{/if}
		{:catch error}
			<p style="color: red">{error.message}</p>
		{/await}
	</main>
</Page>

<style lang="scss">
	@import '../lib/scss/_mixins.scss';
</style>
