<script>
	import SparklingHighlight from '@lib/components/molecules/SparklingHighlight.svelte';
	import Image from '../atoms/Image.svelte';
</script>

<section id="about">
	<div class="info">
		<h2>Background</h2>
		<p>
			I have 3 years of experience working on production backend systems. I have contributed designs
			and implementations to an asynchronous microservices architected realtime computer vision
			platform and a distributed data pipelines for backbone network security data processing. I
			enjoy working at many levels of computation, from optimizing system calls of hot paths to
			creating clear abstractions and consise business logic. I always implement automated testing,
			CI/CD pipelines for my services, and take pride in detailed documentation. I strive to develop
			a deep understanding of my codebases and share my knowledge. I ensure my team's change
			requests are similarly eloquent through collaborative and meticulous code reviews. My software
			is currently running in production: at Fortune 500 companies such as Walmart you can find my
			work creating visibility into internal network behaviors and architectures to keep customers
			safe; and at Amazon you can find my work detecting stream liveliness and generating highlight
			clips for live sports;
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