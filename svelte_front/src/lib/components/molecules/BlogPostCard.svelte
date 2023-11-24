<script lang="ts">
	import Card from '@lib/components/atoms/Card.svelte';
	import Tag from '@lib/components/atoms/Tag.svelte';
	import Image from '../atoms/Image.svelte';

	export let slug: string;
	export let title: string;
	export let coverImage: string | undefined = undefined;
	export let excerpt: string;
	export let tags: string[] | undefined;
	export let readingTime: string | undefined = undefined;

	export let showImage = true;
	export let href_prefix: string;
	//	target="_self"
</script>

<Card
	href={href_prefix + '/' + slug}
	additionalClass="blog-post {showImage && coverImage ? '' : 'no-image'} {coverImage}"
	imageUrl={coverImage}
>
	<div class={coverImage} slot="image">
		{#if coverImage}
			<Image src={coverImage} alt="Cover image of this blog post" />
		{/if}
	</div>
	<div slot="card-title">
		{title}
	</div>
	<div slot="card-body">
		{#if readingTime}
			<div class="note">{readingTime}</div>
		{/if}
		{#if excerpt}
			<p class="excerpt">
				{excerpt}
			</p>
		{/if}
	</div>
	<div class="footer" slot="footer">
		{#if tags?.length}
			<div class="tags">
				{#each tags.slice(0, 2) as tag, i}
					<Tag color={i == 0 ? 'primary' : 'secondary'}>{tag}</Tag>
				{/each}
			</div>
		{/if}
	</div>
</Card>

<style lang="scss">
	.tags {
		display: inline-flex;
		flex-direction: row;
		overflow: hidden;
	}
</style>
