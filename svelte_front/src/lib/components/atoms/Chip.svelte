<script>
	let active = false;
	export let handler;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<span
	on:click={() => {
		handler();
		active = !active;
	}}
	class:active
>
	<slot />
</span>

<style>
	span {
		color: black;
		background-color: var(--color--primary);
		border-color: var(--color--primary-tint);
		border-radius: 16px;
		padding: 6px 10px 6px 10px;
		margin: 4px;
		display: inline-flex;
		align-items: center;
		cursor: pointer;
		line-height: 20px;
		text-wrap:nowrap;
	}
	.active {
		color: white;
		background-color: var(--color--secondary);
		border-color: var(--color--secondary-tint);
	}
</style>
