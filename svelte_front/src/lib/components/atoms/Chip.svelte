<script>
	let active = false;
	export let handler;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<span on:click={() => {handler(); active=!active}} class:active={active}>
	<slot/>
</span>

<style>
    span {
        color: black;
        background-color: #e0e0e0;
        border-color: #e0e0e0;
        border-radius: 16px;
        padding: 6px 10px 6px 10px;
        margin: 4px;
        cursor: pointer;
        line-height: 36px;
    }
    .active {
        color: white;
        background-color: #6200ea;
        border-color: #6200ea;
    }
</style>