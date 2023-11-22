import './app.css';
import App from './App.svelte';
import { pageStore } from '@lib/utils/store';

const app = new App({
	props: {pageStore},
	target: document.getElementById('app')
});

export default app;
