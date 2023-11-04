<script>
	import SparklingHighlight from '@lib/components/molecules/SparklingHighlight.svelte';
	import Image from '../atoms/Image.svelte';
</script>

<section id="about">
	<div class="info" style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
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
		<div class="langs" style="display: flex; align-items: center; flex-direction: row;">
			<img style="flex: 1 1 50%"
				src="https://github-readme-stats.vercel.app/api/top-langs?username=jackbellinger&show_icons=true&locale=en&layout=compact&hide=HTML,ShaderLab,ApacheConf,C%23,Shell"
				alt="most-used-languages"
			/>
			<div class="techs" style="display: flex; flex-direction: row; flex-wrap: wrap; flex: 1 1 50%">
				<a href="https://aws.amazon.com" target="_blank" rel="noreferrer" style="height: 5.3831rem; width: 5.3831rem;">
					<img
						src="https://raw.githubusercontent.com/devicons/devicon/master/icons/amazonwebservices/amazonwebservices-original-wordmark.svg"
						alt="aws"
					/>
				</a>
				<a href="https://azure.microsoft.com/en-in/" target="_blank" rel="noreferrer" style="height: 5.3831rem; width: 5.3831rem;">
					<img
						src="https://www.vectorlogo.zone/logos/microsoft_azure/microsoft_azure-icon.svg"
						alt="azure"
					/>
				</a>
				<a href="https://cloud.google.com" target="_blank" rel="noreferrer" style="height: 5.3831rem; width: 5.3831rem;">
					<img id="gcloud-img"
						src="https://www.vectorlogo.zone/logos/google_cloud/google_cloud-icon.svg"
						alt="gcp"
					/>
				</a>
				<a href="https://www.java.com" target="_blank" rel="noreferrer" style="height: 5.3831rem; width: 5.3831rem;">
					<img
						src="https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg"
						alt="java"
					/>
				</a>
				<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer" style="height: 5.3831rem; width: 5.3831rem;">
					<img
						src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg"
						alt="javascript"
					/>
				</a>
				<a href="https://www.python.org" target="_blank" rel="noreferrer" style="height: 5.3831rem; width: 5.3831rem;">
					<img
						src="https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg"
						alt="python"
					/>
				</a>
				<a href="https://www.rust-lang.org" target="_blank" rel="noreferrer" style="height: 5.3831rem; width: 5.3831rem;">
					<img
						src="https://raw.githubusercontent.com/devicons/devicon/master/icons/rust/rust-plain.svg"
						alt="rust"
					/>
				</a>
				<a href="https://svelte.dev" target="_blank" rel="noreferrer" style="height: 5rem; width: 5rem;">
					<img
						src="https://upload.wikimedia.org/wikipedia/commons/1/1b/Svelte_Logo.svg"
						alt="svelte"
					/>
				</a>
			</div>

		</div>

		<a href="https://github.com/ryo-ma/github-profile-trophy"
			><img src="https://github-profile-trophy.vercel.app/?username=jackbellinger&rank=-?,-A" alt="jackbellinger" /></a>
		<a href="https://github.com/Ashutosh00710/github-readme-activity-graph">
		<img src="https://github-readme-activity-graph.vercel.app/graph?username=JackBellinger&theme=green" alt="activity graph"></a>
		<p align="left"> <img src="https://komarev.com/ghpvc/?username=jackbellinger&label=Profile%20views&color=0e75b6&style=flat" alt="jackbellinger" /> </p>
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
			//grid-template-columns: 1fr;
			justify-items: center;
			gap: 20px;
		}

		.info {
			display: flex;
			flex-direction: column;

			gap: 10px;
			//h2 {
			//	@include for-phone-only {
			//		text-align: center;
			//	}
			//}

			p {
				@include for-phone-only {
					text-align: justify;
				}
			}

			@include for-phone-only {
				gap: 20px;
			}

			//.langs {
			//	display: none;
			//	//display: flex;
			//	flex-direction: row;
			//	gap: 0.5em;
			//}

			//.stats {
			//	display: flex;
			//	flex-direction: row;
			//	justify-content: center;
			//	gap: 0.5em;
			//}
		}
	}

	.techs {
		a {
			img {
				height: 5.3831em;
				width: 5.3831em;
			}
		}
	}
</style>
