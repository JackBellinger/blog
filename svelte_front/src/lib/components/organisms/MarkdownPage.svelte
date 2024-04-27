<script lang="ts">
	import Tag from '@lib/components/inf-scroller/Tag.svelte';
	import dateformat from 'dateformat';

	import { keywords, siteBaseUrl, title } from '@lib/utils/meta';
	import { CommentSource, type BlogPost, defaultBlogPost } from '@lib/utils/types';
	import Image from '@lib/components/atoms/Image.svelte';
	import BlogCardGrid from './BlogCardGrid.svelte';
	import CommentSection from './CommentSection.svelte';
	import { sessionStore } from '@lib/utils/store';
	import { onMount } from 'svelte';

	export let post: BlogPost;
	//console.log("making page for ", post)
	let metaKeywords = keywords;
	$: {
		if (post?.tags?.length) {
			metaKeywords = post.tags.concat(metaKeywords);
		}
		if (post?.keywords?.length) {
			metaKeywords = post.keywords.concat(metaKeywords);
		}
	}

	let markdownContent;

	// let markdownComponent;
	let loadMarkdown = async () => {
		return await sessionStore.load().then(async (session) => {
			let raw_html = true;
			if (session.backend_connected) {
				const response = await fetch(`/api/articles/${post.slug}.html`).then((res) => {
					// console.log(res);
					return res;
				});
				markdownContent = await response.text();

				const tempElement = document.createElement('div'); // Create a temporary element
				tempElement.innerHTML = markdownContent; // Set its innerHTML to the HTML content

				const fragment = document.createDocumentFragment();
				fragment.appendChild(tempElement); // Append the parsed content to the fragment

				const element = document.getElementById('content');
				element.appendChild(fragment); // Append the fragment to the target element
			} else {
				raw_html = false;
				markdownContent = post.component;
			}
			// console.log('markdown content: ', markdownContent);
			return [raw_html, markdownContent];
		});
	};
</script>

<svelte:head>
	{#if post}
		<meta name="keywords" content={metaKeywords.join(', ')} />

		<meta name="description" content={post.excerpt} />
		<meta property="og:description" content={post.excerpt} />
		<meta name="twitter:description" content={post.excerpt} />
		<link rel="canonical" href="{siteBaseUrl}/{post.slug}" />

		<title>{post.title} - {title}</title>
		<meta property="og:title" content="{post.title} - {title}" />
		<meta name="twitter:title" content="{post.title} - {title}" />

		{#if post.coverImage}
			<meta property="og:image" content="{siteBaseUrl}{post.coverImage}" />
			<meta name="twitter:image" content="{siteBaseUrl}{post.coverImage}" />
		{/if}
	{/if}
</svelte:head>

<div class="article-layout">
	<main>
		<article id="article-content">
			{#if post}
				<div class="header">
					<h1>{post.title}</h1>
					<div class="note">Published on {dateformat(post.date, 'UTC:dd mmmm yyyy')}</div>
					{#if post.updated}
						<div class="note">Updated on {dateformat(post.updated, 'UTC:dd mmmm yyyy')}</div>
					{/if}
					{#if post.readingTime}
						<div class="note">{post.readingTime}</div>
					{/if}
					{#if post.tags?.length}
						<div class="tags">
							{#each post.tags as tag, i}
								<Tag color={i == 0 ? 'primary' : 'secondary'}>{tag}</Tag>
							{/each}
						</div>
					{/if}
				</div>
				{#if post.coverImage}
					<div class="cover-image">
						<Image src={post.coverImage} alt={post.title} />
					</div>
				{/if}
				<div class="content" id="content">
					<div id="markdown-content"></div>
					{#await loadMarkdown()}
						<p>...loading article</p>
					{:then [is_raw_html, markdownContent]}
						{#if !is_raw_html}
							<svelte:component this={markdownContent} />
						{/if}
					{/await}
				</div>
			{/if}
		</article>
		{#if post}
			{#if post.relatedPosts && post.relatedPosts.length > 0}
				<div class="container">
					<BlogCardGrid
						posts={post.relatedPosts}
						numToShow={4}
						title={'Related ' + window.location.href.split('/').splice(-2)[0]}
					/>
				</div>
			{/if}
			<CommentSection source={CommentSource.Blog} identifier={post.slug} />
		{/if}
	</main>
</div>

<style lang="scss">
	//.article-layout {
	//	--body-background-color: var(--color--post-page-background);
	//	background-color: var(--color--post-page-background);
	//}

	#article-content {
		--main-column-width: 85ch;
		position: relative;
		padding-top: 40px;
		padding-bottom: 80px;
		padding-right: 15px;
		padding-left: 15px;

		//@include for-iphone-se {
		//	padding-left: 0;
		//	padding-right: 0;
		//}

		//@include for-tablet-portrait-up {
		//	padding-right: 20px;
		//	padding-left: 20px;
		//}

		//@include for-tablet-landscape-up {
		//	padding-right: 30px;
		//	padding-left: 30px;
		//}

		display: flex;
		flex-direction: column;
		gap: 30px;

		.header {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			text-align: center;
			gap: 10px;
			width: min(var(--main-column-width), 100%);
			margin: 0 auto;

			.note {
				font-size: 90%;
				color: rgba(var(--color--text-rgb), 0.8);
			}
		}

		.cover-image {
			width: min(var(--main-column-width), 100%);
			margin: 0 auto;
			//max-height: 400px;
			box-shadow: var(--image-shadow);
			border-radius: 6px;
		}

		.content {
			display: grid;
			grid-template-columns:
				1fr
				min(var(--main-column-width), 100%)
				1fr;

			:global(> *) {
				grid-column: 2;
			}

			:global(> .full-bleed) {
				grid-column: 1 / 4;
				width: 100%;
				max-width: 1600px;
				margin-left: auto;
				margin-right: auto;
			}
		}

		.tags {
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 5px;
			flex-wrap: wrap;
		}
	}
</style>
