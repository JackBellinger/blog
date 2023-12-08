<script lang="ts">
	import { sessionStore } from '@lib/utils/store';
	const currentUrl = new URL(window.location.href);
	const encodedUrl = encodeURIComponent(currentUrl.href);
</script>

<div class="user-button">
	{#await sessionStore.load()}
		<p>...waiting for session query</p>
	{:then session}
		{#if session.logged_in}
			<p><a href="/comments/user/{session.username}">{session.username}</a></p>
			<p><a href="/logout?next={encodedUrl}">Log out</a></p>
		{:else}
			<p><a href="/login?next={encodedUrl}">Login/</a></p>
			<p><a href="/signup?next={encodedUrl}">SignUp</a></p>
		{/if}
	{:catch error}
		<p style="color: red">{error.message}</p>
	{/await}
</div>

<style lang="scss">
	.user-button {
		display: flex;
		flex-direction: column;
	}
</style>
