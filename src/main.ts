import { createApp } from 'vue'
import './assets/main.css'
import router from './router'
import App from './App.vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { msalInstance } from './plugins/msal'
import Particles from '@tsparticles/vue3'
import { loadSlim } from '@tsparticles/slim'

await msalInstance.initialize()

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)
app.use(pinia)
app.use(router)
app.use(Particles, {
  init: async (engine) => {
    await loadSlim(engine)
  }
})
app.mount('#app')
