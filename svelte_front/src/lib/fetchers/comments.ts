import { CommentSource, type Comment, defComment } from '@lib/utils/types';

export async function queryComments(source: CommentSource, identifier: string) {
	switch (source) {
		case CommentSource.Blog:
			return queryBlogComments(identifier);
		case CommentSource.User:
			return queryUserComments(identifier);
	}
}

async function queryUserComments(username: string) {
	let res = await fetch(`/api/comments/user/${username}`, {
		method: 'GET',
		credentials: 'same-origin'
	});
	const text = await res.text();
	//console.log("text", text)
	try {
		const comments = JSON.parse(text);
		for (const comment of comments) {
			comment.timestamp = new Date(comment.timestamp);
		}
		//console.log("user#", username, ".comments = ",  comments);
		return comments;
	} catch (error) {
		console.error('Error parsing JSON:', error);
	}
	return [-1, 'Error parsing JSON:'];
}

// export async function importBlogComments(blog_slug: string) {
// 	let res = await fetch(`/comments/blog/${blog_slug}`, { method: 'GET', credentials: 'same-origin' })
// 	let blogPostsResponse = await res.body;
// 	console.log("res", blogPostsResponse)
// 	return JSON.stringify(blogPostsResponse);
// }

async function queryBlogComments(blog_slug: string): Promise<any> {
	//console.log("querying blog#", blog_slug)
	let res = await fetch(`/api/comments/blog/${blog_slug}`, {
		method: 'GET',
		credentials: 'same-origin'
	});
	const text = await res.text();
	//console.log("text", text)
	try {
		const comments = JSON.parse(text);
		for (const comment of comments) {
			comment.timestamp = new Date(comment.timestamp);
		}
		//console.log("blog#", blog_slug, ".comments = ",  comments);
		return comments;
	} catch (error) {
		console.error('Error parsing JSON:', error);
	}
	return [-1, 'Error parsing JSON:'];
}

export async function postComment(source: CommentSource, identifier: string, comment: Comment) {
	// Send the comment data to the server
	let blog_or_user = source == CommentSource.Blog ? 'blog' : source == CommentSource.User ? 'user' : 'unknown';
	const encodedData = Object.entries(defComment(comment))
		.map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
		.join('&');
	//console.log('posting ', encodedData);
	return fetch(`/api/comments/${blog_or_user}/${identifier}`, {
		method: 'POST',
		body: encodedData,
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	});
}
