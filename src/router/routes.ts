import { RouteRecordRaw } from 'vue-router'

const routes:Array<RouteRecordRaw> = [
  {
    path:'/login',
    name:'login',
    children:[],
    component: () => import('@/modules/userAccount/pages/login.vue')
  },
  // 主页
  {
    path:'/',
    name:'entrance',
    children:[],
    component: () => import('@/components/Layout/index.vue')
  }
]

export default routes