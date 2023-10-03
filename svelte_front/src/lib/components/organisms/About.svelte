<script>
	import SparklingHighlight from '@lib/components/molecules/SparklingHighlight.svelte';
	import Image from '../atoms/Image.svelte';
</script>

<section id="about">
	<div class="info">
		<h2>
			Background
		</h2>
		<p>
			I'm a backend engineer with 3 years of experience, mainly in Java, Python, & Rust. I am
			skilled in parallel and asynchronous programming in microservice clusters. I also utilize
			devops and reduce tech debt to implement continuous testing and deployment. I also strive to
			develop a deep understanding of my codebases and share that knowledge through well organized
			documentation. My code is enjoyable to read and refactor, and I ensure my team's change
			requests are similarly eloquent through collaborative and meticulous code reviews. In my
			previous roles at Amazon and Redjack, I was responsible for the design, development, and
			deployment of backend services that served thousands of users and petabytes of data.
		</p>
	</div>
</section>

<style lang="scss">
	@import '../../scss/breakpoints.scss';

	#about {
		position: relative;
		display: grid;
		//grid-template-columns: 500px 250px;
		align-items: center;
		justify-content: space-between;
		padding-bottom: 50px;

		@include for-phone-only {
			//grid-template-columns: 1fr;
			justify-items: center;
			gap: 20px;
		}

		.info {
			display: flex;
			flex-direction: column;
			gap: 10px;
			h2 {
				@include for-phone-only {
					text-align: center;
				}
			}

			p {
				@include for-phone-only {
					text-align: justify;
				}
			}

			@include for-phone-only {
				gap: 20px;
			}
		}
	}
</style>
