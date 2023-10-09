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
	<slot/>
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

		.ctas {
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			justify-content: center;
			gap: 10px;
			width: 100%;
		}
	}
</style>
