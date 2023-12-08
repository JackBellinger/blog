<script lang="ts">
	import { type Comment } from '@lib/utils/types';
	import { getDurationSince } from '@lib/utils/time';
	import Callout from '../atoms/Callout.svelte';
	import Chip from '../atoms/Chip.svelte';
	import Button from '../atoms/Button.svelte';
	export let comment: Comment;
	export let reply_to = 0;
	let upvoted = false;
	let upvote = () => {
		comment.upvotes += upvoted ? 1 : -1;
	};
	let reply = () => {
		reply_to = comment.id;
	};
</script>

<div class="comment">
	<div class="username">
		{comment.username}:
		{#if comment.timestamp}{getDurationSince(comment.timestamp)} ago
		{/if}
	</div>
	<div id="second-line">
		<div id="upvote"><Chip handler={upvote}>👍</Chip></div>
		<div class="text">{comment.text}</div>
		<!-- <Button on:click={reply}>Reply</Button> -->
	</div>
</div>

<style lang="scss">
	// @import '../../scss/breakpoints.scss';
	#second-line {
		display: flex;
		flex-direction: row;

		#upvote {
			cursor: pointer; /* Indicate the button is clickable */
			transform: scale(0.8);
		}
	}
	.comment {
	}
	.text {
		padding-left: 1em;
	}
</style>
