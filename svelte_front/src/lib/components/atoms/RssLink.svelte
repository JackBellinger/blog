<script lang="ts">
	import RssIcon from '@assets/icons/rss.svelte';
	import { notifications } from '@lib/utils/notifications';
	import { GET_RSS } from '@lib/utils/rssGen';
	import { postStores } from '@lib/utils/store';
</script>

{#await postStores.items.load()}
	<p>...parsing markdown</p>
{:then posts}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<!-- svelte-ignore a11y-missing-attribute -->
	<a
		on:click={() => notifications.warning('Not implemented!', 1000)}
		target="_blank"
		rel="noopener noreferrer"
		title="Subscribe to my RSS Feed"
	>
		<RssIcon />
	</a>
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}

<!--<a href="/rss.xml" target="_blank" rel="noopener noreferrer" title="Subscribe to my RSS Feed">
	<RssIcon />
</a>-->

<style lang="scss">
	a {
		transition: all 0.2s ease-in-out;
		width: 24px;
		color: var(--color--text);
		fill: var(--color--text);

		&:hover {
			color: var(--color--primary);
			fill: var(--color--primary);
			filter: drop-shadow(0px 0px 3px var(--color--primary));
		}
	}
</style>
