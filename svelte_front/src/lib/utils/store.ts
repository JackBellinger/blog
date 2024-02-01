import { derived, get, readable, writable } from 'svelte/store';
import { asyncDerived, asyncReadable } from 'svelte-store';
import type { BlogPost, BlogSearch, SyncReadable, QueryStore, FilterableAsyncStore } from './types';
import { type Page } from '@lib/utils/types';
import { postFetchMethod, blogApiParamsFromFilterAndPage, searchArticles } from '@lib/fetchers/posts';
import { importPages } from '../fetchers/pages';
import { importProjects } from '../fetchers/projects';
import { fetchSession } from '@lib/fetchers/session';

function createTheme() {
	let currentTheme;
	if (typeof window !== 'undefined') {
		//if in browser
		currentTheme = localStorage.getItem('theme-preference') || 'auto';
	}

	const { subscribe, set } = writable<string>(currentTheme);

	return {
		subscribe,
		set: (value: string) => {
			if (typeof window !== 'undefined') {
				localStorage.setItem('theme-preference', value);
				document.firstElementChild?.setAttribute('data-theme', value);
			}
			set(value);
		}
	};
}

function createQueryStore(
	itemQueryFunction: (...args: any[]) => Promise<Array<any>>,
	storesToApiParams: (...args: any[]) => any
): QueryStore {
	const filter = writable({ searchTerm: '', selectedTags: new Set<string>() });
	const pagination = writable({ page: 0, per_page: 10 });
	const items = writable([]);
	const download = asyncDerived([filter, pagination], async ([$filter, $pagination]) => {
		// console.log("downloading")
		let query_params = storesToApiParams($filter, $pagination);
		let download = await itemQueryFunction(query_params);
		// console.log("downloaded items: ", download)
		if (download.length > 0) {
			items.update((items) => [...items, ...download.filter((dl) => items.every((ite) => ite.slug != dl.slug))]);
		}
		// else {
		// 	pagination.update((pag) => ({page: pag.page-1, per_page: pag.per_page}))
		// }
		return download;
	});
	pagination.subscribe((pag) => download.load());
	const filteredItems = asyncDerived(
		[items, filter],
		async ([$items, $filter]) => {
			// console.log("filtering ", $items, $filter)
			let searched = searchArticles($items, $filter);
			// console.log("there are ", searched.filter(post => !post.hidden).length, " !hidden posts")
			return searched;
		},
		{ reloadable: true }
	);
	items.subscribe((ite) => filteredItems.reload());
	filter.subscribe((filt) => {
		filteredItems.reload();
	});

	let stores = {
		filter,
		pagination,
		items,
		download,
		filteredItems
	};
	return stores;
}

// function createFilterableAsyncStore(itemInitializationFunction): FilterableAsyncStore {
// 	const items = writable([], itemInitializationFunction);
// 	const filter = writable({ searchTerm: '', selectedTags: new Set<string>() });
// 	const filteredItems = asyncDerived([items, filter], async ([$items, $filter]) => {
// 		console.log("downloading bleh items")
// 		let result = $items.filter((post) => {
// 			let title_match =
// 				$filter.searchTerm.length == 0 || post.title.toLowerCase().includes($filter.searchTerm.toLowerCase());

// 			let tag_match = $filter.selectedTags.size == 0 || (post.tags && post.tags.some((tag) => $filter.selectedTags.has(tag))); //.toLowerCase()));
// 			//console.log("post: ", post, "filtered by", filter, "is ", x&&y)
// 			return title_match && tag_match;
// 		});
// 		console.log("filter result: ", result)
// 		return result;
// 	}, { reloadable: true });

// 	let x = {
// 		items,
// 		filter,
// 		filteredItems
// 	};
// 	//console.log("type of ", Object.getPrototypeOf(x))
// 	return x;
// }

function createPages() {
	let pages: Page[];
	const { subscribe, set } = writable<Page[]>(pages);

	return {
		subscribe,
		init: importPages(true),
		set: (value: Page[]) => {
			set(value);
		}
	};
}

export const theme = createTheme();
export const user = writable('');

export const sessionStore = asyncReadable(
	{ backend_connected: false, logged_in: false, username: null },
	fetchSession,
	{ reloadable: true }
);
// export const postStores = createFilterableAsyncStore(importPosts);
export const postStores = postFetchMethod().then((postFetchFunc) =>
	createQueryStore(postFetchFunc, blogApiParamsFromFilterAndPage)
);

export const pageStore: SyncReadable = createPages();
// export const projectStores = createFilterableAsyncStore(importProjects);
//return {
//	subscribe,
//	set: (newList) => {
//		return new Promise<void>((resolve) => {
//			setTimeout(() => {
//				set(newList);
//				resolve();
//			}, 500);
//		});
//	},
//	update: () => {
//		return new Promise<void>((resolve) => {
//			setTimeout(() => {
//				update((list) => [...list, { name: `restaurant${list.length + 1}` }]);
//				resolve();
//			}, 500);
//		});
//	},
//	init: () => {
//		return new Promise<void>((resolve) => {
//			setTimeout(() => {
//				set([{ name: 'restaurant1' }, { name: 'restaurant2' }]);
//				resolve();
//			}, 500);
//		});
//	}
//};
