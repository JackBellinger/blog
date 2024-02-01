import { describe, expect, it } from 'vitest';

import { postStores } from '../../../src/lib/utils/store';
import { readdir } from 'fs/promises';

// === Posts ===
let postStore = await postStores
describe('Opening the post store', () => {
	it('should find all posts & slug = filename', async () => {
		let path = './assets/md/'
		postStore.items.subscribe(async (posts) => {
		const post_slugs = posts.map((post) => post.slug).sort();
		let file_names;
		try {
			file_names = await (await readdir(path)).map((filename) => filename.split('.')[0]).sort();
		} catch (err) {
			console.error(err);
		}
		expect(post_slugs).toMatchObject(file_names);
	})
	});
});

describe('Filtering the post store by each title', () => {
	it('should find the post in filteredItems', async () => {
		postStore.items.subscribe(async (posts) => {
			posts.forEach(async (post) => {
				postStore.filter.set({ searchTerm: post.title, selectedTags: new Set() });
				postStore.filteredItems.load().then((filteredItems) => {
					console.log("filtered by ", { searchTerm: post.title, selectedTags: new Set() }, filteredItems, "includes ", post)
					filteredItems.forEach((filteredPost) => {
						expect(filteredPost.title.includes(post.title));
					});
					expect(filteredItems).toContain(post);
				});
			})
		});
	});
});

describe('Filtering the post store by each tagset', () => {
	it('should produce only items with such tags', async () => {
		postStore.items.subscribe((posts) =>
			posts.forEach(async (post) => {
				postStore.filter.set({ searchTerm: '', selectedTags: new Set(post.tags) });
				await postStore.filteredItems.load().then((filteredItems) => {
					filteredItems.forEach((filteredPost) => {
						// filter by tags shows all the posts which have at least one of the tags
						expect(post.tags.some((tag) => filteredPost.tags.includes(tag))).toBeTruthy();
					});
					expect(filteredItems).toContain(post);
				});
			})
		);
	});
});