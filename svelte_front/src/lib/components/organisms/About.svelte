<script>
	import SparklingHighlight from '@lib/components/molecules/SparklingHighlight.svelte';
	import Image from '../atoms/Image.svelte';
</script>

<section id="about">
	<div class="info">
		<h2>Background</h2>
		<p>
			I am a skilled and experienced backend engineer with 3 years of experience. I am proficient in
			Java, Python, Rust, and C++, and I have experience working on parallel and asynchronous code
			in microservice clusters. I always implement automated testing, CI/CD pipelines for my
			services, and take pride in detailed documentation. I strive to develop a deep understanding
			of my codebases and share that knowledge through well organized documentation. My code is
			enjoyable to read and refactor, and I ensure my team's change requests are similarly eloquent
			through collaborative and meticulous code reviews. I have honed my communication skills to be
			straightforward, eloquent, and friendly. I am a highly collaborative team player and I am
			always willing to go the extra mile. In my previous roles at Amazon and Redjack, I designed,
			developed, and deployed backend services that served thousands of users and petabytes of data.
			I have designed Java APIs in collaboration with partner teams and I have created Rust
			libraries to enable new growth.
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
