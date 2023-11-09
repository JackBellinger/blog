<script context="module" lang="ts">
	export const pageNumber = 2;
	export const hidden = false;
	export const subRoutes = [];
	export const routeParam = 'blogid';
</script>

<script lang="ts">
	import { postStores } from '@lib/utils/store';
	import MarkdownPage from '@lib/components/organisms/MarkdownPage.svelte';
	import BlogCardScroller from '@lib/components/organisms/BlogCardScroller.svelte';
	import Page from '@lib/components/organisms/Page.svelte';

	export let blogid: string = '';
</script>

<Page>
	<div slot="left-sidebar" />
	<div slot="right-sidebar" />
	<main slot="main-content">
		{#await postStores.items.load()}
			<p>...parsing markdown</p>
		{:then posts}
			{#if !(blogid ?? '').length}
				<svelte:component this={BlogCardScroller} store={postStores} />
			{:else}
				<svelte:component this={MarkdownPage} post={posts.find((post) => post.slug == blogid)} />
			{/if}
		{:catch error}
			<p style="color: red">{error.message}</p>
		{/await}
	</main>
</Page>

<style lang="scss">
	@import '../lib/scss/_mixins.scss';
</style>
