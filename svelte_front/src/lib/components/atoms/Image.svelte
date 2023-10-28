<script lang="ts">
	export let src: string;
	let localImage = src[0] == '/';
	export let alt: string;
	export let fullBleed: boolean | undefined = undefined;

	export let formats: string[] = ['webp', 'png'];
	export let widths: string[] | undefined = undefined;

	$: fileName = src.split('.')[0];

	function buildSrcset() {
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
	<img
		srcset={buildSrcset()}
		{alt}
		loading="lazy"
		decoding="async"
		class:full-bleed={fullBleed}
	/>
{:else}
	<img srcset={src} {alt} loading="lazy" decoding="async" class:full-bleed={fullBleed} />
{/if}

<style lang="scss">
	img {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}
</style>
