<script context="module" lang="ts">
	export const hidden = true;
	export const pagePriority = 0;
	export const subRoutes = [];
	export const routeParams = undefined;
</script>

<script lang="ts">
	import { description, siteBaseUrl, title } from '@lib/utils/meta';
	import type { BlogPost } from '@lib/utils/types';
	import dateformat from 'dateformat';
	import { postStores } from '@lib/utils/store';

	export const prerender = true;

	export function GET_RSS(posts: BlogPost[]) {
		const xml = rssXml(posts);
		const headers = {
			'Cache-Control': 'max-age=0, s-maxage=3600',
			'Content-Type': 'application/xml'
		};
		return btoa(xml); // Base64 encode the String
	}

	const rssXml = (posts: BlogPost[]) => `
	<rss version="2.0"
		xmlns:content="http://purl.org/rss/1.0/modules/content/"
		xmlns:wfw="http://wellformedweb.org/CommentAPI/"
		xmlns:dc="http://purl.org/dc/elements/1.1/"
		xmlns:atom="http://www.w3.org/2005/Atom"
		xmlns:sy="http://purl.org/rss/1.0/modules/syndication/"
		xmlns:slash="http://purl.org/rss/1.0/modules/slash/"
		xmlns:georss="http://www.georss.org/georss"
		xmlns:geo="http://www.w3.org/2003/01/geo/wgs84_pos#"
	>
	<channel>
		<atom:link href="${siteBaseUrl}/rss.xml" rel="self" type="application/rss+xml" />
		<title>${title}</title>
		<link>${siteBaseUrl}</link>
		<description>${description}</description>
		<image>
		<url>${siteBaseUrl}/favicons/favicon-32x32.png</url>
		<title>${title}</title>
		<link>${siteBaseUrl}</link>
		<width>32</width>
		<height>32</height>
		</image>
		${posts
			.map(
				(post) => `
			<item>
			<guid>${siteBaseUrl}/${post.slug}</guid>
			<title>${post.title}</title>
			<description>${post.excerpt}</description>
			<link>${siteBaseUrl}/${post.slug}</link>
			<pubDate>${dateformat(post.date, 'ddd, dd mmm yyyy HH:MM:ss o')}</pubDate>
			${post.tags ? post.tags.map((tag) => `<category>${tag}</category>`).join('') : ''}
			<content:encoded><![CDATA[
				<div style="margin: 50px 0; font-style: italic;">
				If anything looks wrong,
				<strong>
					<a href="${siteBaseUrl}/${post.slug}">
					read on the site!
					</a>
				</strong>
				</div>

				${post.component}
			]]></content:encoded>
			${
				post.coverImage
					? `<media:thumbnail xmlns:media="http://search.yahoo.com/mrss/" url="${siteBaseUrl}/${post.coverImage}"/>`
					: ''
			}
			${
				post.coverImage
					? `<media:content xmlns:media="http://search.yahoo.com/mrss/" medium="image" url="${siteBaseUrl}/${post.coverImage}"/>`
					: ''
			}
			</item>
		`
			)
			.join('')}
	</channel>
	</rss>`;
</script>

{#await postStores}
	<p>...checking for backend connectivity</p>
{:then postStores}
	{#await postStores.items.load()}
		<p>...parsing markdown</p>
	{:then posts}
		{rssXml(posts)}
	{:catch error}
		<p style="color: red">{error.message}</p>
	{/await}
{/await}
