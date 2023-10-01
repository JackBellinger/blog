<script>
	import FeaturesIcon from '@assets/icons/features.svelte';
	import GitHubIcon from '@assets/icons/socials/github.svelte';
	import Doc from '@assets/icons/documents.svelte';
	import Download from '@assets/icons/download.svelte';
	import Button from '@lib/components/atoms/Button.svelte';
	import Sparkles from '../atoms/Sparkles.svelte';
	import Socials from '@lib/components/molecules/Socials.svelte';
</script>

<section id="hero">
	<h1 class="hello">Hello, I'm Jackson Bellinger</h1>
	<p class="intro">
		<span class="left">I'm a backend engineer.</span>
		<span class="right">Here's some of my work!</span>
	</p>
	<div class="ctas">
		<Sparkles>
			<Button href="https://github.com/jacksonbellinger/blog">
				<GitHubIcon slot="icon" />
				Blog Source
			</Button>
		</Sparkles>
		<Button
			color="primary"
			href="https://docs.google.com/document/d/1NU1iY8QP6OpdYCopQ8BjioCYXc-_vgpK/edit?usp=sharing&ouid=102482165353778313731&rtpof=true&sd=true"
		>
			<Doc slot="icon" />
			Resume
		</Button>
	</div>

	<div class="socials">
		<span>Socials:</span>
		<Socials />
	</div>
</section>

<style lang="scss">
	@import '../../scss/breakpoints.scss';

	#hero {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 15px;
		position: relative;
		padding: 80px 0;

		//@include for-phone-only {
		//	padding: 40px 0 50px;
		//}

		.hello {
			text-align: center;
		}

		.intro {
			font-weight: 500;
			font-size: 1.4rem;
			width: min(100%, 440px);
			display: flex;
			flex-direction: column;

			.left {
				text-align: left;
			}
			.right {
				text-align: right;
			}

			//@include for-phone-only {
			//	display: none;
			//}
		}

		.ctas {
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			justify-content: center;
			gap: 10px;
			width: 100%;
		}

		.socials {
			display: flex;
			align-items: center;
			gap: 15px;

			//@include for-phone-only {
			//	justify-content: center;
			//	margin-bottom: 10px;
			//	span {
			//		display: none;
			//	}
			//}
		}
	}
</style>
