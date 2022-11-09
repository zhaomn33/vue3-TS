/* global
  CustomizeRouter     ？？？？ 需要更改  Array<RouteRecordRaw & CustomizeRouter>
*/
import { RouteRecordRaw } from 'vue-router'

import childrenRoutes from '@/router/child-routes'
// import { localesMapping, isHasLocale } from '@/locales'
import { isUndefined } from '@/utils/type'

// const Layout = () => import('@/components/Layout/index.vue')

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Root',
    redirect: '/',
    meta: {
      isVirtual: true
    }
  }
]

export default routes
