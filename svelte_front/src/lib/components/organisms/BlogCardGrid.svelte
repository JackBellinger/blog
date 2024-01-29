<script lang="ts">
	import BlogPostCard from '@lib/components/inf-scroller/BlogPostCard.svelte';
	import ContentSection from '@lib/components/organisms/ContentSection.svelte';
	import type { BlogPost } from '@lib/utils/types';
	import Button from '../atoms/Button.svelte';

	export let posts: BlogPost[] = [];
	export let title: string;
	let title_Lower = title.toLocaleLowerCase();
	export let numToShow: number = undefined;

	let locations = ['articles', 'projects'];
	let location = '';
	let i = Number.MAX_SAFE_INTEGER;
	// find which of the possible locations appears first in the title
	for (let loc of locations) {
		const index = title_Lower.indexOf(loc);
		if (index !== -1 && index < i) {
			location = loc;
			i = index;
			break; //for now there should only be one of the locations in the title
		}
	}
	//let onHomePage = title_Lower.startsWith("related")
	let onHomePage = window.location.href.split('/').splice(-1)[0] == 'blog';
	export let description = `The ${numToShow ? numToShow + ' most recent ' : ''}${title_Lower} I've posted`;
</script>

<ContentSection id={title_Lower.replaceAll(' ', '-')} {title} {description} align={'top'}>
	<svelte:fragment slot="button">
		{#if onHomePage}
			<Button href={'/blog/' + location}>View More</Button>
		{/if}
	</svelte:fragment>
	<div class="grid">
		{#each posts.slice(0, numToShow) as post}
			<BlogPostCard item={post} displayProps={{href_prefix: '/blog/articles'}}
			/>
		{/each}
	</div>
</ContentSection>

<style lang="scss">
	@import '../../scss/breakpoints.scss';

	.grid {
		width: 100%;
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-gap: 20px;

		@include for-phone-only {
			grid-template-columns: 1fr;
		}
	}
</style>
