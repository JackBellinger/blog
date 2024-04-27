import { defineMDSveXConfig as defineConfig } from 'mdsvex';
import remarkCodeTitles from 'remark-flexible-code-titles';
import remarkGfm from 'remark-gfm';
import stringWidth from 'string-width';

const config = defineConfig({
	extensions: ['.svelte.md', '.md', '.mdx'],

	smartypants: {
		dashes: 'oldschool'
	},

	//https://github.com/kevin940726/remark-codesandbox
	remarkPlugins: [
		[
			remarkCodeTitles,
			{
				//title: boolean, // optional, default is true
				//titleTagName: string, // optional, default is "div"
				//titleClassName: string, // optional, default is "remark-code-title"
				//titleProperties: (language?: string, title?: string) => Record<string, unknown>, // optional, default is undefined
				//container: boolean, // optional, default is true
				//containerTagName: string, // optional, default is "div"
				//containerClassName: "", // optional, default is "remark-code-container"
				//containerProperties: (language?: string, title?: string) => Record<string, unknown>, // optional, default is undefined
				//handleMissingLanguageAs: string, // optional, default is undefined
			}
		],
		[remarkGfm, { stringLength: stringWidth }]
	]
});

export default config;
