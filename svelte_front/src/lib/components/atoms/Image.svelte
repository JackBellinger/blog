<script lang="ts">
	export let src: string;
	let localImage = src[0] == '/';
	export let alt: string;
	export let widths: string[] | undefined = undefined;

	$: fileName = src.split(".");
	console.log(src, " ", fileName)
	//const imageModules = import.meta.glob(fileName);

	//for (const modulePath in imageModules) {
	//	imageModules[modulePath]().then(({ default: imageUrl }) => {
	//		console.log(modulePath, imageUrl);
	//	});
	//}
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
	  srcset={buildSrcset(['webp', 'png'])}
	  media="screen and (-ms-high-contrast: active), (-ms-high-contrast: none)"
	  width="1000"
	  height="400" />

	<img
	  src={src}
	  alt="the img used when the browser does not support the sources"
	  width="500"
	  height="400" />
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
