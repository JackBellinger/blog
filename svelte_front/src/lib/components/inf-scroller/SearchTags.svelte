<script lang="ts">
	import Chip from '@lib/components/inf-scroller/Chip.svelte';

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

<div></div>

<style>
	div {
		display: flex;
		flex-direction: row;
		gap: 1px;
		align-items: center;
		vertical-align: middle;
	}
</style>
