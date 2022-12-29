import router from '@/router'
import useUserAccount from '@/modules/UserAccount/store'

import Cookie from 'js-cookie'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

router.beforeEach(async(to, from, next) => {
  NProgress.start() // 开启顶部加载动画
  const userAccountStore = useUserAccount()
  // console.log('beforeEach to' ,to);
  // console.log("Cookie.get('token')",Cookie.get('token'));

  // 如果不存在 token 则直接返回登录页
  if (!Cookie.get('token')) {

    next('/login')
    NProgress.done() // 关闭顶部加载动画

    return
  }
  // 如果存在 token 通过获取用户信息校验 token 有效性
  const { data, error } = await userAccountStore.getUserInfo()
  // console.log('data',data);

  if (error){

    Cookie.remove('token')
    next('/login')

    return
  }

  next()
})

router.afterEach((to) => {
  NProgress.done()
})
