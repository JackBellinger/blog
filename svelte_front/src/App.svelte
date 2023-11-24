<script lang="ts">
	import { description, image, keywords, title, siteBaseUrl } from '@lib/utils/meta.js';
	import Navaid from 'navaid';
	import { onDestroy } from 'svelte';
	import { getSession } from '@lib/fetchers/auth';
	import { onMount } from 'svelte';
	import '@lib/scss/global.scss';
	import type { Page, SyncReadable } from '@lib/utils/types';
	import { theme } from '@lib/utils/store';

	export let pageStore: SyncReadable = undefined;

	let savestore = false;
	$: if (savestore && $theme) {
		window.sessionStorage.setItem('store', JSON.stringify($theme));
	}
	onMount(() => {
		let ses = window.sessionStorage.getItem('store');
		if (ses) {
			//console.log("loading session", ses)
			$theme = JSON.parse(ses);
		}
		savestore = true;
	});

	const pages = pageStore.init;
	let showBackground = true;
	let currentPage = pages[0].module?.default;
	export let propParams = {};

	let baseUrl = '/blog/';

	function setPage(page: Page, params = {}) {
		//console.log("setting currentPage from ", currentPage.name, " to ", page, " with params: ", params)
		showBackground = !page.hidden;
		currentPage = page.module?.default;
		propParams = params;
		// window.scrollTo(0, 0);
	}
	// function setHiddenPage(page: Page, params = {}) {}

	// let uri = location.pathname;
	//function track(obj) {
	//	uri = obj.state || obj.uri || location.pathname;
	//	if (window.goog) ga.send('pageview', { dp:uri });
	//}

	//addEventListener('replacestate', track);
	//addEventListener('pushstate', track);
	//addEventListener('popstate', track);

	export let router = Navaid(baseUrl).on('/', () => setPage(pages[0]));
	//router.on("rss", (obj) => setPage(page))
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

<svelte:head>
	<link rel="canonical" href={siteBaseUrl} />
	<meta name="keywords" content={keywords.join(', ')} />

	<meta name="description" content={description} />
	<meta property="og:description" content={description} />
	<meta name="twitter:description" content={description} />

	<title>{title}</title>
	<meta property="og:title" content={title} />
	<meta name="twitter:title" content={title} />

	<meta property="og:image" content={image} />
	<meta name="twitter:image" content={image} />

	<meta name="twitter:card" content="summary_large_image" />
	<link rel="icon" type="image/x-icon" href="./assets/icons/mountain.ico" />
</svelte:head>

<svelte:component this={currentPage} {...propParams} />

<style>
</style>
