import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { compile } from 'svelte/compiler';
import { mdsvex } from 'mdsvex';
import path from 'path';

const outputPluginStats = () => ({
	name: 'output-plugin-stats',
	configResolved(config) {
		const plugins = config.plugins.map((plugin) => plugin.name);
		console.log(`Your project has ${plugins.length} Vite plugins.`);
		console.table(plugins);
	}
});

const hotUpdateReport = () => ({
	name: 'hot-update-report',
	handleHotUpdate({ file, timestamp, modules }) {
		console.log(`${timestamp}: ${modules.length} module(s) updated`);
	}
});

// https://vitejs.dev/config/
/** @type {import('vite').UserConfig} */
export default {
	base: `blog`,
	build: {
		outDir: 'dist',
		assetsDir: 'assets'
	},
	resolve: {
		alias: {
			'@src': path.resolve(__dirname, './src'),
			'@lib': path.resolve(__dirname, './src/lib'),
			'@assets': path.resolve(__dirname, './assets'),
			'@utils': path.resolve(__dirname, './src/lib/utils')
		}
	},
	css: {
		preprocessorOptions: {
			scss: {
				//additionalData: '@use "./src/lib/scss/global.scss" as *;',
			}
		}
	},
	plugins: [outputPluginStats(), hotUpdateReport(), svelte({ configFile: 'svelte.config.js' })]
};
