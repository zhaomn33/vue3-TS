import { defineAsyncComponent } from 'vue'
import { RouteRecordRaw } from 'vue-router'

const routesList:Array<RouteRecordRaw> = [
  {
    path: '/demo',
    name: 'demo',
    component: () => import('@/modules/demo/pages/index.vue')
  },
  {
    path: '/demoList',
    children: [
      {
        path: '/threeJS',
        name: 'threeJS',
        component: () => import('@/modules/threeJS/pages/index.vue')
      },
      {
        path: '/svg',
        name: 'svg',
        component: () => import('@/modules/svg/pages/index.vue')
      },
      {
        path: '/echarts',
        name: 'echarts',
        component: () => import('@/modules/echarts/pages/index.vue')
      },
      {
        path: '/canvasDemo',
        name: 'canvasDemo',
        component: () => import('@/modules/canvasDemo/pages/index.vue')
      }
    ]
  },
  {
    path: '/virtualizedTable',
    name: 'virtualizedTable',
    component: () => import('@/modules/virtualizedTable/pages/index.vue')
  },
  {
    path: '/PersonChangeDemo',
    name: 'PersonChangeDemo',
    component: () => import('@/modules/personChangeDialog/pages/index.vue')
  }
]

const routes:Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/modules/userAccount/pages/login.vue')
  },
  // 主页
  {
    path: '/',
    name: 'entrance',
    redirect: '/demo',
    component: () => import('@/components/Layout/index.vue'),
    children: routesList,
    meta: {
      isVirtual: true
    }
  },
  // 404缺省页面
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: defineAsyncComponent(() => import('@/components/404.vue'))
  }
]

export default routes
