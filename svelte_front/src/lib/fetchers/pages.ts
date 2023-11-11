import type { Page } from '@lib/utils/types';
import type { SvelteComponent } from 'svelte';
export const stringIsNumber = (value) => isNaN(Number(value)) === false;

export function importPages(render = true) {
	//https://vitejs.dev/guide/projects.html#glob-import\
	const pageImports = import.meta.glob('@/pages/*.svelte', { eager: true });
	//console.log(pageImports)
	let numPages = Object.keys(pageImports).length;
	const pages2d: Page[][] = new Array(numPages).fill(null).map(() => new Array());
	for (const path in pageImports) {
		const pageModule: any = pageImports[path];
		//console.log("imported ", page, "from ", path)
		if (pageModule) {
			let filename = path.replace(/^.*[\\\/]/, '').replace(/\.svelte$/, '');
			let pagePriority = pageModule.pagePriority ?? -1;
			pagePriority == -1 ? console.log("you should add a pagePriority to ", filename.toLowerCase()): null;
			pages2d[pagePriority].push({
				name: filename.toLowerCase(),
				id: pagePriority,
				hidden: pageModule.hidden,
				subpages: pageModule.subpages ?? [],
				routeParam: pageModule.routeParam ?? '',
				module: pageModule
			} as Page);
		}
	}
	let pages = pages2d.flat();
	console.log(
		'imported pages: ',
		pages
	);
	return pages;
}
