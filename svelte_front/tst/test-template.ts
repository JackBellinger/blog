import { writable } from 'svelte/store';
import { afterEach, describe, expect, it, vi } from 'vitest';

// === Mock Pages ===
const testPages = [
	{
		name: 'Home',
		id: '0',
		hidden: false,
		module: undefined,
		subpages: [],
		routeParam: undefined
	},
	{
		name: 'Page1',
		id: '1',
		hidden: false,
		module: undefined,
		subpages: [],
		routeParam: 'param'
	},
	{
		name: 'PageHidden',
		id: '2',
		hidden: true,
		module: undefined,
		subpages: [],
		routeParam: ''
	}
];
function getPages() {
	return testPages;
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

// === LocalStorage Mock ===
const localStorageMock = (() => {
	let store = {};

	return {
		getItem(key) {
			return store[key] || null;
		},
		setItem(key, value) {
			store[key] = value.toString();
		},
		removeItem(key) {
			delete store[key];
		},
		clear() {
			store = {};
		}
	};
})();

Object.defineProperty(window, 'sessionStorage', {
	value: localStorageMock
});
function getLatest(index = messages.items.length - 1) {
	return messages.items[index];
}

const messages = {
	items: [
		{ message: 'Simple test message', from: 'Testman' }
		// ...
	],
	getLatest // can also be a `getter or setter if supported`
};

describe('reading messages', () => {
	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('should get the latest message with a spy', () => {
		const spy = vi.spyOn(messages, 'getLatest');
		expect(spy.getMockName()).toEqual('getLatest');

		expect(messages.getLatest()).toEqual(messages.items[messages.items.length - 1]);

		expect(spy).toHaveBeenCalledTimes(1);

		spy.mockImplementationOnce(() => {
			return { message: 'access-restricted', from: '' };
		});
		expect(messages.getLatest()).toEqual('access-restricted');

		expect(spy).toHaveBeenCalledTimes(2);
	});

	it('should get with a mock', () => {
		const mock = vi.fn().mockImplementation(getLatest);

		expect(mock()).toEqual(messages.items[messages.items.length - 1]);
		expect(mock).toHaveBeenCalledTimes(1);

		mock.mockImplementationOnce(() => 'access-restricted');
		expect(mock()).toEqual('access-restricted');

		expect(mock).toHaveBeenCalledTimes(2);

		expect(mock()).toEqual(messages.items[messages.items.length - 1]);
		expect(mock).toHaveBeenCalledTimes(3);
	});
});
