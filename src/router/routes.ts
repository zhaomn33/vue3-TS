import { defineAsyncComponent } from 'vue'
import { RouteRecordRaw } from 'vue-router'

const routesList:Array<RouteRecordRaw> = [
  {
    path:'/demo',
    name:'demo',
    component: () => import('@/modules/demo/pages/index.vue')
  },
  {
    path:'/demo2',
    children:[
      {
        path:'/demo2',
        name:'demo2',
        component: () => import('@/modules/demo2/pages/index.vue')
      },
      {
        path:'/demo3',
        name:'demo3',
        component: () => import('@/modules/demo3/pages/index.vue')
      },
    ]
  }
]

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
    redirect :'/demo',
    component: () => import('@/components/Layout/index.vue'),
    children: routesList,
  },
  // 404缺省页面
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: defineAsyncComponent(() => import('@/components/404.vue'))
  }
]

export default routes