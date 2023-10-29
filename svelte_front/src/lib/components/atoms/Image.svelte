<script lang="ts">
	export let src: string;
	let localImage = src[0] == '/';
	export let alt: string;
	export let widths: string[] | undefined = undefined;

	$: fileName = src.split('.')[0];

	function buildSrcset(formats) {
		let srcset = '';

		if (widths) {
			for (let i = 0; i < widths.length; i++) {
				srcset += `${fileName}-${widths[i]}.${formats[0]} ${widths[i]}w`;

				if (i < widths.length - 1) {
					srcset += ', ';
				}
			}
		} else {
			for (let i = 0; i < formats.length; i++) {
				srcset += `${fileName}.${formats[i]}`;

				if (i < formats.length - 1) {
					srcset += ', ';
				}
			}
		}

		return srcset;
	}
</script>

{#if localImage}
	<picture>
		<source
			srcset={buildSrcset(['webp', 'avif', 'png'])}
			media="(min-width: 768px)"
			width="500"
			height="400"
		/>

		<img
			{src}
			alt="the img used when the browser does not support the sources"
			width="500"
			height="400"
		/>
	</picture>
{:else}
	<img srcset={src} {alt} loading="lazy" decoding="async" />
{/if}

<style lang="scss">
	img {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}
</style>
