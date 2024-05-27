<script context="module" lang="ts">
	export const pagePriority = 1;
	export const hidden = false;
	export const subRoutes = [];
	export const routeParam = '';
</script>

<script lang="ts">
	import CodeBlock from '@lib/components/molecules/CodeBlock.svelte';
	import Hero from '@lib/components/organisms/Hero.svelte';
	import Page from '@lib/components/organisms/Page.svelte';
	import GithubStats from '@lib/components/organisms/GithubStats.svelte';
	// @ts-ignore: Cannot find module '@assets/md/aboutme.mdx'
	import Aboutme from '@assets/md/aboutme.mdx';
	// let aboutme = import.meta.glob('@assets/md/aboutme.mdx', { eager: true });
	// let aboutcodeblock = {
	// 	md: aboutme.metadata,
	// 	//html: render ? post.default.render()?.html : undefined,
	// 	module: aboutme
	// };
	// console.log(aboutcodeblock);
</script>

<Page>
	<div slot="left-sidebar" />
	<div slot="right-sidebar" />
	<main slot="main-content" class="center-container">
		<Hero>
			<h1 class="hello">About</h1>
		</Hero>

		<div id="swe-type">
			<Aboutme />
			<div id="skills">
				<div id="langs">
					<div id="blurb">
						<h2>Languages</h2>
						<p>
							I've put the most time into systems languages and I've only worked in backend roles, but I've enjoyed
							learning about many technologies!
						</p>
					</div>
					<img
						id="most-used"
						src="https://github-readme-stats.vercel.app/api/top-langs?username=jackbellinger&show_icons=true&locale=en&layout=compact&hide=HTML,ShaderLab,ApacheConf,C%23,Shell"
						alt="most-used-languages"
					/>
				</div>
			</div>
		</div>
		<GithubStats />
		<div id="info">
			<h1>Background</h1>
			<p>
				I enjoy working at many levels of computation, from optimizing thread-safety & memory usage to creating clear
				abstractions & consise business logic. I always implement automated testing, CI/CD pipelines for my services,
				and take pride in detailed documentation. I strive to develop a deep understanding of my codebases and share my
				knowledge. I ensure my team's change requests are similarly eloquent through collaborative and meticulous code
				reviews.
			</p>
			<h2>School</h2>
			<p>In school, some of the courses I most enjoyed are:</p>
			<ul style="margin-left: 4ch;">
				<li>High Performance Computing (paralellism & distributed cluster computing, github.com/jackbellinger/420)</li>
				<li>
					Numerical Linear Algebra (Numerical approaches to efficiently solving matrix maths,
					github.com/jackbellinger/420/matrix.py)
				</li>
				<li>
					Systems Software & Operating Systems (C programming & The inner workings of Operating Systems,
					github.com/jackbellinger/350 & ...450 )
				</li>
				<li>
					Datastructures and Algorithms (C++ programming of DS & Algos, soon to be moved to
					github.com/jackbellinger/cpp-structs & github.com/JackBellinger/Fast-and-Furious-Transformers)
				</li>
				<li>
					Computer vision research (github.com/jtanderson/wetland-object-detection,
					github.com/nilay036/DOG-Breed-Identifier)
				</li>
				<li>Hololens AR Matrix Math Visualizations (github.com/JackBellinger/Solids-of-Revolution-Visualizer)</li>
			</ul>
			<h2>Work</h2>
			<p>
				I have 4 years of experience working on production backend systems. I have contributed designs and
				implementations to a computer vision platform for live sports, a distributed data pipeline for backbone
				network security, GIS webapps and tools for the army, and I'm currently working on this .
			</p>

			<h3>Amazon</h3>
			<p>
				On Prime Video you can find my work detecting stream liveliness and providing highlight clips for live sports with Rapid Recap & Key Moments
			</p>
			<br />
			For More details, check my blog articles, resume, or contact me with any questions.
		</div>
	</main>
</Page>

<style lang="scss">
	@import '../lib/scss/_mixins.scss';
	@import '../lib/scss/breakpoints.scss';
	:global(.remark-code-container) {
		:global(code) {
			white-space: pre-wrap !important;
		}
	}
	main {
		position: relative;
		//display: grid;
		//grid-template-columns: 500px 250px;
		align-items: center;
		justify-content: space-between;
		padding-bottom: 50px;

		@include for-phone-only {
			//grid-template-columns: 1fr;
			justify-items: center;
			gap: 20px;
		}

		#swe-type {
			display: flex;
			flex-direction: row;

			#skills {
				padding-left: 0.5rem;
				flex: 1 1.5 70%;
				#langs {
					//max-width: fit-content;
					display: flex;
					align-items: stretch;
					flex-direction: row;
					justify-content: center;
					flex-wrap: wrap;
					#blurb {
						h2 {
							//flex: 1 1 auto;
							//padding-top: 1rem;
							text-align: center;
						}
						//width: 50%;
						flex: 1 2 40%;
						display: flex;
						flex-direction: column;
					}
					#most-used {
						flex: 2 1 60%;
					}
				}
			}
			@include for-phone-only {
				flex-direction: column;
			}
		}

		#info {
			display: flex;
			flex-direction: column;
			gap: 10px;
			h2 {
				@include for-phone-only {
					text-align: center;
				}
			}

			p {
				//margin-left: 4ch;
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
