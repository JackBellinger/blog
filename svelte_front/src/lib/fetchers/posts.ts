import type { BlogPost } from '@lib/utils/types';

export async function importPosts(render = true) {
	//https://vitejs.dev/guide/projects.html#glob-import
	const blogImports = import.meta.glob('@assets/md/blogs/*.svx', { eager: true });

	const posts: BlogPost[] = [];
	for (const path in blogImports) {
		let filename = path.split('/').at(-1).split('.')[0]
		const post = blogImports[path] as any;
		if (post) {
			// console.log("Parsing: ", post, post.default.current)
			posts.push({
				...post.metadata,
				slug: filename,
				tags: post.metadata.tags.map(tag => tag.toLowerCase()),
				//html: render ? post.default.render()?.html : undefined,
				module: post
			});
		}
	}
	let retPosts = sortAndRelatePosts(posts);
	console.log('imported posts: ', retPosts);
	return retPosts;
}

export const filterPosts = (posts: BlogPost[]) => {
	return posts.filter((post) => !post.hidden);
};
export const sortAndRelatePosts = (posts: BlogPost[]) => {
	return posts
		.sort((a, b) =>
			new Date(a.updated ?? a.date).getTime() > new Date(b.updated ?? b.date).getTime()
				? -1
				: new Date(a.updated ?? a.date).getTime() < new Date(b.updated ?? b.date).getTime()
				? 1
				: 0
		)
		.map((post) => {
			const relatedPosts = getRelatedPosts(posts, post);

			return {
				...post,
				relatedPosts: relatedPosts
			} as BlogPost;
		});
};

// #region Unexported Functions

const getRelatedPosts = (posts: BlogPost[], post: BlogPost) => {
	// Get the first 3 posts that have the highest number of tags in common
	const relatedPosts = posts
		.filter((p) => p.slug !== post.slug && !p.hidden)
		.sort((a, b) => {
			const aTags = a.tags?.filter((t) => post.tags?.includes(t));
			const bTags = b.tags?.filter((t) => post.tags?.includes(t));
			return aTags?.length > bTags?.length ? -1 : aTags?.length < bTags?.length ? 1 : 0;
		});

	return relatedPosts.slice(0, 3).map((p) => ({
		...p
	}));
};

// #endregion
