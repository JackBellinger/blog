<script lang="ts">
	import { type Page } from '@lib/utils/types';
	import Logo from '../atoms/Logo.svelte';

	export let menuItems: Page[];
	export let logoText = 'Site Logo';
</script>

<div class="nav_menu">
	<a class="dropdown" href="/blog">
		<Logo {logoText} />
	</a>

	<ul class="dropdown-content" style="tabIndex='0'">
		<li>&gt;cd</li>
		{#each menuItems.filter((page) => page.id != 0 && !page.hidden) as page}
			<li>
				<a href="/blog/{page.name}">{page.name}</a>
			</li>
		{/each}
	</ul>
</div>

<style lang="scss">
	@import '../../scss/breakpoints.scss';

	.nav_menu {
		display: flex;
		flex: 0 2 1;
		flex-wrap: wrap;
		:global(a) {
			text-decoration: none;
		}
		max-height: 100%;
		-webkit-transition: all 0.3s ease-in-out;
		-moz-transition: all 0.3s ease-in-out;
		-o-transition: all 0.3s ease-in-out;
		transition: all 0.03s ease-in-out;
		//outline: #179943 solid .1em;
	}

	.dropdown {
		height: 100%;
		//outline: #000000 solid 0.1em;
		&:hover {
			color: var(--color--primary);
			filter: drop-shadow(0px 0px 3px var(--color--primary));
		}
	}
	.dropdown-content {
		display: flex;
		gap: 0.5rem;
		flex: wrap;
		margin: 0px 0.3em;
		//to enable dropdown shrinking
		// width: 0;
		//flex: 0 1 0;
		//else,
		width: 100%;
		flex: 1 1 0;

		overflow: hidden;
		-webkit-transition: all 0.3s ease-in-out;
		-moz-transition: all 0.3s ease-in-out;
		-o-transition: all 0.3s ease-in-out;
		transition: all 0.3s ease-in-out;
		li {
			align-items: center;
			vertical-align: middle;
			margin: 0;
			padding: 0.1em;
			list-style: none;
			display: inline-flex;
			// a {
			// 	&:hover {
			// 		color: var(--color--primary);
			// 		filter: drop-shadow(0px 0px 3px var(--color--primary));
			// 	}
			// }
		}
		//outline: #2ba0ce solid 0.1em;
		//background-color: rgba(98, 98, 98, 1);
	}
	.nav_menu:hover .dropdown-content,
	.nav_menu:focus-within .dropdown-content {
		width: max-content;
		-webkit-transition: all 0.3s ease-in-out;
		-moz-transition: all 0.3s ease-in-out;
		-o-transition: all 0.3s ease-in-out;
		transition: all 0.3s ease-in-out;
		flex-grow: 1;
		//background: red;
		//outline: #efff0f solid 0.1em;
	}

	@media (prefers-reduced-motion: reduce) {
		.dropdown-content {
			width: 100%;
			flex-grow: 1;
		}
	}
</style>
