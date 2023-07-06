# UNO CSS

## Install Dependencies

```json
{
    "devDependencies": {
        "@unocss/svelte-scoped": "^0.53.4",
        "unocss": "^0.53.4"
    }
}
```

## Update Svelte Config

```js
import UnoCSS from '@unocss/svelte-scoped/preprocess'
const config = {
 preprocess: [
  UnoCSS()，
  //...
 ],
 compilerOptions: {
  css: true
 },
 //...
};

```

## Update Vite Config

```js
import UnoCSS from '@unocss/svelte-scoped/vite';

const config = {
 plugins: [
  UnoCSS(),
  // ...
 ]
};
```
