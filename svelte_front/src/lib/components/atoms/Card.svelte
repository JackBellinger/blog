<script lang="ts">
	import { HttpRegex } from '@lib/utils/regex';

	export let additionalClass: string | undefined = undefined;
	export let imageUrl: string = '';
	export let href: string | undefined = undefined;
	const isExternalLink = !!href && HttpRegex.test(href);
	//export let target: '_self' | '_blank' = isExternalLink ? '_blank' : '_self';
	export let rel = isExternalLink ? 'noopener noreferrer' : undefined;

	$: tag = href ? 'a' : 'article';
	$: linkProps = {
		href,
		//target,
		rel
	};
</script>

<svelte:element
	this={'div'}
	class="card {additionalClass}"
	style="--image-url: url({imageUrl});
		--card-text-color: rgb(255 255 255 / 0.85);"
>
	<svelte:element this={tag} {...linkProps}>
		<div class="image">
			<slot name="image" />
		</div>
		<div class="card-content">
			<div class="card-title">
				<slot name="title" />
			</div>
			<div class="card-body">
				<slot name="body" />
			</div>
			{#if $$slots.footer}
				<div class="card-footer">
					<slot name="footer" />
				</div>
			{/if}
		</div>
	</svelte:element>
</svelte:element>

<style lang="scss">
	@import '../../scss/_breakpoints.scss';
	// *{ border: 2px solid green;}
	.card {
		display: flex;
		flex-direction: column;
		// border: 2px solid black;
		color: var(--color-secondary);
		// background-image: var(--image-url);
		// background-size: cover;
		// background-position: center;
		// padding: 10rem 0 0;
		// max-width: 35ch;
		margin: auto;
		border-radius: 16px;
		overflow: hidden;
		position: relative;
		transition: transform 1000ms ease;
		.card-content {
			padding: 0.3rem 0.3rem 0.1rem 0.3rem;
		}
		a {
			overflow: hidden;
			color: var(--card-text-color);
			&:hover {
				text-decoration: none;
			}
		}
	}

	.card:hover,
	.card:focus-within {
		transform: scale(1.05);
	}

	.image {
		border-radius: 16px;
		// padding: 6px 10px 6px 10px;
		overflow: hidden;
		// position:absolute;
		// float:inline-start;
		// border: 2px solid green;
		z-index: 0;
		// position: relative;
		// flex: 1 0 max(50%, 330px);
		// height: min(100%, 200px);
		// height:min-content;
		// min-height: 280px;
		// max-height: 350px;
	}

	.card-content {
		width: 100%;
		// height: fit-content;
		position: absolute;
		// box-sizing: border-box;
		// // top: 100%;
		// z-index: 1;
		// border: 2px solid blue;
		// --padding: 1.5rem;
		// padding-top: var(--padding);
		// // overflow: hidden;
		background: linear-gradient(
			hsl(0 0% 0% / 0),
			hsl(10 0% 0% / 0.5) 4%,
			hsl(50 0% 0% / 0.7) 20%,
			hsl(0 0% 0% / 1) // hsl(var(--color--secondary-shade-hsla)),
			// hsl(var(--color--secondary-shade-hsla)) 10%,
			// hsl(var(--color--secondary-shade-hsla))
		);
	}

	.card-title {
		// border: 2px solid green;
		// position: relative;
		width: max-content;
	}

	.card-title::after {
		content: '';
		position: relative;
		height: 4px;
		left: calc(var(--padding) * -1);
		bottom: -2px;
		width: calc(100% + var(--padding));
		background: var(--color-primary);
		transform: scaleX(0);
		transform-origin: left;
		transition: transform 1000ms cubic-bezier(0.22, 0.61, 0.36, 1);
		transition-delay: 0.8s;
	}

	.card-body {
		width: fit-content;
		// border: 2px solid red;
		color: var(--card-text-color);
	}
	.card-footer {
		// border: 2px solid yellow;
		width: fit-content;
		// border: 2px solid red;
		color: var(--card-text-color);
	}

	@media (hover) {
		.card-content {
			// visibility: hidden;
			transition-delay: 0.8s;
			transform: translateY(-4ch);
			transition:
				visibility 1000ms,
				transform 1000ms cubic-bezier(0.22, 0.61, 0.36, 1);
		}
	}

	.card:hover .card-content,
	.card:focus-within .card-content {
		// visibility: visible;
		transform: translateY(-100%);
	}

	// .card:focus-within .card-content {
	// 	transition-duration: 1000ms cubic-bezier(0.22, 0.61, 0.36, 1);
	// }

	.card-content > *:not(.card-title) {
		opacity: 0;
		transition: opacity 1200ms cubic-bezier(0.22, 0.61, 0.36, 1);
	}

	.card:hover .card-content > *:not(.card-title),
	.card:focus-within .card-content > *:not(.card-title) {
		opacity: 1;
		transition-delay: 1200ms cubic-bezier(0.22, 0.61, 0.36, 1);
	}

	.card:hover .card-title::after,
	.card:focus-within .card-title::after {
		transform: scaleX(1);
	}

	.button {
		cursor: pointer;
		display: inline-block;
		text-decoration: none;
		color: var(--clr-neutral-900);
		background-color: var(--clr-accent-400);
		padding: 0.5em 1.25em;
		border-radius: 0.25em;
	}

	.button:hover,
	.button:focus {
		background-color: var(--clr-neutral-100);
	}

	@media (prefers-reduced-motion: reduce) {
		*,
		*::before,
		*::after {
			animation-duration: 0.01ms !important;
			animation-iteration-count: 1 !important;
			transition-duration: 0.01ms !important;
			scroll-behavior: auto !important;
			transition-delay: 0 !important;
		}
		.card:hover,
		.card:focus-within {
			transform: scale(1);
		}
		.card-content {
			display: inline-block;
			overflow: visible;
			transform: scale(1);
			visibility: visible;
			transform: translateY(-100%);
			max-width: fit-content;
		}

		.card:hover .card-content,
		.card:focus-within .card-content {
			visibility: visible;
		}

		.card:focus-within .card-content {
			transition-duration: 0ms;
		}

		.card-content > *:not(.card-title) {
			opacity: 1;
			transition: 0ms;
		}

		.card:hover .card-content > *:not(.card-title),
		.card:focus-within .card-content > *:not(.card-title) {
			opacity: 1;
			transition-delay: 1200ms ease;
		}

		.card:hover .card-title::after,
		.card:focus-within .card-title::after {
			transform: scaleX(1);
		}
	}

	@include for-phone-only {
		// .card {
		// 	max-width: 300px;
		// }

		.card-footer {
			display: none;
		}

		.card-title {
			font-size: 1rem;
		}

		.card-body {
			font-size: 0.75rem;
		}

		.card:hover {
			transform: scale(1);
		}

		.card-content .button {
			font-size: 0.75rem;
		}
		*,
		*::before,
		*::after {
			animation-duration: 0.01ms !important;
			animation-iteration-count: 1 !important;
			transition-duration: 0.01ms !important;
			scroll-behavior: auto !important;
			transition-delay: 0 !important;
		}
		.card:hover,
		.card:focus-within {
			transform: scale(1);
		}
		.card-content {
			display: inline-block;
			overflow: visible;
			transform: scale(1);
			visibility: visible;
			transform: translateY(-100%);
			width: 100%;
		}

		.card:hover .card-content,
		.card:focus-within .card-content {
			visibility: visible;
		}

		.card:focus-within .card-content {
			transition-duration: 0ms;
		}

		.card-content > *:not(.card-title) {
			opacity: 1;
			transition: 0ms;
		}

		.card:hover .card-content > *:not(.card-title),
		.card:focus-within .card-content > *:not(.card-title) {
			opacity: 1;
			transition-delay: 1200ms ease;
		}

		.card:hover .card-title::after,
		.card:focus-within .card-title::after {
			transform: scaleX(1);
		}
	}

	// .card {
	// 	background: var(--color--card-background);
	// 	box-shadow: var(--card-shadow);
	// 	color: var(--color--text);
	// 	border-radius: 10px;
	// 	transition: all 0.4s ease;
	// 	position: relative;
	// 	overflow: hidden;
	// 	width: 100%;

	// 	display: flex;
	// 	flex-direction: row;
	// 	flex-wrap: wrap;

	// 	text-decoration: none;

	// 	&[href],
	// 	&[onclick] {
	// 		cursor: pointer;
	// 		&:hover {
	// 			box-shadow: var(--card-shadow-hover);
	// 			transform: scale(1.01);
	// 		}
	// 	}
	// }

	// .body {
	// 	display: flex;
	// 	flex-direction: column;
	// 	justify-content: space-between;
	// 	gap: 10px;
	// 	padding: 20px 20px;
	// 	flex: 1 0 40%;

	// 	.content {
	// 		display: flex;
	// 		flex-direction: column;
	// 		flex: 1;
	// 	}
	// }

	// :global(.card [slot='image']) {
	// 	width: 100%;
	// 	height: 100%;
	// 	object-fit: cover;
	// 	position: absolute;
	// }
</style>
