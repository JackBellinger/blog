<!-- <script context="module" lang="ts">
	export const pagePriority = 3;
	export const hidden = true;
	export const subRoutes = [];
	export const routeParam = 'projectid';
</script>

<script lang="ts">
	import { projectStores } from '@lib/utils/store';
	import MarkdownPage from '@lib/components/organisms/MarkdownPage.svelte';
	import BlogCardScroller from '@lib/components/inf-scroller/BlogCardScroller.svelte';
	import Page from '@lib/components/organisms/Page.svelte';
	import BlogPostCard from '@lib/components/inf-scroller/BlogPostCard.svelte';

	export let projectid: string = '';
	let opened_article;
	projectStores.items.subscribe(posts => {
		opened_article = posts.find((post) => post.slug == projectid)
	})
</script>

<Page>
	<div slot="left-sidebar" />
	<div slot="right-sidebar" />
	<main slot="main-content">
		{#await projectStores.items}
			<p>...parsing markdown</p>
		{:then projects}
			{#if !(projectid ?? '').length}
				🤔
				<svelte:component this={BlogCardScroller} store={projectStores} displayComponent={BlogPostCard} displayProps={{href_prefix: '/blog/articles'}}/>
			{:else}
				<svelte:component this={MarkdownPage} post={opened_article} />
			{/if}
		{:catch error}
			<p style="color: red">{error.message}</p>
		{/await}
	</main>
</Page>

<style lang="scss">
	@import '../lib/scss/_mixins.scss';
</style> -->
