import { describe, expect, it } from 'vitest'
import { readdir } from 'fs/promises';
import {importPosts } from '../../../src/lib/fetchers/posts'

/* === Tests ===
	importing blog articles
		x imports all the pages
		x pages are imported with correct metadata (slug, assume the rest)
*/

describe('Importing blogs', () => {
	it('should find all posts & slug = filename', async () => {
		let path = "./assets/md/blogs"
		const post_slugs = (await importPosts()).map(post => post.slug).sort()
		let file_names;
		try {
			file_names = await (await readdir(path)).map(filename => filename.split('.')[0]).sort()
		} catch (err) {
			console.error(err);
		}
		expect(post_slugs).toMatchObject(file_names)
	})
})
