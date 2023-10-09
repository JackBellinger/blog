<svelte:options accessors />

<script context="module" lang="ts">
	export const pageNumber = 0;
	export const hidden = false;
	export const subRoutes = [];
	export const routeParams = undefined;
</script>

<script lang="ts">
	import Waves from '@lib/components/organisms/Waves.svelte';
	import Hero from '@lib/components/organisms/Hero.svelte';
	import About from '@lib/components/organisms/Summary.svelte';
	import BlogCardGrid from '@lib/components/organisms/BlogCardGrid.svelte';
	import { postStore } from '@lib/utils/store';
	import { projectStore } from '@lib/utils/store';

	import Footer from '@lib/components/organisms/Footer.svelte';
	import { description, image, keywords, title, siteBaseUrl } from '@lib/utils/meta';
	import CodeBlock from '@lib/components/molecules/CodeBlock.svelte';

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
			<Hero>
				<section class="intro">
					<h1 class="hello">Hello, I'm Jack Bellinger</h1>

				</section>
			</Hero>
			<p>
				<CodeBlock filename={"A bit about me.json"} lang={""}>
					let Jack: Software Engineer = &#123;<br>
					<p>
						&emsp;&emsp;&emsp;years of experience: 3,<br>
						&emsp;&emsp;&emsp;platforms: [web, microservice clusters, federated],<br>
						&emsp;&emsp;&emsp;applications: [ML operations, data engineering, network security],<br>
						&emsp;&emsp;&emsp;domain knowledge: [live_streaming, port & behavior based host id],<br>
						&emsp;&emsp;&emsp;technical scope: [design & review, code, devops],<br>
						&emsp;&emsp;&emsp;leadership skills: [requirements spec, scoping, mentoring]
					</p>
					&#125;
				</CodeBlock>
			</p>
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

</div>

<style lang="scss">
	.intro {
		//font-weight: 500;
		//font-size: 1.4rem;
		//width: min(100%, 440px);
		display: flex;
		flex-direction: column;

		.left {
			text-align: left;
		}
		.right {
			text-align: right;
		}
	}
</style>