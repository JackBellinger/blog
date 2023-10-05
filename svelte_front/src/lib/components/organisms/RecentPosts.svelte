<script lang="ts">
	import BlogPostCard from '@lib/components/molecules/BlogPostCard.svelte';
	import ContentSection from '@lib/components/organisms/ContentSection.svelte';
	import type { BlogPost } from '@lib/utils/types';
	import Button from '../atoms/Button.svelte';

	export let posts: BlogPost[];
	export let title: string;
	let title_Lower = title.toLocaleLowerCase()
	export let numToShow: number = undefined;

	let locations = ["articles", "projects"]
	let location = ""
	let i = Number.MAX_SAFE_INTEGER;
	// find which of the possible locations appears first in the title
	for (let loc of locations) {
		const index = title_Lower.indexOf(loc);
		if (index !== -1 && index < i) {
			location = loc;
			i = index;
			break; //for now there should only be one of the locations in the title
		}
	};
	let isRelated = title_Lower.startsWith("related")
	let makeButton = !isRelated;
</script>

<ContentSection
	id={title_Lower.replaceAll(" ", "-")}
	title={title}
	description="The {numToShow ? numToShow + ' most recent ' : ''}{title_Lower} I've posted"
	align= {isRelated? "top" : "left"}
>
	<svelte:fragment slot="button">
		{#if makeButton}
			<Button href={"/blog/"+location}>View More</Button>
		{/if}
	</svelte:fragment>
	<div class="grid">
		{#each posts.slice(0, numToShow) as post}
			<BlogPostCard
				slug={post.slug}
				title={post.title}
				excerpt={post.excerpt}
				tags={post.tags}
				readingTime={post.readingTime}
				showImage={true}
				href_prefix={"/blog/" + location}
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
