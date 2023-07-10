# Arco Vue Admin

<p align='center'>
  <img src='https://raw.githubusercontent.com/xbmlz/vue-arco-admin/main/public/logo.svg' alt='vue-arco-admin' width='120'/>
</p>

<h1 align="center">Arco Design Admin</h1>


<p align="center">
🚀A modern vue admin. It is based on vue3.x and TypeScript. It's so fast!
</p>


<p align="center">
  🚧Work in progress🚧
</a>

## Features

- ⚡️ [Vite3](https://cn.vitejs.dev/), [Vue3](https://cn.vuejs.org/), [pnpm](https://pnpm.io/), [turbo](https://turbo.build/) - Fast and modern

- 📦 Components auto importing

- 🍍 [State Management via Pinia](https://pinia.vuejs.org/)

- 📑 [Arco Design](https://arco.design/vue)

- 🎨 [UnoCSS](https://github.com/antfu/unocss) - the instant on-demand atomic CSS engine

- 😃 [Use icons from any icon sets with classes](https://github.com/antfu/unocss/tree/main/packages/preset-icons)

- 🗒 [Markdown Support](https://github.com/antfu/vite-plugin-vue-markdown)

- 🔥 Use the [new `<script setup>` syntax](https://github.com/vuejs/rfcs/pull/227)

- 📥 [APIs auto importing](https://github.com/antfu/unplugin-auto-import) - use Composition API and others directly

- 🪐 PWA

- 🦾 TypeScript, of course

## Usage

> VEnable requires Node >=14.18
>
> Recommand packageManager: `PNPM`

### Development

Just run and visit `http://localhost:port`

```bash
pnpm dev
```

### Deploy

```bash
# INSTALL
npm install

# TO BUILD THE APP, RUN
npm run build -- --mode qa
npm run build -- --mode stage
npm run build -- --mode production
```

And you will see the generated file in `dist` that ready to be served.

### Use Turbo Speedup

```bash
pnpm turbo dev
pnpm turbo build
```
