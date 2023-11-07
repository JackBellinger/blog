<script lang="ts">
	export let searchTerm;
</script>

<input type="search" id="search-field" placeholder="Search" autocomplete="off" bind:value={searchTerm} />

<style>

	#search-field {
		/*width: 40%;*/
		min-width: 6em;
		max-height: 2em;
		font-size: 1.5rem;
		/*border: 1px solid gray;*/
		border-radius: 5px;
		padding: 8px 0px 0px 0px;
		margin: 0 0px 0px 0px;
	}
</style>
