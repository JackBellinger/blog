import type { Page } from '@lib/utils/types';
import type { SvelteComponent } from 'svelte';
export const stringIsNumber = (value) => isNaN(Number(value)) === false;

export function importPages(render = true) {
	//https://vitejs.dev/guide/projects.html#glob-import\
	const pageImports = import.meta.glob('@/pages/*.svelte', { eager: true });
	//console.log(pageImports)
	let numPages = Object.keys(pageImports).length;
	const pages: Page[] = new Array(numPages).fill(null);
	for (const path in pageImports) {
		const pageModule: any = pageImports[path];
		//console.log("imported ", page, "from ", path)
		if (pageModule) {
			let filename = path.replace(/^.*[\\\/]/, '').replace(/\.svelte$/, '');
			let pageNumber = pageModule.pageNumber ?? alert('Page imported with no pageNumber!');
			pages.splice(pageNumber, 1, {
				name: filename.toLowerCase(),
				id: pageNumber,
				module: pageModule,
				subpages: pageModule.subpages ?? [],
				routeParam: pageModule.routeParam ?? ''
			} as Page);
		}
	}
	console.log(
		'imported pages: ',
		pages.filter((n) => n)
	);
	return pages.filter((n) => n);
}
