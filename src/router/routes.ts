import { RouteRecordRaw } from 'vue-router'

const routes:Array<RouteRecordRaw> = [
  {
    path:'/login',
    name:'login',
    component: () => import('@/modules/userAccount/pages/login.vue')
  },
  // 主页
  {
    path:'/',
    name:'entrance',
    component: () => import('@/components/Layout/index.vue'),
    children:[],
  }
]

export default routes