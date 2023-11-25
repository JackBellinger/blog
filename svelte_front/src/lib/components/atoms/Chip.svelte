<script>
	let active = false;
	export let handler;
</script>

<button
	tabindex="0"
	aria-pressed="false"
	on:click={() => {
		handler();
		active = !active;
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
