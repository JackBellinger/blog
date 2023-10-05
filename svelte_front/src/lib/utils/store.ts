import { writable } from 'svelte/store';
import type { BlogPost, GithubIssue, Page } from '@lib/utils/types';
import { importPosts } from '@lib/fetchers/posts';
import { importPages } from '../fetchers/pages';
import { importProjects } from '../fetchers/projects';
//import { importIssuesAndBacklogTickets } from '@lib/fetchers/github';

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
function createAsyncStore() {
	const { subscribe, update, set } = writable([]);
	return {
		subscribe,
		set: (newList) => {
			return new Promise<void>((resolve) => {
				setTimeout(() => {
					set(newList);
					resolve();
				}, 500);
			});
		},
		update: () => {
			return new Promise<void>((resolve) => {
				setTimeout(() => {
					update((list) => [...list, { name: `restaurant${list.length + 1}` }]);
					resolve();
				}, 500);
			});
		},
		init: () => {
			return new Promise<void>((resolve) => {
				setTimeout(() => {
					set([{ name: 'restaurant1' }, { name: 'restaurant2' }]);
					resolve();
				}, 500);
			});
		}
	};
}

function createPosts() {
	let posts: BlogPost[];

	const { subscribe, set } = writable<BlogPost[]>(posts);

	return {
		subscribe,
		init: importPosts(true),
		set: (value: BlogPost[]) => {
			set(value);
		}
	};
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

//function createGithub() {
//	let issues: GithubIssue[];
//	const { subscribe, set } = writable<GithubIssue[]>(issues);

//	return {
//		subscribe,
//		init: importIssuesAndBacklogTickets("jackbellinger", "blog"),
//		set: (value: GithubIssue[]) => {
//			set(value);
//		}
//	};
//}

export const theme = createTheme();
export const user = writable('');

export const postStore = createPosts();
export const pageStore = createPages();
export const projectStore = createProjects();
//export const githubStore = createGithub();
