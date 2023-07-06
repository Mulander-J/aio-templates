// import path from 'node:path';
import { sveltekit } from '@sveltejs/kit/vite';
import UnoCSS from '@unocss/svelte-scoped/vite';

const config = {
	plugins: [
		UnoCSS(),
		sveltekit()
	]
};

export default config;
