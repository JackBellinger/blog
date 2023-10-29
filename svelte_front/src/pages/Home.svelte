<script context="module" lang="ts">
	export const pageNumber = 0;
	export const hidden = false;
	export const subRoutes = [];
	export const routeParams = undefined;
</script>

<script lang="ts">
	import Hero from '@lib/components/organisms/Hero.svelte';
	import Summary from '@lib/components/organisms/Summary.svelte';
	import BlogCardGrid from '@lib/components/organisms/BlogCardGrid.svelte';
	import { postStores } from '@lib/utils/store';
	import { projectStores } from '@lib/utils/store';

	let howManyRecent = 4;
</script>

<div class="container">
	<main>
		<div class="center-container">
			<Hero>
				<section class="intro">
					<h1 class="hello">Hello, I'm Jack Bellinger</h1>
					<!--<p> welcome to my blog</p>-->
				</section>
				<p>
					- 🔭 I'm currently searching for a fullstack or backend role.<br />
					<br />
					- 🌱 I'm currently learning <b>Svelte, Webassembly, and Machine learning</b><br />
					<br />
					- 📝 Check out my devlogs at <a href="/blog/articles">Menu/Projects</a> <br />
					<br />
					- 📝 Read my blog at <a href="/blog/articles">Menu/Articles</a> <br />
					<br />
					- 📫 Send me an email at <i>jdunnbellinger@gmail.com</i><br />
				</p>
			</Hero>
			<Summary />
		</div>

		{#await projectStores.items.load()}
			<p>...parsing projects</p>
		{:then projects}
			{console.log("projects ", projects)}
			<BlogCardGrid posts={projects} title={'Projects'} numToShow={howManyRecent} />
		{:catch error}
			<p style="color: red">{error.message}</p>
		{/await}

		{#await postStores.items.load()}
			<p>...parsing markdown</p>
		{:then posts}
			{console.log("posts: ", posts)}
			<BlogCardGrid {posts} title={'Articles'} numToShow={howManyRecent} />
		{:catch error}
			<p style="color: red">{error.message}</p>
		{/await}
	</main>
</div>

<style lang="scss">

</style>
