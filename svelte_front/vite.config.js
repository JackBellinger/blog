import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import path from 'path';

// https://vitejs.dev/config/
/** @type {import('vite').UserConfig} */
export default defineConfig({
	//base: `dist/`,
	build: {
		outDir: 'dist/blog',
		assetsDir: 'blog/assets'
	},
	plugins: [svelte({ configFile: 'svelte.config.js' })],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
			'@lib': path.resolve(__dirname, './src/lib'),
			'@assets': path.resolve(__dirname, './assets')
			//"@utils": path.resolve(__dirname, "./src/lib/utils"),
		}
	},
	css: {
		preprocessorOptions: {
			scss: {
				//additionalData: '@use "./src/lib/scss/global.scss" as *;',
			}
		}
	}
});
