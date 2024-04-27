<script lang="ts">
	import ContentSection from '@lib/components/organisms/ContentSection.svelte';
	import { type BlogPost, type FilterableAsyncStore, type FilteredStore, type QueryStore } from '@lib/utils/types';
	import { postFetchMethod, blogApiParamsFromFilterAndPage, searchArticles } from '@lib/fetchers/posts';
	import BlogCardSearchBar from './BlogCardSearchBar.svelte';
	import type { ComponentType, SvelteComponent } from 'svelte';

	type GT = $$Generic;
	type itemType<T> = T & {
		hidden: boolean;
		slug: string;
	};
	export let displayProps: any;
	export let displayComponent: ComponentType<
		SvelteComponent<{ item: itemType<GT>; displayProps: typeof displayProps }>
	>;
	let querySource;
	let itemDownloader;

	export let store: QueryStore;
	// store.items.subscribe(fi => console.log("items: ", fi));
	// store.filter.subscribe(fi => console.log("filter: ", fi));
	// store.filteredItems.subscribe(fi => console.log("filtered: ", fi));
	// store.pagination.subscribe(pag => console.log("pagination ", pag));
	function loadMore() {
		console.log('querying for more articles');
		store.pagination.update(($pagination) => ({
			...$pagination,
			page: $pagination.page + 1
		}));
	}
	let filteredItems: itemType<GT>[] = [];
	store.filteredItems.subscribe((items) => {
		// Trigger a re-render when the store updates
		filteredItems = items ?? []; // Assuming `items` is a reactive declaration
	});

	let listElement;
	let previousScrollTop = 0;
	const loadThreshold = 50;
	let currentScrollTop = 0;
	function checkScroll() {
		currentScrollTop = listElement.scrollTop;
		// console.log("prev: ",previousScrollTop ,"current: ", currentScrollTop)
		if (
			currentScrollTop > previousScrollTop &&
			currentScrollTop + listElement.clientHeight + loadThreshold >= listElement.scrollHeight
		) {
			loadMore();
			listElement.scrollTop = currentScrollTop; // Restore scroll position
		}
		previousScrollTop = currentScrollTop;
	}
	let scrollTimeout = null;
	function debounce_scroll(func) {
		clearTimeout(scrollTimeout);
		scrollTimeout = setTimeout(checkScroll, 250); // Adjust delay as needed
	}
</script>

<ContentSection id={'infinite-scroller'} title={'Articles'} description="" align={'top'}>
	<section id="search-bar">
		<svelte:component this={BlogCardSearchBar} {store} />
	</section>
	<section id="blog-posts" bind:this={listElement} on:scroll={debounce_scroll}>
		<ul id="scroller">
			<!-- {console.log("items ", items)} -->
			{#each filteredItems.filter((item) => !item.hidden) as post (post.slug)}
				<li class="scroll-item">
					<svelte:component this={displayComponent} item={post} {displayProps} />
				</li>
			{/each}
		</ul>
	</section>
</ContentSection>

<style lang="scss">
	@import '../../scss/breakpoints.scss';
	//* { border: 1px solid black; }
	// ul {
	// 	li {
	// 		list-style: none;
	// 		margin: 10px 0;
	// 	}
	// 	/* We need to limit the height and show a scrollbar */
	// 	//width: 80%;
	// 	height: 100%;
	// 	overflow: auto;
	// 	//z-index: 10;

	// 	/* Optional, only to check that it works with margin/padding */
	// 	//margin: 30px;
	// 	//padding: 20px;
	// 	//border: 10px solid black;
	// }
	#search-bar {
		overflow-x: auto;
		width: 100%;
		//border: 2px solid red;
	}
	#blog-posts::-webkit-scrollbar {
		display: none;
	}
	#blog-posts {
		/* Hide scrollbar for IE, Edge and Firefox */
		-ms-overflow-style: none; /* IE and Edge */
		scrollbar-width: none; /* Firefox */

		// position: relative;
		max-height: 100vh;
		overflow-y: auto;
		overflow-x: visible;
		padding-top: 0.5em;
		max-width: 80%;
		margin: auto;
	}
	#scroller {
		list-style: none;
		display: flex;
		flex-direction: column; /* Arrange items vertically */
		justify-content: center; /* Center items horizontally */
		align-items: center; /* Center items vertically within each row (optional) */
		overflow-x: visible;
	}
</style>
