<script lang="ts">
	import BlogPostCard from '@lib/components/molecules/BlogPostCard.svelte';
	import ContentSection from '@lib/components/organisms/ContentSection.svelte';
	import type { BlogPost, FilterableAsyncStore, FilteredStore } from '@lib/utils/types';
	import Button from '@lib/components/atoms/Button.svelte';
	import SearchBar from '@lib/components/molecules/SearchTerm.svelte';
	import BlogCardSearchBar from './BlogCardSearchBar.svelte';

	export let store: FilterableAsyncStore;
	let filteredItems: FilteredStore = store.filteredItems
	let listElement;

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
	//let filteredPosts: BlogPost[] = [];
	//postStores.filteredItems.subscribe(newPosts => filteredPosts = newPosts);

	function update() {
		//console.log('update, ', filteredPosts);
		//filteredPosts = [...filteredPosts];
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
		<svelte:component this={BlogCardSearchBar} store={store}/>
	</section>
	<section id="blog-posts">
		<ul bind:this={listElement} on:scroll={checkScroll}>
			{#await $filteredItems}
				<p>...parsing markdown aaa</p>
			{:then items}
				<!--{console.log("fp ", $filteredItems)}-->
				{#each items as post}
					<!--{console.log("render new post")}-->
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
			{:catch error}
				<p style="color: red">{error.message}</p>
			{/await}
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
