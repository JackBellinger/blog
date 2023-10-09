<svelte:options accessors />

<script context="module" lang="ts">
	export const pageNumber = 4;
	export const hidden = true;
	export const subRoutes = ['LogIn', 'ApiCheck', 'Admin', 'LogOut'];
	export const routeParam = 'user';
</script>

<script lang="ts">
	import { user } from '@lib/utils/store';
	import { getSession } from '@lib/fetchers/auth';
	import LogIn from '@lib/components/organisms/Login.svelte';
	import LogOut from '@lib/components/organisms/Logout.svelte';
	import Secure from '@lib/components/organisms/Secure.svelte';
	import Apicheck from '@lib/components/organisms/Apicheck.svelte';
	import { onMount } from 'svelte';

	$: loggedin = $user !== '';
	// check if logged in
	//onMount(getSession);
</script>

<main>
	{#if !loggedin}
		<LogIn />
	{:else}
		<Apicheck />
		<Secure />
		<LogOut />
	{/if}
</main>
