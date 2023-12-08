<script lang="ts">
	import ThemeToggle from '@lib/components/molecules/ThemeToggle.svelte';
	import RssLink from '@lib/components/atoms/RssLink.svelte';
	import { onMount } from 'svelte';
	import { pageStore } from '@lib/utils/store';
	import LogoPageMenu from '../molecules/LogoPageMenu.svelte';
	import UserButton from '../molecules/UserMenu.svelte';

	const pages = pageStore.init;
	let showBackground = true;

	// Show mobile icon and display menu
	//export let pagePriority: number;
	export let logoText = 'Site Logo';

	let header: HTMLDivElement;
	let headerHeight: number = 44;
	let headerShifterHeight = 0;
	function fixHeaderOffset() {
		header.style.setProperty('--computed-height', `${headerHeight}px`);

		headerShifterHeight =
			Math.min(header.offsetTop, document.documentElement.scrollHeight - window.innerHeight - headerHeight) - 1;
	}

	onMount(() => {
		header.style.position = 'sticky';
		header.style.top = 'calc(var(--_computed-height) * -1 - 1px)';
		header.style.bottom = 'calc(100% - var(--_computed-height))';
		fixHeaderOffset();
	});
</script>

<svelte:window on:scroll={fixHeaderOffset} on:resize={fixHeaderOffset} />

<div style:height="{headerShifterHeight}px" />

<div bind:this={header} style:margin-bottom="-{headerShifterHeight}px" class="shy-header">
	<header class:has-background={showBackground}>
		<nav class="container">
			<div class="leftMenu">
				<LogoPageMenu menuItems={pages.filter((page) => !page.hidden)} {logoText} />
			</div>

			<div class="rightMenu">
				<!-- <RssLink /> -->
				<ThemeToggle />
				<UserButton/>
			</div>
		</nav>
	</header>
</div>

<style lang="scss">
	@import '../../scss/breakpoints.scss';

	.shy-header {
		// background-color: green;//var(--colour-dark);
		--_computed-height: var(--computed-height, 44px);
		z-index: 5;
	}

	header {
		position: relative;
		//padding: 30px 0;

		@include for-phone-only {
			padding: 20px 0;
		}

		&.has-background {
			text-align: center;
			background: linear-gradient(60deg, var(--color--waves-start) 0%, var(--color--waves-end) 100%);
		}

		.container {
			//background-color: blue;//var(--colour-dark);
			display: flex;
			justify-content: space-between;
			gap: 30px;
			overflow: hidden;
		}

		.leftMenu {
			display: flex;
			//border: 2px solid red;
			margin: 0.1em;
			height: 44px;
		}

		.rightMenu {
			//outline: 2px solid green;
			display: flex;
			align-self: flex-end;
		}
	}
</style>
