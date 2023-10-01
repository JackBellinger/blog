<script>
	import { onMount } from 'svelte';
	import { user } from '@lib/utils/store';
	import { getSecure } from '@lib/fetchers/fetch';

	let response;

	onMount(async () => {
		response = await getSecure();
	});
</script>

<div>
	<container class="wider mobile">
		<p>Logged in as {$user}</p>
		<p class="mono">Response: {response}</p>
	</container>
</div>

<style>
	div {
		margin: 25px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	@media only screen and (max-width: 620px) {
		container.mobile {
			width: 300px;
			word-wrap: break-word;
		}
	}
</style>
