<script lang="ts">
	import Chip from '@lib/components/atoms/Chip.svelte';

	export let tags: Set<string>;
	export let tagSerial = 0;
	const tagMap = new Map<string, number>();
	let index = 0;
	tags.forEach((tag) => tagMap.set(tag, index++));
	//function dec2bin(dec) {
	//	return (dec >>> 0).toString(2);
	//}
	function selectTag(tag: string) {
		let x = tagMap.get(tag);
		let selector = 1 << x;
		tagSerial = tagSerial ^ selector;
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
</style>
