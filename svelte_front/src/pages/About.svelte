<svelte:options accessors />

<script context="module" lang="ts">
	export const pageNumber = 1;
	export const hidden = false;
	export const subRoutes = [];
	export const routeParam = '';
</script>

<script lang="ts">
	import CodeBlock from '@lib/components/molecules/CodeBlock.svelte';

	import Hero from '@lib/components/organisms/Hero.svelte';
</script>

<div class="center-container">
	<main>
		<Hero>
			<h1 class="hello">About</h1>
			<CodeBlock filename={'A bit about me.json'} lang={''}>
				let Jack: Software Engineer = &#123;<br />
				<p>
					&emsp;&emsp;&emsp;years of experience: 3,<br />
					&emsp;&emsp;&emsp;platforms: [web, microservice clusters, federated],<br />
					&emsp;&emsp;&emsp;applications: [ML operations, data engineering, network security],<br />
					&emsp;&emsp;&emsp;domain knowledge: [live_streaming, port & behavior based host id],<br />
					&emsp;&emsp;&emsp;technical scope: [design & review, code, devops],<br />
					&emsp;&emsp;&emsp;leadership skills: [requirements spec, scoping, mentoring]
				</p>
				&#125;
			</CodeBlock>
		</Hero>
		<div class="info">
			<h2>Background</h2>
			<p>
				I have 3 years of experience working on production backend systems. I have contributed
				designs and implementations to a computer vision platform for live sports and a distributed
				data pipeline for backbone network security. <br /> I enjoy working at many levels of
				computation, from optimizing thread-safety & memory usage to creating clear abstractions &
				consise business logic. I always implement automated testing, CI/CD pipelines for my
				services, and take pride in detailed documentation. I strive to develop a deep understanding
				of my codebases and share my knowledge. I ensure my team's change requests are similarly
				eloquent through collaborative and meticulous code reviews. <br />My software is currently
				running in production: at Fortune 500 companies such as Walmart you can find my work
				creating visibility into internal network behaviors and architectures to keep customers
				safe; and at Amazon you can find my work detecting stream liveliness and generating
				highlight clips for live sports;
			</p>
		</div>
	</main>
</div>

<style lang="scss">
	@import '../lib/scss/_mixins.scss';
	@import '../lib/scss/breakpoints.scss';

	main {
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
