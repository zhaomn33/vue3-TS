import { createApp } from 'vue'

import Pinia from '@/store'

import App from './App.vue'
import router from '@/router'

import ElementPlus from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import 'element-plus/dist/index.css'

import GlobalComponents from '@/components'

const app = createApp(App)

app
  .use(router)
  .use(Pinia)

app
  .use(ElementPlus, {
    locale: zhCn
  })
  .use(GlobalComponents)
  .mount('#app')

export default app
