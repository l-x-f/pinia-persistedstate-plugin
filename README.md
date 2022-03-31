# pinia-persistedstate-plugin

**English** | [中文](./README.zh-CN.md)

A pinia plugin like vuex-persistedstate.

## Install

```sh
npm install pinia-persistedstate-plugin
```

or

```sh
yarn add pinia-persistedstate-plugin
```

or

```sh
pnpm add pinia-persistedstate-plugin
```

The UMD build is also available on unpkg:

```html
<script src="https://unpkg.com/pinia-persistedstate-plugin/dist/pinia-persistedstate-plugin.umd.js"></script>
```

You can find the library on window.PiniaPersistedstatePlugin.

## Usage

In `main.ts`:

```ts
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-persistedstate-plugin'
import App from './App.vue'

const app = createApp(App)
const store = createPinia()

store.use(createPersistedState())

app.use(store).mount('#app')
```

use `js-cookie`

```js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-persistedstate-plugin'
import App from './App.vue'
import Cookies from 'js-cookie'

const app = createApp(App)
const store = createPinia()

store.use(
  createPersistedState({
    storage: Cookies
  })
)

app.use(store).mount('#app')
```

## Options

```ts
export interface Options {
  /**
   * storage, default is `window.localStorage`
   *
   * support `js-cookie` `window.localStorage` `window.sessionStorage`
   */
  storage?: Storage | Cookies
  /**
   * storage key prefix, default is `pinia`
   */
  key: string
  /**
   * is open logger, default is `false`
   */
  logger: boolean
}
```

## License

MIT License.
