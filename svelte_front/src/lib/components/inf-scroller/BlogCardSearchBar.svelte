<script lang="ts">
	import { isQueryStore, type BlogPost, type FilterableAsyncStore, type QueryStore } from '@lib/utils/types';
	import SearchTags from '../inf-scroller/SearchTags.svelte';
	import SearchTerm from '../inf-scroller/SearchTerm.svelte';
	import { createEventDispatcher, onMount } from 'svelte';
	import { queryTags } from '@lib/fetchers/posts';
	import Chip from '../inf-scroller/Chip.svelte';
	import { sessionStore } from '@lib/utils/store';

	export let store: FilterableAsyncStore | QueryStore;
	let searchTerm = '';

	async function getTags() {
		let tags;
		let session = await sessionStore.load();
		if (session.backend_connected) {
			tags = queryTags();
		} else {
			store.items.subscribe((posts) => {
				tags ? tags.clear() : (tags = new Set());
				posts.filter((post) => !post.hidden).forEach((post) => post.tags.forEach((tag) => tags.add(tag)));
			});
		}
		// console.log(tags)
		return tags;
	}

	let selectedTags: Set<string> = new Set();
	function selectTag(tag: string, is_selected: boolean) {
		// console.log("selecting? ", is_selected, " ", tag)
		const already_selected = selectedTags.has(tag);
		if (is_selected != already_selected) {
			is_selected ? selectedTags.add(tag) : selectedTags.delete(tag);
			// console.log("updating filter ", selectedTags)
			store.filter.update((filter) => ({
				...filter,
				selectedTags
			}));
			// if (isQueryStore(store)){
			// 	(store as QueryStore).filteredItems.load(); // Re-trigger download
			// }
		}
	}
	let selectTimeout = null;
	function debounceSelectTag(tag, is_selected) {
		clearTimeout(selectTimeout);
		selectTimeout = setTimeout(selectTag.bind(null, is_selected, tag), 250); // Adjust delay as needed
	}
	$: {
		store.filter.update((filter) => ({ ...filter, searchTerm: searchTerm }));
	}
	// store.filter.subscribe(filter => console.log(filter))
	//postStores.filteredItems.subscribe(x => console.log(x))
	//$: console.log("selected tags: ", selectedTags)
</script>

<section id="query-section">
	<SearchTerm bind:searchTerm />
	{#await getTags() then tags}
		{#each tags as tag}
			<Chip handler={debounceSelectTag} value={tag}>{tag}</Chip>
		{/each}
	{/await}
</section>

<style lang="scss">
	#query-section {
		max-width: min-content;
		display: flex;
		flex-direction: row;
		justify-content: left;
		align-items: left;
		/*padding: 10% 0;*/
	}
</style>
