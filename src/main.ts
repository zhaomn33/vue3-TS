import { createApp } from 'vue'

import Pinia from '@/store'

import App from './App.vue'

import ElementPlus from 'element-plus'

import GlobalComponents from '@/components'

const app = createApp(App)

app
  .use(Pinia)

app
  .use(ElementPlus)
  .use(GlobalComponents)
  .mount('#app')

export default app
