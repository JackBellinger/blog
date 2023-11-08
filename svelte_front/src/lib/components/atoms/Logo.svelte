<script lang="ts">
	export let animated = true;
	export let logoText: string = 'Hello World';
</script>

<div class="logo" class:animated style=" --num-characters: {logoText.length + 'ch'}">
	<svg id="logo-text" style="--num-characters: {logoText.length + 'ch'}" xmlns="http://www.w3.org/2000/svg">
		<text id="text" text-anchor="start" dominant-baseline="hanging" y="32%">
			<tspan>
				{logoText}
			</tspan>
		</text>
	</svg>
</div>

<style lang="scss">
	@import '../../scss/breakpoints.scss';

	.logo {
		width: var(--num-characters);
		height: 100%;
		//overflow:hidden;
		@include for-phone-only {
			gap: 8px;
		}
		//outline: #94a30c solid .1em;
		#logo-text {
			max-height: 100%;
			#text {
				//outline: #0fefff solid 0.01em;
				transition: all 0.2s ease-in-out;
				fill: var(--color--text);
			}
		}
	}

	@media screen and (prefers-reduced-motion: no-preference) {
		.animated {
			//#icon {
			//	> path {
			//		--text-color: var(--color--text-shade);
			//		stroke-width: 2;
			//		animation: svg-text-stroke 3s;
			//	}

			//	#darker {
			//		> path {
			//			--text-color: var(--color--text);
			//			stroke-width: 2;
			//			animation: svg-text-stroke 3s;
			//		}
			//	}
			//}

			#text {
				animation: svg-text-stroke 3s;
				stroke-width: 2;
				--text-color: var(--color--text);
			}
		}
	}
</style>
