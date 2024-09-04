import router from './router'
import { getAccessToken } from '@/utils/auth'

router.beforeEach((to, from, next) => {
  if (getAccessToken()) { // 如果有token
    if (to.path === '/login' || to.path === '/register') {
      next({ path: '/Afterlogin' }) // 重定向到 AfterLogin.vue
    } else {
      next() // 正常跳转
    }
  } else { // 没有token
    if (to.path === '/login' || to.path === '/register') {
      next() // 如果是去登录页或注册页，正常跳转
    } else if (to.path === '/' || to.path === '/Reference') {
      next() // 允许访问首页和科学验证页面
    } else {
      next('/login') // 其他页面请求重定向到登录页
    }
  }
})

router.afterEach(() => {
  // 这里可以添加一些在路由跳转后需要执行的代码
})