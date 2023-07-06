# Svelte

## CLI

`create-svelte@5.0.2`

```bash
# init a new project
npm init svelte@next
# create a new project in the current directory
npm create svelte@latest
# create a new project in my-app
npm create svelte@latest my-app
```

## Templates

Sveltekit+TS+ESLint+Prettier+Vitest

- [sveltekit skeleton](./sveltekit-skeleton/)
- [sveltekit lib](./sveltekit-lib/)
- [sveltekit skeleton + unoc](./sveltekit-skeleton+uno/)

## Plugin

- [UNO CSS](./+plugins/unocss/)

## Tips

Replace @sveltejs/adapter-node of @sveltejs/adapter-auto

```diff
- import adapter from '@sveltejs/adapter-auto';
+ import adapter from '@sveltejs/adapter-node';
```

## Links

- [svelte](https://svelte.dev/)
- [sveltekit](https://kit.svelte.dev/)
- [Git-Svelte](https://github.com/sveltejs)
