<script>
	import GitHubIcon from '@assets/icons/socials/github.svelte';
	import LinkedInIcon from '@assets/icons/socials/linkedin.svelte';
	import EmailIcon from '@assets/icons/socials/email.svelte';
	//import TelegramIcon from '@assets/icons/socials/telegram.svelte';
	//import RssIcon from '@assets/icons/rss.svelte';
	//import MastodonIcon from '@assets/icons/socials/mastodon.svelte';
</script>

<div class="socials">
	<!--<a
		href="#"
		target="_blank"
		rel="noopener noreferrer"
		title="Say Hi on Telegram"
	>
		<TelegramIcon />
	</a>
	<a
		href="#"
		target="_blank"
		rel="me noreferrer"
		title="Say Hi on Mastodon"
	>
		<MastodonIcon />
	</a>-->
	<a
		href="https://www.github.com/jackbellinger"
		target="_blank"
		rel="noopener noreferrer"
		title="See my GitHub profile"
	>
		<GitHubIcon />
	</a>
	<a
		href="https://www.linkedin.com/in/jack-bellinger-54b28987/"
		target="_blank"
		rel="noopener noreferrer"
		title="Connect on LinkedIn"
	>
		<LinkedInIcon />
	</a>
	<a
		href="mailto:jdunnbellinger@gmail.com"
		target="_blank"
		rel="noopener noreferrer"
		title="Send an email"
	>
		<EmailIcon />
	</a>
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
