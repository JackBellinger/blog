import { describe, expect, it } from 'vitest';

import { postStores, projectStores } from '../../../src/lib/utils/store';
import { readdir } from 'fs/promises';

// === Posts ===
describe('Opening the post store', () => {
	it('should find all posts & slug = filename', async () => {
		let path = './assets/md/blogs';
		const post_slugs = (await postStores.items.load()).map((post) => post.slug).sort();
		let file_names;
		try {
			file_names = await (await readdir(path)).map((filename) => filename.split('.')[0]).sort();
		} catch (err) {
			console.error(err);
		}
		expect(post_slugs).toMatchObject(file_names);
	});
});

describe('Filtering the post store by each title', () => {
	it('should find the post in filteredItems', async () => {
		postStores.items.load().then((posts) =>
			posts.forEach(async (post) => {
				postStores.filter.set({ searchTerm: post.title, selectedTags: new Set() });
				await postStores.filteredItems.load().then((filteredItems) => {
					filteredItems.forEach((filteredPost) => {
						expect(filteredPost.title.includes(post.title));
					});
					expect(filteredItems).toContain(post);
				});
			})
		);
	});
});

describe('Filtering the post store by each tagset', () => {
	it('should produce only items with such tags', async () => {
		postStores.items.load().then((posts) =>
			posts.forEach(async (post) => {
				postStores.filter.set({ searchTerm: '', selectedTags: new Set(post.tags) });
				await postStores.filteredItems.load().then((filteredItems) => {
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

// === Projects ===

describe('Opening the project store', () => {
	it('should find all projects & slug = filename', async () => {
		let path = './assets/md/projects';
		const project_slugs = (await projectStores.items.load()).map((project) => project.slug).sort();
		// console.log("slugs", project_slugs)
		let file_names;
		try {
			file_names = await (await readdir(path)).map((filename) => filename.split('.')[0]).sort();
			// console.log("filenames", file_names)
		} catch (err) {
			console.error(err);
		}
		expect(project_slugs).toMatchObject(file_names);
	});
});

describe('Filtering the project store by each title', () => {
	it('should produce only one filtered item', async () => {
		projectStores.items.load().then((projects) =>
			projects.forEach(async (project) => {
				projectStores.filter.set({ searchTerm: project.title, selectedTags: new Set() });
				await projectStores.filteredItems.load().then((filteredItems) => {
					filteredItems.forEach((filteredProject) => {
						expect(filteredProject.title.includes(project.title));
					});
					expect(filteredItems).toContain(project);
				});
			})
		);
	});
});

describe('Filtering the project store by each tagset', () => {
	it('should produce only items with such tags', async () => {
		projectStores.items.load().then((projects) =>
			projects.forEach(async (project) => {
				console.log(project.title, ' has tags: ', project.tags);
				projectStores.filter.set({ searchTerm: '', selectedTags: new Set(project.tags) });

				await projectStores.filteredItems.load().then((filteredItems) => {
					filteredItems.forEach((filteredProject) => {
						// filter by tags shows all the posts which have at least one of the tags
						expect(project.tags.some((tag) => filteredProject.tags.includes(tag))).toBeTruthy();
					});
					expect(filteredItems).toContain(project);
				});
			})
		);
	});
});
