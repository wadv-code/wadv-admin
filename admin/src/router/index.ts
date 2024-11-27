import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

import { resetStaticRoutes } from '@wadv/utils'

import { createRouterGuard } from './guard'
import { routes } from './routes'

const viteBase = import.meta.env.VITE_BASE
const hashHistory = import.meta.env.VITE_ROUTER_HISTORY

/**
 *  @zh_CN 创建vue-router实例
 */
const router = createRouter({
  history: hashHistory === 'hash' ? createWebHashHistory(viteBase) : createWebHistory(viteBase),
  // 应该添加到路由的初始路由列表。
  routes,
  scrollBehavior: (to, _from, savedPosition) => {
    if (savedPosition) return savedPosition
    return to.hash ? { behavior: 'smooth', el: to.hash } : { left: 0, top: 0 }
  },
  // 是否应该禁止尾部斜杠。
  // strict: true,
})

const resetRoutes = () => resetStaticRoutes(router, routes)

// 创建路由守卫
createRouterGuard(router)

export { resetRoutes, router }
