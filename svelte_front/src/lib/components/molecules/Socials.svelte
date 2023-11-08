<script>
	import GitHub from '@assets/icons/socials/github.svelte';
	import LinkedIn from '@assets/icons/socials/linkedin.svelte';
	import Email from '@assets/icons/socials/email.svelte';
	import Discord from '@assets/icons/socials/discord.svelte';
	import RssLink from '../atoms/RssLink.svelte';
	//import Telegram from '@assets/icons/socials/telegram.svelte';
	//import Rss from '@assets/icons/rss.svelte';
	//import Mastodon from '@assets/icons/socials/mastodon.svelte';
</script>

<div class="socials">
	<!--<a
		href="#"
		target="_blank"
		rel="noopener noreferrer"
		title="Say Hi on Telegram"
	>
		<Telegram />
	</a>
	<a
		href="#"
		target="_blank"
		rel="me noreferrer"
		title="Say Hi on Mastodon"
	>
		<Mastodon />
	</a>-->
	<a
		href="https://www.github.com/jackbellinger"
		target="_blank"
		rel="noopener noreferrer"
		title="See my GitHub profile"
	>
		<GitHub />
	</a>
	<a
		href="https://www.linkedin.com/in/jack-b-54b28987/"
		target="_blank"
		rel="noopener noreferrer"
		title="Connect on LinkedIn"
	>
		<LinkedIn />
	</a>
	<a
		href="mailto:jdunnbellinger@gmail.com"
		target="_blank"
		rel="noopener noreferrer"
		title="Email me at jdunnbellinger@gmail.com"
	>
		<Email />
	</a>
	<a href="https://discord.gg/invite" target="blank">
		<Discord />
	</a>
	<!--<a
		href="/blog/rss"
		target="blank"
	>
		<RssLink/>
	</a>-->
</div>

<style lang="scss">
	@import '../../scss/breakpoints.scss';
	.socials {
		display: flex;
		align-items: center;
		gap: 20px;

		a {
			transition: all 0.2s ease-in-out;
			width: 24px;
			color: var(--color--text);
			fill: var(--color--text);

			&:hover {
				color: var(--color--primary);
				fill: var(--color--primary);
				filter: drop-shadow(0px 0px 3px var(--color--primary));
			}
		}
	}
</style>
