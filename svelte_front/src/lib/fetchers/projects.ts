import type { BlogPost } from '@lib/utils/types';

export async function importProjects(render = true) {
	//https://vitejs.dev/guide/projects.html#glob-import
	const projectImports = import.meta.glob('@assets/*.mdx', { eager: true });

	const projects: BlogPost[] = [];
	for (const path in projectImports) {
		let filename = path.split('/').at(-1).split('.')[0];
		//console.log("aaa", filename)
		const project = projectImports[path] as any;
		console.log("proj: ", project)
		if (project) {
			projects.push({
				...project.metadata,
				slug: filename,
				tags: project.metadata.tags,//?.map((tag) => tag.toLowerCase()),
				//html: render && project.default.render ? project.default.render()?.html : undefined,
				component: project.default
			});
		}
	}
	let retProjs = sortAndRelateProjects(projects);
	//console.log('imported projects: ', retProjs);
	return retProjs;
}

export const filterHiddenProjects = (projects: BlogPost[]) => {
	return projects.filter((project) => !project.hidden);
};
export const sortAndRelateProjects = (projects: BlogPost[]) => {
	return projects
		.sort((a, b) =>
			new Date(a.updated ?? a.date).getTime() > new Date(b.updated ?? b.date).getTime()
				? -1
				: new Date(a.updated ?? a.date).getTime() < new Date(b.updated ?? b.date).getTime()
				  ? 1
				  : 0
		)
		.map((project) => {
			const relatedPosts = getRelatedPosts(projects, project);

			return {
				...project,
				relatedPosts: relatedPosts
			} as BlogPost;
		});
};

// #region Unexported Functions

const getRelatedPosts = (projects: BlogPost[], project: BlogPost) => {
	// Get the first 3 posts that have the highest number of tags in common
	const relatedPosts = projects
		.filter((p) => p.slug !== project.slug && !p.hidden)
		.sort((a, b) => {
			const aTags = a.tags?.filter((t) => project.tags?.includes(t));
			const bTags = b.tags?.filter((t) => project.tags?.includes(t));
			return aTags?.length > bTags?.length ? -1 : aTags?.length < bTags?.length ? 1 : 0;
		});

	return relatedPosts.slice(0, 3).map((p) => ({
		...p
	}));
};

// #endregion

//export async function importProjects(render = true) {
//  const blogImports = import.meta.glob("@assets/images/*", { eager: true });
//  //https://vitejs.dev/guide/projects.html#glob-import
//  //const images = import.meta.glob("@assets/images/*.mdx", { eager: true });
//  //const projects: Project[] = [];
//  for (const proj of projectDB) {
//    proj.imagePath = new URL(proj.imagePath, import.meta.url).href;
//  }
//  //projects.push()
//  console.log("imported projects: ", projectDB)
//  return projectDB;
//}

//export let projectDB: Project[] = [
//  {
//    name: 'Rapid Recap',
//    description:
//      'My most recent project was Rapid Recap at Amazon Prime video. When you join an Amazon Sports Event (for some properties) late, you will see an option to watch the Rapid Recap. It constructs a highlight reel in real time as significant moments happen in the stream! I built the data layer for moment metadata, and the computer vision platform for live stream state detection (intro / game start / post game / stream end).,',
//    imagePath: '/assets/images/RapidRecap.png',
//    link: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.amazon.science%2Fblog%2Fprime-videos-work-on-sports-field-registration-recap-intro-detection&psig=AOvVaw1z-5WJDsW6aLd7-dWzZK32&ust=1694226418173000&source=images&cd=vfe&opi=89978449&ved=0CBEQjhxqFwoTCNDAzrH7mYEDFQAAAAAdAAAAABAh',
//    tags: [{ label: 'Amazon' }]
//  },
//  {
//    name: 'Themeable',
//    description:
//      'You can easily theme the entire website by changing just a few colors in the _themes.scss file.',
//    imagePath: '/assets/images/Boulder.avif',
//    link: '',
//    tags: [{ label: 'Primary Color' }, { label: 'Secondary Color', color: 'secondary' }]
//  }
//];
