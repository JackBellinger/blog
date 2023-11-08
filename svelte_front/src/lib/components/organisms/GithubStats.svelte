<script>
	import SparklingHighlight from '@lib/components/molecules/SparklingHighlight.svelte';
	import Image from '../atoms/Image.svelte';
</script>

<section id="about">
	<div class="info">
		Check my Github for more details!
		<a href="https://github.com/ryo-ma/github-profile-trophy"
			><img src="https://github-profile-trophy.vercel.app/?username=jackbellinger&rank=-?,-A" alt="jackbellinger" /></a
		>
		<a href="https://github.com/Ashutosh00710/github-readme-activity-graph">
			<img
				src="https://github-readme-activity-graph.vercel.app/graph?username=JackBellinger&theme=minimal"
				alt="activity graph"
			/></a
		>
	</div>
</section>

<style lang="scss">
	@import '../../scss/breakpoints.scss';

	#about {
		position: relative;
		display: grid;
		//grid-template-columns: 500px 250px;

		justify-content: center;
		padding-bottom: 50px;

		@include for-phone-only {
			grid-template-columns: 1fr;
			justify-items: center;
			gap: 20px;
		}

		.info {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
		}
	}

	.techs {
		a {
			flex: 1 auto;
			img {
				height: 5.3831em;
				width: 5.3831em;
				//border: 2px solid green;
			}
		}
	}
</style>
