import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import { router } from './router'
import { store } from './store'
import './assets/scss/main.scss'

// Глобальные компоненты
import UIIcon from '@/components/UI/UIIcon'
import UIBreadcrumbs from '@/components/UI/Breadcrumbs/UIBreadcrumbs'

const app = createApp(App)
app.use(router)
app.use(store)

if (app.config.globalProperties.$store) {
  app.config.globalProperties.$store.dispatch('getNavLinks')
}

// Регистрируем глобальные компоненты
app.component('UIIcon', UIIcon)
app.component('UIBreadcrumbs', UIBreadcrumbs)

app.mount('#app')
