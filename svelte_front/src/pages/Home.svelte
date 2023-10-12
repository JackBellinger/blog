<svelte:options accessors />

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
	import { postStore } from '@lib/utils/store';
	import { projectStore } from '@lib/utils/store';
	import CodeBlock from '@lib/components/molecules/CodeBlock.svelte';

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
					- 🔭 I’m currently searching for a fullstack or backend role.<br />
					<br />
					- 🌱 I’m currently learning <b>Svelte, Webassembly, and Machine learning</b><br />
					<br />
					- 📝 Check out my devlogs at <a href="/blog/articles">Menu/Projects</a> <br />
					<br />
					- 📝 Read my blog at <a href="/blog/articles">Menu/Articles</a> <br />
					<br />
					- 📫 How to reach me <i>jdunnbellinger@gmail.com</i><br />
				</p>
			</Hero>
			<Summary />
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
</div>

<style lang="scss">
	.intro {
		//font-weight: 500;
		//font-size: 1.4rem;
		//width: min(100%, 440px);
		display: flex;
		flex-direction: column;
		p {
			text-align: center;
		}
		.left {
			text-align: left;
		}
		.right {
			text-align: right;
		}
	}
</style>
