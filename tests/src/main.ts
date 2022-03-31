import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createPersistedState } from '../../src/main'
import App from './App.vue'
import Cookies from 'js-cookie'

const app = createApp(App)
const store = createPinia()

store.use(
  createPersistedState({
    logger: true,
    key: 'my-store',
    storage: Cookies
  })
)

app.use(store).mount('#app')
