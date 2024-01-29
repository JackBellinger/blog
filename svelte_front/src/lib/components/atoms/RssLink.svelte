<script lang="ts">
	import RssIcon from '@assets/icons/rss.svelte';
	import { notifications } from '@lib/utils/notifications';
	import { GET_RSS } from '@lib/utils/rssGen';
	import { postStores } from '@lib/utils/store';
</script>

{#await postStores}
	<p>...checking for backend connectivity</p>
{:then postStores}
	<button on:click={() => notifications.warning('Not implemented!', 1000)} title="Subscribe to my RSS Feed">
		<RssIcon />
	</button>
{/await}

<!--<a href="/rss.xml" target="_blank" rel="noopener noreferrer" title="Subscribe to my RSS Feed">
	<RssIcon />
</a>-->

<style lang="scss">
	button {
		all: unset;
		padding: 0.5rem 0 0.5rem 0;
		transition: all 0.2s ease-in-out;
		width: 1.6rem;
		color: var(--color--text);

		&:hover {
			color: var(--color--primary);
			fill: var(--color--primary);
			filter: drop-shadow(0px 0px 3px var(--color--primary));
		}
	}
</style>
