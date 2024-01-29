import type { BlogPost, BlogSearch } from '@lib/utils/types';
import { sessionStore } from '@lib/utils/store';

export async function postFetchMethod() {
	return sessionStore.reload().then((session) => {
		console.log('user session: ', session);
		return session.backend_connected ? queryPosts : importPosts;
	});
}

export async function importPosts() {
	//https://vitejs.dev/guide/projects.html#glob-import
	const blogImports = import.meta.glob('@assets/md/**/*/*.mdx', { eager: true });

	const posts: BlogPost[] = [];
	for (const path in blogImports) {
		let filename = path.split('/').at(-1).split('.')[0];
		const post = blogImports[path] as any;
		if (post) {
			// console.log('Parsing: ', post, post.default);
			posts.push({
				...post.metadata,
				slug: filename,
				tags: post.metadata.tags, //?.map((tag) => tag.toLowerCase()),
				component: post.default
			});
		}
	}
	let retPosts = sortAndRelatePosts(posts);
	// console.log('statically imported posts: ', retPosts);
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

export function searchArticles(posts, search: { searchTerm: string; selectedTags: Set<string> }): BlogPost[] {
	let title = search.searchTerm;
	let selectedTags = search.selectedTags; //new Set([...search.selectedTags].reduce((p, c, n) => c.toLowerCase()));
	// console.log("searching for ", title, ", ", selectedTags)
	return posts
		.sort((a, b) =>
			new Date(a.updated ?? a.date).getTime() > new Date(b.updated ?? b.date).getTime()
				? -1
				: new Date(a.updated ?? a.date).getTime() < new Date(b.updated ?? b.date).getTime()
					? 1
					: 0
		)
		.filter((post) => {
			let title_match = (title ?? '').length == 0 || post.title.toLowerCase().includes(title.toLowerCase());
			// console.log("selected tags", selectedTags, " post: ", post.tags)
			let tag_match = selectedTags.size == 0 || post.tags?.some((tag) => selectedTags.has(tag));
			// console.log("post: ", post.slug, "matches: title =", title_match, "tags =", tag_match)
			return title_match && tag_match;
		});
}

// Import URLSearchParams for query string creation
// import { URLSearchParams } from 'url';

function serializeBlogSearch(searchParams: BlogSearch): string {
	console.log(searchParams);
	const params = new URLSearchParams();
	params.set('title', searchParams.title);
	params.set('tags', Array.from(searchParams.tags).map(encodeURIComponent).join(',')); // Join tags as comma-separated string
	params.set('page', String(searchParams.page));
	params.set('per_page', String(searchParams.per_page));
	return params.toString();
}
function _deserializeBlogs(queryString: string): BlogSearch {
	const params = new URLSearchParams(queryString);
	return {
		title: params.get('title') || '',
		tags: params.get('tags')?.split(',') || [],
		page: Number(params.get('page')) || 1, // Provide defaults if values are missing
		per_page: Number(params.get('per_page')) || 10
	};
}

//convert the filter and pagination stores into a BlogSearch api param object
export function blogApiParamsFromFilterAndPage(filter, pagination): BlogSearch {
	// console.log("convert to params ", filter, pagination)
	return {
		title: filter.searchTerm,
		tags: filter.selectedTags,
		page: pagination.page,
		per_page: pagination.per_page
	};
}

export async function queryPosts(
	blog_search: BlogSearch = {
		title: '',
		tags: [],
		page: 0,
		per_page: 10
	}
) {
	const queryString = serializeBlogSearch(blog_search);
	// fetch('/api/blogs?' + queryString) // Attach query string to API request
	// 	.then(response => response.json())
	// 	.then(data => {});

	let res = await fetch('/api/blogs?' + queryString, {
		// Attach query string to API request
		method: 'GET',
		credentials: 'same-origin'
	});
	// await console.log(res);
	const text = await res.text();
	// console.log("text", text)
	try {
		const blogs = JSON.parse(text);
		const blogsWithTagArrays = blogs.map((blog) => ({
			...blog, // Copy existing properties
			// component: undefined,
			tags: blog.tags.split(',') // Split tags into an array
		}));
		// console.log('blogs', blogsWithTagArrays);
		return blogsWithTagArrays;
	} catch (error) {
		console.error('Error parsing JSON:', error);
	}
	return [-1, 'Error parsing JSON:'];
}

export async function queryTags() {
	let res = await fetch('/api/tags', {
		// Attach query string to API request
		method: 'GET',
		credentials: 'same-origin'
	});
	// await console.log(res);
	const text = await res.text();
	// console.log("text", text)
	try {
		const tags_objects = JSON.parse(text);
		const tags = tags_objects.map((tag) => tag.name);
		// console.log('tags', tags);
		return tags;
	} catch (error) {
		console.error('Error parsing JSON:', error);
	}
	return [-1, 'Error parsing JSON:'];
}

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
