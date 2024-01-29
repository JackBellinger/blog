<script context="module" lang="ts">
	export const pagePriority = 2;
	export const hidden = false;
	export const subRoutes = [];
	export const routeParam = 'blogid';
</script>

<script lang="ts">
	import { postStores } from '@lib/utils/store';
	import MarkdownPage from '@lib/components/organisms/MarkdownPage.svelte';
	import BlogCardScroller from '@lib/components/inf-scroller/BlogCardScroller.svelte';
	import Page from '@lib/components/organisms/Page.svelte';
	import BlogPostCard from '@lib/components/inf-scroller/BlogPostCard.svelte';
	import type { BlogPost } from '@lib/utils/types';

	export let blogid: string = '';
	let posts: BlogPost[] = [];
	$: opened_article = posts.find((post) => post.slug == blogid)
	postStores.then(store => store.items.subscribe(sub_posts => {
		posts = sub_posts
	}))
</script>

<Page>
	<div slot="left-sidebar" />
	<div slot="right-sidebar" />
	<main slot="main-content">
		{#await postStores}
			<p>...checking for backend connectivity</p>
		{:then postStores}
			{#if opened_article}
				<svelte:component this={MarkdownPage} post={opened_article} />
			{:else}
				<svelte:component this={BlogCardScroller} store={postStores} displayComponent={BlogPostCard} displayProps={{href_prefix: '/blog/articles'}}/>	
			{/if}
		{/await}
	</main>
</Page>

<style lang="scss">
	@import '../lib/scss/_mixins.scss';
</style>
