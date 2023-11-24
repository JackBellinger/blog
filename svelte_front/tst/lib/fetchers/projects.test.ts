import { describe, expect, it } from 'vitest';
import { readdir } from 'fs/promises';
import { importProjects } from '../../../src/lib/fetchers/projects';

/* === Tests ===
	importing devlogs
		x imports all the projects
		x projects are imported with correct metadata (slug, assume the rest)
*/

describe('Importing projects', () => {
	it('should find all projects & slug = filename', async () => {
		let path = './assets/md/projects';
		const project_slugs = (await importProjects()).map((project) => project.slug).sort();
		let file_names;
		try {
			file_names = await (await readdir(path)).map((filename) => filename.split('.')[0]).sort();
		} catch (err) {
			console.error(err);
		}
		expect(project_slugs).toMatchObject(file_names);
	});
});
