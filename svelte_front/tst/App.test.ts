import { afterEach, assert, describe, expect, it, vi } from 'vitest'
import { pageStore } from '../src/lib/utils/store';
import App from '../src/App.svelte'
import { writable } from 'svelte/store';
// vi.stubEnv('TEST', 'true')
let app;


// // === LocalStorage Mock ===
// const localStorageMock = (() => {
// 	let store = {};

// 	return {
// 	getItem(key) {
// 		return store[key] || null;
// 	},
// 	setItem(key, value) {
// 		store[key] = value.toString();
// 	},
// 	removeItem(key) {
// 		delete store[key];
// 	},
// 	clear() {
// 		store = {};
// 	}
// 	};
// })();

// Object.defineProperty(window, 'sessionStorage', {
// 	value: localStorageMock
// });

// === Mock Pages ===

function getPages() {
	return [
		{
			name: "Home",
			id: "0",
			hidden: false,
			module: undefined,
			subpages: [],
			routeParam: undefined,
		},
		{
			name: "Page1",
			id: "1",
			hidden: false,
			module: undefined,
			subpages: [],
			routeParam: "param",
		},
		{
			name: "PageHidden",
			id: "2",
			hidden: true,
			module: undefined,
			subpages: [],
			routeParam: "",
		}

	];
}
function createPagesMock() {
	let pages = [];
	const { subscribe, set } = writable(pages);

	return {
		subscribe,
		init: getPages(),
		set: (value) => {
			set(value);
		}
	};
}
let pageStoreMock = createPagesMock();

// === App ===
app = new App({
	target: global.document.documentElement,
	props: {
		pageStore: pageStoreMock
	},
});

/* === Tests ===
	loading the app
		creates routes for all pages
		creates route params for all pages
		gets theme from savestore
	navigating to a page
		changes to the right url
		sets the correct page module
		passes route params
	*not implemented Check router makes subroutes
*/

describe('Loading the App', () => {
	afterEach(() => {
		vi.clearAllMocks();
		vi.resetAllMocks();
	})
	it('creates routes for all pages', () => {
		vi.doMock(pageStore.init, getPages)

		app.router.route("/blog/Home")
		expect(window.location.href).toMatch('/blog/Home')

		app.router.route("/blog/Page1")
		expect(window.location.href).toMatch('/blog/Page1')

		app.router.route("/blog/PageHidden")
		expect(window.location.href).toMatch('/blog/PageHidden')
	})

	it('passes route params', () => {
		vi.doMock(pageStore.init, getPages)

		app.router.route("/blog/Page1/paramValue")
		expect(app.propParams).toContain({param:"paramValue"})

	})
})
// describe('Navigating to a page', () => {
// 	afterEach(() => {
// 		vi.restoreAllMocks()
// 	})
// })