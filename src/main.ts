import { createApp } from 'vue'

import router from '@/router'
// import '@/router/permission'

import Pinia from '@/store'

import App from './App.vue'

import ElementPlus from 'element-plus'

import '@/assets/fonts'

import GlobalComponents from '@/components'

const app = createApp(App)

app
  .use(router as any)  // 还需要改***
  .use(Pinia)

app
  .use(ElementPlus)
  .use(GlobalComponents)
  .mount('#app')

export default app
