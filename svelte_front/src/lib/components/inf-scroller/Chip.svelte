<script lang='ts'>
	let active = false;
	export let handler: (is_selected: boolean, ...args: any[]) => void; // Adjust type as needed
	export let value: any = undefined;
</script>

<button
	tabindex="0"
	aria-pressed="false"
	on:click={() => {
		active = !active;
		handler(active, value);
	}}
	class:active
>
	<slot />
</button>

<style>
	button {
		background-color: var(--color--primary);
		border-color: var(--color--primary-tint);
		border-radius: 16px;
		padding: 10px;
		line-height: 1rem;
		text-wrap: nowrap;
	}
	.active {
		background-color: var(--color--secondary);
		border-color: var(--color--secondary-tint);
	}
</style>
