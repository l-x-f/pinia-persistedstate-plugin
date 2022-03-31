# pinia-persistedstate-plugin

**中文** | [English](./README.md)

一个为 vue3 准备的和 vuex-persistedstate 类似的 pinia 插件

## 安装

```sh
npm install pinia-persistedstate-plugin
```

或者

```sh
yarn add pinia-persistedstate-plugin
```

或者

```sh
pnpm add pinia-persistedstate-plugin
```

## UMD

```html
<script src="https://unpkg.com/pinia-persistedstate-plugin/dist/pinia-persistedstate-plugin.umd.js"></script>
```

插件为 window 添加全局变量 PiniaPersistedstatePlugin

## 使用

在 `main.ts`:

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

使用 `js-cookie`

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

## 选项

```ts
export interface Options {
  /**
   * 存储类型，默认为 `window.localStorage`
   *
   * 支持 `js-cookie` `window.localStorage` `window.sessionStorage`
   */
  storage?: Storage | Cookies
  /**
   * 存储的key值前缀，默认为 `pinia`
   */
  key: string
  /**
   * 是否开启日志，默认为 `false`
   */
  logger: boolean
}
```

## 授权

MIT 授权。
