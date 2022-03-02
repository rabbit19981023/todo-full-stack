import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { counterStore, counterKey } from './store'
import { todoStore, todoKey } from './store'

createApp(App)
  .use(router)
  .use(counterStore, counterKey)
  .use(todoStore, todoKey)
  .mount('#app')
