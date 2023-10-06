<script lang="ts">
	import type { BlogPost } from "@lib/utils/types";
	import SearchTags from "../molecules/SearchTags.svelte";
	import SearchTerm from "../molecules/SearchTerm.svelte";
	import { createEventDispatcher } from "svelte";

	export let posts: BlogPost [];
	export let filteredPosts = posts;
	let searchTerm = "";
	let tags: Set<string> = new Set(posts.flatMap(post => post.tags));
	let selectedTags: Set<string> = new Set();
	const dispatch = createEventDispatcher()
	function searchPosts(e) {
		filteredPosts = posts.filter(post => {
			let x = (searchTerm.length>0? post.title.toLowerCase().includes(searchTerm.toLowerCase()) : true)
			&& (selectedTags.size>0? post.tags.some(tag => selectedTags.has(tag)) : true)
			console.log(x)
			return x
		});
		dispatch('change', {});
	}
</script>

<section id="query-section">
	<SearchTerm bind:searchTerm on:input={searchPosts} />
	<SearchTags {tags} bind:selectedTags on:change={searchPosts}/>
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