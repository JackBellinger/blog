<script lang="ts">
	import { postComment } from '@lib/fetchers/comments';
	import type { Comment, Session } from '@lib/utils/types';
	import { sessionStore } from '@lib/utils/store';
	import { createEventDispatcher } from 'svelte';
	export let identifier = '';
	export let reply_to = 0;
	const dispatch = createEventDispatcher();
	let commentText = sessionStorage.getItem('commentText');
	const handleSubmit = async () => {
		// Send the comment data to the server
		const response = await sessionStore.load().then((session) => {
			console.log("Submitting comment, session is ", session)
			if(!session.logged_in) {
				sessionStorage.setItem('commentText', commentText)
				const currentUrl = new URL(window.location.href);
					const encodedUrl = encodeURIComponent(currentUrl.href);
					const navigate_to = `/login?next=${encodedUrl}`;
					// Redirect to login page
					window.location.href = navigate_to;
			} else {
				let newComment = {
					username: session.username,
					reply_to,
					timestamp: Date.now(),
					text: commentText
				};
				postComment(0, identifier, newComment )
				.then((response) => {
					if (response.ok){ 
						console.log('Comment submitted successfully!');
						dispatch('comment', newComment, { cancelable: true });
					}
					else {
						console.error('Error submitting comment. ', response.status, ': ', response.statusText);
					}
				});
			}
		});
	};
</script>

<div>
	<form on:submit|preventDefault={handleSubmit}>
		<label for="text">Comment:</label>
		<textarea id="text" bind:value={commentText}></textarea>

		<button type="submit">Submit Comment</button>
	</form>
</div>
