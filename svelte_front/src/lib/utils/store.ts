import { derived, get, readable, writable } from 'svelte/store';
import { importPosts } from '@lib/fetchers/posts';
import type { BlogPost, SyncReadable } from './types';
import { type Page } from '@lib/utils/types';
import { importPages } from '../fetchers/pages';
import { importProjects } from '../fetchers/projects';

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

const loadAll = async (stores) => {
	const loadPromises = stores.map((store) => {
		if (Object.prototype.hasOwnProperty.call(store, 'load')) {
			let x = store.load();
			//console.log("loaded: ", x)
			return x;
		} else {
			//console.log("no load, getting ", get(store))
			return get(store);
		}
	});
	const storeValues = await Promise.all(loadPromises);
	//console.log("store values: ", storeValues)
	return storeValues;
};

const loadableDerived = (stores, mappingFunction) => {
	const loadValue = async () => {
		//console.log("loading: ", stores, " with functiuon: ", mappingFunction)
		const parentValues = await loadAll(stores);
		let x = mappingFunction(parentValues);
		//console.log(x)
		return x;
	};
	const { subscribe } = derived(stores, mappingFunction);
	return {
		subscribe,
		load: loadValue
	};
};

const asyncReadable = (initial, loadFunction) => {
	let loadPromise;
	const loadValue = async (set, reload?) => {
		if (!loadPromise || reload) {
			loadPromise = loadFunction();
		}
		const storeValue = await loadPromise;
		set(storeValue);
		return storeValue;
	};
	const { subscribe, set } = writable(initial, (set) => {
		loadValue(set);
	});
	return {
		subscribe,
		load: () => loadValue(set),
		reload: () => loadValue(set, true)
	};
};

function createFilterableAsyncStore(itemInitializationFunction) {
	const items = asyncReadable([], itemInitializationFunction);
	const filter = writable({ searchTerm: '', selectedTags: new Set<string>() });
	const filteredItems = loadableDerived([items, filter], async ([$items, $filter]) => {
		let result = $items.filter((post) => {
			let title_match =
				$filter.searchTerm.length == 0 || post.title.toLowerCase().includes($filter.searchTerm.toLowerCase());

			let tag_match = $filter.selectedTags.size == 0 || post.tags.some((tag) => $filter.selectedTags.has(tag)); //.toLowerCase()));
			//console.log("post: ", post, "filtered by", filter, "is ", x&&y)
			return title_match && tag_match;
		});
		//console.log("filter result: ", result)
		return result;
	});

	let x = {
		items,
		filter,
		filteredItems
	};
	//console.log("type of ", Object.getPrototypeOf(x))
	return x;
}

function createProjects() {
	let projects: BlogPost[];

	const { subscribe, set } = writable<BlogPost[]>(projects);

	return {
		subscribe,
		init: importProjects(),
		set: (value: BlogPost[]) => {
			set(value);
		}
	};
}

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

export const postStores = createFilterableAsyncStore(importPosts);
export const pageStore: SyncReadable = createPages();
export const projectStores = createFilterableAsyncStore(importProjects);

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
