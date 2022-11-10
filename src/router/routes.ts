import { RouteRecordRaw } from 'vue-router'

const routes:Array<RouteRecordRaw> = [
  {
    path:'/login',
    name:'login',
    children:[],
    component: () => import('@/modules/userAccount/pages/login.vue')
  },
  {
    path:'/',
    name:'homePage',
    children:[],
    component: () => import('@/modules/homePage/pages/index.vue')
  }
]

export default routes