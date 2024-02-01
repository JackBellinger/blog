#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { compile } from 'svelte/compiler'; // Import the `compile` function
import * as mdsvex from 'mdsvex/dist/browser-umd.js';
import mdsvexConfig from '../mdsvex.config.js';

const mdDir = './dist/assets/md';
const outputDir = './dist/assets/md_html';

fs.readdirSync(mdDir)
	.filter(file => path.extname(file) === '.mdx')
	.forEach(async file => {
		const filePath = path.join(mdDir, file);
		const outputPath = path.join(outputDir, path.basename(file, '.mdx') + '.html');

		const source = fs.readFileSync(filePath, 'utf-8');

		try {
			console.log(`compiling ${file}:`)
			const compiled = await mdsvex.compile(source, mdsvexConfig);
			// console.log("compiling svelte from ", transformedCode)
			// const compiled = compile(transformedCode, {
			// 	generate: 'ssr', // Generate HTML for server-side rendering
			// 	//...other compiler options
			// });

			fs.mkdirSync(outputDir, { recursive: true }); // Create output directory if needed
			fs.writeFileSync(outputPath, compiled.code);
		} catch (error) {
			console.error(`Error processing ${file}:`, error);
			// Handle compilation errors as needed
		}
	});
