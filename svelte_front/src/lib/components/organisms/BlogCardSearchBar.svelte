<script lang="ts">
	import type { BlogPost, FilterableAsyncStore } from '@lib/utils/types';
	import SearchTags from '../molecules/SearchTags.svelte';
	import SearchTerm from '../molecules/SearchTerm.svelte';
	import { createEventDispatcher } from 'svelte';

	export let store: FilterableAsyncStore;
	let searchTerm = '';
	let tags: Set<string> = new Set();

	//TODO: update to Svelte 5 to react to object element changes
	//set up some bit twiddling set serialization because svelte doesn't react to set element changes
	const tagMap = new Map<number, string>();
	store.items.subscribe((posts) =>
	{
		tags.clear();
		posts.forEach(
			(post) => post.tags.forEach(
				tag => tags.add(tag.toLowerCase())
			)
		)
		let index=0;
		tags.forEach(tag => {console.log("setting", index, " = ", tag); tagMap.set(index++, tag)})
	})

	const selected_to_set = (n) => {
		let tagSet = new Set<string>();
		for (let i = 0; i < 32; i++) {
			if ((n & (1 << i)) !== 0) {
				console.log("selecting ", i, " = ", tagMap.get(i))
				tagSet.add(tagMap.get(i))
			}
		}
		return tagSet
	}

	//function debounce<A, R>(fn: (args: A) => R, delay: number): (args: A) => Promise<R> {
	//	let timer: NodeJS.Timeout;
	//	return (args: A): Promise<R> => {
	//		return new Promise((resolve) => {
	//		if (timer) {
	//			clearTimeout(timer);
	//		}
	//		timer = setTimeout(() => {
	//			resolve(fn(args));
	//		}, delay);
	//		});
	//	};
	//}

	//function deser(num) {
	//	let debounced = debounce(selected_to_set, 300)
	//	debounced(num).then( result => {
	//		selectedTags = result
	//	})
	//}

	let tagSerial: number = 0;
	//$: deser(tagSerial)
	//let selectedTags: Set<string>;
	$: {store.filter.set({searchTerm, selectedTags: selected_to_set(tagSerial)} ) }
	//postStores.filter.subscribe(filter => console.log(filter))
	//postStores.filteredItems.subscribe(x => console.log(x))
	//$: console.log("selected tags: ", selectedTags)
</script>

<section id="query-section">
	<SearchTerm bind:searchTerm/>
	<!--{console.log("tags", tags)}-->
	<SearchTags {tags} bind:tagSerial/>
</section>

<style>
	#query-section {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		/*padding: 10% 0;*/
	}
</style>
