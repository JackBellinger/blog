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
				I enjoy working at many levels of computation, from optimizing thread-safety and memory usage to creating clear
				abstractions and concise business logic. I focus on automated testing, CI/CD pipelines, observability, and
			
detailed documentation. I strive to understand my codebases deeply and to share that knowledge through collaborative
				code reviews and process improvements.
			</p>
			<h2>Notable Projects</h2>
			<p>These projects highlight my experience in backend engineering, observability, data analytics, and full-stack development:</p>
			<ul style="margin-left: 4ch;">
				<li><a href="https://sbx.connectingforbetterhealth.com/" target="_blank" rel="noreferrer">EMI Advisor deliverable</a> — healthcare connectivity testing with React, Smile CDR, Neo4j, and AWS analytics.</li>
				<li><a href="https://www.amazon.com/gp/video/sports" target="_blank" rel="noreferrer">Amazon Sports Rapid Recap</a> — live recap and highlight feature for Prime Video.</li>
				<li><a href="https://jackbellinger.github.io/blog/articles/qmk-dynamic-macros" target="_blank" rel="noreferrer">Keyboard firmware macro system</a> — custom QMK macro tooling and technical documentation.</li>
				<li><a href="https://github.com/JackBellinger/420/tree/master/project2" target="_blank" rel="noreferrer">Arxiv Search Engine</a> — MPI keyword index and PageRank-powered research search.</li>
			</ul>
			<h2>Work</h2>
			<p>
				I have 6 years of experience working on production backend and full-stack systems. I currently build reliability
				and observability automation at Wells Fargo. My recent work includes enterprise-level dashboarding, standards
				compliance tracking, and process improvements across gitops, DevOps, and CI/CD.
			</p>

			<h3>Amazon</h3>
			<p>
				On Prime Video you can find my work detecting stream liveliness and providing highlight clips for live sports
				with Rapid Recap & Key Moments.
			</p>

			<h2>Projects</h2>
			<ul style="margin-left: 4ch;">
				<li><a href="https://sbx.connectingforbetterhealth.com/" target="_blank" rel="noreferrer">EMI Advisor deliverable</a> — healthcare org connectivity testing with React, Smile CDR, Neo4j, and AWS analytics.</li>

				<li><a href="https://www.amazon.com/gp/video/sports" target="_blank" rel="noreferrer">Amazon Sports Rapid Recap</a> — live sports recap and highlight feature for Prime Video.</li>
				<li><a href="https://github.com/JackBellinger/420/tree/master/project2" target="_blank" rel="noreferrer">Arxiv Search Engine</a> — MPI keyword index and PageRank-powered research search.</li>
			</ul>
			<br />
			For more details, check my blog articles, <a href="https://docs.google.com/document/d/1h_74e5nV6S24-XasDMH4FX9NCzJX_4DI/edit?usp=sharing&ouid=102482165353778313731&rtpof=true&sd=true" target="_blank" rel="noreferrer">resume</a>,
			or contact me with any questions.
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
