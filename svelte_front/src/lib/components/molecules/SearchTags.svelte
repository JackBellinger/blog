<script lang="ts">
	import Chip from "@lib/components/atoms/Chip.svelte";
	import { createEventDispatcher } from 'svelte';

	export let tags: Set<string>;
	export let selectedTags: Set<string> = new Set();
	const dispatch = createEventDispatcher()

	function selectTag(tag: string) {
		//console.log("selected: ", tag, this.classList)
		//this.classList.toggle('active');
		!selectedTags.has(tag) ? selectedTags.add(tag) : selectedTags.delete(tag)
		dispatch('change', {});
	}
</script>
<div>
	{#each tags as tag}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
		<Chip handler={() => selectTag(tag)}>{tag}</Chip>
	{/each}
</div>

<style>
	div {
		display: flex;
		flex-direction: row;
		margin: 0;
		font-size: 1.18rem;

	}
	Chip {
		background-color: blue;
	}
	.active {
		border: 1px solid rgb(199, 22, 22);
		border-radius: 0px;
		/*width: 100%*/
	}
</style>