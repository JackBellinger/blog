import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config.js';

export default mergeConfig(
	viteConfig,
	defineConfig({
		test: {
			environment: 'jsdom',
			include: ['./tst/**/*.test.([tj]s|svelte)'],
			exclude: ['**/node_modules/**', '**/dist/**', './packages/e2e-tests/**/*.*', './temp/**/*.*'],
			watchExclude: ['**/node_modules/**', '**/dist/**', './packages/e2e-tests/**/*.*', './temp/**/*.*'],
			testTimeout: 20000,
			reporters: 'dot',
			maxThreads: process.env.CI ? 1 : undefined,
			minThreads: process.env.CI ? 1 : undefined
		}
	})
);
