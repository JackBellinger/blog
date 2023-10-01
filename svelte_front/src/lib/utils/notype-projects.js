export default [
	{
		name: 'Rapid Recap',
		description:
			'My most recent project was Rapid Recap at Amazon Prime video. When you join an Amazon Sports Event (for some properties) late, you will see an option to watch the Rapid Recap. It constructs a highlight reel in real time as significant moments happen in the stream! I built the data layer for moment metadata, and the computer vision platform for live stream state detection (intro / game start / post game / stream end).,',
		image: '@assets/images/RapidRecap.png',
		link: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.amazon.science%2Fblog%2Fprime-videos-work-on-sports-field-registration-recap-intro-detection&psig=AOvVaw1z-5WJDsW6aLd7-dWzZK32&ust=1694226418173000&source=images&cd=vfe&opi=89978449&ved=0CBEQjhxqFwoTCNDAzrH7mYEDFQAAAAAdAAAAABAh',
		tags: [{ label: 'Amazon' }]
	},
	{
		name: 'Themeable',
		description:
			'You can easily theme the entire website by changing just a few colors in the _themes.scss file.',
		image: '@assets/images/features/themeable.jpg',
		link: '',
		tags: [{ label: 'Primary Color' }, { label: 'Secondary Color', color: 'secondary' }]
	},
	{
		name: 'Extensible',
		description:
			'Components are built to be reused, and you can build new pages and layouts without much CSS knowledge. You can see all components in Histoire by running "npm run story:dev"',
		image: '@assets/images/features/extensible.jpg',
		link: ''
	},
	{
		name: 'Well Optimized',
		description:
			'Images are automatically optimized and lazy loaded, to ensure the website loads as fast as possible regardless of connection speed.',
		image: '@assets/images/features/optimized.jpg',
		link: '',
		tags: [{ label: 'Powered by Image Transmutation' }]
	},
	{
		name: 'Light and Dark Modes',
		description:
			'This template was built with dark mode in mind. It can swap between themes automatically (based on system settings) or manually. Both themes can be tweaked in the _themes.scss file.',
		image: '@assets/images/features/light-dark.jpg',
		link: ''
	},
	{
		name: 'Open Source',
		description:
			"All code is open source, which means you can copy and modify it to your heart's content. All I ask is that you make your code open too so that knowledge can be passed on.",
		image: '@assets/images/features/open-source.jpg',
		link: ''
	}
];
