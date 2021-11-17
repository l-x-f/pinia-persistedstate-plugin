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
<script src="https://unpkg.com/pinia-persistedstate-plugin/dist/pinia-persistedstate.umd.js"></script>
```

You can find the library on window.PiniaPersistedstatePlugin.

## Usage

In `main.ts`:

```ts
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-persistedstate-plugin'
import App from './App'

const app = createApp(App)
const store = createPinia()

store.use(createPersistedState())

app.use(store)
```

## Options

```ts
export interface Options {
  /**
   * storage, default is `window.localStorage`
   */
  storage: Storage
  /**
   * storage key, default is `pinia`
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
