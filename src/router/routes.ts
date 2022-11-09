/* global
  CustomizeRouter
*/
import { RouteRecordRaw } from 'vue-router'

import childrenRoutes from '@/router/child-routes'
// import { localesMapping, isHasLocale } from '@/locales'
import { isUndefined } from '@/utils/type'

const Layout = () => import('@/components/Layout/index.vue')

const routes = [
  {
    path: '/',
    name: 'Root',
    redirect: '/dashboard',
    meta: {
      isVirtual: true
    }
  }
]

export default routes
