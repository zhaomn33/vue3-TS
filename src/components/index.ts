// Vue Component Install

import { App } from 'vue'
import Layout from '@/components/Layout/index.vue'
import HelloWorld from '@/components/HelloWorld/index.vue'

const Components = {
  install(app: App<any>) {
    componentList.forEach((Comp) => {
      app.component(Comp.name, Comp)
    })
  }
}

const componentList = [
  Layout,
  HelloWorld
]

export default Components
