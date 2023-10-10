<script>
	import SparklingHighlight from '@lib/components/molecules/SparklingHighlight.svelte';
	import Image from '../atoms/Image.svelte';
</script>

<section id="about">
	<div class="info">
		- 🔭 I’m currently searching for a job in a fullstack or backend role.<br />
		<br />
		- 🌱 I’m currently learning **Svelte, Webassembly, & Machine learning**<br />
		<br />
		- 📝 I write articles on [jackbellinger.github.io/blog](jackbellinger.github.io/blog)<br />
		<br />
		- 📫 How to reach me **jdunnbellinger@gmail.com**<br />

		<!-- ### Blogs posts -->
		<!-- BLOG-POST-LIST:START -->
		<!-- BLOG-POST-LIST:END -->

		<!--
		<h3 >Connect with me:</h3>
		<p >
		<a href="https://discord.gg/invite" target="blank"><img  src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/discord.svg" alt="invite" height="30" width="40" /></a>
		<a href="/jackbellinger.github.io/blog/rss" target="blank"><img  src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/rss.svg" alt="jackbellinger.github.io/blog/rss" height="30" width="40" /></a>
		</p>
		-->

		<div class="langs">
			<h3>Languages and Tools:</h3>
			<p >
				<a href="https://aws.amazon.com" target="_blank" rel="noreferrer">
					<img
						src="https://raw.githubusercontent.com/devicons/devicon/master/icons/amazonwebservices/amazonwebservices-original-wordmark.svg"
						alt="aws"
						width="40"
						height="40"
					/>
				</a>
				<a href="https://azure.microsoft.com/en-in/" target="_blank" rel="noreferrer">
					<img
						src="https://www.vectorlogo.zone/logos/microsoft_azure/microsoft_azure-icon.svg"
						alt="azure"
						width="40"
						height="40"
					/>
				</a>
				<a href="https://cloud.google.com" target="_blank" rel="noreferrer">
					<img
						src="https://www.vectorlogo.zone/logos/google_cloud/google_cloud-icon.svg"
						alt="gcp"
						width="40"
						height="40"
					/>
				</a>
				<a href="https://www.java.com" target="_blank" rel="noreferrer">
					<img
						src="https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg"
						alt="java"
						width="40"
						height="40"
					/>
				</a>
				<a
					href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"
					target="_blank"
					rel="noreferrer"
				>
					<img
						src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg"
						alt="javascript"
						width="40"
						height="40"
					/>
				</a>
				<a href="https://www.python.org" target="_blank" rel="noreferrer">
					<img
						src="https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg"
						alt="python"
						width="40"
						height="40"
					/>
				</a>
				<a href="https://www.rust-lang.org" target="_blank" rel="noreferrer">
					<img
						src="https://raw.githubusercontent.com/devicons/devicon/master/icons/rust/rust-plain.svg"
						alt="rust"
						width="40"
						height="40"
					/>
				</a>
				<a href="https://svelte.dev" target="_blank" rel="noreferrer">
					<img
						src="https://upload.wikimedia.org/wikipedia/commons/1/1b/Svelte_Logo.svg"
						alt="svelte"
						width="40"
						height="40"
					/>
				</a>
			</p>
		</div>
		<p>
			<a href="https://github.com/ryo-ma/github-profile-trophy"
				><img
					src="https://github-profile-trophy.vercel.app/?username=jackbellinger&rank=-?"
					alt="jackbellinger"
				/></a
			>
		</p>
		<div class="stats">


			<p>
				<img
					src="https://github-readme-stats.vercel.app/api/top-langs?username=jackbellinger&show_icons=true&locale=en&layout=compact&hide=HTML,ShaderLab,ApacheConf,C%23,Shell"
					alt="jackbellinger"
				/>
			</p>

			<!--
			<p>&nbsp;<img  src="https://github-readme-stats.vercel.app/api?username=jackbellinger&show_icons=true&locale=en" alt="jackbellinger" /></p>
			-->

			<p>
				<img
					src="https://github-readme-streak-stats.herokuapp.com/?user=jackbellinger&"
					alt="jackbellinger"
				/>
			</p>
		</div>
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

			.langs {
				display:none;
				//display: flex;
				flex-direction: row;
				gap: .5em;
			}

			.stats {
				display: flex;
				flex-direction: row;
				gap: .5em;
			}
		}
	}
</style>
