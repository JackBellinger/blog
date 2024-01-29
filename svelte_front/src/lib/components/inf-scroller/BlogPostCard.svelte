<script lang="ts">
	import Card from '@lib/components/inf-scroller/Card.svelte';
	import Tag from '@lib/components/inf-scroller/Tag.svelte';
	import Image from '../atoms/Image.svelte';
	import type { BlogPost } from '@lib/utils/types';
	export let item: BlogPost
	export let displayProps: {href_prefix: string};
	//	target="_self"
</script>
{@debug item}

<Card
	href={displayProps.href_prefix + '/' + item.slug}
	additionalClass="blog-item {item.coverImage}"
	imageUrl={item.coverImage}
>
	<div class={item.coverImage} slot="image">
		{#if item.coverImage}
			<Image src={item.coverImage} alt="Cover image of this blog item" />
		{/if}
	</div>
	<div slot="title">
		{item.title}
	</div>
	<div slot="body">
		{#if item.readingTime}
			<div class="note">{item.readingTime}</div>
		{/if}
		{#if item.excerpt}
			<p class="excerpt">
				{item.excerpt}
			</p>
		{/if}
	</div>
	<div class="footer" slot="footer">
		{#if item.tags?.length}
			<div class="tags">
				{#each item.tags.slice(0, 2) as tag, i}
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
	.image {
		width: 100%;
		height: auto;
		aspect-ratio: attr(width) / attr(height);
		object-fit: cover;
	}
</style>
