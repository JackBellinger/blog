<script lang="ts">
	import CommentBox from '../molecules/Comment.svelte';
	import { CommentSource, type BlogPost, type Comment } from '@lib/utils/types';
	import { queryComments } from '@lib/fetchers/comments';
	import CommentForm from '../molecules/CommentForm.svelte';

	export let identifier: string = '0';
	export let source: CommentSource = CommentSource.Blog;
	let reply_to = 0;
	let comments: Comment[] = [];
	let importComments = async () => { await queryComments(source, identifier)
		.then(resp_comments => {
			comments = [...comments, ...resp_comments];
		});
	};
	function sortComments(comments: Comment[]): Comment[] {
		return comments.sort((a, b) => b.timestamp! - a.timestamp!);
	}
	importComments();
	const append_comment = (event) => {
		console.log("appending: ", event)
		comments = [...comments, event.detail];
	};
	$: comments, console.log("got new comments: ", comments)
</script>

<h2>Comments</h2>
<CommentForm {identifier} {reply_to} on:comment={append_comment} />
<ul class="comment-list">
	{#if comments}
		{#each sortComments(comments) as comment}
			<li>
				<CommentBox {comment} bind:reply_to />
			</li>
		{/each}
	{/if}
</ul>

<style>
	.comment-list {
		list-style: none;
	}
</style>
