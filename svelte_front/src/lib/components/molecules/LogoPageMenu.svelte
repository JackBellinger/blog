<script lang="ts">
	import { type Page } from '@lib/utils/types';
	import Logo from '../atoms/Logo.svelte';

	export let menuItems: Page[];
	export let logoText = 'Site Logo';

	export let pageNumber: number = 0;
	// Page selection
	//let menuOpen = false;
	//$: pageMenuPercent = 0;
	const handlePageSelection = (page: Page) => {
		//console.log(menuItems);
		console.log('swapping page to ', page.id);
		pageNumber = page.id;
		//console.log("pagenum: ", pageNumber);
		//pageMenuPercent = (pageNumber == 0)? 100: 0;
		logoText = pageNumber != 0 ? 'Home/' + page.name : page.name;
		//console.log("menu percent", pageMenuPercent);
		//menuOpen = false;
	};

	//page search filtering`
	//let inputValue = "";
	//$: console.log(inputValue);
	//let filteredItems = [];
	//const handleInput = () => {
	//	console.log("menu items: ", menuItems);
	//	return (filteredItems = menuItems.filter((item) =>
	//		!item ? false : item.name.toLowerCase().match(inputValue.toLowerCase())
	//	));
	//};
</script>

<div class="nav_menu">
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<a class="dropdown" href="/">
		<Logo {logoText} />
	</a>

	<ul class="dropdown-content" style="tabIndex='0'">
		<li>&gt;cd</li>
		{#each menuItems.filter((page) => page.id != 0) as page}
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
		text-decoration: none;
		max-height: 100%;
		-webkit-transition: all 0.3s ease-in-out;
		-moz-transition: all 0.3s ease-in-out;
		-o-transition: all 0.3s ease-in-out;
		transition: all 0.03s ease-in-out;
		//outline: #179943 solid .1em;
	}

	.dropdown {
		height: 100%;
		//flex: 0 1 auto;
		//padding-right: .5em;
		//outline: #000000 solid 0.1em;
		&:hover {
			color: var(--color--primary);
			filter: drop-shadow(0px 0px 3px var(--color--primary));
		}
	}
	.dropdown-content {
		display: flex;
		gap: 0.5rem;
		flex: 0 1 0;
		flex: wrap;
		margin: 0px 0.3em;
		//transform: scaleX(0);
		width: 0;
		//min-width: 0%;
		//max-width: max-content;
		//flex-grow: 0;
		//transform-origin: left;
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
			a {
				&:hover {
					color: var(--color--primary);
					filter: drop-shadow(0px 0px 3px var(--color--primary));
				}
			}
		}
		//outline: #2ba0ce solid 0.1em;
		//background-color: rgba(98, 98, 98, 1);
	}
	.nav_menu:hover .dropdown-content {
		width: max-content;
		-webkit-transition: all 0.3s ease-in-out;
		-moz-transition: all 0.3s ease-in-out;
		-o-transition: all 0.3s ease-in-out;
		transition: all 0.3s ease-in-out;
		//transform: scaleX(1);
		//overflow: hidden;
		//li {
		//  margin: 1;
		//  padding: 1em;
		//}
		flex-grow: 1;
		//background: red;
		//outline: #efff0f solid 0.1em;
	}
</style>
