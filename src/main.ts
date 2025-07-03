import { createApp } from 'vue'
import './assets/main.css'
import router from './router'
import App from './App.vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { msalInstance } from './plugins/msal'
import FloatingVue from 'floating-vue'
import 'floating-vue/dist/style.css'

msalInstance.initialize()

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)
app.use(pinia)
app.use(router)
app.use(FloatingVue, {
  distance: 8,
  themes: {
    tooltip: {
      triggers: ['hover', 'focus', 'touch'],
      placement: 'top'
    }
  }
})
app.mount('#app')
