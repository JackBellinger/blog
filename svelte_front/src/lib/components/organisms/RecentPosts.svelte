<script lang="ts">
	import BlogPostCard from '@lib/components/molecules/BlogPostCard.svelte';
	import ContentSection from '@lib/components/organisms/ContentSection.svelte';
	import type { BlogPost } from '@lib/utils/types';

	export let posts: BlogPost[];
	export let title: string;
	export let numToShow: number = undefined;
</script>

<ContentSection
				id={"recent-" + title}
				title={title}
				description="The {numToShow ? numToShow + ' most Recent ' : ''}{title.toLowerCase()} I've posted"
				align="left"
			>

	<div class="grid">
		{#each posts.slice(0, numToShow) as post}
			<BlogPostCard
				slug={post.slug}
				title={post.title}
				excerpt={post.excerpt}
				tags={post.tags}
				readingTime={post.readingTime}
				showImage={false}
				href_prefix={"/blog/" + title.toLowerCase()}
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
