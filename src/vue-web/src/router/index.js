import Vue from 'vue'
import VueRouter from 'vue-router'
import layout from "@/layout/layout.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: layout,
    children: [
      {
        path: '',
        component: () => import('../views/Common/HomeContent.vue'),
        name: 'home'
      },
      // 登录后的页面
      {
        path: 'Afterlogin',
        component: () => import('../views/Common/AfterLogin.vue'),
        name: 'AfterLogin'
      },
      // 大脑游戏选择页面
      {
        path: 'game-select',
        component: () => import('../views/GameSelection/GameSelect.vue'),
        name: 'GameSelection'
      },
      // 数独游戏页面
      {
        path: 'Sudoku',
        component: () => import('../views/Game/Sudoku.vue'),
        name: 'Sudoku'
      },
      // 打地鼠游戏页面
      {
        path: 'Mouse',
        component: () => import('../views/Game/Mouse.vue'),
        name: 'Mouse'
      },
      // 诗词创作游戏页面
      {
        path: 'poem',
        component: () => import('../views/Game/Poem.vue'),
        name: 'poem'
      },
      // 2048游戏页面
      {
        path: '2048',
        component: () => import('../views/Game/2048.vue'),
        name: '2048'
      },
      // 运动引导
      {
        path: 'SportGuide',
        component: () => import('../views/SportsGuide/Sport.vue'),
        name: 'SportGuide'
      },
      // 运动小组
      {
        path: 'group',
        component: () => import('../views/SportsGuide/Group.vue'),
        name: 'group'
      },
      // 运动话题
      {
        path: 'Topic',
        component: () => import('../views/SportsGuide/Topic.vue'),
        name: 'Topic'
      },
      // 运动AI分析
      {
        path: 'AI',
        component: () => import('../views/SportsGuide/AI.vue'),
        name: 'AI'
      },
      // 健康提醒
      {
        path: 'HealthInfo',
        component: () => import('../views/Health/HealthInfo.vue'),
        name: 'HealthInfo'
      },
      // AI 聊天
      {
        path: 'AIChat',
        component: () => import('../views/AI chat/Chat.vue'),
        name: 'AIChat'
      },
      // 科学验证
      {
        path: 'Reference',
        component: () => import('../views/Common/Reference.vue'),
        name: 'Reference'
      },
      // 联系我们
      {
        path: 'ContactUs',
        component: () => import('../views/Common/ContactUs.vue'),
        name: 'ContactUs'
      },
    ]
  },
  // 卡片记忆游戏
  {
    path: '/memory',
    component: () => import('../views/Game/MemoryGame.vue'),
    name: 'memory'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Common/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Common/Register.vue')
  },

]

// 防止连续点击多次路由报错
let routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router