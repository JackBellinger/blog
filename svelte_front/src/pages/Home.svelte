<script context="module" lang="ts">
	export const pagePriority = 0;
	export const hidden = false;
	export const subRoutes = [];
	export const routeParams = undefined;
</script>

<script lang="ts">
	import Hero from '@lib/components/organisms/Hero.svelte';
	import BlogCardGrid from '@lib/components/organisms/BlogCardGrid.svelte';
	import { postStores } from '@lib/utils/store';
	import Page from '@lib/components/organisms/Page.svelte';
	import Socials from '@lib/components/molecules/Socials.svelte';
	import type { BlogPost } from '@lib/utils/types';

	let howManyRecent = 4;
	let features_posts: BlogPost[];
	postStores.then(store => store.items.subscribe(posts => {
		features_posts = posts.filter((post) => !post.hidden)
	}))
</script>

<Page>
	<div slot="header-after" />
	<div slot="left-sidebar" />
	<div slot="right-sidebar" />
	<main slot="main-content">
		<div>
			<Hero>
				<h1 class="hello">Hello, I'm Jack Bellinger</h1>
				<p>I'm an ex-Amazon Software Engineer (Looking for a job!). I post my side projects here.</p>
				<div class="intro">
					Send me a message!
					<Socials />
				</div>
			</Hero>
		</div>

		<!-- {#await projectStores.items.load()}
			<p>...parsing projects</p>
		{:then projects}
			<BlogCardGrid
				posts={projects.filter((proj) => !proj.hidden)}
				title={'Projects'}
				description={"Here's what I'm working on!"}
				numToShow={howManyRecent}
			/>
		{:catch error}
			<p style="color: red">{error.message}</p>
		{/await} -->

		{#await postStores}
			<p>...checking for backend connectivity</p>
		{:then postStores}
				<BlogCardGrid posts={features_posts} title={'Articles'} numToShow={howManyRecent} />
		{/await}
	</main>
</Page>

<style lang="scss">
	.hello {
		text-align: center;
	}
	.intro {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		gap: 10px;
		width: 100%;
	}
</style>
