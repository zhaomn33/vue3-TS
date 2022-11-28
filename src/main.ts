import { createApp } from 'vue'

import Pinia from '@/store'

import App from './App.vue'
import router from '@/router'

import '@/assets/fonts'
import '@/router/permission'

import ElementPlus from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import GlobalComponents from '@/components'
import Widgets from '@/widgets'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app
  .use(router)
  .use(Pinia)

app
  .use(ElementPlus, {
    locale: zhCn
  })
  .use(GlobalComponents)
  .use(Widgets)
  .mount('#app')

export default app
