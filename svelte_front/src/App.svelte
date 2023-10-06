<!--<script lang="ts">
	import { getSession } from '@lib/fetchers/auth';
	import { onMount } from 'svelte';
	import Header from '@lib/components/organisms/Header.svelte';
	import { pages } from '@lib/utils/store';
	import '@lib/scss/global.scss';

	let pageNumber: number = 0;

	const scrollIntoView = (node) => {
		node.scrollIntoView();
	};

	$: logoText = 'Menu';
	// check if logged in
	//onMount(getSession);
</script>

{#await pages.init}
	<p>...parsing markdown</p>
{:then parsedPages}
	<Header {logoText} bind:pageNumber />
	<div class="scroll-container">
		<svelte:component this={parsedPages[pageNumber].component.default} />
	</div>
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}
-->

<script lang="ts">
	import Navaid from 'navaid';
	import { onDestroy } from 'svelte';
	import { getSession } from '@lib/fetchers/auth';
	import { onMount } from 'svelte';
	import Header from '@lib/components/organisms/Header.svelte';
	import { pageStore } from '@lib/utils/store';
	import '@lib/scss/global.scss';
	import type { Page } from '@lib/utils/types';
	import Waves from '@lib/components/organisms/Waves.svelte';

	import { theme } from '@lib/utils/store';
	import Toast from '@lib/components/molecules/Toast.svelte';
	let savestore = false;
	$: if (savestore && $theme) {
		window.sessionStorage.setItem('store', JSON.stringify($theme));
	}
	onMount(async () => {
		let ses = window.sessionStorage.getItem('store');
		if (ses) {
			//console.log("loading session", ses)
			$theme = JSON.parse(ses);
		}
		savestore = true;
	});

	const pages = pageStore.init;
	let currentPage = pages[0].module.default;
	let propParams = {},
		active;
	let uri = location.pathname;
	let baseUrl = '/blog/';
	$: active = uri.split('/')[1] || 'home';
	$: logoText = 'Menu';

	function setPage(page: Page, params = {}) {
		//console.log("setting currentPage from ", currentPage.name, " to ", page, " with params: ", params)
		currentPage = page.module.default;
		propParams = params;
		window.scrollTo(0, 0);
	}

	//function track(obj) {
	//	uri = obj.state || obj.uri || location.pathname;
	//	if (window.goog) ga.send('pageview', { dp:uri });
	//}

	//addEventListener('replacestate', track);
	//addEventListener('pushstate', track);
	//addEventListener('popstate', track);

	const router = Navaid(baseUrl).on('/', () => setPage(pages[0]));
	for (let page of pages.slice(1)) {
		//console.log("on ", page.name, " route to ", page)
		router.on(page.name, (obj) => setPage(page));
		if (page.routeParam) {
			let srt = page.name + '/:' + page.routeParam;
			//console.log("on ", srt, " route to ", page, " + ")
			router.on(srt, (obj) => setPage(page, obj));
		}
		//for(let routeParam of page.routeParams) {
		//	router.on(page.name + ":" + routeParam, obj => setPage(page, obj))
		//}
	}
	router.listen();
	onDestroy(router.unlisten);
</script>

<Waves />
<Header {logoText} />
<Toast />
<div class="scroll-container">
	<svelte:component this={currentPage} {...propParams} />
</div>

<style>
</style>
