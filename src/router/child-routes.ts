import { RouteRecordRaw } from 'vue-router'

const Layout = () => import('@/components/Layout/index.vue')

const childrenRoutes = [
  {
    path: 'test-layout',
    title: 'TestLayout',
    name: '布局测试',
    icon: 'el-icon-s-promotion',
    meta: {
      title: 'TestLayout'
    },
    component: Layout
  }
]

export default childrenRoutes