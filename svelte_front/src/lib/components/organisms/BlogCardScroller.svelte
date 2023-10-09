<script lang="ts">
	import BlogPostCard from '@lib/components/molecules/BlogPostCard.svelte';
	import ContentSection from '@lib/components/organisms/ContentSection.svelte';
	import type { BlogPost } from '@lib/utils/types';
	import Button from '@lib/components/atoms/Button.svelte';
	import SearchBar from '@lib/components/molecules/SearchTerm.svelte';
	import BlogCardSearchBar from './BlogCardSearchBar.svelte';

	let listElement;
	export let posts: BlogPost[];

	let locations = ['articles', 'projects'];
	let location = 'home';
	let i = Number.MAX_SAFE_INTEGER;
	// find which of the possible locations appears first in the title
	for (let loc of locations) {
		const index = window.location.href.indexOf(loc);
		if (index !== -1 && index < i) {
			location = loc;
			i = index;
			break; //for now there should only be one of the locations in the title
		}
	}
	let onHomePage = location == 'home';
	let filteredPosts = posts;
	function update() {
		console.log("update, ", filteredPosts)
		filteredPosts = [...filteredPosts]
	}

	function loadMore() {
		//TODO: subscribe to postsStore and request another x posts
		console.log('unimplemented load more posts for infinite scroller');
	}

	function checkScroll() {
		if (listElement.scrollTop + listElement.clientHeight >= listElement.scrollHeight) {
			loadMore();
		}
	}

</script>

<ContentSection
	id={location + '-content'}
	title={location.charAt(0).toUpperCase() + location.slice(1)}
	description=""
	align={'top'}
>
	<section id="search-bar">
		<svelte:component this={BlogCardSearchBar} posts={posts} bind:filteredPosts  on:change={update}/>
	</section>
	<section id="blog-posts">
		<ul bind:this={listElement} on:scroll={checkScroll}>
			{#each filteredPosts as post}
				<li>
					<BlogPostCard
						slug={post.slug}
						title={post.title}
						excerpt={post.excerpt}
						tags={post.tags}
						readingTime={post.readingTime}
						coverImage={post.coverImage}
						href_prefix={'/blog/' + location}
					/>
				</li>
			{/each}
		</ul>
	</section>
</ContentSection>

<style lang="scss">
	@import '../../scss/breakpoints.scss';

	ul {
		/* We need to limit the height and show a scrollbar */
		//width: 80%;
		height: 100%;
		overflow: auto;
		//z-index: 10;

		/* Optional, only to check that it works with margin/padding */
		//margin: 30px;
		//padding: 20px;
		//border: 10px solid black;
	}
</style>
