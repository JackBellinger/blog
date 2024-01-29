import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import mdsvexConfig from './mdsvex.config.js';
mdsvex(mdsvexConfig);
import sveltePreprocess from 'svelte-preprocess';

export default {
	// svelte options
	extensions: ['.svelte', ...mdsvexConfig.extensions],
	compilerOptions: {
		accessors: process.env.TEST
	},
	onwarn: (warning, handler) => handler(warning),
	// plugin options
	vitePlugin: {
		exclude: [],
		// experimental options
		experimental: {}
	},
	// Consult https://svelte.dev/docs#compile-time-svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		//sveltePreprocess({
		//  //postcss: true
		//}),
		mdsvex(mdsvexConfig),
		vitePreprocess()
	]
};
